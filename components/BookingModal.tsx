import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, CheckCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Input, Select } from './UI';
import { BookingFormData, Founder } from '../types';
import { submitBooking } from '../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  founders: Founder[];
  preselectedFounderId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, founders, preselectedFounderId }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    purpose: 'Partnership',
    founderId: preselectedFounderId || '',
    date: '',
    time: '',
    message: '',
    isUrgent: false
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }
    setLoading(true);
    const success = await submitBooking({
      ...formData,
      date: selectedDate,
      time: selectedTime
    });
    setLoading(false);
    if (success) {
      setStep('success');
    }
  };

  // Calendar Helpers
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const handlePrevMonth = () => setCurrentDate(new Date(year, currentDate.getMonth() - 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, currentDate.getMonth() + 1));

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 17; i++) {
      slots.push(`${i}:00`);
      slots.push(`${i}:30`);
    }
    return slots;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      {/* Increased max-width to 4xl for bigger modal */}
      <div className="relative bg-white dark:bg-dark-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 md:p-10 animate-in fade-in zoom-in-95 duration-300 custom-scrollbar border border-slate-100 dark:border-slate-700">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
          <X size={24} />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4 shadow-lg shadow-purple-500/20">
                <CalendarIcon size={32} />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Book an Appointment</h3>
              <p className="text-slate-500 dark:text-slate-400">Schedule a one-on-one meeting with our leadership team.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Left Column: Form Details */}
              <div className="space-y-5">
                <h4 className="font-semibold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">Your Details</h4>
                <div className="grid grid-cols-2 gap-4">
                   <Input required name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                   <Input required name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                </div>
                <Input required type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                
                <Select 
                  name="founderId" 
                  value={formData.founderId} 
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Any Staff Member' },
                    ...founders.map(f => ({ value: f.id, label: f.name }))
                  ]}
                />
                
                <textarea 
                  name="message"
                  placeholder="Brief message about the meeting topic..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#9C4DFF] focus:border-transparent outline-none transition-all resize-none h-32 placeholder:text-slate-400"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <input type="checkbox" name="isUrgent" id="urgent" checked={formData.isUrgent} onChange={(e) => setFormData({...formData, isUrgent: e.target.checked})} className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer" />
                  <label htmlFor="urgent" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">Mark as urgent priority</label>
                </div>
              </div>

              {/* Right Column: Visual Calendar */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                 <h4 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                   <Clock size={18} className="text-purple-500"/> Select Date & Time
                 </h4>
                 
                 {/* Custom Calendar UI */}
                 <div className="mb-6 bg-white dark:bg-dark-card rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                      <button type="button" onClick={handlePrevMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><ChevronLeft size={18} /></button>
                      <span className="font-bold text-slate-800 dark:text-white">{monthName} {year}</span>
                      <button type="button" onClick={handleNextMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><ChevronRight size={18} /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-3 text-slate-400 font-bold uppercase tracking-wide">
                      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({length: firstDay}).map((_, i) => <div key={`empty-${i}`} />)}
                      {Array.from({length: daysInMonth}).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${year}-${String(currentDate.getMonth()+1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const isSelected = selectedDate === dateStr;
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => { setSelectedDate(dateStr); setSelectedTime(''); }}
                            className={`h-9 w-full rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                              isSelected 
                                ? 'bg-cta-gradient text-white shadow-md scale-105' 
                                : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                 </div>

                 {/* Time Slots */}
                 <div className={`transition-all duration-500 overflow-hidden ${selectedDate ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <p className="text-xs text-slate-500 mb-3 font-semibold uppercase tracking-wider">Available Slots</p>
                   <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pr-1">
                      {generateTimeSlots().map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`px-2 py-2 rounded-lg text-xs font-bold border transition-all duration-200 ${
                            selectedTime === time
                              ? 'border-purple-500 bg-purple-500 text-white shadow-md transform scale-105'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-card hover:border-purple-400 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                   </div>
                 </div>
              </div>
            </div>

            <Button type="submit" disabled={loading} size="lg" className="w-full text-lg shadow-xl">
              {loading ? 'Scheduling...' : 'Confirm Appointment'}
            </Button>
            
            <p className="text-xs text-center text-slate-400 mt-4">
              By booking, you agree to receive automated email/SMS confirmations.
            </p>
          </form>
        ) : (
          <div className="text-center py-16 animate-in slide-in-from-bottom-5 duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Booking Confirmed!</h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl max-w-md mx-auto mb-8 border border-slate-100 dark:border-slate-700">
               <p className="text-slate-600 dark:text-slate-300 mb-2">
                 We have scheduled your meeting on:
               </p>
               <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">{selectedDate} at {selectedTime}</p>
               <p className="text-sm text-slate-500">
                 A confirmation email has been sent to <span className="font-semibold text-slate-700 dark:text-slate-200">{formData.email}</span>.
               </p>
            </div>
            <Button onClick={onClose} variant="outline" className="min-w-[200px]">Close Window</Button>
          </div>
        )}
      </div>
    </div>
  );
};