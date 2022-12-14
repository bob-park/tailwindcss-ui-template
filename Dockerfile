FROM nginx:1.13.9-alpine
WORKDIR /home/application
COPY ./build /home/application
CMD ["nginx", "-g", "daemon off;"]