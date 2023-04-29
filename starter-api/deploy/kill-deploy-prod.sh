#!/bin/bash

# kill pre-deploying process
pgrep -f "deploy-app-prod" && kill -9 `pgrep -f "deploy-app-prod"`
pgrep -f "nest build" && kill -9 `pgrep -f "nest build"`
