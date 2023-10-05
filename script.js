
//  La navbar ne s'affiche que si on scroll un peu vers le bas, donc elle est cachée quand on est tout en haut du site

window.onscroll = function () {
	let currentScrollPos = window.scrollY;

	if (currentScrollPos > window.screenY) {
		document.getElementById('navbar').style.top = '0';
	} else {
		document.getElementById('navbar').style.top = '-100px';
	}
};


// Quand on hover la première fois le logo, le texte descriptif apparaît
// Apparaît aussi après 2 secondes d'inactivité

// logo.addEventListener('mouseleave', () => {
//   timeoutId = setTimeout(() => {
//     description.style.opacity = '1';
//   }, 2000); // Affiche le texte après 2 secondes d'inactivité
// });

{
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
		console.log('yooo');
		title.style.opacity = '1';
		setTimeout(() => {
			text.style.opacity = '1';
		}, 200);
	}
	
	// timeoutId = setTimeout(() => {
	// 	text.style.opacity = '1';
	// 	title.style.opacity = '1';
	// }, 2000); // Affiche le texte après 2 secondes d'inactivité
}

}