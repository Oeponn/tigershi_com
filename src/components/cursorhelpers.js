export const addCursorFeatureClick = () => {

    const cursor = document.getElementsByClassName('cursor')[0]

    document.addEventListener("mousedown", () => {
      cursor.classList.add("clicking")
      console.log("clicking!")
      console.log(cursor)
    });

    document.addEventListener("mouseup", () => {
      cursor.classList.remove("clicking")
    });
}

