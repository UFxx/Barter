export function deleteBarter(deleteButton) {
  deleteButton.addEventListener("click", () => {
    deleteButton.parentElement.remove();
  });
}
