package com.musala.gateways.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.musala.gateways.dtos.GatewayDto;
import com.musala.gateways.entities.Gateway;
import com.musala.gateways.repositories.GatewayRepository;
import com.musala.gateways.utils.validators.GatewayValidator;
import com.musala.gateways.utils.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class GatewayServiceImpl implements GatewayService {

    private final GatewayRepository gatewayRepository;

    @Autowired
    GatewayServiceImpl(GatewayRepository gatewayRepository) {
        this.gatewayRepository = gatewayRepository;
    }

    @Override
    public Map<String, String> addNewGateway(GatewayDto gatewayDto) throws JsonProcessingException {
        LOG.info("Gateway: {}", gatewayDto);
        String gatewayName = gatewayDto.getName();
        String ipAddress = gatewayDto.getIpAddress();

        Map<String, String> violations = GatewayValidator.validate(gatewayDto);
        Integer hasGatewayFlag = this.gatewayRepository.hasGatewayWithNameOrIpAddress(gatewayName, ipAddress);
        if (hasGatewayFlag != null) {
            violations.put("Gateway", String.format("Gateway with name: '%s' or ipAddress: '%s' already exist",
                    gatewayName, ipAddress));
        }

        if (!violations.isEmpty()) {
            violations.forEach((fieldName, message) ->
                    LOG.error("Invalid field: {}, message: {}", fieldName, message));
            return violations;
        }

        Gateway newGateway = new Gateway();
        newGateway.setName(StringUtils.sanitize(gatewayDto.getName()));
        newGateway.setIpAddress(gatewayDto.getIpAddress());
        gatewayRepository.save(newGateway);
        LOG.info("Gateway with name: {} and ipAddress: {} was added", gatewayName, ipAddress);
        return Collections.emptyMap();
    }

    @Override
    public List<GatewayDto> getGatewaysDtoList() {
        List<Gateway> gateways = this.gatewayRepository.findAll();
        return gateways.stream().map(gateway ->
                new GatewayDto(gateway.getSerialNumber(), gateway.getName(), gateway.getIpAddress())
        ).collect(Collectors.toList());
    }

    @Override
    public void deleteGateway(String serialNumber) {
        this.gatewayRepository.deleteById(Long.valueOf(serialNumber));
    }
}
