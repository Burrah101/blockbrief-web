'use client';

import { Twitter, Linkedin, Link2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ShareWidgetProps {
  title?: string;
  url?: string;
  variant?: 'horizontal' | 'vertical';
}

export default function ShareWidget({ 
  title = 'BlockBrief - Signal. No noise.', 
  url = 'https://blockbrief.io',
  variant = 'horizontal' 
}: ShareWidgetProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const buttonClass = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors";
  const containerClass = variant === 'horizontal' 
    ? 'flex items-center gap-2' 
    : 'flex flex-col gap-2';

  return (
    <div className={containerClass}>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClass} bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20`}
      >
        <Twitter size={18} />
        <span className="text-sm font-medium">Tweet</span>
      </a>
      
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClass} bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20`}
      >
        <Linkedin size={18} />
        <span className="text-sm font-medium">Share</span>
      </a>
      
      <button
        onClick={handleCopyLink}
        className={`${buttonClass} bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white`}
      >
        {copied ? <CheckCircle size={18} className="text-green-400" /> : <Link2 size={18} />}
        <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
}
