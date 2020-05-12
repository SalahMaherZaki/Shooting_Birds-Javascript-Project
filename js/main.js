var i = 0;     // defined only as a counter
var score = 0;
var huntBird = 0;
var bgAudio = document.getElementById("bkAduio");
var shootAudio = document.getElementById("shootAduio");
var losePop = document.getElementById("lossPopUp");
var winPop = document.getElementById("winPopUp");


/*************************************** Start Eslam taher ****************************/
function passName() {
    var name = document.getElementById("username").value;
    localStorage.setItem("ValueName", name);
    return false;
}

document.getElementById("result").innerHTML = localStorage.getItem("ValueName");

$(document).ready(function () {

    swal({
        title: "Welcome " + localStorage.getItem("ValueName"),
        text: "We hope you enjoy our game \n To win , you should kill 25 (black and white) birds in specified time",
        type: "info",
        confirmButtonClass: "btn-primary",
        confirmButtonText: "Start Game",
        closeOnConfirm: true,
    },
        function () {
            startGame()
        });

});

/**************************************  End Eslam taher ********************************/
/************************************* Start Mohamed anis ******************************/

var time_lim_interval;
function startTimer() {
    var min = 0;
    var sec = 30;
    time_lim_interval = setInterval(function () {
        document.getElementById('time-limit').innerHTML = min + ':' + sec;
        if (sec > 0) {
            sec -= 1;
        }
        else if (sec == 0 && min > 0) {
            min -= 1;
            sec = 59;
            
        }
        else {
            losePop.style.display = "block";
            lossAduio.play();  //to repeat lose sound
            endGame();

        }

    }, 1000);
}
/********************************** End Mohamed Anis*****************************/


/***********************************Start Eslam taher ********************************/

function startMoveBird() {
    //-----------------pink-----------------
    let img
    pink = setInterval(function () {

        img = new Image(100, 100);
        img.src = "images/pinkbird.gif";
        $("body").append(img);

        $('img').last().css({
            top: Math.random() * ($(window).height() - $('img').last().height()) + 'px',
            left: 0
        }).addClass("allBirds pink");
        
    }, 1500);
    //---------------blackbird--------------
    black = setInterval(function () {

        img = new Image(100, 100);
        img.src = "images/blackbird.gif";
        $("body").append(img);

        $('img').last().css({
            top: Math.random() * ($(window).height() - $('img').last().height()) + 'px',
            left: 0
        }).addClass("allBirds black");
        
    }, 2000);
    //---------------bluebird----------------
    blue = setInterval(function () {

        img = new Image(100, 100);
        img.src = "images/bluebird.gif";
        $("body").append(img);

        $('img').last().css({
            top: Math.random() * ($(window).height() - $('img').last().height()) + 'px',
            left: 0
        }).addClass("allBirds blue");
        
    }, 700);
  /*********************************** Start Eslam taher ********************************/
   /********************************** Eslam & Salah & Anis *******************************/
    //--------------Bomb---------------------
    createbomb = setInterval(function () {

        $("body").append('<div class="area"><img class="bomb" style="width:130px; height:130px ;" src="images/thebomb.gif"> </div>');
        $('.bomb').css({
            top: 0,
            left: Math.random() * ($(window).width() - $('.bomb').last().width()) + 'px'
        })
        
    }, 10000);

    setInterval(function () {
        $(".bomb").css({ "top": "+=10px" });
        $(".bomb").on("click", function () {
            $(this).attr("src", "images/explosion.gif");
            
            bombAudio.play();
            setTimeout(function () {
                $(".area").remove();
            }, 700)

            if (parseInt($(".allBirds").css("width")) >= parseInt($(".area").css("left"))) {
                $(".allBirds").first().click().remove();
            }
        })
    }, 70);
}
/****************************************************************************************************/
/************************************ Start Mohamed Anis*************************************/
// flying bird 
var fly = setInterval(function () {
    $(".allBirds").css({ "left": "+=25px" });
}, 80);
/************************************ End Mohamed Anis*************************************/
/********************************** Start Salah Maher ***************************************/
function setGameScore() {
    document.getElementById('game-score').innerHTML = score;
}
function HuntBird() {
    document.getElementById('bird_count').innerHTML = huntBird;
}



$("body").on("click", ".allBirds", function (e) {
    clickbird = event.target;
    shootAudio.play();
    birdDie.play();
    setTimeout(() => {

        $(this).remove()

    }, 270);
  

    if (clickbird.classList == ("allBirds blue")) {
        $(this).attr("src", "images/skeleton.png");
        score -= 10;
        score.innerText = score;

    } else if (clickbird.classList == "allBirds black") {
        $(this).attr("src", "images/cook.png");
        score += 10;
        score.innerText = score;
        huntBird += 1;
       
    } else {
        $(this).attr("src", "images/cook.png");
        score += 5;
        score.innerText = score;
        huntBird += 1;
        
    }
    huntBird.innerText = huntBird;
    setGameScore();
    HuntBird();

    winGame();
})
/********************************** End Salah Maher ***************************************/
/********************************** Start Mohamed Anis *********************************/
function startGame() {
    
    score = 0;
    document.getElementById('start-game-btn').style.display = 'none';
    startMoveBird();
    startTimer();
    bkAduio.play();
}

function endGame() {
    clearInterval(time_lim_interval);
    clearInterval(black);
    clearInterval(blue);
    clearInterval(pink);
    clearInterval(fly);
    clearInterval(createbomb)
    $(".allBirds").remove();
    $(".area").remove();
    bkAduio.pause();
}

/**********************************  End Mohamed Anis *********************************/
/******************************* anis & salah & eslam ***********************************/
function winGame() {
        if (huntBird == 25) {
            winPop.style.display = "block";
            bkAduio.pause();
            winAduio.play();
            document.getElementById("birdsResult").innerText = huntBird;
            document.getElementById("scoreResult").innerText = score;
            $('.allBirds').remove();
            endGame();
        }
}
/*************************End salah & eslam  & anis ********************************/

/* Note:
Ui's <HTML ,CSS ,and game pics > : all the team worked on , and all 
designs changed and choosed by the acceptance of 
whole them.

Thanks .
*/

