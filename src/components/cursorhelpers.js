export const addInvertListeners = () => {
    const blackContainers = document.getElementsByClassName("inner")

    const cursor = document.getElementsByClassName("cursor")[0];

    Array.prototype.forEach.call(blackContainers, child => {
      child.addEventListener("mouseenter", () => {
        cursor.classList.add("invert")
      });
      child.addEventListener("mouseleave", () => {
        cursor.classList.remove("invert")
      });
    });
}

