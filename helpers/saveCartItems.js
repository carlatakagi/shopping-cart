// deve salvar os itens do carrinho de compras no localStorage, em uma chave denominada 'cartItems'
// setItem nao retorna nada; recebe chave e valor https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/setItem
// a parte do json tive auxilio da minha irmã
// JSON.stringify converte em string
// JSON.parse quando for pegar coisas
const saveCartItems = (cartItemsToSave) => {
  window.localStorage.setItem('cartItems', cartItemsToSave);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
