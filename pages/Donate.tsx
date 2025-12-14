import React, { useState } from 'react';
import { Section, Card, Button, Input, DecorativeShapes } from '../components/UI';
import { Heart, CreditCard, ShieldCheck } from 'lucide-react';

const AMOUNTS = [500, 1000, 2500, 5000];

const Donate: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(Number(e.target.value));
  };

  return (
    <>
      <DecorativeShapes />
      <Section className="bg-slate-50 dark:bg-dark pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-3 rounded-full bg-purple-100 text-purple-600 mb-4">
              <Heart size={32} fill="currentColor" />
            </div>
            <h1 className="text-4xl font-bold font-heading text-slate-900 dark:text-white mb-4">Support Our Cause</h1>
            <p className="text-slate-600 dark:text-slate-400">Your contribution directly funds student scholarships and school infrastructure.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {/* Donation Form */}
             <Card className="md:col-span-2 p-8">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-8">
                   <button 
                    onClick={() => setFrequency('once')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${frequency === 'once' ? 'bg-white dark:bg-dark-card shadow-sm text-purple-600' : 'text-slate-500'}`}
                   >One-time</button>
                   <button 
                     onClick={() => setFrequency('monthly')}
                     className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${frequency === 'monthly' ? 'bg-white dark:bg-dark-card shadow-sm text-purple-600' : 'text-slate-500'}`}
                   >Monthly</button>
                </div>

                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Select Amount (INR)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {AMOUNTS.map(amt => (
                    <button
                      key={amt}
                      onClick={() => { setAmount(amt); setCustomAmount(''); }}
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${amount === amt ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                
                <Input 
                  placeholder="Enter custom amount" 
                  value={customAmount} 
                  onChange={handleCustomChange} 
                  className="mb-8"
                  type="number"
                />

                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Personal Details</h4>
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Input placeholder="Email Address" type="email" />
                </div>

                <Button className="w-full text-lg py-4">
                  Donate ₹{amount} {frequency === 'monthly' && '/ month'}
                </Button>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
                  <ShieldCheck size={14} />
                  <span>Secure payment via Razorpay / Stripe</span>
                </div>
             </Card>

             {/* Impact Preview */}
             <div className="space-y-6">
               <Card className="p-6 bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-none">
                 <h4 className="font-bold text-lg mb-2">Your Impact</h4>
                 <p className="text-cyan-100 text-sm mb-6">With ₹{amount}, you can provide:</p>
                 <ul className="space-y-3">
                   <li className="flex items-center gap-2 text-sm font-medium">
                     <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                     {amount < 1000 ? 'Stationary kit for 5 students' : amount < 3000 ? 'Textbooks for a whole class' : 'Scholarship for 1 student'}
                   </li>
                   <li className="flex items-center gap-2 text-sm font-medium">
                     <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                      Digital literacy access
                   </li>
                 </ul>
               </Card>
               
               <Card className="p-6">
                 <h4 className="font-bold text-slate-900 dark:text-white mb-2">Tax Benefits</h4>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                   Donations to Akshara Bharata Society are exempt from tax under section 80G of the Income Tax Act.
                 </p>
                 <Button variant="outline" size="sm" className="w-full">Download 80G Certificate</Button>
               </Card>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Donate;