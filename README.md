To get started with setting up a FHIR server with HAPI FHIR JPA on Docker, the necessities required are having Docker set up and an IDE. You can do this either installing Docker desktop on windows which is easy and straightforward creating a virtual machine and setting it up with ubuntu

There are multiple servers to render FHIR API endpoints, but a most common one is using HAPI FHIR server. This is an open source and provides the entire implementation of the HL7 FHIR standard for healthcare interoperability in Java.
- https://hapifhir.io/



## To run the project
- from your project root foldeer:
docker-compose up

- navigate to backend folder and start server:
cd backend
node index.js

- navigate to frontend folder and run app:
cd frontend
npm run dev



## Prerequisites

1. Download the Docker Desktop app and set up an account

2. With Docker installed and project repositories created on your IDE, create a docker-compose.yaml file in the root folder. This will contain the instructions to create and run a docker container from the server.
    - The contents of the docker-compose.yaml file can be copied from the official HAPI FHIR JPA server github repository.
    - Link to the repository: https://github.com/hapifhir/hapi-fhir-jpaserver-starter

3. Navigate to the section which briefs about the contents within the yaml file and paste the same in your root folder to later create the docker image onto your local machine.



## Setting up the app- Node.js and Express.js for backend and React.js for frontend using Vite

Setting up the backend:
1. Create a sub directory from root folder and name it backend or server
2. Open the terminal within this directory and run the following command:
    - Command: npm init -y
    This command initialises the Node.js project and creates package-lock.json and package.json file with default values
    - Command: npm install
    This command creates the node_modules folder which contains all the packages and their dependencies needed to run the app. These packages are downloaded based on what is specified in the package.json file.
3. Once the app is initialized, install the required packages that help in development: Run the following 
    - Command: npm install express cors axios
        a. express: A web-framework for building server-sede APIs and handle HTTP requests
        b. cors: Middleware to enable Cross-Origin Resource Sharing (CORS) so that backend can be accessed from different ports
        c. axios: A HTTP client used to make requests from the server or frontend to other APIs and server.

Setting up the frontend:
1. Frontend would be set up using Vite, a fast build tool and development server for setting up frontend frameworks. To create React app with Vite, type the following command from the terminal of your project root folder:
    npm create vite@latest frontend-app-name –template react 
    a. This creates a subdirectory with the name specified along with creating a react boilerplate code directory. 
2. Navigate to the frontend folder in your terminal and type npm install. This installs the required packages and dependencies for the react app while creating a node_moduels folder. 
3. Once the project is set up, install the following within your frontend folder by running the command to enable smooth development 
    npm install axios react-router-dom tailwindcss @tailwindcss/vite
    a. Tailwindcss: Used for faster CSS implementation using defined css styling classes
    b. React-router-dom: Set up app routing in the frontend


Following these steps should have you with all the required dependencies and project environment set up.

To begin development:

Pull the docker image: 
1. Open your terminal from your root folder and type the command: docker-compose up. This pulls the HAPI FHIR JPA server image in your machine
    - This should create a hapi.application.yaml and hapi.postgres.data folder
    - Once the pull is completed, typing ‘http://localhost:8080/ will redirect you to the official HAPI FHIR server, an open source REST API provider.
    - Navigating to http://localhost:8080/fhir/ will display all the API endpoints available to send requests to


Backend development:
Navigate to your backend directory and create an index.js file. This is the main entry point for the backend control. It initialises and configures the backend server and launches it. This file must contain the following:
    - Import required modules, like express
    - Configure middleware
    - Define routes
    - Start the server on specified port number

Creating API endpoints
Create a /routes folder to handle all endpoints and create a router.js file within it. This file contains:
    - Send GET, POST, PUT, DELETE operations to the server using axios to get data from http://localhost:8080/fhir/endpointName/{parameters}/.
    - The endpointName can be any specific data you want to fetch from the pool of endpoints available, example, Patient, metadata, Observations, etc
    - Parameters are values that is accepted by the REST API to access required data


Customize the UI
The frontend entry point starts within the /src folder, where the main.jsx defines the app and calls the App.jsx, that contains the frontend routes and defines the elements. Main elements/folder in the app structure:
    - /components: contains separate modular elements that can be used throughout the app
    - /assets: Contains the app images/icons
The files within the /components contain the design elements and fetch the response from the backend server depending on the type of requests sent. You can modify this file
TailwindCSS is used for styling the elements