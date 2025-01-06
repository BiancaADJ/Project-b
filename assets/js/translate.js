window.addEventListener('DOMContentLoaded', () =>{
    let localLinguage = navigator.language || navigator.userLanguage; // Idioma preferido do Navegador
    console.log(navigator.languages.slice(0, 15)); // exibe idiomas

    while(localLinguage.length > 2){
        localLinguage = localLinguage.slice(0, -1); // Remove o último caractere enquanto a variável for > 2
    }
    
    console.log(`${localLinguage}`) // exibe idioma principal
    idioma(`${localLinguage}`) // passa para a função
});

const traducoes = {
    pt: { // traduções pt-x
        texto1: "Sobre",
        texto2: "Experiência",
        texto3: "Trabalhos",
        texto4: "Contatos",
        texto5: "pt 5",

        // modal-login
        texto20: "Entrar",
        texto21: "Entrar",
        texto22: "Ver Senha",
        texto23: "Esqueceu a Senha?",

        // placeholders
        place1: "E-mail ou nome de usuário",
        place2: "Senha",
    },
    es: { // -- es-x
        texto1: "es 1",
        texto2: "es 2",
        texto3: "es 3",
        texto4: "es 4",
        texto5: "es 5",

        // modal-login
        texto20: "Iniciar sesión",
        texto21: "Ingresar",
        texto22: "Ver Contraseña",

        // placeholders
        place1: "Correo electrónico o nombre de usuario",
        place2: "Contraseña",
    },
    fr: { // -- fr-x
        texto1: "fr 1",
        texto2: "fr 2",
        texto3: "fr 3",
        texto4: "fr 4",
        texto5: "fr 5",

        // modal-login
        texto20: "Connexion",
        texto21: "Se connecter",
        texto22: "Voir le mot de passe",

        // placeholders
        place1: "E-mail ou nom d'utilisateur",
        place2: "Mot de passe",
    },
    en: { // -- en-x
        texto1: "en 1",
        texto2: "en 2",
        texto3: "en 3",
        texto4: "en 4",
        texto5: "en 5",

        // modal-login
        texto20: "Login",
        texto21: "Sign In",
        texto22: "Show Password",

        // placeholders
        place1: "Email or username",
        place2: "Password",
    }
};


function idioma(lang){
    // pega todos os elementos da mesma classe .txt (todos) textos
    const elementos = document.querySelectorAll(".txt");
    const placeholders = document.querySelectorAll(".place");

    placeholders.forEach(place =>{
        const key = place.getAttribute('data-key');
        place.placeholder = traducoes[lang][key];
    })

    elementos.forEach(elemento =>{
        const key = elemento.getAttribute('data-key'); // Pega o valor da data-key
        elemento.textContent = traducoes[lang][key]; // aplica as traduções
    });
    document.getElementById("bandeira").src = `./assets/images/flaticon/${lang}_lang.png`;
}