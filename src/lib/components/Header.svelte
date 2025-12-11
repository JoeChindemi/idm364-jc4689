<!-- src/lib/components/Header.svelte -->
<script lang="js">
  export let title = "Joe's Color Shop";
</script>

<header class="site-header">
  <div class="logo">
    <a href="/products">{title}</a>
  </div>

  <nav class="nav-links">
    <a href="/cart">View My Cart</a>
  </nav>
</header>

<style>
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: #040038;
    color: #fcfcfc;
    border-bottom: 1px solid #888;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .logo a {
    font-weight: 600;
    text-decoration: none;
    color: #ffffff;
    font-size: 1.25rem;
    background-color: #040038;
  }

  .nav-links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .nav-links a {
    text-decoration: none;
    color: #ffffff;
    font-size: 0.95rem;
    background-color: #040038;
  }

  .nav-links a:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    .site-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
</style>
