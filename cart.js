let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart")
console.log(shopItemsData)
let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}
calculation();

 generateCartItems =()=>{
    if (basket.length !==0){
        return (shoppingCart.innerHTML = basket
        .map((x)=>{
            console.log(x);
            let {id,item}=x;
            let search = shopItemsData.find((y)=> y.id == id) ||[]
            
            return`
            <div class = "cart-item">
            <img src=${search.img} width = 200 alt= ""/>
            <div class = "details">
            <div class="title-price-x">
            <h4 class = "title-price">
            ${search.name}
             <p class ="cart-item-price"> $ ${search.price}</p>
            
            </h4>
            <i onclick ="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
                <div class="button">
                    <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                    <div id= ${id} class="quantity">${item}</div>
                    <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                </div>
            <h3 class = "cart-item-price">
            $ ${item * search.price}
            </h3>
            
            </div>
            `; 
        }).join(""))
    }
    else{
    shoppingCart.innerHTML =``;
    label.innerHTML = `
    <h2> cart is empty </h2>
    <a href ="index.html">
    <button class = "HomeBtn"> Back to Home </button>
    </a>
    `;
         
    }
};

generateCartItems();
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
generateCartItems();
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
generateCartItems();
localStorage.setItem("data",JSON.stringify(basket));
};

let update = (id)=> { 
    let search = basket.find((x)=> x.id === id);
   document.getElementById(id).innerHTML = search.item;
calculation();
totalAmount();

};

let removeItem = (id)=>{
    // let selectedItem = id;
    basket = basket.filter((x)=>x.id !== id)
    generateCartItems();
    totalAmount();
    localStorage.setItem("data",JSON.stringify(basket));
    calculation();
};

let clearCart =(id)=>{
    basket = []
    generateCartItems();
    totalAmount();
    localStorage.setItem("data",JSON.stringify(basket));
    calculation
}

let totalAmount = ()=> {
    if ( basket.length !== 0 ){
        let amount = basket.map((x)=>{
            let {item, id} = x;
            let search = shopItemsData.find((y)=> y.id == id) ||[]
            return item * search.price;
        }).reduce((x,y)=>x+y,0)
        //console.log(amount)
        label.innerHTML = `
        <h2> Total Bill: $ ${amount}</h2>
        <button class ="checkout"> Checkout </button>
        <button onclick = "clearCart()" class = "removeAll" >Clear Cart</button>
        `
    }else return;
}
totalAmount();
 // removeItem()  





 