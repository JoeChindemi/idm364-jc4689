<script lang="js">
  import Header from '$lib/components/Header.svelte';
  export let data;
  const products = data.products;

  function getFromPrice(product) {
    if (!product.sizes || !product.priceBySize) return null;
    const prices = product.sizes.map((size) => product.priceBySize[size]);
    return Math.min(...prices);
  }
</script>

<Header />
<h1>All Products</h1>

<div class="products-grid">
{#each products as product}
  <article class="product-card">
    {#if product.image}
      <img
        src={product.image}
        alt={product.name}
        class="product-image"
      />
    {/if}

    <h2>{product.name}</h2>
    {#if getFromPrice(product) !== null}
      <p class="price">From ${getFromPrice(product)}</p>
    {/if}
    <p class="description">{product.description}</p>

    <a class="details-link" href={`/products/${product.id}`}>
      View details
    </a>
  </article>
{/each}


</div>



<style>

  .products-page {
    padding: 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .products-page h1 {
    margin-bottom: 1rem;
  }

  .products-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .product-card {
    border-radius: 16px;
    border: 1px solid #ddd;
    padding: 1rem;
    background: white;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  .product-image {
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin-bottom: 0.5rem;
    object-fit: cover;
  }

  .product-name {
    margin: 0;
    font-size: 1.1rem;
  }

  .product-meta {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
  }

  .product-price {
    margin: 0.5rem 0 0;
    font-weight: 600;
    font-size: 1rem;
  }

  .product-description {
    margin: 0.5rem 0;
    font-size: 0.9rem;
    color: #444;
    flex-grow: 1;
  }

  .details-link {
    align-self: flex-start;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    text-decoration: none;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    border: 1px solid #000;
    background: #ffffff;
    color: #000;
  }

  .details-link:hover {
    background: #a2ccff;
  }

  @media (max-width: 600px) {
    .products-page {
      padding: 1rem;
    }
  }
</style>


