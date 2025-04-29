
const emotions = [
    "neugierig", "nervös", "mutig", "verlegen", "erstaunt",
    "betrübt", "zornig", "stolz", "neidisch", "verliebt",
    "böse", "vergnügt", "verwirrt", "zufrieden", "ängstlich",
    "sorglos", "erschrocken", "verblüfft", "gelangweilt", "glücklich"
];

const images = emotions.slice(0, 20).flatMap((emotion, index) => [
    { name: emotion, src: `img/${index + 1}.jpg` },
    { name: emotion, src: `img/${index + 1}.jpg` }
]);

let firstCard = null;
let secondCard = null;
let lock = false;

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createCard(cardData) {
    const card = document.createElement('div');
    card.className = 'card';
    const img = document.createElement('img');
    img.src = cardData.src;
    img.alt = cardData.name;
    card.appendChild(img);

    card.addEventListener('click', () => {
        if (lock || card.classList.contains('flipped')) return;

        card.classList.add('flipped');

        if (!firstCard) {
            firstCard = { element: card, name: cardData.name };
        } else {
            secondCard = { element: card, name: cardData.name };
            lock = true;

            if (firstCard.name === secondCard.name) {
                firstCard = null;
                secondCard = null;
                lock = false;
            } else {
                setTimeout(() => {
                    firstCard.element.classList.remove('flipped');
                    secondCard.element.classList.remove('flipped');
                    firstCard = null;
                    secondCard = null;
                    lock = false;
                }, 800);
            }
        }
    });

    return card;
}

function initGame() {
    const board = document.getElementById('gameBoard');
    const shuffled = shuffle(images);

    shuffled.forEach(data => {
        board.appendChild(createCard(data));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initGame();
    document.body.addEventListener('touchstart', () => {}, {passive: true});
});
