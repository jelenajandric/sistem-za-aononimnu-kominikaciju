package org.unibl.etf.messagingserver.services;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private static final String QUEUE_NAME = "messages";
    private final RabbitTemplate rabbitTemplate;

    public MessageService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }


    public void sendMessageToQueue(String message) {
        rabbitTemplate.convertAndSend(QUEUE_NAME, message);
    }
}
