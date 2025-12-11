// src/routes/products/+page.server.js
import { supabase } from '$lib/server/supabase_client.js';

export async function load() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Supabase error in /products load:', error);
    
      return { products: staticProducts };
    }

    if (!data) {

      return { products: staticProducts };
    }

    const products = data.map((row) => ({
      id: row.id,
      name: row.name,
      color: row.color,
      description: row.description,
      sizes: row.sizes ?? [],
      priceBySize: row.price_by_size ?? null,
      image: row.image_url ?? null
    }));

    return { products };
  } catch (err) {
    console.error('Unexpected error in /products load:', err);
    return { products: staticProducts };
  }
}
