package org.unibl.etf.centralserver.services;

import org.springframework.stereotype.Service;
import org.unibl.etf.centralserver.repositories.ServerRepository;

import java.util.List;

@Service
public class RunningServerService {

    private final ServerRepository serverRepository;

    public RunningServerService(ServerRepository serverRepository) {
        this.serverRepository = serverRepository;
    }

    public List<Integer> getServersPorts() {
        return serverRepository.findAllPorts();
    }
}
