const sliderContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-slide');
const slideLeft = document.querySelector('.left-slide');
const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');
const slidesLength = slideRight.querySelectorAll('div').length;

let activeSlideIndex = 0;

slideRight.style.top = `${-(slidesLength - 1) * 100}vh`;

upButton.addEventListener('click', () => {
  changeSlide('up');
});

downButton.addEventListener('click', () => {
  changeSlide('down');
});

const changeSlide = (direction) => {
  //const sliderHeight = sliderContainer.clientHeight - sliderContainer.scrollTop;
  if (direction === "up") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesLength - 1;
    }
  } else if (direction === "down") {
    activeSlideIndex++;
    if (activeSlideIndex > slidesLength - 1) {
      activeSlideIndex = 0;
    }
  }

  // slideRight.style.transform = `translateY(${-activeSlideIndex * sliderHeight}px)`;
  // slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;

  // Better approach:
  slideLeft.style.transform = `translateY(${-activeSlideIndex * 100}vh)`;
  slideRight.style.transform = `translateY(${activeSlideIndex * 100}vh)`;
}