let userInfo = document.querySelector("#user_info");
let userD = document.querySelector("#user");
let links = document.querySelector("#links");
let shoppingCartBtn = document.querySelector(".shopping_cart");
let favoriteListBtn = document.querySelector(".favorite_list");
let logOutBtn = document.querySelector("#logout");

if (localStorage.getItem("username")) {

    if(links) links.style.display = "none";
    if(userInfo) userInfo.style.display = "flex";
    if(userD) userD.innerHTML = localStorage.getItem("username");
    if(shoppingCartBtn) shoppingCartBtn.style.display = "block";
    if(favoriteListBtn) favoriteListBtn.style.display = "block";
    if(logOutBtn) logOutBtn.style.display = "block";
} else {
    if(links) links.style.display = "flex"; 
    if(userInfo) userInfo.style.display = "none";
    if(shoppingCartBtn) shoppingCartBtn.style.display = "none";
    if(favoriteListBtn) favoriteListBtn.style.display = "none";
    if(logOutBtn) logOutBtn.style.display = "none";
}

if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
        localStorage.clear();
        setTimeout(() => {
            window.location = "login.html";
        }, 1500);
    });
}

////////////////////////////////////////////////////////////////////////////////
let allProducts = document.querySelector(".products")
let products = [
    {
        id:1,
        title: "Royal Chrono",
        price:  10950,
        p: "Collection: Royal"
        ,
        imageUrl : "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=700"
    },
    {
        id:2,
        title: "Midnight Steel",
        price: 5950,
        p: "Collection: Elite"
        ,
        imageUrl : "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=700"
    },
    {
        id:3,
        title: "Classic Leather",
        price: 4950,
        p: "Collection: Classic"
        ,
        imageUrl : "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=700"
    },
    {
        id:4,
        title: "Luxury Gold",
        price: 12950,
        p: "Collection: Limited"
        ,
        imageUrl : "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=700"
    },
       {
        id:5,
        title: "Business Elite",
        price: 7350,
        p: "Collection: Elite"
        ,
        imageUrl : "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=700"
    },
    {
        id:6,
        title: "Diamond Edition",
        price: 14950,
        p: "Collection: Elite"
        ,
        imageUrl : "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=700"
    },
    {
        id:7,
        title: "Carbon Black",
        price: 9650 ,
        p: "Collection: Exceptional"
        ,
        imageUrl : "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700"
    },
    {
        id:8,
        title: "Silver Signature",
        price: 6850 ,
        p: "Collection: Royal"
        ,
        imageUrl : "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=700"
    },
       {
        id:9,
        title: "Prestige Auto",
        price: 13450 ,
        p: "Collection: Classic"
        ,
        imageUrl : "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700"
    },
    {
        id:10,
        title: "Executive Series",
        price: 10800 ,
        p: "Collection: Masterpiece"
        ,
        imageUrl : "https://i.pinimg.com/736x/32/e8/bb/32e8bba1a400cc5765877b39973977be.jpg"
    },
   
]

function drawItems (){

    let currentCart = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];
    let currentFav = localStorage.getItem("ProductsInFav") ? JSON.parse(localStorage.getItem("ProductsInFav")) : [];

    let y = products.map((item) => {

        let isProductInCart = currentCart.find((p) => p.id === item.id);
        

        let cartButton = isProductInCart 
            ? `<button class="btn2" style="background-color: #e74c3c !important;" onClick="removeFromCartMain(${item.id})">Remove from Cart</button>`
            : `<button class="btn2" onClick="addToCart(${item.id})">Add to Cart</button>`;


        let isProductInFav = currentFav.find((f) => f.id === item.id);

        return `
            <div class="pro">
                <img src="${item.imageUrl}">
                <h2>${item.title}</h2>
                 <span>${item.p}</span>
             <p>Price: ${item.price} EGP</p>
                ${cartButton}
                <br>

                <i class="fas fa-heart btn3" style="${isProductInFav ? 'color: red !important;' : ''}" onClick="addToFav(${item.id})"></i>
            </div>
        `
    }).join('')
    allProducts.innerHTML = y;
} 
drawItems ()

let searchInput = document.querySelector("#search");
let searchType = document.querySelector("#searchType");

if(searchInput){
    searchInput.addEventListener("keyup", function(){
        let value = this.value.toLowerCase();
        let selectedType = searchType ? searchType.value : "name"; 

        let filteredProducts = products.filter(item => {
            if (selectedType === "name") {

                return item.title.toLowerCase().includes(value);
            } else if (selectedType === "category") {
        
                return item.p.toLowerCase().includes(value);
            }
            return false;
        });

        drawSearchItems(filteredProducts);
    });
}

function drawSearchItems(items){
    let currentCart = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];
    let currentFav = localStorage.getItem("ProductsInFav") ? JSON.parse(localStorage.getItem("ProductsInFav")) : [];

    let y = items.map((item)=>{
        let isProductInCart = currentCart.find((p) => p.id === item.id);
        
        let cartButton = isProductInCart 
            ? `<button class="btn2" style="background-color: #e74c3c !important;" onClick="removeFromCartMain(${item.id})">Remove from Cart</button>`
            : `<button class="btn2" onClick="addToCart(${item.id})">Add to Cart</button>`;

        let isProductInFav = currentFav.find((f) => f.id === item.id);

        return `
            <div class="pro">
                <img src="${item.imageUrl}">
                <h2>${item.title}</h2>
                 <span>${item.p}</span>
                 <p>Price: ${item.price} EGP</p>
                ${cartButton}
                <i class="fas fa-heart btn3" style="${isProductInFav ? 'color: red !important;' : ''}" onClick="addToFav(${item.id})"></i>
            </div>
        `
    }).join('');

    allProducts.innerHTML = y;
}

// ////////////////////////////////////////////////////////////

const cartProductDiv = document.querySelector(".carts_products div");
const badge = document.querySelector(".badge");
const favProductDiv = document.querySelector(".fav_products div");
const favBadge = document.querySelector(".fav_badge");
const shoppingCartIcon = document.querySelector(".shopping_cart");
const cartsProducts = document.querySelector(".carts_products");
const favListIcon = document.querySelector(".favorite_list");
const favProductsMenu = document.querySelector(".fav_products");

let addedItem = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];
let favItems = localStorage.getItem("ProductsInFav") ? JSON.parse(localStorage.getItem("ProductsInFav")) : [];

function drawCartItems() {
    if (!cartProductDiv || !badge) return;
    cartProductDiv.innerHTML = "";
    
    if (addedItem.length > 0) {
        addedItem.forEach((item, index) => {

       cartProductDiv.innerHTML += `
  <div class="cart-item-row" style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); gap: 15px;"> 
    <div style="flex: 1; min-width: 0;">
      <p style="margin: 0; color: #fff; font-size: 14px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.title}</p> 
    </div>
    <div style="display: flex; align-items: center; gap: 8px; user-select: none;"> 
      <button onclick="changeQty(event, ${item.id}, -1)" class="qty-btn" style="background: #e74c3c; color: #fff; border: none; font-weight: bold; cursor: pointer; width: 24px; height: 24px; border-radius: 20%; display: flex; align-items: center; justify-content: center; font-size: 14px;">-</button> 
      <span style="color: #fff; font-size: 14px; font-weight: bold; min-width: 20px; text-align: center;">${item.quantity || 1}</span> 
      <button onclick="changeQty(event, ${item.id}, 1)" class="qty-btn" style="background: #c5a880; color: #000; border: none; font-weight: bold; cursor: pointer; width: 24px; height: 24px; border-radius: 20%; display: flex; align-items: center; justify-content: center; font-size: 14px;">+</button> 
    </div> 
  </div>
`;
        });
        badge.style.display = "block";
          badge.innerHTML = addedItem.reduce((sum, item) => sum + (item.quantity || 1), 0);
    } else {
        cartProductDiv.innerHTML = "<p style='color:#aaa; font-size:12px; margin: 10px 0;'>Carts is Empty</p>";
        badge.style.display = "none";
    }
}
function changeQty(e, id, change) {
    e.stopPropagation();
    let item = addedItem.find((p) => p.id === id);
    if (item) {
        if (!item.quantity) item.quantity = 1;
        item.quantity += change;
        if (item.quantity <= 0) {
            addedItem = addedItem.filter((p) => p.id !== id);
        }
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
        drawCartItems();
        drawItems();
    }
}
function drawFavItems() {
    if (!favProductDiv || !favBadge) return;
    favProductDiv.innerHTML = "";
    
    if (favItems.length > 0) {
        favItems.forEach((item, index) => {
            favProductDiv.innerHTML += `
                <div class="fav-item-row" style="display:flex; justify-content:space-between; align-items:center; margin: 8px 0; border-bottom: 1px solid #333; padding-bottom: 5px;">
                    <p style="margin:0; color:#fff; font-size:14px;">${item.title}</p>
                    <span class="remove-fav-btn" onclick="removeFromFav(event, ${index})" style="color:#ff4d4d; cursor:pointer; font-weight:bold; padding: 0 5px;">X</span>
                </div>`;
        });
        favBadge.style.display = "block";
        favBadge.innerHTML = favItems.length;
    } else {
        favProductDiv.innerHTML = "<p style='color:#aaa; font-size:12px; margin: 10px 0;'>Favorite is Empty</p>";
        favBadge.style.display = "none";
    }
}

drawCartItems();
drawFavItems();

// ***********************************
function addToCart(id) {
    if (localStorage.getItem("username")) {
        let choosenItem = products.find((item) => item.id === id);
        let isProductExist = addedItem.find((item) => item.id === choosenItem.id);

        if (!isProductExist) {
            let itemToAdd = { ...choosenItem, quantity: 1 };
            addedItem.push(itemToAdd);
            localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
            
            drawItems();
            drawCartItems();
        }
    } else {
        window.location = "login.html";
    }
}


function removeFromCartMain(id) {
    addedItem = addedItem.filter((item) => item.id !== id);
    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    drawItems(); 
    drawCartItems();
}

function addToFav(id) {
    if (localStorage.getItem("username")) {
        let choosenItem = products.find((item) => item.id === id);
        let currentFav = localStorage.getItem("ProductsInFav") ? JSON.parse(localStorage.getItem("ProductsInFav")) : [];
        let itemIndex = currentFav.findIndex((item) => item.id === choosenItem.id);

        if (itemIndex === -1) {
            currentFav.push(choosenItem);
        } else {
            currentFav.splice(itemIndex, 1);
        }
        localStorage.setItem("ProductsInFav", JSON.stringify(currentFav));
        if (typeof favItems !== 'undefined') favItems = currentFav; 
        
        drawFavItems();
        drawItems();
    } else {
        window.location = "login.html";
    }
}

function removeFromCart(e, index) {
    e.stopPropagation();
    addedItem.splice(index, 1);
    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    drawCartItems();
}

function removeFromFav(e, index) {
    e.stopPropagation();
    favItems.splice(index, 1);
    localStorage.setItem("ProductsInFav", JSON.stringify(favItems));
    drawFavItems();
    drawItems();
}

if (shoppingCartIcon && cartsProducts && favProductsMenu) {
    shoppingCartIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        if (cartsProducts.style.display === "block") {
            cartsProducts.style.display = "none";
        } else {
            cartsProducts.style.display = "block";
            favProductsMenu.style.display = "none"; 
        }
    });
}

if (favListIcon && favProductsMenu && cartsProducts) {
    favListIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        if (favProductsMenu.style.display === "block") {
            favProductsMenu.style.display = "none";
        } else {
            favProductsMenu.style.display = "block";
            cartsProducts.style.display = "none"; 
        }
    });
}

document.addEventListener("click", function() {
    if (cartsProducts) cartsProducts.style.display = "none";
    if (favProductsMenu) favProductsMenu.style.display = "none";
});