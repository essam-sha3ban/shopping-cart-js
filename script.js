let iconCart = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#cart-close");

iconCart.onclick = function () {
  cart.classList.add("active");
};
closeCart.onclick = function () {
  cart.classList.remove("active");
};

///////working cart

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //remove item from cart
  let removeCartIcon = document.getElementsByClassName("cart-remove");
  console.log(removeCartIcon);

  for (let i = 0; i < removeCartIcon.length; i++) {
    let button = removeCartIcon[i];
    button.addEventListener("click", removeCartItem);
  }
  
//quantity change
  let quantityInputs = document.getElementsByClassName("quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }


  //add  product to cart
  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClick);
  }

  //buy btn working
   document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyNow)

}


//remove item from cart
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}


//quantity changes
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}



//add product to cart
function addCartClick(event) {
  var button = event.target;
  var shopProduct = button.parentElement;
  var title = shopProduct.getElementsByClassName("product-name")[0].innerText;
  var price = shopProduct.getElementsByClassName("price")[0].innerText;
  var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}
function addProductToCart(title, price, productImg) {
  var cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  var cartItem = document.getElementsByClassName("cart-content")[0];
  var cartItemName = cartItem.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemName.length; i++) {
      if(cartItemName[i].innerText == title){
          alert(" this products add to cart")
          return
      }  
  }

  var cartBoxContent = `
         <img src=${productImg} class="cart-img">
            <div class="detail-box">
                <h2 class="cart-product-title"> ${title}</h2>
                <div class="cart-price">${price}</div>
                <input type="number" name=""  value="1" class="quantity" id="">
            </div>
            <i class='bx bxs-trash-alt cart-remove'></i>`;
cartBox.innerHTML = cartBoxContent
cartItem.append(cartBox)
cartBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
cartBox.getElementsByClassName("quantity")[0].addEventListener("change",quantityChanged);
}



//button  buy 
function buyNow(){
  alert("your order is placed")
  let contentCart = document.querySelector(".cart-content")
  while(contentCart.hasChildNodes()){
contentCart.removeChild(contentCart.firstChild)
  }
  updateTotal()
}


//update total
function updateTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$"), "");
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
    //   اجمالي السعر يحتوي علي ارقام عشريه كثيره
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
 
}
