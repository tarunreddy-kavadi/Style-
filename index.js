let shop= document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateShop = () => {
    return (shop.innerHTML=shopItemsData
        .map((x)=>{
        let {id, name, desc, img, price} = x;
        let search = basket.find((x)=>x.id == id) || [];
        return `
        <div id=product-id-${id} class="item" >
        <img width = "200" src=${img} alt=""></img>
        <div class="details">
            <h3>${name}</h3>
            <p>${desc} </p>
            <div class="price-quantity">
            <h2> $ ${price} </h2>
            <div class="button">
                <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                <div id= ${id} class="quantity"> 
                ${search.item === undefined  ? 0: search.item}
                </div>
                <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
            </div>
            </div>
        </div>
    </div>
    `;
    }).join(" "));
     };
     generateShop();
     
//increment
 let increment = (id) => {
    let search= basket.find((x)=> x.id === id);
    if(search === undefined){
        basket.push({
        id :id,
        item: 1, });
}
else {
    search.item += 1
}
update(id)
console.log(basket)
localStorage.setItem("data",JSON.stringify(basket));
};

//decrement
let decrement = (id)=> {
    let search= basket.find((x)=> x.id === id);
    if(search === undefined) return;
    else if(search.item === 0) return;
else {
    search.item -= 1
}
update(id);
console.log(basket)
basket = basket.filter((x)=> x.item !== 0);
localStorage.setItem("data",JSON.stringify(basket));
};

//update
let update = (id)=> { 
     let search = basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.item;
calculation();
};

//calculation
let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}

calculation();



