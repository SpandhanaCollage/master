$('#suggetion-form').on('submit', function(){
    var userName = $('#name').val();
    var userSuggetion = $('#suggetion-box').val();
    var info = {
        name: userName,
        suggetion: userSuggetion
    }
    database.collection('suggetion').add(info).then(function(){
        window.alert("susessfully sended");
        document.getElementById('suggetion-form').reset();
    });
});
