import React from 'react';
import { Section, Card, Button, DecorativeShapes } from '../components/UI';
import { EVENTS } from '../constants';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';

const Events: React.FC = () => {
  return (
    <>
      <DecorativeShapes />
      <Section className="pt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold font-heading text-slate-900 dark:text-white mb-6">Upcoming Events</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Join us at our upcoming gatherings, fundraisers, and community drives.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {EVENTS.map((event) => (
            <Card key={event.id} className="flex flex-col md:flex-row overflow-hidden group">
              <div className="md:w-2/5 relative overflow-hidden min-h-[200px] md:min-h-full">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-lg text-center shadow-sm">
                  <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                    {event.date.split(' ')[0]}
                  </span>
                  <span className="block text-xl font-bold text-purple-600">
                    {event.date.split(' ')[1].replace(',', '')}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col justify-center flex-1 bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm">
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Calendar size={16} className="text-[#06B6D4]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin size={16} className="text-[#06B6D4]" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm line-clamp-2">
                  {event.description}
                </p>
                
                <div className="mt-auto">
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    RSVP Now <ExternalLink size={14} className="ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4">Want to host an event for us?</p>
          <Button>Contact Event Coordinator</Button>
        </div>
      </Section>
    </>
  );
};

export default Events;