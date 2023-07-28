swagger:
	docker compose up -d --build

dev:
	make swagger
	npm run start:dev

user:
	npx jest run --config ./test/jest-e2e.json -t user