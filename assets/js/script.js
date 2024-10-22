// eventos
window.addEventListener('scroll', () =>{
    const progresso = document.getElementById("progressbarr");
    const scrollTop = window.scrollY; // Quantidade rolada a partir do topo
    const docHeight = document.documentElement.scrollHeight - window.innerHeight; // Altura total do conteúdo menos a altura da janela visível
    const scrollPercent = (scrollTop / docHeight) * 100; // Calcula a porcentagem rolada
    console.log(`${scrollPercent}`)

    progresso.style.width = `${scrollPercent}%`; // Aplica a largura dinamicamente
});


window.addEventListener('DOMContentLoaded', () =>{ // trocar imagens/icones de acordo com o modo
    const images = document.querySelectorAll(".image"); // pega todas as imagens com a class = 'image'
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){ // se(prefers-color-scheme: light)
        images.forEach(imagens =>{
            const key = imagens.getAttribute('data-key'); // Pega o valor da data-key
            imagens.src = `./assets/images/${key}-light.png`; // troca imagens para modo claro
        });
    }else{
        images.forEach(imagens =>{
            const key = imagens.getAttribute('data-key'); // Pega o valor da data-key
            imagens.src = `./assets/images/${key}-dark.png`; // troca imagens para modo escuro
        });
    }
    let localizacao = navigator.geolocation.getCurrentPosition(showPosition)

    if(navigator.geolocation){ // geolocalização
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }else{
        console.log('Geolocalização não é suportada pelo seu navegador.');
    }
});

function showPosition(position){
    // Exibe a latitude e longitude
    console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
}

function showError(error){
    // Lida com os erros de localização
    switch(error.code) {
        case error.PERMISSION_DENIED: // lembrar de guardar no BD
            console.log("Usuário negou a solicitação de Geolocalização.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("As informações de localização não estão disponíveis.");
            break;
        case error.TIMEOUT:
            console.log("A solicitação de obtenção de localização expirou.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("Ocorreu um erro desconhecido.");
            break;
    }
}

function select_button(number){
    let sessoes = document.querySelectorAll('.button-sessoes');
    let array = [...sessoes];
    let i = 0;
    while(i < 5){
        array[i].classList.remove('border-button-select'); i++;
    }
    array[number].classList.add('border-button-select');
    console.log(`Botão ${number} ativado`)
}

function modal_login(){
// depois
}