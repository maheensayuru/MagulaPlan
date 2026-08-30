import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaHeart, FaStar, FaArrowRight, FaMapMarkerAlt, FaStore, FaChevronRight } from 'react-icons/fa'
import { vendorsApi, categoriesApi } from '../services/api'
import heroWedding from '../assets/hero-traditional.jpg'
import SectionHeading from '../components/ui/SectionHeading'
import StatCard from '../components/ui/StatCard'
import Accordion from '../components/ui/Accordion'
import { riseIn, viewportOnce } from '../lib/motion'
import { features, faqs, iconForCategory, testimonials, howItWorks } from '../constants/landing'

export default function Landing() {
  const [vendorCount, setVendorCount] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let cancelled = false
    vendorsApi.list().then((data) => {
      if (!cancelled && Array.isArray(data)) setVendorCount(data.length)
    }).catch(() => {})
    categoriesApi.list().then((data) => {
      if (!cancelled && Array.isArray(data)) setCategories(data)
    }).catch(() => {})
    return () => { cancelled = true }
  }, [])

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden min-h-[90vh]">
        <motion.img
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={heroWedding}
          alt="Couple celebrating their wedding ceremony in timeless elegance"
          className="absolute inset-0 h-full w-full object-cover object-[65%_25%]"
        />
        {/* gradient overlays: soft blush-cream on left fading to transparent over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/95 sm:via-ivory/90 to-ivory/0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/40 via-transparent to-transparent" />

        <div className="relative z-10 container-app min-h-[90vh] flex items-center pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p className="section-eyebrow mb-4">Sri Lanka's Boutique Wedding Platform</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium leading-[1.14] text-charcoal mb-6">
              Plan Your Dream{' '}
              <span className="text-maroon-700">Wedding</span>
            </h1>
            <p className="text-charcoal/65 text-base sm:text-lg leading-relaxed mb-10 max-w-md">
              Discover trusted floral decorators, photographers, venues and caterers for your perfect Sri Lankan wedding, all in one curated hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="btn-primary">
                Start Planning Free <FaArrowRight size={12} />
              </Link>
              <Link to="/vendors" className="btn-outline">
                Browse Vendors
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-12 bg-white border-y border-blush-100/60">
        <div className="container-app">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={FaStore}
              label="Verified Vendors"
              value={vendorCount ?? 0}
              suffix="+"
              display={vendorCount === null ? 'X+' : undefined}
              color="sage"
            />
            <StatCard icon={FaHeart} label="Weddings Planned" display="X+" color="maroon" />
            <StatCard icon={FaMapMarkerAlt} label="Districts Covered" value={25} color="sage" />
            <StatCard icon={FaStar} label="Average Rating" display="X.X / 5" color="maroon" />
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-16 sm:py-24 scroll-mt-24">
        <div className="container-app">
          <SectionHeading
            eyebrow="Curated For Couples"
            title="Everything You Need, Beautifully Organized"
            subtitle="From Poruwa ceremonies to reception seating, manage every detail in one romantic workspace."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={riseIn}
                transition={{ delay: i * 0.08 }}
                className="card p-7"
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-5 ${i % 2 === 0 ? 'bg-blush-100 text-maroon-700' : 'bg-sage-100 text-sage-700'}`}>
                  <f.icon size={19} />
                </div>
                <h3 className="font-display font-semibold text-lg text-charcoal mb-2">{f.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-16 sm:py-24 bg-white border-y border-blush-100/60">
        <div className="container-app">
          <SectionHeading eyebrow="Browse By Service" title="Find Every Wedding Specialist You Need" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-14">
            {categories.slice(0, 10).map((cat, i) => {
              const Icon = iconForCategory(cat.categoryName)
              return (
                <motion.div
                  key={cat.categoryId}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={riseIn}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={`/vendors?category=${cat.categoryId}`}
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-blush-200/70 hover:border-maroon-400 hover:shadow-sm transition-all duration-200 text-center bg-blush-50/20 hover:bg-blush-50/50"
                  >
                    <div className="h-11 w-11 rounded-full bg-blush-100 flex items-center justify-center text-maroon-700">
                      <Icon size={18} />
                    </div>
                    <p className="text-sm font-semibold text-charcoal">{cat.categoryName}</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/vendors" className="btn-outline">
              View All Categories <FaChevronRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 sm:py-24 bg-ivory-100">
        <div className="container-app">
          <SectionHeading
            eyebrow="The Journey"
            title="Your Path to the Perfect Celebration"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={riseIn}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-maroon-700 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                  {item.step}
                </div>
                <h3 className="font-display font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-charcoal/55 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="py-16 sm:py-24 scroll-mt-24">
        <div className="container-app">
          <SectionHeading eyebrow="Real Stories" title="Cherished Moments, Beautifully Planned" />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={riseIn}
                transition={{ delay: i * 0.1 }}
                className="card p-7 border-blush-200/50"
              >
                <div className="flex text-amber-400 gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => <FaStar key={j} size={13} />)}
                </div>
                <p className="text-charcoal/60 italic leading-relaxed mb-6 text-sm">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-blush-100 flex items-center justify-center text-maroon-700 font-semibold text-sm">
                    {t.name[0] || '♥'}
                  </span>
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

      {/* ─── FAQ ─── */}
      <section className="py-16 sm:py-24 bg-white border-t border-blush-100/60">
        <div className="container-app max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <div className="mt-12">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 sm:py-24">
        <div className="container-app">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={riseIn}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 px-8 py-16 sm:py-20 text-center text-white shadow-lg"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-blush-200 mb-4">
              Ready to Begin Your Story?
            </h2>
            <p className="text-ivory-100/75 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              Join couples planning memorable, stress-free weddings with MagulaPlan, completely free.
            </p>
            <Link to="/register" className="btn-primary bg-white text-maroon-900 hover:bg-blush-50 shadow-md">
              Create Your Free Account <FaArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
