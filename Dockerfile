# Use official Node.js image as the base image
FROM node:18-slim

# Install dependencies required by Puppeteer (including missing libraries for Chromium)
RUN apt-get update && apt-get install -y \
  gconf-service \
  libasound2 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgconf-2-4 \
  libnspr4 \
  libnss3 \
  libxss1 \
  libxtst6 \
  xdg-utils \
  libxrandr2 \
  libatk-bridge-2.0-0 \
  libgbm1 \
  libgtk-3-0 \
  libpango-1.0-0 \
  libpixman-1-0 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  && rm -rf /var/lib/apt/lists/*

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app will run on (if needed)
# EXPOSE 3000

# Command to run tests inside the container
CMD ["npm", "test"]
