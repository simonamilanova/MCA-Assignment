
// let baseUrl = "https://raw.githubusercontent.com/simonamilanova/MCA-Assignment/main/data.json";
// fetch(baseUrl)
//     .then(response => response.json())
//     .then(data => console.log(data));


    let domesticProducts = document.getElementById("domesticProducts");
    let importedProducts = document.getElementById("importedProducts");
    let baseUrl = "https://raw.githubusercontent.com/simonamilanova/MCA-Assignment/main/data.json";
    let domesticCost = document.getElementById("domesticCost");
    let importedCost = document.getElementById("importedCost");
    let domesticCount = document.getElementById("domesticCount");
    let importedCount = document.getElementById("importedCount");

    
function getDomesticProducts(){
    fetch(baseUrl)
    .then(function (response){
        return response.json();
    }).then(function (data) {
        getDomesticProductsBase(data);
        getImportedProductsBase(data);
    })
}

//getDomesticProducts();

function getDomesticProductsBase(products){
    let sumOfDomesticCost = 0;
    let countDomesticProducts = 0;
    for (let i = 0; i < products.length; i++) {
        if(products[i].domestic === true){
            products.sort((a, b) => a.name.localeCompare(b.name));
            countDomesticProducts++;
            domesticProducts.innerHTML += 
            `
            <span>. . . ${products[i].name}</span> <br>
            <span>&nbsp&nbsp&nbsp&nbsp&nbsp Price: $${products[i].price}</span> <br>
            <span>&nbsp&nbsp&nbsp&nbsp&nbsp ${products[i].description.length > 10 ? products[i].description.substring(0, 10) : products[i].description}</span> . . . <br>
            <span>&nbsp&nbsp&nbsp&nbsp&nbsp Weight: ${products[i].weight === undefined ? "N/A" :  products[i].weight+"g"} </span> <br>
            `;
            

            console.log(products[i].name);
            sumOfDomesticCost += products[i].price;
        }
        
        

    }

    domesticCost.innerText = `$${sumOfDomesticCost},0`;
    domesticCount.innerText = `${countDomesticProducts}`;
}

function getImportedProductsBase(products){
    let sumOfImportedCost = 0;
    let countImportedProducts = 0;
    for (let i = 0; i < products.length; i++) {
        if(products[i].domestic === false){
            countImportedProducts++;
            importedProducts.innerHTML += 
            `
            <span>. . . ${products[i].name}</span> <br>
            <span>&nbsp&nbsp&nbsp&nbsp&nbsp Price: $${products[i].price}.0</span> <br>
            <span>&nbsp&nbsp&nbsp&nbsp&nbsp ${products[i].description.length > 10 ? products[i].description.substring(0, 10) : products[i].description}</span> . . . <br>
            <span>&nbsp&nbsp&nbsp&nbsp&nbsp Weight: ${products[i].weight === undefined ? "N/A" :  products[i].weight+"g"} </span> <br>
            `;
            

            console.log(products[i].name);

            sumOfImportedCost += products[i].price;
        }
    }

    importedCost.innerText = `$${sumOfImportedCost},0`;
    importedCount.innerText = `${countImportedProducts}`;
}

getDomesticProducts();


