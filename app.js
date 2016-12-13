'use strict';

var allProducts = [];
var productNames = ['bag', 'banana', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var productsClicked = 0;
var currentProductLeftIndex = -1;
var currentProductCenterIndex = -1;
var currentProductRightIndex = -1;
var previousProductSet = [-1, -1, -1];

var productSection = document.getElementById('product-section');
var productLeft = document.getElementById('product-left');
var productCenter = document.getElementById('product-center');
var productRight = document.getElementById('product-right');
var resultList = document.getElementById('result-list');
var submitButton = document.getElementById('submit-button');

function Product(productName) {
  this.productName = productName;
  this.path = 'img/' + productName + '.jpg';
  this.tally = 0;
  this.views = 0;

  allProducts.push(this);
}

//Create Product Instances
for (var i = 0; i < productNames.length; i++){
  new Product(productNames[i]);
}

//Function Declarations
function populateProductSection() {
  var productArray = generateUniqueArray(3);
  var productLeftIndex = productArray[0];
  var productCenterIndex = productArray[1];
  var productRightIndex = productArray[2];

  productLeft.src = allProducts[productLeftIndex].path;
  allProducts[productLeftIndex].views += 1;
  productCenter.src = allProducts[productCenterIndex].path;
  allProducts[productCenterIndex].views += 1;
  productRight.src = allProducts[productRightIndex].path;
  allProducts[productRightIndex].views += 1;

  currentProductLeftIndex = productLeftIndex;
  currentProductCenterIndex = productCenterIndex;
  currentProductRightIndex = productRightIndex;
}

function generateUniqueArray(arrayLength) {
  var productSet = [];

  for (var i = 0; i < arrayLength; i++) {
    var randomIndex = generateRandomIndex();
    while ((productSet.indexOf(randomIndex) !== -1) || (previousProductSet.indexOf(randomIndex) !== -1)) {
      randomIndex = generateRandomIndex();
    }
    productSet.push(randomIndex);
  }

  return productSet;
}

function generateRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function handleProductClick(event) {
  event.preventDefault();

  productsClicked += 1;

  var selectedProductID = event.target.id;
  var selectedProductIndex = -1;

  if (selectedProductID === 'product-left') {
    selectedProductIndex = currentProductLeftIndex;
  }
  if (selectedProductID === 'product-center') {
    selectedProductIndex = currentProductCenterIndex;
  }
  if (selectedProductID === 'product-right') {
    selectedProductIndex = currentProductRightIndex;
  }

  allProducts[selectedProductIndex].tally += 1;

  if (productsClicked > 24) {
    productSection.removeEventListener('click', handleProductClick);
    submitButton.style.display = 'block';
    submitButton.addEventListener('click', createResultList);
    return;
  }

  previousProductSet = [currentProductLeftIndex, currentProductCenterIndex, currentProductRightIndex];
  console.log(previousProductSet);

  populateProductSection();
}

function createResultList() {
  for (var i = 0; i < allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = allProducts[i].tally + ' votes for the ' + allProducts[i].productName;;
    resultList.appendChild(liEl);
  }
}

//Attach Event Listeners
productSection.addEventListener('click', handleProductClick);

//Function calls
populateProductSection();
