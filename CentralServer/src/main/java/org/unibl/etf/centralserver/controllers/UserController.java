package org.unibl.etf.centralserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.centralserver.model.ActiveUsersResponse;
import org.unibl.etf.centralserver.model.LoginRequest;
import org.unibl.etf.centralserver.model.LoginResponse;
import org.unibl.etf.centralserver.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.login(loginRequest));
    }

    @GetMapping("/logout")
    public void logout(@RequestParam("username") String username) {
        userService.logout(username);
    }

    @GetMapping("/find-all-active")
    public ResponseEntity<List<ActiveUsersResponse>> findAllActiveUsers() {
        return ResponseEntity.ok(userService.findAllActiveUsers());
    }
}
