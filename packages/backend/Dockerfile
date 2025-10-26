FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
# Use npm install because this repo does not include package-lock.json
RUN npm install --only=production --no-audit --no-fund

# Copy source
COPY . .

ENV NODE_ENV=production

# Expose the port the app uses (container)
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
