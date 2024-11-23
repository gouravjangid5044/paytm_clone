FROM node:18-alpine  # Use slim Node.js image for smaller size

WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy test directory
COPY tests ./tests

# Expose port for Puppeteer (optional, for debugging)
# EXPOSE 9222  # uncomment if needed

# Run the tests
CMD [ "npm", "test" ]
