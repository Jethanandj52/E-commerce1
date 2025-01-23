 

const apiUrl = "https://fakestoreapi.com/products";
const error = "API Can't fetch";

 

let quantity=1;
function addQuantity(){
    quantity=quantity+1
    document.getElementById("quantity").innerHTML=quantity
     
}
function minQuantity(){
    if(quantity>1){
        quantity=quantity-1
    document.getElementById("quantity").innerHTML=quantity
     
    }
   
    
}
 
async function store() {
    
    
    try {
        let api = await fetch(apiUrl);
        let data = await api.json();

        let container = document.getElementById("card");  
        let id=1
        data.forEach((item) => {
            let div = document.createElement("div");
            div.className = `card card${item.id}`;
             div.id=item.id
           
            
            div.innerHTML = `
                <div>  
                    <img src="${item.image}" alt="${item.title}" >
                </div>
                <div>  
                    <h5 class="card-title">${item.title}</h5>
                </div>
                
                <div>  
                    <p class="card-text">$${item.price}</p>
                </div>
                
                <div>  
                    <button onclick=add(this)>Add to cart</button>
                    <button onclick=viewDetail(this)>View Detail</button>
                    
                </div>
            `
            container.appendChild(div); 
           
        });
    } catch (error) {
        console.log(error); 
    }
}

store();

 async function add(addCard){
   
 let view= document.getElementById("view1")
    view.style.display="block"
    let id=addCard.parentNode.parentNode.id
    let api = await fetch(apiUrl + "/" + id);
    let data = await api.json();
   
     let viewDetail = document.getElementById("viewCard1");
      quantity=1
     viewDetail.innerHTML = `

     <div class="orderCard ">
     <div class="first"> <img src="${data.image}" alt=""></div>
     <div><b>Title:</b>${data.title}</div>
      <div><b>Category:</b>${data.category}</div>
     <div><b>Price:</b>$ ${data.price}</div>
     <div><b>Rating:</b>${data.rating.rate}</div>
     <div ><b>Quantity:</b><button onclick=minQuantity() class="quantityButton minButton">-</button><span class="quantity" id="quantity">${quantity}</span><button onclick=addQuantity() class="quantityButton">+</button></div>
     <div><button class="orderButton" onclick=order(${data.id})>Order</button></div>
     </div>
     `
    
 }
 

   let totalBillAmount = 0;
let cartItems = []; 
async function order(bookOrder) {
    let view = document.getElementById("view1");
    view.style.display = "none";

    let book = document.getElementById("bookOrder");
    book.style.display = "block";
    setTimeout(() => {
        book.style.display = "none";
    }, 2200);

    let id = bookOrder;
    let api = await fetch(apiUrl + "/" + id);
    let data = await api.json();
    let totalPrice = data.price * quantity; 

    cartItems.push({
        id: data.id,
        totalPrice: totalPrice,
        title: data.title,
        image: data.image,
        price: data.price
    });

    let table = document.getElementById("userTable");
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${data.id}</td>
        <td><img src="${data.image}" alt=""></td>
        <td>${data.title}</td>
        <td>$ ${data.price}</td>
        <td>${quantity}</td>
        <td>$ ${totalPrice}</td>
        <td><button class="deleteButton" onclick="deleteOrder(this, ${data.id})">Delete</button></td>
    `
    table.appendChild(row);

    totalBillAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    let totalBill = document.getElementById("totalBill");
    totalBill.innerHTML =` $ ${totalBillAmount}`;

    checkbutton();
}

 

function deleteOrder(deleteId, itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);

    let table = document.getElementById("userTable");
    let row = deleteId.parentNode.parentNode;
    table.removeChild(row);

    totalBillAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    let totalBill = document.getElementById("totalBill");
    totalBill.innerHTML = `$ ${totalBillAmount}`;

    checkbutton();
}

function checkbutton() {
    let checkoutButton = document.getElementById("check");

    if (cartItems.length === 0) {
        checkoutButton.style.display = "none";
    } else {
        checkoutButton.style.display = "block";
    }
}

       
 
 

 function back(){
        let cart= document.getElementById("cart")
    cart.style.display="none"
 }

 async function viewDetail(cardView){
    let view= document.getElementById("view")
    view.style.display="block"
    
    let id=cardView.parentNode.parentNode.id
    let api = await fetch(apiUrl + "/" + id);
    let data = await api.json();
   
     let viewDetail = document.getElementById("viewCard");
      
     viewDetail.innerHTML = `
    <div class="cardview">
     <div class="first"> <img src="${data.image}" alt=""></div>
     <div class="first cards${data.id}">
        <div><b>Title: </b>${data.title}</div>
     <div><b>Price: </b>$ ${data.price}</div>
     <div><b>Desciption </b>${data.description}</div>
     <div><b>Category: </b>${data.category}</div>
     <div><b>Rating: </b> ${data.rating.rate}</div>
     </div>
    </div>
    `
        
}
function cancel(){
    let view = document.getElementById("view");
    view.style.display="none"

     let view1 = document.getElementById("view1");
    view1.style.display="none"

    let check= document.getElementById("checkOut")
    check.style.display="none"
}

function cart(){
    let cards= document.getElementById("cart")
    cards.style.display="block"
}
 
function checkout(){
    let check= document.getElementById("checkOut")
    check.style.display="block"
    let thanks= document.getElementById("thanks")
    thanks.style.display="none"
}

function confrim() {
    let fill = document.getElementById("fillOut");
    if (fill.checkValidity()) {
        let check = document.getElementById("checkoutCard");
        check.style.display = "none";

        let thanks = document.getElementById("thanks");
        thanks.style.display = "block";

        setTimeout(() => {
            let image = document.getElementById("image");
            if (image) {
                image.innerHTML = `
                    <div class="timeComplete">
                        <img src="time.png" alt="">
                    </div>
                    <h4>Thanks For Coming Have A Nice Day</h4>
                    <button onclick="ok()">Ok</button>
                `
            } else {
                console.error("Image element not found!");
            }
        }, 4000);
    } else {
        alert("Please fill out all the fields correctly.");
    }
}

function ok(){
    
     location.reload()
}


const words = ["Men's Clothes", "Woman's Clothes", "Jewelry", "Electornic"];  
    const textChanger = document.querySelector(".text");
    let index = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentWord = words[index];
      if (deleting) {
        textChanger.innerHTML = currentWord.slice(0, charIndex--);
      } else {
        textChanger.innerHTML = currentWord.slice(0, charIndex++);
      }

      const speed = deleting ? 100 : 200;

      if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1000);  
      }
      else if (deleting && charIndex === 0) {
        deleting = false;
        index = (index + 1) % words.length; 
        setTimeout(typeEffect, 100);  
      } else {
        setTimeout(typeEffect, speed);
      }
    }

    typeEffect();  
 
