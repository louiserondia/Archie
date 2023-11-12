

window.mobileCheck = function () {
	let check = false;
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};


const menuContent = document.getElementById('menu-content');
const menuLines = document.getElementById('menu-lines');
const menuCross = document.getElementById('menu-cross');

// Quand on hover la première   fois le logo, le texte descriptif apparaît
// Apparaît aussi après 2 secondes d'inactivité

// fix petit bug quand l'animatione est en cours automatiquement et qu'on passe dessus

const logoRadis = document.getElementById('logo');
const canvas = document.getElementById('canvas');
const title = document.getElementById('title');
const text = document.getElementById('text');
const ctx = canvas.getContext('2d');

// Load the image
const img = new Image();
img.src = logoRadis.src;
img.onload = () => {
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0, img.width, img.height);
};


if (window.mobileCheck() || 'ontouchstart' in window || navigator.maxTouchPoints) {
	timeoutId = setTimeout(() => {
		canvas.style.height = 'clamp(150px, 30%, 30%)';
		canvas.style.transform = 'rotate(-35deg)';
		title.style.opacity = '1';
		setTimeout(() => {
			text.style.opacity = '1';
		}, 200);
	}, 1); // Affiche le texte direct sur téléphone
}
else {
	timeoutId = setTimeout(() => {
		canvas.style.height = 'clamp(150px, 30%, 30%)';
		canvas.style.transform = 'rotate(-35deg)';
		title.style.opacity = '1';
		setTimeout(() => {
			text.style.opacity = '1';
		}, 200);
	}, 2000); // Affiche le texte après 2 secondes d'inactivité
}


document.addEventListener('mousemove', (e) => { handleMouseMove(e); });

let transformInProgress = true;

canvas.addEventListener('transitionend', function (event) {
	if (event.propertyName === 'height' || event.propertyName === 'transform')
		transformInProgress = false;
});

function handleMouseMove(event) {
	const rect = canvas.getBoundingClientRect();
	const x = Math.floor((event.clientX - rect.left) * (canvas.width / rect.width));
	const y = Math.floor((event.clientY - rect.top) * (canvas.height / rect.height));

	const pixelData = ctx.getImageData(x, y, 1, 1).data;
	const isTransparent = pixelData[3] === 0

	if (!isTransparent) {
		canvas.style.height = 'clamp(150px, 27%, 27%)';
		canvas.style.transform = 'rotate(-35deg)';
		title.style.opacity = '1';
		setTimeout(() => {
			text.style.opacity = '1';
		}, 200);

		// Animation quand on passe sur le radis (il se secoue)
		if (!transformInProgress) {
			canvas.style.animation = 'shake 0.5s ease infinite';
			canvas.style.animationPlayState = 'running';
			setTimeout(() => {
				canvas.style.animationPlayState = 'paused';
			}, 1000);
		}
	}
}


// Ouvre et ferme le menu déroulant des options quand on clique sur les trois petites lignes

function toggleDropdownMenu() {
	menuContent.style.left =
		(menuContent.style.left === '0px') ? '-500px' : '0px';
	menuLines.style.display =
		(menuLines.style.display === 'none') ? 'flex' : 'none';
	menuCross.style.display =
		(menuCross.style.display === 'block') ? 'none' : 'block';
}

menuContent.addEventListener('click', () => (toggleDropdownMenu()));

// Carousel images
// (on cache l'ancienne image et on affiche la suivante)

let carousel = ['carousel-1', 'carousel-2', 'carousel-3'];
let carouselIndex = 0;
let arrowLeft = document.getElementById('arrow-left');
let arrowRight = document.getElementById('arrow-right');

arrowLeft.addEventListener('click', () => {
	document.getElementById(carousel[carouselIndex]).style.display = 'none';
	carouselIndex = (carouselIndex === 0) ? carousel.length - 1 : carouselIndex - 1;
	document.getElementById(carousel[carouselIndex]).style.display = 'inline';
});

arrowRight.addEventListener('click', () => {
	document.getElementById(carousel[carouselIndex]).style.display = 'none';
	carouselIndex = (carouselIndex === carousel.length - 1) ? 0 : carouselIndex + 1;
	document.getElementById(carousel[carouselIndex]).style.display = 'inline';
});


// SWIPE POUR GSM

let carouselContainer = document.getElementById('carousel-container');
let touchStartX = null;

carouselContainer.addEventListener('touchstart', (e) => {
	touchStartX = e.touches[0].clientX;
	// console.log(touchStartX, carouselContainer.offsetWidth);
	if (touchStartX < carouselContainer.offsetWidth / 3) {
		showPreviousImage();
	} else if (touchStartX > (carouselContainer.offsetWidth / 3) * 2) {
		showNextImage();
	}
});

function showNextImage() {
	document.getElementById(carousel[carouselIndex]).style.display = 'none';
	carouselIndex = (carouselIndex === carousel.length - 1) ? 0 : carouselIndex + 1;
	document.getElementById(carousel[carouselIndex]).style.display = 'inline';
}

function showPreviousImage() {
	document.getElementById(carousel[carouselIndex]).style.display = 'none';
	carouselIndex = (carouselIndex === 0) ? carousel.length - 1 : carouselIndex - 1;
	document.getElementById(carousel[carouselIndex]).style.display = 'inline';
}


// -----------------------
// 			DESSIN
// -----------------------

// Afficher les bulles de discussion quand on passe sur les persos

const charlotte = document.getElementById('charlotte');
const charles = document.getElementById('charles');
const charlotteBubble = document.getElementById('charlotteBubble');

charlotte.addEventListener('mouseenter', () => {
	charlotteBubble.style.opacity = '1';
});
charlotte.addEventListener('mouseleave', () => {
	charlotteBubble.style.opacity = '0';
});

// faire que sur gsm l'image apparaisse quand on passe en scrollant


if (window.mobileCheck() || 'ontouchstart' in window || navigator.maxTouchPoints) {
	document.addEventListener("DOMContentLoaded", function () {
		window.addEventListener("scroll", function () {
			const image = charlotte;
			const imageTop = image.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;

			if (imageTop >= windowHeight / 8 && imageTop <= windowHeight / 2) {
				charlotteBubble.style.opacity = '1';
			} else {
				charlotteBubble.style.opacity = '0';
			}
		});
	});
}

// Quand on clique sur un élément du menu, ça fait apparaître un perso
// si on scroll il part

const face1 = document.getElementById('face1');
const triggerFace1 = document.getElementById('cateringTriggerFace');

triggerFace1.addEventListener("click", function () {
	if (isScrolledToDestination()) { //si on est déjà bien placé sur la page
		face1.style.left = "1px";
		setTimeout(() => {
			window.addEventListener("scroll", function () {
				face1.style.left = "-100px";
			});
		}, 200);
	}
	window.addEventListener("scroll", function () { // si on est loin, on scroll jusqu'au bon endroit, ensuite on fait apparaitre le perso, et ensuite on check si on scroll a nouveau pour l'enlever
		if (isScrolledToDestination()) {
			face1.style.left = "1px";
			setTimeout(() => {
				window.addEventListener("scroll", function () {
					face1.style.left = "-100px";
				});
			}, 200);
		}
	});
	face1.addEventListener("click", function () { // si on click sur le perso, il se retire
		face1.style.left = "-100px";
		return;
	});
	// face1.addEventListener("mouseenter", function () {
	// 	face1.style.left = "-100px";
	// 	setTimeout(() => {
	// 		face1.style.left = "1px";
	// 	}, 250);
	// });
});

function isScrolledToDestination() {
	const destinationElement = document.querySelector('#catering'); // L'élément de destination
	if (!destinationElement) return false;

	const elementRect = destinationElement.getBoundingClientRect();
	return elementRect.top <= 50 && elementRect.top >= -50; // Vous pouvez ajuster la condition selon vos besoins
}


// -------------------
//		  EMAIL
// -------------------

// Envoi d'un email avec le formulaire pour le catering

// document.getElementById('contactForm').addEventListener('submit', function(event) {
// 	event.preventDefault(); // Prevents the default form submission behavior  
// 	const message = document.getElementById('message').value;

// 	sendEmail(message);
// 	document.getElementById('message').value = '';
//   });

//   function sendEmail(message) {
//  	// You'll need to handle sending an email using your own backend or a third-party service like EmailJS or similar.
// 	console.log('Email sent with message:', message);
//   }



document.getElementById('contactForm').addEventListener('submit', function (event) {
	event.preventDefault(); // Empêche le comportement par défaut du formulaire

	const message = document.getElementById('message').value;

	// Envoi du message au serveur
	sendEmail(message);
});

function sendEmail(message) {
	fetch('http://127.0.0.1:5500/envoyer-email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ message })
	})
		.then(response => response.json())
		.then(data => {
			console.log('Réponse du serveur:', data);
			alert('Email envoyé avec succès');
		})
		.catch(error => console.error('Erreur:', error));
}

// agrandir la case de description si besoin

$('#descriptionForm').on('input', function () {
	this.style.height = 'auto'; // Réinitialiser la hauteur
	this.style.height = (this.scrollHeight) + 'px'; // Ajuster la hauteur en fonction de la hauteur du contenu
});

// ----------------------
//  MULTILANGUAGE SYSTEM
// ----------------------

// ----- Afficher le menu déroulant

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
	// item.style.display = (item.getAttribute("value") === currentLanguage) ? 'none' : 'block';
});

// ----- CHANGER DE LANGUE 

let currentLanguage = "fr";
fetchLanguageFile(currentLanguage);

function fetchLanguageFile(language) {
	// Chargez le fichier de langue approprié (fr.json, en.json, es.json)
	fetch(`${language}.json`)
		.then((response) => response.json())
		.then((data) => {
			// Mettez à jour le contenu de la page avec les traductions
			document.getElementById("homeDescriptionText").textContent = data.homeDescriptionText;
			
			document.getElementById("cateringText").textContent = data.cateringText;
			document.getElementById("cateringForm").textContent = data.cateringForm;
			document.getElementById("firstnameForm").placeholder = data.firstnameForm;
			document.getElementById("lastnameForm").placeholder = data.lastnameForm;
			document.getElementById("phoneNumberForm").placeholder = data.phoneNumberForm;
			document.getElementById("emailForm").placeholder = data.emailForm;
			document.getElementById("descriptionForm").placeholder = data.descriptionForm;
			document.getElementById("submitForm").textContent = data.submitForm;
			
			document.getElementById("scheduleText1").textContent = data.scheduleText1;
			document.getElementById("scheduleText2").textContent = data.scheduleText2;
			// document.getElementById("scheduleText3").textContent = data.scheduleText3;
			// document.getElementById("scheduleText4").textContent = data.scheduleText4;
			
			document.getElementById("menuHome").textContent = data.menuHome;
			document.getElementById("menuCatering").textContent = data.menuCatering;
			document.getElementById("menuAboutUs").textContent = data.menuAboutUs;
			document.getElementById("menuContact").textContent = data.menuContact;
			document.getElementById("menuGalery").textContent = data.menuGalery;

		});

	dropdownItems.forEach((item) => {
		item.style.display = (item.getAttribute("value") === language) ? 'none' : 'block';
	});
}
