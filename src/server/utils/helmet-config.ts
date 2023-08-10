const helmetConfig = {
  useDefaults: true,
  directives: {
    defaultSrc: ["'self'", 'http://localhost:3000', 'https://oauth.yandex.ru/token'],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'http://localhost:3000', 'https://oauth.yandex.ru/token'],
    connectSrc: ["'self'", 'http://localhost:3000', 'https://oauth.yandex.ru/token'],
    styleSrc: ["'self'", "'unsafe-inline'", 'http://localhost:3000', 'https://oauth.yandex.ru/token'],
    imgSrc: ["'self'", 'http://localhost:3000', 'https://oauth.yandex.ru/token'],
  },
};

export { helmetConfig };
