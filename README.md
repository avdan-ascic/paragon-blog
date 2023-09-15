# Project Name

Paragon Blog App


## Introduction

The system's main goal is to provide visitos to read blogs and also allow them to register as a user. Users can create their own blogs using a markdown editor. They can also comment on the blog post and share their experience or ask a question related to the blog post.

## Product Functions

- Signup/Signin
- Update user profile
- Create, Read, Update, Delete, Post
- Comment on Posts
- Form Validation using Formik + Yup + Material UI
- Search posts using tags/categories, author name, post title

## Technologies Used

- JavaScript
- NodeJS
- ExpressJS
- MongoDB
- ReactJS


## Setup

Clone this repository. You will need node and npm installed globally on your machine. If you want to run database locally make sure that you have mongoDB server installed and running in background. You can also run cloud database using mongoDB Compas. Create a clutser and paste your connection string in dotenv file.


## Environment Variables

Create a .env file in the root directory of your server route. This file will contain sensitive configuration information needed for your application to function properly.

PORT: The port number on which the server will listen for incoming requests. 
JWT_SECRET: A secret key used for signing and verifying JWT tokens for authentication. 
MONGO: The connection URL for your MongoDB database. 
SESSION_SECRET: An optional secret key used for session management.

## To get a local copy up and running, follow these simple steps:

Clone the repo git clone https://github.com/single71/paragon-blog.git 
Install NPM packages npm install Start the project npm start