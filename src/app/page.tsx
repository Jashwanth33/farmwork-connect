'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Tractor, Sprout, Truck, Users, Phone, ArrowRight, 
  Star, Shield, Clock, MapPin, ChevronRight, Wheat,
  Droplets, CheckCircle2, Menu, X, Leaf, Package
} from 'lucide-react';

const FEATURES = [
  {
    icon: Sprout,
    title: 'All-Crop Support',
    description: 'Rice, wheat, sugarcane, vegetables, fruits - we cover every crop type',
  },
  {
    icon: Users,
    title: 'Verified Workers',
    description: 'Skilled laborers for planting, harvesting, and maintenance',
  },
  {
    icon: Tractor,
    title: 'Equipment Rental',
    description: 'Tractors, harvesters, sprayers at affordable rates',
  },
  {
    icon: Truck,
    title: 'Transport Services',
    description: 'Crop transport to markets, input delivery',
  },
];

const STEPS = [
  { num: '01', title: 'Select Service', desc: 'Choose crop type and service category' },
  { num: '02', title: 'Find Providers', desc: 'View nearby workers and equipment' },
  { num: '03', title: 'Book & Pay', desc: 'Confirm booking with secure payment' },
  { num: '04', title: 'Get Work Done', desc: 'Track and rate the service' },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">FarmWork Connect</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#services" className="text-gray-600 hover:text-primary-600 transition">
                Services
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition">
                How It Works
              </Link>
              <Link href="#providers" className="text-gray-600 hover:text-primary-600 transition">
                For Providers
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link 
                href="/login"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                Login
              </Link>
              <Link 
                href="/register"
                className="gradient-bg text-white px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
              >
                Get Started
              </Link>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4">
            <div className="flex flex-col gap-4">
              <Link href="#services" className="text-gray-600 py-2">Services</Link>
              <Link href="#how-it-works" className="text-gray-600 py-2">How It Works</Link>
              <Link href="#providers" className="text-gray-600 py-2">For Providers</Link>
              <Link href="/login" className="text-primary-600 font-medium py-2">Login</Link>
              <Link href="/register" className="gradient-bg text-white px-5 py-2.5 rounded-lg font-medium text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                Trusted by 10,000+ Farmers
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Book Farm Workers,{' '}
                <span className="gradient-text">Equipment</span> & Rural Services
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with verified laborers, rent equipment, and book transport 
                for all crop types. Fast, reliable, and affordable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/register?role=farmer"
                  className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  Book a Service <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/register?role=provider"
                  className="bg-white border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition flex items-center justify-center gap-2"
                >
                  Register as Provider
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">4.9/5 from 5,000+ reviews</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 gradient-bg opacity-10 rounded-3xl transform rotate-6" />
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
                    <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                      <Tractor className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Tractor Ploughing</p>
                      <p className="text-sm text-gray-500">₹500/acre</p>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-primary-600" />
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-earth-500 rounded-xl flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Pesticide Spraying</p>
                      <p className="text-sm text-gray-500">₹400/acre</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-earth-600 rounded-xl flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Rice Harvesting</p>
                      <p className="text-sm text-gray-500">₹800/acre</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-earth-700 rounded-xl flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Crop Transport</p>
                      <p className="text-sm text-gray-500">₹15/km</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 animate-float">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">24hr Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need for{' '}
              <span className="gradient-text">Farming Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From land preparation to harvest and transport - all services in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <div 
                key={i}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition group"
              >
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Service Categories */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Browse Services</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { icon: Tractor, label: 'Land Preparation', count: 4 },
                { icon: Leaf, label: 'Sowing', count: 3 },
                { icon: Droplets, label: 'Maintenance', count: 4 },
                { icon: Wheat, label: 'Harvesting', count: 3 },
                { icon: Package, label: 'Post Harvest', count: 2 },
                { icon: Truck, label: 'Transport', count: 4 },
              ].map((cat, i) => (
                <Link 
                  key={i}
                  href={`/search?category=${cat.label.toUpperCase().replace(' ', '_')}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-primary-500 hover:shadow-md transition"
                >
                  <cat.icon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                  <p className="font-medium text-sm">{cat.label}</p>
                  <p className="text-xs text-gray-500">{cat.count} services</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Book in <span className="gradient-text">4 Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get farm services delivered to your field in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight className="hidden md:block absolute top-10 -right-4 w-8 h-8 text-primary-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of farmers who have streamlined their operations with FarmWork Connect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition"
            >
              Get Started Free
            </Link>
            <a 
              href="tel:+919876543210"
              className="bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">FarmWork Connect</span>
              </div>
              <p className="text-gray-400">
                Book Farm Workers, Equipment, and Rural Services Anytime
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Labor Booking</li>
                <li>Equipment Rental</li>
                <li>Transport Services</li>
                <li>Crop Advisory</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>FAQs</li>
                <li>Language</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Chennai, Tamil Nadu
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FarmWork Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
