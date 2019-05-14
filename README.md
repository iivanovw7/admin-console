# Admin-console

Administration console of some IT company. Allows to observe and manage specific company's data.
Repository contains two separate projects: FE client (React application), and backend API (express server).
Mongo db is used as a data storage.

##### Main project functionality: 
- View statistics and create reports to excel/pdf
- Manage user status ("active" or "disabled")
- Manage some user permissions by role, personal permissions, by group, by branch.
- Send notifications to the user or to the group/role/branch
- Work with tickets (open, close, reopen)
- Manage user groups
- Manage company branches
- Manage user roles
- Manage permissions 

See more details in [Features](#features) section.

> Frontend: ReactJS, Material UI, D3, Redux, Axios

> Backend: NodeJS, Express, MongoDB, Mongoose 

---

## Table of Contents

- [Requirements](#requirements)
- [Clone](#clone)
- [Installation](#installation)
- [Features](#features)
- [Testing](#testing)
- [License](#license)

---

## Requirements

- [NodeJS 10.15.3](https://nodejs.org/en/) 

- [NPM 6.4.1](https://www.npmjs.com/get-npm)


### Clone

- Clone this repo to your local machine using `https://github.com/iivanovw7/admin-console.git`

## Installation
For Ubuntu or Debian-based Linux distributions
(Tested on: Ubuntu 16.04.6 LTS (Xenial Xerus), Ubuntu 18.04.2 LTS (Bionic Beaver))
-------
- Clone repository: <br />
`git clone https://github.com/iivanovw7/admin-console.git` <br />
- Navigate into the application directory <br />
`cd admin-console` <br />
- Install packages: <br />
`npm install` <br />
-------
##### Option 1 (with Nodemon)
At this point Nodemon is in charge of managing global variables, so you have to create configuration file: 
<br />
`nano nodemon.json` <br />

with similar contents:
1. PORT application will run on
2. Any "SECRET" String 
3. Mongo DB credentials
```
{
  "exec": "babel-node -- ./private_api/index.js --debug",
  "env": {
    "PORT_PRIVATE": XXXX,
    "SECRET": "XXXX",
    "DATABASE": "mongodb://LOGIN:PASSWORD"
  }
}
```
Save and close `nodemon.json` and run private api: <br />
`npm run start` <br />
-------
##### Option 2 (with NPM script)
If you don't like Nodemon, or maybe you are going to execute app with pm2, 
you can use npm script:

- Edit package.json <br />
`nano package.json` <br />
- Put you credentials and config at section "config", as described in Option 1: <br />
```
"config": {
    "port": XXXX,
    "secret": "XXXX",
    "db": "mongodb://LOGIN:PASSWORD"
  }
```

Save and close `package.json` and run private api: <br />
`npm run prod` <br />
-------



## Features

##### Authorisation
By password or email, for everyone except employees with role USER. 
Session is stored on the server side. 
##### Statistics
Statistics is default screen of this application. Provides graphical representation of stored data, such as
 tickets, messages, groups, branches and users. Form also supports export of every separate chart to excel,
  pdf or csv. Different charts are available (Bars, Pipes, Pies)  
Time periods for every statistics query are also adjustable (example: 3, 6, 12 months) 
##### Staff
List of employees with pagination and search function by specific categories. Search by name or email.
Results are sorted by creation date, newest users go first. User can be disabled or edited.
User data available for changing: 
- additional information about user: Branch, location
- users's group
- users's branch
- users's status
##### Roles
Section provides with a possibility of managing (ADD/REMOVE/DISABLE) user roles. Removed role will be 
removed for all users. Before saving edited role application requires users's confirmation. Staff is 
limited by group/pool.
Default ROLES:
- Administrator (Full access, cannot be deleted or disabled)
- Branch Administrator (Access among the branch, cannot be deleted) 
- Manager (Access among the pool or group, cannot be deleted)
- User (cannot be deleted or disabled)
- Support (cannot be deleted)
- Branch support (cannot be deleted)
##### Messages
Send a message to a group/branch. Access is limited according to user's role/group/branch.
If user is Pool/Group manager, then their group is preselected and disabled.
If user is Branch Administrator, then their branch should be preselected and disabled instead of group.
If user is Administrator, they should be able to select a group or a branch and send a message.
##### Reports
Reports can be created by another system. Filtering reports with pagination. Displays report status, notes,
 data. Preview reports data. Search by Name or subject.
##### Groups
Used to set permissions for group. Removed group is replaced for every user with alternative one (with 
default) Group is user for sending messages by default. Disabling group disables permissions as well.  
##### Branches
Section used for observing company's offices. Can be used to group and filter employees.
Can be disabled (Closed)
Cannot be removed. Contains only information about branch. (System name, address, contacts, status)


## Testing

> Libraries used:

- [Jest](https://jestjs.io/)
- [Enzyme](https://airbnb.io/enzyme/)
- [Supertest](https://github.com/visionmedia/supertest)

#### Backend Unit testing

Unit tests cover all database models, all routes including authentication routes and helper-functions as well.
   
> How to run unit tests

Should run in directory: `./admin-console/server` <br />
`npm install` <br />
`npm run test` <br />


#### Backend Postman testing

Repository contains postman tests backups, which can be used for API testing.

> How to run postman tests  

- Upload samples data into db  `npm run reload`  <br />
- Import postman collections from `./server/postman` directory  <br />
- Fill in postman environment variables with correct mongoDB  <br /> 
  objectID :
   > - user_admin
   > - user_manager
   > - user_user
- Run collection API_TEST with delay around `100`ms 

#### Frontend RCA testing
###### Tests cover main application components, reducers, actions and some of UI components.

Should run in directory: `./admin-console/client` <br />
`npm install` <br />
`npm run test` <br />

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a href="/" target="_blank">admin-console</a>


