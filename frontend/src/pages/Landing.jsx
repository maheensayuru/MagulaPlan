import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaSearch, FaWallet, FaUsers, FaWhatsapp, FaStar, FaArrowRight,
  FaMapMarkerAlt, FaCalendarCheck, FaGem, FaHeart, FaStore,
} from 'react-icons/fa'
import { categories, testimonials } from '../data/mockData'
import heroCouple from '../assets/hero-couple.jpg'
import SectionHeading from '../components/ui/SectionHeading'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import Accordion from '../components/ui/Accordion'

const features = [
  {
    icon: FaSearch,
    title: 'Discover Trusted Vendors',
    desc: 'Browse 800+ verified photographers, venues, caterers and more — filtered by district, budget and style.',
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

const faqs = [
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
    answer: 'Absolutely — MagulaPlan includes dedicated Nekath tracking, Poruwa checklists, and traditional vendor categories.',
  },
  {
    question: 'Does MagulaPlan work well on mobile?',
    answer: 'MagulaPlan is built mobile-first, since most Sri Lankan couples plan their wedding from their phones.',
  },
]

export default function Landing() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ivory-radial">
        <div className="pattern-border absolute top-0 left-0 right-0" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold-200/40 blur-3xl animate-float" />
        <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-maroon-100/50 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="container-app relative py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-eyebrow mb-5">
              <FaGem size={10} /> Sri Lanka's Wedding Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-charcoal mb-6">
              Plan Your Dream <span className="text-gradient-gold">Sri Lankan</span> Wedding, All In One Place
            </h1>
            <p className="text-charcoal/60 text-lg leading-relaxed mb-8 max-w-lg">
              From Poruwa to reception — discover vendors, track your budget, manage guests, and send WhatsApp invitations.
              No more endless Facebook and Instagram searching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="btn-primary">
                Start Planning Free <FaArrowRight size={13} />
              </Link>
              <Link to="/vendors" className="btn-outline">
                Explore Vendors
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-3">
                {[12, 25, 38, 47].map((n) => (
                  <img key={n} src={`https://i.pravatar.cc/60?img=${n}`} alt="" className="h-10 w-10 rounded-full border-2 border-ivory-50 object-cover" />
                ))}
              </div>
              <div>
                <div className="flex text-gold-500 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} size={12} />)}
                </div>
                <p className="text-xs text-charcoal/50 mt-1">Loved by 2,400+ Sri Lankan couples</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-xl3 overflow-hidden shadow-soft border-8 border-white">
              <img src={heroCouple} alt="Sri Lankan wedding couple in traditional Kandyan attire" className="w-full h-[420px] sm:h-[520px] object-cover object-top" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl2 shadow-soft p-4 flex items-center gap-3 animate-float"
            >
              <div className="h-11 w-11 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <FaHeart size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">142 Days To Go</p>
                <p className="text-xs text-charcoal/50">Wedding countdown active</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-app -mt-6 sm:mt-4 relative z-10 pb-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={FaStore} label="Verified Vendors" value={820} suffix="+" color="maroon" />
          <StatCard icon={FaHeart} label="Weddings Planned" value={2400} suffix="+" color="gold" />
          <StatCard icon={FaMapMarkerAlt} label="Districts Covered" value={25} color="emerald" />
          <StatCard icon={FaStar} label="Average Rating" value={4} suffix=".8/5" color="maroon" />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 sm:py-28 scroll-mt-24">
        <div className="container-app">
          <SectionHeading
            eyebrow="Everything You Need"
            title="One Platform For Your Entire Wedding"
            subtitle="Stop juggling WhatsApp groups, spreadsheets, and dozens of Instagram bookmarks."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="card card-hover p-7"
              >
                <div className="h-12 w-12 rounded-xl2 bg-maroon-gradient flex items-center justify-center text-gold-200 mb-5">
                  <f.icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-lg text-charcoal mb-2">{f.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-app">
          <SectionHeading eyebrow="Browse By Category" title="Find Every Wedding Vendor You Need" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-14">
            {categories.slice(0, 10).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Link
                  to={`/vendors?category=${cat.id}`}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl2 border border-charcoal/8 hover:border-gold-300 hover:shadow-gold hover:-translate-y-1 transition-all duration-300 text-center bg-ivory-50"
                >
                  <div className="h-12 w-12 rounded-full bg-gold-50 flex items-center justify-center text-maroon-500">
                    <cat.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{cat.name}</p>
                    <p className="text-xs text-charcoal/40">{cat.count} vendors</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/vendors" className="btn-outline">
              View All Categories <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* SRI LANKAN FEATURES BANNER */}
      <section className="py-20 sm:py-28 bg-maroon-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container-app relative grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="section-eyebrow mb-4">
              <FaGem size={10} /> Rooted In Tradition
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-ivory-50 mb-6">Built For Sri Lankan Wedding Traditions</h2>
            <ul className="space-y-4">
              {[
                'Auspicious Nekath time tracking with astrologer coordination',
                'Complete Poruwa ceremony checklists and vendor booking',
                'Kandyan, Low Country & Western theme planning tools',
                'Bride-side & groom-side guest and timeline management',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-ivory-100/85">
                  <span className="h-6 w-6 rounded-full bg-gold-500 flex items-center justify-center shrink-0 mt-0.5 text-maroon-800 text-xs font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-xl3 overflow-hidden shadow-soft border-8 border-white/10">
            <img src="https://picsum.photos/seed/poruwa1/800/600" alt="Poruwa ceremony" className="w-full h-80 object-cover" />
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 sm:py-28 scroll-mt-24">
        <div className="container-app">
          <SectionHeading eyebrow="Real Couples, Real Stories" title="Loved By Couples Across Sri Lanka" />
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-7"
              >
                <div className="flex text-gold-500 gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => <FaStar key={j} size={13} />)}
                </div>
                <p className="text-charcoal/70 leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                    <p className="text-xs text-charcoal/50">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-app max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <div className="mt-12">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-xl3 overflow-hidden bg-maroon-gradient px-8 py-16 sm:py-20 text-center"
          >
            <Badge variant="gold" className="mb-5">Free to get started</Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-ivory-50 mb-4">Your Perfect Wedding Starts Here</h2>
            <p className="text-ivory-100/70 max-w-lg mx-auto mb-8">
              Join thousands of Sri Lankan couples planning smarter, less stressful weddings with MagulaPlan.
            </p>
            <Link to="/register" className="btn-gold">
              Create Your Free Account <FaArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
