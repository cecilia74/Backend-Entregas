const { error } = require('console');
const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = ('desafio2.json')
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        const newProducts = { title, description, price, thumbnail, code, stock }

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Product not added. Please complete again")
            return undefined
        } else if (this.products.some((p) => p.code === code)) {
            console.log(`The code ${ newProducts.code} has already been used. Please select another code`)
            return undefined;
        } else {
            this.products.push({ id: this.products.length + 1, ...newProducts });
            let productString = JSON.stringify(this.products);
            fs.writeFileSync(this.path, productString)
        }

    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let found = this.products.find((prod) => prod.id === id);
        return found;
    }

    updateProduct(id, newtitle, newdescription, newprice, newthumbnail, newcode, newstock) {
        let data = fs.readFileSync(this.path, "UTF-8")
        let dataParse = JSON.parse(data)
        let productFound = dataParse.findIndex(product => product.id === id)

        const update = {
                    id,
                    title: newtitle,
                    description: newdescription,
                    price: newprice,
                    thumbnail: newthumbnail,
                    code: newcode,
                    stock: newstock,
                };
        dataParse[productFound] = update
        fs.writeFileSync(this.path, JSON.stringify(dataParse))
        console.log(dataParse)
        

    }



    deleteProduct(id) {
        let data = fs.readFileSync(this.path, "UTF-8")
        let dataParse = JSON.parse(data)
        let findId = dataParse.findIndex((prod) => prod.id === id);
        if (findId) {
            dataParse.splice(findId, 1);
            fs.writeFileSync(this.path, JSON.stringify(dataParse))
            return `${id} was deleted`
        } else {
            console.log("Id doesn't exist");
            return undefined;
        }

    }

}


const trial = new ProductManager();
trial.addProduct('b', 'cosa', 'OP', 'imgen', '452342', '4');
trial.addProduct('y', 'cosabuena', '333', 'imgen', '452342', '6');
trial.addProduct('r', 'cosamala', '333', 'imgen', '5234', '2');
trial.addProduct('u', 'cosamasomenosbuena', '653', 'imgen', '86663342', '62');
trial.addProduct('u', 'cosamasomenosmala', '63635', 'imgen', '11111', '3');

console.log(trial.getProducts());
console.log(trial.getProductById(2));
console.log(trial.deleteProduct(4));
console.log(trial.updateProduct(3, "producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));