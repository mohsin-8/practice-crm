// StripeConfig.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OgMexK2Ly0dfRbQMdqgWw8zkB803zYXBTkeP5Zs5fxWwOjg9ZzofoLxXE8PiCkc0QacOVAKVZHkXJIuLAKjiD7V00oZKibKn6');

export default stripePromise;