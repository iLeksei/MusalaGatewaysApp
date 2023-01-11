package com.musala.gateways.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.musala.gateways.enums.StatusEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

import static com.musala.gateways.utils.StringUtils.EMPTY_MESSAGE;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceDto {

    private UUID uid;

    @NotBlank(message = EMPTY_MESSAGE)
    private String vendor;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime createdAt;

    @NotNull(message = EMPTY_MESSAGE)
    private StatusEnum status;
}
