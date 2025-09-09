import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar(){
  const loc = useLocation();
  return (
    <header className="flex items-center justify-between p-4 mb-4 card">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent2 flex items-center justify-center font-bold text-slate-900">RA</div>
        <div>
          <div className="text-lg font-semibold">RAILS — Railway AI Linked System</div>
          <div className="text-sm text-slate-400">Section controller decision support</div>
        </div>
      </div>
      <nav className="flex gap-4">
        <Link to="/" className={loc.pathname==='/'? 'text-accent2 font-semibold':'text-slate-300'}>Home</Link>
        <Link to="/analysis" className={loc.pathname==='/analysis'? 'text-accent2 font-semibold':'text-slate-300'}>Analytics</Link>
        <Link to="/audit" className={loc.pathname==='/audit'? 'text-accent2 font-semibold':'text-slate-300'}>Audit</Link>
      </nav>
    </header>
  );
}