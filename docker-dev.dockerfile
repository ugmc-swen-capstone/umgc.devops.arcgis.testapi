#stage 1: build and deploy dev version of application
FROM gmathieu/node-browsers:3.0.0 AS build


COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

#ENV PATH="./node_modules/.bin:$PATH"

WORKDIR /ng-app


COPY . ./

RUN npm run ng build --prod --output-path=dist

FROM nginx:1.15.8-alpine

## Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy our default nginx config
COPY ./dev/default.nginx.conf /etc/nginx/conf.d/
## COPY ./dev/nginx.conf /etc/nginx/conf.d/default.conf.template
## COPY ./dev/nginx.conf /etc/nginx/nginx.conf

## From ‘build’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=build  /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
