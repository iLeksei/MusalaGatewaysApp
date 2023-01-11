package com.musala.gateways.repositories;

import com.musala.gateways.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DeviceRepository extends JpaRepository<Device, UUID> {

    @Query(value = "SELECT count(*) FROM DEVICE d WHERE d.GATEWAY_SERIAL_NUM =:serialNumber", nativeQuery = true)
    Integer countDevicesByGateway(@Param("serialNumber") Long gatewaySerialNumber);
}
