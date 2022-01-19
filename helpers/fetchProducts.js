const fetchProducts = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (_) {
    return 'You must provide an url';
  }
};

// ordem em objeto nao importa
// _ ignorar parametro
fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
