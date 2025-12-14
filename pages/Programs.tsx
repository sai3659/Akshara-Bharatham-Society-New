import React, { useState } from 'react';
import { Section, Card, Button, Input, Select, DecorativeShapes } from '../components/UI';
import { PROGRAMS } from '../constants';
import { Download, PlayCircle, FileText } from 'lucide-react';

const Programs: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', ...Array.from(new Set(PROGRAMS.map(p => p.category)))];

  const filteredPrograms = PROGRAMS.filter(p => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <DecorativeShapes />
      <Section className="pt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold font-heading text-slate-900 dark:text-white mb-4">Our Programs</h1>
          <p className="text-slate-600 dark:text-slate-400">Holistic interventions designed to uplift rural education standards.</p>
        </div>

        {/* Filters */}
        <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-md p-6 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center justify-between border border-white/40 dark:border-slate-700">
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === cat 
                    ? 'bg-cta-gradient text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="w-full md:w-64">
             <Input placeholder="Search programs..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map(prog => (
            <Card key={prog.id} className="flex flex-col">
              <img src={prog.image} alt={prog.title} className="w-full h-56 object-cover rounded-t-[24px]" />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">{prog.title}</h3>
                  <span className="bg-cyan-50 dark:bg-cyan-900/30 text-[#06B6D4] text-xs font-bold px-2 py-1 rounded">{prog.category}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 mb-4">{prog.description}</p>
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-semibold text-purple-600 mb-4">{prog.impact}</p>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1">Support</Button>
                    <Button variant="outline" size="sm" className="flex-1">Volunteer</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Resources Section */}
      <Section className="bg-[#F2FEFF]/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
             <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white mb-2">Resources Center</h2>
             <p className="text-slate-600 dark:text-slate-400">Download reports, training materials, and guides.</p>
           </div>
           <Button variant="outline">View All Resources</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 flex items-center gap-4 hover:border-purple-300 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
              <FileText />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Annual Report 2023</h4>
              <p className="text-xs text-slate-500">PDF • 4.5 MB</p>
            </div>
            <Download className="ml-auto text-slate-400" size={20} />
          </Card>

          <Card className="p-6 flex items-center gap-4 hover:border-purple-300 transition-colors cursor-pointer">
             <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
              <PlayCircle />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Volunteer Training</h4>
              <p className="text-xs text-slate-500">Video Series • 45 mins</p>
            </div>
            <Download className="ml-auto text-slate-400" size={20} />
          </Card>

           <Card className="p-6 flex items-center gap-4 hover:border-purple-300 transition-colors cursor-pointer">
             <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 shrink-0">
              <FileText />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Student Worksheet Kit</h4>
              <p className="text-xs text-slate-500">ZIP • 12 MB</p>
            </div>
            <Download className="ml-auto text-slate-400" size={20} />
          </Card>
        </div>
      </Section>
    </>
  );
};

export default Programs;