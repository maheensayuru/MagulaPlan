import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaHeart, FaStar, FaArrowRight, FaPlay,
  FaMapMarkerAlt, FaStore, FaChevronDown,
} from 'react-icons/fa'
import { vendorsApi, categoriesApi } from '../services/api'
import heroGolden from '../assets/hero-golden.jpg'
import SectionHeading from '../components/ui/SectionHeading'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import Accordion from '../components/ui/Accordion'
import { LotusMark, SectionDivider, EditorialEyebrow } from '../components/ui/Ornament'
import { riseIn, wordContainer, wordItem, viewportOnce, useMagneticHover } from '../lib/motion'
import { heroWords, heroSocials, placeholderTestimonials, iconForCategory, features, faqs } from '../constants/landing'

export default function Landing() {
  const [vendorCount, setVendorCount] = useState(null)
  const [categories, setCategories] = useState([])
  const { ref: ctaRef, onMouseMove: ctaMove, onMouseLeave: ctaLeave } = useMagneticHover(10)

  useEffect(() => {
    let cancelled = false
    vendorsApi.list().then((data) => {
      if (!cancelled && Array.isArray(data)) setVendorCount(data.length)
    }).catch(() => {
      // no real count available — the stat card falls back to a placeholder
    })
    categoriesApi.list().then((data) => {
      if (!cancelled && Array.isArray(data)) setCategories(data)
    }).catch(() => {
      // categories will simply render empty until the API responds
    })
    return () => { cancelled = true }
  }, [])

  return (
    <div>
      {/* HERO — one continuous photo spanning the full width, faded to cream on the
          left via a gradient mask so the text sits directly on the image, not beside
          it. The fixed, transparent-until-scrolled Navbar floats on top of this. */}
      <section className="relative overflow-hidden min-h-[100vh]">
        <motion.img
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          src={heroGolden}
          alt="Sri Lankan couple in traditional Kandyan wedding attire at golden hour"
          className="absolute inset-0 h-full w-full object-cover object-[68%_28%]"
        />
        {/* cream-to-transparent mask: opaque where the text sits, fading away over the couple */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/95 sm:via-ivory/90 to-ivory/0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/40 via-transparent to-transparent" />

        {/* vertical social rail, echoing the reference's left-margin icon column */}
        <div className="hidden lg:flex flex-col items-center gap-5 absolute left-10 top-1/2 -translate-y-1/2 z-10">
          <span className="h-16 w-px bg-gold-600/30" />
          {heroSocials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="h-9 w-9 rounded-full border border-gold-600/30 flex items-center justify-center text-gold-700 hover:bg-gold-700 hover:text-white hover:border-gold-700 transition-colors"
            >
              <s.icon size={13} />
            </a>
          ))}
          <span className="h-16 w-px bg-gold-600/30" />
        </div>

        <div className="relative z-10 container-app min-h-[100vh] flex items-center pt-24 pb-20">
          <div className="lg:pl-14 max-w-lg">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <EditorialEyebrow className="mb-6">Sri Lanka's Wedding Platform</EditorialEyebrow>
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="show"
              variants={wordContainer}
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-display font-medium leading-[1.18] text-charcoal mb-7"
            >
              {heroWords.map((w, i) => (
                <motion.span key={i} variants={wordItem} className="inline-block mr-[0.28em]">
                  {w}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-charcoal/60 text-base leading-relaxed mb-10"
            >
              From Poruwa to reception — discover vendors, track your budget, manage guests, and send WhatsApp invitations.
              No more endless Facebook and Instagram searching.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                ref={ctaRef}
                onMouseMove={ctaMove}
                onMouseLeave={ctaLeave}
                to="/register"
                className="btn-primary transition-transform duration-200 ease-out"
              >
                Start Planning Free
              </Link>
              <Link to="/vendors" className="btn-outline">
                <FaPlay size={9} /> Explore Vendors
              </Link>
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.a
          href="#features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          aria-label="Scroll to features"
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 h-11 w-11 rounded-full border border-gold-600/40 items-center justify-center text-gold-700 animate-float"
        >
          <FaChevronDown size={13} />
        </motion.a>
      </section>

      {/* STATS */}
      <section className="container-app -mt-6 sm:mt-4 relative z-10 pb-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={FaStore}
            label="Verified Vendors"
            value={vendorCount ?? 0}
            suffix="+"
            display={vendorCount === null ? 'X+' : undefined}
            color="ink"
          />
          <StatCard icon={FaHeart} label="Weddings Planned" display="X+" color="gold" />
          <StatCard icon={FaMapMarkerAlt} label="Districts Covered" value={25} color="ink" />
          <StatCard icon={FaStar} label="Average Rating" display="X.X / 5" color="gold" />
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
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={riseIn}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="card card-hover p-7"
              >
                <div className="h-12 w-12 rounded-xl2 bg-ink-gradient flex items-center justify-center text-gold-300 mb-5">
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
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl2 border border-charcoal/8 hover:border-gold-300 hover:shadow-gold hover:-translate-y-1 transition-all duration-300 text-center bg-ivory-50"
                  >
                    <div className="h-12 w-12 rounded-full bg-gold-50 flex items-center justify-center text-gold-700">
                      <Icon size={20} />
                    </div>
                    <p className="text-sm font-semibold text-charcoal">{cat.categoryName}</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/vendors" className="btn-outline">
              View All Categories <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* SRI LANKAN FEATURES BANNER */}
      <section className="py-20 sm:py-28  bg-ink-gradient relative overflow-hidden">
        <div className="container-app relative grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={riseIn}>
            <EditorialEyebrow tone="light" className="mb-5">Rooted In Tradition</EditorialEyebrow>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#c29629] mb-6">Built For Sri Lankan Wedding Traditions</h2>
            <ul className="space-y-4">
              {[
                'Auspicious Nekath time tracking with astrologer coordination',
                'Complete Poruwa ceremony checklists and vendor booking',
                'Kandyan, Low Country & Western theme planning tools',
                'Bride-side & groom-side guest and timeline management',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-ivory-100/80">
                  <span className="h-6 w-6 rounded-full bg-gold-500 flex items-center justify-center shrink-0 mt-0.5 text-charcoal text-xs font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce} transition={{ duration: 0.6 }} className="rounded-xl3 overflow-hidden shadow-soft border-8 border-white/10 flex items-center justify-center bg-white/5 h-80">
            <LotusMark className="h-24 w-24 text-gold-300/70" />
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 sm:py-28 scroll-mt-24">
        <div className="container-app">
          <SectionHeading eyebrow="Real Couples, Real Stories" title="Loved By Couples Across Sri Lanka" />
          <SectionDivider className="mt-8 mb-2" />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {placeholderTestimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={riseIn}
                transition={{ delay: i * 0.1 }}
                className="card p-7"
              >
                <div className="flex text-gold-300 gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => <FaStar key={j} size={13} />)}
                </div>
                <p className="text-charcoal/50 italic leading-relaxed mb-6">"Your story could be here."</p>
                <div className="flex items-center gap-3">
                  <span className="h-11 w-11 rounded-full bg-gold-50 flex items-center justify-center text-gold-700 font-semibold text-sm">?</span>
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
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={riseIn}
            className="relative rounded-xl3 overflow-hidden bg-ink-gradient px-8 py-16 sm:py-20 text-center"
          >
            <Badge variant="gold" className="mb-5">Free to get started</Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#c29629] mb-4">Your Perfect Wedding Starts Here</h2>
            <p className="text-ivory-100/70 max-w-lg mx-auto mb-8">
              Join Sri Lankan couples planning smarter, less stressful weddings with MagulaPlan.
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
