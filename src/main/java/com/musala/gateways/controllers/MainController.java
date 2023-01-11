package com.musala.gateways.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@Slf4j
@RestController
@RequestMapping("/api")
public class MainController {

    @GetMapping(value = "/health-check", produces = MediaType.TEXT_PLAIN_VALUE)
    public String healthCheck() {
        LOG.info("GET: /health-check. result: alive");
        return "alive";
    }

    @PostMapping(value = "/log-ui-error")
    public void logUiError(@RequestBody String uiErrorMessage) {
        LOG.error("UI ERROR: {}", uiErrorMessage);
    }
}

