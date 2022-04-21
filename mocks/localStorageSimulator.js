// Criado pela Trybe

function localStorageSimulator(key) {
  Object.defineProperty(window, 'localStorage', {
    value: {
      [key]: jest.fn(),
    },
  });
}

afterEach(jest.clearAllMocks);

module.exports = localStorageSimulator;
