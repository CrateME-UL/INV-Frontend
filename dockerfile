FROM node:22.4-bullseye-slim AS frontend
WORKDIR /app
ARG VITE_API_ENDPOINT
ENV VITE_API_ENDPOINT=${VITE_API_ENDPOINT}
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.27.0
COPY --from=frontend /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf