// src/routes/api/products/+server.js
import { supabase } from '$lib/server/supabase_client.js';

export async function GET() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Supabase error in /api/products:', error);
    return json({ error: 'Failed to load products' }, { status: 500 });
  }

  return json(data);
}