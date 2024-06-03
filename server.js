import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const app = express();

// Configurar CORS para permitir solicitudes desde Netlify
const corsOptions = {
    origin: 'https://fantastic-souffle-79cbbf.netlify.app', // Reemplaza con la URL de tu frontend en Netlify
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Configurar la conexión a la base de datos
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/api/blog', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blog');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Servir archivos estáticos
app.use(express.static(resolve(__dirname, 'dist')));

// Manejar cualquier otra ruta con el archivo index.html
app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
