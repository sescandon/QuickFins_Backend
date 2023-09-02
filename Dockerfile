  # Use Node.js v16 as the base image
FROM node:16

# Set the working directory inside the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first, then run npm install
# This is an optimization step that allows Docker to cache the node modules
# separate from the rest of your source code.
COPY package*.json ./
RUN npm install

EXPOSE 8080

# Copy the rest of the source code into the container
COPY . .

# Run the TypeScript compiler to build the JavaScript files
RUN npm run tsc

# Specify the command to run your application
CMD [ "node", "build/index.js" ]