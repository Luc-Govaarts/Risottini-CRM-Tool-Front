
### Crispy 

What is Crispy?

Crispy is a custom CRM tool made for Risottini, a company that sells crunchy risotto balls with mozarella cheese in them. 

Crispy was made to aid this company in selling their product to restaurants throughout The Netherlands.

Interested? see there page [here](https://www.risottini.com/)

Do you want to see a live version of Crispy with some demo data?

[here](https://ecstatic-rosalind-f39297.netlify.app/)

Log in with:
Email: Demo@demo.com, password: demo1234

### Who am I?
I am Luc, part of class #40 from Codaisseur a 11 week JavaScript bootcamp.
This project is a two week portfolio project assignment meant to test the theory and skills learned over the past seven weeks. 

### Table of contents
 1. [`Technologies used`](#Technologies-used)
 2. [`User stories`](#User-stories)
 3. [Goals](#Goals-)
 4. [Installation](#Installation-)

### Technologies-used

#### Front-end:

 - React
 - Redux
 - Leaflet maps
 - Material UI
 - Bootstrap UI


#### Back-end:

 - Sequelize
 - PostgreSQL
 - Server with Express
 - Authorization middleware
 - Geolocation middleware

### User-stories

As a employee 
 - You can add potential new leads to the database and add contact details and contact info.
 - It is possible to add notes and plan actions per lead to keep track of the sales activities.
 - You can change the sales cycle phase when needed. 
 - You can track all the leads on a map to see where they are located. 
 - All notes and actvities are displayed on a timeline to see what other employees have done with that lead. 

### Goals

The goal of the project is to build a basic and functioning CRM tool that can be expanded on in a later phase. 

Server repository
The repository for the backend can be found [here](https://github.com/Luc-Govaarts/Risottini-CRM-Tool-Back)

The server was build as a REST API with Express.

### Installation

To install Crispy it is recommended to install the server first. check the server [here](https://github.com/Luc-Govaarts/Risottini-CRM-Tool-Back)

1. Clone the repo
2. Install the dependencies by running npm install
3. open the constants,js file in the config folder and add the loink to the server.

The server is set up with some dummy seed data.

4. Sign up with:
    email: demo@demo.com 
    password: demo1234

5. Check the existing leads on the home page or add new leads.
6. add notes and plan activities on the lead details pages. 