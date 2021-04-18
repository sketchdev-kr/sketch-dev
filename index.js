const thumbsUp = document.querySelector(".far.fa-thumbs-up"),
thumbsDown = document.querySelector(".far.fa-thumbs-down");

function handleOver(event){
    const target= event.target;
    if(target.className.includes("thumbs-up")){
        target.className="fas fa-thumbs-up";
        target.style.color ="#1C9954"
    }else{
        target.className="fas fa-thumbs-down";
        target.style.color = "#e84545"
    }

}
function handleLeave(event){
    const target= event.target;
    if(target.className.includes("thumbs-up")){
        target.className="far fa-thumbs-up";
        target.style.color = "black";
    }else{
        target.className="far fa-thumbs-down";
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