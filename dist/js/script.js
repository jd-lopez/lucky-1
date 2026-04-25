const hero = document.getElementById("hero");
const myHeader = document.getElementById("myHeader");
const myNav = document.getElementById("myNav");
const hamburgerContainer = document.getElementById("hamburgerContainer");
const burgerIcon = document.getElementById("burgerIcon");
const closeIcon = document.getElementById("closeIcon");

if (hero) {
  window.addEventListener("scroll", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const heroHeight = hero.offsetHeight;
    const headerHeight = myHeader.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY > heroHeight - headerHeight) {
      if (isDark) {
        myNav.classList.remove("lg:text-black");
        myNav.classList.add("lg:text-white");
        burgerIcon.classList.remove("text-black");
        burgerIcon.classList.add("text-white");
        closeIcon.classList.remove("text-black");
        closeIcon.classList.add("text-white");
      } else {
        myNav.classList.remove("lg:text-white");
        myNav.classList.add("lg:text-black");
        burgerIcon.classList.remove("text-white");
        burgerIcon.classList.add("text-black");
        closeIcon.classList.remove("text-white");
        closeIcon.classList.add("text-black");
      }
      myHeader.classList.add(
        "border-b-2",
        "border-b-blue-500",
        "shadow-md",
        "bg-white/99",
      );
    } else {
      myNav.classList.add("lg:text-white");
      myNav.classList.remove("lg:text-black");
      myHeader.classList.remove(
        "border-b-2",
        "border-b-blue-500",
        "shadow-md",
        "bg-white/99",
      );
      burgerIcon.classList.remove("text-black");
      burgerIcon.classList.add("text-white");
      closeIcon.classList.remove("text-black");
      closeIcon.classList.add("text-white");
    }
  });

  window.dispatchEvent(new Event("scroll"));
}

const overlay = document.getElementById("overlay");

hamburgerContainer.addEventListener("click", (e) => {
  if (e.target.id === "burgerIcon") {
    burgerIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
    myNav.classList.add(
      "-translate-x-52",
      "transform-all",
      "duration-200",
      "delay-75",
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
  myNav.classList.remove("-translate-x-52");
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
    history.pushState({ modalOpen: true }, "");
  });
});

if (modal) {
  closeModal.addEventListener("click", () => {
    modal.close();
    modal.classList.remove("flex");

    if (history.state && history.state.modalOpen) {
      history.back();
    }
  });
}

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.modalOpen) {
    // Modal is open, so close it

    modal.close();
    modal.classList.remove("flex");

    if (history.state && history.state.modalOpen) {
      history.back();
    }
  }
});

//verticall scroll for How it works section

const howCards = document.querySelectorAll(".vert-scroll-animate");
const howParent = document.querySelectorAll(".howParent");

if (howParent && howCards.length) {
  const howObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          howCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("visible");
            }, index * 300);
          });
        } else {
          howCards.forEach((card) => {
            card.classList.remove("visible");
          });
        }
      });
    },
    { threshold: 0.1 },
  );

  howParent.forEach((parent) => {
    howObserver.observe(parent);
  });

  // howObserver.observe(howParent);
}

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
  { threshold: 0.1 },
);

items.forEach((element) => {
  observer.observe(element);
});

//language selection

const selectLanguage = document.getElementById("lang-select");

fetch("js/translation.json")
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    i18next.init(
      {
        lng: localStorage.getItem("lang") || "en",
        debug: false,
        resources: response,
      },
      function (err, t) {
        updateContent();
      },
    );

    console.log(i18next.t("index.hero.heading"));
  });

const savedLang = localStorage.getItem("lang") || "en";
selectLanguage.value = savedLang; // ✅ sets the correct option

console.log(savedLang);

const activeFlag = localStorage.getItem("activeFlag") || "us";

if (activeFlag === "us") {
  document.getElementById("usFlag").classList.add("fi");
  document.getElementById("esFlag").classList.remove("fi");
} else {
  document.getElementById("esFlag").classList.add("fi");
  document.getElementById("usFlag").classList.remove("fi");
}

// i18next.init(
//   {
//     lng: localStorage.getItem("lang") || "en",
//     debug: false,
//     resources: heroText,
//   },
//   function (err, t) {
//     updateContent();
//   }
// );

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    element.innerHTML = i18next.t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    element.placeholder = i18next.t(key);
  });

  refreshFaqQuestions();

  if (faqSearchInput && faqSearchInput.value.trim()) {
    renderFaqSearchResults(faqSearchInput.value.trim().toLowerCase());
  }
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

    hideMenu();
  }, 400);
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

const themeToggler = document.querySelectorAll(".toggler");
const sunIcon = document.querySelectorAll(".sunIcon");
const moonIcon = document.querySelectorAll(".moonIcon");

// themeToggler.addEventListener("click", () => {
//   sunIcon.classList.toggle("fa-sun");
//   moonIcon.classList.toggle("fa-moon");
//   document.documentElement.classList.toggle("dark");

//   const isDark = document.documentElement.classList.contains("dark");

//   localStorage.setItem("theme", isDark ? "dark" : "light");
// });

themeToggler.forEach((toggler) => {
  toggler.addEventListener("click", () => {
    sunIcon.forEach((sun) => {
      sun.classList.toggle("fa-sun");
    });
    moonIcon.forEach((moon) => {
      moon.classList.toggle("fa-moon");
    });

    document.documentElement.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    sunIcon.forEach((sun) => {
      sun.classList.remove("fa-sun");
    });
    moonIcon.forEach((moon) => {
      moon.classList.add("fa-moon");
    });
  }
});

const accordion = document.getElementById("accordion");
const details = accordion ? accordion.querySelectorAll("details") : [];
const accordionAnimationDuration = 260;
const faqSearchInput = document.getElementById("faqSearchInput");
const faqSearchResults = document.getElementById("faqSearchResults");

function clearAccordionAnimation(detail) {
  if (detail.animation) {
    detail.animation.cancel();
    detail.animation = null;
  }
}

function finishAccordionAnimation(detail) {
  detail.style.height = "";
  detail.style.overflow = "";
  detail.animation = null;
}

function getClosedAccordionHeight(detail, summary) {
  const styles = window.getComputedStyle(detail);
  const verticalPadding =
    parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
  const verticalBorder =
    parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);

  return `${summary.offsetHeight + verticalPadding + verticalBorder}px`;
}

function closeAccordionItem(detail) {
  const summary = detail.querySelector("summary");

  if (!summary || !detail.open) return;

  clearAccordionAnimation(detail);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    detail.open = false;
    return;
  }

  const startHeight = `${detail.offsetHeight}px`;
  const endHeight = getClosedAccordionHeight(detail, summary);

  detail.style.height = startHeight;
  detail.style.overflow = "hidden";

  detail.animation = detail.animate(
    { height: [startHeight, endHeight] },
    {
      duration: accordionAnimationDuration,
      easing: "ease",
    },
  );

  detail.animation.onfinish = () => {
    detail.open = false;
    finishAccordionAnimation(detail);
  };
}

function openAccordionItem(detail) {
  const summary = detail.querySelector("summary");

  if (!summary || detail.open) return;

  clearAccordionAnimation(detail);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    detail.open = true;
    return;
  }

  const startHeight = `${detail.offsetHeight}px`;
  detail.open = true;
  const endHeight = `${detail.scrollHeight}px`;

  detail.style.height = startHeight;
  detail.style.overflow = "hidden";

  detail.animation = detail.animate(
    { height: [startHeight, endHeight] },
    {
      duration: accordionAnimationDuration,
      easing: "ease",
    },
  );

  detail.animation.onfinish = () => {
    finishAccordionAnimation(detail);
  };
}

details.forEach((targetDetail) => {
  const summary = targetDetail.querySelector("summary");

  if (!summary) return;

  summary.addEventListener("click", (event) => {
    event.preventDefault();

    if (targetDetail.open) {
      closeAccordionItem(targetDetail);
      return;
    }

    details.forEach((detail) => {
      if (detail !== targetDetail) {
        closeAccordionItem(detail);
      }
    });

    openAccordionItem(targetDetail);
  });
});

let faqQuestions = [];

function refreshFaqQuestions() {
  faqQuestions = Array.from(details)
    .map((detail, index) => {
      const question = detail.querySelector(".accordQuest");
      const text = question ? question.textContent.trim() : "";
      const answerText = Array.from(detail.children)
        .filter((child) => child.tagName.toLowerCase() !== "summary")
        .map((child) => child.textContent.trim())
        .join(" ");

      if (!detail.id) {
        detail.id = `faq-question-${index + 1}`;
      }

      return {
        detail,
        text,
        searchText: `${text} ${answerText}`.toLowerCase(),
      };
    })
    .filter((question) => question.text);
}

refreshFaqQuestions();

function hideFaqSearchResults() {
  if (!faqSearchResults) return;

  faqSearchResults.classList.add("hidden");
  faqSearchResults.innerHTML = "";
}

function goToFaqQuestion(detail) {
  details.forEach((item) => {
    if (item !== detail) {
      closeAccordionItem(item);
    }
  });

  openAccordionItem(detail);
  hideFaqSearchResults();

  detail.classList.add("faqSearchMatch");
  setTimeout(() => {
    detail.classList.remove("faqSearchMatch");
  }, 1400);

  setTimeout(() => {
    detail.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    detail.querySelector("summary")?.focus();
  }, accordionAnimationDuration);
}

function renderFaqSearchResults(query) {
  if (!faqSearchResults) return;

  faqSearchResults.innerHTML = "";

  if (!query) {
    hideFaqSearchResults();
    return;
  }

  const matches = faqQuestions.filter((question) =>
    question.searchText.includes(query),
  );

  faqSearchResults.classList.remove("hidden");

  if (!matches.length) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "faqSearchEmpty";
    emptyMessage.textContent = i18next.t("faq.noResults");
    faqSearchResults.appendChild(emptyMessage);
    return;
  }

  matches.forEach((match) => {
    const result = document.createElement("button");
    result.type = "button";
    result.className = "faqSearchResult";
    result.textContent = match.text;

    result.addEventListener("click", () => {
      if (faqSearchInput) {
        faqSearchInput.value = "";
      }

      goToFaqQuestion(match.detail);
    });

    faqSearchResults.appendChild(result);
  });
}

if (faqSearchInput && faqSearchResults) {
  faqSearchInput.addEventListener("input", () => {
    renderFaqSearchResults(faqSearchInput.value.trim().toLowerCase());
  });

  faqSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      faqSearchInput.value = "";
      hideFaqSearchResults();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      event.target !== faqSearchInput &&
      !faqSearchResults.contains(event.target)
    ) {
      hideFaqSearchResults();
    }
  });
}
