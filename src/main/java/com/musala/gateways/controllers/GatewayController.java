package com.musala.gateways.controllers;

import com.musala.gateways.dtos.GatewayDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.musala.gateways.services.GatewayServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@Slf4j
@RestController
@RequestMapping("api")
public class GatewayController {

    private final GatewayServiceImpl gatewayService;

    @Autowired
    GatewayController(GatewayServiceImpl gatewayService) {
        this.gatewayService = gatewayService;
    }

    @GetMapping(value = "/gateways", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getGatewaysList() throws JsonProcessingException {
        List<GatewayDto> gatewaysDtoList = this.gatewayService.getGatewaysDtoList();
        String responseJson = new ObjectMapper().writeValueAsString(gatewaysDtoList);
        LOG.info("GET /gateways response data={}", responseJson);
        return responseJson;
    }

    @PostMapping(value = "/gateway")
    public ResponseEntity<String> createGateway(@RequestBody GatewayDto gatewayDto) throws JsonProcessingException {
        LOG.info("POST /gateway request data={}", gatewayDto);
        Map<String, String> violations = gatewayService.addNewGateway(gatewayDto);
        if (!violations.isEmpty()) {
            String json = new ObjectMapper().writeValueAsString(violations);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(json);
        }
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

    @DeleteMapping(value = "/gateway/{serialNumber}")
    public HttpStatus deleteGateway(@PathVariable String serialNumber) {
        LOG.info("DELETE /gateway uid={}", serialNumber);
        this.gatewayService.deleteGateway(serialNumber);
        return HttpStatus.OK;
    }
}
