let beerResultsBox = document.querySelector("#beer-results"),
  error = document.querySelector("#error"),
  beerSearch = document.querySelector("#search-field"),
  under5 = document.querySelector("#abv1"),
  over5 = document.querySelector("#abv2"),
  form = document.querySelector("#form"),
  abvInput = "",
  beerInput = "",
  colors = [
    "(252, 231, 163)",
    "(250, 218, 134)",
    "(247, 204, 109)",
    "(246, 193, 92)",
    "(242, 180, 72)",
    "(236, 170, 59)",
    "(231, 160, 56)",
    "(222, 147, 52)",
    "(218, 137, 49)",
    "(210, 129, 46)",
    "(202, 119, 43)",
    "(195, 110, 49)",
    "(190, 103, 38)",
    "(183, 95, 35)",
    "(174, 86, 32)",
    "(169, 82, 31)",
    "(164, 76, 28)",
    "(155, 69, 26)",
    "(149, 62, 24)",
    "(145, 57, 22)",
    "(139, 53, 20)",
    "(132, 49, 19)",
    "(125, 43, 17)",
    "(119, 38, 15)",
    "(114, 35, 14)",
    "(110, 33, 13)",
    "(103, 29, 11)",
    "(97, 24, 9)",
    "(94, 22, 9)",
    "(86, 20, 7)",
    "(82, 18, 9)",
    "(88, 19, 9)",
    "(76, 17, 13)",
    "(68, 12, 9)",
    "(64, 12, 10)",
    "(63, 12, 10)",
    "(57, 12, 11)",
    "(53, 10, 10)",
    "(53, 12, 13)",
    "(49, 11, 12)",
  ];

under5.checked === false;
over5.checked === false;

form.addEventListener("submit", (event) => {
  if (beerSearch.value !== "") {
    beerInput = "&beer_name=" + beerSearch.value;
  } else {
    beerInput = "";
  }
  if (under5.checked === true && over5.checked === false) {
    abvInput = "&abv_lt=5.0";
  } else if (over5.checked === true && under5.checked === false) {
    abvInput = "&abv_gt=4.9";
  } else if (over5.checked === false && under5.checked === false) {
    abvInput = "";
  }
  sessionStorage.clear();
  sessionStorage.setItem("last-search", JSON.stringify(beerSearch.value));

  event.preventDefault();

  Promise.all([
    fetch(
      "https://api.punkapi.com/v2/beers?page=1&per_page=80" +
        beerInput +
        abvInput
    ).then((response) => response.json()),
    fetch(
      "https://api.punkapi.com/v2/beers?page=2&per_page=80" +
        beerInput +
        abvInput
    ).then((response) => response.json()),
    fetch(
      "https://api.punkapi.com/v2/beers?page=3&per_page=80" +
        beerInput +
        abvInput
    ).then((response) => response.json()),
    fetch(
      "https://api.punkapi.com/v2/beers?page=4&per_page=80" +
        beerInput +
        abvInput
    ).then((response) => response.json()),
    fetch(
      "https://api.punkapi.com/v2/beers?page=5&per_page=80" +
        beerInput +
        abvInput
    ).then((response) => response.json()),
  ]).then((result) => {
    console.log(result);

    let beerResult = [];

    for (x = 0; x < result.length; x++) {
      for (i = 0; i < result[x].length; i++) {
        beerResult.push(result[x][i]);
      }
    }

    let beerResults = "",
      images = [],
      srm = [];

    for (let x = 0; x < beerResult.length; x++) {
      images[x] = beerResult[x].image_url;
      srm[x] = beerResult[x].srm;
      beerResults += `
        <div class='product-container'>
          <div class='product-box'>
            <div class='head-container'>
              <div class='name-tagline-container'>
                <h2 class='product-name'>
                    ${beerResult[x].name}  ${beerResult[x].abv}%
                </h2>
                <p class='tagline'>${beerResult[x].tagline}</p>
              </div>
              <div class='srm' style='background-color: rgb${
                colors[Math.round(beerResult[x].srm) - 1]
              }'>SRM: ${beerResult[x].srm}
              </div>
            </div>
            <p class='description'>${beerResult[x].description}</p>
            <div class='food-pairings'>
              <h3>Pairs great with:</h3>
              <ul class='food-list'>`;

      for (let i = 0; i < beerResult[x].food_pairing.length; i++) {
        beerResults += `
                <li class='food-items'>${beerResult[x].food_pairing[i]}</li>`;
      }

      beerResults += `
              </ul>
            </div>
          </div>
          <div class='image-box'><img class='result-images'></div>
        </div>
        <hr>`;
    }

    beerResultsBox.innerHTML = beerResults;

    let imageResults = images,
      nameList = document.querySelectorAll(".product-name"),
      image = document.querySelectorAll(".result-images");

    for (let y = 0; y < image.length; y++) {
      image[y].classList.add("images");
      image[y].setAttribute("alt", nameList[y].textContent);
      if (imageResults[y] === null) {
        image[y].setAttribute("src", "placeholder.png");
      } else {
        image[y].setAttribute("src", imageResults[y]);
      }
    }

    let srmList = document.querySelectorAll(".srm");

    for (x = 0; x < srmList.length; x++) {
      if (Math.round(srm[x]) > 10) {
        srmList[x].style.color = "white";
      }
    }

    for (x = 0; x < srm.length; x++) {
      if (srm[x] === null) {
        srmList[x].style.display = "none";
      }
    }

    console.log(beerResultsBox.children);
    console.log(document.querySelector("div > ul").children);
    console.log(document.querySelectorAll(".food-pairings"));
    console.log(images);
    console.log(image);
    console.log(nameList);
  });
});

let lastSearched = JSON.parse(sessionStorage.getItem("last-search"));

beerSearch.value = lastSearched;

console.log(JSON.parse(sessionStorage.getItem("last-search")));
