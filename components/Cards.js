// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.
const Card = (article, type) => {
  const card = document.createElement("div");
  const headline = document.createElement("div");
  const author = document.createElement("div");
  const imgContainer = document.createElement("div");
  const image = document.createElement("img");
  const authorName = document.createElement("span");

  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(imgContainer);
  imgContainer.appendChild(image);
  author.appendChild(authorName);

  card.classList.add("card");
  headline.classList.add("headline");
  author.classList.add("author");
  imgContainer.classList.add("img-container");

  card.dataset.type = type;
  headline.textContent = article.headline;
  image.src = article.authorPhoto;
  authorName.textContent = `By ${article.authorName}`;

  card.addEventListener("click", () => {
    console.log(headlineOfArticle);
  });

  return card;
};

const generateCards = () => {
  axios
    .get("https://lambda-times-api.herokuapp.com/articles")
    .then((response) => {
      const parentDOMElement = document.querySelector(".cards-container");
      const keys = Object.keys(response.data.articles);

      keys.forEach((key) => {
        response.data.articles[key].map((article) => {
          parentDOMElement.appendChild(Card(article, key));
        });
      });
    });
};

export const filterCards = () => {
  // hide all cards except for the ones that have the filter
  const activeFilters = Array.from(
    document.querySelectorAll(".active-tab")
  ).map((DOMTab) => {
    return DOMTab.textContent;
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const hasFilter = activeFilters.find((f) => {
      return f.includes(card.dataset.type);
    });

    if (hasFilter) {
      card.style.display = "initial";
    } else {
      card.style.display = "none";
    }
  });
};

generateCards();
