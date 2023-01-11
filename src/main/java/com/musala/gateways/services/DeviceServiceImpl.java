package com.musala.gateways.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.musala.gateways.dtos.DeviceDto;
import com.musala.gateways.entities.Device;
import com.musala.gateways.entities.Gateway;
import com.musala.gateways.repositories.DeviceRepository;
import com.musala.gateways.repositories.GatewayRepository;
import com.musala.gateways.utils.StringUtils;
import com.musala.gateways.utils.validators.DeviceValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class DeviceServiceImpl implements DeviceService {

    private static final byte MAX_DEVICES_PER_GATEWAY = 10;
    private final DeviceRepository deviceRepository;
    private final GatewayRepository gatewayRepository;

    @Autowired
    DeviceServiceImpl(DeviceRepository deviceRepository,
                      GatewayRepository gatewayRepository) {
        this.deviceRepository = deviceRepository;
        this.gatewayRepository = gatewayRepository;
    }


    @Override
    public Map<String, String> addNewDevice(DeviceDto deviceDto, String gatewaySerialNumber)
            throws JsonProcessingException {
        Map<String, String> violations = DeviceValidator.validate(deviceDto);
        Integer devicesAmount = this.deviceRepository.countDevicesByGateway(Long.valueOf(gatewaySerialNumber));

        if (devicesAmount == MAX_DEVICES_PER_GATEWAY) {
            violations.put("Device", String.format("Gateway serialNumber: '%s' has max amount of devices: %s",
                    gatewaySerialNumber, MAX_DEVICES_PER_GATEWAY));
        }

        if (!violations.isEmpty()) {
            violations.forEach((fieldName, message) ->
                    LOG.error("Invalid field: {}, message: {}", fieldName, message));
            return violations;
        }

        LOG.info("Device with vendor: {} and status: {} is valid", deviceDto.getVendor(), deviceDto.getStatus());
        Device newDevice = new Device();
        newDevice.setCreatedAt(LocalDateTime.now());
        newDevice.setVendor(StringUtils.sanitize(deviceDto.getVendor()));
        newDevice.setStatus(deviceDto.getStatus());
        Gateway gateway = this.gatewayRepository.getById(Long.valueOf(gatewaySerialNumber));
        newDevice.setGateway(gateway);
        this.deviceRepository.save(newDevice);
        return Collections.emptyMap();
    }

    @Transactional
    @Override
    public List<DeviceDto> getAllDevicesForGateway(String gatewaySerialNumber) {
        LOG.info("Removing all devices for gateway with serialNumber: {}", gatewaySerialNumber);
        Gateway gateway = this.gatewayRepository.getById(Long.valueOf(gatewaySerialNumber));
        return gateway.getDeviceList().stream().map(device ->
                new DeviceDto(device.getUid(), device.getVendor(), device.getCreatedAt(), device.getStatus())
        ).collect(Collectors.toList());
    }

    @Override
    public void deleteDevice(String uid) {
        LOG.info("Delete device with uid: {}", uid);
        this.deviceRepository.deleteById(UUID.fromString(uid));
    }
}
