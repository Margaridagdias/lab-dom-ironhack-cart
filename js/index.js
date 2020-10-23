function removeItem(e){
  let selectedRow = e.currentTarget.parentNode.parentNode;
  let itemList = selectedRow.parentNode;
  itemList.removeChild(selectedRow);
}

function getPriceByProduct(itemNode){
  let itemInfo = itemNode.getElementsByTagName('div');
  let itemUnityPrice = itemInfo[1].getElementsByTagName('span')[0];
  let unityPrice = itemUnityPrice.innerHTML.substr(1);
  let itemQuantity = itemInfo[2].getElementsByClassName('quantity')[0].value;

  return parseInt(unityPrice) * parseInt(itemQuantity);
}

function updatePriceByProduct(productPrice, index){
  let actualPrice = document.getElementsByClassName('item-subtotal')[index];
  actualPrice.innerHTML = "$" + productPrice;
}

function getTotalPrice() {
  let totalPrice = 0;
  let items = document.getElementsByClassName('item');

  for(let i = 0; i < items.length ; i++){
    let priceByProduct = getPriceByProduct(items[i]);
    updatePriceByProduct(priceByProduct, i);
    totalPrice += priceByProduct;
  }

  let actualTotalPrice = document.getElementById('total-price');
  actualTotalPrice.innerHTML = "$" + totalPrice;
}

function createQuantityInput(){
  let inputNode = document.createElement('input');
  inputNode.className = "quantity";
  inputNode.value = 0;

  return inputNode;
}

function createremoveButton(){
  let div = document.createElement('div');
  div.className = "item-remove col-xs-3";
  let buttonNode = document.createElement('button');

  buttonNode.className = "btn btn-remove";
  buttonNode.innerHTML = "Remove";
  buttonNode.onclick = removeItem;
  div.appendChild(buttonNode);

  return div;
}

function createQuantityNode(){
  let element = document.createElement('div');
  element.className = "item-qty col-xs-3";

  let label = document.createElement('label');
  label.innerHTML = "QTY";
  let input = createQuantityInput();

  element.appendChild(label);
  element.appendChild(input);

  return element;
}

function createItemNode(dataType, itemData){
  itemData = itemData || "$0.00";
  let element = document.createElement('div');
  let span = document.createElement('span');
  let textNode = document.createTextNode(itemData);
  span.appendChild(textNode);
  element.appendChild(span);
  element.className = "item-" + dataType + " col-xs-2";

  return element;
}

function createNewItemRow(itemName, itemUnitPrice){
  let itemRow = document.createElement('div');
  itemRow.className = "item row";

  let nameNode = createItemNode("name", itemName);
  let unitPriceNode = createItemNode("price", itemUnitPrice);
  let quantityNode = createQuantityNode();
  let productPrice = createItemNode("subtotal");
  let button = createremoveButton();

  itemRow.appendChild(nameNode);
  itemRow.appendChild(unitPriceNode);
  itemRow.appendChild(quantityNode);
  itemRow.appendChild(productPrice);
  itemRow.appendChild(button);

  return itemRow;
}

function createNewItem(){
  let itemsList = document.getElementById('items-list');
  let itemRowsLength = itemsList.getElementsByClassName('item').length;
  let lastItemRow = itemsList.getElementsByClassName('item')[itemRowsLength-1];

  let itemName = document.getElementById('new-item-name').value;
  let itemUnitPrice = document.getElementById('new-item-unit-price').value;
  let itemRow = createNewItemRow(itemName, itemUnitPrice);

  itemsList.insertBefore(itemRow, lastItemRow);
}

window.onload = function(){
  let calculatePriceButton = document.getElementById('calc-prices-button');
  let createItemButton = document.getElementById('new-item-create');
  let removeButtons = document.getElementsByClassName('btn-remove');

  calculatePriceButton.onclick = getTotalPrice;
  createItemButton.onclick = createNewItem;

  for(let i = 0; i<removeButtons.length ; i++){
    removeButtons[i].onclick = removeItem;
  }
};
