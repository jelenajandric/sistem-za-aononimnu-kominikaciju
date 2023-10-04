package org.unibl.etf.messagingserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.unibl.etf.messagingserver.model.entities.ServerEntity;

@Repository
public interface ServerRepository extends JpaRepository<ServerEntity, Integer> {

    @Modifying
    @Transactional
    void deleteByPort(int port);
}