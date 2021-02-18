gsap.registerPlugin('ScrollTrigger');

// DOM
const burger = document.querySelector('.nav__button--burger');
const list = document.querySelector('.nav__list');
const searchButton = document.querySelector('.nav__button--search');
const cards = document.querySelectorAll('.card');
const searchSubmitButton = document.querySelector('.nav__button--submit');
const searchingForm = document.querySelector('.nav__searchForm');
const getStartedButton = document.querySelector('.firstView__button');


// functions
const openMenu = () => {
    searchButton.style.transition = '.3s';
    searchButton.style.transitionDelay = '.3s';
    // burger animation
    gsap.to(burger, {y: -50, duration: .3});
    gsap.to(burger, {y: 0, duration: .4, delay: .6, ease: "bounce.out"});
    // list animation
   searchButton.style.right = list.classList.toggle('visible') ? '-20%' : '5%'; 
}

const showInput = () => {
    gsap.to(searchButton, {y: -100, duration: .3, transitionDelay: 0, transition: 0});
    gsap.to(searchSubmitButton, {transform: 'translateY(0)', duration: .4, delay: .6, ease: "bounce.out"});
    searchingForm.classList.toggle('visible');
}

const closeInput = (e) => {
    e.preventDefault();
    gsap.to(searchSubmitButton, {transform: 'translateY(-100px)', duration: .3});
    gsap.to(searchButton, {y: 0, duration: .4, delay: .6, transitionDelay: 0, ease: "bounce.out"});
    searchingForm.classList.toggle('visible');
}

// scrollTriggers
cards.forEach( card => {
    gsap.timeline({
        scrollTrigger: {
            trigger: card,
            start: 'top center',
        }
    }).from(card.children, {y: 80, opacity: 0, duration: .7, ease: 'power1.out', stagger: 0.2});    
})


// listeners
burger.addEventListener('click', openMenu);
searchButton.addEventListener('click', showInput);
searchingForm.addEventListener('submit', closeInput);