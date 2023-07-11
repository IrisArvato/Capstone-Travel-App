# Capstone Travel App

## Project description
This project take user input and search the information for travel location based on the travel date selected.
It get the current and forecast temperature from the travel location. 

## Getting started

Follow the step below to start working on the project

### Add API Key into Env variable

Before start running the program, in the root project, create a file with name '.env'
The project require the following environment data from 3rd party API

Sample:
```
GEONAMES_USERNAME = <<username>>
PIXABY_KEY=**************************
WEATHERBIT_KEY=**************************
```

#### Register Geonames account 
1. Register account in `https://www.geonames.org/`
2. Replace the value for GEONAMES_USERNAME in .env file with the username
```
GEONAMES_USERNAME = <<username>>
```

#### Register Pixaby account
1. Create an account in `https://pixabay.com/`
2. Get the key for pixaby and add the key ito .env file
```
PIXABY_KEY=**************************
```

#### Register WeatherBit account
1. Register an account in `https://www.weatherbit.io/`. 
2. Get the API key for WeatherBit and add the key ito .env file
```
WEATHERBIT_KEY=**************************
```

### Install Project Dependencies

To install the project dependencies, please follow the following steps:

`cd` into your new folder and run:
- `npm install`

### Run in development

Start project immediately using the webpack dev-server

```bash
npm build-dev
```

### Run in production

Generate the dist folder

```bash
npm build-prod
```

start the server

```bash
npm start
```

### Run tests

To run the tests

```bash
npm test
```

