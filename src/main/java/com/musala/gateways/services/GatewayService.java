package com.musala.gateways.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.musala.gateways.dtos.GatewayDto;

import java.util.List;
import java.util.Map;

public interface GatewayService {
    Map<String, String> addNewGateway(GatewayDto gatewayDto) throws JsonProcessingException;
    List<GatewayDto> getGatewaysDtoList();
    void deleteGateway(String serialNumber);
}
