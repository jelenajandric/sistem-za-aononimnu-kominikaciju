package org.unibl.etf.centralserver.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user", schema = "anonymous_communication_system")
public class UserEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "username")
    private String username;
    @Basic
    @Column(name = "password")
    private String password;
    @Basic
    @Column(name = "is_logged_in")
    private boolean isLoggedIn;
    @Basic
    @Column(name = "public_key")
    private String publicKey;
    @Basic
    @Column(name = "private_key")
    private String privateKey;
}
