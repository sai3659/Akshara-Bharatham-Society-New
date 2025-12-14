import React from 'react';
import { Section, Card, Button, DecorativeShapes } from '../components/UI';
import { Users, Heart, Star } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: "Priya Sharma",
    role: "Volunteer Coordinator",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    bio: "Priya manages our network of 450+ volunteers across 3 districts."
  },
  {
    name: "Karthik Reddy",
    role: "IT Infrastructure Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    bio: "Ensures all digital classrooms are online and operational."
  },
  {
    name: "Sarah Jenkins",
    role: "Grant Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    bio: "Connecting international donors with impactful local projects."
  },
  {
    name: "Rahul Verma",
    role: "Community Liaison",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    bio: "Works directly with village panchayats to identify needs."
  }
];

const Team: React.FC = () => {
  return (
    <>
      <DecorativeShapes />
      <Section className="bg-slate-50 dark:bg-dark pt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold font-heading text-slate-900 dark:text-white mb-6">Our Extended Team</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Beyond our founders, these are the dedicated individuals working day and night to make our mission a reality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {TEAM_MEMBERS.map((member, i) => (
            <Card key={i} className="flex flex-col group text-center p-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[#06B6D4]/20 group-hover:border-[#06B6D4] transition-colors">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-1">{member.name}</h3>
              <p className="text-[#06B6D4] font-medium text-xs uppercase tracking-wide mb-4">{member.role}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{member.bio}</p>
            </Card>
          ))}
        </div>

        <div className="bg-cta-gradient rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <Heart size={48} className="mx-auto mb-6 text-pink-300 fill-pink-300 animate-pulse" />
            <h2 className="text-3xl font-bold font-heading mb-4">Be Part of Our Story</h2>
            <p className="mb-8 max-w-xl mx-auto opacity-90 text-lg">
              We are always looking for passionate individuals to join our cause.
            </p>
            <Button variant="subscribe" className="bg-white text-purple-600 border-none hover:bg-slate-100">
              Join as a Volunteer
            </Button>
          </div>
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
      </Section>
    </>
  );
};

export default Team;