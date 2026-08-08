$(document).ready(function () {
	// Fancybox init
	if (document.querySelector('[data-fancybox]')) {
		Fancybox.bind('[data-fancybox]', {
			dragToClose: false,
			closeButton: true,
		});
	}

	//Animate blocks
	function initializeAOS() {
		if (window.innerWidth > 1199.98) {
			AOS.init({
				//easing: 'ease-out-back',
				offset: 200,
				delay: 400,
				duration: 700,
				once: true,
			});
		}
	}
	initializeAOS();
	window.addEventListener('resize', () => {
		AOS.refreshHard();
		initializeAOS();
	});

	// Built carousel swiper
	const built__carousel = document.querySelector('.built-carousel');
	if (built__carousel) {
		const swiper = new Swiper(built__carousel, {
			slidesPerView: 'auto',
			spaceBetween: 20,
			speed: 700,
			loop: false,
		});
	}

	// Gallery carousel swiper
	const gallery__carousel = document.querySelector('.gallery__carousel');
	if (gallery__carousel) {
		const swiper = new Swiper(gallery__carousel, {
			slidesPerView: 'auto',
			allowTouchMove: false,
			spaceBetween: 20,
			loop: true,
			speed: 700,
			autoplay: true,
      		pagination: {
      			el: '.gallery--pagi',
      			clickable: true,
    		},
			navigation: {
      			nextEl: '.gallery--navi-next',
      			prevEl: '.gallery--navi-prev',
    		},
		});
	}

	// Reviews carousel swiper
	const reviews__carousel = document.querySelector('.reviews__carousel');
	if (reviews__carousel) {
		const swiper = new Swiper(reviews__carousel, {
			slidesPerView: 'auto',
			allowTouchMove: true,
			spaceBetween: 20,
			loop: true,
			speed: 700,
			//autoplay: true,
      		pagination: {
      			el: '.reviews--pagi',
      			clickable: true,
    		},
			navigation: {
      			nextEl: '.reviews--navi-next',
      			prevEl: '.reviews--navi-prev',
    		},
		});
	}

});

//Hero slider
document.addEventListener("DOMContentLoaded", function () {
	const heroBgs = document.querySelector(".hero__bgs");

	if (heroBgs) {
		const slides = heroBgs.querySelectorAll("img");
		if (slides.length === 0) return;

		let current = 0;

		setInterval(() => {
			slides[current].classList.remove("active");
			current = (current + 1) % slides.length;
			slides[current].classList.add("active");
		}, 5000);
	}
});

// Add .header--scroll to Header
function updateHeaderScrollClass() {
	const header = document.querySelector('.header');
	if (!header) return;
	
	if (window.scrollY > 0) {
		header.classList.add('header--scroll');
	} else {
		header.classList.remove('header--scroll');
	}
}
document.addEventListener('scroll', updateHeaderScrollClass);
document.addEventListener('DOMContentLoaded', updateHeaderScrollClass);

// Scroll links
document.addEventListener('DOMContentLoaded', function () {
	const OFFSET_DESKTOP = 70;
	const OFFSET_MOBILE = 60;
	const MOBILE_BREAKPOINT = 1079.98;

	const header = document.querySelector('.header');
	const burgerBtn = document.querySelector('.header__mobile-burger');
	const mobileMenu = document.querySelector('.header__mobile-menu');

	burgerBtn.addEventListener('click', function () {
		burgerBtn.classList.toggle('active');
		mobileMenu.classList.toggle('active');
		header.classList.toggle('open-menu');
	});

	function getHeaderOffset() {
		return window.innerWidth <= MOBILE_BREAKPOINT ? OFFSET_MOBILE : OFFSET_DESKTOP;
	}

	function scrollToTarget(id) {
		const target = document.getElementById(id);
		if (target) {
			const offset = getHeaderOffset();
			const top = target.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({
				top: top,
				behavior: 'smooth'
			});
		}
	}

	function handleLinkClick(e) {
		const href = this.getAttribute('href');
		if (href.startsWith('#') && href.length > 1) {
			e.preventDefault();
			const id = href.substring(1);
			scrollToTarget(id);

			if (window.innerWidth <= MOBILE_BREAKPOINT) {
				burgerBtn.classList.remove('active');
				mobileMenu.classList.remove('active');
				header.classList.remove('open-menu');
			}
		}
	}

	const links = document.querySelectorAll('a[href^="#"]:not([href="#"]), .scroll-btn');
	links.forEach(link => {
		link.addEventListener('click', handleLinkClick);
	});
});

// Scroll to Top
document.addEventListener("DOMContentLoaded", function() {
    const scrollTopBtn = document.getElementById("scr_top");
    const scrollOffset = 800;

	if (!scrollTopBtn) return;

    window.addEventListener("scroll", () => {
        scrollTopBtn.classList.toggle("visible", window.scrollY > scrollOffset);
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// Trust carousel swiper
document.addEventListener('DOMContentLoaded', function () {
	const breakpoint = 767.98;
	const carousels = document.querySelectorAll('.trust__carousel');

	if (!carousels.length) return;

	carousels.forEach((carousel) => {
		let swiperInstance = null;
		const initOrDestroy = () => {
			if (window.innerWidth <= breakpoint) {
				if (!swiperInstance) {
					swiperInstance = new Swiper(carousel, {
						slidesPerView: 1,
						spaceBetween: 20,
						allowTouchMove: true,
						//loop: true,
						speed: 700,
						pagination: {
      						el: '.trust--pagi',
      						clickable: true,
    					},
						navigation: {
      						nextEl: '.trust--navi-next',
      						prevEl: '.trust--navi-prev',
    					},
					});
				}
			} else {
				if (swiperInstance) {
					swiperInstance.destroy(true, true);
					swiperInstance = null;
				}
			}
		};
		initOrDestroy();
		window.addEventListener('resize', initOrDestroy);
	});
});