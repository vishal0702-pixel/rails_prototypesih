import React from 'react';

export default function AISuggestionBox({suggestion, onAction}) {
  if(!suggestion) return (
    <div className="card p-4">
      <div className="text-slate-300">AI suggestions will appear here when you select a section or train.</div>
    </div>
  );

  return (
    <div className="card p-4 h-[360px] overflow-auto">
      <div className="text-sm text-slate-300 mb-3">Suggestion ID: <strong>{suggestion.suggestionId}</strong></div>
      {suggestion.suggestions.map(s => (
        <div key={s.trainId} className="p-3 mb-3 bg-slate-900/30 rounded">
          <div className="flex justify-between">
            <div>
              <div className="font-semibold">{s.number} — {s.name}</div>
              <div className="text-sm text-slate-400">{s.reason}</div>
            </div>
            <div className="text-right">
              <div className="font-bold">{s.action}</div>
              <div className="text-sm text-slate-400">Score: {s.score}</div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 rounded bg-gradient-to-r from-green-300 to-green-200 text-slate-900" onClick={()=>onAction && onAction(s.trainId,'APPLY')}>Apply</button>
            <button className="px-3 py-1 rounded border" onClick={()=>onAction && onAction(s.trainId,'HOLD')}>Hold</button>
            <button className="px-3 py-1 rounded border" onClick={()=>onAction && onAction(s.trainId,'REJECT')}>Reject</button>
            <button className="px-3 py-1 rounded border" onClick={()=>onAction && onAction(s.trainId,'REROUTE')}>Reroute</button>
          </div>
        </div>
      ))}
    </div>
  );
}