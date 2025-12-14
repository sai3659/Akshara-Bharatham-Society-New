import React from 'react';
import { Section, Card, Button, Input, DecorativeShapes } from '../components/UI';
import { NGO_DETAILS } from '../constants';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <>
      <DecorativeShapes />
      <Section className="bg-slate-50 dark:bg-dark pt-24 pb-0">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold font-heading text-slate-900 dark:text-white mb-6">Get in Touch</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Have questions about our programs or want to get involved? We'd love to hear from you.
          </p>
        </div>
      </Section>

      <div className="grid lg:grid-cols-2">
        {/* Form Side */}
        <div className="p-8 md:p-16 bg-white dark:bg-dark-card flex items-center justify-center">
          <div className="w-full max-w-lg">
            <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Name" />
                <Input placeholder="Phone" />
              </div>
              <Input placeholder="Email" type="email" />
              <textarea 
                placeholder="How can we help?"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#9C4DFF] focus:border-transparent outline-none transition-all resize-none h-32"
              ></textarea>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
        </div>

        {/* Map & Info Side */}
        <div className="relative h-[600px] lg:h-auto bg-slate-200">
          {/* Embed Map Iframe */}
          <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0, minHeight: '400px' }}
            loading="lazy" 
            allowFullScreen 
            src={`https://www.google.com/maps?q=${NGO_DETAILS.coordinates.lat},${NGO_DETAILS.coordinates.lng}&hl=es;z=14&output=embed`}
            title="NGO Location"
            className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
          
          {/* Overlay Info Card positioned specifically above details */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
             {/* This space is intentionally empty for visual gradient */}
          </div>
        </div>
      </div>

      {/* Explicit Contact Details Bar below the map section */}
      <div className="bg-[#0f1724] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-8">
           <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#06B6D4]">
                <MapPin />
              </div>
              <h4 className="font-bold mb-2">Visit Us</h4>
              <p className="text-slate-400 text-sm">{NGO_DETAILS.location}</p>
           </div>
           
           <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#06B6D4]">
                <Phone />
              </div>
              <h4 className="font-bold mb-2">Call Us</h4>
              <p className="text-slate-400 text-sm">{NGO_DETAILS.phone}</p>
           </div>

           <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#06B6D4]">
                <Mail />
              </div>
              <h4 className="font-bold mb-2">Email Us</h4>
              <p className="text-slate-400 text-sm">{NGO_DETAILS.email}</p>
           </div>

           <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#06B6D4]">
                <Clock />
              </div>
              <h4 className="font-bold mb-2">Working Hours</h4>
              <p className="text-slate-400 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
           </div>
        </div>
      </div>
    </>
  );
};

export default Contact;