#!/bin/sh

echo "Starting application..."
eval "java -jar target/musala-gateways-app.jar --PORT= --DB_USER= --DB_PASS="

pause