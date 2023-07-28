const helmetConfig = {
  useDefaults: true,
  directives: {
    defaultSrc: ["'self'", 'http://localhost:3000'],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'http://localhost:3000'],
    connectSrc: ["'self'", 'http://localhost:3000'],
    styleSrc: ["'self'", "'unsafe-inline'", 'http://localhost:3000'],
    imgSrc: ["'self'", 'http://localhost:3000'],
  },
};

export { helmetConfig };
