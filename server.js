import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'u4eksis8dnhmm3',
    host: 'cdeuajkr4sf66s.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    database: 'demlgl5n9857mp',
    password: 'pf3f0c104763c37ac94c02ddbdbed871e9e490199d63681bed928377611aeee74',
    port: 5432,
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
