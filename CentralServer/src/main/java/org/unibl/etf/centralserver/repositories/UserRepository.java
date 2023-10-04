package org.unibl.etf.centralserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.unibl.etf.centralserver.model.entities.UserEntity;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    UserEntity findUserEntityByUsername(String username);

    @Modifying
    @Transactional
    @Query("update UserEntity u set u.isLoggedIn=:isLoggedIn where u.username=:username")
    void setIsLoggedIn(@Param("isLoggedIn") boolean isLoggedIn, @Param("username") String username);

    @Query("select u from UserEntity u where u.isLoggedIn=:isLoggedIn")
    List<UserEntity> findUserEntityByIsLoggedIn(@Param("isLoggedIn") boolean isLoggedIn);
}
