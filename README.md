# BackEnd_CA1
So we first start our project with a little command "> index.js" to create an empty index.js file. 
We first have to git init inside our project folder and add the project remote. 
When that's done, and we have one our first init commit, we first init our node app running a "npm init" since we already have installed node and npm. 
Then we install express by doing "npm install express". 
After doing all that we should first gitignore the node_modules because we don't want that inside our git repository because it takes up space for nothing, and it doesn't help version control.

So first we have to start our index.js file with the dependencies we need, so we require express and set up the port we will listen on for later. 
Then we create the Mongo database and create a cluster then create a db and a collection. After that we import it into our code and create a user password.
We also need to set up our connection to the db and setup the app.listen to have our app listening on the right port and connecting to the db plus having the corresponding collection.
Then we have to set up our CRUD by initialising each CRUD operation.

Then we want to define our object that we are going to use and store inside our database, so we code it to use it as a model for our database and CRUD operations.And I just saw that we don't use Mongoose, so we can't use a model for our database.
To try the connection to our db we have to set up our READ getter to see if we can ask for the whole database as a json.
I also wanted to not use that async func that we launch without argument, I really think we could have done better, but we didn't see any other way to do it, so I'll stick to this. 
Same for the run func that I would prefer to use the app.listen function to do that but I don't know if that's possible.
Inside the Read I made it so if we don't use any ID it will return the whole database and if we put any ID it will look for a matching one and send it to the user.
Plus I used ternary operator to simplify the Update, so we can put any field we want, and it will keep the ones we didn't specify;
Added empty fields so we know its not correct and proper feedbacks