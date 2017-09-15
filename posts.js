var database = firebase.database().ref();
var posts = document.getElementById("posts");
var currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
var counter = 0;
var evenNum = [2,4,6,8,10,12,14,16,18.20,22,24];
var oddNum = [1,3,5,7,9,11,13,15,17,19,21,23,25,27];

database.child("posts").on("child_added", function (snapshot) {
    var obj = snapshot.val();
    obj.id = snapshot.key;
    render(obj);
})
database.child("comments").on("child_added", function (snapshot) {
    var obj = snapshot.val();
    renderComment(obj);
})





function render(dua) {
    var mainDiv = document.createElement("DIV");
    mainDiv.setAttribute("id", dua.id);
    mainDiv.setAttribute("class", "card dua");

    var div = document.createElement("DIV");
    div.setAttribute("class", "card-body");

    var span = document.createElement("SPAN");
    var senderTag = document.createElement("H4");
    senderTag.setAttribute("class", "card-title");
    var sender = document.createTextNode(dua.sender);
    senderTag.appendChild(sender);

    var duaTag = document.createElement("H6");
    duaTag.setAttribute("class", "card-text");
    var duaText = document.createTextNode(dua.dua);
    duaTag.appendChild(duaText);

    span.appendChild(senderTag);
    span.appendChild(duaTag);
    div.appendChild(span);

    var commentBox = document.createElement("INPUT");
    commentBox.setAttribute("class", "form-control");
    commentBox.setAttribute("id", "comment" + dua.id);
    

    var btn = document.createElement("BUTTON");
    btn.setAttribute("class", "btn btn-primary");
    var btnText = document.createTextNode("Comment");
    btn.onclick = function () {
        submitComment(dua.id);

    }
    

    div.appendChild(commentBox);
    /************************************** LIKE BUTTON WORK ******************************************/

    var like = document.createElement("BUTTON");
    like.setAttribute("class", "btn btn-primary");
    var likeText = document.createTextNode("Like");
    like.appendChild(likeText);
    like.onclick = function (){
        var likes = {
            likerName : currentUser.name,

        }


        counter++;
        
        database.child('likes').push(likes);
        if (counter => 1){
            like.setAttribute("class", "btn btn-secondary");
        }


        database.child("likes").on("child_added", function (snapshot) {
            var obj = snapshot.val();
            obj.id = snapshot.key;
            console.log(likes);
            renderLike(obj);
        })

        function renderLike(){
            var div1 = document.createElement("DIV");
            div.setAttribute("class", "card-body");
            var textNode = document.createTextNode(likes.likerName + " " + "Liked this post.");
            div1.appendChild(textNode);
            console.log(textNode);
            div.appendChild(div1);
            
        }

    }
    div.appendChild(like);


    

    /************************************LIKE BUTTON********************************************* */

    div.appendChild(btn);

    btn.appendChild(btnText);
    var commentsDiv = document.createElement("DIV");
    mainDiv.appendChild(commentsDiv);
    mainDiv.appendChild(div);
    posts.appendChild(mainDiv);
}



function submitComment(duaId) {
    var commentInput = document.getElementById("comment" + duaId);
    var commentObj = {
        sender: currentUser.name,
        comment: commentInput.value,
        duaId: duaId
    }
    database.child("comments").push(commentObj);
    commentInput.value = '';
}
function renderComment(comment) {
    var duaDiv = document.getElementById(comment.duaId);
    var commentsDiv = duaDiv.lastElementChild;

    var card = document.createElement("DIV");
    card.setAttribute("class", "card");

    var cardBody = document.createElement("DIV");
    cardBody.setAttribute("class", "card-body");

    var senderTag = document.createElement("H5");
    senderTag.setAttribute("class", "card-title");
    var sender = document.createTextNode(comment.sender);
    senderTag.appendChild(sender);

    var hrLine = document.createElement("HR");
    hrLine.appendChild(card);

    var commentTag = document.createElement("H6");
    commentTag.setAttribute("class", "card-text");
    var commentText = document.createTextNode(comment.comment);
    commentTag.appendChild(commentText);

    cardBody.appendChild(senderTag);
    cardBody.appendChild(commentTag);

    card.appendChild(cardBody);

    commentsDiv.appendChild(card);
}