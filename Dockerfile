FROM node:18.12.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm config set registry=https://registry.npmmirror.com/ && npm install typescript -g && npm ci
# RUN npm install --production && npm cache clean --force && npm install typescript -g
# COPY . /usr/src/app
EXPOSE 7004
CMD ["npm","run", "docker-start"]

