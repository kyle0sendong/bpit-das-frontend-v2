# Stage 1: Build Stage
FROM node:22-alpine as BUILD_IMAGE

WORKDIR /app/react-app

# Install dependencies
COPY package*.json .
RUN npm ci

# Copy source code and environment files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM node:22-alpine as PRODUCTION_IMAGE
WORKDIR /app/react-app

# Copy the built files from the build stage
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/

# Install tzdata in the container
RUN apk add --no-cache tzdata
RUN npm install -g serve

# Start
CMD ["serve", "-s", "/app/react-app/dist", "-p", "55000"]