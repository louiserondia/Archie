const menuContent = document.getElementById('menu-content');
const menuLines = document.getElementById('menu-lines');
const menuCross = document.getElementById('menu-cross');

// Quand on hover la première   fois le logo, le texte descriptif apparaît
// Apparaît aussi après 2 secondes d'inactivité
//changer sur tel
//fix petit bug quand l'animatione st en cours automatiquement et qu'on passe dessus

{
	timeoutId = setTimeout(() => {
		canvas.style.height = 'clamp(150px, 30%, 30%)';
		canvas.style.transform = 'rotate(-35deg)';
		title.style.opacity = '1';
		setTimeout(() => {
			text.style.opacity = '1';
		}, 200);
	}, 2000); // Affiche le texte après 2 secondes d'inactivité

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

	document.addEventListener('mousemove', (e) => { handleMouseMove(e); });


	function handleMouseMove(event) {
		const rect = canvas.getBoundingClientRect();
		const x = Math.floor((event.clientX - rect.left) * (canvas.width / rect.width));
		const y = Math.floor((event.clientY - rect.top) * (canvas.height / rect.height));

		const pixelData = ctx.getImageData(x, y, 1, 1).data;
		const isTransparent = pixelData[3] === 0

		if (!isTransparent) {
			canvas.style.height = 'clamp(150px, 30%, 30%)';
			canvas.style.transform = 'rotate(-35deg)';
			title.style.opacity = '1';
			setTimeout(() => {
				text.style.opacity = '1';
			}, 200);
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

// Afficher les bulles de discussion quand on passe sur les persos

const charlotte = document.getElementById('charlotte');
const charles = document.getElementById('charles');

const charlotteBubble = document.getElementById('charlotteBubble');

// charlotte.addEventListener('click', () => {
// 	charlotteBubble.style.display = (charlotteBubble.style.display === 'flex') ? 'none' : 'flex';
// });
charlotte.addEventListener('mouseenter', () => {
	charlotteBubble.style.opacity = '1';
});
charlotte.addEventListener('mouseleave', () => {
	charlotteBubble.style.opacity = '0';
});


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

		});

	dropdownItems.forEach((item) => {
		item.style.display = (item.getAttribute("value") === language) ? 'none' : 'block';
	});
}



// SVG TEST

// Get a reference to the SVG document
const svgObject = document.getElementById('svg-object');
const svgDoc = svgObject.contentDocument;

// Access SVG elements
const svgElements = svgDoc.getElementsByTagName('path'); // Or any other element type

// Check if a specific point is within a shape
const pointIsInsideShape = (x, y) => {
  for (const path of svgElements) {
    if (svgDoc.elementFromPoint(x, y) === path) {
      return true;
    }
  }
  return false;
}

// Example usage
const x = 100; // X coordinate
const y = 100; // Y coordinate
const isInside = pointIsInsideShape(x, y);
console.log(`Is point (${x}, ${y}) inside a shape: ${isInside}`);


svgObject.addEventListener('mousemove', (e) => {
	console.log(e.clientX, e.clientY);
	console.log(pointIsInsideShape(e.clientX, e.clientY));
})


