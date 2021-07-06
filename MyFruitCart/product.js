function Product(id, name, description, price, quantity){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity | 0;
}



Product.prototype.getTotalPriceProduct = function(){
    return this.price * this.quantity;
}