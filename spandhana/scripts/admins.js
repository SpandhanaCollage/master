const containner = document.getElementById('suggetions-box');
function setupSugg(data) {
    if (data.length){
        let html = '';
        data.forEach(function(doc){
        const data = doc.data();
        const div = `
          <div class='box'>
            <h2>${data.name}</h2>
            <p>${data.suggetion}</p>
          </div>
        `;
        html += div
    })
        containner.innerHTML = html;
    } else {
        containner.innerHTML = "<h5 class='center'>Login to View Data</h5>";
    }
}

auth.onAuthStateChanged(function(user){
    if(user){
        switch(user.uid) {
            case 'XIEu13EsR6MzkZykcbFf7kLMmp92':
                database.collection('suggetion').get().then(function(snapshot){
                    setupSugg(snapshot.docs);
                });
            break;
        }
    } 
});





































/*$('#logout-btn').on('click', function(){
    auth.signOut();
});

const $admins = $('#admins');
const $logoutBtn = $('#logout-btn');
auth.onAuthStateChanged(function(user){
    if(user){
        $admins.css({'display':'none'});
        $logoutBtn.css({'display':'block'});
        console.log("user signed in");
        database.collection('suggetion').get().then(function(snapshot){
            setupSugg(snapshot.docs);
        });
    } else {
        $admins.css({'display':'block'});
        $logoutBtn.css({'display':'none'});
        console.log("user signed out");
        setupSugg([]);
    }
});

function setupSugg(data) {
    if (data.length){
        let html = '';
        data.forEach(function(doc){
        const data = doc.data();
        const div = `
          <div class='box'>
            <h2>${data.name}</h2>
            <p>${data.suggetion}</p>
          </div>
        `;
        html += div
    })
        containner.innerHTML = html;
    } else {
        containner.innerHTML = "<h5 class='center'>Login to View Data</h5>";
    }
}
*/
