if(!localStorage.getItem("username")){
    window.location = "login.html";
}

let ProductsInFav = localStorage.getItem("ProductsInFav");
const allProducts = document.querySelector(".productsf");

function drawFavProducts(productsList) {
    if (!allProducts) return;
    
    if (!productsList || productsList.length === 0) {
        allProducts.innerHTML = "<p style='color:#aaa; text-align:center; width:100%; font-size:18px; margin-top:5px;'>Your favorites list is empty!</p>";
        updateFavBadge([]);
        return;
    }
    let y = productsList.map((item) => {
         return `
        <div class="fav-item-row">
            <div class="fav-item-info">
                <img src="${item.imageUrl}" alt="${item.title}">
                <br>
                <div class="fav-item-details">
                    <h2>${item.title}</h2>
                     <span>${item.p}</span>
                </div>
                  <br>
                <i class="fas fa-heart btn3" style="color: red !important;" onClick="removeFromFavPage(${item.id})"></i>
            </div>
        </div>
        `;
    }).join("");

    allProducts.innerHTML = y;

    updateFavBadge(productsList); 
}

if (ProductsInFav) {
    drawFavProducts(JSON.parse(ProductsInFav));
} else {
    drawFavProducts([]);
}

function removeFromFavPage(id) {
    let currentFavs = localStorage.getItem("ProductsInFav") ? JSON.parse(localStorage.getItem("ProductsInFav")) : [];
    currentFavs = currentFavs.filter((item) => item.id !== id);
    localStorage.setItem("ProductsInFav", JSON.stringify(currentFavs));
    drawFavProducts(currentFavs);
}
function updateFavBadge(productsList) {

    let favBadge = document.querySelector(".fav_badge"); 
    
    if (favBadge) {
        if (productsList && productsList.length > 0) {
            favBadge.style.display = "block";
            favBadge.innerHTML = productsList.length;
        } else {
            favBadge.style.display = "none";
        }
    }
}
