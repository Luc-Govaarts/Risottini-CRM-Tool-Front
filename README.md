
## Crispy 

Crispy is a custom CRM system built for a company that operates in the dutch snack industry. Risottini, is a start-up that produces crispy, risotto balls in two flavours, tomato mozarella and mushroom truffel. The aim of this software project is to develop a system to track contact details of different restaurants and track leads in different phases of their specific sales cycle. Interested in the company behind these snacks? see there page [here](https://www.risottini.com/)

The demo version with some test data is available [here](https://ecstatic-rosalind-f39297.netlify.app)
Log in: Email: Demo@demo.com, password: test1234

## Who am I?

I am a Hotelschool the Hague graduate and a Codaisseur Javascript Bootcamp graduate looking for new opportunities as a full stack developer. I would like to combine the knowledge of both industries in my next professional challenge.

## Table of contents
 1. [`Demo`](#Demo)
 2. [`Technologies used`](#Technologies-used)
 3. [`User stories`](#User-stories)
 4. [`Goals`](#Goals)
 5. [`Wireframe`](#Wireframe)
 6. [`Installation`](#Installation)

## Demo
!video[ title ]( url ){ size=10 }
!video[ adding lead and note demo](src/Images/Animated GIF-original.mp4){ size=10 }

## Technologies-used

### Front-end:

 - React
 - Redux
 - Leaflet maps
 - Material UI
 - Bootstrap UI

### Back-end:

 - Sequelize
 - PostgreSQL
 - Server with Express
 - Authorization middleware
 - Geolocation middleware

### User-stories

As a employee 
 - New restaurants can be added as leads to the database and add contact details and contact info.
 - Leads can have contact details and a contact person
 - Every lead has a seperate lead details page were notes can be written and actions/events can be planned
 - You can change the sales cycle phase per lead 
 - You can track all the leads on a map to see where they are located. 
 - All notes and actvities are displayed on a timeline to see what other employees have done with that lead. 
 - An action page displayes all actions planned in a table.
 - Actions have a status and this status can be adjusted with a switch in the action table
 - Action table can be sorted on all data categories
 - Actions can be filtered by user and by status
 - New actions can be planned on this action page
 - A contactpage displays all contacts 
 - Contacts can be added with or without a lead designation
 - On this contact page a search box filters all contacts based on name, job title or company name of assigned lead
 - In the navigation bar a search field provides a lookup for leads, contacts, reports and actions seperated by different icons and leading to their respective details page. 

### Goals

The main goal of this project is to built a custom CRM system that allows the employees of Risottini to track their sales activities. 

Longer term development goals:

- [ ] Adding module for sales reporting
- [ ] Adding leads by importing restaurant information fetched through Google Javascript Api 
- [ ] Adding email module to remind user of pending actions


### Server repository

The server was build as a REST API with Express. The repository for the backend can be found [here](https://github.com/Luc-Govaarts/Risottini-CRM-Tool-Back

### Installation

To install Crispy it is recommended to install the server first. check the server [here](https://github.com/Luc-Govaarts/Risottini-CRM-Tool-Back)

1. Clone the repo
2. Install the dependencies by running npm install
3. open the constants.js file in the config folder and add the link to the server.

The server is set up with some dummy seed data.
4. create a new account 
5. Check the existing leads on the home page or add new leads.
6. add notes and plan activities on the lead details pages. 