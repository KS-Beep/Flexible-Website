document.addEventListener('DOMContentLoaded', function() {
    const menuHamburger = document.querySelector(".menu-hamburger");
    const navLinks = document.querySelector(".navbar-list");

    menuHamburger.addEventListener('click', () => {
        console.log("Menu button clicked");
        navLinks.classList.toggle('show-mobile');
    });
});

const carouselContainer= document.querySelector('.carousel-container');
const carouselNavigation = document.querySelector('.carousel-navigation');
const carouselItems = document.querySelectorAll('.carousel-item');

class Carousel{
    constructor(container, items, navigation){
        this.carouselCont=container;
        this.carouselNav= navigation;
        this.carouselArray=[...items];
    }

    updateCarousel(){
        this.carouselArray.forEach(el => {
            el.classList.remove('carousel-item-1');
            el.classList.remove('carousel-item-2');
            el.classList.remove('carousel-item-3');
            el.classList.remove('carousel-item-4');
            el.classList.remove('carousel-item-5');
            el.classList.remove('carousel-item-6');
            el.classList.remove('carousel-item-7');
        });

        this.carouselArray.slice(0, 7).forEach((el , i) => {
            el.classList.add(`carousel-item-${i+1}`);
        });
    }

    setCurrentState(direction){
        if (direction.className == 'prev'){
            this.carouselArray.unshift(this.carouselArray.pop());
        }else{
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateCarousel();
    }

    setControls() {
        const prevButton = document.createElement('button');
        prevButton.className = 'prev';
        prevButton.innerHTML = '&larr;';
        carouselNavigation.appendChild(prevButton);
    
        const nextButton = document.createElement('button');
        nextButton.className = 'next';
        nextButton.innerHTML = '&rarr;';
        carouselNavigation.appendChild(nextButton);
    }
    
    // setControls() {
    //     const prevButton = carouselNavigation.querySelector('.prev');
    //     const nextButton = carouselNavigation.querySelector('.next');
    
    //     if (prevButton && nextButton) {
    //         prevButton.addEventListener('click', (e) => {
    //             e.preventDefault();
    //             this.setCurrentState({ className: 'prev' });
    //         });
    
    //         nextButton.addEventListener('click', (e) => {
    //             e.preventDefault();
    //             this.setCurrentState({ className: 'next' });
    //         });
    //     }
    // }
    
    useControls(){
        const triggers = [...carouselNavigation.childNodes];
        triggers.forEach(navigation => {
            navigation.addEventListener("click", e=>{
                e.preventDefault();
                this.setCurrentState(navigation);
            });
        });
    }

    startAutoplay(interval) {
        this.autoplayInterval = setInterval(() => {
            this.setCurrentState({
                className: 'next'
            });
        }, interval);
    }

    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }

}

const myCarousel = new Carousel(carouselContainer, carouselItems, carouselNavigation);
myCarousel.setControls();
myCarousel.useControls();
myCarousel.startAutoplay(3000);

