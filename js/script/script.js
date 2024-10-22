const tokenCookieName = "accesstoken"; //variable de nom de cookie
const signoutBtn = document.getElementById("signout-btn") //variable bouton signout
const RoleCookieName = "role";

function getRole(){ //temporaire
    return getCookie(RoleCookieName);
}


signoutBtn.addEventListener("click", signout) //écouter d'évenement pour que au click on se déconnecte

function signout(){ //fonction de déconnexion ainsi en se déconnectant le cookie s'efface et se redirectionne vers une page
    eraseCookie(tokenCookieName);
    window.location.reload();
}

function setToken(token){ 
    setCookie(tokenCookieName, token, 7); //3 parametres: la variable de nom de cookie(permet d'utiliser cette variable plusieurs fois), la valuer token, et le nombre de jours que les cookies restent valides
}

function getToken(){
    return getCookie(tokenCookieName); //permet de retourner le cookie du token
}



function setCookie(name,value,days) { //fonction qui permet de placer un cookie
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) { //fonction qui permet de récuperer un cookie
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   //fonction qui permet de supprimir un cookie
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



//Fonction pour afficher ou masquer des éléments 
function showAndHideElementsForRoles(){
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]'); //selectionner les éléments qui ont uniquement le data attribut data-show (donc les boutons connexion et déconnexion)

    allElementsToEdit.forEach(element =>{
        switch(element.dataset.show){  //récupere tous les éléments du data attribut donné, donc show
            case 'disconnected': 
                if(userConnected){
                    element.classList.add("d-none"); //si le role indiqué est connecté, alors aucun élément sera affiché
                }
                break;
            case 'connected': 
                if(!userConnected){
                    element.classList.add("d-none"); //si le role indiqué est déconnecté, alors aucun élément sera affiché
                }
                break;
            case 'admin': 
                if(!userConnected || role != "admin"){ //si le role indiqué est déconnecté ou différent de admin, alors aucun élément sera affiché
                    element.classList.add("d-none"); 
                }
                break;
            case 'client': 
                if(!userConnected || role != "client"){ //si le role indiqué est déconnecté ou différent de client, alors aucun élément sera affiché
                    element.classList.add("d-none"); 
                }
                break;
        }
    })
}