 $(document).ready(function(){
var userClickedPattern = [];
var userChosenColour;
var randomChosenColour;
var level;
level=0;
var startToggle;
startToggle = "true";
var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];
var randomNumber;

function nextSequence(){
	randomNumber = Math.floor((Math.random()*4)); 
    randomChosenColour = buttonColours[randomNumber];
	console.log("Random Chosen Color "+randomChosenColour);
	gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    console.log("game pattern = "+gamePattern);
    playSound(randomChosenColour);
    // var soundname = "sounds/"+randomChosenColour+".mp3";
    // console.log("Sound name = " +soundname);
    // var audio = new Audio(soundname);
    // audio.play();
    //startToggle = "false";
     level++;
     $("#level-title").text("Level "+ level);
     
   
 }
  



$(".btn").click(function(){
    userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	console.log("User chosen Colour "+userChosenColour);
	
	console.log("user Clicked Pattern = "+userClickedPattern);
	animatePress(userChosenColour);
	playSound(userChosenColour);
	// for(var i=0; i<userClickedPattern.length; i++)
	// {
	checkAnswer(userClickedPattern.length);
    
	
});

//nextSequence();

function playSound(name){
	 var soundname = "sounds/"+name+".mp3";
    console.log("sound name= "+soundname);
    var audio = new Audio(soundname);
    audio.play();
}

function animatePress(currentColour){
	$(this).addClass("pressed");
	setTimeout(function() {
		$(this).removeClass("pressed");
	}, 100);
}

$(document).on("keydown",function(event){
	
	 if(startToggle){
	 	//console.log(startToggle);
	
    //$("#level-title").text("Level "+level);
    console.log("Ini "+startToggle);
    nextSequence();
    startToggle = "false";
    console.log("Fin "+ startToggle);
}
});

//nextSequence();

function checkAnswer(currentLevel){
	var check = 0;
	console.log("userClickedPattern.length = "+userClickedPattern.length  );
  //var equals = (gamePattern, userClickedPattern) => JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)
 for(var i=0; i<userClickedPattern.length; i++)
 {
//  var equals =  JSON.stringify(gamePattern[i]) == JSON.stringify(userClickedPattern[i]);
//  console.log("are both arrays same = "+equals); 
// }
if(userClickedPattern[i]===gamePattern[i])
{
	check ++;
}

}
  if(check===userClickedPattern.length)
  {
  	console.log("success");
  	if(userClickedPattern.length===gamePattern.length){
  		setTimeout(function(){
 	//for(var i=0;i<currentLevel;i++){
 		userClickedPattern = [];
 	nextSequence();
 //}
          },1000);
  	}
  }
  else{
  	console.log("wrong");
  	var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
    	$("body").removeClass("game-over");
    },200)
    $("#level-title").text("Game Over, Press Any Key To Restart");
    startOver();
  }
 // setTimeout(function(){
 // 	//for(var i=0;i<currentLevel;i++){
 // 	nextSequence();
 // //}
 // },1000);
 
}


function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  startToggle = "true";
}
   
});//ready() close