# Base image for Node.js and Puppeteer
FROM node:18-buster

# Install dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgbm-dev \
    libasound2 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxrandr2 \
    libxss1 \
    libxext6 \
    libpangocairo-1.0-0 \
    libcups2 \
    libxshmfence1 \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy website files and test cases
COPY . .

# Expose a port for Puppeteer (if necessary, optional)
EXPOSE 3000

# Default command to run tests
CMD ["npm", "test"]
