const fetchItem = async (itemId) => {
  // o JSON deve conter apenas um item
  // itemId deve ser o valor id do item selecionado
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  
  try {
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
