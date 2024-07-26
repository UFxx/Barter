const needAmounts = document.querySelectorAll(
  ".item-for-barter__need div p span"
);
const needEditButtons = document.querySelectorAll(
  ".item-for-barter__need div i"
);

needEditButtons.forEach((needEditButton) => {
  needEditButton.addEventListener("click", () => {
    const needEditContainer = document.createElement("div");
    needEditContainer.classList.add("need-edit-container");

    const needEditInput = document.createElement("input");
    needEditInput.setAttribute("type", "number");
    needEditInput.setAttribute("placeholder", "Введите новое значение");
    needEditInput.classList.add("need-edit-input");

    const confirmEditButton = document.createElement("i");
    confirmEditButton.classList.add("fas", "fa-check");

    const cancelEditButton = document.createElement("i");
    cancelEditButton.classList.add("fas", "fa-times");

    const needContainer = needEditButton.parentElement;

    needEditContainer.appendChild(needEditInput);
    needEditContainer.appendChild(confirmEditButton);
    needEditContainer.appendChild(cancelEditButton);
    needContainer.appendChild(needEditContainer);

    needEditInput.focus();

    confirmEditButton.addEventListener("click", () =>
      confirmEdit(
        needEditContainer,
        confirmEditButton.previousElementSibling,
        needEditButton.previousElementSibling.children[0]
      )
    );

    cancelEditButton.addEventListener("click", () =>
      cancelEdit(needEditContainer)
    );
  });
});

function confirmEdit(needEditContainer, newValueInput, oldValue) {
  if (newValueInput.value === "") {
    cancelEdit(needEditContainer);
  } else {
    oldValue.innerHTML = newValueInput.value;
    needEditContainer.remove();
  }
}

function cancelEdit(needEditContainer) {
  needEditContainer.remove();
}
