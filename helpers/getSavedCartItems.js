// recuperar os itens do carrinho de compras do localStorage quando carregamos a página
// https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/getItem
const getSavedCartItems = () => {
  localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
