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

	

	let amountSlides = '',
		petsTotal = 0;
	if(document.documentElement.clientWidth > 1279) {
		amountSlides = 3;
		petsTotal = 8;
		scrollBy = '1080px';
	} else if (document.documentElement.clientWidth > 767) {
		amountSlides = 2;
		petsTotal = 6;
		scrollBy = '620px';
	} else {
		amountSlides = 1;
		petsTotal: 3;
		scrollBy = '310px';
	}

	const petsWrapper = document.querySelector('.friends-slider__wrapper');

	let petsArr = []

	function createItem(item) {
		return `
			<div class="item" data-item="${item.name}">
				<img src="${item.img}" alt="${item.type} ${item.name}" class="item__img">
				<div class="item__title">${item.name}</div>
				<button class="item__button btn btn_tr" data-item="${item.name}">Learn more</button>
			</div>
		`
		
	}

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
				block.insertAdjacentHTML(where, createItem(item))
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
				arrowNext.style.pointerEvents = 'none'
				arrowPrev.style.pointerEvents = 'none'
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
					removeItems(amountSlides);
					arrowNext.style.pointerEvents = 'all'
					arrowPrev.style.pointerEvents = 'all'
				}, 500)
			})
			arrowPrev.addEventListener('click', e => {
				visibleSlides = prevSlides;
				arrowNext.style.pointerEvents = 'none'
				arrowPrev.style.pointerEvents = 'none'
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
					arrowNext.style.pointerEvents = 'all'
					arrowPrev.style.pointerEvents = 'all'
				}, 500)
			})
		}

		const itemsWrapper = document.querySelector('.pets__grid');
		if(itemsWrapper) {
			for(let i =0; i < petsTotal; i++) {
				itemsWrapper.insertAdjacentHTML('afterbegin', createItem(petsArr[i]))
			}
		}

	})
	function closePopup() {
		document.body.style.overflow = 'visible';
		if(document.querySelector('.popup-overflow')) {
			document.querySelector('.popup-overflow').remove();
		}
	}
	document.addEventListener('click', e => {
		if(e.target.classList.contains('overflow')) {
			closeNav();
		}
		if(e.target.classList.contains('item') || (e.target.parentElement && e.target.parentElement.classList.contains('item'))) {
			if(document.querySelector('.popup-overflow')) {
				document.querySelector('.popup-overflow').remove();
			}
			let thisPet = {};
			petsArr.forEach(item => {
				if(item.name === e.target.getAttribute('data-item')) {
					thisPet = item
				} else if (item.name === e.target.parentElement.getAttribute('data-item')) {
					thisPet = item
				}
 			})
			if(thisPet.name) {
				
				document.body.insertAdjacentHTML('beforeend', `
					<div class="popup-overflow">
						<div class="popup">
							<button class="popup-close">
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
								</svg>
							</button>
							<img src="${thisPet.img}" alt="${thisPet.type} ${thisPet.name}" class="popup__img" />
							<div class="popup-body">
								<h2 class="popup__title">${thisPet.name}</h2>
								<p class="popup__subtitle">${thisPet.type} - ${thisPet.breed}</p>
								<p class="popup__text">${thisPet.description}</p>
								<ul class="popup__ul">
									<li><span>Age:</span>${thisPet.age}</li>
									<li><span>Inoculations:</span>${thisPet.inoculations.join(', ')}</li>
									<li><span>Diseases:</span>${thisPet.diseases.join(', ')}</li>
									<li><span>Parasites:</span>${thisPet.parasites.join(', ')}</li>
								</ul>
							</div>
						</div>
					</div>
				`) 
			}
			document.body.style.overflow = 'hidden';

		} 
		if(e.target.classList.contains('popup-overflow')) {
			closePopup();
		}
		if(e.target.classList.contains('popup-close')) {
			closePopup();
		}
	})
	document.addEventListener('keydown', e => {
		if(e.key ==='Escape') {
			closePopup()
		}
	})

})