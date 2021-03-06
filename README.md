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

Admin panel is available as [Demo](https://admin-console.cf) with mocked data <br />
[API documentation](https://admin-console.cf/api/docs) page is available after login/registration <br />  

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

- [NodeJS 8.x](https://nodejs.org/en/) 
- [NPM 6.4.1](https://www.npmjs.com/get-npm)

### Clone

- Clone this repo to your local machine using `https://github.com/iivanovw7/admin-console.git`

## Installation

For Ubuntu or Debian-based Linux distributions. <br />
Tested on: Ubuntu 16.04.6 LTS (Xenial Xerus), Ubuntu 18.04.2 LTS (Bionic Beaver)

-------

### Prepare 

- Clone repository: <br />
`git clone https://github.com/iivanovw7/admin-console.git` <br />
- Navigate into the application directory <br />
`cd admin-console` <br />
- Install packages: <br />
`cd client` <br />
`npm install` <br />
`cd ..` <br />
`cd server` <br />
`npm install` <br />
`npm install -g serve` <br />

Private API URL should be set in `client/src/constants/api.js` file <br />
Example value: `'https://admin-console.cf/api'`;

-------

### Configuring private API 

##### Option 1 (with Nodemon)

At this point Nodemon is in charge of managing global variables, so you have to create configuration file: <br />
`nano nodemon.json` <br />

with similar contents:
1. PORT application will run on
2. Any "SECRET" String 
3. Mongo DB credentials
4. Domain name (used in CORS configuration)

```json
{
  "exec": "babel-node -- ./private_api/index.js --debug",
  "env": {
    "PORT_PRIVATE": XXXX,
    "SECRET": "XXXX",
    "DATABASE": "mongodb://LOGIN:PASSWORD",
    "URL": "http://localhost:4782"
  }
}
```
Save and close `nodemon.json` and run private api for test: <br />
`npm run start` <br />

After private API has started you should receive in console something 
like this:

```
Private api is available on port XXX
Connected to database successfully.
``` 
API documentation is created with `swagger-ui` and should become available: <br />
`http://{application path}:{PORT_PRIVATE}/api/docs` <br />
Note that link will only become available in user got logged in main admin-console application, and has `ADMIN` access rights <br />

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
    "db": "mongodb://LOGIN:PASSWORD",
    "url": "http://localhost:4782"
  }
```

Save and close `package.json` and run private api for test: <br />
`npm run prod` <br />

After private API has started you should receive in console something 
like this:

```
Private api is available on port XXX
Connected to database successfully.
``` 

-------
##### Option 3 (build application in Docker container)
This option assumes that you have done previous configurations as in `Option #2` 
and you also have installed and configured Docker in your hosting system. <br />
In that case during build it will automatically pull `Node 8` Docker image, install `pm2`, <br />
install all packets inside, run tests and execute container. <br />
All `pm2` scripts are configured inside `process.yml` file and are going to be executed during build 
 
###### Additional Docker configuration:
Set up `PORT_PRIVATE` and `DIST_PORT` (same as in `.env` file): <br />
`cd docker` <br />
`nano config.sh` <br />
Both ports should be listed as follows in any order: <br />
```dockerfile
PORTS=(7425 4782) # Ports list to be exposed
CONTAINER_NAME='admin-console'
```
The rest part of file relates to API documentation container made in Swagger, <br />
In most cases only `API_PATH` field should be changed before Documentation build <br /> 
```dockerfile
# swagger.sh File configuration
# relates to Swagger docker container and image
PORT=80 # PORT documentation will be served on
API_PATH='localhost:7425' # 'admin-console.cf' # Ending of Base API path

DOCS_PATH='/server/docs' # Swagger conf filepath
DOCS_BASE_URL='/swagger' # Base docs URL
```
`Ctrl + X` and Save changes <br />
`nano scripts.sh` <br />

Then you probably will need to make it executable: <br />
All scripts separately: <br />
`sudo chmod +x ./build.sh` <br />
`sudo chmod +x ./config.sh` <br />
`sudo chmod +x ./helpers.sh` <br />
`sudo chmod +x ./swagger.sh` <br />
Or docker the folder itself: <br />
`cd ..` <br />
`sudo -R chmod +x docker` <br />
To run Admin-console container: <br />
`./build.sh` <br />
In that case script will find containers listening to configured ports, <br />
remove them, then build new one and execute it. <br />
To run API documentation container: <br />
`./swagger.sh` <br />
In that case swagger docs will become available by default on `http://{configured path}/swagger`

-------
##### Nginx configuration
Example Nginx config could be used to run application: <br />
(`letsencrypt` service is used in example in order to run application on `https` ) <br />

```
server {
    listen 80;
    listen [::]:80;
    server_name admin-console.cf www.admin-console.cf;
    return 301 https://admin-console.cf$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name admin-console.cf www.admin-console.cf;
    access_log /var/log/nginx/admin-console.cf;
    ssl on;
    ssl_certificate /etc/letsencrypt/live/admin-console.cf/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin-console.cf/privkey.pem;
    include snippets/ssl-params.conf;
    gzip on;
    gzip_comp_level 5;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_types;
    ...CONFIG...
    text/x-component;
    text/x-cross-domain-policy;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header HOST $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://admin-console.cf:4782;
        proxy_redirect off;
    }

    location /api {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header HOST $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://admin-console.cf:7425;
        proxy_redirect off;
    } 
}    
```

-------

### Build client application and run 

After private api started you should terminate it to make a build: <br />
`Ctrl + C` <br />
Then run (assuming you have already completed section [Prepare](#prepare) ) : <br />
`npm run client-build` <br /> 
You should receive message: <br /> 
`The build folder is ready to be deployed.` <br /> 

Then if you are using Nodemon: <br />
`npm run nodemon-client-serve` <br /> 
If not: <br />
`npm run prod-client-serve` <br /> 

Last message you should receive: <br />
`INFO: Accepting connections at http://localhost:4782` <br />
Means that application is served to PORT 4782

### API Documentation
In order to preview only API documentation in using Swagger-ui <br />
Docker container could be used, following steps could be done: <br />
`sudo -R chmod +x docker` <br />
`cd docker` <br />
`nano ./config.sh` <br />
Make config changes if needed:
```bash
# swagger.sh File configuration
# relates to Swagger docker container and image
PORT=80 # PORT documentation will be served on
API_PATH='localhost:7425' # 'admin-console.cf' # Ending of Base API path

DOCS_PATH='/server/docs' # Swagger conf filepath
DOCS_BASE_URL='/swagger' # Base docs URL

# Listing all swagger configuration files
DOCS_PRIVATE_API='private.json'
DOCS_PUBLIC_API='public.json'
DOCS_PETSTORE='swagger.json'
```    
Execute docker scripts: <br />
`jq` and `moreutils` packages will be downloaded <br />
`./swagger.sh` <br />
Navigate in browser: <br />
`http://{config.path}/swagger` <br />

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

Repository contains postman automated tests, which can be used for API testing.

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


