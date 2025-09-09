import React, {useEffect, useState, useRef} from 'react';
import TrainMap from '../components/TrainMap';
import AISuggestionBox from '../components/AISuggestionBox';
import ControllerPanel from '../components/ControllerPanel';
import FooterLiveList from '../components/FooterLiveList';

// seed mock trains with richer data
function seedTrains() {
  const priorities = ['HIGH','MEDIUM','LOW'];
  const types = ['EXPRESS','LOCAL','FREIGHT','MAINT'];
  const arr = [];
  for(let i=1;i<=16;i++){
    const id = 4000 + i;
    const pr = priorities[Math.floor(Math.random()*priorities.length)];
    const t = types[Math.floor(Math.random()*types.length)];
    arr.push({
      id,
      number: 'TR' + id,
      name: t + ' ' + i,
      type: t,
      priority: pr,
      eta: Date.now() + Math.floor(Math.random()*80)*60000,
      status: 'APPROACHING',
      section: 'S' + (Math.floor(Math.random()*8)+1),
      pos: { x: Math.random()*78+10, y: Math.random()*68+8 },
      lastUpdate: Date.now()
    });
  }
  return arr;
}

export default function Home(){
  const [trains, setTrains] = useState(seedTrains());
  const [hovered, setHovered] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const tooltipRef = useRef();

  // simulate motion + ETA drift
  useEffect(()=>{
    const id = setInterval(()=>{
      setTrains(prev => prev.map(t => {
        const nx = Math.max(3, Math.min(97, t.pos.x + (Math.random()-0.5)*2.8));
        const ny = Math.max(3, Math.min(97, t.pos.y + (Math.random()-0.5)*2.8));
        const eta = Math.max(Date.now(), t.eta - Math.floor(Math.random()*90)*1000);
        const status = Math.random()<0.015 ? 'DELAYED' : (t.status==='PROCEEDED' ? 'PROCEEDED' : 'APPROACHING');
        return {...t, pos:{x:nx,y:ny}, eta, lastUpdate: Date.now(), status};
      }));
    }, 3200);
    return ()=>clearInterval(id);
  },[]);

  // suggestion generator
  function suggestForSection(section){
    const candidates = trains.filter(t => t.section===section).slice(0,6);
    const suggestions = candidates.map(t => {
      const score = Math.round(40 + Math.random()*60);
      const action = t.priority==='HIGH' ? (Math.random()<0.7?'PROCEED':'HOLD') : (Math.random()<0.5?'HOLD':'REROUTE');
      const reason = action==='REROUTE' ? 'Conflict on mainline — diversion recommended' : action==='HOLD' ? 'Lower priority vs crossing' : 'Clear to proceed';
      return { trainId: t.id, number: t.number, name: t.name, priority: t.priority, action, score, reason };
    });
    setSuggestion({ suggestionId: 'SUG-' + Date.now(), section, suggestions });
  }

  function onMapClick(t){
    setSelectedTrain(t);
    suggestForSection(t.section);
  }

  // apply actions (update train state + add audit record via local storage)
  function applyAction(trainId, decision){
    setTrains(prev => prev.map(tr => {
      if(tr.id === trainId){
        if(decision==='APPLY' || decision==='PROCEED'){ tr.status = 'PROCEEDED'; tr.eta = Math.max(Date.now(), tr.eta - 3*60000); }
        else if(decision==='HOLD'){ tr.status = 'HELD'; tr.eta = tr.eta + 8*60000; }
        else if(decision==='REROUTE'){ tr.status = 'REROUTED'; tr.pos.x = Math.max(5, tr.pos.x + (Math.random()>0.5?6:-6)); }
        else if(decision==='REJECT'){ tr.status = 'REJECTED'; }
      }
      return {...tr};
    }));

    // log to local audit (simple)
    const audits = JSON.parse(localStorage.getItem('rails_audit') || '[]');
    audits.unshift({ id: Date.now(), time: new Date().toLocaleString(), controller: 'Controller UI', action: decision, train: 'TR'+trainId });
    localStorage.setItem('rails_audit', JSON.stringify(audits.slice(0,200)));
  }

  // handle quick action from panel
  function onQuickAction(decision){
    if(!selectedTrain) return alert('Select a train first (click on a dot).');
    applyAction(selectedTrain.id, decision);
  }

  // tooltip placement
  function handleHover(t, ev){
    setHovered(t);
    const tt = tooltipRef.current;
    if(!tt) return;
    if(t && ev){
      const parent = ev.currentTarget.getBoundingClientRect();
      tt.style.display = 'block';
      tt.style.left = (ev.clientX + 12) + 'px';
      tt.style.top = (ev.clientY + 12) + 'px';
      tt.innerHTML = `<strong>${t.number}</strong><div style="font-size:13px;color:#cbd5e1">${t.name}</div><div style="font-size:12px;color:#93c5fd;margin-top:6px">Priority: ${t.priority} • ETA: ${new Date(t.eta).toLocaleTimeString()}</div>`;
    } else {
      tt.style.display = 'none';
      setHovered(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <TrainMap trains={trains} onHover={handleHover} onClick={onMapClick} />
          <div ref={tooltipRef} className="tooltip" style={{display:'none'}} />
          {hovered && <div className="mt-2 text-slate-300">{hovered.number} — {hovered.name} • Priority: {hovered.priority}</div>}
        </div>

        <div className="space-y-4">
          <AISuggestionBox suggestion={suggestion} onAction={(id,act)=>applyAction(id, act)} />
          <ControllerPanel selectedTrain={selectedTrain} onQuickAction={(act)=>onQuickAction(act)} />
        </div>
      </div>

      <div>
        <FooterLiveList trains={trains} />
      </div>
    </div>
  );
}