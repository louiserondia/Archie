const menuContent = document.getElementById('menu-content');
const menuLines = document.getElementById('menu-lines');
const menuCross = document.getElementById('menu-cross');

// Quand on hover la première fois le logo, le texte descriptif apparaît
// Apparaît aussi après 2 secondes d'inactivité

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


// Envoi d'un email avec le formulaire pour le catering

document.getElementById('contactForm').addEventListener('submit', function(event) {
	event.preventDefault(); // Prevents the default form submission behavior  
	const message = document.getElementById('message').value;
  
	sendEmail(message);
	document.getElementById('message').value = '';
  });
  
  function sendEmail(message) {
 	// You'll need to handle sending an email using your own backend or a third-party service like EmailJS or similar.
	console.log('Email sent with message:', message);
  }

  

