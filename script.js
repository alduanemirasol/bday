const modal = document.getElementById('welcomeModal');
const yesBtn = document.getElementById('yesBtn');
const music = document.getElementById('bgMusic');

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

yesBtn.addEventListener('click', () => {
    modal.style.display = 'none';       // show page

    music.currentTime = 20;             // start at 20 seconds
    music.volume = 0.4;
    music.play().catch(() => {});       // start music
});

const emojis = ['🎉','🎂','🎈','🥳','🍰','🎁','✨'];
function createEmoji() {
    const emoji = document.createElement('span');
    emoji.className = 'emoji';
    emoji.textContent = emojis[Math.random() * emojis.length | 0];
    const size = 1 + Math.random();
    const duration = 4 + Math.random() * 3;
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.fontSize = size + 'rem';
    emoji.style.animationDuration = duration + 's';
    emoji.style.willChange = 'transform, opacity';
    document.body.appendChild(emoji);
    emoji.addEventListener('animationend', () => {
        emoji.remove();
    });
}
setInterval(createEmoji, 500);

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

// build cards
images.concat(images).forEach(src => {
    const card = document.createElement('div');
    card.className = 'carousel-card';

    const img = document.createElement('img');
    img.src = src;

    card.appendChild(img);
    track.appendChild(card);
});

// seamless infinite scroll
let position = 0;
const speed = 0.4; // adjust speed

function animateCarousel() {
    position -= speed;

    if (Math.abs(position) >= track.scrollWidth / 2) {
        position = 0;
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animateCarousel);
}

animateCarousel();