// src/routes/products/[id]/+page.server.js
import { supabase } from '$lib/server/supabase_client.js';

export async function load({ params }) {
  const { id } = params;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error in /products/[id] load:', error);
      const fallback = staticProducts.find((p) => p.id === id);
      if (!fallback) {
        return {
          status: 404,
          error: new Error('Product not found')
        };
      }

      return { product: fallback };
    }

    if (!data) {
      const fallback = staticProducts.find((p) => p.id === id);
      if (!fallback) {
        return {
          status: 404,
          error: new Error('Product not found')
        };
      }

      return { product: fallback };
    }

    const product = {
      id: data.id,
      name: data.name,
      color: data.color,
      description: data.description,
      sizes: data.sizes ?? [],
      priceBySize: data.price_by_size ?? null,
      image: data.image_url ?? null
    };

    return { product };
  } catch (err) {
    console.error('Unexpected error in /products/[id] load:', err);
    const fallback = staticProducts.find((p) => p.id === id);
    if (!fallback) {
      return {
        status: 404,
        error: new Error('Product not found')
      };
    }
    return { product: fallback };
  }
}
