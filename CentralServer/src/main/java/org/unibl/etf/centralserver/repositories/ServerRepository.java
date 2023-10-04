package org.unibl.etf.centralserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.unibl.etf.centralserver.model.entities.ServerEntity;

import java.util.List;

@Repository
public interface ServerRepository extends JpaRepository<ServerEntity, Integer> {
    @Query("select s.port from ServerEntity s")
    List<Integer> findAllPorts();
}
