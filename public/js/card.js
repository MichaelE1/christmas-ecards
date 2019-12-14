// Awaiting top level await :<
(async function main() {
  const urlParams = new URLSearchParams(window.location.search);
  const ID = urlParams.get("id");

  const card = await getCard(ID);
  updatePageStyles(card, ID);
  addEventListeners(card);
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

function updatePageStyles(card, ID) {
  const cardElement = document.querySelector(".card");

  if (ID) {
    // Update buttons if card ID is present
    document.querySelector("#share").style.display = "none";
    document.querySelector("#edit").textContent = "✂️ Design";
  }

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
}

function addEventListeners(card) {
  // Edit button
  document
    .querySelector("#edit")
    .addEventListener("click", () => (window.location.href = "/"));

  const shareButton = document.querySelector("#share");

  // Share button
  shareButton.addEventListener("click", async () => {
    const response = await fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
    });
    const responseJSON = await response.json();

    const shareElement = document.querySelector(".share__group");
    const URLElement = document.querySelector("#url");
    shareElement.style.display = "block";
    URLElement.value = `${window.location.href}?id=${responseJSON.id}`;
    shareButton.style.display = "none";

    // Copy to clipboard
    URLElement.select();
    document.execCommand("copy");
    URLElement.setSelectionRange(0, 99999); // for mobile browsers?

    setTimeout(() => {
      document.querySelector("#copy").style.display = "none";
    }, 2000);
  });
}
