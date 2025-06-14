import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
});

pool.connect((err) => {
    if (err) {
        console.error('Erro na conexão PostgreSQL:', err);
        return;
    }
    console.log('Conectado ao PostgreSQL');
});

// Create tables if they don't exist
const createTables = async () => {
    try {
        // Users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                phone VARCHAR(20),
                address TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Owners table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS owners (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                cpf VARCHAR(14) UNIQUE NOT NULL,
                income DECIMAL(10,2),
                housing_type VARCHAR(50),
                has_experience BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Pets table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS pets (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                species VARCHAR(50) NOT NULL,
                breed VARCHAR(100),
                age INTEGER,
                weight DECIMAL(5,2),
                color VARCHAR(50),
                gender VARCHAR(10),
                health_status VARCHAR(100),
                description TEXT,
                is_adopted BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Adoptions table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS adoptions (
                id SERIAL PRIMARY KEY,
                pet_id INTEGER REFERENCES pets(id),
                owner_id INTEGER REFERENCES owners(id),
                adoption_date DATE NOT NULL,
                status VARCHAR(50) DEFAULT 'pending',
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Tabelas criadas/verificadas com sucesso');
    } catch (err) {
        console.error('Erro ao criar tabelas:', err);
    }
};

createTables();

export default pool;
