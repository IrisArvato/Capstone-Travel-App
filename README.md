# Sentiment Analysis with Natural Language Processing

## Project description
This project take user input and return the sentiment analyze from meaningcloud API.

## Getting started

Follow the step below to start working on the project

### Add API Key into Env variable

1. Register an account in `https://learn.meaningcloud.com/`. 
2. Get the subscription key
3. In the root project, create a file with name '.env'
4. Add your subscription key in the .env file
```
API_KEY = "**************************"
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

