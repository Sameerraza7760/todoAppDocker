# Use the official Node.js 18 image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy only package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (Next.js default)
EXPOSE 3000

# Start the Next.js dev server
CMD ["npm", "run", "dev"]
