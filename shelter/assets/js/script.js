"use strict"

document.addEventListener('DOMContentLoaded', () => {
	const navBtn = document.querySelector('.hamburger');
	if(navBtn) {
		navBtn.addEventListener('click', () => {
			document.body.classList.toggle('show-nav')
		})
	}	
	function closeNav() {
		document.body.classList.remove('show-nav')
	};
	const navLinks = document.querySelectorAll('.header__nav ul li a');
	if(navLinks[0]) {
		navLinks.forEach(item => {
			item.addEventListener('click', e => {
				closeNav();
			})
		})
	}

	document.addEventListener('click', e => {
		if(e.target.classList.contains('overflow')) {
			closeNav();
		}
	})
})