/**
 * Builds a Lemon Squeezy hosted checkout URL for the Pro plan.
 *
 * Setup required in your Lemon Squeezy dashboard:
 * 1. Create a Product with a subscription Variant (e.g. "Pro Monthly").
 * 2. Copy the checkout URL for that variant (Store -> Products -> your
 *    variant -> "Share" -> copy link). It looks like:
 *    https://yourstore.lemonsqueezy.com/buy/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 * 3. Put that full URL in NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL.
 */
export function buildProCheckoutUrl(userId: string, email: string) {
    const base = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL;
  
    if (!base) {
      throw new Error(
        "NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL is not set. Add it to your .env.local."
      );
    }
  
    const url = new URL(base);
    // Embed the Supabase user id as custom data so the webhook can match
    // the payment back to the right account.
    url.searchParams.set("checkout[custom][user_id]", userId);
    url.searchParams.set("checkout[email]", email);
  
    return url.toString();
  }