let menuVisible=false;
// función que oculta o muestra en menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible=false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible=true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList="";
    menuVisible=false
}
// funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills=document.getElementById("skills");
    var distancia_skills=window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills>=300){
        let habilidades=document.getElementsByClassName("progreso");
        habilidades[0].classList.add("htmlcss")
        habilidades[1].classList.add("javascript")
        habilidades[2].classList.add("github")
        habilidades[3].classList.add("sql")
        habilidades[4].classList.add("responsable")
        habilidades[5].classList.add("confiable")
        habilidades[6].classList.add("organizado")
        habilidades[7].classList.add("equipo")
    }
}

// detecto el scrolling para aplciar la animación de la barra de habilidades
window.onscroll=function(){
    efectoHabilidades();
}