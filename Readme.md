# chai aur backend series

-   [Model Link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

## Best Practices :

-   MongoDB Atlas :
    -   Shared database.
    -   [project link](https://cloud.mongodb.com/v2/65532f7a9e38923fbfa6089f#/overview)
    -   DATABASE CONNECTION :
        -   2 ways to write the DB connection code.
            1. write the entire function in index.js.
                - makes the index.js file heavy & polluted.
            2. write the DB connection function in `db` folder and import the functions.
                - mostly preffered as easy to maintain.

## DEPENENCIES:

-   Nodemon :
    -   install the DEV DEPENDENCY.
    -   command : `npm i -D nodemon`
    -   DEV DEPENDENCY : it is not moved to production but, only used in development process.
-   dotenv :
    -   Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
-   mongoose(ODM) : Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
-   express : Fast, unopinionated, minimalist web framework for Node.js.
