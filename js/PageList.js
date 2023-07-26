API_KEY = "I won't show mine ,Get yours "
const PageList = (argument = '') => {
  argument = document.querySelector('input').value
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');


    const displayResults = (articles) => {
      console.log(articles)
      const resultsContent = articles.map((article) => (
        `<article class="card bg-dark text-light m-4 p-2" style="width: 40%;">
          <h2>${article.name}</h2>
          <p>${article.released}</p>
          <img src="${article.background_image}" class="img-thumbnail">
          <a href="#pagedetail/${article.id}">Read More</a>
        </article>`
      ));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      console.log(finalURL)
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
    console.log(cleanedArgument)
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list ">
        <div class="articles">Loading...</div>
      </section>
    `;

    preparePage();
  };

  render();
};
