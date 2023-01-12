package com.musala.gateways.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.musala.gateways.dtos.GatewayDto;
import com.musala.gateways.services.GatewayServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
//@RunWith(SpringRunner.class)
@WebMvcTest(GatewayController.class)
public class GatewayControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GatewayServiceImpl gatewayService;

    private ObjectMapper mapper = new ObjectMapper();

    private GatewayDto buildTestGateway() {
        GatewayDto gatewayDto = new GatewayDto();
        gatewayDto.setName("test");
        gatewayDto.setIpAddress("1.1.1.1");
        return gatewayDto;
    }

    @Test
    public void shouldReturnOkIfGatewayIsValid() throws Exception {
        GatewayDto deviceDto = buildTestGateway();
        when(gatewayService.addNewGateway(any(GatewayDto.class)))
                .thenReturn(Collections.emptyMap());
        String requestJson = mapper.writeValueAsString(deviceDto);
        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/gateway")
                .content(requestJson)
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string("OK"));
    }

    @Test
    public void shouldReturnViolationsMapIfGatewayIsNotValid() throws Exception {
        Map<String, String> testViolations = Collections.singletonMap("Gateway", "Gateway fake violation");
        GatewayDto deviceDto = buildTestGateway();
        when(gatewayService.addNewGateway(any(GatewayDto.class)))
                .thenReturn(testViolations);
        String requestJson = mapper.writeValueAsString(deviceDto);
        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/gateway")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestJson))
                .andExpect(status().is4xxClientError())
                .andExpect(content().string(mapper.writeValueAsString(testViolations)));
    }

    @Test
    public void shouldReturnGateways() throws Exception {
        GatewayDto gatewayOne = buildTestGateway();
        GatewayDto gatewayTwo = buildTestGateway();
        when(gatewayService.getGatewaysDtoList())
                .thenReturn(Arrays.asList(gatewayOne, gatewayTwo));
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/gateways"))
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string(mapper.writeValueAsString(Arrays.asList(gatewayOne, gatewayTwo))));
    }

    @Test
    public void shouldDeleteGateway() throws Exception {
        GatewayServiceImpl mockedService = mock(GatewayServiceImpl.class);
        doNothing().when(mockedService).deleteGateway("123");
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/gateway/123"))
                .andExpect(status().is2xxSuccessful());
    }
}
