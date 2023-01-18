package com.musala.gateways.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.musala.gateways.dtos.DeviceDto;
import com.musala.gateways.enums.StatusEnum;
import com.musala.gateways.services.DeviceServiceImpl;
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

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(DeviceController.class)
public class DeviceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DeviceServiceImpl deviceService;

    private ObjectMapper mapper = new ObjectMapper();

    private DeviceDto buildTestDevice() {
        DeviceDto deviceDto = new DeviceDto();
        deviceDto.setStatus(StatusEnum.ONLINE);
        deviceDto.setVendor("test-vendor");
        return deviceDto;
    }

    @Test
    public void shouldReturnOkIfDeviceIsValid() throws Exception {
        DeviceDto deviceDto = buildTestDevice();
        when(deviceService.addNewDevice(any(DeviceDto.class), anyString()))
                .thenReturn(Collections.emptyMap());
        String requestJson = mapper.writeValueAsString(deviceDto);
        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/device/123")
                .content(requestJson)
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string("OK"));
    }

    @Test
    public void shouldReturnViolationsMapIfDeviceIsNotValid() throws Exception {
        DeviceDto deviceDto = buildTestDevice();
        Map<String, String> testViolations = Collections.singletonMap("Device", "Device fake violation");
        when(deviceService.addNewDevice(any(DeviceDto.class), anyString()))
                .thenReturn(testViolations);
        String requestJson = mapper.writeValueAsString(deviceDto);
        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/device/123")
                .content(requestJson)
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().is4xxClientError())
                .andExpect(content().string(mapper.writeValueAsString(testViolations)));
    }

    @Test
    public void shouldReturnDevices() throws Exception {
        DeviceDto deviceOne = buildTestDevice();
        DeviceDto deviceTwo = buildTestDevice();
        when(deviceService.getAllDevicesForGateway("123"))
                .thenReturn(Arrays.asList(deviceOne, deviceTwo));
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/devices/123"))
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string(mapper.writeValueAsString(Arrays.asList(deviceOne, deviceTwo))));
    }

    @Test
    public void shouldReturn500StatusError() {
        when(deviceService.getAllDevicesForGateway("123"))
                .thenThrow(RuntimeException.class);
        assertThrows(Exception.class, () ->
            mockMvc.perform(MockMvcRequestBuilders
                    .get("/api/devices/123"))
                    .andExpect(status().is5xxServerError())
        );
    }

    @Test
    public void shouldDeleteDevice() throws Exception {
        DeviceServiceImpl mockedService = mock(DeviceServiceImpl.class);
        doNothing().when(mockedService).deleteDevice("123");
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/device/123"))
                .andExpect(status().is2xxSuccessful());
    }



}
