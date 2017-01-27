<h1>Movie Rating App</h1>
<p>Pull down the repo and in terminal navigate to the root directory.</p>
<p>Run these two commands from the root directory to download all of the required dependencies from package.json and bower.json.</p>
```$ npm install```
<br />
```$ bower install```
<h3>Installing Homebrew and MongoDB</h3>
<p>Before you can run the app you need to make sure that you have MongoDB installed globally. To do this, you will first need a package manager called <a href="http://brew.sh/" target="_blank">Homebrew</a>.</p>
<p>Once you have homebrew install, you can install mongodb with the following command:</p>
```$ brew install mongodb```
<p>If you run into any errors downloading MongoDB, visit <a href="http://treehouse.github.io/installation-guides/mac/mongo-mac.html" target="_blank">here</a> for more information.</p>
<h3>Creating root user for local database authentication</h3>
<p>To do this, run</p>
```$ mongod```
<p>in the terminal and then open up a new terminal window. In this new window enter</p>
```$ mongo```
<p>then</p> 
```$ use admin```
<p>to switch to the admin database.</p>
```db.createUser({ user: "<username>", pwd: "<password>", roles: [ "userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]})```
<p>This will create a user with all privileges in any database.</p>
<p>Once you have created an admin user, in the project folder, navigate to</p>
```/config/mongo.js```
<p>Here you will add the username and password that you just created to the json configuration for development and production. <strong>Be sure to remove the username and password before you push any code up to github.</strong></p>
<h3>Running the app</h3>
<p>If all of the above are successful, navigate to the root directory in terminal and run</p>
```$ gulp```
<p>This will start the server on <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>
<strong>If you decide to push any code, please push to the development branch, NOT the Production/Master branch.</strong>