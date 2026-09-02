import {
  FaCamera, FaVideo, FaHotel, FaTree, FaUmbrellaBeach, FaPaintRoller,
  FaSeedling, FaCut, FaTshirt, FaCar, FaUtensils, FaBirthdayCake,
  FaMusic, FaHeadphones, FaPrint, FaOm, FaLandmark, FaStore,
  FaSearch, FaWallet, FaUsers, FaWhatsapp, FaCalendarCheck, FaMapMarkerAlt,
} from 'react-icons/fa'

const categoryIconRules = [
  [/photo/i, FaCamera], [/video/i, FaVideo], [/hotel/i, FaHotel],
  [/garden/i, FaTree], [/beach/i, FaUmbrellaBeach], [/decor/i, FaPaintRoller],
  [/florist|flower/i, FaSeedling], [/salon/i, FaCut], [/dress|suit|bridal/i, FaTshirt],
  [/car/i, FaCar], [/cater/i, FaUtensils], [/cake/i, FaBirthdayCake],
  [/band|music/i, FaMusic], [/dj/i, FaHeadphones], [/print|invitation/i, FaPrint],
  [/poruwa|astro/i, FaOm], [/hall|reception|venue/i, FaLandmark],
]

export function iconForCategory(name = '') {
  const match = categoryIconRules.find(([pattern]) => pattern.test(name))
  return match ? match[1] : FaStore
}

export const features = [
  {
    icon: FaSearch,
    title: 'Discover Trusted Vendors',
    desc: 'Browse verified photographers, venues, caterers and more, filtered by district, budget and style.',
  },
  {
    icon: FaWallet,
    title: 'Track Your Budget',
    desc: 'Real-time budget tracking with visual breakdowns so you never overspend on your big day.',
  },
  {
    icon: FaUsers,
    title: 'Manage Your Guest List',
    desc: 'Organize bride & groom side guests, track RSVPs, and manage seating in one place.',
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp Invitations',
    desc: 'Send beautiful digital invitations directly over WhatsApp and track responses instantly.',
  },
  {
    icon: FaCalendarCheck,
    title: 'Poruwa & Nekath Planning',
    desc: 'Built-in Sri Lankan wedding timeline, Nekath tracking and Poruwa ceremony checklists.',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'District-Based Search',
    desc: 'Find vendors near your ceremony and reception locations across all 25 districts.',
  },
]

export const faqs = [
  {
    question: 'Is MagulaPlan free to use?',
    answer: 'Yes, couples can plan their entire wedding, browse vendors, and manage budgets and guests for free.',
  },
  {
    question: 'Are the vendors verified?',
    answer: 'Verified vendors go through an identity and business verification process, marked with a checkmark badge on their profile.',
  },
  {
    question: 'Can I plan a traditional Kandyan or Poruwa wedding?',
    answer: 'Absolutely. MagulaPlan includes dedicated Nekath tracking, Poruwa checklists, and traditional vendor categories.',
  },
  {
    question: 'Does MagulaPlan work well on mobile?',
    answer: 'MagulaPlan is built mobile-first, since most Sri Lankan couples plan their wedding from their phones.',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Sanduni & Kavindu',
    location: 'Kandy, Sri Lanka',
    quote:
      'We planned our entire Poruwa ceremony and reception from our phones. The Nekath timeline and vendor shortlists kept both families on the same page.',
  },
  {
    id: 2,
    name: 'Ishara & Tharindu',
    location: 'Colombo, Sri Lanka',
    quote:
      'The budget tracker saved us from overspending on decor. We could see exactly where every rupee was going before signing a single contract.',
  },
  {
    id: 3,
    name: 'Nethmi & Dinuka',
    location: 'Galle, Sri Lanka',
    quote:
      'Sending WhatsApp invitations and watching the RSVPs come in was effortless. By the week of the wedding our guest count was finally accurate.',
  },
]

export const howItWorks = [
  { step: 1, title: 'Create Your Account', desc: 'Sign up free and set up your wedding profile with your date, budget, and partner details.' },
  { step: 2, title: 'Discover Vendors', desc: 'Browse verified photographers, venues, caterers and more, filtered by district, budget and category.' },
  { step: 3, title: 'Plan Every Detail', desc: 'Track your budget, manage guests, coordinate with vendors, and plan Poruwa ceremonies from one dashboard.' },
  { step: 4, title: 'Celebrate Your Day', desc: 'Walk down the aisle with confidence knowing every detail is handled, from Nekath timing to seating arrangements.' },
]
