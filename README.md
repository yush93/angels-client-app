# angels-client-app
### ReactJS client application which works with the angels-server-api.
***
#### Initial Configuration
To get the Client Application running, clone the repository and do following:

**In terminal**
1. **Installing all the required packages.**

    `npm install`

#### Running the server
##### In development environment
1. **Starting Server**

    `npm start`
    _I have set the port to 3006. To change the port, go to **package.json** and edit the **start script**_

2. **Go to http://localhost:3006 to run the application.***


**You are good to go.**
***
##### In production environment

1. **Building the application**

    `npm run build`

2. **Run the server**

    `npm run start-prod`

    _Note: The server(server.js) is already created. I have set the **port to 3001**. To change the port, go to **server.js** file in root folder of the application and **edit PORT constant**._

3. **Go to http://localhost:3001 to run the application**


###### _Make sure the API Server is running first._
