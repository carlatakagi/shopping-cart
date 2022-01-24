const fetchItem = async (itemId) => {
  // itemId deve ser o valor id do item selecionado
  try {
    const url = `https://api.mercadolibre.com/items/${itemId}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (_) {
    return 'You must provide an url';
  } 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
