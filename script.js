// minha irmã me ajudou a entender o projeto e ensinou a importancia de separar as funcoes em pequenas funcoes
// também me ajudou a entender melhor a funcionalidade do JSON
// ol lista de produtos adicionados no carrinho
const listCartItems = document.querySelector('.cart__items');

// funcao que cria as imagens dos produtos na tela
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// funcao que cria o elemento com imagem etc
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// serve para pegar o id das box - não sei onde usar
/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

// funcao que cria a divTotalPrice 
function mountTotalPrice(cartItemsSaved) {
  const cartItems = document.querySelector('.cart');
  const divTotalPrice = document.createElement('div');
  divTotalPrice.className = 'total-price';

  const savedCartItemsTotalPrice = cartItemsSaved.reduce((total, item) => 
    total + item.salePrice, 0);
  
  divTotalPrice.innerText = savedCartItemsTotalPrice;

  cartItems.append(divTotalPrice);
}

// funcao que atualiza o preço total
function updateTotalPrice(price, operator) {
  const divTotalPrice = document.querySelector('.total-price');
  const currentTotalPrice = Number(divTotalPrice.innerText);

  if (operator === 'sum') {
    divTotalPrice.innerText = currentTotalPrice + price;
  } else if (operator === 'minus') {
    divTotalPrice.innerText = currentTotalPrice - price;
  }
}
// o carrinho de compras deve ser salvo no LocalStorage,
// ou seja, todas as adições e remoções devem ser abordadas para que a lista esteja sempre atualizada.
// funcao para remover o item do carrinho ao clicar nele
function cartItemClickListener(event, sku, price) {
  // coloque seu código aqui
  const cartItemsSaved = getSavedCartItems();

  event.target.remove();

  const updatedSavedCartItems = cartItemsSaved.filter((item) => item.sku !== sku);

  updateTotalPrice(price, 'minus');
  saveCartItems(JSON.stringify(updatedSavedCartItems));
}

// funcao para criar os componentes HTML referentes a um item do carrinho
// fetchItem
// Adicione o elemento retornado da função createCartItemElement(product) como filho do elemento <ol class="cart__items">.
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, sku));
  return li;
}

// funcao para salvar os produtos adicionados na localStorage
function saveProductOnLocalStorage(productObject) {
  const savedItems = getSavedCartItems();

  savedItems.push(productObject);

  saveCartItems(JSON.stringify(savedItems));
}

// funcao async que dá um appendChild dos itens no carrinho
// e salva com o saveProductOnLocalStorage = nao esta salvando
// lidando com a açao do click de adicionar ao carrinho
async function handleAddToCartClick(sku) {
  const { id, title, price } = await fetchItem(sku);
  const productObject = { sku: id, name: title, salePrice: price };

  const cartItem = createCartItemElement(productObject);

  listCartItems.appendChild(cartItem);

  saveProductOnLocalStorage(productObject);
  updateTotalPrice(price);
}

// funcao para criar produto (fetchProducts)
function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', price));
  const buttonAddCart = section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );
  buttonAddCart.addEventListener('click', () => handleAddToCartClick(sku));
  section.appendChild(buttonAddCart);

  return section;
}

// funcao para montar a lista de produtos na tela trybeshopping
// faz o destructuring das infos que preciso do produto { id, title, thumbnail, price }
function createListItems(products) {
  const sectionItems = document.querySelector('.items');

  products.forEach(({ id, title, thumbnail, price }) => {
    const sectionProduct = createProductItemElement({ 
      sku: id, name: title, image: thumbnail, price, 
    });

    sectionItems.appendChild(sectionProduct);
  });
}

// funcao para montar a lista de produtos no carrinho
// conforme coloca itens este carrinho dá um appendchild 
function createcartWithSavedItems(cartItemsSaved) {
  cartItemsSaved.forEach((item) => {
    const cartItem = createCartItemElement(item);

    listCartItems.appendChild(cartItem);
  });
}

//  Implemente a lógica no botão Esvaziar carrinho para limpar o carrinho de compras
// localStorage.clear https://qastack.com.br/programming/9943220/how-to-delete-a-localstorage-item-when-the-browser-window-tab-is-closed
function clearAllItems() {
  const clearButton = document.querySelector('.empty-cart');
  const divTotalPrice = document.querySelector('.total-price');

  clearButton.addEventListener('click', () => {
    divTotalPrice.innerText = 0;
    listCartItems.innerHTML = '';
    window.localStorage.removeItem('cartItems');
  });  
}

// funcao para mostrar o texto de "carregando..." durante uma requisição à API
// liga ou desliga o loading
function toggleLoading(show) {
  if (show) {
    const textLoading = document.createElement('div');
    const listItems = document.querySelector('.items');

    textLoading.className = 'loading';
    textLoading.innerText = 'carregando...';

    listItems.append(textLoading);
  } else {
    const textLoading = document.querySelector('.loading');

    textLoading.remove();
  }
}

// funcao que inicia o site
// assincrona pois o fetchProducts é uma func async
async function init() {
  toggleLoading(true);
  
  const cartItemsSaved = getSavedCartItems(); // colocar funcao dentro de constante quando a funcao retorna algo
  
  const { results } = await fetchProducts('computador');
  
  toggleLoading(false);
  createListItems(results);
  createcartWithSavedItems(cartItemsSaved);
  mountTotalPrice(cartItemsSaved);
  clearAllItems();
}

window.onload = () => {
  init();
};