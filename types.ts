export interface Founder {
  id: string;
  name: string;
  role: string;
  specialization: string;
  quote: string;
  bio: string;
  experience: string;
  tags: string[];
  image: string;
}

export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  purpose: string;
  founderId?: string;
  date: string;
  time: string;
  message: string;
  isUrgent: boolean;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: any;
}