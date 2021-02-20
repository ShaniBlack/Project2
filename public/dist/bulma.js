const burger = document.querySelector(".navbar-burger"),
    menu = document.querySelector(".navbar-menu");
burger.addEventListener("click", function() {
    burger.classList.toggle("is-active"), menu.classList.toggle("is-active")
});