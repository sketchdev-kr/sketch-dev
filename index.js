const thumbsUp = document.querySelector(".far.fa-thumbs-up.fa-2x"),
thumbsDown = document.querySelector(".far.fa-thumbs-down.fa-2x");

function handleOver(event){
    const target= event.target;
    if(target.className.includes("thumbs-up")){
        target.className="fas fa-thumbs-up fa-2x";
        target.style.color ="#1C9954"
    }else{
        target.className="fas fa-thumbs-down fa-2x";
        target.style.color = "#e84545"
    }

}
function handleLeave(event){
    const target= event.target;
    if(target.className.includes("thumbs-up")){
        target.className="far fa-thumbs-up fa-2x";
        target.style.color = "black";
    }else{
        target.className="far fa-thumbs-down fa-2x";
        target.style.color = "black";
    }
    
}
function init(){
    thumbsUp.addEventListener("mouseover",handleOver);
    thumbsUp.addEventListener("mouseleave",handleLeave);
    thumbsDown.addEventListener("mouseover",handleOver);
    thumbsDown.addEventListener("mouseleave",handleLeave);
}

init();