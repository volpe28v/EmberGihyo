App = Ember.Application.create();

App.Router.map(function() {
  this.resource('products', {path: '/'}, function() {
    this.route('show', {path: '/products/:id'});
  });

  this.resource('cart');
});

App.ProductsRoute = Ember.Route.extend({
  model: function(){
    return [{
      id: 1,
      name: 'ステッカー',
      price: 6.0,
      url: 'http://devswag.com/products/ember-sticker'
    },{
      id: 2,
      name: 'Tシャツ',
      price: 22.0,
      url: 'http://devswag.com/products/ember-js-tshirt'
    },{
      id: 3,
      name: 'ぬいぐるみ',
      price: 10.0,
      url: 'http://devswag.com/products/ember-mascot-tomster'
    }
  ];
  }
/*
  // こっちに定義しても動く
  actions: {
    addCart: function(product){
      this.controllerFor('cart').pushObject(product);
      this.transitionTo('cart');
    }
  }
  */
});

App.ProductsShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('products').filter(function(product){
      return product.id === Number(params.id);
    })[0];
  },
  actions: {
    addCart: function(product){
      this.controllerFor('cart').pushObject(product);
      this.transitionTo('cart');
      console.log("ProductsShowRoute");
    }
  }

});

App.CartController = Ember.ArrayController.extend({
  uniqProductCount: function(){
    return this.mapBy('id').uniq().get('length');
  }.property('length'),

  totalPrice: function(){
    return this.mapBy('price').reduce(function(total, price) {
      return total + price;
    }, 0);
  }.property('@each.price') // length でも動くと思う
});
