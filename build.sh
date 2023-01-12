#!/bin/sh

echo "Building application..."

eval "mvn install"

read -p "Press any key to resume ..."