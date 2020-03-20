/*************SUBPAGE SCROLLING**********************/
 var page_url = window.location.href;
 var page_id = page_url.substring(page_url.lastIndexOf('#') + 1);
 if(page_id == "blog") {
  var windowHeight = window.innerWidth;
   if(windowHeight <= 750){
      $("html,body").animate({
          scrollTop: $("#scroll-" + page_id).offset().top
      });
   }else {
      $("html,body").animate({
          scrollTop: $("#scroll-" + page_id).offset().top - 60
      });
   }
 }
/**************USER AUTHENTICATION STATUS*****************/
const $loginBtn = $('#login-btn');
const $logoutBtn = $('#logout-btn');
const $loginContainer = $('#login-container');
const $wish = $('#wish');
const $form = $('.form');
const $userEmail = $('#user-email');
const $notific = $('#notifications');
const $suggetionBox = $('.suggetion-box');

function showAdmin() {
    $('#admin-link').css({'display':'block'});
}

auth.onAuthStateChanged(function(user){
  if(user) {
     $loginBtn.css({'display':'none'});
     $logoutBtn.css({'display':'block'});
     $lockArticles.hide();
     unLockArticles(0,6);
     $unlockArticles.show();
     $articlesBtn.show();
     $articlesBtn.on('click', function(){
      unLockArticles(0, unLockData.articles.length);
      $(this).hide()
     });
     $wish.css({'display':'block'});
     database.collection('users').doc(user.uid).get().then(function(userDoc){
        const html = `Thank You...<br> <b>${userDoc.data().userName}</b> for Purchase Account.<br/>The Money You Pay for This Account is used to Donating Children`;
        $wish.html(html);
     });
     $form.css({'display':'none'});
     $loginContainer.css({'display':'flex','align-items':'center','justify-content':'center'});
     $userEmail.html("Logged in as " + user.email);
     $userEmail.css({'color':'#ffffff','background-color':'transparent','text-align':'left'});
     $notific.css({'display':'block'});
     $suggetionBox.css({'display':'block'});
     switch(user.uid) {
        case 'XIEu13EsR6MzkZykcbFf7kLMmp92':
             showAdmin();
             break;
     }


  } else {
    $loginBtn.css({'display':'block'});
    $logoutBtn.css({'display':'none'});
    $unlockArticles.hide();
    loadLockArticles(0,6);
    $lockArticles.show();
    $articlesBtn.show();
    $articlesBtn.on('click', function(){
      loadLockArticles(0, lockData.articles.length);
      $(this).hide();
     });
     $wish.css({'display':'none'});
     $form.css({'display':'block'});
     $loginContainer.css({'display':'block'});
     $userEmail.html("");
     $notific.css({'display':'none'});
     $userEmail.html("Take an Account to Break the Lock");
     $userEmail.css({'color':'red','background-color':'#ffffff','text-align':'center'});
     $suggetionBox.css({'display':'none'});
     $('#admin-link').css({'display':'none'});

  }
});

const $lockArticles = $('.lock-articles');
const $unlockArticles = $('.unlock-articles');
  var lockData;
  function loadLockArticles(start, end) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'scripts/articles.json', true);
    xhr.send(null);
    xhr.onload = function() {
      if(xhr.status === 200) {
           lockData = JSON.parse(xhr.responseText);
           let articleHtml = "";
           for(var i = start; i < end; i++) {
              articleHtml += "<article>";
              articleHtml += "<img src='" + lockData.articles[i].image + "' alt='" + lockData.articles[i].alt +"'>";
              articleHtml += "<div class='article-content'>";
              articleHtml += "<h2>" + lockData.articles[i].title + "</h2>";
              articleHtml += "<span class='lock-btn'>";
              articleHtml += "<i class='material-icons'>lock</i>Read</span>";
              articleHtml += "</div>"
              articleHtml += "</article>";
           }
           $lockArticles.html(articleHtml);
      }
    }
  }

  var unLockData;
  function unLockArticles(start, end) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'scripts/articles.json', true);
    xhr.send(null);
    xhr.onload = function() {
      if(xhr.status === 200) {
           unLockData = JSON.parse(xhr.responseText);
           let articleHtml = "";
           for(var i = start; i < end; i++) {
              articleHtml += "<article id='post" + i + "'>";
              articleHtml += "<img src='" + unLockData.articles[i].image + "' alt='" + unLockData.articles[i].alt +"'>";
              articleHtml += "<div class='article-content'>";
              articleHtml += "<h2>" + unLockData.articles[i].title + "</h2>";
              articleHtml += "<a href='" + unLockData.articles[i].page + "' class='read-btn'>";
              articleHtml += "<i class='material-icons'>arrow_forward</i>Read</a>";
              articleHtml += "</div>"
              articleHtml += "</article>";
           }
           $unlockArticles.html(articleHtml);
      }
    }
  }
/***********************SLIDER***********************/
$('.slider').each(function() {              
  var $this   = $(this);                    
  var $group  = $this.find('.slide-group'); 
  var $slides = $this.find('.slide');       
  var buttonArray  = [];                    
  var currentIndex = 0;                     
  var timeout;

  function move(newIndex) {          
    var animateLeft, slideLeft;      

    advance();                       

    if ($group.is(':animated') || currentIndex === newIndex) {  
      return;
    }

    buttonArray[currentIndex].removeClass('active'); 
    buttonArray[newIndex].addClass('active');        

    if (newIndex > currentIndex) {
      slideLeft = '100%';            
      animateLeft = '-100%';         
    } else {                         
      slideLeft = '-100%';           
      animateLeft = '100%';          
    }
    
    $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );

    $group.animate( {left: animateLeft}, function() {    
      $slides.eq(currentIndex).css( {display: 'none'} );       
      $slides.eq(newIndex).css( {left: 0} ); 
      $group.css( {left: 0} );               
      currentIndex = newIndex;
    });
  }

  function advance() {
    clearTimeout(timeout);                 
    timeout = setTimeout(function() {      
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);            
      } else {                             
        move(0);
      }
    }, 2500);
  }

  $.each($slides, function(index) {
    
    var $button = $('<button type="button" class="slide-btn">&bull;</button>');
    if (index === currentIndex) {    
      $button.addClass('active');    
    }
    $button.on('click', function() { 
      move(index);                   
    }).appendTo('.slide-buttons');   
    buttonArray.push($button);       
  });
  advance();                          
});
/********************ARTICLES BUTTON**********************/

const $articlesBtn = $('#articles-btn');

/********************LOGIN FORM***************************/
$('#login-form').on('submit', function(e) {
  e.preventDefault();
  const email = $(this).find('#login-email').val();
  const password = $(this).find('#login-password').val();
  auth.signInWithEmailAndPassword(email, password).then(function(){
    document.getElementById('login-form').reset();
  }).catch(function(err){
    window.alert(err.message);
  });
});
/********************USER SIGNOUT**********************/
$logoutBtn.on('click', function(e) {
    e.preventDefault();
    auth.signOut();
});
/**************NAV LINK SCROLLING*****************/
    $('.nav-link').on('click', function(e){
       e.preventDefault();
       var href = $(this).attr('href');
       var headerHeightNav = $('header').outerHeight(true);
       var windowHeight = window.innerWidth;
       if(windowHeight <= 750) {
         $('html, body').animate({
          scrollTop: $(href).offset().top - headerHeightNav + 60
         }, 1000);
       } else {
        $('html, body').animate({
          scrollTop: $(href).offset().top - headerHeightNav
        }, 1000);
       }
    });