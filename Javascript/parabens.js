const vencedor = document.querySelector('.text-parabens');
const pontosG = document.querySelector('.pontosG');
const textParabens = document.querySelector('.text-parabens');

const testeFonte = () =>{
    if(vencedor.innerHTML == 'Empate, joguem novamente e decidam essa disputa.'){
        textParabens.style.fontSize = '2.6rem';
    }
}


const loadParabens = () =>{

    vencedor.innerHTML = localStorage.getItem('Resultado');
    pontosG.innerHTML = localStorage.getItem('Pontuacao');

    testeFonte();
}


window.onload = () =>{
    loadParabens();
}