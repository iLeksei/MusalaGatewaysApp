package com.musala.gateways.utils.validators;

import com.musala.gateways.dtos.DeviceDto;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class DeviceValidator extends AbstractValidator {

    public static Map<String, String> validate(DeviceDto dto) {
        Validator validator = createValidator();
        Map<String, String> errors = new HashMap<>();
        Set<ConstraintViolation<DeviceDto>> violations = validator.validate(dto);
        violations.forEach(violation -> {
            errors.put(violation.getPropertyPath().toString() ,violation.getMessage());
        });
        return errors;
    }

}
