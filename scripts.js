//Add reset button for win/lose messages
//Change size of cards with gridsize?
//When you click on a different difficulty level, it continues counting the clicks. Need reset. WHen you click reset, it continues counting the clicks and one click in the "new" game will bring you to the win/lost screen

var cards = [
    '<img src="images/nona.jpg">',
    '<img src="images/nona.jpg">',
    '<img src="images/chiyuki.png">',
    '<img src="images/chiyuki.png">',
    '<img src="images/ginti.JPG">',
    '<img src="images/ginti.JPG">',
    '<img src="images/decim.jpg">',
    '<img src="images/decim.jpg">',
    '<img src="images/ginti-bubbles.jpg">',
    '<img src="images/ginti-bubbles.jpg">',
    '<img src="images/Logo.png">',
    '<img src="images/Logo.png">',
    '<img src="images/chavvot.png">',
    '<img src="images/chavvot.png">',
    '<img src="images/clavis.jpg">',
    '<img src="images/clavis.jpg">',
    '<img src="images/oculus.png">',
    '<img src="images/oculus.png">',
    '<img src="images/quin.jpg">',
    '<img src="images/quin.jpg">',
    '<img src="images/strings.jpg">',
    '<img src="images/strings.jpg">',
    '<img src="images/games.jpg">',
    '<img src="images/games.jpg">',
];

    

// All code will wait until the DOM is ready!
$(document).ready(function(){


  //Once user has made the selection, fade out all the buttons and display the number of clicks
    $('#easy').click(function(){
        // reset();
        gridSize = 8;
       $('#easy').fadeOut(1000);
       $('#normal').fadeOut(1000);
       $('#hard').fadeOut(1000);
       $('#numClicks').fadeIn(1500);
       $('#numClicks').css({"display": "block"});
        makeCards();
    })
    $('#normal').click(function(){
        // reset();
        gridSize = 12;
       $('#easy').fadeOut(1000);
       $('#normal').fadeOut(1000);
       $('#hard').fadeOut(1000);
       $('#numClicks').fadeIn(1500);
       $('#numClicks').css({"display": "block"});
        makeCards();
    })
    $('#hard').click(function(){
        // reset();
        gridSize = 24;
       $('#easy').fadeOut(1000);
       $('#normal').fadeOut(1000);
       $('#hard').fadeOut(1000);
       $('#numClicks').fadeIn(1500);
       $('#numClicks').css({"display": "block"});
        makeCards();
    })        
});

 // $('#numclicks').css({"display": "block"});
 // document.getElementById(numClicks).innerHTML = "Number of Clicks: " + numClicks;


//Need to start var clicks at 2 because each image that is clicked on is really rotating two images back to back, so the counter counts 2 clicks for each single click.
var clicks = 2;
var matched = 0;

function makeCards(){

   // Randomize images (cards variable)-loop through images array
   //Make a new array of cards (newCards) based on difficulty level selected by player.
   var newCards = [];
   for(let i=0; i<gridSize; i++){
    newCards.push(cards[i])
   };

   
   //Shuffle cards AFTER difficulty level was selected. This ensures that all images can be matched.
   var mgHTML = '';
    for(let i=0; i<9001; i++){
        var random1 = Math.floor(Math.random() * newCards.length);   
        var random2 = Math.floor(Math.random() * newCards.length);   
        var temp = newCards[random1];
        newCards[random1] = newCards[random2];
        newCards[random2] = temp;
    };
    for(let i = 0; i<gridSize; i++){
      mgHTML += '<div class="mg-tile col-sm-3">';
         mgHTML += '<div class="mg-tile-inner">';
                mgHTML += '<div class="mg-front">'+newCards[i]+'</div>';
                mgHTML += '<div class="mg-back"></div>';
         mgHTML += '</div>';
      mgHTML += '</div>';
   };

    $('.mg-contents').html(mgHTML);


    // Add flip after the DOM is ready, so listeners need to be down below
    //canclick boolean forces player to wait until cards are flipped back over before clicking on additonal cards. Otherwise, all the cards will remain flipped up even when they match if clicked too quickly.
    var canClick = true;
    $('.mg-tile-inner').click(function(){
        if(canClick){
           //Track number of clicks and display in the DOM. Each time you click, it logs two clicks because we are really rotating two images back to back. 
            var numClicks = (clicks++) - 1; //Subtract 1 to account for the double click counts because you are rotating TWO images back to back.

            $('.numClicks').text("Number of Clicks: " + numClicks);

            // If you made "this" into .mg-tile-inner, you would flip all tiles at once
           $(this).toggleClass('flip');
           var cardsUp = $('.flip');

        
           if(cardsUp.length == 2){
                canClick = false;
              // Check to see if images are the same. We only want the flipped elements.
              var cardsUpImages = cardsUp.find('.mg-front img');
              // Index of [0] b/c this code only runs if there are 2 cards face up
              if(cardsUpImages[0].src == cardsUpImages[1].src){
                 // This is a match!
                 cardsUp.addClass('matched');
                    setTimeout(function(){
                        cardsUp.fadeOut(1500);
                        canClick = true;
                    }, 4000);
                    matched++;
                 cardsUp.removeClass('flip');
                }else{
                 // The user has flipped 2 cards. They do not match. Flip them back over. Wait 2 seconds before you remove class. Otherwise, you can't even see them flip back over.
                  setTimeout(function(){
                    cardsUp.removeClass('flip');
                    canClick = true;
                  }, 2000); 
               }
            }
            if(matched === gridSize/2){
                //Player wins when all matches have been made
                //To display win message, hide buttons, number of clicks and title of game
                $('.container').fadeOut(1000)//Fade out contents of entire container at once rather than separately. I could fade out each piece separately at different times to further customize.
                setTimeout(function(){
                    $('.winMessage').fadeIn(1000)//Fade in winning message
                        $('.winMessage').css({"display": "block"});
                        $('#reset').css({"display": "block"});
                }, 1000);    
            }
        }
        if(numClicks > gridSize * 2){
           //Game over if player clicks more than twice the gridsize number of clicks
            $('.container').fadeOut(1000)
            setTimeout(function(){
                    $('.loseMessage').fadeIn(1000)//Fade in winning message
                        $('.loseMessage').css({"display": "block", "font-size": "140px", "margin-top": "85px"});
                        $('#reset').css({"display": "block"});

                }, 1000);    
        }
    });


    // We need this AFTER the user has chosen the difficulty level.
    $('.mg-contents').hide();
    $('.mg-contents').fadeIn(3000);   

    $('#reset').click(function(){
        reset();
    })

    function reset(){//Will only show up at the end of the game with the lose/win message
        
        var newCards = [];
        var clicks = 2;
        var numClicks = 0;
        var matched = 0;
        var mgHTML = '';

        $('.flipped').removeClass();
        $('.matched').removeClass();
        $('.winMessage').css({"display": "none"});//ok
        $('.loseMessage').css({"display": "none"});//ok
        $('.numClicks').text("Number of Clicks: " + numClicks);//numClicks keeps adding on
        $('.container').fadeIn(1000)
    }    
}


