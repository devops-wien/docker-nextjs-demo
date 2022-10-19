FROM node:19 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM node:19
ADD "entrypoint.sh" "/"
RUN chmod +x "/entrypoint.sh"

WORKDIR /usr/src/app

COPY . .
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
