# User Management System

## Stack
- Bootstrap
- Node
  - Express
- Angular
  - restangular
  - ui.bootstrap
  - ui.router
  - lodash
- Grunt
  - es6 (babel)
  - concat
  - jshint
  - less
  - watch

## Install
If you don't have grunt-cli installed:<br>
```
npm install -g grunt-cli
```

then,

```
git clone git@github.com:AbuMuslimAmr/user-management-system.git
cd user-management-system
sudo npm install
bower install
```
then,
```
grunt
```
then (in a new terminal tab), 
```
node express
```
<br>
You can configure port from 'express/config.js' <br>
App then should be up and running on port 3000 (by default).

## APIs
- 'Group' resource
  - POST /group
  - GET /group/:id?
  - DELETE /group/:id
  - PUT /group/:id
  - POST /group/:group_id/user/:user_id
  - DELETE /group/:group_id/user/:user_id
- 'User' resource
  - POST /user
  - GET /user/:id?
  - DELETE /user/:id
  - PUT /user/:id

## Frontend routes
- /groups
- /groups/:id
- /users
- /users/:id
