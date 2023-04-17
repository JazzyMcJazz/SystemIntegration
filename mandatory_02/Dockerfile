FROM node:18-slim

RUN mkdir -p /usr/src/

WORKDIR /usr/src/

COPY /App/ /usr/src/

RUN npm ci
RUN npm run build
CMD ["npm", "start"]