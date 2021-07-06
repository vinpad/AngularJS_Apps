function store (){
    this.products = [];
}

store.prototype.addProducts = function(){
    this.products.push(new Product('APL','apple','this is apple','25'));
    this.products.push(new Product('BAN','banana','this is banana','5'));
    this.products.push(new Product('GUA','guava','this is guava','10'));
    this.products.push(new Product('KIW','kiwi','this is kiwi','30'));
    this.products.push(new Product('MAN','mango','this is mango','35'));
    this.products.push(new Product('ORG','guava','this is Orange','15'));
    this.products.push(new Product('STR','strawberry','this is strawberry','15'));
    this.products.push(new Product('WML','watermelon','this is watermelon','45'));
}