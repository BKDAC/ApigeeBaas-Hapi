# ApigeeBaas-Hapi

##Apigee-Baas & Hapi in Action

###hapi is a rich framework for building applications and services. 
In this article we build sample to showcase some of the capabilities of Apigee-Baas features and hapi framework to build enterprise quality applications. 
Apigee Edge Baas provides developers with access to flexible data store and enables you to quickly integrate valuable features into your app, including social graphs, user management, data storage, push notifications, performance monitoring and more.
If you are not familiar with hapi, please visit the site for more information.
###
> http://hapijs.com/tutorials/getting-started

###
Create a new hapi project with the command npm init and follow the prompt to create a package.json in the project directory.

To begin with clone the repository and start the server by running any of the cotrollers from the command prompt.

> node restaurants.js

> node review.js

> node users.js

to make a request to restaurants use 

> http://localhost:3000/restaurants

> http://localhost:3000/users

> http://localhost:3000/reviews

To POST a review

> http://localhost:3000/reviews

Payload:
>{"rating": 4,
>"restID": 2,
>"reviewer": "Alex",
>"title": "Yummy Tacos in town"
>}



