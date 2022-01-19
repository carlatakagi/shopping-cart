// deve salvar os itens do carrinho de compras no localStorage, em uma chave denominada 'cartItems'
// recebe chave e valor https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/setItem
const saveCartItems = (carItems) => {
  localStorage.setItem('cartItems', carItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
