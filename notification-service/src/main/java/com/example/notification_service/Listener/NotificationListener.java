package com.example.notification_service.Listener;

import com.example.notification_service.Config.RabbitMQConfig;
import com.example.notification_service.Models.EmailNotificationDto;
import com.example.notification_service.Models.LogAlerta;
import com.example.notification_service.Models.VisitaNotificationDto;
import com.example.notification_service.Repository.LogAlertaRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@DependsOn({"emailWelcomeQueue", "visitNotificationQueue", "emailResumoQueue", "healthCriticalAlertQueue"})
public class NotificationListener {

    @Autowired
    private LogAlertaRepository logAlertaRepository;

    @RabbitListener(queues = RabbitMQConfig.EMAIL_WELCOME_QUEUE)
    public void handleWelcomeEmail(@Payload EmailNotificationDto notificationDto) {
        System.out.println(" Recebeu para: " + notificationDto.getToEmail());

        simularEnvioEmail(
                notificationDto.getToEmail(),
                notificationDto.getSubject(),
                null
        );
    }

    @RabbitListener(queues = RabbitMQConfig.VISIT_NOTIFICATION_QUEUE)
    public void handleVisitNotification(@Payload VisitaNotificationDto notificationDto) {

        System.out.println("Mensagem de VISITA recebida!");
        System.out.println("Tipo: " + notificationDto.getTipoNotificacao());
        System.out.println("Para Idoso: " + notificationDto.getIdosoId());

        try {
            System.out.println("Simulando envio de PUSH para o Responsável (Cuidador ID: " + notificationDto.getCuidadorId() + ")...");
            Thread.sleep(1000);

            String mensagemLog = String.format(
                    "Notificação de %s enviada (Idoso: %s, Visitante: %s)",
                    notificationDto.getTipoNotificacao(),
                    notificationDto.getIdosoId(),
                    notificationDto.getNomeVisitante()
            );

            LogAlerta log = new LogAlerta();
            log.setMensagem(mensagemLog);
            log.setIdosoId(notificationDto.getIdosoId());
            log.setStatusEnvio("SUCESSO");
            log.setTimestamp(LocalDateTime.now());

            logAlertaRepository.save(log);
            System.out.println("Log de visita salvo.");

        } catch (InterruptedException e) {
            System.err.println("Falha ao (simular) envio de PUSH.");
        }
    }

    @RabbitListener(queues = RabbitMQConfig.EMAIL_RESUMO_QUEUE)
    public void handleSummaryEmail(@Payload EmailNotificationDto notificationDto) {

        System.out.println("Mensagem de RESUMO DIÁRIO recebida!");
        System.out.println("Para: " + notificationDto.getToEmail());
        System.out.println("Assunto: " + notificationDto.getSubject());

        simularEnvioEmail(
                notificationDto.getToEmail(),
                notificationDto.getSubject(),
                null
        );
    }

    private void simularEnvioEmail(String email, String subject, String idosoId) {
        try {
            System.out.println("Simulando envio de e-mail (Resumo) para " + email + "...");
            Thread.sleep(1500);

            LogAlerta log = new LogAlerta();
            log.setMensagem("E-mail enviado para: " + email + " | Assunto: " + subject);
            log.setIdosoId(idosoId);
            log.setStatusEnvio("SUCESSO_SIMULADO (EMAIL)");
            log.setTimestamp(LocalDateTime.now());

            logAlertaRepository.save(log);
            System.out.println("Log de e-mail (Resumo) salvo.");

        } catch (InterruptedException e) {
            System.err.println("Falha ao (simular) envio de e-mail (Resumo).");
        }
    }

    @RabbitListener(queues = RabbitMQConfig.HEALTH_CRITICAL_ALERT_QUEUE)
    public void handleCriticalHealthAlert(@Payload String alerta) {

        System.out.println("⚠ ALERTA CRÍTICO DE SAÚDE RECEBIDO!");
        System.out.println("Mensagem: " + alerta);

        LogAlerta log = new LogAlerta();
        log.setMensagem("ALERTA CRÍTICO: " + alerta);
        log.setStatusEnvio("SUCESSO_SIMULADO");
        log.setTimestamp(LocalDateTime.now());

        logAlertaRepository.save(log);

        System.out.println("Log de alerta crítico salvo.");
    }

}



