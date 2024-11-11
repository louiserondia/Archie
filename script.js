window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

const menuContent = document.getElementById("menu-content");
const menuLines = document.getElementById("menu-lines");
const menuCross = document.getElementById("menu-cross");

const logoRadis = document.getElementById("logo");
const canvas = document.getElementById("canvas");
const title = document.getElementById("title");
const description = document.getElementById("description");
const ctx = canvas.getContext("2d");

ctx.willReadFrequently = true;

// Load the image
const img = new Image();
img.src = logoRadis.src;
img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
};

let canvasTransitioning = false;

function setCanvasTextValuesForTransition() {
  canvasTransitioning = true;
  canvas.style.height = "clamp(150px, 27%, 27%)";
  canvas.style.transform = "rotate(-35deg)";
  canvas.style.marginTop = "0";
  setTimeout(() => {
    title.style.opacity = "1";
  }, 400);
  setTimeout(() => {
    description.style.opacity = "1";
  }, 600);
  canvasTransitioning = false;
}

if (
  window.mobileCheck() ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints
) {
  timeoutId = setTimeout(() => {
    setCanvasTextValuesForTransition();
  }, 1); // Display the text immediately on the phone
} else {
  timeoutId = setTimeout(() => {
    if (!canvasTransitioning) setCanvasTextValuesForTransition();
  }, 1000); // Displays text after 1s of inactivity on the computer
}

document.addEventListener("mousemove", (e) => {
  handleMouseMove(e);
});

let transformInProgress = true;

canvas.addEventListener("transitionend", function (event) {
  if (event.propertyName === "height" || event.propertyName === "transform")
    transformInProgress = false;
});

function handleMouseMove(event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(
    (event.clientX - rect.left) * (canvas.width / rect.width)
  );
  const y = Math.floor(
    (event.clientY - rect.top) * (canvas.height / rect.height)
  );

  const pixelData = ctx.getImageData(x, y, 1, 1).data;
  const isTransparent = pixelData[3] === 0;

  if (!isTransparent && !canvasTransitioning) {
    setCanvasTextValuesForTransition();
    if (!transformInProgress) {
      // Animation when hover on the radis (it shakes)
      canvas.style.animation = "shake 0.5s ease infinite";
      canvas.style.animationPlayState = "running";
      setTimeout(() => {
        canvas.style.animationPlayState = "paused";
      }, 1000);
    }
  }
}

// Opens and closes menu when click on the three small lines on top left corner

function toggleDropdownMenu() {
  menuContent.style.left = menuContent.style.left === "0px" ? "-500px" : "0px";
  menuLines.style.display =
    menuLines.style.display === "none" ? "flex" : "none";
  menuCross.style.display =
    menuCross.style.display === "block" ? "none" : "block";
}

menuContent.addEventListener("click", () => toggleDropdownMenu());

// CAROUSEL
// Computer

let carousel = Array.from(
  { length: 16 },
  (_, index) => "carousel-" + (index + 1)
);
let carouselIndex = 0;
let arrowLeft = document.getElementById("arrow-left");
let arrowRight = document.getElementById("arrow-right");

arrowLeft.addEventListener("click", () => {
  document.getElementById(carousel[carouselIndex]).style.display = "none";
  carouselIndex = carouselIndex === 0 ? carousel.length - 1 : carouselIndex - 1;
  document.getElementById(carousel[carouselIndex]).style.display = "inline";
});

arrowRight.addEventListener("click", () => {
  document.getElementById(carousel[carouselIndex]).style.display = "none";
  carouselIndex = carouselIndex === carousel.length - 1 ? 0 : carouselIndex + 1;
  document.getElementById(carousel[carouselIndex]).style.display = "inline";
});

// Phone

let carouselContainer = document.getElementById("carousel-container");
let touchStartX = null;

carouselContainer.addEventListener("touchend", (e) => {
  touchStartX = e.touches[0].clientX;
  if (touchStartX < carouselContainer.offsetWidth / 3) {
    showPreviousImage();
  } else if (touchStartX > (carouselContainer.offsetWidth / 3) * 2) {
    showNextImage();
  }
});

function showNextImage() {
  document.getElementById(carousel[carouselIndex]).style.display = "none";
  carouselIndex = carouselIndex === carousel.length - 1 ? 0 : carouselIndex + 1;
  document.getElementById(carousel[carouselIndex]).style.display = "inline";
}

function showPreviousImage() {
  document.getElementById(carousel[carouselIndex]).style.display = "none";
  carouselIndex = carouselIndex === 0 ? carousel.length - 1 : carouselIndex - 1;
  document.getElementById(carousel[carouselIndex]).style.display = "inline";
}

// -------------------------
// 		CATERING FORM
// -------------------------

var date = new Date();
var year = date.getFullYear();
var month = ("0" + (date.getMonth() + 1)).slice(-2); // ajoute un zéro devant le mois si nécessaire
var day = ("0" + date.getDate()).slice(-2);
var formattedDate = year + "-" + month + "-" + day;

document.getElementById("dateForm").value = formattedDate;

// -------------------
//		  EMAIL
// -------------------

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    SendEmail();
  });

function SendEmail() {
  var params = {
    from_first_name: document.getElementById("firstnameForm").value,
    from_last_name: document.getElementById("lastnameForm").value,
    phone_number: document.getElementById("phoneNumberForm").value,
    email: document.getElementById("emailForm").value,
    date:
      document.getElementById("dateForm").value == ""
        ? "no date provided"
        : document.getElementById("dateForm").value,
    message: document.getElementById("descriptionForm").value,
  };
  emailjs
    .send("service_a5k6u3p", "template_sgjkceg", params)
    .then(function (res) {
      document.getElementById("descriptionForm").value = "";
      document.getElementById("confirmationMessage").style.display = "block";
    })
    .catch(function (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
    });
}

// Enlarge description box is necessary

$("#descriptionForm").on("input", function () {
  if (this.scrollHeight > 120) {
    this.style.height = "auto"; // Reset height
    this.style.height = this.scrollHeight + "px"; // Adjust height with content height
  }
});

// ----------------------
//  MULTILANGUAGE SYSTEM
// ----------------------

// Display scrolling menu

const languageButton = document.getElementById("languageButton");
const dropdownList = document.getElementById("dropdownList");
const dropdownItems = dropdownList.querySelectorAll(".dropdown-value");

languageButton.addEventListener("click", function () {
  dropdownList.classList.toggle("active");
});

dropdownItems.forEach((item) => {
  item.addEventListener("click", function () {
    languageButton.textContent = item.textContent;
    dropdownList.classList.remove("active");

    const selectedValue = item.getAttribute("value");

    fetchLanguageFile(selectedValue);
  });
});

// Change Langage

let currentLanguage = "fr";
fetchLanguageFile(currentLanguage);

function fetchLanguageFile(language) {
  // Load langage file (fr.json, en.json, es.json)
  fetch(`static/lang/${language}.json`)
    .then((response) => response.json())
    .then((data) => {
      // Update page content with translations
      document.getElementById("homeDescriptionText1").textContent =
        data.homeDescriptionText1;
      document.getElementById("homeDescriptionText2").textContent =
        data.homeDescriptionText2;
      document.getElementById("homeDescriptionText3").textContent =
        data.homeDescriptionText3;
      document.getElementById("homeDescriptionText4").textContent =
        data.homeDescriptionText4;

      document.getElementById("cateringText").textContent = data.cateringText;
      document.getElementById("cateringForm").textContent = data.cateringForm;
      document.getElementById("firstnameForm").placeholder = data.firstnameForm;
      document.getElementById("lastnameForm").placeholder = data.lastnameForm;
      document.getElementById("phoneNumberForm").placeholder =
        data.phoneNumberForm;
      document.getElementById("emailForm").placeholder = data.emailForm;
      document.getElementById("dateText").textContent = data.dateForm;
      document.getElementById("descriptionForm").placeholder =
        data.descriptionForm;
      document.getElementById("submitForm").textContent = data.submitForm;
      document.getElementById("confirmationMessage").textContent =
        data.confirmationMessage;

      document.getElementById("scheduleText").textContent = data.scheduleText;

      document.getElementById("menuHome").textContent = data.menuHome;
      document.getElementById("menuCatering").textContent = data.menuCatering;
      document.getElementById("menuAboutUs").textContent = data.menuAboutUs;
      document.getElementById("menuContact").textContent = data.menuContact;
      document.getElementById("menuGalery").textContent = data.menuGalery;
    });

  dropdownItems.forEach((item) => {
    item.style.display =
      item.getAttribute("value") === language ? "none" : "block";
  });
}
