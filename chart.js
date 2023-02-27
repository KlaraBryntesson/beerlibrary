let chartBtn = document.getElementById("chart-button");

chartBtn.addEventListener("click", () => {
  Promise.all([
    fetch("https://api.punkapi.com/v2/beers?page=1&per_page=80&abv_lt=4").then(
      (response) => response.json()
    ),
    fetch(
      "https://api.punkapi.com/v2/beers?page=1&per_page=80&abv_lt=6.1&abv_gt=3.9"
    ).then((response) => response.json()),
    fetch(
      "https://api.punkapi.com/v2/beers?page=2&per_page=80&abv_lt=6.1&abv_gt=3.9"
    ).then((response) => response.json()),
    fetch("https://api.punkapi.com/v2/beers?page=1&per_page=80&abv_gt=6").then(
      (response) => response.json()
    ),
    fetch("https://api.punkapi.com/v2/beers?page=2&per_page=80&abv_gt=6").then(
      (response) => response.json()
    ),
    fetch("https://api.punkapi.com/v2/beers?page=3&per_page=80&abv_gt=6").then(
      (response) => response.json()
    ),
  ]).then((result) => {
    console.log(result);

    let data = [];
    for (let x = 0; x < result.length; x++) {
      data.push(result[x].length);
    }
    console.log(data);
    data[1] += data[2];
    data[3] += data[4];
    data[3] += data[5];

    data.splice(2, 1);
    data.splice(3, 2);
    console.log(data);
    const chart = document.getElementById("abv-chart").getContext("2d");
    const myChart = new Chart(chart, {
      type: "pie",
      data: {
        labels: ["Abv under 4%", "Abv 4% - 6%", "Abv over 6%"],
        datasets: [
          {
            label: "Amount of beers",
            data: data,
            backgroundColor: [
              "rgb(105, 178, 149)",
              "rgb(197, 121, 49)",
              "rgb(226, 169, 201)",
            ],
            hoverOffset: 10,
          },
        ],
      },
    });
  });
});
