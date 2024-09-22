build:
	docker build -t inv-frontend:local --build-arg VITE_API_ENDPOINT=$$VITE_API_ENDPOINT . --force-rm --no-cache
