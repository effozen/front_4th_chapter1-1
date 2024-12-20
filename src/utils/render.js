export const render = (htmlFunction) => {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = htmlFunction();
  } else {
    document.body.innerHTML = htmlFunction();
  }
};
