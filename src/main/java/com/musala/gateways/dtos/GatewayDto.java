package com.musala.gateways.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import static com.musala.gateways.utils.StringUtils.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GatewayDto {

    private Long serialNumber;

    @NotBlank(message = EMPTY_MESSAGE)
    private String name;

    @Pattern(regexp = IPv4_REG_EXP, message = NOT_CORRECT_FORMAT_MESSAGE)
    private String ipAddress;
}
