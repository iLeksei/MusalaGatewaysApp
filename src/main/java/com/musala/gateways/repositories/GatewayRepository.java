package com.musala.gateways.repositories;

import com.musala.gateways.entities.Gateway;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GatewayRepository extends JpaRepository<Gateway, Long> {

    @Query(value = "SELECT 1 FROM GATEWAY g WHERE g.NAME =:name OR g.IP_ADDRESS =:ipAddress ", nativeQuery = true)
    Integer hasGatewayWithNameOrIpAddress(@Param("name") String name, @Param("ipAddress") String ipAddress);
}
