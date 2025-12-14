import React, { useState } from 'react';
import { Section, Card, Button, Input, Select, DecorativeShapes } from '../components/UI';
import { submitVolunteerApp } from '../services/api';
import { Users, BookOpen, Laptop, HandHeart, CheckCircle } from 'lucide-react';

const VOLUNTEER_ROLES = [
  {
    title: "Teaching Assistant",
    desc: "Help teachers in rural schools with Math & Science.",
    icon: BookOpen,
    commitment: "5-10 hours/week"
  },
  {
    title: "Tech Mentor",
    desc: "Teach basic computer skills and coding to students.",
    icon: Laptop,
    commitment: "Weekends"
  },
  {
    title: "Field Coordinator",
    desc: "Assist in logistics for food and book distribution.",
    icon: Users,
    commitment: "Flexible"
  },
  {
    title: "Fundraiser",
    desc: "Help organize events and online campaigns.",
    icon: HandHeart,
    commitment: "Remote"
  }
];

const Volunteer: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: 'Teaching Assistant', message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitVolunteerApp(formData);
    setSubmitted(true);
  };

  return (
    <>
      <DecorativeShapes />
      <Section className="bg-slate-50 dark:bg-dark pt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold font-heading text-slate-900 dark:text-white mb-6">Join Our Volunteer Family</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Make a real difference in the lives of students. Whether you can spare a few hours a week or want to lead a project, we have a place for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {VOLUNTEER_ROLES.map((role, i) => (
            <Card key={i} className="p-6 text-center hover:border-purple-400 transition-colors">
              <div className="w-14 h-14 mx-auto rounded-full bg-cta-gradient text-white flex items-center justify-center mb-4">
                <role.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{role.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{role.desc}</p>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                {role.commitment}
              </span>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Volunteer Application</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                  <Input placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                </div>
                <Input placeholder="Email Address" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                <Select 
                  label="Preferred Role"
                  options={VOLUNTEER_ROLES.map(r => ({ value: r.title, label: r.title }))}
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                />
                <textarea 
                  placeholder="Why do you want to volunteer? (Optional)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#9C4DFF] outline-none h-32"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
                <Button className="w-full">Submit Application</Button>
                <p className="text-xs text-center text-slate-400">We conduct background checks for all child-facing roles.</p>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Application Received!</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Thank you for your interest. Our volunteer coordinator will reach out to you within 3-5 business days.
                </p>
              </div>
            )}
          </Card>
        </div>
      </Section>
    </>
  );
};

export default Volunteer;