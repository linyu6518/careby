import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ComingSoonProps {
  onClose: () => void
}

export default function ComingSoon({ onClose }: ComingSoonProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date()
    launchDate.setDate(launchDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Particle animation data
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }))

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Glowing Orbs */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Close Button */}
      <motion.button
        onClick={onClose}
        className="fixed right-6 top-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-400 bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/50 backdrop-blur-md transition hover:bg-yellow-300 hover:border-yellow-300 hover:shadow-yellow-300/60"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="material-symbols-outlined text-2xl font-bold">close</span>
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8 flex justify-center"
        >
          <img
            src="/carebylogo_white.svg"
            alt="Careby Logo"
            className="h-12 w-auto max-w-[80%] sm:h-16 md:h-20"
          />
        </motion.div>

        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="mb-4 text-5xl font-bold text-white sm:text-6xl md:text-7xl">
            Coming Soon
          </h1>
          <div className="mx-auto mb-8 h-1 w-32 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400" />
        </motion.div>

        {/* Description */}
        <motion.p
          className="mb-12 text-lg text-white/80 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We're building something extraordinary. Get ready for the future of healthcare.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          className="mb-12 grid grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Minutes', value: countdown.minutes },
            { label: 'Seconds', value: countdown.seconds },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-white/5 p-4 backdrop-blur-md sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.6)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent" />
              <div className="relative">
                <motion.div
                  className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
                  key={item.value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(item.value).padStart(2, '0')}
                </motion.div>
                <div className="mt-2 text-xs font-medium uppercase tracking-wider text-cyan-300 sm:text-sm">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Email Notification Form */}
        <motion.div
          className="mx-auto max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="mb-4 text-sm text-white/70">
            Be the first to know when we launch
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white placeholder-white/50 backdrop-blur-md transition focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
            <button className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-cyan-500/50 hover:scale-105 active:scale-95">
              Notify Me
            </button>
          </div>
        </motion.div>

        {/* Tech Features Preview */}
        <motion.div
          className="mt-16 grid gap-4 sm:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {[
            { icon: 'psychology', text: 'AI-Powered Care' },
            { icon: 'security', text: 'Secure & Private' },
            { icon: 'speed', text: 'Real-time Monitoring' },
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
              whileHover={{ borderColor: 'rgba(255, 255, 255, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <span className="material-symbols-outlined text-cyan-400">
                {feature.icon}
              </span>
              <span className="text-sm text-white/80">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scanning Line Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 1,
          }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
        </motion.div>
      </div>
    </motion.div>
  )
}

