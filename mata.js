const grid = document.querySelector('.grid');
const characters = [
   'Lyra',
   'Orion',
   'windy',
   'Sky',
   'Cloud',
   
];

const characterImages = {
   'Lyra': ['Lyra.png', 'Lyra.png'],
   'Orion': ['Orion.png', 'Orion.png'],
   'windy': ['windy.png', 'windy.png'],
   'Sky': ['Sky.png', 'Sky.png'],
   'Cloud': ['Cloud.png', 'Cloud.png'],
};

const characterDescriptions = {
   'Lyra': 'Lyra é uma jovem de espírito forte e coração inabalável. Apesar de ser a irmã mais nova de Orion, ela carrega dentro de si uma determinação que muitos considerariam surpreendente. Com seus cabelos platinados, um contraste marcante com sua pele negra, ela possui uma beleza única e destemida. Nada a detém quando se trata de proteger a sua família, e essa força se reflete em sua personalidade corajosa. Namorada de Cloud, Lyra não apenas ama o rapaz, mas também luta incessantemente para libertá-lo das amarras da vida que ele não escolheu. Ela sabe que a prisão que ele enfrenta é maior do que qualquer cadeia física — é uma prisão imposta pelas expectativas de sua mãe, pelas obrigações que ele não deseja cumprir. Para Lyra, sua missão é clara: salvar Cloud, lutar contra o sistema que os mantém aprisionados e, acima de tudo, fazer o que for necessário para que sua família tenha a liberdade de viver como bem entender.',
   'Orion': 'Orion é um jovem de 23 anos que carrega em si a alma vibrante da arte e a força silenciosa da responsabilidade. Estudante de artes plásticas, é conhecido por sua dedicação tanto dentro quanto fora das quadras — capitão da equipe de basquete da universidade, lidera com coragem, integridade e um senso de cuidado raro. Dono de um estilo punk autêntico, Orion encontra nas ruas sua verdadeira galeria: grafita muros com cores vivas e mensagens intensas, transformando a cidade em um reflexo do que sente e acredita. Prestativo por natureza, está sempre pronto a ajudar quem precisa, mas é ao lado de suas irmãs mais novas que seu lado mais afetuoso se revela por completo. Para elas, ele é mais do que um irmão — é um porto seguro. Orion caminha entre o concreto e a tinta, entre o esporte e a arte, como alguém que nunca teve medo de ser tudo aquilo que o mundo tentou limitar..',
   'windy': 'Windy é uma jovem de 19 anos, estudante de moda e dona de um espírito que se recusa a ser domado. Melhor amiga de Sky desde que se entende por gente, é a primeira a rir das confusões em que ele se mete — mas também a primeira a sacar as garras quando alguém ousa machucá-lo. De personalidade intensa e coração leal, Windy não mede palavras nem esforços para proteger quem ama. Sua risada é alta, seu estilo é ousado, e sua presença, marcante como um desfile inesperado. Por trás da força que exala, existe uma irmã dedicada: tem um irmão mais novo de 17 anos, seu bem mais precioso, e por ele seria capaz de enfrentar o mundo sem pensar duas vezes. Entre agulhas, tecidos e laços, Windy costura com firmeza o próprio destino — e o faz do seu jeito, com brilho nos olhos e coragem no peito.',
   'Sky': 'Sky, cujo nome verdadeiro é Sora, é um jovem japonês de 19 anos, estudante de dança e dono de uma presença impossível de ignorar. Conhecido pelo apelido de "Pavão", ele carrega esse título não apenas por sua aparência marcante, mas pela intensidade com que vive cada gesto, cada palavra e cada passo que dá. Orgulhoso e de temperamento forte, Sky é o tipo de pessoa que prefere enfrentar a verdade, por mais dura que seja, a recuar diante dela. Impulsivo, direto e com uma língua afiada, ele não hesita em defender seus ideais — mesmo que isso signifique levantar a voz. No entanto, por trás da postura firme e das palavras afiadas, existe um artista que se entrega de corpo e alma à dança, encontrando nela uma forma silenciosa, mas poderosa, de revelar sentimentos que palavras jamais conseguiriam traduzir..',
   'Cloud': 'Cloud é um jovem de aparência tão marcante quanto seu silêncio. Albino, de olhos vermelhos intensos, ele carrega no olhar a fúria contida de quem não pôde escolher o próprio caminho. Calado, sempre na dele, observa mais do que fala — e quando fala, cada palavra carrega um peso exato. Seu ódio por Orion não é gratuito: ele inveja a liberdade que o outro ostenta, a leveza de viver como quer, enquanto ele mesmo se vê preso a uma vida que nunca quis. Forçado pela mãe a cursar administração, Cloud caminha entre corredores frios da faculdade como quem cumpre uma sentença. Ainda assim, apesar da frieza aparente, é ferozmente protetor com quem ama. Cloud pode parecer distante, mas guarda dentro de si uma tempestade — e quando essa tempestade se move, ninguém sai ileso.',
   
};

const createElement = (tag, className) => {
   const element = document.createElement(tag);
   element.className = className;
   return element;
}

let firstCard = '';
let secondCard = '';
let gameLoaded = false; // Controle para não recarregar o jogo

const checkEndGame = () => {
   const disabledCard = document.querySelectorAll('.disabled-card');
   if (disabledCard.length === 5) {
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
   if (gameLoaded) return; // Impede carregar o jogo novamente

   const duplicateCharacters = characters.flatMap(character => [
       { character, image: characterImages[character][0] },
       { character, image: characterImages[character][1] }
   ]);

   const shuffleArray = duplicateCharacters.sort(() => Math.random() - 0.5);
   shuffleArray.forEach(({ character, image }) => {
       const card = createCard(character, image);
       grid.appendChild(card);
   });

   gameLoaded = true; // Marca o jogo como carregado
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
