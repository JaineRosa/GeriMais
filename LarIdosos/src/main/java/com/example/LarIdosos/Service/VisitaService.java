package com.example.LarIdosos.Service;

import com.example.LarIdosos.Config.RabbitMQConfig;
import com.example.LarIdosos.Models.DTO.VisitaNotificationDto;
import com.example.LarIdosos.Models.Enum.StatusVisita;
import com.example.LarIdosos.Models.Visita;
import com.example.LarIdosos.Repository.UsuarioRepository;
import com.example.LarIdosos.Repository.VisitaRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitaService {

    @Autowired
    private VisitaRepository visitaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;


    public List<Visita> listarTodas() {
        return visitaRepository.findAll();
    }

    public Visita buscarPorId(String id) {
        return visitaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visita não encontrada com ID: " + id));
    }

    public List<Visita> listarPorIdoso(String idosoId) {
        return visitaRepository.findByIdosoId(idosoId);
    }

    public List<Visita> listarPorCuidador(String cuidadorId) {
        return visitaRepository.findByCuidadorId(cuidadorId);
    }

    public Visita agendarVisita(Visita visita) {
        usuarioRepository.findById(visita.getIdosoId())
                .orElseThrow(() -> new RuntimeException("Erro: Idoso com ID " + visita.getIdosoId() + " não encontrado."));

        if (visita.getCuidadorId() != null) {
            usuarioRepository.findById(visita.getCuidadorId())
                    .orElseThrow(() -> new RuntimeException("Erro: Cuidador com ID " + visita.getCuidadorId() + " não encontrado."));
        }

        visita.setStatusVisita(StatusVisita.AGENDADA);

        Visita visitaSalva = visitaRepository.save(visita);

        VisitaNotificationDto dto = new VisitaNotificationDto(
                "VISITA AGENDADA",
                visitaSalva.getIdosoId(),
                visitaSalva.getCuidadorId(),
                visitaSalva.getVisitanteId(),
                visitaSalva.getDataHoraVisita()
        );

        System.out.println("Enviando notificação de visita agendada.");
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_NAME,
                RabbitMQConfig.VISIT_NOTIFICATION_QUEUE,
                dto);

        return visitaSalva;
    }

    public Visita atualizarVisita(String id, Visita visitaAtualizada) {
        Visita visitaExistente = buscarPorId(id);

        if (visitaAtualizada.getDataHoraVisita() != null) {
            visitaExistente.setDataHoraVisita(visitaAtualizada.getDataHoraVisita());
        }
        if (visitaAtualizada.getObservacoes() != null) {
            visitaExistente.setObservacoes(visitaAtualizada.getObservacoes());
        }
        if (visitaAtualizada.getTipoVisita() != null) {
            visitaExistente.setTipoVisita(visitaAtualizada.getTipoVisita());
        }
        if (visitaAtualizada.getStatusVisita() != null &&
                !visitaExistente.getStatusVisita().equals(visitaAtualizada.getStatusVisita())) {

            StatusVisita novoStatus = visitaAtualizada.getStatusVisita();
            visitaExistente.setStatusVisita(novoStatus);

            String tipoNotificacao = null;

            if (novoStatus == StatusVisita.INICIADA) {
                tipoNotificacao = "VISITA INICIADA";
            } else if (novoStatus == StatusVisita.CONCLUIDA) {
                tipoNotificacao = "VISITA CONCLUIDA";
            } else if (novoStatus == StatusVisita.CANCELADA) {
                tipoNotificacao = "VISITA CANCELADA";
            }

            if (tipoNotificacao != null) {
                VisitaNotificationDto dto = new VisitaNotificationDto(
                        tipoNotificacao,
                        visitaExistente.getIdosoId(),
                        visitaExistente.getCuidadorId(),
                        visitaExistente.getVisitanteId(),
                        visitaExistente.getDataHoraVisita()
                );

                System.out.println("Enviando notificação: " + tipoNotificacao + " para o cuidador.");
                rabbitTemplate.convertAndSend(
                        RabbitMQConfig.EXCHANGE_NAME,
                        RabbitMQConfig.VISIT_NOTIFICATION_QUEUE,
                        dto);
            }
        }
        return visitaRepository.save(visitaExistente);
    }

    public void deletarVisita(String id) {
        Visita visita = buscarPorId(id);
        visitaRepository.delete(visita);
    }
}