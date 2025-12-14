import React from 'react';
import { Section, Card, DecorativeShapes } from '../components/UI';
import { GALLERY_IMAGES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '2019', students: 2000 },
  { name: '2020', students: 4500 },
  { name: '2021', students: 7800 },
  { name: '2022', students: 11000 },
  { name: '2023', students: 15500 },
];

const Impact: React.FC = () => {
  return (
    <>
      <DecorativeShapes />
      <Section className="bg-slate-50 dark:bg-dark pt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold font-heading text-slate-900 dark:text-white mb-6">Our Impact</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Transparency and results are at the core of Akshara Bharatham Society. Here is how we've grown over the years.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
           <Card className="p-8 h-80">
             <h3 className="font-bold text-xl mb-6 text-slate-900 dark:text-white">Students Supported (Year over Year)</h3>
             <ResponsiveContainer width="100%" height="80%">
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="students" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9C4DFF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#9C4DFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </BarChart>
             </ResponsiveContainer>
           </Card>
           
           <div className="space-y-6">
              <div className="p-6 bg-white dark:bg-dark-card rounded-2xl shadow-sm border-l-4 border-[#06B6D4]">
                 <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">92%</h4>
                 <p className="text-slate-500 dark:text-slate-400">Pass percentage of students in our remedial tutoring program, compared to the regional average of 65%.</p>
              </div>
              <div className="p-6 bg-white dark:bg-dark-card rounded-2xl shadow-sm border-l-4 border-purple-500">
                 <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">1:40</h4>
                 <p className="text-slate-500 dark:text-slate-400">Our volunteer-to-student ratio, ensuring personalized attention for every child.</p>
              </div>
              <div className="p-6 bg-white dark:bg-dark-card rounded-2xl shadow-sm border-l-4 border-pink-500">
                 <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">₹1.2 Cr</h4>
                 <p className="text-slate-500 dark:text-slate-400">Worth of scholarships distributed since inception.</p>
              </div>
           </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white mb-8 text-center">Gallery from the Field</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {GALLERY_IMAGES.map((img, i) => (
               <div key={i} className={`relative overflow-hidden rounded-xl group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <img src={img} alt="Gallery" className="w-full h-full object-cover min-h-[200px] transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
               </div>
             ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Impact;