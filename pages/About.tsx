import React from 'react';
import { Section, Card, Button, DecorativeShapes } from '../components/UI';
import { NGO_DETAILS } from '../constants';
import { Target, Eye, ShieldCheck, Download, FileText } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <>
      <DecorativeShapes />
      <Section className="bg-slate-50 dark:bg-dark pt-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white mb-6">About Akshara Bharatham</h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Founded in 2010, we are a non-profit organization dedicated to bridging the educational gap in rural India. 
            We believe that quality education is not a privilege, but a fundamental right.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="p-8 text-center border-t-4 border-purple-500">
            <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">Our Mission</h3>
            <p className="text-slate-500 dark:text-slate-400">
              To empower students in rural communities by providing access to quality education, digital tools, and mentorship.
            </p>
          </Card>

          <Card className="p-8 text-center border-t-4 border-[#06B6D4]">
            <div className="w-16 h-16 mx-auto bg-cyan-100 dark:bg-cyan-900/30 text-[#06B6D4] rounded-full flex items-center justify-center mb-6">
              <Eye size={32} />
            </div>
            <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">Our Vision</h3>
            <p className="text-slate-500 dark:text-slate-400">
              A future where every child in India, regardless of their background, has the opportunity to realize their full potential.
            </p>
          </Card>

          <Card className="p-8 text-center border-t-4 border-amber-500">
            <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">Core Values</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Integrity, Transparency, Inclusivity, and Community-First approach drive every decision we make.
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white mb-6">Our History</h2>
            <div className="space-y-8 border-l-2 border-slate-200 dark:border-slate-700 pl-8 relative">
              {[
                { year: '2010', title: 'Inception', desc: 'Started with 5 volunteers teaching in one village school.' },
                { year: '2015', title: 'Expansion', desc: 'Reached 50 schools and launched the scholarship program.' },
                { year: '2018', title: 'Digital Drive', desc: 'Partnered with tech firms to set up the first 5 computer labs.' },
                { year: '2023', title: 'State Award', desc: 'Recognized by Andhra Pradesh Govt for excellence in rural education.' }
              ].map((milestone, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#06B6D4] border-4 border-white dark:border-dark" />
                  <span className="text-sm font-bold text-[#06B6D4] mb-1 block">{milestone.year}</span>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{milestone.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-full min-h-[400px] rounded-3xl overflow-hidden relative group">
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
             <img 
               src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800" 
               alt="Team Group Photo" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
             />
             <div className="absolute bottom-8 left-8 z-20 text-white">
               <p className="font-heading font-bold text-2xl">Together We Serve</p>
             </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white dark:bg-[#0b1220]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
             <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white mb-2">Financial Transparency</h2>
             <p className="text-slate-600 dark:text-slate-400">We value the trust of our donors. View our latest audited reports.</p>
           </div>
           <NavLink to="/financial-reports">
             <Button variant="outline">View All Reports</Button>
           </NavLink>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
           <Card className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                <FileText />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Annual Report 2023-24</h4>
                <p className="text-xs text-slate-500">Audited Financials • PDF</p>
              </div>
              <Button size="sm" variant="ghost" className="ml-auto"><Download size={18} /></Button>
           </Card>
           <Card className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                <FileText />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Impact Report 2023</h4>
                <p className="text-xs text-slate-500">Program Outcomes • PDF</p>
              </div>
              <Button size="sm" variant="ghost" className="ml-auto"><Download size={18} /></Button>
           </Card>
        </div>
      </Section>
    </>
  );
};

export default About;