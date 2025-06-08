document
  .querySelector(".order__form-file-input")
  .addEventListener("change", function () {
    let file = this.files[0];
    if (file) {
      this.nextElementSibling.innerHTML = file.name;
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  var selects = document.getElementsByClassName("order__select-custom");

  Array.from(selects).forEach(function (selectContainer) {
    var nativeSelect = selectContainer.previousElementSibling;
    var selectedDiv = selectContainer.querySelector(".order__select-selected");
    var itemsDiv = selectContainer.querySelector(".order__select-items");

    selectedDiv.innerHTML =
      nativeSelect.options[nativeSelect.selectedIndex].innerHTML;

    Array.from(nativeSelect.options).forEach(function (option, index) {
      if (index === 0) return;
      var itemDiv = document.createElement("DIV");
      itemDiv.innerHTML = option.innerHTML;
      itemDiv.className = "order__select-item";
      itemDiv.addEventListener("click", function () {
        nativeSelect.selectedIndex = index;
        selectedDiv.innerHTML = this.innerHTML;

        Array.from(itemsDiv.children).forEach((child) =>
          child.classList.remove("order__select-same-as-selected")
        );
        this.classList.add("order__select-same-as-selected");
        itemsDiv.classList.add("order__select-hide");
      });
      itemsDiv.appendChild(itemDiv);
    });

    selectedDiv.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelects();
      itemsDiv.classList.toggle("order__select-hide");
      selectedDiv.classList.toggle("order__select-arrow-active");
    });
  });

  function closeAllSelects() {
    document
      .querySelectorAll(".order__select-items")
      .forEach((item) => item.classList.add("order__select-hide"));
    document
      .querySelectorAll(".order__select-selected")
      .forEach((sel) => sel.classList.remove("order__select-arrow-active"));
  }

  document.addEventListener("click", closeAllSelects);

  const header = document.querySelector(".header");
  const burger = document.querySelector(".header__burger-menu");
  document
    .querySelector(".header__burger-menu")
    .addEventListener("click", () => {
      header.classList.toggle("header--nav-hidden");
      burger.classList.toggle("header__burger-menu--close");
    });

  function onEntry(entry) {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        change.target.classList.add("element-show");
      }
    });
  }

  let options = {
    root: null,
    rootMargin: "0px",
  };

  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll(".element-animation");

  for (let elm of elements) {
    observer.observe(elm);
  }

  window.addEventListener("scroll", () => {
    elements.forEach((elm) => {
      const rect = elm.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        elm.classList.add("element-show");
      }
    });
  });
});
