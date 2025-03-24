import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg'; // PostgreSQL client

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in your environment variables
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT id, name, price, image, price_id AS "priceId" FROM products WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method Not Allowed');
  }
}
