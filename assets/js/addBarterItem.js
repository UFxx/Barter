import { items } from "./storage.js";
import { addEditInput } from "./edit.js";
import { addPlusInput, addMinusInput } from "./main.js";

const addBarterButtons = document.querySelectorAll(
  ".barter-content .fa-plus-circle"
);

addBarterButtons.forEach((addBarter) => {
  addBarter.addEventListener("click", () => {
      const barterNeedContainer = addBarter.parentElement.childNodes[1];
      const barterHaveContainer = addBarter.parentElement.childNodes[3];

    const barterContent = addBarter.parentElement;

    const chooseItemContainer = document.createElement("div");
    chooseItemContainer.classList.add("choose-item-for-barter-container");

    const itemNeed = document.createElement("div");
    const itemHave = document.createElement("div");

    items.map((item) => {
      const chooseItemImg = document.createElement("img");
      chooseItemImg.setAttribute("src", item.img);
      chooseItemImg.setAttribute("alt", item.name);
      chooseItemImg.setAttribute("data-item", item.dataItem);

      chooseItemContainer.appendChild(chooseItemImg);

      chooseItemImg.addEventListener("click", () => {
        const itemNeedImg = document.createElement("img");
        itemNeedImg.setAttribute("src", chooseItemImg.getAttribute("src"));
        itemNeedImg.setAttribute("alt", chooseItemImg.getAttribute("alt"));
        itemNeed.setAttribute(
          "data-item",
          chooseItemImg.getAttribute("data-item")
        );

        const itemHaveImg = document.createElement("img");
        itemHaveImg.setAttribute("src", chooseItemImg.getAttribute("src"));
        itemHaveImg.setAttribute("alt", chooseItemImg.getAttribute("alt"));
        itemHave.setAttribute(
          "data-item",
          chooseItemImg.getAttribute("data-item")
        );

        itemNeed.prepend(itemNeedImg);
        itemHave.prepend(itemHaveImg);

        chooseItemContainer.remove();
      });
    });

    barterContent.appendChild(chooseItemContainer);

    const itemNeedText = document.createElement("p");
    itemNeedText.innerHTML = "Нужно: <span>0</span>";

    const itemHaveText = document.createElement("p");
    itemHaveText.innerHTML = "Есть: <span>0</span>";

    const itemNeedEdit = document.createElement("i");
    itemNeedEdit.classList.add("fas", "fa-pen");
    itemNeedEdit.addEventListener("click", () => addEditInput(itemNeedEdit));

    const itemHavePlus = document.createElement("i");
    itemHavePlus.classList.add("fas", "fa-plus");
    itemHavePlus.addEventListener("click", () => addPlusInput(itemHavePlus));

    const itemHaveMinus = document.createElement("i");
    itemHaveMinus.classList.add("fas", "fa-minus");
    itemHaveMinus.addEventListener("click", () => addMinusInput(itemHaveMinus));

    itemNeed.appendChild(itemNeedText);
    itemNeed.appendChild(itemNeedEdit);
    barterNeedContainer.appendChild(itemNeed);

    itemHave.appendChild(itemHaveText);
    itemHave.appendChild(itemHavePlus);
    itemHave.appendChild(itemHaveMinus);
    barterHaveContainer.appendChild(itemHave);
  });

  barterContent.appendChild(barterNeedContainer);
  barterContent.appendChild(barterHaveContainer);
});
