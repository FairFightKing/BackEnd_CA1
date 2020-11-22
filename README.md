# BackEnd_CA1
# DB Password CD2CK55yScXVzij
So we first start our project with a little command "> index.js" to create an empty index.js file. 
We first have to git init inside our project folder and add the project remote. 
When that's done, and we have one our first init commit, we first init our node app running a "npm init" since we already have installed node and npm. 
Then we install express by doing "npm install express". 
After doing all that we should first gitignore the node_modules because we don't want that inside our git repository because it takes up space for nothing, and it doesn't help version control.

So first we have to start our index.js file with the dependencies we need, so we require express and set up the port we will listen on for later. 
Then we create the Mongo database and create a cluster then create a db and a collection. After that we import it into our code and create a user password.
Then we have to set up our CRUD by initialising each CRUD operation.

Then we want to define our object that we are going to use and store inside our database, so we code it to use it as a model for our database and CRUD operations.
