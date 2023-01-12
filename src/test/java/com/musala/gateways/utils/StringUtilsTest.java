package com.musala.gateways.utils;


import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class StringUtilsTest {

    @Test
    public void shouldSanitizeString() {
        assertEquals("", StringUtils.sanitize(""));
        assertEquals("", StringUtils.sanitize(null));
        assertEquals("abc", StringUtils.sanitize("abc"));
        assertEquals("111abc", StringUtils.sanitize("111abc"));
        assertEquals(".123-_", StringUtils.sanitize(",.*123-_!@##$%%^&*(){}[]:;+\\//"));
        assertEquals(" abc ", StringUtils.sanitize(" abc "));
    }

}
