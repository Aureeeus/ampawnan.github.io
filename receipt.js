let namez = [];
let pricez = [];
let quat = [];
let mult = [];
var totPrice = 0;
let payment = document.querySelector('#payment');

for(var i = 0; i<sessionStorage.length; i++){
    let itname = (sessionStorage.getItem('itname' + i))
    let itprice = sessionStorage.getItem('itprice' + i);
    let itquat = sessionStorage.getItem('itquat' + i);
    if(itname && itprice && itquat) {
        namez.push(itname.replace('"','').replace('"',''));
        pricez.push(itprice.replace('"','').replace('"',''));
        quat.push(itquat.replace('"','').replace('"',''));
    }
    console.log(itname, itprice, itquat);
}

let itemsContainer = document.getElementById('receipt');

for(var i = 0; i<namez.length; i++){
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('items');

    let itemName = document.createElement('p');
    itemName.innerText = namez[i] + '   x  ' + quat[i];
    itemName.classList.add('nameItem')

    mult[i] = parseFloat(pricez[i].replace('P',''))*parseInt(quat[i]);

    console.log(pricez[i], quat[i]);
    let itemPrice = document.createElement('p');
    itemPrice.innerText = `${'P' + mult[i] + '.00'}`;
    itemPrice.classList.add('priceItem')

    itemDiv.appendChild(itemName);
    itemDiv.appendChild(itemPrice);
    itemsContainer.appendChild(itemDiv);

    totPrice = totPrice + mult[i];
    payment.min = totPrice;
}

payment.addEventListener('change', () => {
    let tochange = document.querySelector('#chaChange');
    if(payment.value < totPrice){
        tochange.innerText = "Input valid amount!"
        return;
    }
    var quanti = payment.value;
    var tot = quanti - totPrice;
    tochange.innerText = 'P' + tot + '.00';

})

let totPri = document.getElementById('totChange').innerText = "P" + totPrice + ".00"; 

sessionStorage.clear();