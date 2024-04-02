const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([products,metaProducts]) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.deleteProduct = (req ,res,next) => {
  const id = req.params.id;
  Product.deleteProduct(id).then(() => {
    res.redirect('/');
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.getProduct = (req,res,next) => {
  const id = req.params.productId;
  Product.getProductById(id).then(([product]) => {
    res.render('shop/product-detail', {
      product : product[0],
      pageTitle : product.pageTitle,
      path : '/product'
    })
  } ) 
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([products,metaProducts]) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const id = req.body.prodId;
  Product.getProductById(id , product => {
    Cart.addProduct(id , product.price);
  })
  res.redirect('/');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
