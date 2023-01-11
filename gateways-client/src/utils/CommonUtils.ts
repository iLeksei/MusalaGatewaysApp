
export const getBaseUrl = (): string =>
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8080/api";
