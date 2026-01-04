## Table of Contents
- [About](#About)
- [Requirements](#Requirements)
- [Setup](#Setup)
- [Documentation](#Documentation)
- [Planned](#Planned)
- [License](#License)
## About
this react frontend provides a secure dashboard for the [backend](https://github.com/HydraulicRobert/dbProxy), currently allowing a monitoring tool for the notifications.

## Requirements
-**node.js:** v20.19 or newer
-**backend:** instance of [backend](https://github.com/HydraulicRobert/dbProxy)

## Setup
follow the instruction on [backend](https://github.com/HydraulicRobert/dbProxy#how-to-use)

navigate to the root directory
install the required packages using
```shell
npm install
```

start the frontend using 
```shell
npm run start
```

make sure the url and port for the backend are set in the file variables/weburl.txt. it'll be read by the frontend and used to connect to it
the file content should look like this
```shell
http://<backend ip>:<backend port>
```
an example would be
```shell
http://192.168.0.123:80
```

-access the frontend using the frontend pc's ip and port, ip:5173.
example
```shell
http://192.168.0.123:80
```

the header has the title and a randomised version number 
![Login Screen](images/loginScreen.png).
-login using the credentials created via the dbproxy cli

-when successful you will get to an interactive list of all the cached notifications within a scrollable div and a footer

![list](images/list.png)
footer has your username, the current frontend's status and time of the last received notification.
## Documentation
explanation of the different components
### images
has all the images used in the documentation

### src
has all the assets, components and variables

#### assets
images used by the frontend

#### components
react components used by the main jsx.

#### variables
all global and or one time on startup used variables by the frontend  

##### weburl
contains the url and port of the backend domain. plain text because it will be visible in the url. will be loaded once on the startup.

#### App
App.jsx is the start point of the frontend, calling all variables and components
App.css is the styling document for all components.

#### index
index.css is the styling document for the index

#### main
main.jsx calls app.jsx, being the main entrypoint

### eslint
tool to find and fix problems

### index.html
single page file that loads in main.jsx

### package-lock.json
saves the dependency tree

### package.json
saves metadata of the project

### vite-config
saves the configuration for the frontend, like the host ip to attach to and the corresponding port

## Planned
-an administrative tab for administrators to manage the backend comfortably with a gui dashboard.

-jwt to be saved as cookie

-more encryption

## license
all rights reserved
