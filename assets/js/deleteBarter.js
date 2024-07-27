const deleteBarterButtons = document.querySelectorAll(".barter .fa-trash");

deleteBarterButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", () => {
    deleteButton.parentElement.remove();
  });
});
