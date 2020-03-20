auth.onAuthStateChanged(function(user){
    if(user){
       //user_exist
    } else {
       $('body').html("<h1 id='notice'>Please take an Account the Money you Donate was used to help Children</h1>");
    }
});