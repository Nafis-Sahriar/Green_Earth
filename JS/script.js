// console.log("Bismillahir Rahmanir Rahim");

// Loading Categories Dynamically

async function loadCategories() {
  const categroiesContainer = document.getElementById("categories-container");

  const url = "https://openapi.programming-hero.com/api/categories";

  const res = await fetch(url);

  const data = await res.json();

  data.categories.forEach((category) => {
    const category_button = document.createElement("div");

    category_button.innerHTML = `
             <div>
                    <button id="btn-all-trees"
                    class="btn bg-green-50 text-black border-0 w-full justify-start
                     hover:bg-green-100">${category.category_name}</button>
            </div>
        `;

    categroiesContainer.append(category_button);
  });
}

loadCategories();

// Dynamically Generated Buttons Here. 
