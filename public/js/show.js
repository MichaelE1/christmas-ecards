const card = JSON.parse(sessionStorage.getItem("card"));
const cardElement = document.querySelector(".card");

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
  document.querySelector(".card__text__from").textContent = `From ${card.from}`;
}

document.querySelector(".card__text__msg").textContent = card.message;

// document.write(JSON.stringify(storedCard));

// {"image":"image1","bg":"bg1","font":"Arial","fontSize":"12","fontColor":"black","position":"img-left"}

//

// Back button
document.querySelector("#back").addEventListener("click", () => {
  window.location.href = "/";
});
