/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

const container = document.getElementById('comments');

// get user's token
t.get('member', 'private', 'token')
.then(function(token) {
  
  // load comments
  t.card('id').then(function(card) {
    // https://developers.trello.com/advanced-reference/card#get-1-cards-card-id-or-shortlink-actions
    $.get('/comments?', { token, cardId: card.id }, function(res){
      console.log('comments => ', res.comments);
      res.comments.forEach(function(comment) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(comment.data.text));
        li.addEventListener('click', function(){
          // open comment outliner (editor) in new tab
          window.open(`/edit/${card.id}/${comment.id}/${token}/${comment.date}`);
          t.closePopup();
        });
        container.appendChild(li);
      });
      t.render(function(){
        t.sizeTo('#comments'); // resize popup based on content
      });
    });
  })
  .catch(function(err){
    console.error('Error loading card comments:', err);
  });
});
