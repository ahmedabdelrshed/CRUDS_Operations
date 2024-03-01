let price = document.getElementById("price");
let title = document.getElementById("title");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let total = document.getElementById("total");
let Category = document.getElementById("Category");
let submit = document.getElementById("submit");
let table = document.querySelector("table tbody");
let type_Of_Operation = "Create";
let index_Of_Product_Update;

function getTotalPrice() {
  if (price.value != "") {
    if (+price.value > 0) {
      total.innerHTML =
        +price.value + +taxes.value + +ads.value - +discount.value;
      total.style.background = "#040";
      total.style.color = "#fff";
    }
  } else {
    total.style.background = "goldenrod";
  }
}

let products = [];

if (localStorage.Products != null) {
  products = JSON.parse(localStorage.Products);
  showProducts();
}

//  Create Product
submit.onclick = () => {
  let newProduct = {
    title: title.value,
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    discount: discount.value,
    count: count.value,
    Category: Category.value,
    total: total.innerHTML,
  };
  if (type_Of_Operation == "Create") {
    if (newProduct.count > 1) {
      for (let index = 0; index < newProduct.count; index++) {
        products.push(newProduct);
      }
    } else {
      products.push(newProduct);
    }
  } else {
    products[index_Of_Product_Update] = newProduct;
    submit.innerHTML = "Create";
    count.style.display = "block";
  }
  localStorage.setItem("Products", JSON.stringify(products));
  clear();
  showProducts();
  getTotalPrice();
};

// Clear Inputs

function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  Category.value = "";
  total.innerHTML = "";
}

// Show Products
function showProducts() {
  table.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    table.innerHTML += `
<tr>
                            <td>${i + 1}</td>
                            <td>${products[i].title}</td>
                            <td>${products[i].price}</td>
                            <td>${products[i].taxes}</td>
                            <td>${products[i].ads}</td>
                            <td>${products[i].discount}</td>
                            <td>${products[i].total}</td>
                            <td>${products[i].Category}</td>
                            <td><button id="update"  onclick='updateProduct(${i})'>Update</button></td>
                            <td><button id="delete" onclick='deleteProduct(${i})'>Delete</button></td>
                        </tr>
`;
  }
  let deleteAll = document.querySelector(".deleteAll");
  if (products.length > 0) {
    deleteAll.innerHTML = `<button  onclick='deleteAllProducts()'>Delete All Product (${products.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}

// Delete Products

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.Products = JSON.stringify(products);
  showProducts();
}

function deleteAllProducts() {
  products.splice(0);
  localStorage.clear();
  showProducts();
}

// Update Products

function updateProduct(index) {
  title.value = products[index].title;
  price.value = products[index].price;
  ads.value = products[index].ads;
  taxes.value = products[index].taxes;
  discount.value = products[index].discount;
  getTotalPrice();
  count.style.display = "none";
  Category.value = products[index].Category;
  submit.innerHTML = "Update";
  type_Of_Operation = "Update";
  index_Of_Product_Update = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
