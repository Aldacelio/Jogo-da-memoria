//jogo
const grid = document.querySelector('.grid');
const spanJogador1 = document.querySelector('.jogador1');
const spanJogador2 = document.querySelector('.jogador2');

const pontosJogador1 = document.querySelector('.pontosP1');
const pontosJogador2 = document.querySelector('.pontosP2');
const timer = document.querySelector('.timer');




const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
    
];

const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = ''; 
let vez = 1;
let aux = 0;
let pontos1 = 0;
let pontos2 = 0;

const parabens = (ganhador,pontosG) =>{
        
    if(ganhador == 'Empate'){
        localStorage.setItem('Resultado', `${ganhador}, joguem novamente e decidam essa disputa.`);
        localStorage.setItem('Pontuacao', `Cada um fez o total de ${pontosG} pontos`);    
    }else{
        localStorage.setItem('Resultado', `Parabéns ${ganhador} você ganhou !!!`);
        localStorage.setItem('Pontuacao', `Você fez um total de ${pontosG} pontos`);
    }
    
    window.location = 'parabens.html';
}

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');
    if(disabledCards.length == 20){
        clearInterval(this.loop);

        if(pontos1>pontos2){
            setTimeout(()=>{
                parabens(spanJogador1.innerHTML.replace(':', ''), pontosJogador1.innerHTML);
            },500); 
        }else if(pontos2>pontos1){
            setTimeout(()=>{
                parabens(spanJogador2.innerHTML.replace(':', ''), pontosJogador2.innerHTML);
            },500);
        }else{
            setTimeout(() =>{
                parabens('Empate','10');
            }, 500);
        }
    }
    
}

const checkVez = () =>{
    if(aux == 0){
        vez = 1;
        spanJogador1.classList.add('colorV');
        spanJogador2.classList.remove('colorV');
    }else{
        vez = 2;
        spanJogador2.classList.add('colorV');
        spanJogador1.classList.remove('colorV');
    }
        
}

const checkCards = () =>{
    
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter == secondCharacter){

        if(vez == 1){
            pontos1 +=2;
            pontosJogador1.innerHTML = pontos1;
        }else{
            pontos2 +=2;
            pontosJogador2.innerHTML = pontos2;
        }

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';

        checkEndGame();

    }else{

        setTimeout(() =>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
            if(aux == 1){
                aux = 0
            }else{
                aux = 1;
            }
            checkVez();
        }, 500);
        
    }
}

const revealCard = ({target}) =>{

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard == ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }else if(secondCard == ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }

}

const createCard = (character) =>{
    
    const card = createElement('div','card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    front.style.backgroundImage = `url('../Images/${character}.png')`;
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () =>{

    const duplicationCharacters = [...characters, ...characters];

    const shurffleArray = duplicationCharacters.sort(() => Math.random() - 0.5);

    shurffleArray.forEach((character) =>{
        const card = createCard(character);
        grid.appendChild(card);
    });
    pontosJogador1.innerHTML = pontos1;
    pontosJogador2.innerHTML = pontos2;
}

const startTimer = () =>{
   this.loop = setInterval(()=>{

        const currentTime = +   timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    },1000);
}

window.onload = () =>{
    
    spanJogador1.innerHTML = localStorage.getItem('Jogador1')+':'+pontosJogador1.innerHTML;
    spanJogador2.innerHTML = localStorage.getItem('Jogador2')+':'+pontosJogador2.innerHTML;
    checkVez();
    startTimer();
    loadGame();
}

