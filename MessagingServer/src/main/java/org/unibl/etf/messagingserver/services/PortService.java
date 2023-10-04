package org.unibl.etf.messagingserver.services;

import jakarta.annotation.PreDestroy;
import org.springframework.boot.web.servlet.context.ServletWebServerInitializedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.unibl.etf.messagingserver.model.entities.ServerEntity;
import org.unibl.etf.messagingserver.repositories.ServerRepository;

@Service
public class PortService {
    private final ServerRepository serverRepository;
    private int port;

    public PortService(ServerRepository serverRepository) {
        this.serverRepository = serverRepository;
    }

    @EventListener
    public void onApplicationEvent(final ServletWebServerInitializedEvent event) {
        port = event.getWebServer().getPort();

        ServerEntity entity = new ServerEntity();
        entity.setPort(port);
        serverRepository.save(entity);
    }

    @PreDestroy
    public void preDestroy() {
        serverRepository.deleteByPort(port);
    }
}
