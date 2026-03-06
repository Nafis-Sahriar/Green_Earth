// console.log("Bismillahir Rahmanir Rahim");

// Loading Categories Dynamically

function selectCategory(id, button) {
  const x = document.querySelectorAll(".btn_primary");

  x.forEach((el) => {
    el.classList.remove("btn_primary");
  });

  button.classList.add("btn_primary");

  if (id == 0) {
    loadAllTrees();
    return;
  }

  loadTreesByCategory(id);
}

async function loadCategories() {
  const categroiesContainer = document.getElementById("categories-container");

  const url = "https://openapi.programming-hero.com/api/categories";

  const res = await fetch(url);

  const data = await res.json();

  data.categories.forEach((category) => {
    const category_button = document.createElement("button");

    category_button.innerHTML = `
             
                    <button class="mrb font-bold flex px-3 py-2 justify-start
                       rounded border-green-500 hover:bg-green-200 ">${category.category_name}</button>
            
        `;

    category_button.onclick = () =>
      selectCategory(category.id, category_button);

    categroiesContainer.append(category_button);
  });
}

loadCategories();

// Loading All trees Dynamically:

// Get the tree container

const allTreeContainer = document.getElementById("tree-cards-container");

// console.log(allTreeContainer); --> Dhorlam

async function loadAllTrees() {
  showSpinner(true);
  const allTreeContainer = document.getElementById("tree-cards-container");

  const url = "https://openapi.programming-hero.com/api/plants";

  const res = await fetch(url);

  const data = await res.json();

  displayTrees(data.plants);

  showSpinner(false);
}

const displayTrees = (data) => {
  allTreeContainer.innerHTML = "";
  for (tree of data) {
    const treeDiv = document.createElement("div");

    treeDiv.innerHTML = `
             <div class="card bg-base-100 shadow-2xl"> 
                        <figure class="max-h-[200px] object-cover">
                            <img onclick="openTreeModal(${tree.id})" src="${tree.image}"
                                alt="Shoes" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title hover:cursor-pointer" onclick="openTreeModal(${tree.id})">${tree.name}</h2>
                            <p  onclick="openTreeModal(${tree.id})" class="line-clamp-3 hover:cursor-pointer ">${tree.description}</p>


                            <div class="flex justify-between">
                                <div class="badge badge-soft badge-success font-bold outline" onclick="openTreeModal(${tree.id})">${tree.category}</div>
                                <div class="price font-bold text-xl">
                                    <h6>৳${tree.price}</h6>
                                </div>

                            </div>

                            <div class="card-actions justify-end" onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})">
                                <button class="btn btn-cart bg-green-700 text-white w-full rounded-full ">Add to Cart</button>
                            </div>
                        </div>
                    </div> 


        `;

    allTreeContainer.append(treeDiv);
  }
};

loadAllTrees();

function showSpinner(isTrue) {
  const loadingSpinner = document.getElementById("loading-spinnerr");
  const allTrees = document.getElementById("tree-cards-container");

  if (isTrue) {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    allTrees.classList.add("hidden");

    allTrees.innerHTML = "";
  } else {
    loadingSpinner.classList.remove("flex");
    loadingSpinner.classList.add("hidden");

    allTrees.classList.remove("hidden");
  }
}
async function loadTreesByCategory(id) {
  // console.log(id);
  showSpinner(true);

  const url = `https://openapi.programming-hero.com/api/category/${id}`;

  const res = await fetch(url);

  const data = await res.json();

  console.log(data);

  displayTrees(data.plants);
  showSpinner(false);
}

async function openTreeModal(id) {
  // console.log(id);

  const url = `https://openapi.programming-hero.com/api/plant/${id}`;

  const res = await fetch(url);

  const data = await res.json();

  const plantDetails = data.plants;

  console.log(plantDetails);

  const modalTITILE = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");

  const modalPrice = document.getElementById("modalPrice");
  const modalDescription = document.getElementById("modalDescription");
  const modalCategoryy = document.getElementById("modalCategory");
  const modalid = document.getElementById('modalID');

  modalTITILE.textContent = plantDetails.name;
  modalImage.src = plantDetails.image;
  modalCategoryy.textContent = plantDetails.category;
  modalDescription.textContent = plantDetails.description;
  modalPrice.textContent = plantDetails.price;
  modalid.textContent = plantDetails.id;
  tree_modal.showModal();
}

let cart = [];

function isEmptyCart()
{
    const emptyMsg = document.getElementById('Empty');
    if(cart.length===0)
    {
        
        emptyMsg.classList.remove('hidden');
    }
    else
    {
        emptyMsg.classList.add('hidden');
    }
}

function addToCart(id, name, price) {
  //   console.log(id,name, price);

  let product = {
    id,
    name,
    price,
    quantity:1
  };

    let existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity++;   // increase quantity
  } 
  else {
    cart.push(product);
  }
  renderCart();
  isEmptyCart();
}

function renderCart() {
  const theCart = document.getElementById("cart-item-container");
  theCart.innerHTML = "";

  for (p of cart) {
    const cartDiv = document.createElement("div");

    cartDiv.innerHTML = `

            <div class="card shadow-xl p-2 bg-green-100 border border-green-600 rounded-md mx-2">

                            <div class="flex justify-between items-center">
                                <h2 class="font-bold text-green-800">${p.name}</h2>
                                <button onclick="removeFromCard(${p.id})" class="btn btn-ghost"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                            <p class="text-gray-600">
                                <span class="text-green-700 font-bold">${p.price}</span> x <span>${p.quantity}</span>
                            </p>

                            <div class="flex justify-end">
                                <p id="card-total" class="font-bold text-lg">${p.price*p.quantity}</p>
                            </div>

                        </div>
        
        `;
    theCart.prepend(cartDiv);
    renderTotal(cart);
  }
}


function removeFromCard(id)
{
    cart = cart.filter((item) => item.id != id);
    renderCart();
    renderTotal(cart);
    isEmptyCart();
}


function renderTotal(cart)
{
    let totalPrice = 0;

    for(let p of cart)
    {
        totalPrice += (p.price*p.quantity);
    }

    document.getElementById('sub-total').innerText = totalPrice;
}


const xy = document.getElementById('btn-cart-modal').addEventListener('click', function(){


        const name = document.getElementById('modalTitle').innerText;
        const price = document.getElementById('modalPrice').innerText;
        const id = document.getElementById('modalID').innerText;

        
      
        

        addToCart(id,name,price);
      
    



})