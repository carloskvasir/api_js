# PetMatch API

A REST API for an animal adoption platform, developed for the Web 2 course in the Software Engineering program at UTFPR.

## About the Project

This API serves as the backend for a platform that connects animal shelters and independent protectors with people interested in adopting pets. It enables the registration of animals available for adoption, manages adoption applications, and facilitates the matching process between pets and potential adopters.

## Technologies Used

- **Node.js** (v18+): JavaScript runtime environment.
- **Express**: Minimalist framework for building web servers.
- **JavaScript**: Programming language used in the project.

## Requirements

- **Node.js** version 18.0.0 or higher.
- **npm** (Node.js package manager).

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:carloskvasir/api_js.git
   cd api_js
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Available Endpoints

### Pets
- `GET /pets` - List all available pets
- `GET /pets/:id` - Get details of a specific pet
- `POST /pets` - Register a new pet for adoption
- `PUT /pets/:id` - Update pet information
- `DELETE /pets/:id` - Remove a pet listing

### Shelters/Protectors
- `GET /shelters` - List all registered shelters/protectors
- `POST /shelters` - Register new shelter/protector
- `PUT /shelters/:id` - Update shelter/protector information

### Adoption Applications
- `POST /adoptions` - Submit adoption application
- `GET /adoptions/:id` - Check application status
- `PUT /adoptions/:id` - Update application status

## Development Roadmap

- [ ] Basic CRUD for pets
- [ ] Shelter/protector registration system
- [ ] Adoption application workflow
- [ ] Pet search and filtering
- [ ] Image upload for pets

## License
This project is licensed under the Mozilla Public License 2.0 (MPL-2.0).
See the [LICENSE](LICENSE) file in the project root for the full license text.

## Contact
- LinkedIn: [linkedin.com/in/carloskvasir](https://linkedin.com/in/carloskvasir)
- GitHub: [github.com/carloskvasir](https://github.com/carloskvasir)

