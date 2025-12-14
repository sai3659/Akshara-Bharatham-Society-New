import React from 'react';
import { Section, DecorativeShapes } from '../components/UI';
import { GALLERY_IMAGES } from '../constants';

const Gallery: React.FC = () => {
  return (
    <>
      <DecorativeShapes />
      <Section className="pt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold font-heading text-slate-900 dark:text-white mb-6">Our Photo Gallery</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A visual journey of our work, the smiles we've ignited, and the communities we've served.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, index) => (
            <div key={index} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
              <img 
                src={img} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  Moments of Impact
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm">Follow us on Instagram for daily updates</p>
        </div>
      </Section>
    </>
  );
};

export default Gallery;