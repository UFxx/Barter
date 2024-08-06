import { addBarterItem } from "./addBarterItem.js";
import { deleteBarter } from "./deleteBarter.js";
import { addEditInput } from "./edit.js";
import { addPlusInput, addMinusInput } from "./main.js";

const data = [];

export function save() {
  const barters = document.querySelectorAll(".barter");
  barters.forEach((barter, i) => {
    data.push({});

    const barterName = barter.children[1].value;
    const barterNeedItems = barter.children[2].children[0].childNodes;
    const barterHaveItems = barter.children[2].children[1].childNodes;
    const barterLeftItems = barter.children[2].children[2].childNodes;

    data[i].barterName = barterName;
    data[i].barterItems = { needItems: [], haveItems: [], leftItems: [] };

    barterNeedItems.forEach((item) => {
      const itemName = item.getAttribute("data-item");
      const itemAmount = item.children[1].children[0].textContent;
      data[i].barterItems.needItems.push({ [itemName]: itemAmount });
    });

    barterHaveItems.forEach((item) => {
      const itemName = item.getAttribute("data-item");
      const itemAmount = item.children[1].children[0].textContent;
      data[i].barterItems.haveItems.push({ [itemName]: itemAmount });
    });

    barterLeftItems.forEach((item) => {
      const itemName = item.getAttribute("data-item");
      const itemAmount = item.children[1].children[0].textContent;
      data[i].barterItems.leftItems.push({ [itemName]: itemAmount });
    });
    localStorage.setItem("barters", JSON.stringify(data));
  });
  const saveNotificationContainer = document.createElement("div");
  saveNotificationContainer.classList.add("save-successful");

  const saveSuccessfulIcon = document.createElement("i");
  saveSuccessfulIcon.classList.add("fas", "fa-save");

  saveNotificationContainer.appendChild(saveSuccessfulIcon);
  document.body.appendChild(saveNotificationContainer);

  setTimeout(() => {
    saveNotificationContainer.style.right = 0;
    setTimeout(() => {
      saveNotificationContainer.style.opacity = 0;
    }, 1300);
  }, 0);
}

document.addEventListener("DOMContentLoaded", () => {
  unload();

  setInterval(() => {
    save();
  }, 60000);
});

export function unload() {
  const content = document.querySelector(".content");
  const data = JSON.parse(localStorage.getItem("barters"));

  data.map((barter) => {
    const barterContainer = document.createElement("div");
    barterContainer.classList.add("barter");

    const deleteBarterButton = document.createElement("i");
    deleteBarterButton.classList.add("fas", "fa-trash");
    deleteBarterButton.addEventListener("click", () =>
      deleteBarter(deleteBarterButton)
    );

    const barterNameInput = document.createElement("input");
    barterNameInput.setAttribute("type", "text");
    barterNameInput.setAttribute("placeholder", "Название предмета");
    barterNameInput.setAttribute("value", barter.barterName);

    const barterContent = document.createElement("div");
    barterContent.classList.add("barter-content");

    const barterItemsNeed = document.createElement("div");
    barterItemsNeed.classList.add("item-for-barter", "item-for-barter__need");
    barter.barterItems.needItems.map((needItem) => {
      const needItemContainer = document.createElement("div");
      needItemContainer.setAttribute("data-item", Object.keys(needItem)[0]);

      const itemImg = document.createElement("img");
      itemImg.setAttribute(
        "src",
        `assets/images/${Object.keys(needItem)[0]}.webp`
      );
      itemImg.setAttribute("alt", Object.keys(needItem)[0]);

      const itemText = document.createElement("p");
      itemText.innerHTML = `Нужно: <span>${Object.values(needItem)[0]}</span>`;

      const itemEditButton = document.createElement("i");
      itemEditButton.classList.add("fas", "fa-pen");
      itemEditButton.addEventListener("click", () =>
        addEditInput(itemEditButton)
      );

      needItemContainer.appendChild(itemImg);
      needItemContainer.appendChild(itemText);
      needItemContainer.appendChild(itemEditButton);
      barterItemsNeed.appendChild(needItemContainer);
    });

    const barterItemsHave = document.createElement("div");
    barterItemsHave.classList.add("item-for-barter", "item-for-barter__have");
    barter.barterItems.haveItems.map((haveItem) => {
      const haveItemContainer = document.createElement("div");
      haveItemContainer.setAttribute("data-item", Object.keys(haveItem)[0]);

      const itemImg = document.createElement("img");
      itemImg.setAttribute(
        "src",
        `assets/images/${Object.keys(haveItem)[0]}.webp`
      );
      itemImg.setAttribute("alt", Object.keys(haveItem)[0]);

      const itemText = document.createElement("p");
      itemText.innerHTML = `Есть: <span>${Object.values(haveItem)[0]}</span>`;

      const itemPlusButton = document.createElement("i");
      itemPlusButton.classList.add("fas", "fa-plus");
      itemPlusButton.addEventListener("click", () =>
        addPlusInput(itemPlusButton)
      );

      const itemMinusButton = document.createElement("i");
      itemMinusButton.classList.add("fas", "fa-minus");
      itemMinusButton.addEventListener("click", () =>
        addMinusInput(itemMinusButton)
      );

      haveItemContainer.appendChild(itemImg);
      haveItemContainer.appendChild(itemText);
      haveItemContainer.appendChild(itemPlusButton);
      haveItemContainer.appendChild(itemMinusButton);
      barterItemsHave.appendChild(haveItemContainer);
    });

    const barterItemsLeft = document.createElement("div");
    barterItemsLeft.classList.add("item-for-barter", "item-for-barter__left");
    barter.barterItems.leftItems.map((leftItem) => {
      const leftItemContainer = document.createElement("div");
      leftItemContainer.setAttribute("data-item", Object.keys(leftItem)[0]);

      const itemImg = document.createElement("img");
      itemImg.setAttribute(
        "src",
        `assets/images/${Object.keys(leftItem)[0]}.webp`
      );
      itemImg.setAttribute("alt", Object.keys(leftItem)[0]);

      const itemText = document.createElement("p");
      itemText.innerHTML = `Осталось: <span>${
        Object.values(leftItem)[0]
      }</span>`;

      leftItemContainer.appendChild(itemImg);
      leftItemContainer.appendChild(itemText);
      barterItemsLeft.appendChild(leftItemContainer);
    });

    const addItemButton = document.createElement("i");
    addItemButton.classList.add("fas", "fa-plus-circle");
    addItemButton.addEventListener("click", () => addBarterItem(addItemButton));

    barterContainer.appendChild(deleteBarterButton);
    barterContainer.appendChild(barterNameInput);
    barterContainer.appendChild(barterContent);

    barterContent.appendChild(barterItemsNeed);
    barterContent.appendChild(barterItemsHave);
    barterContent.appendChild(barterItemsLeft);
    barterContent.appendChild(addItemButton);

    content.appendChild(barterContainer);
  });
}
