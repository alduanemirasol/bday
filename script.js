// ----- Version for cache-busting -----
const version = 'v1.0';

// ----- Modal and Music -----
const modal = document.getElementById('welcomeModal');
const yesBtn = document.getElementById('yesBtn');
const music = document.getElementById('bgMusic');

// Set music source with version for caching
music.src = `audios/celebration.mp3?${version}`;
music.preload = 'auto';

// Function to play music from 20s with fade-in
function playMusicFrom20() {
    music.currentTime = 20;
    music.volume = 0;
    music.play().then(() => {
        let v = 0;
        const fade = setInterval(() => {
            v += 0.02;
            music.volume = Math.min(v, 0.4);
            if (v >= 0.4) clearInterval(fade);
        }, 100);
    }).catch(() => {});
}

// Yes button opens page and starts music
yesBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    playMusicFrom20();
});

// ----- Emojis animation -----
const emojis = ['🎉','🎂','🎈','🥳','🍰','🎁','✨'];
function createEmoji() {
    const emoji = document.createElement('span');
    emoji.className = 'emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const size = 1 + Math.random();
    const duration = 4 + Math.random() * 3;
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.fontSize = size + 'rem';
    emoji.style.animationDuration = duration + 's';
    emoji.style.willChange = 'transform, opacity';
    document.body.appendChild(emoji);
    emoji.addEventListener('animationend', () => emoji.remove());
}
setInterval(createEmoji, 500);

// ----- Bounce text -----
document.querySelectorAll('.bounce-text .line').forEach(line => {
    const text = line.textContent;
    line.textContent = '';
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${i * 0.15}s`;
        line.appendChild(span);
    });
});

// ----- Carousel with caching -----
const track = document.querySelector('.carousel-track');
const images = [
    'images/photo1.jpeg',
    'images/photo2.jpeg',
    'images/photo3.jpeg',
    'images/photo4.jpeg',
    'images/photo5.jpeg',
    'images/photo6.jpeg',
    'images/photo7.jpeg',
    'images/photo8.jpeg'
];

// Preload images
images.forEach(src => {
    const img = new Image();
    img.src = `${src}?${version}`;
});

// Build carousel cards with duplicate for seamless scroll
images.concat(images).forEach(src => {
    const card = document.createElement('div');
    card.className = 'carousel-card';
    const img = document.createElement('img');
    img.src = `${src}?${version}`;
    img.loading = 'lazy'; // lazy load
    card.appendChild(img);
    track.appendChild(card);
});

// Infinite scroll
let position = 0;
const speed = 0.4;

function animateCarousel() {
    position -= speed;
    if (Math.abs(position) >= track.scrollWidth / 2) position = 0;
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animateCarousel);
}

animateCarousel();

// ----- Optional: preload audio separately -----
const preloadAudio = new Audio();
preloadAudio.src = `audios/celebration.mp3?${version}`;
preloadAudio.preload = 'auto';
