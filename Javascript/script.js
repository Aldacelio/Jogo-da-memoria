const jogador1 = document.getElementById('jogador1');
const jogador2 = document.getElementById('jogador2');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');

function validateInput(){
    if(jogador1.value.length && jogador2.value.length ){
        button.removeAttribute('disabled');
    }else{
        button.setAttribute('disabled', '');
    }
}

const handleSubmit = (event) =>{
    event.preventDefault();
    localStorage.setItem('Jogador1', jogador1.value);
    localStorage.setItem('Jogador2', jogador2.value);

    window.location.assign('./Pages/jogoMemoria.html');
}

jogador1.addEventListener('input', validateInput);
jogador2.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);