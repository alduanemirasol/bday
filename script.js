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

// duplicate images for seamless loop
const allImages = [...images, ...images];

allImages.forEach(src => {
    const card = document.createElement('div');
    card.className = 'carousel-card';
    const img = document.createElement('img');
    img.src = src;
    card.appendChild(img);
    track.appendChild(card);
});

// calculate total width of track
const cards = document.querySelectorAll('.carousel-card');
let trackWidth = 0;
cards.forEach(card => {
    trackWidth += card.offsetWidth + 20; // width + margin
});

track.style.width = trackWidth + 'px';
track.style.animationDuration = (trackWidth / 50) + 's'; // adjust speed
track.style.animationName = 'scroll';

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-${trackWidth/2}px); }
}`, styleSheet.cssRules.length);