// recuperar os itens do carrinho de compras do localStorage quando carregamos a página
// getItem - https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/getItem
// sempre que usar getItem temos que usar o JSON.parse pois o getItem retorna string e precisa retornar objeto
// JSON.parse quando for pegar coisas, precis ter uma parametro de string
const getSavedCartItems = () => {
  const savedCartItems = window.localStorage.getItem('cartItems'); 
  
  return savedCartItems ? JSON.parse(savedCartItems) : [];
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
