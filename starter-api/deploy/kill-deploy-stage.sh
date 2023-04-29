#!/bin/bash

# kill pre-deploying process
pgrep -f "deploy-app-stage" && kill -9 `pgrep -f "deploy-app-stage"`
pgrep -f "nest build" && kill -9 `pgrep -f "nest build"`
