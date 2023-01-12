package com.musala.gateways.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.musala.gateways.dtos.DeviceDto;
import com.musala.gateways.services.DeviceServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@CrossOrigin("*")
@Slf4j
@RestController
@RequestMapping("api")
public class DeviceController {

    private final DeviceServiceImpl deviceService;

    @Autowired
    DeviceController(DeviceServiceImpl deviceService) {
        this.deviceService = deviceService;
    }

    @PostMapping(value = "/device/{gatewaySerialNumber}", consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addNewDevice(@RequestBody DeviceDto deviceDto,
                                               @PathVariable String gatewaySerialNumber)
            throws JsonProcessingException {
        LOG.info("POST /device data={}", deviceDto);
        Map<String, String> violations = this.deviceService.addNewDevice(deviceDto, gatewaySerialNumber);
        if (!violations.isEmpty()) {
            String json = new ObjectMapper().writeValueAsString(violations);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(json);
        }
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

    @DeleteMapping(value = "/device/{uid}")
    public HttpStatus deleteDevice(@PathVariable String uid) throws Exception {
        LOG.info("DELETE /device uid={}", uid);
        this.deviceService.deleteDevice(uid);
        return HttpStatus.OK;
    }

    @GetMapping(value = "/devices/{gatewaySerialNumber}")
    public String getAllDevicesForGateway(@PathVariable String gatewaySerialNumber) throws JsonProcessingException {
        LOG.info("GET /devices serialNumber={}", gatewaySerialNumber);
        List<DeviceDto> deviceDtos = this.deviceService.getAllDevicesForGateway(gatewaySerialNumber);
        String responseJson = new ObjectMapper().registerModule(new JavaTimeModule()).writeValueAsString(deviceDtos);
        LOG.info("RESPONSE: {}", responseJson);
        return responseJson;
    }
}
