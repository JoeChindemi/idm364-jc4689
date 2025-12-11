<!-- src/routes/cart/+page.svelte -->
<script lang="js">
  import Header from '$lib/components/Header.svelte';
  import { cart } from '$lib/stores/cart';

  function removeOne(itemToRemove) {
    cart.update((items) => {
      const existing = items.find(
        (item) =>
          item.id === itemToRemove.id &&
          item.size === itemToRemove.size
      );

      if (!existing) return items;
      if (existing.quantity > 1) {
        return items.map((item) =>
          item.id === itemToRemove.id && item.size === itemToRemove.size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      return items.filter(
        (item) =>
          !(item.id === itemToRemove.id && item.size === itemToRemove.size)
      );
    });
  }
  
  $: total =
    $cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
</script>

<Header/>

<main class="cart-page">

  <h1>Shopping Cart</h1>

  {#if $cart.length === 0}
    <p class="empty-cart">Your cart is empty.</p>
    <a class="back-link" href="/products">Browse products</a>
  {:else}
    <section class="cart-items">
      {#each $cart as item}
        <article class="cart-item">
          <div class="item-main">
            <h2 class="item-name">{item.name}</h2>

            {#if item.size}
              <p class="item-meta">Size: {item.size}</p>
            {/if}

            <p class="item-meta">
              {item.quantity} × ${item.price}
            </p>

            <p class="item-line-total">
              Line total: ${item.quantity * item.price}
            </p>
          </div>

          <div class="item-actions">
            <button on:click={() => removeOne(item)}>
              Remove one
            </button>
          </div>

        </article>
      {/each}
    </section>

    <section class="cart-summary">
      <p class="summary-total">
        <strong>Total:</strong> ${total}
      </p>

      <div class="summary-nav">
        <a class="back-link" href="/products">Continue shopping</a>
      </div>
    </section>
  {/if}
</main>

<style>
  .cart-page {
    padding: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .cart-page h1 {
    margin-bottom: 1rem;
  }

  .empty-cart {
    margin: 1rem 0;
    font-size: 1rem;
  }

  .back-link {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    text-decoration: none;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    border: 1px solid #000;
    background: #ffffff;
    color: #000;
  }

  .back-link:hover {
    background: #a2ccff;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0 1.5rem;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border-radius: 16px;
    border: 1px solid #ddd;
    padding: 1rem;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  .item-main {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .item-name {
    margin: 0;
    font-size: 1.1rem;
  }

  .item-meta {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
  }

  .item-line-total {
    margin-top: 0.35rem;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .item-actions {
    display: flex;
    align-items: center;
  }

  .item-actions button {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    border-radius: 999px;
    border: 1px solid #000;
    background: #ffffff;
    cursor: pointer;
  }

  .item-actions button:hover {
    background: #f0f0f0;
  }

  .cart-summary {
    border-top: 1px solid #ddd;
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .summary-total {
    margin: 0;
    font-size: 1rem;
  }

  .summary-nav {
    display: flex;
    gap: 0.5rem;
  }

  @media (max-width: 600px) {
    .cart-page {
      padding: 1rem;
    }

    .cart-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .item-actions {
      align-self: flex-end;
    }
  }
</style>
