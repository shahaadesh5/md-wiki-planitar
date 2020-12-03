# Md-wiki-planitar
Full Stack application based off Golang for API and React.js for frontend

Backend API created using Golang:

Following are the API's exposed:

| API        | Request type           | Description  |
| ------------- |-------------| -----|
| http://localhost:9090/api/articles      | GET | Returns list of all the articles stored in JSON |
| http://localhost:9090/api/article/{name}      | GET      |   Returns the content of a single article as a text searched from name  |
| http://localhost:9090/api/article/{name} | PUT      |  Creates a new article if the name does not exist. Updates the article if the name exists. Expects content in req body as plaintext   |

To run the GO server API's,

Run `go run main.go` to run the backend API's on PORT 9090.

___

Frontend app created using React:

* The frontend is created using create-react-app
* Redirect to wiki-markdown folder to run just the frontend app
* Install dependencies using `npm install`
* To start the app on dev server run, `npm start`
* The frontend should be accessible on http://localhost:3000/

___

The GO server runs the frontend react app build as well. Just go to http://localhost:9090/ and it will access the frontend and backend API's on the same PORT.

___

The App has been dockerized.
To Create and build a docker image,

`docker build -t md-wiki:2019 .`

and then run the docker image:

`docker run -it -p 9090:8080  md-wiki:2019 .`

Both Frontend and Backend should be working on same PORT when you run the docker image.
