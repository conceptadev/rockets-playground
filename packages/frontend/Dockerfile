FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY package.json ./

# Install dependencies with frozen lockfile for reproducibility
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 5173

# Run dev server with host flag to allow external connections
CMD ["yarn", "dev", "--host"]
