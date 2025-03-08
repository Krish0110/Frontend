#Use official Node.js image
FROM node:18

#set working directory
WORKDIR /app

#copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

#copy rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
