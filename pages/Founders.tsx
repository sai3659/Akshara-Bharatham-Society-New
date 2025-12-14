import React, { useState } from 'react';
import { Section, Card, Button, DecorativeShapes } from '../components/UI';
import { FOUNDERS } from '../constants';
import { BookingModal } from '../components/BookingModal';
import { Linkedin, Mail, Calendar, ExternalLink } from 'lucide-react';

const Founders: React.FC = () => {
  const [selectedFounder, setSelectedFounder] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBook = (id: string) => {
    setSelectedFounder(id);
    setIsModalOpen(true);
  };

  return (
    <>
      <DecorativeShapes />
      <Section className="pt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white mb-6">Meet Our Leadership</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Driven by passion and expertise, our team is committed to transforming education in Andhra Pradesh. 
            Connect with us to discuss partnerships, volunteering, or guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FOUNDERS.map(founder => (
            <Card key={founder.id} className="flex flex-col h-full group">
              <div className="relative h-96 overflow-hidden rounded-t-[24px]">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 z-20 text-white w-full pr-4">
                  <h3 className="text-2xl font-bold font-heading leading-tight mb-1">{founder.name}</h3>
                  <p className="text-[#06B6D4] font-medium text-sm uppercase tracking-wider">{founder.role}</p>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow relative bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm">
                <blockquote className="italic text-slate-600 dark:text-slate-300 mb-4 border-l-4 border-purple-400 pl-4 text-sm">
                  "{founder.quote}"
                </blockquote>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {founder.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto space-y-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3">
                    {founder.bio}
                  </p>
                  <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button onClick={() => handleBook(founder.id)} className="flex-1 gap-2 text-sm">
                      <Calendar size={16} /> Book Time
                    </Button>
                    <Button variant="ghost" className="px-3" title="LinkedIn Profile">
                       <Linkedin size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        founders={FOUNDERS} 
        preselectedFounderId={selectedFounder}
      />
    </>
  );
};

export default Founders;