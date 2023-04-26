
class ProductManager {
    constructor() {
        this.products = [];
    }
addProduct(title,description,price,thumbnail,code,stock){
let idMax = 0;
this.products.forEach((product) => {
if (product.id >idMax ){
    idMax = product.id
}
});
idMax++;

const newProducts = {id:idMax,title,description,price,thumbnail,code,stock}

for (let i = 0; i<this.products.length; i++) {
    if (this.products.find((coding)=>coding.code === code )) {
        console.log('The code', newProducts.code, 'has already been used. Please select another code')
        return undefined;
        
    }
    };

    // for (let j = 0; j< this.products<length;j++){
    //     if(newProducts[i][j] === "") {
        
    //     return console.log( `The element:${newProducts[i][j]} is empty.` )
    
    // } else {
    //     this.products.push(newProducts)}

    // Pregunta este código como lo podría utilizar para usarlo en lugar del código de abajo

if (title = "" || description === "" || price === "" || thumbnail === "" || code === "" || stock === "") {
    console.log("Product not added. Please complete again")
return undefined
} else {
this.products.push(newProducts);}

}

getProducts() {
// console.log(this.products);
return this.products
}

getProductById(id) {
let found = this.products.find((prod) => prod.id === id);
return found;
}
}

const trial = new ProductManager();
trial.addProduct('b','cosa','','imgen','452342','4');
trial.addProduct('y','cosabuena','333','imgen','452342','6');
trial.addProduct('y','cosamala','333','imgen','452342','6');
trial.addProduct('y','cosamasomenosbuena','653','imgen','86663342','6');

console.log(trial.getProducts());
console.log(trial.getProductById(1));
