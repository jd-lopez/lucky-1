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

//modal script

const modal = document.querySelector(".modal");
const openModal = document.querySelectorAll(".open-button");
const closeModal = document.querySelector(".closeModal");

openModal.forEach((modalBtn) => {
  modalBtn.addEventListener("click", () => {
    modal.showModal();
    modal.classList.add("flex");
  });
});

closeModal.addEventListener("click", () => {
  modal.close();
  modal.classList.remove("flex");
});

//verticall scroll for How it works section

const howCards = document.querySelectorAll(".vert-scroll-animate");
const howParent = document.querySelector(".howParent");

const howObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        howCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("visible");
          }, index * 500);
        });
      } else {
        howCards.forEach((card) => {
          card.classList.remove("visible");
        });
      }
    });
  },
  { threshold: 0.1 }
);

//scroll animation

const items = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.1 }
);

howObserver.observe(howParent);

items.forEach((element) => {
  observer.observe(element);
});

//language selection

const selectLanguage = document.getElementById("lang-select");

const heroText = {
  en: {
    translation: {
      hero: "Nationwide Transport Brokerage You Can Trust",
    },
  },
  es: {
    translation: {
      hero: "Una agencia de transporte a nivel nacional en la que puede confiar",
    },
  },
};

const savedLang = localStorage.getItem("lang") || "en";
selectLanguage.value = savedLang; // ✅ sets the correct option

const activeFlag = localStorage.getItem("activeFlag") || "us";

if (activeFlag === "us") {
  document.getElementById("usFlag").classList.add("fi");
  document.getElementById("esFlag").classList.remove("fi");
} else {
  document.getElementById("esFlag").classList.add("fi");
  document.getElementById("usFlag").classList.remove("fi");
}

i18next.init(
  {
    lng: localStorage.getItem("lang") || "en",
    debug: false,
    resources: heroText,
  },
  function (err, t) {
    updateContent();
  }
);

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    element.innerHTML = i18next.t(key);
  });
}

document.getElementById("lang-select").addEventListener("change", () => {
  setTimeout(() => {
    const newLang = selectLanguage.value;
    console.log(newLang);

    i18next.changeLanguage(newLang, () => {
      localStorage.setItem("lang", newLang);
      updateContent();
    });

    if (newLang === "en") {
      document.getElementById("usFlag").classList.add("fi");
      document.getElementById("esFlag").classList.remove("fi");
      localStorage.setItem("activeFlag", "us");
    } else if (newLang === "es") {
      document.getElementById("esFlag").classList.add("fi");
      document.getElementById("usFlag").classList.remove("fi");
      localStorage.setItem("activeFlag", "es");
    }
  }, 600);
});

// function setLanguage() {
//   let currentLanguage = selectLanguage.value;

//   console.log(currentLanguage);

//   if (currentLanguage === "en") {
//     document.getElementById("usFlag").classList.add("fi");
//     document.getElementById("esFlag").classList.remove("fi");
//   } else if (currentLanguage === "es") {
//     document.getElementById("esFlag").classList.add("fi");
//     document.getElementById("usFlag").classList.remove("fi");
//   }
// }

// selectLanguage.addEventListener("change", setLanguage);
