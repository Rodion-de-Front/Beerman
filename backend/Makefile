run-local:
	python -m app

run-db:
	docker compose -f ../docker-compose.yaml up db redis --build -d
# Make database migration
.PHONY: migration
migration:
	alembic revision \
	  --autogenerate \
	  --rev-id $(shell python alembic/_get_next_revision_id.py) \
	  --message $(message)

.PHONY: migrate
migrate:
	alembic upgrade heads

.PHONY: app-build
app-build:
	docker-compose build

.PHONY: app-run
app-run:
	docker-compose stop
	docker-compose up -d --remove-orphans

.PHONY: app-stop
app-stop:
	docker-compose stop

.PHONY: app-down
app-down:
	docker-compose down

.PHONY: app-destroy
app-destroy:
	docker-compose down -v --remove-orphans

.PHONY: app-logs
app-logs:
	docker-compose logs -f api