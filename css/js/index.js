document.addEventListener("DOMContentLoaded", () => {
'use strict'	
	const dataMedia = [
		{
			xxl: 2561,
			xl: 1920,
			lg: 1440,
			md: 768,
			sm: 375,
			xs: 320,
			type: ['px', 'em', 'rem'],
			props: [
				['--inner', 60, 45, 35, 20, 15, 15],
				['--inner-lg', 55, 45, 30, 25, 20, 15],
				['--inner-md', 45, 35, 25, 20, 15, 15],
				['--inner-sm', 40, 35, 25, 20, 18, 15],
				['--inner-xs', 30, 25, 20, 20, 15, 15],

				['--h1', 60, 60, 48, 36, 36, 36],
				['--h2', 54, 44, 40, 30, 30, 30],
				['--h3', 44, 36, 32, 26, 24, 24],
				['--h4', 35, 35, 28, 24, 22, 22],
				['--h5', 24, 24, 23, 22, 21, 20],
				['--h6', 22, 22, 21, 20, 19, 17],
				['--p1', 20, 19, 18, 17, 16, 15],
				['--p2', 16, 16, 16, 15, 15, 14],
				['--p3', 14, 14, 14, 13, 13, 12],

				['--h1_h', 75, 75, 60, 60, 45, 45],
				['--h2_h', 68, 68, 55, 50, 50, 38],
				['--h3_h', 55, 55, 45, 45, 40, 33],
				['--h4_h', 35, 35, 35, 35, 30, 30],
				['--h5_h', 30, 30, 30, 28, 28, 28],
				['--h6_h', 25, 25, 25, 23, 23, 23],
				['--p1_h', 27, 27, 27, 27, 22, 22],
				['--p2_h', 24, 24, 24, 24, 20, 20],
				['--p3_h', 21, 21, 21, 21, 17, 17],
				['--p4_h', 18, 18, 18, 18, 17, 17],
			]	
		},
	]

	class SetProp {

		constructor(arr, type) {
			this.prop = arr[0]
			this.Xxl = arr[1]
			this.Xl = arr[2]
			this.Lg = arr[3]
			this.Md = arr[4]
			this.Sm = arr[5]
			this.Xs = arr[6]
			this._xxl = arr[7]
			this._xl = arr[8]
			this._lg = arr[9]
			this._md = arr[10]
			this._sm = arr[11]
			this._xs = arr[12]
			this.type = type			
			this.html = document.documentElement
			this.width = window.innerWidth
		}

		resizeXxl = () => this.setValue(this.Xxl, this.Xl, this._xl, this._xxl)

		resizeXl = () => this.setValue(this.Xl, this.Lg, this._lg, this._xl)

		resizeLg = () => this.setValue(this.Lg, this.Md, this._md, this._lg)

		resizeMd = () => this.setValue(this.Md, this.Sm, this._sm, this._md)

		resizeSm = () => this.setValue(this.Sm, this.Xs, this._xs, this._sm)

		setValue = (from, to, min, max) => {
			typeof to === 'object' ?
			this.computed(to[0], to[1], min, max - 1) :
			this.computed(from, to, min, max)			
		}

		computed = (from, to, min, max) => {
			try {
				let em = this.type === 'em',
						rem = this.type === 'rem',
						$from = min, 
						$to = max, 
						start = from, 
						end = to,
						css			

				if (em || rem) {
					start = from / 16
					end = to / 16
				}
				
				if (to > from) {
					$from = max
					$to = min
				}

				css = `calc( ${end}${this.type} + (${start} - ${end}) * (100vw - ${$from}px) / (${$to} - ${$from}) )`

				if (this.width <= max && this.width >= min) {
					this.html.style.setProperty(this.prop, css)
				}			

			} catch (e) {
				console.warn(e)
			}
		}

		allResizes = () => {
			this.resizeXxl()
			this.resizeXl()
			this.resizeLg()
			this.resizeMd()
			this.resizeSm()
		}
	}

	class SetStyles {

		constructor (data, type) {
			this.xxl = data.xxl
			this.xl = data.xl
			this.lg = data.lg
			this.md = data.md
			this.sm = data.sm
			this.xs = data.xs		
			this.props = data.props
			this.type = type || data.type[0]
		}

		setValues = (prop) => {
			try {
				const screenArr = [this.xxl, this.xl, this.lg, this.md, this.sm, this.xs]
				if (!prop[6]) prop[6] = prop[5]			
				const arr = prop.concat(screenArr)
				new SetProp(arr, this.type).allResizes()					
			} catch (e) { 
				console.log(e) 
			}
		}

		run = () => {
			try {
				if (Array.isArray(this.props) && !this.props.includes(undefined)) {
					this.props.forEach( prop => {
						if (Array.isArray(prop) && typeof(prop[0]) === 'string') {
							this.setValues(prop)	
						}
					})
				}			
			} catch (e) { 
				console.log(e) 
			}
		}
	}

	try {
		dataMedia.forEach(data => {
			new SetStyles(data).run()
		})			
	} catch (e) {
		console.warn(e)
	}

	function appHeight () {
	  const doc = document.documentElement
	  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
	}

	appHeight()

	const isMobile = {
			Android: function () {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function () {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function () {
				return navigator.userAgent.match(/iOS/i);
			},
			Opera: function () {
				return navigator.userAgent.match(/Opera/i);
			},
			Windows: function () {
				return navigator.userAgent.match(/Windows/i);
			},
			any: function () {
				return (
					isMobile.Android() ||
					isMobile.BlackBerry() ||
					isMobile.iOS() ||
					isMobile.Opera() ||
					isMobile.Windows());
			}
		};

		if (isMobile.any()) {
			document.body.classList.add('_touch');
			let menuArrows = document.querySelectorAll('.menu__arrow');
			if (menuArrows.length > 0) {
				for (let i = 0; i < menuArrows.length; i++) {
					menuArrows[i].addEventListener('click', function(e) {
						menuArrows[i].parentElement.classList.toggle('_active');
					})
				}
			}
		} else {
			document.body.classList.add('_pc');
		}

		const iconMenu = document.querySelector('#burger');
		const menuBody = document.querySelector('#menu');		
		if (iconMenu) {
			iconMenu.addEventListener('click', function (e) {
				document.body.classList.toggle('_lock');
				iconMenu.classList.toggle('_active');
				menuBody.classList.toggle('_active');
			})
		}


		const menuLinks = document.querySelectorAll('[data-goto]');
		if (menuLinks.length > 0) {
			menuLinks.forEach(menuLink => {
				menuLink.addEventListener('click', onMenuLinkClick);
			})
		}
		
		function onMenuLinkClick(e) {
			e.preventDefault();
			if (e.target.dataset.goto && document.querySelector(e.target.dataset.goto)) {
				const gotoBlock = document.querySelector(e.target.dataset.goto);
				const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

				if (iconMenu.classList.contains('_active')) {
					document.body.classList.remove('_lock');
					iconMenu.classList.remove('_active');
					menuBody.classList.remove('_active');							
				} 

				window.scrollTo({
					top: gotoBlockValue,
					behavior: "smooth"
				});
			}
		} 

		function scrollAnimation () {
			let animItems = document.querySelectorAll('._anim-scroll')
			if (animItems.length > 0) {

				function animOnScroll(params) {
					for (let i = 0; i < animItems.length; i++) {
						const animItem = animItems[i]
						const animItemHeight = animItem.offsetHeight //высота объекта
						const animItemOffset = offset(animItem).top //позиция объекта относительно верха
						const animStart = 4
						//Точка старта = Высота окна - высота аним-го объекта деленная на коэф. момента старта анимации
						let animItemPoint = window.innerHeight - animItemHeight / animStart
						if (animItemHeight > window.innerHeight) {
							animItemPoint = window.innerHeight - window.innerHeight / animStart
						}
						if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
							animItem.classList.add('_active')
						}
						else {
							if (!animItem.classList.contains('_anim-static')) {
								animItem.classList.remove('_active')					
							}
						}
					}
				}

				function offset(el) {

					const rect = el.getBoundingClientRect(),
								scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
								scrollTop = window.pageYOffset || document.documentElement.scrollTop;

					return {
						top: rect.top + scrollTop, 
						left: rect.left + scrollLeft
					}
				}

				setTimeout( () =>  animOnScroll() , 300)
			}		
		}

		window.addEventListener('scroll', () => {
			scrollAnimation()
		})
		
		scrollAnimation()

		try {
			const socialArr = [
				{
					name: '.telegram',
					address: 'https://telegram.org'
				},
				{
					name: '.twitter',
					address: 'https://twitter.com'
				}
			]

			socialArr.map( item => {
				const nodes = document.querySelectorAll(item.name)
				if (nodes.length > 0) {
					nodes.forEach(node => {
						node.href = item.address
					})
				}
			})						
		} catch (e) {
			console.warn(e)
		}




});