## About

[A more detailed documentation is available here](https://maxperience.blog/post/webdev-endgame-2020/)

This project is a template to build an offline first web application with authentication, that can be ported easily to other platforms (Android, iOS, Electron). It runs on the following technologies:
- Ionic Angular as frontend framework
- NestJS as backend framework
- CouchDB as remote server database
- PouchDB as local database
- Superlogin for user authentication and roles
- Nano for business logic
- Capacitor as native app wrapper

## Installation
Requirements: Installed Ionic Cli, NodeJS, NestJS and CouchDB locally. Disable the cors policy in couchdb and register an admin (credentials can be edited in the .env file, have a look at the env.config.json in the server/config folder).

Install the client dependencies by `cd client` and running `npm install`. To install server dependencies you have to include the `--no-optional` flag to the npm install command. Start the client framework by running `ionic serve`, the server can be started by running `npm run start:dev`.

