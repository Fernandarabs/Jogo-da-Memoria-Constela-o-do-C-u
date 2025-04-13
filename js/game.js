const grid = document.querySelector('.grid');
const characters = [
   'tamandua',
   'veado',
   'preguica',
   'Nami',
   'Robin',
   'Sanji',
   'Ussop',
   'Zoro',
   'Vivi',
   'brook',
];

const characterImages = {
   'tamandua': ['tamandua.png', 'tamanduab.png'],
   'veado': ['veado.png', 'veadob.png'],
   'preguica': ['preguica.png', 'preguicab.png'],
   'Nami': ['Nami.jpg', 'Namib.jpg'],
   'Robin': ['Robin.jpg', 'Robinb.jpg'],
   'Sanji': ['Sanji.jpg', 'Sanjib.jpg'],
   'Ussop': ['Ussop.jpg', 'Ussopb.jpg'],
   'Zoro': ['Zoro.jpg', 'Zorob.jpg'],
   'Vivi': ['Vivi.jpg', 'Vivib.jpg'],
   'brook': ['Brook.jpg', 'Brookb.jpg'],
};

const characterDescriptions = {
   'tamandua': 'Descrição do Tamanduá.',
   'veado': 'Descrição do Veado.',
   'preguica': 'Descrição da Preguiça.',
   'Nami': 'Descrição da Nami.',
   'Robin': 'Descrição da Robin.',
   'Sanji': 'Descrição do Sanji.',
   'Ussop': 'Descrição do Ussop.',
   'Zoro': 'Descrição do Zoro.',
   'Vivi': 'Descrição da Vivi.',
   'brook': 'Descrição do Brook.'
};

const createElement = (tag, className) => {
   const element = document.createElement(tag);
   element.className = className;
   return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
   const disabledCard = document.querySelectorAll('.disabled-card');
   if (disabledCard.length === 20) {
       alert('Parabéns, você conseguiu!!!');
   }
}

const checkCards = () => {
   const firstCharacter = firstCard.getAttribute('data-character');
   const secondCharacter = secondCard.getAttribute('data-character');
   if (firstCharacter === secondCharacter) {
       firstCard.firstChild.classList.add('disabled-card');
       secondCard.firstChild.classList.add('disabled-card');
       firstCard = '';
       secondCard = '';
       checkEndGame();

       showCardDescription(firstCharacter);
   } else {
       setTimeout(() => {
           firstCard.classList.remove('reveal-card');
           secondCard.classList.remove('reveal-card');
           firstCard = '';
           secondCard = '';
       }, 500);
   }
}

const revealCard = ({ target }) => {
   if (target.parentNode.className.includes('reveal-card')) {
       return;
   }
   if (firstCard === '') {
       target.parentNode.classList.add('reveal-card');
       firstCard = target.parentNode;
   } else if (secondCard === '') {
       target.parentNode.classList.add('reveal-card');
       secondCard = target.parentNode;
       checkCards();
   }
}

const createCard = (character, image) => {
   const card = createElement('div', 'card');
   const front = createElement('div', 'face front');
   const back = createElement('div', 'face back');
   front.style.backgroundImage = `url('../imagens/${image}')`;
   card.appendChild(front);
   card.appendChild(back);
   card.addEventListener('click', revealCard);
   card.setAttribute('data-character', character);
   return card;
}

const loadGame = () => {
   const duplicateCharacters = characters.flatMap(character => [
       { character, image: characterImages[character][0] },
       { character, image: characterImages[character][1] }
   ]);

   const shuffleArray = duplicateCharacters.sort(() => Math.random() - 0.5);
   shuffleArray.forEach(({ character, image }) => {
       const card = createCard(character, image);
       grid.appendChild(card);
   });
}

const showCardDescription = (character) => {
   const infoBox = document.getElementById('infoBox');
   const cardDescription = document.getElementById('cardDescription');
   cardDescription.textContent = characterDescriptions[character];
   infoBox.style.display = 'flex';
};


const closeInfoBox = () => {
   const infoBox = document.getElementById('infoBox');
   infoBox.style.display = 'none';
};

loadGame();
