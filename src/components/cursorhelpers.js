export const addCursorFeatureClick = () => {
  const cursor = document.getElementsByClassName('cursor')[0];

  document.addEventListener('mousedown', () => {
    cursor.classList.add('mouse-clicking');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('mouse-clicking');
  });
};
