#stage 1: build and deploy dev version of application
FROM gmathieu/node-browsers:3.0.0 AS build

WORKDIR /usr/angular-workdir

COPY package.json ./

RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./

RUN ng build --prod

FROM nginx:1.15.8-alpine

## Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY ./dev/nginx.conf /etc/nginx/nginx.conf
## COPY ./dev/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=build  /usr/angular-workdir/dist/cdcop-app-project .

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
