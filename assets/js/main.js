import { calculateLeftAmount } from "./calculate.js";

const haveAmounts = document.querySelectorAll(
  ".item-for-barter__have div p span"
);
const havePluses = document.querySelectorAll(
  ".item-for-barter__have div .fa-plus"
);

havePluses.forEach((havePlus) => {
  havePlus.addEventListener("click", () => {
    const havePlusContainer = document.createElement("div");
    havePlusContainer.classList.add("have-plus-container");

    const havePlusInput = document.createElement("input");
    havePlusInput.setAttribute("type", "number");
    havePlusInput.setAttribute("placeholder", "Сколько добавить?");
    havePlusInput.classList.add("have-plus-input");

    const confirmPlusButton = document.createElement("i");
    confirmPlusButton.classList.add("fas", "fa-check");

    const cancelPlusButton = document.createElement("i");
    cancelPlusButton.classList.add("fas", "fa-times");

    const haveContainer = havePlus.parentElement;

    havePlusContainer.appendChild(havePlusInput);
    havePlusContainer.appendChild(confirmPlusButton);
    havePlusContainer.appendChild(cancelPlusButton);
    haveContainer.appendChild(havePlusContainer);

    havePlusInput.focus();

    confirmPlusButton.addEventListener("click", () =>
      plus(
        havePlusContainer,
        havePlusInput.value,
        havePlus.previousElementSibling.children[0]
      )
    );

    cancelPlusButton.addEventListener("click", () => cancel(havePlusContainer));
  });
});

function plus(havePlusContainer, newValue, oldValue) {
  if (newValue === "") {
    cancel(havePlusContainer);
  } else {
    const oldValueNumber = parseInt(oldValue.innerHTML);
    const newValueNumber = parseInt(newValue);
    oldValue.innerHTML = oldValueNumber + newValueNumber;
    havePlusContainer.remove();
  }
}

const haveMinuses = document.querySelectorAll(
  ".item-for-barter__have div .fa-minus"
);

haveMinuses.forEach((haveMinus) => {
  haveMinus.addEventListener("click", () => {
    const haveMinusContainer = document.createElement("div");
    haveMinusContainer.classList.add("have-minus-container");

    const haveMinusInput = document.createElement("input");
    haveMinusInput.setAttribute("type", "number");
    haveMinusInput.setAttribute("placeholder", "Сколько отнять?");
    haveMinusInput.classList.add("have-minus-input");

    const confirmMinusButton = document.createElement("i");
    confirmMinusButton.classList.add("fas", "fa-check");

    const cancelMinusButton = document.createElement("i");
    cancelMinusButton.classList.add("fas", "fa-times");

    const haveContainer = haveMinus.parentElement;

    haveMinusContainer.appendChild(haveMinusInput);
    haveMinusContainer.appendChild(confirmMinusButton);
    haveMinusContainer.appendChild(cancelMinusButton);
    haveContainer.appendChild(haveMinusContainer);

    haveMinusInput.focus();

    confirmMinusButton.addEventListener("click", () =>
      minus(
        haveMinusContainer,
        haveMinusInput.value,
        haveMinus.previousElementSibling.previousElementSibling.children[0]
      )
    );

    cancelMinusButton.addEventListener("click", () =>
      cancel(haveMinusContainer)
    );
  });
});

function minus(haveMinusContainer, newValue, oldValue) {
  if (newValue === "") {
    cancel(haveMinusContainer);
  } else {
    const oldValueNumber = parseInt(oldValue.innerHTML);
    const newValueNumber = parseInt(newValue);
    if (oldValueNumber - newValueNumber < 0) {
      oldValue.innerHTML = 0;
    } else {
      oldValue.innerHTML = oldValueNumber - newValueNumber;
    }
    haveMinusContainer.remove();
  }
}

function cancel(container) {
  container.remove();
}
