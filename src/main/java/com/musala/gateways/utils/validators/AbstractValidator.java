package com.musala.gateways.utils.validators;

import lombok.extern.slf4j.Slf4j;

import javax.validation.Configuration;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

@Slf4j
public class AbstractValidator {

    protected AbstractValidator() {
    }

    protected static Validator createValidator() {
        Configuration<?> config = Validation.byDefaultProvider().configure();
        ValidatorFactory factory = config.buildValidatorFactory();
        Validator validator = factory.getValidator();
        factory.close();
        return validator;
    }
}
