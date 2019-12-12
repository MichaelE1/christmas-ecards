// Awaiting top level await :<
(async function main() {
  const urlParams = new URLSearchParams(window.location.search);
  const ID = urlParams.get("id");

  const card = await getCard(ID);
  updatePageStyles(card);
})();

async function getCard(ID) {
  if (ID) {
    // Get the card data from the database
    const response = await fetch("/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ID })
    });
    const responseJSON = await response.json();
    return JSON.parse(responseJSON.row.content);
  } else {
    // Get the card data from session storage
    const sessionCard = JSON.parse(sessionStorage.getItem("card"));

    // ELSE, there is no card data so back you go to the index page!
    if (!sessionCard) {
      window.location.href = "/";
    } else {
      return sessionCard;
    }
  }
}

function updatePageStyles(card) {
  const cardElement = document.querySelector(".card");

  // TODO: Hide share button if ID is present. If it is present, change edit to make your own

  // Set saved card styles
  document.querySelector(".card__img").src = `/img/${card.image}.svg`;
  cardElement.style.backgroundImage = `url(./img/${card.bg}.svg)`;
  cardElement.style.fontFamily = card.font;
  cardElement.style.fontSize = `${card.fontSize}px`;
  cardElement.style.color = card.fontColor;

  if (card.position === "img-top") {
    cardElement.style.flexDirection = "column";
  }

  if (card.position === "img-right") {
    cardElement.style.flexDirection = "row-reverse";
  }

  // Set saved card text
  if (card.to) {
    document.querySelector(".card__text__to").textContent = `Dear ${card.to},`;
  }

  if (card.from) {
    document.querySelector(
      ".card__text__from"
    ).textContent = `From ${card.from}`;
  }

  document.querySelector(".card__text__msg").textContent = card.message;

  // Back button
  document
    .querySelector("#back")
    .addEventListener("click", () => (window.location.href = "/"));

  // Share button -- TODO: put into own function
  document.querySelector("#share").addEventListener("click", async () => {
    const response = await fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
    });
    const responseJSON = await response.json();
    // TODO:
    // 4. Display unique ID in input box, as a query string, and set up auto copy
    const shareElement = document.querySelector(".share__group");
    const URLElement = document.querySelector("#url");
    shareElement.style.display = "unset";
    URLElement.value = `${window.location.href}?id=${responseJSON.id}`;
    // Copy to clipboard
    URLElement.select();
    URLElement.setSelectionRange(0, 99999); // for mobile browsers?
    document.execCommand("copy");
  });
}
