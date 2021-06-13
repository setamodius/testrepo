# develop stage
FROM node:12.18.1-alpine3.10 as develop-stage
WORKDIR /app
COPY package*.json ./
RUN  npm install -g @quasar/cli
COPY . .
# build stage
FROM develop-stage as build-stage
RUN npm rebuild node-sass
RUN npm install
RUN quasar build
# production stage
FROM nginx:1.17.5-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]