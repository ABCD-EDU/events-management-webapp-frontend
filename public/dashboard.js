// this function runs when the DOM is ready, i.e. when the document has been parsed
document.addEventListener("DOMContentLoaded", function() {
    const mainNavLinks = document.querySelector("#main-nav-links");
    const burgerMenu = document.querySelector("#burger-menu");

    burgerMenu.addEventListener("click", () => {
        mainNavLinks.classList.toggle("active");
        burgerMenu.classList.toggle("active");
    })
});