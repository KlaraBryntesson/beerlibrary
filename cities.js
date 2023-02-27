let searchCity = document.querySelector("#search-field"),
  form = document.querySelector("#city-search"),
  cityResultBox = document.querySelector("#city-results"),
  cityInput = "";

let cities = () => {
  fetch("https://avancera.app/cities/" + cityInput)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      let citiesID = [],
        citiesResults = "";

      for (x = 0; x < result.length; x++) {
        citiesResults += `
        <div class='city-box'>
          <div class='city-container'>
            <h2 class='city-name'>${result[x].name}</h2>
            <p class='population'>Population: ${result[x].population}</p>
            <input class='change' id='change-${x}' type='button' value='Ändra'>
            <input class ='delete' id='delete-${x}' type='button' value='Radera'>
          </div>
          <form style='display: none' class='change-form' id='change-form-${x}'>
            <div class='change-box'>
              <label for='name'></label>
              <input name='name' class='change-name' id='change-name-${x}' placeholder='Byt namn'>
              <label for='population'></label>
              <input name='population' class='change-population' id='change-population-${x}' placeholder='Ändra befolkning'>
              <input class='change-button' id='change-button-${x}' type='submit' value='Ändra'>
            </div>
          </form>
        </div>`;

        citiesID.push(result[x].id);
      }
      cityResultBox.innerHTML = citiesResults;

      let cityNames = document.querySelectorAll(".city-name");

      console.log(cityNames);

      for (x = 0; x < citiesID.length; x++) {
        let cityID = "",
          deleteCity,
          changeCity,
          nameChange,
          popChange,
          changeButton;

        deleteCity = document.getElementById("delete-" + x);
        cityID = citiesID[x];
        deleteCity.addEventListener("click", (event) => {
          fetch("https://avancera.app/cities/" + cityID, {
            method: "DELETE",
          }).then((response) => {
            console.log(response);
            cities();
          });
        });

        changeCity = document.getElementById("change-" + x);

        let changeForm,
          changeNumber = x;

        changeCity.addEventListener("click", (event) => {
          changeForm = document.querySelector("#change-form-" + changeNumber);
          if (changeForm.style.display === "none") {
            changeForm.style.display = "block";
          } else if (changeForm.style.display === "block") {
            changeForm.style.display = "none";
          }
        });

        nameChange = document.getElementById("change-name-" + x);
        popChange = document.getElementById("change-population-" + x);
        changeButton = document.getElementById("change-button-" + x);

        changeButton.addEventListener("click", (event) => {
          let changeParameter;
          if (nameChange.value === "") {
            changeParameter = { population: Number(popChange.value) };
          } else if (popChange.value === "") {
            changeParameter = { name: nameChange.value };
          } else {
            changeParameter = {
              name: nameChange.value,
              population: Number(popChange.value),
            };
          }
          console.log(nameChange.value);
          console.log(popChange.value);
          console.log(cityID);
          console.log(changeParameter);

          fetch("https://avancera.app/cities/" + cityID, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(changeParameter),
          }).then((response) => {
            console.log(response);
          });
          event.preventDefault();
          changeButton.value = "Ändrat!";
          changeButton.style.backgroundColor = "rgb(178, 226, 240)";
          cities();
        });
      }
    });
};

form.addEventListener("submit", (event) => {
  if (searchCity.value !== "") {
    cityInput = "?name=" + searchCity.value;
  } else {
    cityInput = "";
  }

  event.preventDefault();
  cities();
});

let addForm = document.querySelector("#add-form"),
  addCity = document.querySelector("#add-name"),
  addPop = document.querySelector("#add-population"),
  addError = document.querySelector("#add-error"),
  addCheck = document.querySelector("#add-check");

addCheck.style.display = "none";
addError.style.display = "none";

addForm.addEventListener("submit", (event) => {
  if (addCity.value !== "" && addPop.value !== "") {
    addError.style.display = "none";
    addCheck.style.display = "block";

    setTimeout(() => {
      addCheck.style.display = "none";
    }, 5000);

    let add = fetch("https://avancera.app/cities/", {
      body: JSON.stringify({
        name: addCity.value,
        population: Number(addPop.value),
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    add
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
    addForm.reset();
  } else if (addCity.value === "" || addPop.value === "") {
    addError.style.display = "block";
    addCheck.style.display = "none";
  }
  event.preventDefault();
  cities();
});

window.onload = () => {
  addForm.reset();
};
