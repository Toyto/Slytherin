FROM node:boron

# Create app directory
WORKDIR /reactapp

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install
RUN npm install webpack -g
RUN npm install webpack-dev-server -g
RUN npm install axios
EXPOSE 8080
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /reactapp/
