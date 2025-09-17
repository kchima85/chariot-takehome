build-up:
	docker-compose up --build

logs-db:
	docker-compose logs -f postgres

logs-api:
	docker-compose logs -f api

test-unit:
	npm run test:unit

test-int:
	npm run test:int

migration-create:
	docker-compose exec api npm run migration:generate -- -n $(NAME)

migration-run:
	docker-compose exec api npm run migration:run

migration-revert:
	docker-compose exec api npm run migration:revert

migration-revert-all:
	docker-compose exec api npm run migration:revert:all

seed:
	docker-compose exec api npm run seed:run

connect-db:
	docker compose exec postgres psql -U postgres -d chariot_takehome
