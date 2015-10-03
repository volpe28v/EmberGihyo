App = Ember.Application.create();

App.Router.map(function() {
  this.resource('posts', {path: '/'}, function() {
    this.route('show', {path: '/posts/:post_id'});
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function(){
    return [{
      id: 1,
      title: 'Ember.js 公式サイトの歩き方',
      body: 'Ember.js の公式サイト(http://emberjs.com/)では、まずトップページのサンプルを動かしてみるとよいでしょう。Ember.js でどんなことができるのかがざっくりわかります。'
    },{
      id: 2,
      title: 'Ember.jsのディスカッションフォーラム',
      body: 'Ember.js についての疑問・質問・新しい提案など、Ember.js に関することが常に議論されています。 http://discuss.emberjs.com/'
    }];
  }
});

App.PostsShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('posts').filter(function(post){
      return post.id === Number(params.post_id);
    })[0];
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }
});

App.PostsController = Ember.Controller.extend({
  pageTitle: 'Ember.js 関連の記事'
});

Ember.Handlebars.helper('truncate', function(value, options) {
  var length = options.hash.length;

  if (value.length > length) {
    return value.slice(0, length) + '...';
  } else {
    return value;
  }
});

App.TruncateTextComponent = Ember.Component.extend({
  text: null,
  length: 20,
  isExpanded: false,
  expandText: 'もっと見る',

  actions: {
    expand: function() {
      this.set('isExpanded', true);
    }
  }
});
