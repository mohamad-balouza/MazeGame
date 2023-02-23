window.onload = function(){
    var Start = document.getElementById("start");
    var End = document.getElementById("end");
    var Status = document.getElementById("status");
    var Boundaries = document.getElementsByClassName("boundary");
    var Game_started = false;
    var Lost_beforestart = false;
    var Is_down = false;
    var Score = 0;
    var Score_text = document.createElement('h2');
    Status.after(Score_text);
    scorePrint();

    Start.addEventListener("mousedown", function(){
        Is_down = true;
    });
    Start.addEventListener("mouseup", function(){
        Is_down = false;
    });
    Start.addEventListener('mousemove', function(e){
        if(Is_down){
            var Mouse_Xposition = e.clientX;
            var Mouse_Yposition = e.clientY;
            Start.style.left = Mouse_Xposition + "px";
            Start.style.top  = Mouse_Yposition + "px";
        }
    });

    function gameState() {
        if(!Game_started && Lost_beforestart){
            for (var i=0; i < Boundaries.length; i++) {
                Boundaries[i].classList.toggle("youlose");
            }
            Lost_beforestart = false;
        }
        Game_started = true;
        Status.innerText = "Reach The End!";
    }

    function gameStart() {
        Start.addEventListener('click', gameRestart);
        Start.addEventListener('mouseover', gameState);
        gamePlay();
    }

    function gamePlay() {
        for (var i=0; i < Boundaries.length; i++) {
            Boundaries[i].addEventListener('mouseover', gameLost);
        }

        End.addEventListener("mouseover", gameWon);
    }

    function gameLost() {
        if(Game_started){
            for (var i=0; i < Boundaries.length; i++) {
                Boundaries[i].classList.toggle("youlose");
            }
            Status.innerText = "You Lost!";
            Game_started = false;
            Lost_beforestart = true;
            Score -= 10;
            scorePrint();
        }
    }

    function gameWon() {
        if(Game_started){
            Status.textContent = "You Won!";
            Game_started = false;
            Score += 5;
            scorePrint();
        }
    }

    function gameRestart() {
        Score = 0;
        scorePrint();
        gameState();
    }

    function scorePrint() {
        Score_text.innerText = "Score: " + Score;
    }

    

    gameStart();

 }

