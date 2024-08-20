build:
	docker build -t inv-frontend:local --build-arg VITE_API_ENDPOINT=http://localhost/api/v1 . --force-rm --no-cache
	minikube image load inv-frontend:local
