let xmlserializer = require('xmlserializer');

function XMLSerializerMock() {}

XMLSerializerMock.prototype.serializeToString = function(node) {
  return xmlserializer.serializeToString(node).replace(/ xmlns="[^"]*"/g, '');
};

const mock = () => {
  let storage = {};
  return {
    getItem: key => (key in storage ? storage[key] : null),
    setItem: (key, value) => (storage[key] = value || ''),
    removeItem: key => delete storage[key],
    clear: () => (storage = {}),
  };
};

const requestAnimationFrameMock = lastTime => (callback, element) => {
  let currTime = new Date().getTime();
  let timeToCall = Math.max(0, 16 - (currTime - lastTime));
  let id = setTimeout(function() {
    callback(currTime + timeToCall);
  }, timeToCall);
  lastTime = currTime + timeToCall;
  return id;
};

const cancelAnimationFrameMock = id => {
  clearTimeout(id);
};

const performanceMock = {
  now: () => new Date(),
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'XMLSerializer', { value: XMLSerializerMock });
Object.defineProperty(console, 'error', {
  value: () => {},
});
Object.defineProperty(window, 'requestAnimationFrame', {
  value: requestAnimationFrameMock(0),
});
Object.defineProperty(window, 'cancelAnimationFrame', {
  value: cancelAnimationFrameMock,
});
Object.defineProperty(window, 'URL', {
  value: { createObjectURL: jest.fn() },
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

global.console.debug = () => {};
Object.defineProperty(window, 'performance', { value: performanceMock });
