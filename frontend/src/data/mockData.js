import {
  FaCamera, FaVideo, FaHotel, FaTree, FaUmbrellaBeach, FaPaintRoller,
  FaSeedling, FaCut, FaTshirt, FaCar, FaUtensils, FaBirthdayCake,
  FaMusic, FaHeadphones, FaGem, FaPrint, FaOm, FaLandmark,
} from 'react-icons/fa'

export const categories = [
  { id: 'photography', name: 'Photography', icon: FaCamera, count: 128 },
  { id: 'videography', name: 'Videography', icon: FaVideo, count: 76 },
  { id: 'hotels', name: 'Hotels', icon: FaHotel, count: 94 },
  { id: 'reception-halls', name: 'Reception Halls', icon: FaLandmark, count: 61 },
  { id: 'garden-venues', name: 'Garden Venues', icon: FaTree, count: 44 },
  { id: 'beach-venues', name: 'Beach Venues', icon: FaUmbrellaBeach, count: 32 },
  { id: 'decorators', name: 'Decorators', icon: FaPaintRoller, count: 88 },
  { id: 'florists', name: 'Florists', icon: FaSeedling, count: 53 },
  { id: 'bridal-salons', name: 'Bridal Salons', icon: FaCut, count: 67 },
  { id: 'bridal-dresses', name: 'Bridal Dresses', icon: FaTshirt, count: 71 },
  { id: 'groom-suits', name: 'Groom Suits', icon: FaTshirt, count: 39 },
  { id: 'wedding-cars', name: 'Wedding Cars', icon: FaCar, count: 45 },
  { id: 'catering', name: 'Catering', icon: FaUtensils, count: 102 },
  { id: 'cake-designers', name: 'Cake Designers', icon: FaBirthdayCake, count: 34 },
  { id: 'music-bands', name: 'Music Bands', icon: FaMusic, count: 29 },
  { id: 'dj', name: 'DJ', icon: FaHeadphones, count: 41 },
  { id: 'poruwa', name: 'Poruwa Decorations', icon: FaOm, count: 25 },
  { id: 'astrologers', name: 'Astrologers', icon: FaOm, count: 18 },
  { id: 'jewellery', name: 'Jewellery', icon: FaGem, count: 52 },
  { id: 'invitations', name: 'Invitation Printing', icon: FaPrint, count: 30 },
]

export const districts = [
  'Colombo', 'Gampaha', 'Kandy', 'Galle', 'Matara', 'Kurunegala',
  'Jaffna', 'Anuradhapura', 'Nuwara Eliya', 'Ratnapura', 'Negombo', 'Kalutara',
]

const names = [
  'Kaveesha Photography', 'Ceylon Grand Hotel', 'Lotus Garden Weddings', 'Serendib Films',
  'Araliya Bridal House', 'Kandy Hills Resort', 'Poruwa Craft Studio', 'Golden Petals Florist',
  'The Groom Room', 'Blue Ocean Beach Venue', 'Maharaja Catering', 'Sweet Bloom Cakes',
  'Rhythm Nation Band', 'DJ Ravana', 'Nekath Astrology Services', 'Vogue Jewellers',
  'Prestige Invitations', 'Emerald Isle Decor', 'Batik Bloom Studio', 'Cinnamon Wedding Cars',
]

export const vendors = names.map((name, i) => {
  const cat = categories[i % categories.length]
  return {
    id: `v${i + 1}`,
    name,
    category: cat.id,
    categoryName: cat.name,
    district: districts[i % districts.length],
    rating: (4 + ((i * 7) % 10) / 10).toFixed(1),
    reviews: 20 + ((i * 13) % 180),
    priceFrom: 45000 + ((i * 15000) % 300000),
    image: `https://picsum.photos/seed/magulaplan${i}/640/480`,
    verified: i % 3 !== 0,
    featured: i % 4 === 0,
    tags: i % 2 === 0 ? ['Kandyan', 'Traditional'] : ['Western', 'Modern'],
    description:
      'A trusted, highly-rated vendor serving couples across Sri Lanka with premium quality and dedicated service for your special day.',
    gallery: [0, 1, 2, 3, 4, 5].map((g) => `https://picsum.photos/seed/magulaplan${i}-${g}/800/600`),
    packages: [
      { name: 'Essential', price: 45000 + i * 5000, features: ['Half-day coverage', '1 professional', 'Digital gallery'] },
      { name: 'Premium', price: 95000 + i * 8000, features: ['Full-day coverage', '2 professionals', 'Album + digital gallery', 'Drone shots'] },
      { name: 'Luxury', price: 175000 + i * 12000, features: ['Two-day coverage', '3 professionals', 'Premium album', 'Cinematic highlight film'] },
    ],
    phone: '+94 77 123 4567',
    whatsapp: '94771234567',
  }
})

export const testimonials = [
  {
    id: 1,
    name: 'Dilani & Chamath',
    location: 'Colombo',
    quote:
      'MagulaPlan turned six months of chaos into a smooth, joyful journey. We found our photographer and venue in one afternoon.',
    image: 'https://i.pravatar.cc/120?img=32',
  },
  {
    id: 2,
    name: 'Nisansala & Kavindu',
    location: 'Kandy',
    quote:
      'The budget tracker alone saved our wedding. We knew exactly where every rupee was going, right up to the poruwa ceremony.',
    image: 'https://i.pravatar.cc/120?img=45',
  },
  {
    id: 3,
    name: 'Ashan & Piumi',
    location: 'Galle',
    quote:
      'Sending WhatsApp invites and tracking RSVPs from one dashboard felt like magic. Highly recommend to every Sri Lankan couple.',
    image: 'https://i.pravatar.cc/120?img=12',
  },
]

export const budgetItems = [
  { id: 1, category: 'Venue', vendor: 'Kandy Hills Resort', estimated: 450000, actual: 470000, paid: 250000, status: 'partially-paid' },
  { id: 2, category: 'Photography', vendor: 'Kaveesha Photography', estimated: 150000, actual: 150000, paid: 150000, status: 'paid' },
  { id: 3, category: 'Catering', vendor: 'Maharaja Catering', estimated: 380000, actual: 395000, paid: 100000, status: 'partially-paid' },
  { id: 4, category: 'Bridal Wear', vendor: 'Araliya Bridal House', estimated: 120000, actual: 118000, paid: 0, status: 'pending' },
  { id: 5, category: 'Decorations', vendor: 'Emerald Isle Decor', estimated: 95000, actual: 92000, paid: 92000, status: 'paid' },
  { id: 6, category: 'Music & DJ', vendor: 'DJ Ravana', estimated: 60000, actual: 60000, paid: 0, status: 'pending' },
  { id: 7, category: 'Cake', vendor: 'Sweet Bloom Cakes', estimated: 25000, actual: 26000, paid: 26000, status: 'paid' },
  { id: 8, category: 'Invitations', vendor: 'Prestige Invitations', estimated: 30000, actual: 28000, paid: 28000, status: 'paid' },
]

export const guests = [
  { id: 1, name: 'Sanduni Perera', side: 'Bride', group: 'Family', phone: '+94 77 111 2222', rsvp: 'confirmed', count: 2 },
  { id: 2, name: 'Ruwan Fernando', side: 'Groom', group: 'Family', phone: '+94 71 222 3333', rsvp: 'confirmed', count: 4 },
  { id: 3, name: 'Isuru Bandara', side: 'Groom', group: 'Friends', phone: '+94 76 333 4444', rsvp: 'pending', count: 1 },
  { id: 4, name: 'Tharushi Silva', side: 'Bride', group: 'Colleagues', phone: '+94 70 444 5555', rsvp: 'declined', count: 1 },
  { id: 5, name: 'Kasun Jayasuriya', side: 'Groom', group: 'Family', phone: '+94 75 555 6666', rsvp: 'confirmed', count: 3 },
  { id: 6, name: 'Nadeesha Gunawardena', side: 'Bride', group: 'Friends', phone: '+94 78 666 7777', rsvp: 'pending', count: 2 },
  { id: 7, name: 'Dinesh Kodikara', side: 'Groom', group: 'Colleagues', phone: '+94 77 777 8888', rsvp: 'confirmed', count: 2 },
  { id: 8, name: 'Hansika Rathnayake', side: 'Bride', group: 'Family', phone: '+94 71 888 9999', rsvp: 'confirmed', count: 5 },
]

export const tasks = [
  { id: 1, title: 'Confirm venue booking', due: '2026-08-10', done: true, category: 'Venue' },
  { id: 2, title: 'Finalize photographer package', due: '2026-08-15', done: true, category: 'Photography' },
  { id: 3, title: 'Send Poruwa checklist to astrologer', due: '2026-08-20', done: false, category: 'Poruwa' },
  { id: 4, title: 'Choose bridal dress fitting date', due: '2026-08-25', done: false, category: 'Bridal Wear' },
  { id: 5, title: 'Confirm catering menu tasting', due: '2026-09-01', done: false, category: 'Catering' },
  { id: 6, title: 'Send WhatsApp invitations', due: '2026-09-05', done: false, category: 'Guests' },
]

export const weddingTimeline = [
  { time: '6:00 AM', event: 'Bridal preparation begins', side: 'Bride' },
  { time: '7:30 AM', event: 'Groom preparation begins', side: 'Groom' },
  { time: '9:15 AM', event: 'Auspicious Nekath — Poruwa ceremony', side: 'Both' },
  { time: '10:30 AM', event: 'Photography session', side: 'Both' },
  { time: '12:30 PM', event: 'Lunch reception', side: 'Both' },
  { time: '6:00 PM', event: 'Evening reception & entertainment', side: 'Both' },
]

export const poruwaChecklist = [
  'Confirm auspicious Nekath time with astrologer',
  'Book Poruwa decoration vendor',
  'Arrange Kandyan drummers & Hewisi band',
  'Prepare Nekath oil lamp (pahan) items',
  'Arrange betel leaves & traditional items',
  'Confirm Poruwa officiant / Kapuwa',
  'Arrange jasmine garlands for ceremony',
  'Coordinate bride & groom entrance timing',
]
