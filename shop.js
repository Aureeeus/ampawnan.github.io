
let shopCartBut = document.querySelector("#cartBut");
let closeCartBut = document.querySelector("#closeCart");
let body = document.querySelector("body");
var removeButtons = document.getElementsByClassName("removeButton")
var itemQuat = document.getElementsByClassName("itemQuat");
var addBut = document.getElementsByClassName("addBut");
let buyBut = document.getElementById("buyButton");
let audio = document.getElementById("catmeow");

for(var i = 0; i < addBut.length; i++){
    var button = addBut[i];
    button.addEventListener('click', (event) => {
        var buttonClicked = event.target;
        var product = buttonClicked.parentElement.parentElement;
        var productName = product.querySelector(".prodName h3").innerText;
        var productPrice = parseFloat((product.querySelector(".price h3").innerText).replace('P',0));
        var productImage = product.querySelector(".imgCont img").src;
        addToCart(productName, productPrice, productImage);
        audio.currentTime = 0;
        audio.play();
        updateBut();
        updateQuat();
        updatePrice();
    })

}

buyBut.addEventListener('click', () => {
    var nameRep = document.getElementsByClassName('itemz');
    var namez = [];
    var pricez = [];
    var quat = [];

    for(var i = 0; i<nameRep.length; i++){
        namez.push(nameRep[i].querySelector('.itemTitle').innerText);
        pricez.push(nameRep[i].querySelector('.itemPrice').innerText);
        quat.push(nameRep[i].querySelector('.itemQuat').value);
        sessionStorage.setItem('itname' + i, JSON.stringify(namez[i]));
        sessionStorage.setItem('itprice' + i, JSON.stringify(pricez[i]));
        sessionStorage.setItem('itquat' + i, JSON.stringify(quat[i]));
        console.log(namez[i]);
    }

    window.open('receipt.html', '_blank');
    sessionStorage.clear();
})



shopCartBut.addEventListener('click', () => {
    console.log("clickkk");
    body.classList.toggle('showcart');
})

closeCartBut.addEventListener('click', () => {
    console.log("clickkk");
    body.classList.toggle('showcart');
})


function updateBut(){
    for(var i = 0; i < removeButtons.length; i++){
        var button = removeButtons[i];
        button.addEventListener('click', (event) => {
            var buttonClicked = event.target;
            buttonClicked.parentElement.remove();
            updatePrice();
        })
    }
}

function updateQuat(){
    for(var i = 0; i < itemQuat.length; i++){
        var itemInput = itemQuat[i];
        itemInput.addEventListener('change', (event) => {
            updatePrice();
        })
    }
}

function addToCart(title, price, image){
    var newItem = document.createElement('div');
    newItem.classList.add("itemz");
    console.log(title, price, image);
    var toUpdate = document.getElementById('cartItems');
    var prodDiv = `<img class = "itemImg" src = "${image}">
                    <div class = "infoo">
                    <h3 class = "itemTitle">${title}</h3>
                    <h3 class = "itemPrice">P${price}.00</h3>
                    </div>
                    <input type = "number" class = "itemQuat" value = "1" min = "1">
                    <button class = "removeButton">REMOVE</button>`
    newItem.innerHTML = prodDiv;
    cartItems.append(newItem);
    cartItems.getElementsByClassName("removeButton")[0].addEventListener('click', (event) => {
        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        updatePrice();
    })

}


function updatePrice(){
    var cartElements = document.getElementsByClassName("itemz");
    var totPrice = 0;
    for(var i = 0; i < cartElements.length; i++){
        var cartElement = cartElements[i];
        var elementPrice = cartElement.getElementsByClassName("itemPrice")[0];
        var elementQuat = cartElement.getElementsByClassName("itemQuat")[0];
        var price = parseFloat(elementPrice.innerText.replace('P', ''));
        var quantity = elementQuat.value;
        totPrice = totPrice + (price * quantity);
        console.log(totPrice);
    }
    document.getElementById("totPrice").innerText = "P" + totPrice +".00";



}