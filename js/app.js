const loadProducts = async () => {
  const url = `https://fakestoreapi.com/products`;
  await fetch(url)
      .then((response) => response.json())
      .then((data) => showProducts(data));
};
loadProducts();
 
// show all product in UI 
const showProducts = async (products) => {
  const allProducts = products.map((pd) => pd);
  console.log(allProducts);
  for (const product of allProducts) {
      // const image = product.image;
      const rate = product.rating.rate;
      const count = product.rating.count;
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
 
    <div class="card trans-card">
        <div class="card-body">
            <div>
                <img src="${product.hasOwnProperty('image') && product.image}" class="card-img-top w-50 mx-auto p-3" style="height: 200px;">
            </div>
 
            <h2 class="card-title">${product.hasOwnProperty('title') && product.title && product.title}</h2>
            <p>Category: ${product.hasOwnProperty('category') && product.category && product.category}</p>
 
            <div class="d-flex justify-content-between">
              <p>Rating: ${product.hasOwnProperty('rating') && product.rating && product.rating.rate}</p>
              <p>${product.hasOwnProperty('rating') && product.rating && product.rating.count} Customer's Rating</p>
            </div>
 
            <h6>Price: $ ${product.hasOwnProperty('price') && product.category && product.price}</h6>
 
            <div class="">
                  <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-warning">
                       <i class="fas fa-shopping-cart"></i> Add to cart
                  </button>
 
                  <button onclick="showDetails(${product.id})" type="button" class="btn custom-gray-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <i class="fas fa-info-circle"></i> Details
                  </button>
            </div>
 
        </div>
 
    </div>
    `;
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
  const converted = parseFloat(element);
  return converted;
};
 
// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  // document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = total.toFixed(2);
};
 
// set innerText function
const setInnerText = (id, value) => {
  // document.getElementById(id).innerText = Math.round(value);
  document.getElementById(id).innerText = value.toFixed(2);
};
 
// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
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
      getInputValue("price") + getInputValue("delivery-charge") +
      getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
 
 
// reloadPage function
const reloadPage = () => {
  window.location.reload();
}
 
// get product id and set it dynamecally and send it to showModal Function
const showDetails = async id => {
  console.log("showDetails btn clicked!", id);
 
  const url = `https://fakestoreapi.com/products/${id}`
 
  await fetch(url)
      .then(res => res.json())
      .then(data => showModal(data))
 
}
 
// modal will show description of the product
const showModal = async data => {
  console.log(data);
  const div = document.createElement("div");
 
  div.innerHTML = `
 
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <h5 class=" modal-title" id="exampleModalLabel">
                          ${data.hasOwnProperty('title') && data.title}
                      </h5>
              <div>
                <img src="${data.hasOwnProperty('image') && data.image}" class="card-img-top mx-auto p-3">
              </div>
          </div>
 
          <div class="modal-body">
              ${data.description}
          </div>
 
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
 
          </div>
      </div>
  </div>
  `
      ;
  document.getElementById("product-info-modal").appendChild(div);
}
 
// upcomming features message function
const alertMessage = () => {
  alert("This features will be coming soon!")
}