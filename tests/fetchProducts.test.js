require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    // metodo toHaveBeenCalled: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const result = await fetchProducts('computador');
    expect(result).toStrictEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    // testar erro https://jestjs.io/docs/asynchronous
    try {
      await fetchProducts();
    } catch (error) {
    expect(error).toMatch(new Error('You must provide an url'));
    }
  })
});
