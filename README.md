# My new cloud webapp

Name:- Narasimha Reddy Potlapati
NEUID:- 002774231

created a web application which stores the user details such as first_name, last_name, username and password. Here I have created a product model which has id, name, description, sku, manufacturer, quantity, created date, last modified, owner_user_id(which is the id of the user whoi created the product)  Here I have used node js and mysql as database, User can add(POST), edit(POST), view(GET) his details, I have used Basic auth for the authentication.

Prerequisites for building and deploying your application locally:-
git, VS-code, mysql downloaded, mysql work-bench, postman 

Build and Deploy instructions for the web application:-

Clone the repo
open terminal run npm ci for downloading the dependencies
run npm start to start the application and trigger the API's using postman to perform operations.
run npm test for unit testing.