const xhr = require('xhr')
const greeting = require('./views/greeting.hbs')
const button = require('./views/button.hbs')

const endpoint = 'https://api.wheretheiss.at/v1/satellites/25544'

xhr.get(endpoint, function (err, data) {
  if (err) {
    console.error(err)
  }

  // In case you're curious
  console.log(data.body) // FYI: data.body is a string
  // var newData = data.body
  const issName = JSON.parse(data.body).name
  const issLat = JSON.parse(data.body).latitude
  const issLon = JSON.parse(data.body).longitude


  // Replace 'Space' below with the response

  const target = document.getElementsByTagName('main')[0]
  target.innerHTML = greeting({name: 'Dylan', issName: issName, issLat: issLat, issLon: issLon})

  document.getElementById('button').addEventListener('click', refreshButton)

    function refreshButton() {

        const issVel = JSON.parse(data.body).velocity
        const issAlt = JSON.parse(data.body).altitude

        const target = document.getElementsByTagName('main')[0]
        target.innerHTML += button({issVel: issVel, issAlt:issAlt})
    }
})
