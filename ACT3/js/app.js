

$(function(){
  //Cached selectors
  var jokeButton = $('#joke-button');
  var jokeResetButton = $('#joke-reset-button');
  var jokesList = $('#jokes-list');
  var reaction = $('#reaction');
  var jokeLoader = $('#joke-loader');

  var jCount =0;
  var yCount = 0;
  var nCount = 0;

  jokeLoader.hide();
  jokeResetButton.hide();

  //Events
  jokeButton.on('click',async function(e){
    //Do the magic here
   
     $('.image').remove();
       generateJoke();
      
      
    
  });



  
  jokeResetButton.on('click',async function(){
   await $('.content').remove();
    await $('.image').remove();
    await $('h4').remove();
    await $('p').remove();
    jCount = 0;
    yCount = 0;
    nCount = 0;
    $('#joke-button').prop('disabled', false);
    jokeResetButton.hide();
  });

    function generateJoke(){
      var joke;
      var ansimage;
      var answer;
      JOKE_SERVICE.get()
                  
                  .then(function(res){

                     joke = res;
                    
                
              })
     JOKE_SERVICE.answer() 
              .then(async function(res){
                await(res);
                 ansimage = res.image;
                 answer = res.answer;
                
                var li=
                    
                `
                <div class="content">
                <li >
                  <div>
                    <h2> ${joke}  </h2>
                    <img class="jokeimage" src="${ansimage}" alt="">
                   </div> 
                </li>
                </div>
                `
                jokesList.append(li);
              })
                .then(function(){
                  jCount++;
                  if(answer === "yes"){
                    yCount++;
  
                  }else
                  if(answer === "no"){
                    nCount++;
                  }
              
                

                  if(jCount===5){
                    $('#joke-button').prop('disabled', true);
                    jokeResetButton.show();
                    generateAnswer();
                      if(yCount >= 3){
                        $('.lastmes').append("CONGRATULATION YOU ARE SO LUCKY");
                      }else
                      if(nCount >=3){
                        $('.lastmes').append("SORRY YOU ARE NOT LUCKY");
                      }
                  }else{
                 
                   
                  }


              })
    }

    function generateAnswer(){
            JOKE_SERVICE.answer()
            .then(function(res){
              var ansimage = res.image;
              
              if(yCount >= 3){
                var li=
                `
                <div>
                <img class="image" src="${ansimage}" alt="">
                <p class="lastmes"> 

                  CONGRATULATIONS YOU ARE SO LUCKY !!!
                </p>
                </div>
                `;
              }else
              if(nCount >=3){
                var li=
                `
                <div>
                <img class="image" src="${ansimage}" alt="">
                <p class="lastmes"> 

                  SORRY TRY YOUR LUCK NEXT TIME !!!
                
                </p>
                </div>
                `;


              }
               
              reaction.append(li);
             

            })
    }
})