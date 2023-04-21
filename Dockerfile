




# # Use an official Node.js runtime as a parent image

# FROM node:14-alpine

# WORKDIR /app
# # Set the working directory to 

# COPY --from=nginx:latest /etc/nginx/nginx.conf  /app

# # Copy the package.json and package-lock.json files to the container


# # Install dependencies
# RUN npm install
# COPY . ./app/www/html
# # Copy the rest of the application code to the container


# # Build the application for production
# # RUN npm run build
# # COPY ./app /nginx.conf
# # Expose the port that the application will be running on
# EXPOSE 3000

# # Start the application
# CMD ["npm", "start"]


# base image
FROM node:16 as build

# set working directory
WORKDIR /app

# copy the package.json and package-lock.json files
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application files
COPY . .

# build the application
RUN npm run build

# final image
FROM nginx:latest

# copy the built application from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# copy the nginx configuration
# COPY ./nginx.conf /usr/share/nginx/conf.d/default.conf

# expose port 80 for the nginx server
EXPOSE 80

# start nginx server
CMD ["nginx", "-g", "daemon off;"]

