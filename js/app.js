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
    const avgRating = product.rating.rate;
    let ratingHtml = '';
    if (avgRating === 5) {
      ratingHtml = `
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star"> &nbsp </i> 
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star"> &nbsp </i>
      `;
    }
    else if (avgRating < 5 && avgRating >= 4.5) {
      ratingHtml = `
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star"> &nbsp </i> 
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star-half-alt"> &nbsp </i>
      `;
    }

    else if (avgRating < 4.5 && avgRating >= 4) {
      ratingHtml = `
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star"> &nbsp </i> 
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
      `;
    }
    else if (avgRating < 4 && avgRating >= 3.5) {
      ratingHtml = `
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star"> &nbsp </i> 
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star-half-alt"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
      `;
    }
    else if (avgRating < 3.5 && avgRating >= 3) {
      ratingHtml = `
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star"> &nbsp </i> 
        <i class="fas fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
      `;
    }
    else if (avgRating < 3 && avgRating >= 2.5) {
      ratingHtml = `
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star"> &nbsp </i> 
        <i class="fas fa-star-half-alt"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
      `;
    }
    else if (avgRating < 2.5 && avgRating >= 2) {
      ratingHtml = `
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star"> &nbsp </i> 
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
      `;
    }
    else if (avgRating < 2 && avgRating >= 1.5) {
      ratingHtml = `
        <i class="fas fa-star"> &nbsp </i>
        <i class="fas fa-star-half-alt"> &nbsp </i> 
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
      `;
    }
    else if (avgRating < 1.5 && avgRating >= 1) {
      ratingHtml = `
        <i class="fas fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
      `;
    }
    else {
      ratingHtml = `
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
        <i class="far fa-star"> &nbsp </i>
      `;
    }

    div.innerHTML = `
    <div class="card h-100" style="background-color: whitesmoke;">
    <img style="height: 180px;" src=${image} class="card-img-top w-50 mx-auto mt-5" alt="Book image">
    <div class="card-body">
      <div>
        <h5 data-bs-toggle="tooltip" title="${product.title}" class="line-clamp card-title text-success">${product.title}
        </h5>
      </div>
      <div class="card-text">
        <small class="text-secondary">Category: ${product.category}</small><br>
        <div class="d-flex my-2">
          <p class="me-1"><strong>Price:</strong></p>
          <h3 class="ms-1">$${product.price}</h3>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div id="stars" class="d-flex align-items-center text-warning">
            ${ratingHtml} 
          </div>
          <div class="d-flex align-items-center">
            <span class="fs-3"> ${product.rating.rate}</span>
            <sub class="text-secondary">/ 5</sub>
          </div>
        </div>
        <span class="text-secondary">Total Ratings: ${product.rating.count}</span> <br>
      </div>
      <div class="d-flex justify-content-between mt-3">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="card-button buy-now btn btn-outline-success">Add to cart</button>
      <button id="details-btn" class="card-button btn btn-outline-warning">Details</button>
      </div>
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
