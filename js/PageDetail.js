const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { name, released, description, metacritic,background_image,tags,developers,genres,platforms,website } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      developers.forEach(dev => {
        articleDOM.querySelector("p.dev").innerHTML += dev.name+ " | ";
      });
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.metacritic span").innerHTML = metacritic;
      articleDOM.querySelector("p.description ").innerHTML = description;
      tags.forEach(tag => {
        articleDOM.querySelector("p.tags span").innerHTML += tag.name+ " | ";
      });
      genres.forEach(genre => {
        articleDOM.querySelector("p.genre span").innerHTML += genre.name+ " | ";
      });
      platforms.forEach(platform => {
        articleDOM.querySelector("p.platforms span").innerHTML += platform.platform.name+ " | ";
      });
      articleDOM.querySelector("img.poster").src = background_image;
      articleDOM.querySelector("button.website").setAttribute("onclick",("location.href=\'"+website+"\'"));
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
          console.log(responseData)
        });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <img class="poster img-thumbnail"></img>
          <h1 class="title"></h1>
          <p class= "dev"></p>
          <p class="release-date">Release date : <span></span></p>
            <p class="metacritic"> Metacritic :<span class = " bg-success"></span></p>
            <p class= "genre"> genre : <span></span> </p>
            <p class= "tags"> tags : <span></span> </p>
            <p class= "platforms">platforms : <span></span> </p>
          <p class="description"></p>
          <button onclick="" type="button" class="website btn btn-primary">Official website</button>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};
