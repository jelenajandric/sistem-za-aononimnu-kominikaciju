package org.unibl.etf.centralserver.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private int id;
    private String username;
    @JsonProperty("isLoggedIn")
    private boolean isLoggedIn;
    private String privateKey;
}
