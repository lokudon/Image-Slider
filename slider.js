
const slides = document.querySelector(".slides");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const dotsContainer = document.getElementById("dots");

const originalImages = Array.from(slides.children);
const imageCount = originalImages.length;

let index = 1;
let autoPlay;

// Clone the first and last images for seamless looping
slides.appendChild(originalImages[0].cloneNode(true));
slides.insertBefore(
    originalImages[imageCount - 1].cloneNode(true),
    originalImages[0]
);

function updateSlider(animate = true) {
    slides.style.transition = animate
        ? "transform 0.5s ease-in-out"
        : "none";

    // Move exactly one full slider width per image
    slides.style.transform = `translateX(-${index * 100}%)`;

    const activeDot = (index - 1 + imageCount) % imageCount;

    Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.classList.toggle("active", i === activeDot);
    });
}

// Create clickable dots
for (let i = 0; i < imageCount; i++) {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to image ${i + 1}`);

    dot.addEventListener("click", () => {
        index = i + 1;
        updateSlider();
        resetAutoPlay();
    });

    dotsContainer.appendChild(dot);
}

function next() {
    if (index >= imageCount + 1) return;
    index++;
    updateSlider();
}

function previous() {
    if (index <= 0) return;
    index--;
    updateSlider();
}

// Seamless looping at either end
slides.addEventListener("transitionend", () => {
    if (index === imageCount + 1) {
        index = 1;
        updateSlider(false);
    } else if (index === 0) {
        index = imageCount;
        updateSlider(false);
    }
});

nextButton.addEventListener("click", () => {
    next();
    resetAutoPlay();
});

prevButton.addEventListener("click", () => {
    previous();
    resetAutoPlay();
});

function startAutoPlay() {
    autoPlay = setInterval(next, 3000);
}

function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
}

updateSlider(false);
startAutoPlay();
