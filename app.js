const lessons = 24;
const cardsPerLesson = 25;
let currentLesson = 1;
let cards = [];
let currentIndex = 0;
let stats = {}; // {0: {can: 2, cannot: 1, last: 'can'}, ...}

const lessonDropdown = document.getElementById('lessonDropdown');
const startBtn = document.getElementById('startBtn');
const onlyUngelerntCheckbox = document.getElementById('onlyUngelernt');
const lessonSelectDiv = document.getElementById('lessonSelect');
const flashcardContainer = document.getElementById('flashcardContainer');
const flashcard = document.getElementById('flashcard');
const canCountEl = document.getElementById('canCount');
const cannotCountEl = document.getElementById('cannotCount');
const backBtn = document.getElementById('backBtn');

// Dropdown füllen
for (let i = 1; i <= lessons; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `Lektion ${i}`;
    lessonDropdown.appendChild(opt);
}

// Starten
startBtn.addEventListener('click', () => {
    currentLesson = parseInt(lessonDropdown.value);
    loadLesson(currentLesson);
    lessonSelectDiv.classList.add('hidden');
    flashcardContainer.classList.remove('hidden');
});

// Zurück zur Lektion Auswahl
backBtn.addEventListener('click', () => {
    lessonSelectDiv.classList.remove('hidden');
    flashcardContainer.classList.add('hidden');
});

// Bilder laden und mischen
function loadLesson(lesson) {
    cards = [];
    stats = {};
    for (let i = 1; i <= cardsPerLesson; i++) {
        cards.push({
            id: i,
            img: `images/lesson-${lesson}/question_${i}.png`,
            can: 0,
            cannot: 0,
            last: null
        });
    }

    shuffle(cards);

    currentIndex = 0;
    showCard();
}

function showCard() {
    if (cards.length === 0) {
        flashcard.style.backgroundImage = '';
        return;
    }

    if (currentIndex >= cards.length) currentIndex = 0;

    const card = cards[currentIndex];
    flashcard.style.backgroundImage = `url(${card.img})`;
}

// Swipe Handling
/*let startX = 0;
flashcard.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

flashcard.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;
    if (delta > 50) {
        markCard('can');
    } else if (delta < -50) {
        markCard('cannot');
    }
});*/

flashcard.addEventListener('click', () => {
    markCard('can');
});

function markCard(status) {
    const card = cards[currentIndex];
    if (status === 'can') {
        card.can++;
        card.last = 'can';
    } else {
        card.cannot++;
        card.last = 'cannot';
    }

    currentIndex++;
    showCard();
}

// Shuffle Array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
