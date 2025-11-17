package com.example.notification_service.Config;

import org.springframework.amqp.core.*;

import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Configuration
public class RabbitMQConfig {
    public static final String APP_EXCHANGE = "app.exchange";
    public static final String EMAIL_WELCOME_QUEUE = "email.welcome.queue";
    public static final String VISIT_NOTIFICATION_QUEUE = "notify.visit.queue";
    public static final String EMAIL_RESUMO_QUEUE = "email.summary.queue";
    public static final String HEALTH_CRITICAL_ALERT_QUEUE = "alert.health.critical.queue";
    @Bean
    public TopicExchange appExchange() {
        return new TopicExchange(APP_EXCHANGE);
    }
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
            ConnectionFactory connectionFactory,
            MessageConverter messageConverter
    ) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(messageConverter);
        return factory;
    }

    @Bean
    public Queue emailWelcomeQueue() {
        return new Queue(EMAIL_WELCOME_QUEUE, true);
    }
    @Bean
    public Queue visitNotificationQueue() {
        return new Queue(VISIT_NOTIFICATION_QUEUE, true);
    }
    @Bean
    public Queue emailResumoQueue() {
        return new Queue(EMAIL_RESUMO_QUEUE, true);
    }
    @Bean
    public Queue healthCriticalAlertQueue() {
        return new Queue(HEALTH_CRITICAL_ALERT_QUEUE, true);
    }

    @Bean
    public Binding bindingWelcome(Queue emailWelcomeQueue, TopicExchange appExchange) {
        return BindingBuilder
                .bind(emailWelcomeQueue)
                .to(appExchange)
                .with(EMAIL_WELCOME_QUEUE);
    }
    @Bean
    public Binding bindingSummary(Queue emailResumoQueue, TopicExchange appExchange) {
        return BindingBuilder
                .bind(emailResumoQueue)
                .to(appExchange)
                .with(EMAIL_RESUMO_QUEUE);
    }
    @Bean
    public Binding bindingVisit(Queue visitNotificationQueue, TopicExchange appExchange) {
        return BindingBuilder
                .bind(visitNotificationQueue)
                .to(appExchange)
                .with(VISIT_NOTIFICATION_QUEUE);
    }
    @Bean
    public Binding bindingCritical(Queue healthCriticalAlertQueue, TopicExchange appExchange) {
        return BindingBuilder
                .bind(healthCriticalAlertQueue)
                .to(appExchange)
                .with(HEALTH_CRITICAL_ALERT_QUEUE);
    }
}