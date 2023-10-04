package org.unibl.etf.centralserver.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActiveUsersResponse {
    private int id;
    private String username;
    private String publicKey;
}
