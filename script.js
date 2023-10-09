const menuContent = document.getElementById('menu-content');
const menuLines = document.getElementById('menu-lines');
const menuCross = document.getElementById('menu-cross');


//  La navbar ne s'affiche que si on scroll un peu vers le bas,
//  donc elle est cachée quand on est tout en haut du site
//  + on cache le menu déroulant si on scrolle vers le bas 

window.onscroll = function () {
	let currentScrollPos = window.scrollY;

	if (currentScrollPos > window.screenY + window.innerHeight / 3) {
		document.getElementById('navbar').style.top = '0';
		menuContent.style.left = '-500px';
		menuLines.style.display = 'block';
		menuCross.style.display = 'none';
	} else {
		document.getElementById('navbar').style.top = '-100px';
	}
};


// Quand on hover la première fois le logo, le texte descriptif apparaît
// Apparaît aussi après 2 secondes d'inactivité

{
	timeoutId = setTimeout(() => {
		title.style.opacity = '1';
		setTimeout(() => {
			text.style.opacity = '1';
		}, 200);
	}, 2000); // Affiche le texte après 2 secondes d'inactivité

	const image = document.getElementById('logo');
	const canvas = document.getElementById('canvas');
	const title = document.getElementById('title');
	const text = document.getElementById('text');
	const ctx = canvas.getContext('2d');

	// Load the image
	const img = new Image();
	img.src = image.src;
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
		(menuLines.style.display === 'none') ? 'block' : 'none';
	menuCross.style.display =
		(menuCross.style.display === 'block') ? 'none' : 'block';
}

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


