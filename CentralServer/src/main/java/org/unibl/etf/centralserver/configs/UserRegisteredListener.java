package org.unibl.etf.centralserver.configs;

import org.springframework.stereotype.Component;
import org.unibl.etf.centralserver.services.MessageService;

@Component
public class UserRegisteredListener {

    private final MessageService messageService;

    public UserRegisteredListener(MessageService messageService) {
        this.messageService = messageService;
    }

    public void onMessageReceived(String message) {
        messageService.addSegment(message);
    }
}