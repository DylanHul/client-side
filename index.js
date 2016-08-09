const xhr = require('xhr')
var greeting = require('./views/greeting.hbs')
var button = require('./views/button.hbs')

var endpoint = 'https://api.wheretheiss.at/v1/satellites/25544'

xhr.get(endpoint, function (err, data) {
  if (err) {
    console.error(err)
  }

  // In case you're curious
  console.log(data.body) // FYI: data.body is a string
  // var newData = data.body
  var issName = JSON.parse(data.body).name
  var issLat = JSON.parse(data.body).latitude
  var issLon = JSON.parse(data.body).longitude


  // Replace 'Space' below with the response

  var target = document.getElementsByTagName('main')[0]
  target.innerHTML = greeting({name: 'Dylan', issName: issName, issLat: issLat, issLon: issLon})

  document.getElementById('button').addEventListener('click', refreshButton)

    function refreshButton() {

        var issVel = JSON.parse(data.body).velocity
        var issAlt = JSON.parse(data.body).altitude

        var target = document.getElementsByTagName('main')[0]
        target.innerHTML += button({issVel: issVel, issAlt:issAlt})
    }

})
