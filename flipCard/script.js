const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard =false;
let lockBoard = false;
let firstCard, secondCard;
let count=50;
let pass=0;
function flipcard(){
    if(lockBoard) return;
    if (this === firstCard) return;
    count--;
    if (count == 0){
        resetgame();
    }
    document.querySelector("#cnt").innerHTML=count;
    this.classList.add('flip');

    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        //second click
        secondCard=this;       
        checkForMatch();  
}
function checkForMatch(){
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards():unflipCards();
}
function disableCards(){
    firstCard.removeEventListener('click',flipcard);
    secondCard.removeEventListener('click',flipcard);
    pass++;
    if (pass==8){
        completed();
    }
    resetBoard();
}

function unflipCards(){
    lockBoard=true;
    setTimeout(()=> {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
        },1500);  
}
function resetBoard(){
    [hasFlippedCard, lockBoard ] = [false, false];
    [firstCard , secondCard ] = [null , null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*16);
        card.style.order = randomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flipcard));

function resetgame(){
    setTimeout(()=>{
        var resetTxt = "<div class='txt'> Out of Moves Click OK to restart...<br> <button onclick='location.reload()'>OK</button> </div> ";
        document.querySelector('.newtxt').innerHTML = resetTxt;
        document.querySelector('.newtxt').classList.add('newtx');
        document.querySelector('.memory-game').classList.add("fadecard");
    },2000);
    
}
function completed(){
    setTimeout(()=>{
        var resetTxt = "<div class='txt'> Hurrahh...You completed...<br><h6>Click OK to Restart </h6><button onclick='location.reload()'>OK</button> </div> ";
        document.querySelector('.newtxt').innerHTML = resetTxt;
        document.querySelector('.newtxt').classList.add('newtx');
        document.querySelector('.memory-game').classList.add("fadecard");
    },2000);
    
}

