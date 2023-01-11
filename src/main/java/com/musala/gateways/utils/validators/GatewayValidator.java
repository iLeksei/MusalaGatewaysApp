package com.musala.gateways.utils.validators;

import com.musala.gateways.dtos.GatewayDto;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class GatewayValidator extends AbstractValidator {

    public static Map<String, String> validate(GatewayDto dto) {
        Validator validator = createValidator();
        Map<String, String> errors = new HashMap<>();
        Set<ConstraintViolation<GatewayDto>> violations = validator.validate(dto);
        violations.forEach(violation -> {
            errors.put(violation.getPropertyPath().toString() ,violation.getMessage());
        });
        return errors;
    }

}
