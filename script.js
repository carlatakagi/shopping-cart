function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement({ element, className, innerText }) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// funcao para criar produto (fetchProducts)
// destructuring (pegar) sku, name e image do objeto results
// pegando chave id e renomeando para sku
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement({ 
    element: 'span', className: 'item__sku', innerText: sku }));
  section.appendChild(createCustomElement({ 
    element: 'span', className: 'item__title', innerText: name }));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement({ 
    element: 'button', className: 'item__add', innerText: 'Adicionar ao carrinho!' }));

  return section;
}

// serve para pegar o id
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// funcao para remover o item do carrinho ao clicar nele
function cartItemClickListener(event) {
  // coloque seu código aqui
}

// funcao para criar os componentes HTML referentes a um item do carrinho
// fetchItem
// Adicione o elemento retornado da função createCartItemElement(product) como filho do elemento <ol class="cart__items">.
// const olCartName = document.querySelector('.cart__items');
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// funcao que inicia 
async function init() {
  const { results } = await fetchProducts(); // quero somente o results da fecthProducts
  results.forEach((result) => {
    const elementProduct = createProductItemElement(result); // results é um objeto  
    const items = document.querySelector('.items');
    items.appendChild(elementProduct);
  });
}

// fazer ações, quando nao quero manipular nada no array, uso forEach
window.onload = async () => {
  init();
};
