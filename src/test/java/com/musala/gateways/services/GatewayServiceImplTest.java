package com.musala.gateways.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.musala.gateways.dtos.GatewayDto;
import com.musala.gateways.entities.Gateway;
import com.musala.gateways.repositories.GatewayRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class GatewayServiceImplTest {

    @Autowired
    private GatewayServiceImpl gatewayService;

    @MockBean
    private GatewayRepository gatewayRepository;

    private Gateway buildTestGateway(long serialNumber) {
        Gateway gateway = new Gateway();
        gateway.setName("test");
        gateway.setIpAddress("1.1.1.1");
        gateway.setSerialNumber(serialNumber);
        return gateway;
    }

    @Test
    public void shouldDeleteGateway() {
        doNothing().when(gatewayRepository).deleteById(anyLong());
        gatewayService.deleteGateway("123");
        verify(gatewayRepository).deleteById(123L);
    }

    @Test
    public void shouldReturnGatewaysList() {
        when(gatewayRepository.findAll()).thenReturn(Arrays.asList(
                buildTestGateway(1L), buildTestGateway(2L)
        ));
        assertEquals(2, gatewayService.getGatewaysDtoList().size());
        verify(gatewayRepository).findAll();
    }

    @Test
    public void shouldAddNewGateway() throws JsonProcessingException {
        when(gatewayRepository.hasGatewayWithNameOrIpAddress(anyString(), anyString()))
                .thenReturn(null);
        GatewayDto gatewayDto = new GatewayDto();
        gatewayDto.setName("test gateway");
        gatewayDto.setIpAddress("1.1.1.1");
        assertEquals(0, gatewayService.addNewGateway(gatewayDto).size());
        verify(gatewayRepository).save(any(Gateway.class));
    }

    @Test
    public void shouldReturnViolationsMap() throws JsonProcessingException {
        when(gatewayRepository.hasGatewayWithNameOrIpAddress(anyString(), anyString()))
                .thenReturn(1);
        GatewayDto gatewayDto = new GatewayDto();
        gatewayDto.setName("");
        gatewayDto.setIpAddress("1.1.1.");
        Map<String, String> result = gatewayService.addNewGateway(gatewayDto);
        assertEquals(3, result.size());
        assertEquals("can not be empty!", result.get("name"));
        assertEquals("Gateway with name: '' or ipAddress: '1.1.1.' already exist", result.get("Gateway"));
        assertEquals("has not correct format!", result.get("ipAddress"));
    }


}
