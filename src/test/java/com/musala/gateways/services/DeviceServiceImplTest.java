package com.musala.gateways.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.musala.gateways.dtos.DeviceDto;
import com.musala.gateways.entities.Device;
import com.musala.gateways.entities.Gateway;
import com.musala.gateways.enums.StatusEnum;
import com.musala.gateways.repositories.DeviceRepository;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class DeviceServiceImplTest {

    @Autowired
    private DeviceServiceImpl deviceService;
    @MockBean
    private DeviceRepository deviceRepository;
    @MockBean
    private GatewayRepository gatewayRepository;

    private Gateway buildTestGateway(long serialNumber) {
        Gateway gateway = new Gateway();
        gateway.setName("test");
        gateway.setIpAddress("1.1.1.1");
        gateway.setSerialNumber(serialNumber);
        gateway.setDeviceList(Arrays.asList(buildTestDevice(1L), buildTestDevice(2L)));
        return gateway;
    }

    private Device buildTestDevice(long uid) {
        Device device = new Device();
        device.setUid(uid);
        device.setVendor("test");
        device.setStatus(StatusEnum.ONLINE);
        return device;
    }

    @Test
    public void shouldDeleteDevice() {
        doNothing().when(deviceRepository).deleteById(anyLong());
        deviceService.deleteDevice("123");
        verify(deviceRepository).deleteById(123L);
    }

    @Test
    public void shouldReturnDevicesList() {
        when(gatewayRepository.getById(anyLong())).thenReturn(buildTestGateway(1L));
        assertEquals(2, deviceService.getAllDevicesForGateway("123").size());
        verify(gatewayRepository).getById(123L);
    }

    @Test
    public void shouldAddNewDevice() {
        when(deviceRepository.countDevicesByGateway(anyLong())).thenReturn(0);
        DeviceDto deviceDto = new DeviceDto();
        deviceDto.setStatus(StatusEnum.ONLINE);
        deviceDto.setVendor("test-vendor");
        assertEquals(0, deviceService.addNewDevice(deviceDto, "123").size());
        verify(deviceRepository).save(any(Device.class));
    }

    @Test
    public void shouldReturnViolationsMap() {
        when(deviceRepository.countDevicesByGateway(anyLong())).thenReturn(10);
        when(gatewayRepository.getById(anyLong())).thenReturn(buildTestGateway(1L));
        DeviceDto deviceDto = new DeviceDto();
        deviceDto.setStatus(null);
        deviceDto.setVendor("");
        Map<String, String> result = deviceService.addNewDevice(deviceDto, "123");
        assertEquals(3, result.size());
        assertEquals("can not be empty!", result.get("vendor"));
        assertEquals("can not be empty!", result.get("status"));
        assertEquals("Gateway serialNumber: '123' has max amount of devices: 10", result.get("Device"));
    }

}
