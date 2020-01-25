// https://github.com/MSFTGarageFi/mimmitkoodaa

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (request, response) => {
    response.sendFile('public/index.html')
})

app.route('/post').post((request, response) => {
    const searchTerm = request.body.searchText
    
    fetch('https://api.hel.fi/linkedevents/v1/event/?format=json&text='+searchTerm)
        .then(helpResponse => helpResponse.json())
        .then(eventData => {
            console.log(eventData.data)
            response.render('results', {searchTerm: searchTerm, events: eventData.data})
        })
        .catch(error => console.error(error))
})

app.listen(3000)