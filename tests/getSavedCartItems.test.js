const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {

  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado;', () => {
    getSavedCartItems();
    expect(window.localStorage.getItem).toHaveBeenCalled();
  });

  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro.', () => { 
    getSavedCartItems();
    expect(window.localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
