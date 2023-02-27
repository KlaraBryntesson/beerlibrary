const moveDiv = document.querySelector("section > .introduction-box");

slide = () => {
  if (document.documentElement.scrollTop > 500) {
    moveDiv.setAttribute("id", "slide");
  } else {
    moveDiv.removeAttribute("id", "slide");
  }
};

window.onscroll = () => {
  slide();
};
