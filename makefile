build:
	docker build -t inv-backend/nginx:local --build-arg VITE_API_ENDPOINT=http://inv-server.default.svc.cluster.local:3000 . --force-rm --no-cache
