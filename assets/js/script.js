'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalPosition = document.querySelector("[data-modal-position]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    modalPosition.innerHTML = this.querySelector("[data-testimonials-position]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn?.addEventListener("click", testimonialsModalFunc);
overlay?.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select?.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
console.log(navigationLinks.length)
// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

//////////////flying-animation////////////////////
// Get the container element
const container = document.querySelector('.about');

let flies = [];
// Function to create a new fly element
function createFly() {
  // Create a new fly element
  const fly = document.createElement('div');
  fly.classList.add('fly');

  // Set the initial position and opacity
  let left = Math.floor(Math.random() * (container.offsetWidth - 20));
  fly.style.left = `${left}px`;
  let top = container.offsetHeight + 50;
  fly.style.top = `${top}px`;
  fly.style.opacity = 1;

  let size = 5 + Math.random() * 10;
  fly.style.width = fly.style.height = `${size}px`
  fly.style.filter = `blur(${size}px)`
  // Add the fly element to the container
  container.appendChild(fly);
  flies.push({
    element: fly,
    left: left, 
    top: top,
    opacity: 1,
    size:size,
    speed: (25-size) / 10,
    speedX: Math.random() > 0.5 ? 0.5 : -0.5,
  });
}

function moveFly() {
  for(let i = 0; i < flies.length; i ++) {
    flies[i].top -= flies[i].speed;
    flies[i].element.style.top = `${flies[i].top}px`

    flies[i].left -= flies[i].speedX;
    flies[i].speedX -= flies[i].speedX / Math.abs(flies[i].speedX) * (25-flies[i].size) / 10000
    flies[i].element.style.left = `${flies[i].left}px`

    flies[i].opacity -= 0.005;
    flies[i].element.style.opacity = flies[i].opacity

    if(flies[i].opacity < 0) {
      flies[i].element.remove();
      flies.splice(i, 1);
    }
  }
}

setInterval(createFly, 30)
setInterval(moveFly, 10)


/////////// Position Animation ///////////////////////////
const devPosition = document.querySelector('.dev-position');

const positions =["React | Next", "Vue | Nuxt", "PHP | Laravel", "Web3", "iOS | Mobile App", "Svelte | SvelteKit", "Flutter" ];
let word_index = 0;
let letter_index = 0;
let direct = 1;
let pause = 0;
let isPause = 0;
function animation() {
  devPosition.innerHTML = positions[word_index].slice(0, letter_index);
  if(isPause == 0)
    letter_index += direct;
  else{
    pause ++;
    if(pause == 10) {
      isPause = 0;
    }
  }
  if(isPause == 0 && direct == 1 && letter_index == positions[word_index].length) {
    direct = -1;
    isPause = 1;
    pause = 0;
  }
  if(letter_index == 0) {
    direct = 1;
    word_index = (word_index + 1) % positions.length
  }
}

setInterval(animation, 80)


var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


const progressCircle = document.querySelector(".autoplay-progress svg");
  const progressContent = document.querySelector(".autoplay-progress span");
  var swiper = new Swiper(".mySwiperPic", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        progressCircle.style.setProperty("--progress", 1 - progress);
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      }
    }
  });