# Stage 1: Build React app
FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve app with nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3001

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
