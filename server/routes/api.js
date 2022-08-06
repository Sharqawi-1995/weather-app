const express = require("express")
const router = express.Router()
const axios = require("axios").default
const City = require("../model/City")

const API_KEY = "47b122c331d7468ab26c2a5845acfb19"
router.get("/city/:cityName", function (req, res) {
  let cityNameWithQ = req.params.cityName
  cityName = cityNameWithQ

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?${cityName}&appid=${API_KEY}&units=metric`
    )
    .then((response) => {
      const citiesInfo = {
        name: response.data.name.toLowerCase(),
        temperature: response.data.main.temp,
        condition: response.data.weather[0].description,
        conditionPic: response.data.weather[0].icon,
      }

      res.send(citiesInfo)
    })
})

router.get("/cities", function (req, res) {
  City.find({}, function (err, cities) {
    res.send(cities)
  })
})

router.post("/city", function (req, res) {
  const city = req.body
  const newCity = new City({
    name: city.name.toLowerCase(),
    temperature: city.temperature,
    condition: city.condition,
    conditionPic: city.conditionPic,
  })

  newCity.save().then((c) => {
    console.log(c)
  })

  res.send("saved new city")
})

router.delete("/city/:cityName", (req, res) => {
  const cityName = req.params.cityName
  City.findOneAndDelete({ name: cityName }, (err, city) => {
    res.send(`${city.name} deleted`)
  })
})

router.put("/city/:cityName", (req, res) => {
  const cityName = req.params.cityName

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    )
    .then((response) => {
      const citiesInfo = {
        name: response.data.name.toLowerCase(),
        temperature: response.data.main.temp,
        condition: response.data.weather[0].description,
        conditionPic: response.data.weather[0].icon,
      }
      res.send(citiesInfo)
    })
})

module.exports = router
