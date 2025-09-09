import React, {useEffect, useState} from 'react';

export default function Audit(){
  const [records, setRecords] = useState([]);

  useEffect(()=>{
    // combine mock records + localstorage
    const mock = [
      {id:1, time:'2025-09-08 08:05', controller:'Controller A', action:'Applied Recommendation', train:'TR4002'},
      {id:2, time:'2025-09-08 08:12', controller:'Controller B', action:'Held Train', train:'TR4006'},
      {id:3, time:'2025-09-08 08:25', controller:'Controller A', action:'Rerouted', train:'TR4009'},
      {id:4, time:'2025-09-08 09:05', controller:'Controller C', action:'Rejected Suggestion', train:'TR4012'},
      {id:5, time:'2025-09-08 09:25', controller:'Controller A', action:'Applied Recommendation', train:'TR4016'},
      {id:6, time:'2025-09-08 10:02', controller:'Controller B', action:'Held Train', train:'TR4003'},
      {id:7, time:'2025-09-08 10:30', controller:'Controller A', action:'Rerouted', train:'TR4010'},
      {id:8, time:'2025-09-08 11:01', controller:'Controller B', action:'Applied Recommendation', train:'TR4013'},
      {id:9, time:'2025-09-08 11:35', controller:'Controller C', action:'Held Train', train:'TR4007'},
      {id:10, time:'2025-09-08 12:00', controller:'Controller A', action:'Applied Recommendation', train:'TR4011'}
    ];
    const local = JSON.parse(localStorage.getItem('rails_audit') || '[]');
    setRecords([...local.slice(0,20).map((r,i)=>({ id:100+i, time:r.time, controller:r.controller||'UI', action:r.action, train:r.train })), ...mock]);
  },[]);

  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-3">Audit & Controller History</h3>
      <div className="overflow-auto max-h-[64vh]">
        <table className="min-w-full table-auto border-collapse">
          <thead className="text-slate-300/80">
            <tr>
              <th className="border px-3 py-2 text-left">Time</th>
              <th className="border px-3 py-2 text-left">Controller</th>
              <th className="border px-3 py-2 text-left">Action</th>
              <th className="border px-3 py-2 text-left">Train</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, idx) => (
              <tr key={idx} className={idx%2===0 ? 'bg-slate-900/10' : ''}>
                <td className="border px-3 py-2">{r.time}</td>
                <td className="border px-3 py-2">{r.controller}</td>
                <td className="border px-3 py-2">{r.action}</td>
                <td className="border px-3 py-2">{r.train}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}