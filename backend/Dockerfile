FROM node:latest
WORKDIR /opt/pomodoro
COPY files/*.json /opt/pomodoro/
RUN npm ci
COPY files/src /opt/pomodoro/src
