import type { IconName } from '../components/Icon';

// Ported from the website's script.js arrays. There the data was positional
// arrays ([icon, class, title, desc]); typed objects make each field explicit
// and let the compiler check every entry.

export type Service = {
  id: string;
  title: string;
  /** Bengali/English mix, as on the website. */
  description: string;
  icon: IconName;
};

export type QuickService = Omit<Service, 'id'> & {
  /** The full service this shortcut leads to. */
  serviceId: Service['id'];
};

export const services: readonly Service[] = [
  { id: 'form-fill', title: 'Online Form Fill-up', description: 'Government ও private বিভিন্ন online form fill-up করা হয়', icon: 'file-document-edit' },
  { id: 'aadhaar', title: 'Aadhaar Services', description: 'Aadhaar card-এর address/document update ও অন্যান্য online assistance', icon: 'fingerprint' },
  { id: 'voter', title: 'Voter Card Services', description: 'Voter card সম্পর্কিত online service ও assistance', icon: 'card-account-details' },
  { id: 'ration', title: 'Ration Card Services', description: 'Ration card সম্পর্কিত বিভিন্ন online service', icon: 'file-table' },
  { id: 'scholarship', title: 'Scholarship Form', description: 'বিভিন্ন scholarship-এর online form fill-up ও application assistance', icon: 'school' },
  { id: 'land', title: 'Land & Property Services', description: 'ROR, Plot & other land-related online services', icon: 'home-city' },
  { id: 'printing', title: 'Printing & Xerox', description: 'B/W ও colour printing এবং Xerox service', icon: 'printer' },
  { id: 'photo', title: 'Photo Service', description: 'Passport photo ও প্রয়োজনীয় photo-related service', icon: 'account-box' },
  { id: 'train', title: 'Train Ticket Booking', description: 'Train ticket booking-এর online assistance', icon: 'train' },
  { id: 'flight', title: 'Flight Ticket Booking', description: 'Flight ticket booking-এর online assistance', icon: 'airplane' },
  { id: 'banner', title: 'Flex / Banner Design', description: 'Business, shop ও promotional use-এর জন্য Flex ও Banner design', icon: 'bulletin-board' },
  { id: 'business-card', title: 'Business Card Design', description: 'Professional business card / visiting card design', icon: 'card-account-mail' },
  { id: 'logo', title: 'Logo Design', description: 'Business ও brand-এর জন্য professional logo design', icon: 'fountain-pen-tip' },
  { id: 'website', title: 'Website Design', description: 'Business ও personal use-এর জন্য modern website design', icon: 'monitor' },
  { id: 'other', title: 'Other Online Services', description: 'প্রয়োজন অনুযায়ী অন্যান্য online ও digital service', icon: 'view-grid' },
];

export const quickServices: readonly QuickService[] = [
  { serviceId: 'form-fill', title: 'Form Fill-up', description: 'Government ও private বিভিন্ন online form fill-up করা হয়', icon: 'file-document-edit' },
  { serviceId: 'printing', title: 'Print Services', description: 'B/W ও colour printing-এর সুবিধা পাওয়া যায়', icon: 'printer' },
  { serviceId: 'aadhaar', title: 'Aadhaar Services', description: 'Aadhaar card-এর বিভিন্ন update ও document-related online service', icon: 'fingerprint' },
  { serviceId: 'voter', title: 'Voter Services', description: 'Voter card সম্পর্কিত বিভিন্ন online service ও assistance', icon: 'card-account-details' },
];
