'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2, DollarSign, Building2, Mail, MessageSquare } from 'lucide-react';

interface AdvertiseFormProps {
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  company: string;
  email: string;
  budget: string;
  message: string;
}

const BUDGET_OPTIONS = [
  { value: '$500-$1,000', label: '$500 - $1,000' },
  { value: '$1,000-$5,000', label: '$1,000 - $5,000' },
  { value: '$5,000-$10,000', label: '$5,000 - $10,000' },
  { value: '$10,000+', label: '$10,000+' },
];

export default function AdvertiseForm({ onSubmit }: AdvertiseFormProps) {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    email: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.company || !formData.email || !formData.budget) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/advertise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        if (onSubmit) onSubmit(formData);
        setFormData({ company: '', email: '', budget: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 bg-green-500/10 border border-green-500/20 rounded-xl">
        <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Thank You!</h3>
        <p className="text-gray-400">
          We&apos;ve received your inquiry and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Company Name <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company or project name"
            className="w-full pl-10 pr-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Email Address <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className="w-full pl-10 pr-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
          />
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Monthly Budget <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 appearance-none"
          >
            <option value="">Select your budget range</option>
            {BUDGET_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Tell us about your campaign
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-gray-500" size={18} />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="What would you like to promote? Any specific goals or target audience?"
            rows={4}
            className="w-full pl-10 pr-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/40 resize-none"
          />
        </div>
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send size={18} />
            <span>Submit Inquiry</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        We typically respond within 24 hours. All campaigns are reviewed for quality and relevance.
      </p>
    </form>
  );
}
