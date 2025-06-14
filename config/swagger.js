import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PetMatch API',
      version: '1.0.0',
      description: 'API for managing pets, shelters, and adoptions.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./routes/api.js', './models/*.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
