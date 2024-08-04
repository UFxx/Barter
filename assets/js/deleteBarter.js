import { save } from "./save.js";

export function deleteBarter(deleteButton) {
  deleteButton.addEventListener("click", () => {
    deleteButton.parentElement.remove();
    save();
  });
}
