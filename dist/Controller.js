const model = new Model()
const renderer = new Renderer()

const loadPage = async function () {
  const cityData = await model.getDataFromDB()
  navigator.geolocation.getCurrentPosition(
    async (postition) => {
      await model.getCityDataByLocation(postition.coords);
      renderer.renderData(model.cityData)
    },
    async (error) => {
      renderer.renderData(model.cityData)
    }
  )
}

const handleSearch = async function () {
  const cityName = $(".city-input").val()
  $(".city-input").val("")
  const cityData = await model.getCityDataByName(cityName)
  renderer.renderData(cityData)
}

$(".cities").on("click", ".addRemove", async function () {
  const name = $(this).closest(".imageIcon").find(".name").text()
  const iconType = $(this).text()
  if (iconType === "add") {
    await model.saveCity(name)
  } else {
    await model.removeCity(name)
  }

  renderer.renderData(model.cityData)
})

$(".cities").on("click", ".infoTemCon,.imageIcon", async function () {
  const name = $(this).closest(".city").find(".name").text()
  await model.updateCity(name)
  renderer.renderData(model.cityData)
})

loadPage()
