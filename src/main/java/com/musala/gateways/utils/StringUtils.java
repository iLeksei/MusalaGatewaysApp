package com.musala.gateways.utils;

public class StringUtils {

    private StringUtils() {
    }

    public static final String IPv4_REG_EXP = "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\." +
            "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\." +
            "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\." +
            "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";

    public static final String EMPTY_MESSAGE = "can not be empty!";
    public static final String NOT_CORRECT_FORMAT_MESSAGE = "has not correct format!";

    public static String sanitize(String str) {
        return str != null ? str.replaceAll("[^A-Za-z0-9-_.\\s]", "") : "";
    }
}
