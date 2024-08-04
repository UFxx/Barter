import { deleteBarter } from "./deleteBarter.js";
import { addBarterItem } from "./addBarterItem.js";
import { save } from "./save.js";

const content = document.querySelector(".content");
const addBarterButton = document.querySelector(".add-barter");

addBarterButton.addEventListener("click", () => {
  const barter = document.createElement("div");
  barter.classList.add("barter");

  const deleteBarterButton = document.createElement("i");
  deleteBarterButton.classList.add("fas", "fa-trash");
  deleteBarterButton.addEventListener("click", () =>
    deleteBarter(deleteBarterButton)
  );

  const barterNameInput = document.createElement("input");
  barterNameInput.setAttribute("type", "text");
  barterNameInput.setAttribute("placeholder", "Название предмета");

  const barterContent = document.createElement("div");
  barterContent.classList.add("barter-content");

  const barterNeedItemsContainer = document.createElement("div");
  barterNeedItemsContainer.classList.add(
    "item-for-barter",
    "item-for-barter__need"
  );

  const barterHaveItemsContainer = document.createElement("div");
  barterHaveItemsContainer.classList.add(
    "item-for-barter",
    "item-for-barter__have"
  );

  const barterLeftItemsContainer = document.createElement("div");
  barterLeftItemsContainer.classList.add(
    "item-for-barter",
    "item-for-barter__left"
  );

  const barterAddItemButton = document.createElement("i");
  barterAddItemButton.classList.add("fas", "fa-plus-circle");
  barterAddItemButton.addEventListener("click", () =>
    addBarterItem(barterAddItemButton)
  );

  content.appendChild(barter);
  barterContent.appendChild(barterNeedItemsContainer);
  barterContent.appendChild(barterHaveItemsContainer);
  barterContent.appendChild(barterLeftItemsContainer);
  barterContent.appendChild(barterAddItemButton);
  barter.appendChild(deleteBarterButton);
  barter.appendChild(barterNameInput);
  barter.appendChild(barterContent);
  save();
});
