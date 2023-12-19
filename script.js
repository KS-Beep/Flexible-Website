const galleryContainer= document.querySelector('.gallery-container');
const galleryControlsContainer= document.querySelector('.gallery-controls');
const galleryControls= ['previous', 'next'];
const galleryItems= document.querySelectorAll('.gallery-item');

class Carousel{
    constructor(container, items, controls){
        this.carouselContainer= container;
        this.carouselControls= controls;
        this.carouselArray= [...items];
        this.autoplayInterval = null;
    }

    updateGallery(){
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
            el.classList.remove('gallery-item-6');
            el.classList.remove('gallery-item-7');
        });

        this.carouselArray.slice(0, 7).forEach((el, i) => {
            el.classList.add(`gallery-item-${i+1}`);
        });
    }

    setCurrentState(direction){
        if(direction.className == 'gallery-controls-previous'){
            this.carouselArray.unshift(this.carouselArray.pop());
        }else{
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls(){
        this.carouselControls.forEach(controls => {
            galleryControlsContainer.appendChild(document.createElement('button')).className=`gallery-controls-${controls}`;
            document.querySelector(`.gallery-controls-${controls}`).innerText=controls;
        });
    }

    useControls(){
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(controls => {
            controls.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(controls);
            });
        });
    }

    startAutoplay(interval) {
        this.autoplayInterval = setInterval(() => {
            this.setCurrentState({
                className: 'gallery-controls-next'
            });
        }, interval);
    }

    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }
}
const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();
exampleCarousel.startAutoplay(3000);

