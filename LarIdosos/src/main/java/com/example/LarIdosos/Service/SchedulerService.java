package com.example.LarIdosos.Service;

import com.example.LarIdosos.Config.RabbitMQConfig;
import com.example.LarIdosos.Models.DTO.EmailNotificationDto;
import com.example.LarIdosos.Models.Enum.TipoUsuario;
import com.example.LarIdosos.Models.RecomendacaoMedica;
import com.example.LarIdosos.Models.SaudeDiaria;
import com.example.LarIdosos.Models.Usuario;
import com.example.LarIdosos.Models.Visita;
import com.example.LarIdosos.Repository.*;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class SchedulerService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private SaudeDiariaRepository saudeDiariaRepository;
    @Autowired
    private VisitaRepository visitaRepository;
    @Autowired
    private RecomendacaoMedicaRepository recomendacaoMedicaRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private static final DateTimeFormatter HORA_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");
    private static final DateTimeFormatter DATA_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @Scheduled(cron = "0 0 19 * * ?")
    public void gerarResumosDiarios() {
        System.out.println("Iniciando geração de resumos diários...");

        LocalDate hoje = LocalDate.now();
        LocalDateTime inicioDoDia = hoje.atStartOfDay();
        LocalDateTime fimDoDia = hoje.plusDays(1).atStartOfDay();

        List<Usuario> idosos = usuarioRepository.findByTipoUsuario(TipoUsuario.IDOSO);

        for (Usuario idoso : idosos) {
            if (idoso.getResponsavelId() == null) {
                continue;
            }

            Usuario responsavel = usuarioRepository.findById(idoso.getResponsavelId()).orElse(null);
            if (responsavel == null || responsavel.getEmail() == null) {
                continue;
            }

            String corpoEmail = montarCorpoEmail(idoso, inicioDoDia, fimDoDia);

            EmailNotificationDto emailDto = new EmailNotificationDto(
                    responsavel.getEmail(),
                    "Resumo Diário de Saúde: " + idoso.getNome(),
                    corpoEmail
            );

            System.out.println("Enviando resumo de " + idoso.getNome() + " para " + responsavel.getEmail());
            rabbitTemplate.convertAndSend(
                    RabbitMQConfig.EXCHANGE_NAME,
                    RabbitMQConfig.EMAIL_RESUMO_QUEUE,
                    emailDto
            );
        }
    }

    private String montarCorpoEmail(Usuario idoso, LocalDateTime inicioDoDia, LocalDateTime fimDoDia) {
        StringBuilder sb = new StringBuilder();
        sb.append("Olá ").append(idoso.getNome()).append(",\n\n");
        sb.append("Aqui está o seu resumo de atividades e saúde do dia ")
                .append(inicioDoDia.format(DATA_FORMATTER)).append(":\n\n");

        sb.append("--- ÚLTIMO REGISTRO DE SAÚDE ---\n");
        SaudeDiaria ultimoRegistro = saudeDiariaRepository.findByIdosoIdOrderByDataHoraRegistroDesc(idoso.getId())
                .stream().findFirst().orElse(null);

        if (ultimoRegistro != null && ultimoRegistro.getDataHoraRegistro().isAfter(inicioDoDia)) {
            sb.append("  - Humor: ").append(ultimoRegistro.getHumor()).append("\n");
            sb.append("  - Pressão: ").append(ultimoRegistro.getPressaoArterialSistolica())
                    .append("x").append(ultimoRegistro.getPressaoArterialDiastolica()).append("\n");
            sb.append("  - Batimentos: ").append(ultimoRegistro.getBatimentosPorMinuto()).append(" BPM\n");
            sb.append("  - Saturação O2: ").append(ultimoRegistro.getSaturacaoOxigenio()).append("%\n");
            sb.append("  - Observações: ").append(ultimoRegistro.getObservacoesCuidador()).append("\n");
        } else {
            sb.append("Nenhum registro de saúde diária hoje.\n");
        }

        sb.append("\n--- VISITAS DE HOJE ---\n");
        List<Visita> visitas = visitaRepository.findByIdosoIdAndDataHoraVisitaBetween(idoso.getId(), inicioDoDia, fimDoDia);
        if (visitas.isEmpty()) {
            sb.append("Nenhuma visita registrada hoje.\n");
        } else {
            for (Visita v : visitas) {
                sb.append("  - ").append(v.getDataHoraVisita().format(HORA_FORMATTER))
                        .append(": ").append(v.getTipoVisita())
                        .append(" (Status: ").append(v.getStatusVisita()).append(")\n");
            }
        }

        sb.append("\n--- NOVAS RECOMENDAÇÕES MÉDICAS (HOJE) ---\n");
        List<RecomendacaoMedica> recs = recomendacaoMedicaRepository.findByIdosoIdAndDataRecomendacaoBetween(idoso.getId(), inicioDoDia, fimDoDia);
        if (recs.isEmpty()) {
            sb.append("Nenhuma nova recomendação médica hoje.\n");
        } else {
            for (RecomendacaoMedica r : recs) {

            }
        }

        sb.append("\nAtenciosamente,\nEquipe Lar de Idosos.");
        return sb.toString();
    }
}
