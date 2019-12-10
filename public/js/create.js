// Check if a previously saved card exists
const card = JSON.parse(sessionStorage.getItem("card"));

if (card) {
  document.querySelector(`#${card.image}`).checked = true;
  document.querySelector(`#${card.bg}`).checked = true;

  if (card.to) {
    document.querySelector("#to").value = card.to;
  }

  if (card.message) {
    document.querySelector("#message").textContent = card.message;
  }

  if (card.from) {
    document.querySelector("#from").value = card.from;
  }

  document.querySelector(`#${card.font}`).checked = true;
  document.querySelector(`#size${card.fontSize}`).checked = true;
  document.querySelector(`#${card.fontColor}`).checked = true;
  document.querySelector(`#${card.position}`).checked = true;
}

// Handle form submission
const form = document.querySelector(".create");
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const card = serialize(form, { hash: true });
  sessionStorage.setItem("card", JSON.stringify(card));
  window.location.href = "/card.html";
}
