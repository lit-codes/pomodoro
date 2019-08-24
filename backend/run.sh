#!/bin/bash
docker run -e PKEY="$(cat ../pkey)" -it pomodoro-backend bash
