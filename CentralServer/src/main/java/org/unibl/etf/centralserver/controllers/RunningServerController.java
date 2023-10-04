package org.unibl.etf.centralserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.centralserver.services.RunningServerService;

import java.util.List;

@RestController
@RequestMapping("/servers")
public class RunningServerController {

    private final RunningServerService runningServerService;

    public RunningServerController(RunningServerService runningServerService) {
        this.runningServerService = runningServerService;
    }

    @GetMapping
    public ResponseEntity<List<Integer>> getServersPorts() {
        return ResponseEntity.ok(runningServerService.getServersPorts());
    }
}
