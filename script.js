let receiptApp = {
    domesticProducts: document.getElementById("domesticProducts"),
    importedProducts: document.getElementById("importedProducts"),
    baseUrl: "https://raw.githubusercontent.com/simonamilanova/MCA-Assignment/main/data.json",
    domesticCost: document.getElementById("domesticCost"),
    importedCost: document.getElementById("importedCost"),
    domesticCount: document.getElementById("domesticCount"),
    importedCount: document.getElementById("importedCount"),

    init: function(){
        receiptApp.getProducts();
    },

    getProducts: function(){
        fetch(this.baseUrl)
            .then(function (response){
                return response.json();
            }).then(function (data) {
                receiptApp.getDomesticProductsBase(data);
                receiptApp.getImportedProductsBase(data);
            }) .catch(function (error) {
                console.error("Something went wrong");
            });
    },

    getDomesticProductsBase: function(products){
        let sumOfDomesticCost = 0;
        let countDomesticProducts = 0;

        for (let i = 0; i < products.length; i++) {
        if(products[i].domestic === true){
            products.sort((a, b) => a.name.localeCompare(b.name));
            countDomesticProducts++;
            this.domesticProducts.innerHTML += 
            `
            <span>. . . ${products[i].name}</span> <br>
            <span>&nbsp&nbsp&nbsp&nbsp&nbsp Price: $${products[i].price}</span> <br>
            <span>&nbsp&nbsp&nbsp&nbsp&nbsp ${products[i].description.length > 10 ? products[i].description.substring(0, 10) : products[i].description}</span> . . . <br>
            <span>&nbsp&nbsp&nbsp&nbsp&nbsp Weight: ${products[i].weight === undefined ? "N/A" :  products[i].weight+"g"} </span> <br>
            `;

            sumOfDomesticCost += products[i].price;
        } 

        }

        this.domesticCost.innerText = `$${sumOfDomesticCost},0`;
        this.domesticCount.innerText = `${countDomesticProducts}`; 

    },

    getImportedProductsBase: function(products){
        let sumOfImportedCost = 0;
        let countImportedProducts = 0;
        for (let i = 0; i < products.length; i++) {
            if(products[i].domestic === false){
                countImportedProducts++;
                this.importedProducts.innerHTML += 
                `
                <span>. . . ${products[i].name}</span> <br>
                <span>&nbsp&nbsp&nbsp&nbsp&nbsp Price: $${products[i].price}.0</span> <br>
                <span>&nbsp&nbsp&nbsp&nbsp&nbsp ${products[i].description.length > 10 ? products[i].description.substring(0, 10) : products[i].description}</span> . . . <br>
                <span>&nbsp&nbsp&nbsp&nbsp&nbsp Weight: ${products[i].weight === undefined ? "N/A" :  products[i].weight+"g"} </span> <br>
                `;

                sumOfImportedCost += products[i].price;
            }
        }
    
        this.importedCost.innerText = `$${sumOfImportedCost},0`;
        this.importedCount.innerText = `${countImportedProducts}`;
    }
}

receiptApp.init();