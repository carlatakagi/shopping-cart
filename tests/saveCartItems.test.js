// minha irmã me ajudou com jest mock beforeEach

const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro cartItems e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    // toHaveBeenCalledWith argumentos específicos https://jestjs.io/pt-BR/docs/expect#tohavebeencalledwitharg1-arg2-
    saveCartItems('<ol><li>Item</li></ol>');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })
});
