// Import the Express framework
const express = require('express');
// Create an instance of an Express application
const app = express();

// Import the built-in Node.js file system module
const fs = require('fs');

var user = {
    "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher",
       "id": 4
    }
 }
 
 app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })

// Define a route handler for GET requests to '/listUsers'
app.get('/listUsers', function (req, res) {
   // Read the contents of the 'users.json' file in the same directory
   fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
      if (err) {
         // Log the error and send a 500 response if reading fails
         console.error("Failed to read users.json:", err);
         res.status(500).send("Internal Server Error");
         return;
      }
      // Log the data to the console (for debugging)
      console.log(data);
      // Send the content of users.json as the response
      res.send(data);
   });
});

// Start the server and listen on port 8081
const server = app.listen(8081, function () {
   // Get the server address information
   const host = server.address().address;
   const port = server.address().port;
   // Log the address where the server is listening
   console.log("Server running at http://%s:%s", host, port);
});
