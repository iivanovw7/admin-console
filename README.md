# Admin-console

Admin console of some IT company. Allows to manage specific company's data.




---

## Table of Contents


- [Installation](#installation)
- [Requiremets](#requirements)
- [Installation](#installation)
- [Features](#features)
- [Unit testing](#unit testing)
- [Postman testing](#postman testing)
- [License](#license)

---




## Requirements

- [Install NodeJS](https://nodejs.org/en/) 

- [NPM](https://www.npmjs.com/get-npm)


### Clone

- Clone this repo to your local machine using `https://github.com/iivanovw7/admin-console.git`

## Installation



## Features

> Frontend: ReactJS 

> Backend: NodeJS, Express, MongoDB, Mongoose  

## Unit testing

Unit tests cover all database models, all routes including authentication routes and helper-functions as well.
  
> Libraries used 
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)
- [Mokinggoose](https://github.com/alonronin/mockingoose)
 
> How to run unit tests

`npm install` <br />
`npm run tests` <br />


## Postman testing

Repository contains postman tests backups, which can be used for API testing.

> How to run postman tests  

- Upload samples data into db  `npm run reload`
- Import postman collections from `./server/postman` directory
- Fill in postman environment variables with correct mongoDB objectID :
   > - user_admin
   > - user_manager
   > - user_user
- Run collection API_TEST with delay around `100`ms 


## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a href="/" target="_blank">admin-console</a>


