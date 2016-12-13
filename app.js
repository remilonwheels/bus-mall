'use strict';

var allProducts = [];
var productNames = ['bag', 'banana', 'boots', 'breakfast', 'bubblegum', 'chair'];
var currentProductLeftIndex = -1;
var currentProductCenterIndex = -1;
var currentProductRightIndex = -1;

var productSection = document.getElementById('product-section');
var productLeft = document.getElementById('product-left');
var productCenter = document.getElementById('product-center');
var productRight = document.getElementById('product-right');

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

function populateProductSection() {
  var productArray = generateUniqueArray(3);
  var productLeftIndex = productArray[0];
  var productCenterIndex = productArray[1];
  var productRightIndex = productArray[2];

  productLeft.src = allProducts[productLeftIndex].path;
  productCenter.src = allProducts[productCenterIndex].path;
  productRight.src = allProducts[productRightIndex].path;

  currentProductLeftIndex = productLeftIndex;
  currentProductCenterIndex = productCenterIndex;
  currentProductRightIndex = productRightIndex;
}

function generateUniqueArray(arrayLength) {
  var productSet = [];

  for (var i = 0; i < arrayLength; i++) {
    var randomIndex = generateRandomIndex();
    while (productSet.indexOf(randomIndex) !== -1) {
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

  allProducts[selectedProductIndex].tally++;
  allProducts[selectedProductIndex].views++;

  console.table(allProducts);


  // populateProductSection();
}

productSection.addEventListener('click', handleProductClick);


populateProductSection();
