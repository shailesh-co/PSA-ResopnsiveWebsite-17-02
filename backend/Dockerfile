# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json only (Remove package-lock.json)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]


