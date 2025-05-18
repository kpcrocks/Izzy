'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to send message');
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('There was a problem sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] py-16">
      <div className="max-w-4xl mx-auto px-8">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-black mb-4">Contact Us</h1>
          <p className="text-black/70">We'd love to hear from you. Get in touch with us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-serif text-black mb-8">Get in Touch</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-serif text-black mb-2">Email</h3>
                <p className="text-black/70">hello@izzles.com</p>
              </div>

              <div>
                <h3 className="text-lg font-serif text-black mb-2">Phone</h3>
                <p className="text-black/70">+1 (555) 123-4567</p>
              </div>

              <div>
                <h3 className="text-lg font-serif text-black mb-2">Hours</h3>
                <p className="text-black/70">Monday - Friday: 9am - 5pm PST</p>
              </div>

              <div>
                <h3 className="text-lg font-serif text-black mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-[#1a2639] hover:text-[#1a2639]/80">Instagram</a>
                  <a href="#" className="text-[#1a2639] hover:text-[#1a2639]/80">Facebook</a>
                  <a href="#" className="text-[#1a2639] hover:text-[#1a2639]/80">Twitter</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm uppercase tracking-wider text-black/70 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#1a2639]/10 bg-white focus:outline-none focus:border-[#1a2639] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm uppercase tracking-wider text-black/70 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#1a2639]/10 bg-white focus:outline-none focus:border-[#1a2639] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm uppercase tracking-wider text-black/70 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-[#1a2639]/10 bg-white focus:outline-none focus:border-[#1a2639] transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1a2639] text-white py-4 uppercase tracking-wider hover:bg-[#1a2639]/80 transition-colors"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 