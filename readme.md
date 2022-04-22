## KBE - frontend

### description

This **NextJS** + **ChakraUI** Project builds the frontend and can display various Pokemon that get fetched out of our Microservices <br/>
It uses **React 17** and **Next 12**<br/>

#### running the project

You can build and start the project with Docker by running  `docker-compose up --build` in rootdir or use the Intellij
Configuration `dockerCompose` <br/>

#### deploying the project

A heroku dyno is configured and all you have to do to deploy to prod is this: `git push heroku master` ( if youre logged
in to Heroku )

heroku domain: **kbe-warehouse.herokuapp.com**

#### API docs

![alt text](./readMeResources/swagger.png)

https://kbe-warehouse.herokuapp.com/swagger
