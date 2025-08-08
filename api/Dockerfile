# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# pnpm needs python and g++ for some native packages
RUN apk add --no-cache python3 g++ make

# Install pnpm
RUN npm install -g pnpm

# Copy dependency definition files (workspace-aware)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ../packages ./packages

# Install ALL dependencies (including devDependencies for build) using workspace lockfile
RUN pnpm install --frozen-lockfile || pnpm install --no-frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Stage 2: Create the production image
FROM node:20-alpine
WORKDIR /usr/src/app

# Copy built code and dependencies from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD [ "node", "dist/index.js" ]
