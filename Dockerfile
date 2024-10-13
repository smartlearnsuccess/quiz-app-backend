# Stage 1: Build the React application
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY server.js ./

# Build the React application
# RUN npm run build

# Expose port 5000
EXPOSE 5000

# Start nginx
CMD ["npm", "run", "build"]