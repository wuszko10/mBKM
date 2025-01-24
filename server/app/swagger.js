const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const loadDocs = (dir) => {
  const docs = {};
  fs.readdirSync(dir).forEach((file) => {
    if (path.extname(file) === '.yaml') {
      const doc = YAML.load(path.join(dir, file));
      Object.assign(docs, doc);
    }
  });
  return docs;
};

const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: "mBKM API",
    version: "1.0.0",
    description: "Dokumentacja API dla aplikacji mBKM",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  servers: [
    {
      url: "http://localhost:3001",
    },
  ],
  paths: loadDocs(path.join(__dirname, '../doc')),
};

module.exports = { swaggerDocs, swaggerUi };
