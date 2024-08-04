import { save } from "./save.js";

export function calculateLeft(button) {
  const barterContainer =
    button.parentElement.parentElement.parentElement.parentElement;
  const barterItem = button.parentElement.parentElement;
  const barterItemDataName = barterItem.getAttribute("data-item");
  let needAmount;
  let haveAmount;

  barterContainer.childNodes.forEach((child) => {
    if (child.localName === "div") {
      child.childNodes.forEach((child) => {
        const childDataName = child.getAttribute("data-item");
        if (
          child.parentElement.classList[1] === "item-for-barter__need" &&
          barterItemDataName === childDataName
        ) {
          needAmount = parseInt(child.children[1].children[0].innerHTML);
        }
        if (
          child.parentElement.classList[1] === "item-for-barter__have" &&
          barterItemDataName === childDataName
        ) {
          haveAmount = parseInt(child.children[1].children[0].textContent);
        }
        if (
          child.parentElement.classList[1] === "item-for-barter__left" &&
          barterItemDataName === childDataName
        ) {
          child.children[1].children[0].textContent = needAmount - haveAmount;
        }
      });
    }
  });
  save();
}
