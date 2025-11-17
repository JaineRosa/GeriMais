package com.example.LarIdosos.Service;
import com.example.LarIdosos.Config.RabbitMQConfig;
import com.example.LarIdosos.Models.DTO.SaudeDiariaAlertaDto;
import com.example.LarIdosos.Models.SaudeDiaria;
import com.example.LarIdosos.Models.Usuario;
import com.example.LarIdosos.Repository.SaudeDiariaRepository;
import com.example.LarIdosos.Repository.UsuarioRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SaudeDiariaService {

    private static final int LIMITE_SATURACAO_BAIXA = 92;
    private static final int LIMITE_BATIMENTOS_ALTOS = 110;

    @Autowired
    private SaudeDiariaRepository saudeDiariaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;


    public List<SaudeDiaria> listarPorIdoso(String idosoId) {
        return saudeDiariaRepository.findByIdosoIdOrderByDataHoraRegistroDesc(idosoId);
    }

    public List<SaudeDiaria> listarPorCuidador(String cuidadorId) {
        return saudeDiariaRepository.findByCuidadorId(cuidadorId);
    }

    public SaudeDiaria buscarPorId(String id) {
        return saudeDiariaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro de saúde não encontrado com ID: " + id));
    }


    public SaudeDiaria criarRegistro(SaudeDiaria registro) {
        Usuario idoso = usuarioRepository.findById(registro.getIdosoId())
                .orElseThrow(() -> new RuntimeException("Erro: Idoso com ID " + registro.getIdosoId() + " não encontrado."));

        usuarioRepository.findById(registro.getCuidadorId())
                .orElseThrow(() -> new RuntimeException("Erro: Cuidador com ID " + registro.getCuidadorId() + " não encontrado."));

        registro.setDataHoraRegistro(LocalDateTime.now());

        SaudeDiaria registroSalvo = saudeDiariaRepository.save(registro);

        verificarAlertasCriticos(registroSalvo, idoso.getResponsavelId());

        return registroSalvo;
    }

    public void deletarRegistro(String id) {
        SaudeDiaria registro = buscarPorId(id);
        saudeDiariaRepository.delete(registro);
    }


    private void verificarAlertasCriticos(SaudeDiaria registro, String responsavelId) {

        if (registro.getSaturacaoOxigenio() != null && registro.getSaturacaoOxigenio() < LIMITE_SATURACAO_BAIXA) {
            System.out.println("[SaudeService] ALERTA CRÍTICO: Saturação baixa!");
            SaudeDiariaAlertaDto dto = new SaudeDiariaAlertaDto(
                    registro.getIdosoId(),
                    responsavelId,
                    "SATURAÇÃO BAIXA",
                    registro.getSaturacaoOxigenio() + "%",
                    registro.getDataHoraRegistro()
            );
            rabbitTemplate.convertAndSend(
                    RabbitMQConfig.EXCHANGE_NAME,
                    RabbitMQConfig.HEALTH_CRITICAL_ALERT_QUEUE,
                    dto);
            return;
        }

        if (registro.getBatimentosPorMinuto() != null && registro.getBatimentosPorMinuto() > LIMITE_BATIMENTOS_ALTOS) {
            System.out.println("[SaudeService] ALERTA CRÍTICO: Batimentos elevados!");
            SaudeDiariaAlertaDto dto = new SaudeDiariaAlertaDto(
                    registro.getIdosoId(),
                    responsavelId,
                    "BATIMENTOS ELEVADOS",
                    registro.getBatimentosPorMinuto() + " BPM",
                    registro.getDataHoraRegistro()
            );
            rabbitTemplate.convertAndSend(
                    RabbitMQConfig.EXCHANGE_NAME,
                    RabbitMQConfig.HEALTH_CRITICAL_ALERT_QUEUE,
                    dto);
        }
    }
}