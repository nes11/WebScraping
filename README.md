# Webscraping  
 
Using Axios, Cheerio, MongoDB and Nodemailer, I developed an app that fetches links to job adverts matching defined criteria, and stores them alongside relevant data in a database.  
At the moment, the app returns results for three websites. More 'scrapers' can be added in the relevant file (/webscraping/scrapers), then required and invoked in the index.js file.  
The result from the search are by default printed to the console. A simple mailer has been set up and can be used to send the HTML strings via email.  

## Installation 
To install 
```javascript
npm install 
```
then run 
```javascript
node index.js 
```
By default, the app will print an html string to the console. 