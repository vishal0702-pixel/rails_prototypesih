import React from 'react';

export default function TrainMap({trains = [], onHover, onClick}) {
  return (
    <div className="map-wrap rounded-xl relative overflow-hidden h-[520px] border card">
      {trains.map(t => {
        const style = { left: t.pos.x + '%', top: t.pos.y + '%' };
        const cls = t.priority === 'HIGH' ? 'train-dot train-high' : t.priority==='MEDIUM' ? 'train-dot train-med' : 'train-dot train-low';
        return (
          <div key={t.id}
               className={cls}
               style={style}
               onMouseEnter={(e)=>onHover && onHover(t,e)}
               onMouseLeave={(e)=>onHover && onHover(null,e)}
               onClick={()=>onClick && onClick(t)}
               title={t.number + ' — ' + t.name}>
            {String(t.number).slice(-2)}
          </div>
        );
      })}
    </div>
  );
}