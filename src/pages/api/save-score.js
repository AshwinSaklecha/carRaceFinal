import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { score } = req.body;

    try {
      const { data, error } = await supabase
        .from('scores')
        .insert({ score: score });

      if (error) throw error;

      res.status(200).json({ message: 'Score saved successfully', data });
    } catch (error) {
      res.status(500).json({ message: 'Error saving score', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}