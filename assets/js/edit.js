import { calculateLeft } from "./calculate.js";

export function addEditInput(needEditButton) {
  needEditButton.addEventListener("click", () => {
    const needEditContainer = document.createElement("div");
    needEditContainer.classList.add("need-edit-container");

    const needEditInput = document.createElement("input");
    needEditInput.setAttribute("type", "number");
    needEditInput.setAttribute("placeholder", "?");
    needEditInput.classList.add("need-edit-input");

    const confirmEditButton = document.createElement("i");
    confirmEditButton.classList.add("fas", "fa-check");

    const cancelEditButton = document.createElement("i");
    cancelEditButton.classList.add("fas", "fa-times");

    const needContainer = needEditButton.parentElement;

    if (needContainer.childElementCount > 3) {
      return;
    } else {
      needEditContainer.appendChild(needEditInput);
      needEditContainer.appendChild(confirmEditButton);
      needEditContainer.appendChild(cancelEditButton);
      needContainer.appendChild(needEditContainer);
      needEditInput.focus();
    }

    needEditInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        confirmEdit(
          needEditContainer,
          confirmEditButton.previousElementSibling,
          needEditButton.previousElementSibling.children[0],
          confirmEditButton
        );
      }
    });

    confirmEditButton.addEventListener("click", () => {
      confirmEdit(
        needEditContainer,
        confirmEditButton.previousElementSibling,
        needEditButton.previousElementSibling.children[0],
        confirmEditButton
      );
    });

    cancelEditButton.addEventListener("click", () =>
      cancelEdit(needEditContainer)
    );
  });
}

function confirmEdit(
  needEditContainer,
  newValueInput,
  oldValue,
  confirmEditButton
) {
  if (newValueInput.value === "") {
    cancelEdit(needEditContainer);
  } else {
    oldValue.innerHTML = newValueInput.value;
    calculateLeft(confirmEditButton);
    needEditContainer.remove();
  }
}

function cancelEdit(needEditContainer) {
  needEditContainer.remove();
}
