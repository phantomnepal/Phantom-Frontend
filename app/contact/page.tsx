"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, ArrowUpRight } from "lucide-react";
import { FaTiktok, FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "info@phantom.com.np",
      href: "mailto:info@phantom.com.np",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977 (986)3942274",
      href: "tel:+9779863942274",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kathmandu, Nepal",
      href: "https://maps.app.goo.gl/MC1qoKfJvkrohWAd6",
    },
  ];

  const socialLinks = [
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@phantom_technology02?is_from_webapp=1&sender_device=pc",
      label: "Tiktok",
    },
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/company/phantom_technologies/",
      label: "LinkedIn",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/phantom.nepal?igsh=MTN5aGg2YmpwNDJhZg==",
      label: "Instagram",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf8f6] text-stone-800 font-sans">
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-[0.2em] text-[#A10F1A] uppercase"
            >
              Get in Touch
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 mb-6">
              Let's start a{" "}
              <span className="font-medium text-transparent bg-clip-text  bg-[#A10F1A]">
                conversation
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-stone-600 leading-relaxed font-light">
              Have a project in mind or just want to say hello? We'd love to
              hear from you. Fill out the form below and I'll get back to you as
              soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 space-y-8"
            >
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group flex items-start space-x-4 p-5 rounded-2xl bg-white border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(161,15,26,0.08)] transition-all duration-500 hover:border-[#A10F1A]/20"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#A10F1A]/5 to-[#DC2626]/5 flex items-center justify-center text-[#A10F1A] group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={20} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium tracking-wider text-stone-400 mb-1 uppercase">
                        {item.label}
                      </p>
                      <p className="text-stone-800 font-medium group-hover:text-[#A10F1A] transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="text-stone-300 group-hover:text-[#A10F1A] transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      size={16}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-stone-200">
                <p className="text-xs font-semibold tracking-wider text-stone-500 mb-4 uppercase">
                  Follow Us
                </p>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-11 h-11 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-white hover:bg-[#A10F1A] hover:border-[#A10F1A] transition-all duration-300 shadow-sm"
                      aria-label={social.label}
                    >
                      <social.icon size={18} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative Element */}
              <div className="hidden lg:block pt-4">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[#A10F1A]/10 via-[#DC2626]/5 to-orange-50">
                  <div className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1683120889995-b6a309252981?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-30 mix-blend-multiply" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8 backdrop-blur-sm bg-white/30 rounded-2xl border border-white/50">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#A10F1A]">
                        <Mail size={22} strokeWidth={1.5} />
                      </div>
                      <p className="text-xs font-semibold tracking-wider text-stone-600 uppercase mb-1">
                        Response time
                      </p>
                      <p className="text-3xl font-light text-stone-900">24h</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-8"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-stone-100"
              >
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div className="relative group">
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
                        focusedField === "name" || formData.name
                          ? "-top-2.5 text-xs text-[#A10F1A] bg-white px-1"
                          : "top-3.5 text-stone-400"
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:border-[#A10F1A] focus:ring-4 focus:ring-[#A10F1A]/5 outline-none transition-all duration-300 bg-transparent text-stone-800 placeholder-transparent"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
                        focusedField === "email" || formData.email
                          ? "-top-2.5 text-xs text-[#A10F1A] bg-white px-1"
                          : "top-3.5 text-stone-400"
                      }`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:border-[#A10F1A] focus:ring-4 focus:ring-[#A10F1A]/5 outline-none transition-all duration-300 bg-transparent text-stone-800"
                      required
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="relative mb-6 group">
                  <label
                    htmlFor="subject"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
                      focusedField === "subject" || formData.subject
                        ? "-top-2.5 text-xs text-[#A10F1A] bg-white px-1"
                        : "top-3.5 text-stone-400"
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:border-[#A10F1A] focus:ring-4 focus:ring-[#A10F1A]/5 outline-none transition-all duration-300 bg-transparent text-stone-800"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="relative mb-8 group">
                  <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
                      focusedField === "message" || formData.message
                        ? "-top-2.5 text-xs text-[#A10F1A] bg-white px-1"
                        : "top-3.5 text-stone-400"
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:border-[#A10F1A] focus:ring-4 focus:ring-[#A10F1A]/5 outline-none transition-all duration-300 bg-transparent text-stone-800 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-10 py-4 bg-[#A10F1A] text-white rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-[#8B0D16] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group shadow-lg shadow-[#A10F1A]/20 hover:shadow-xl hover:shadow-[#A10F1A]/30"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                      />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-stone-500">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A10F1A]" />
                  <span className="font-light">
                    Usually responds within 24h
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A10F1A]/60" />
                  <span className="font-light">End-to-end encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
