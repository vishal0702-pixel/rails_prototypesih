import React from 'react';

export default function FooterLiveList({trains=[]}) {
  return (
    <div className="card p-3">
      <h4 className="font-semibold mb-3">Live Train Status</h4>
      <div className="footer-list space-y-2">
        {trains.map(t => (
          <div key={t.id} className="p-2 bg-slate-900/20 rounded flex justify-between items-start">
            <div>
              <div className="font-semibold">{t.number} — {t.name}</div>
              <div className="text-sm text-slate-300">{t.type} • {t.section} • ETA {new Date(t.eta).toLocaleTimeString()}</div>
            </div>
            <div className="text-right">
              <div className={`status-badge ${t.status==='PROCEEDED'?'status-proceeded': t.status==='HELD'?'status-held': t.status==='REROUTED'?'status-rerouted': t.status==='DELAYED'?'status-delayed':''}`}>{t.status}</div>
              <div className="text-xs text-slate-400 mt-1">Last update</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}