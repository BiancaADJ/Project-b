// eventos
window.addEventListener('scroll', () =>{ // barra de progresso
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

    // Remove a classe de todos os botões para garantir que apenas um botão tenha a borda ativa
    array.forEach(btn => btn.classList.remove('border-button-select'));

    // Adiciona a classe ao botão sobre o qual o mouse passa
    array[number].classList.add('border-button-select');
}
// Adiciona evento de 'mouseleave' para remover o estilo ao sair do botão
document.querySelectorAll('.button-sessoes').forEach((button, index) => {
    button.addEventListener('mouseleave', () => {
        button.classList.remove('border-button-select');
    });
});


let logar = false;
function modal_login(){
    // depois
    if(logar == true){
        // passar para a página do usuário
    }else{
        // passar para a tela de login
        document.getElementById("section_main").style.display = "none";
        document.getElementById("main_modal_login").style.display = "flex";
    }
}

let check_login = document.getElementById("check-login");
check_login.addEventListener('change', () =>{
    // Obtém o input de senha
    let inputSenha = document.getElementById("bd_password");
    
    // Verifica o tipo do input
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text'; // Exibe a senha
    } else {
        inputSenha.type = 'password'; // Oculta a senha
    }
});

function cadastro(page){
    if(page == 1){
        // page = 1 {redefinir senha}
        window.location.href = "../redef-senha.html";
    }else{
        // page = 2 {novo usuário}
        window.location.href = "../cadastro.html";
    }
}

function login(){
    console.log("chamando função de Login")
    // fazer login
    const user = document.getElementById("bd_user").value;
    const pass = document.getElementById("bd_password").value;

    fetch('http://localhost/project-b/lib/pesquisas.php',{ // lembrar de trocar quando o site colocar no ar
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({action: 'login', user: user, pass: pass}) // Enviando o nome de usuário e senha
        })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Sucesso:", data.message);
            logado()
        }else{
            console.log("Falha:", data.message);
            document.getElementById("p_erro_senha").style.display = "flex";
        }
    })
    .catch(error => console.error("Erro:", error));
    console.log("Chegou no final da função de login")
}

function logado(){
    // Após login => mudar foto de perfil, mudar tela dá pagina de usuário
}