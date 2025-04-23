// Import the Express framework
const express = require('express');
// Create an instance of an Express application
const app = express();

// Import the built-in Node.js file system module
const fs = require('fs');

// ADD USER
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.post('/addUser', function (req, res) {
const filePath = __dirname + "/users.json";

fs.readFile(filePath, 'utf8', function (err, data) {
   if (err) {
      console.error("Read error:", err);
      return res.status(500).send("Failed to read file");
   }

   let users = JSON.parse(data);
   users["user4"] = user["user4"];

fs.writeFile(filePath, JSON.stringify(users, null, 2), function (err) {
   if (err) {
      console.error("Write error:", err);
      return res.status(500).send("Failed to write file");
   }
   
   console.log("✅ File written successfully!"); // <-- Add this
   res.json(users);
   });
});
});

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

// FETCH
app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id]
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

// DELETE USER
app.delete('/deleteUser/:id', function (req, res) {
   const userId = req.params.id;

   fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
      if (err) {
         console.error("Error reading file:", err);
         return res.status(500).send("Server Error");
      }

      const users = JSON.parse(data);

      if (!users["user" + userId]) {
         return res.status(404).send("User not found");
      }

      delete users["user" + userId];

      // Save the updated data back to file
      fs.writeFile(__dirname + "/users.json", JSON.stringify(users, null, 2), function (err) {
         if (err) {
            console.error("Write error:", err);
            return res.status(500).send("Failed to write file");
         }

         console.log("Deleted user" + userId);
         res.end(JSON.stringify(users));
      });
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
