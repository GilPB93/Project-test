const mailInput = document.getElementById("EmailInput") //variable email input
const passwordInput = document.getElementById("PasswordInput") //variable password input
const btnSingin = document.getElementById("btnSignin"); //variable bouton de connexion


btnSingin.addEventListener("click", checkCredentials); //écouteur d'événements pour checker les crédentiels au click sur le bouton

function checkCredentials(){
    //Ici, il faudra appeler l'API pour vérifier les credentials en BDD
    
    if(mailInput.value == "test@mail.com" && passwordInput.value == "123"){ //crédentials fictives
        //Il faudra récupérer le vrai token
        const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf"; //token fictif
        setToken(token); //ceci est à placer apres la création du fichier script.js et ses fonctions
        //placer ce token en cookie

        setCookie(RoleCookieName, "admin", 7); //temporaire
        window.location.replace("/"); //si valide alors redirection vers la page d'accueil
    }
    else{
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}


function isConnected(){ //ceci permet de savoir si on est ou pas connecté
    if(getToken() == null || getToken == undefined){
        return false;
    }
    else{
        return true;
    }
}