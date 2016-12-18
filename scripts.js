//I still need to add in win screen, and different grid sizes based on the buttons clicked. Penalty clicks? Countdown timer?

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
    $('.mg-tile-inner').click(function(){
	   //Track number of clicks and display in the DOM. Each time you click, it logs two clicks because we are really rotating two images back to back. 
        var numClicks = (clicks++) - 1; //Subtract 1 to account for the double click counts because you are rotating TWO images back to back.

        $('.numClicks').text("Number of Clicks: " + numClicks);


        // If you made "this" into .mg-tile-inner, you would flip all   tiles at once
	   $(this).toggleClass('flip');

	   var cardsUp = $('.flip');
       var matched = 0;
       var flip = 0;
	
	   if(cardsUp.length == 2){
		  // Check to see if images are the same. We only want the flipped elements.
		  var cardsUpImages = cardsUp.find('.mg-front img');
		  // Index of [0] b/c this code only runs if there are 2 cards face up
		  if(cardsUpImages[0].src == cardsUpImages[1].src){
			 // This is a match!
			 cardsUp.addClass('matched');
                matched++;

			 cardsUp.removeClass('flip');
                setTimeout(function(){
                    cardsUp.fadeOut(1300);
                }, 2000);
            }else{
		     // The user has flipped 2 cards. They do not match. Flip them back over. Wait 2 seconds before you remove class. Otherwise, you can't even see them flip back over.
		      setTimeout(function(){
			    cardsUp.removeClass('flip');
		      }, 2000);
	       }
        }
    });
});