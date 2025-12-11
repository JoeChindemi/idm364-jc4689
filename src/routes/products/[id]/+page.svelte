<!-- src/routes/products/[id]/+page.svelte -->
<script lang="js">
  import Header from '$lib/components/Header.svelte';
  import { cart } from '$lib/stores/cart';

  export let data;

  const product = data.product;

  let selectedSize = '';

  $: selectedPrice =
    product && product.priceBySize && selectedSize
      ? product.priceBySize[selectedSize]
      : null;

  function addToCart() {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    const priceToUse =
      selectedPrice ??
      (product.priceBySize && product.sizes
        ? product.priceBySize[product.sizes[0]]
        : null);

    cart.update((items) => {
      const existing = items.find(
        (item) =>
          item.id === product.id &&
          item.size === (selectedSize || item.size)
      );

      if (existing) {
        return items.map((item) =>
          item.id === product.id &&
          item.size === (selectedSize || item.size)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...items,
        {
          ...product,
          size: selectedSize || null,
          price: priceToUse,
          quantity: 1
        }
      ];
    });
  }
</script>

<Header/>

{#if product}
  <div class="product-page">
    <div class="product-media">
      {#if product.image}
        <img
          src={product.image}
          alt={product.name}
          class="product-image"
        />
      {/if}
    </div>
    <div class="product-info">
      <h1>{product.name}</h1>

      <p><strong>Color:</strong> {product.color}</p>

      {#if product.sizes && product.sizes.length > 0}
        <p><strong>Available sizes:</strong> {product.sizes.join(', ')}</p>

        <label class="size-label">
          Choose a size:
          <select bind:value={selectedSize}>
            <option value="" disabled>Select a size</option>
            {#each product.sizes as size}
              <option value={size}>{size}</option>
            {/each}
          </select>
        </label>

        <p class="price-line">
          <strong>Price:</strong>
          {#if selectedPrice !== null}
            ${selectedPrice} (size {selectedSize})
          {:else}
            Select a size to see the price
          {/if}
        </p>
      {:else}
        <p class="price-line"><strong>Price:</strong> $??</p>
      {/if}

      <p class="description">{product.description}</p>

      <button class="add-button" on:click={addToCart}>
        Add to Cart
      </button>

      <nav class="product-nav">
        <a href="/products">Back to Products</a>
        <span>•</span>
        <a href="/cart">View Cart</a>
      </nav>
    </div>
  </div>
{:else}
  <h1>Product not found</h1>
  <a href="/products">Back to Products</a>
{/if}

<style>
  .product-page {
    min-height: calc(100vh - 80px);
    padding: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    align-items: flex-start;
  }

  .product-media {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
  }

  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .product-name {
    margin: 0;
    font-size: 1.5rem;
  }

  .product-meta {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
  }

  .product-price {
    margin-top: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
  }

  .product-description {
    margin-top: 0.5rem;
    font-size: 0.95rem;
    color: #444;
  }

  .size-label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 0.75rem;
    font-size: 0.9rem;
  }

  .size-label select {
    max-width: 200px;
    padding: 0.3rem 0.4rem;
  }

  .add-button {
    margin-top: 1rem;
    align-self: flex-start;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    border: 1px solid #000;
    background: #090c5c;
    color: #fafafa;
    font-size: 0.95rem;
  }

  .add-button:hover {
    background: white;
    color:#090c5c;
  }

  .product-nav {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    font-size: 0.9rem;
    align-items: center;
  }

  .product-nav a {
    text-decoration: none;
  }

  .product-nav a:hover {
    text-decoration: underline;
  }

  @media (max-width: 500px) {
    .product-page {
      flex-direction: column;
      align-items: stretch;
      padding: 1rem;
    }

    .product-media {
      justify-content: center;
      margin-bottom: 0.5rem;
    }
  }
</style>
