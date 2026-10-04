// All business contact data lives here, so the app can be pointed at a
// different shop by editing this one file.
//
// The phone number is the developer's own, used for end-to-end testing.
// The address and map point are placeholders, not a real shop.

export const business = {
  name: 'DIGITAL POINT',
  /** E.164 format for tel: links. */
  phone: '+918918669308',
  phoneDisplay: '89186 69308',
  /** wa.me format: country code + number, no "+" or spaces. */
  whatsapp: '918918669308',
  address: ['Placeholder Road', 'Your Town, West Bengal'],
  hours: [
    { days: 'Mon–Sat', time: '9:00 AM – 8:00 PM' },
    { days: 'Sun', time: '10:00 AM – 2:00 PM' },
  ],
  // Placeholder point (a public landmark in Kolkata) until real shop data is set.
  map: { latitude: 22.5448, longitude: 88.3426 },
} as const;

export const whatsappGreeting = [
  `Hello ${business.name}! 👋`,
  "I'd like to know more about your services.",
  'নমস্কার, আমি আপনার service সম্পর্কে জানতে চাই।',
].join('\n');

export function telUrl(): string {
  return `tel:${business.phone}`;
}

// Text in a URL must be percent-encoded: spaces, newlines, emoji and Bengali
// characters would otherwise break the link.
export function whatsappUrl(message: string = whatsappGreeting): string {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
