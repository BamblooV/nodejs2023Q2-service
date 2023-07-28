swagger:
	docker compose up -d --build

dev:
	make swagger
	npm run start:dev

users:
	npm run test -- ./test/users.e2e.spec.ts

albums:
	npm run test -- ./test/albums.e2e.spec.ts

tracks:
	npm run test -- ./test/tracks.e2e.spec.ts

artists:
	npm run test -- ./test/artists.e2e.spec.ts

favorites:
	npm run test -- ./test/favorites.e2e.spec.ts

.PHONY: test
test:
	npm run test
