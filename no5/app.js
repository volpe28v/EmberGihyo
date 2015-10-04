App = Ember.Application.create();

App.Router.map(function() {
  this.resource('products', {path: '/'}, function() {
    this.route('show', {path: '/products/:id'});
  });

  this.resource('cart');
});

App.ProductsRoute = Ember.Route.extend({
  model: function(){
    return App.Product.all();
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
      this.controllerFor('cart').save();
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
  }.property('@each.price'), // length でも動くと思う

  save: function(){
    var ids = JSON.stringify(this.mapBy('id'));
    localStorage.setItem('cart-product-ids', ids);
  },

  restore: function(){
    var idsString = localStorage.getItem('cart-product-ids');
    var ids;
    if (idsString) {
      ids = JSON.parse(idsString);
    } else {
      ids = [];
    }
    var products = ids.map(function(id) {
      return App.Product.find(id);
    });
    products = products.compact();
    this.set('model', products);
  }
});


App.Product = Ember.Object.extend({
  id: null,
  name: null,
  price: 0,
  url: null
});

App.Product.reopenClass({
  data: [],

  all: function(){
    return App.Product.data;
  },

  find: function(id){
    return this.all().findBy('id', Number(id));
  }
});

App.Product.data.pushObjects([
  App.Product.create({
    id: 1,
    name: 'ステッカー',
    price: 6.0,
    url: 'http://devswag.com/products/ember-sticker'
  }),
  App.Product.create({
    id: 2,
    name: 'Tシャツ',
    price: 22.0,
    url: 'http://devswag.com/products/ember-js-tshirt'
  }),
  App.Product.create({
    id: 3,
    name: 'ぬいぐるみ',
    price: 10.0,
    url: 'http://devswag.com/products/ember-mascot-tomster'
  })
]);

App.initializer({
  name: 'restore-cart',

  initialize: function(container, app){
    container.lookup('controller:cart').restore();
  }
});

