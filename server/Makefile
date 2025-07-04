DC = docker compose
LOGS = docker logs
EXEC = docker exec -it
APP_NAME = syncer-service
RUFF_CONFIG_PATH = /opt/app/pyproject.toml
PYTEST_CONFIG_PATH = /opt/app/pyproject.toml
NETWORK_NAME = syncer_network

start: network build up

network:
	docker network create ${NETWORK_NAME} || true

up:
	${DC} up -d

build:
	${DC} build --parallel

log:
	${LOGS} ${APP_NAME} -f -n 1000

down:
	${DC} down

bash:
	${DC} run --rm ${APP_NAME} /bin/bash

lock:
	${DC} run --rm ${APP_NAME} uv lock

ruff:
	${DC} run --rm ${APP_NAME} ruff check --config ${RUFF_CONFIG_PATH}

ruff_fix:
	${DC} run --rm ${APP_NAME} ruff check --fix --config ${RUFF_CONFIG_PATH}

ruff_fmt:
	${DC} run --rm ${APP_NAME} ruff format --config ${RUFF_CONFIG_PATH} ./

shell:
	${DC} exec -it ${APP_NAME} ./manage.py shell

pre_commit: ruff_fix ruff_fmt