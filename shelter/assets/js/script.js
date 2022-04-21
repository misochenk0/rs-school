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

	let amountSlides = '';
	if(document.documentElement.clientWidth > 1279) {
		amountSlides = 3;
		scrollBy = '1080px';
	} else if (document.documentElement.clientWidth > 767) {
		amountSlides = 2;
		scrollBy = '620px';
	} else {
		amountSlides = 1;
		scrollBy = '310px';
	}

	const petsWrapper = document.querySelector('.friends-slider__wrapper');

	let petsArr = []

	fetch('../../data/pets.json')
	.then(res => res.json())
	.then(data => {
		petsArr = data;
		let visibleSlides = [];
		function getRandomInt(max) {
			return Math.floor(Math.random() * max);
		}
		function getSlides(count, testArr) {
			if(!testArr) {
				while(visibleSlides.length < count){
					let testMe = petsArr[getRandomInt(8)];
					if(visibleSlides.length > 0) {
						if(!visibleSlides.includes(testMe) && (!testArr || !testArr.includes(testMe))) {
							if(testArr) {
								testArr.push(testMe)
							} else {
								visibleSlides.push(testMe);
							}
						}
					} else {
						visibleSlides.push(testMe)
					}
				}
			} else {
				let newArr = [];
				while(newArr.length < count){
					let testMe = petsArr[getRandomInt(8)];
					if(!visibleSlides.includes(testMe) && !newArr.includes(testMe)) {
						newArr.push(testMe)
					}
				}
				return newArr
			}
			
		}
		
		getSlides(amountSlides)
		
		let prevSlides = getSlides(amountSlides, true),
			nextSlides = getSlides(amountSlides, true);
		
		function innerSlides(block, arr, where='beforeend') {
			
			arr.forEach(item => {
				block.insertAdjacentHTML(where, `
				<div class="item">
					<img src="${item.img}" alt="${item.type} ${item.name}" class="item__img">
					<div class="item__title">${item.name}</div>
					<button class="item__button btn btn_tr" data-item="${item.name}">Learn more</button>
				</div>
				`)
			})
		}
		function removeItems(amount, from = 'start') {
			if(petsWrapper) {
				let items = petsWrapper.querySelectorAll('.item');
				for(let i = 0; i < amount; i++) {
					if(from === 'start') {
						items[i].remove();
					} else {
						items[items.length - 1 - i].remove();
					}
				}
			}
		} 
		if(petsWrapper) {
			innerSlides(petsWrapper, prevSlides)
			innerSlides(petsWrapper, visibleSlides)
			innerSlides(petsWrapper, nextSlides)
		}

		const arrowNext = document.querySelector('.friends-slider__arrow.next')
		const arrowPrev = document.querySelector('.friends-slider__arrow.prev')

		if(arrowNext && arrowPrev) {
			arrowNext.addEventListener('click', e => {
				visibleSlides = nextSlides;
				nextSlides = getSlides(amountSlides, true);
				petsWrapper.querySelectorAll('.item').forEach(item => {
					item.style.transition = '.5s';
					item.style.transform = `translateX(-${scrollBy})`;
					setTimeout(() => {
						item.style.transition = '0s';
						item.style.transform = 'none'
					}, 500)
				})
				setTimeout(() => {
					innerSlides(petsWrapper, nextSlides);
					removeItems(amountSlides)
				}, 500)
			})
			arrowPrev.addEventListener('click', e => {
				visibleSlides = prevSlides;
				prevSlides = getSlides(amountSlides, true);
				
				petsWrapper.querySelectorAll('.item').forEach(item => {
					item.style.transition = '.5s';
					item.style.transform = `translateX(${scrollBy})`;
					setTimeout(() => {
						item.style.transition = '0s';
						item.style.transform = 'none'
					}, 500)
				})
				setTimeout(() => {
					innerSlides(petsWrapper, prevSlides, 'afterbegin');
					removeItems(amountSlides, 'end')
				}, 500)
			})
		}

	})

	
})