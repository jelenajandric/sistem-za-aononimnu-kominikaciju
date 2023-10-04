package org.unibl.etf.centralserver.services;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.unibl.etf.centralserver.model.ActiveUsersResponse;
import org.unibl.etf.centralserver.model.LoginRequest;
import org.unibl.etf.centralserver.model.LoginResponse;
import org.unibl.etf.centralserver.model.entities.UserEntity;
import org.unibl.etf.centralserver.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        UserEntity userEntity = userRepository.findUserEntityByUsername(loginRequest.getUsername());
        if (userEntity != null) {
            if (isPasswordValid(loginRequest.getPassword(), userEntity.getPassword())) {
                userRepository.setIsLoggedIn(true, userEntity.getUsername());

                return new LoginResponse(userEntity.getId(), loginRequest.getUsername(), true,
                        userEntity.getPrivateKey());
            }
        }
        return new LoginResponse(-1, null, false, null);
    }

    public void logout(String username) {
        userRepository.setIsLoggedIn(false, username);
    }

    public List<ActiveUsersResponse> findAllActiveUsers() {
        List<UserEntity> entities = userRepository.findUserEntityByIsLoggedIn(true);
        List<ActiveUsersResponse> usersResponse = new ArrayList<>();

        entities.forEach(userEntity -> {
            usersResponse.add(new ActiveUsersResponse(userEntity.getId(),
                    userEntity.getUsername(), userEntity.getPublicKey()));
        });
        return usersResponse;
    }

    private boolean isPasswordValid(String password, String encodedPassword) {
        Argon2PasswordEncoder encoder = new Argon2PasswordEncoder(32, 64, 1,
                15 * 1024, 2);
        return encoder.matches(password, encodedPassword);
    }

//    private String passwordHashing(String password) {
//        Argon2PasswordEncoder encoder = new Argon2PasswordEncoder(32, 64, 1, 15 * 1024, 2);
//
//        return encoder.encode(password);
//    }

}
