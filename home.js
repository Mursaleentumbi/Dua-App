var user = JSON.parse(localStorage.getItem('loggedInUser'));
var sender = document.getElementById('sender');
var comment = document.getElementById('commentBox');
var welcomeTag = document.getElementById('welcome');
var database = firebase.database().ref();

welcomeTag.innerHTML = "Welcome " + user.name;


function submit(){
    var post = {
        sender: sender.value,
        dua: comment.value
    }
    sender.value = '';
    comment.value = '';

    database.child('posts').push(post);
}