# Use an official Nginx image to serve static files
FROM nginx:alpine

# Copy frontend files to Nginx HTML directory
COPY . /usr/share/nginx/html

# Expose port 80 for frontend
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

