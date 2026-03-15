# Start from an official Node image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the port Vite uses
EXPOSE 5173

# Start the dev server, exposed to outside the container
CMD ["npm", "run", "dev", "--", "--host"]