# My new cloud webapp

Name:- Narasimha Reddy P
NEUID:- 002774231

created a web application which stores the user details such as first_name, last_name, username and password. Here I have created a product model which has id, name, description, sku, manufacturer, quantity, created date, last modified, owner_user_id(which is the id of the user whoi created the product)  Here I have used node js and mysql as database, User can add(POST), edit(POST), view(GET) his details, I have used Basic auth for the authentication. For Product table I can add(POST), edit(PUT,PATCH), view(GET), remove(DELETE) the created products, only by created users if these operations are done another users it throws error like unauthorised.