package com.musala.gateways.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import uk.org.lidalia.slf4jtest.LoggingEvent;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(MainController.class)
class MainControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnHealthCheckStatus() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/health-check"))
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string("alive"));
    }

    @Test
    void shouldLogUiErrorText() throws Exception {
        TestLogger logger = TestLoggerFactory.getTestLogger(MainController.class);
        logger.clear();
        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/log-ui-error").content("Test ui error"))
                .andExpect(status().is2xxSuccessful())
                .andDo((data) -> {
                    LoggingEvent log = logger.getLoggingEvents().stream().findFirst().get();
                    assertEquals("ERROR", log.getLevel().toString());
                    assertEquals("UI ERROR: {}", log.getMessage());
                    assertEquals("Test ui error", log.getArguments().get(0));
                });
    }
}
