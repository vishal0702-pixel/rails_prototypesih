import React from 'react';

export default function ControllerPanel({selectedTrain, onQuickAction}) {
  return (
    <div className="card p-4 h-[360px]">
      <h3 className="font-semibold mb-2">Controller Decision Panel</h3>
      <div className="text-sm text-slate-300 mb-4">Selected: {selectedTrain? `${selectedTrain.number} — ${selectedTrain.name}` : '— None —'}</div>

      <div className="flex gap-2 mb-4">
        <button className="px-4 py-2 rounded bg-gradient-to-r from-green-300 to-green-200 text-slate-900" onClick={()=>onQuickAction && onQuickAction('APPLY')}>Apply</button>
        <button className="px-4 py-2 rounded border" onClick={()=>onQuickAction && onQuickAction('HOLD')}>Hold</button>
        <button className="px-4 py-2 rounded border" onClick={()=>onQuickAction && onQuickAction('REROUTE')}>Reroute</button>
        <button className="px-4 py-2 rounded border" onClick={()=>onQuickAction && onQuickAction('REJECT')}>Reject</button>
      </div>

      <div className="text-sm text-slate-400">
        Use quick actions to accept / hold / reroute / reject AI suggestions. Actions update status and are logged in Audit.
      </div>
    </div>
  );
}