// deve salvar os itens do carrinho de compras no localStorage, em uma chave denominada 'cartItems'
// recebe chave e valor https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/setItem
const saveCartItems = (cartItems) => {
  localStorage.setItem('cartItems', cartItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
