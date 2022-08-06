class Renderer {
  renderData(cities) {
    $(".cities").empty()
    const source = $("#cities-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template({ cities })
    $(".cities").append(newHTML)
  }
}
