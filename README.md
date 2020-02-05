## About
This project is a template to build an offline first web application with authentication, that can be ported easily to other platforms (Android, iOS, Electron). It runs on the following technologies:
- Ionic Angular as frontend framework
- CouchDB as remote server database
- PouchDB as local database
- Superlogin for user authentication and roles
- Nano for buisness logic
- Capacitor as native app wrapper

## Installation
Install the client dependencies by `cd client` and running `npm install`. To install server dependencies you have to include the `--no-optional` flag to the npm install command. Start the client framework by running `ionic serve`, the server can be started by running `nodemon server.js`. Note: You should install the ionic cli & nodemon globally.


