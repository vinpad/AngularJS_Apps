function Cart (){
    this.products=[];
    
    // load items from local storage when initializing
    this.loadProducts();
   
}

Cart.prototype.addProduct = function(prod){
    let bIsProdFound = false;
    this.products.forEach(function(product){
        if(product.id===prod.id)
        {
            product.quantity++;
            bIsProdFound = true;
            return;
        }
    });
    
    if(!bIsProdFound){
        prod.quantity++;
        this.products.push(prod);   
    }
}

Cart.prototype.removeProduct = function(prod){
    let bIsProdFound = false;
    let allProds = this.products;
    allProds.forEach(function(product,index){
        if(product.id===prod.id && product.quantity>0)
        {
            product.quantity--;
            if(product.quantity===0)
                allProds.splice(index,1);                       
            bIsProdFound = true;            
            return;
        }
    });
    
    if(!bIsProdFound){
        console.error(prod+' is not found in cart.');   
    }
}

Cart.prototype.getTotalCount = function(){
    let count = 0;
    this.products.forEach(function(product){
        count += product.quantity;
    });
    return count;
}

Cart.prototype.getTotalPrice = function(){
    let price = 0;
    this.products.forEach(function(product){
        price += (product.price * product.quantity);
    });
    return price;
}

Cart.prototype.saveItems = function(){
     if (localStorage != null && JSON != null) {
        localStorage["cart_products"] = JSON.stringify(this.products);
    }
}

Cart.prototype.loadProducts = function () {
    var products = localStorage != null ? localStorage['cart_products'] : null;
    if (products != null && JSON != null) {
        try {
            var items = JSON.parse(products);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.id!=null && item.name!=null && item.price!=null && item.description!=null && item.quantity!=null) {
                    item = new Product(item.id,item.name,item.description,item.price, item.quantity);
                    this.products.push(item);
                }
            }
        }
        catch (err) {
            // ignore errors while loading...
        }
    }
}