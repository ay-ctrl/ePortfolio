document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMobile = document.getElementById("nav-mobile");
  
    // Hamburger menu open-close
    if (hamburger && navMobile) {
      hamburger.addEventListener("click", () => {
        navMobile.classList.toggle("active");
      });
    }
});
  