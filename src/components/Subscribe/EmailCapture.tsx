'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

interface EmailCaptureProps {
  variant?: 'inline' | 'hero' | 'footer';
  onSubscribe?: (email: string, referralCode?: string) => void;
}

export default function EmailCapture({ variant = 'inline', onSubscribe }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json();
        setStatus('success');
        setMessage('Welcome to BlockBrief! Check your inbox.');
        if (onSubscribe) {
          onSubscribe(email, data.referralCode);
        }
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const baseClasses = {
    inline: 'bg-white/5 rounded-lg p-4',
    hero: 'bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 border border-white/10',
    footer: 'bg-transparent',
  };

  return (
    <div className={baseClasses[variant]}>
      {variant === 'hero' && (
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2">Stay Oriented, Not Addicted</h3>
          <p className="text-gray-400 text-sm">
            Get the daily digest of calm, factual crypto intelligence. Free forever.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={status === 'loading' || status === 'success'}
            className="w-full pl-10 pr-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/40 disabled:opacity-50"
          />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === 'loading' && <Loader2 size={18} className="animate-spin" />}
          {status === 'success' && <CheckCircle size={18} />}
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe Free'}
        </button>
      </form>

      {message && (
        <p className={`mt-3 text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
          {message}
        </p>
      )}

      {variant !== 'footer' && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          Join 10,000+ builders and investors. No spam, unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
