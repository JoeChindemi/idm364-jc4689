// src/lib/stores/cart.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initialCart = browser
  ? JSON.parse(localStorage.getItem('cart')) || []
  : [];
export const cart = writable(initialCart);

if (browser) {
  cart.subscribe((value) => {
    localStorage.setItem('cart', JSON.stringify(value));
  });
}