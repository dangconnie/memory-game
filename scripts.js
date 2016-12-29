//I still need to add different grid sizes based on the buttons clicked. 
//easy-8 medium-16 hard-24 


var cards = [
    '<img src="images/nona.jpg">',
    '<img src="images/nona.jpg">',
    '<img src="images/chiyuki.png">',
    '<img src="images/chiyuki.png">',
    '<img src="images/ginti.JPG">',
    '<img src="images/ginti.JPG">',
    '<img src="images/decim.jpg">',
    '<img src="images/decim.jpg">',

];




// All code will wait until the DOM is ready!
$(document).ready(function(){

    //Need to start var clicks at 2 because each image that is clicked on is really rotating two images back to back, so the counter counts 2 clicks for each single click.
    var clicks = 2;
    var gridSize = 8;
    var matched = 0;

   // Randomize images (cards variable)-loop through images array
   for(var i=0; i<100; i++){
	  var randomize = Math.floor(Math.random() * cards.length);
   }

   var mgHTML = '';
    for(let i=0; i<9001; i++){
        var random1 = Math.floor(Math.random() * cards.length);   
        var random2 = Math.floor(Math.random() * cards.length);   
        var temp = cards[random1];
        cards[random1] = cards[random2];
        cards[random2] = temp;
    }
    for(let i = 0; i<gridSize; i++){
	  mgHTML += '<div class="mg-tile col-sm-3">';
		 mgHTML += '<div class="mg-tile-inner">';
			    mgHTML += '<div class="mg-front">'+cards[i]+'</div>';
			    mgHTML += '<div class="mg-back"></div>';
		 mgHTML += '</div>';
	  mgHTML += '</div>';
   }

    $('.mg-contents').hide();

    $('.btn').click(function(){
        $('.mg-contents').fadeIn(3000);   
    });

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
                $('.container').fadeOut(1000)//Fade out contents of entire container at once rather than separately.
                setTimeout(function(){
                    $('.winMessage').fadeIn(1000)//Fade in winning message
                        $('.winMessage').css({"display": "block"});
                }, 1000);    
            }
        }
        if(numClicks > gridSize * 2){
           //Game over if player clicks more than twice the gridsize number of clicks
            $('.container').fadeOut(1000)
            setTimeout(function(){
                    $('.loseMessage').fadeIn(1000)//Fade in winning message
                        $('.loseMessage').css({"display": "block", "font-size": "141px", "margin-top": "85px"});
                }, 1000);    
        }
    });
});