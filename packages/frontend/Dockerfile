FROM node:18-alpine AS build

WORKDIR /app

# Install deps
COPY package*.json ./
# Use npm install because this repo does not include package-lock.json
RUN npm install --no-audit --no-fund

# Copy source
COPY . .

# Build the React app (create-react-app produces /build)
RUN npm run build

FROM nginx:stable-alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
