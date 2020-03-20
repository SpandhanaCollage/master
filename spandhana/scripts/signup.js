$('#form').on('submit', function(e){
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#set-password').val();
    var confirmPassword = $('#confirm-password').val();
    
    if(password == confirmPassword) {
        auth.createUserWithEmailAndPassword(email, password).then(function(cred){
            return database.collection('users').doc(cred.user.uid).set({
                userName: name
            });
        }).then(function(){
                window.alert('Sucssessfully Account Created');
                const form = document.getElementById('form');
                form.reset();
        });
    } else {
        window.alert("password and confirm password did not matched");
    }
});

auth.onAuthStateChanged(function(user){
   if(user) {
        console.log("user logged in");
   } else {
        console.log("user logged out");
        document.getElementById('form-container').innerHTML = "";
   }
});