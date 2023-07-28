swagger:
	docker compose up -d --build

dev:
	make swagger
	npm run start:dev