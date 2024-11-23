FROM node:18-slim  # Use a slim Node.js base image for efficiency

WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./  # Optimized copy for common scenarios

# Install dependencies based on package.json
RUN npm ci  # Use npm ci for deterministic builds (optional)

# Copy your application code and test files
COPY . .

# Install additional dependencies required by Puppeteer (optional)
RUN apt-get update && apt-get install -y fonts-noto-color-emoji fonts-noto-sans fonts-liberation  # Example dependencies

EXPOSE 9222  # Expose headless Chrome port (optional)

CMD [ "npm", "test" ]  # Run tests using npm test
