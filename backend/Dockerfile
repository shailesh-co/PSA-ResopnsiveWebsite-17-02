# Use a smaller base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Only copy necessary files for npm install first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy remaining files
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
