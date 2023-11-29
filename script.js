(async function getCountriesAsync() {
  const data = await fetch("https://restcountries.com/v3.1/all");
  const countries = await data.json();
  buildHtml(countries, countriesLength);
})();

var countriesLength = 20;
var totalIndex = 0;
var pageCount = 0;

function buildHtml(countries, countriesLength) {
  pageCount++;
  //Body
  const body = document.getElementsByTagName("body");
  Object.assign(body[0].style, {
    backgroundColor: "black",
    color: "white",
    fontFamily: "Calibri",
    textAlign: "center",
  });
  const pageElement = document.createElement("p");
  const pageText = document.createTextNode(
    "Page: " + pageCount + "/" + Math.round(countries.length / 20)
  );

  // Pageniation
  pageElement.appendChild(pageText);

  pageElement.style.cssText = `
  background-color: #28363c;
    margin: auto;
    padding: 5px;
    font-style: italic;
    color: #ffffff94;
    margin-top: 10px;
  `;

  // Header
  const headerElement = document.createElement("h1");
  const headerText = document.createTextNode("Countries".toUpperCase());
  headerElement.appendChild(headerText);
  headerElement.style.cssText = `
  text-shadow: 3px 3px #3939af;
  letter-spacing: 10px;
  font-family: Lucida Handwriting;
  `;
  totalIndex === 0 ? body[0].appendChild(headerElement) : "none";

  // const currDiv = document.getElementById("app");
  const currDiv = document.createElement("div");
  currDiv.setAttribute("id", "app");
  body[0].appendChild(currDiv);

  // Button
  const showMoreBtn = document.createElement("button");
  const btnText = document.createTextNode("Show More");
  showMoreBtn.appendChild(btnText);
  showMoreBtn.style.cssText = `
  display: block;
  margin: auto;
  background-color: #01d0f6cc;
  width: 150px;
  height: 30px;
  border-radius: 50px;
  color: aliceblue;
  font-weight: bold;
  `;

  if (totalIndex > 220) {
    showMoreBtn.style.display = "none";
  }

  // Show More button events
  showMoreBtn.onmouseover = function () {
    this.style.backgroundColor = "rgb(1 208 246 / 51%)";
    this.style.cursor = "pointer";
  };
  showMoreBtn.onmouseout = function () {
    this.style.backgroundColor = "#01d0f6cc";
  };

  for (let index = totalIndex; index < countriesLength; index++) {
    totalIndex++;
    showMoreBtn.onclick = function () {
      if (totalIndex === 250) {
        return;
      } else if (totalIndex === 240) {
        countriesLength += 10;
        showMoreBtn.style.display = "none";
      } else {
        countriesLength += 20;
        showMoreBtn.style.display = "none";
      }
      buildHtml(countries, countriesLength);
    };

    // Div container
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "country");

    Object.assign(newDiv.style, {
      padding: "5px",
      margin: "10px",
      display: "inline-block",
      border: "3px solid gray",
      borderRadius: "5%",
      boxSizing: "border-box",
    });

    // Country
    currDiv.appendChild(newDiv);
    const newHtmlElement = document.createElement("h3");
    const hText = document.createTextNode(countries[index].name.common);
    newHtmlElement.appendChild(hText);

    // Index
    const indexEl = document.createElement("div");
    const indexText = document.createTextNode(index + 1);
    indexEl.appendChild(indexText);
    // Capital
    const capitalCityEl = document.createElement("p");
    var capitalCityText = document.createTextNode(
      "Capital: " + countries[index].capital
    );
    if (index === 66) {
      capitalCityText = document.createTextNode(
        "Hover To watch the real flag from 1924"
      );
    }
    capitalCityEl.appendChild(capitalCityText);

    // GoogleMapLink
    const googleMapLink = document.createElement("a");
    googleMapLink.setAttribute("href", countries[index].maps.googleMaps);
    googleMapLink.target = "_blank";

    // Img
    const newImg = document.createElement("img");
    newImg.setAttribute("src", countries[index].flags.png);

    if (index === 66) {
      newImg.onmouseover = function () {
        this.style.cssText = `
        width: 350px;
        height: 250px;
        `;

        this.setAttribute(
          "src",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Palestine_%281924%29.svg/900px-Flag_of_Palestine_%281924%29.svg.png?widht=250"
        );
      };
      newImg.onmouseout = function () {
        this.style.cssText = `
        width: 250px;
        height: 150px;
        `;
        this.setAttribute("src", countries[index].flags.png);
      };
    }

    Object.assign(newImg.style, {
      width: "250px",
      height: "150px",
      "border-radius": "5%",
    });
    googleMapLink.appendChild(newImg);

    newDiv.append(indexEl, newHtmlElement, capitalCityEl, googleMapLink);
    body[0].appendChild(showMoreBtn);
    body[0].appendChild(pageElement);
  }
}
