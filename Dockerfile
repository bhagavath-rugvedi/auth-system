# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY server/ ./
COPY client/ ./public/

# Environment variables
ENV MONGODB_URI=mongodb://mongo:27017/authentication-system
ENV JWT_SECRET=your_production_secret_here
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "start"]