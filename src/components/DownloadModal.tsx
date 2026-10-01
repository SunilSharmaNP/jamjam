import React, { useState } from 'react';
import { X, Download, Check, Copy, ExternalLink, Terminal, Shield, FolderArchive, Sparkles } from 'lucide-react';
import { downloadProjectZip } from '../utils/downloadZip';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const ok = downloadProjectZip('zam-zam-hotel-kaliganj.zip');
    if (ok) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }
  };

  const copyCommands = () => {
    navigator.clipboard.writeText('npm install\nnpm run dev');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-stone-950 border border-stone-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
              <FolderArchive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base sm:text-lg">Download Source Code Repository</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold px-2 py-0.5 rounded-full">
                  100% Ready
                </span>
              </div>
              <p className="text-xs text-stone-400">Complete Vite + React + Tailwind CSS project with Admin Panel</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Main Download Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-stone-900 to-stone-900 border border-amber-500/40 text-center space-y-4">
            <div className="space-y-1">
              <h4 className="text-lg font-black text-white">Full Project .ZIP Archive</h4>
              <p className="text-xs text-stone-300 max-w-md mx-auto">
                Includes all React components, images, Admin Panel, WhatsApp ordering system, menus, and Vercel configuration files.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-black px-8 py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-stone-950 stroke-[3]" />
                    <span>Downloaded! Check Downloads Folder</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 text-stone-950 stroke-[2.5]" />
                    <span>Download Project .ZIP (63 KB)</span>
                  </>
                )}
              </button>

              <a
                href="/zam-zam-hotel-kaliganj.zip"
                download="zam-zam-hotel-kaliganj.zip"
                className="text-xs text-stone-400 hover:text-white underline py-2 cursor-pointer"
              >
                Direct File Link
              </a>
            </div>

            {downloadSuccess && (
              <p className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5 animate-fade-in">
                <Check className="w-4 h-4" /> File <code className="bg-stone-950 px-2 py-0.5 rounded">zam-zam-hotel-kaliganj.zip</code> saved to your device.
              </p>
            )}
          </div>

          {/* Quick Setup Instructions */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>How to Run Locally</span>
            </h5>

            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5 text-xs text-stone-300 font-mono">
              <div className="flex items-center justify-between text-stone-400">
                <span>Run in terminal:</span>
                <button
                  onClick={copyCommands}
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-sans cursor-pointer text-xs"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCmd ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 text-amber-400 font-bold select-all">
                npm install<br />
                npm run dev
              </div>
              <p className="text-[11px] text-stone-400 font-sans">
                Open <span className="text-white">http://localhost:3000</span> in your browser.
              </p>
            </div>
          </div>

          {/* Vercel Deployment Instructions */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Deploy to Vercel (Free 1-Click)</span>
            </h5>

            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-300 space-y-2">
              <ol className="list-decimal list-inside space-y-1.5 text-stone-300">
                <li>Unzip the downloaded folder on your computer.</li>
                <li>Upload to your <strong>GitHub</strong> repository or drag & drop on <strong>vercel.com</strong>.</li>
                <li>Vercel automatically detects <strong>Vite</strong> and builds the project with zero config!</li>
              </ol>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-900/60 flex justify-between items-center text-xs text-stone-400">
          <span>Admin Security PIN: <strong className="text-amber-400">1234</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
