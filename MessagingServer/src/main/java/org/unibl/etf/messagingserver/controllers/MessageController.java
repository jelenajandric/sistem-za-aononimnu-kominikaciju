package org.unibl.etf.messagingserver.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.messagingserver.services.MessageService;

@RestController
@RequestMapping("/message-segments")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public void forwardSegmentToReceiver(@RequestBody String segment) {
        messageService.sendMessageToQueue(segment);
    }
}
