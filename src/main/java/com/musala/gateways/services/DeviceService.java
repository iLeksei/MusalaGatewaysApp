package com.musala.gateways.services;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.musala.gateways.dtos.DeviceDto;

import java.util.List;
import java.util.Map;

public interface DeviceService {
    Map<String, String> addNewDevice(DeviceDto deviceDto, String gatewaySerialNumber) throws JsonProcessingException;
    List<DeviceDto> getAllDevicesForGateway(String gatewaySerialNumber);
    void deleteDevice(String uid);
}
