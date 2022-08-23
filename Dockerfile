FROM node:14.17.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm config set registry=https://registry.npmmirror.com/
RUN npm install --production && npm cache clean --force && npm install typescript -g
RUN npm ci
COPY . /usr/src/app
EXPOSE 7004
CMD ["npm","run", "start"]

