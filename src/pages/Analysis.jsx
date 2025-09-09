import React, {useEffect, useState} from 'react';
import { Chart, registerables } from 'chart.js/auto';

export default function Analysis(){
  const [series, setSeries] = useState([]);

  useEffect(()=>{
    Chart.register(...registerables);
    const s = [];
    const weeks = 8;
    for(let i=weeks-1;i>=0;i--){
      const d = new Date(Date.now() - i*7*24*3600*1000);
      s.push({ date: `W${weeks-i}`, punctuality: Math.round(65 + Math.random()*30), avgDelay: Math.round(Math.random()*30), costSaved: Math.round(2000 + Math.random()*800) });
    }
    setSeries(s);
  },[]);

  useEffect(()=>{
    if(!series.length) return;
    // line chart (punctuality & delay)
    const ctx1 = document.getElementById('lineChart').getContext('2d');
    const labels = series.map(s=>s.date);
    const punctual = series.map(s=>s.punctuality);
    const delay = series.map(s=>s.avgDelay);
    const chart1 = new Chart(ctx1, {
      type: 'line',
      data: { labels, datasets:[
        { label:'Punctuality %', data: punctual, borderColor:'#06b6d4', tension:0.3, fill:false },
        { label:'Avg Delay (min)', data: delay, borderColor:'#ef4444', tension:0.3, fill:false }
      ]},
      options: { responsive:true, interaction:{mode:'index'} }
    });

    // bar chart (cost saved)
    const ctx2 = document.getElementById('barChart').getContext('2d');
    const costs = series.map(s=>s.costSaved);
    const chart2 = new Chart(ctx2, {
      type: 'bar',
      data: { labels, datasets:[ { label:'Cost Saved (INR)', data: costs, backgroundColor:'#7c3aed' } ] },
      options: { responsive:true }
    });

    return ()=>{ chart1.destroy(); chart2.destroy(); };
  },[series]);

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h3 className="text-lg font-semibold mb-3">Performance Analytics</h3>
        <canvas id="lineChart" />
        <div className="mt-4 text-sm text-slate-300">Hover over points to see details.</div>
      </div>

      <div className="card p-4">
        <h3 className="text-lg font-semibold mb-3">Operational Savings (Bar)</h3>
        <canvas id="barChart" />
        <div className="mt-4 text-sm text-slate-300">Bar chart shows weekly approximate cost savings enabled by optimized decisions.</div>
      </div>
    </div>
  );
}