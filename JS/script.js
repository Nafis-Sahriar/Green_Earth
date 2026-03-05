// console.log("Bismillahir Rahmanir Rahim");

// Loading Categories Dynamically

function selectCategory(id) {
  // console.log(id); now I have the ids. Ebar ekta common function lagbe ja id wise tree show korbe.
}

async function loadCategories() {
  const categroiesContainer = document.getElementById("categories-container");

  const url = "https://openapi.programming-hero.com/api/categories";

  const res = await fetch(url);

  const data = await res.json();

  data.categories.forEach((category) => {
    const category_button = document.createElement("div");

    category_button.innerHTML = `
             <div>
                    <button onclick="selectCategory(${category.id})"  id="btn-all-trees" class="btn bg-green-50 text-black border-0 w-full justify-start
                     hover:bg-green-100">${category.category_name}</button>
            </div>
        `;

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
  for (tree of data) {
    const treeDiv = document.createElement("div");

    treeDiv.innerHTML = `
             <div class="card bg-base-100 shadow-2xl"> 
                        <figure class="max-h-[200px] object-cover">
                            <img src="${tree.image}"
                                alt="Shoes" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">${tree.name}</h2>
                            <p class="line-clamp-3">A card component has a figure, a body part, and inside body there are title and actions
                                parts</p>


                            <div class="flex justify-between">
                                <div class="badge badge-soft badge-success font-bold outline">${tree.category}</div>
                                <div class="price font-bold text-xl">
                                    <h6>৳${tree.price}</h6>
                                </div>

                            </div>

                            <div class="card-actions justify-end">
                                <button class="btn bg-green-700 text-white w-full rounded-full ">Add to Cart</button>
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
