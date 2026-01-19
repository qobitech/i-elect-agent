# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the environment file
COPY .env.production .env.production

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the application
COPY . .

# Build the project
RUN yarn build

# Second stage: serve
FROM node:18-alpine
WORKDIR /app

# Install 'serve' globally to serve the static files
RUN yarn global add serve

# Copy build output from the build stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 3000

# Serve the React app using 'serve'
CMD ["serve", "-s", "dist", "-l", "3000"]
