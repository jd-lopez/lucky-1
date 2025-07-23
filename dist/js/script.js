const hero = document.getElementById("hero");
const myHeader = document.getElementById("myHeader");
const myNav = document.getElementById("myNav");
const hamburgerContainer = document.getElementById("hamburgerContainer");
const burgerIcon = document.getElementById("burgerIcon");
const closeIcon = document.getElementById("closeIcon");

window.addEventListener("scroll", () => {
  const heroHeight = hero.offsetHeight;
  const headerHeight = myHeader.offsetHeight;
  const scrollY = window.scrollY;

  if (scrollY > heroHeight - headerHeight) {
    myNav.classList.remove("lg:text-white");
    myNav.classList.add("lg:text-black");
    myHeader.classList.add(
      "border-b-2",
      "border-b-blue-500",
      "shadow-md",
      "bg-white/99"
    );
    burgerIcon.classList.remove("text-white");
    burgerIcon.classList.add("text-black");
    closeIcon.classList.remove("text-white");
    closeIcon.classList.add("text-black");
  } else {
    myNav.classList.add("lg:text-white");
    myNav.classList.remove("lg:text-black");
    myHeader.classList.remove(
      "border-b-2",
      "border-b-blue-500",
      "shadow-md",
      "bg-white/99"
    );
    burgerIcon.classList.remove("text-black");
    burgerIcon.classList.add("text-white");
    closeIcon.classList.remove("text-black");
    closeIcon.classList.add("text-white");
  }
});

window.dispatchEvent(new Event("scroll"));

const overlay = document.getElementById("overlay");

hamburgerContainer.addEventListener("click", (e) => {
  if (e.target.id === "burgerIcon") {
    burgerIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
    myNav.classList.add(
      "-translate-x-42",
      "transform-all",
      "duration-200",
      "delay-75"
    );
    overlay.classList.remove("hidden");
    console.log("fuck");
  } else if (e.target.id === "closeIcon") {
    hideMenu();
  }
});

overlay.addEventListener("click", () => {
  hideMenu();
});

function hideMenu() {
  burgerIcon.classList.remove("hidden");
  closeIcon.classList.add("hidden");
  myNav.classList.remove("-translate-x-42");
  overlay.classList.add("hidden");
}

document.querySelectorAll("img").forEach((img) => {
  img.setAttribute("loading", "lazy");
});
