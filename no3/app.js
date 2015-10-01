App = Ember.Application.create();

App.Router.map(function() {
  this.resource('posts', function() {
    this.route('show', {path: '/:post_id'});
  });
});

  
// データ
var posts = [{
  id: 1,
  title: 'はじめての Ember.js',
  body: 'これから Ember.js を始めようという方向けの記事です。'
}, {
  id: 2,
  title: '公式サイトの歩き方',
  body: 'http://emberjs.com/ の解説です。'
}, {
  id: 3,
  title: '2.0 のロードマップ',
  body: 'Ember.js 2.0 のロードマップはこちらで公開されています。https://github.com/emberjs/rfcs/pull/15'
}];

// Route 定義

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('http://emberjs.jsbin.com/goqene/2.json');
//    return posts;
  }
});

App.PostsShowRoute = Ember.Route.extend({
  model: function(params) {
    var id = Number(params.post_id);
    var posts = this.modelFor('posts');

    return posts.filter(function(post) {
      return post.id === id;
    })[0];
  }
});

App.LoadingRoute = Ember.Route.extend({
  activate: function(){
    console.log('読込中');
  }
});
