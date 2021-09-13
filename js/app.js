const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR3uuQNUI7kuCXeYspQyu_x4WZM9PPFYY8sty5KRl1bViGZT4PWYdyBn3T4`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  // console.log(allProducts);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="card h-100">
    <img style="height: 180px;" src=${image} class="card-img-top w-50 mx-auto mt-5" alt="Book image">
    <div class="card-body">
      <div>
        <p style="max-width: 300px;" data-bs-toggle="tooltip" title="${product.title}" class="card-title text-success overflow-hidden text-truncate">${product.title}
      </p>
      <hr>
      </div>
      <p class="card-text">
        <strong>Category:</strong>
        ${product.category} <br>
        <strong>Price:</strong> $${product.price}<br>
        <strong>Total Ratings:</strong> ${product.rating.count}<br>
        <strong>Average Rating:</strong> ${product.rating.rate}<br>
      </p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="card-button buy-now btn btn-outline-dark">Add to cart</button>
      <button id="details-btn" class="card-button btn btn-outline-dark">Details</button>
    </div>
  </div>`;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = parseFloat(document.getElementById('price').innerText);
  setInnerText("delivery-charge", 20);
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    parseFloat(document.getElementById('price').innerText) + parseFloat(document.getElementById('delivery-charge').innerText) +
    parseFloat(document.getElementById('total-tax').innerText);
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
