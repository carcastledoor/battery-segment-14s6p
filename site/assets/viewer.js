window.DesignGL={shader(gl,type,source){
 const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
 if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));
 return shader;
}};
window.DesignUI=(()=>{
 let api,states=new Map(),owners=new Map(),held=null,frame=null,last=0;
 const id=name=>document.getElementById(name);
 function configure(groups){
  states=new Map();owners=new Map();
  for(const group of groups){states.set(group.id,group.initial!==false);for(const key of group.keys){
   if(owners.has(key))throw Error('중복 부품 분류: '+key);owners.set(key,group.id);
  }}
 }
 function visible(key){
  // Retired exterior fan and a construction-only clearance envelope are not parts.
  if(key==='coolingOutlet'||key==='serviceclearance')return false;
  if(!owners.has(key))throw Error('부품 분류 누락: '+key);
  return states.get(owners.get(key));
 }
 function stop(){held=null;if(frame!==null)cancelAnimationFrame(frame);frame=null;}
 function assembly(value){api.setAssembly(value);id('explode').value=api.getAssembly();}
 function advance(time){
  frame=null;if(!held)return;
  assembly(api.getAssembly()+(held==='ArrowUp'?1:-1)*Math.min((time-last)/1000,.1)*2);
  last=time;frame=requestAnimationFrame(advance);
 }
 function connect(model){
  api=model;
  document.querySelectorAll('[data-group]').forEach(input=>input.addEventListener('change',()=>{states.set(input.dataset.group,input.checked);api.draw();}));
  document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
   api.setView(button.dataset.view);
   document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  }));
  id('reset').onclick=()=>{api.reset();document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view==='iso')));};
  if(api.focus)id('focus').onclick=()=>api.focus();
  const slider=id('explode');
  if(api.setAssembly){
   slider.oninput=e=>{stop();assembly(Number(e.target.value));};slider.addEventListener('pointerdown',stop);
   id('assembled').onclick=()=>{stop();assembly(0);};id('removed').onclick=()=>{stop();assembly(api.maxAssembly);};
   window.addEventListener('keydown',e=>{
    if(!['ArrowUp','ArrowDown'].includes(e.key)||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return;
    if(e.target?.isContentEditable||(e.target?.closest?.('input,textarea,select,button,[role="textbox"]')&&e.target!==slider))return;
    e.preventDefault();if(e.repeat||held===e.key)return;
    stop();held=e.key;last=performance.now();assembly(api.getAssembly()+(e.key==='ArrowUp'?.05:-.05));frame=requestAnimationFrame(advance);
   });
   window.addEventListener('keyup',e=>{if(e.key===held){e.preventDefault();stop();}});
   window.addEventListener('blur',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  }
  if(api.setVariant)id('variant').onchange=e=>{stop();api.setVariant(e.target.value);};
  if(api.selectSegment)id('extractSegment').onchange=e=>api.selectSegment(e.target.value);
  if(api.setTransparency)id('wallTransparency').oninput=e=>{api.setTransparency(+e.target.value);id('wall-value').textContent=e.target.value+'%';};
  const canvas=id('view');const pointers=new Map();let pinch=null;
  canvas.onpointerdown=e=>{pointers.set(e.pointerId,[e.clientX,e.clientY]);canvas.setPointerCapture(e.pointerId);pinch=null;};
  canvas.onpointermove=e=>{
   if(!pointers.has(e.pointerId))return;const before=pointers.get(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);
   if(pointers.size===1){api.rotate(e.clientX-before[0],e.clientY-before[1]);return;}
   const [a,b]=[...pointers.values()];const distance=Math.hypot(a[0]-b[0],a[1]-b[1]);
   if(pinch!==null&&pinch>0&&distance>0)api.zoom(Math.log(pinch/distance)*1000);pinch=distance;
  };
  canvas.onpointerup=canvas.onpointercancel=e=>{pointers.delete(e.pointerId);pinch=null;};
  canvas.addEventListener('wheel',e=>{e.preventDefault();api.zoom(e.deltaY);},{passive:false});
  id('zoom-in').onclick=()=>api.zoom(-160);id('zoom-out').onclick=()=>api.zoom(160);
  id('loading').hidden=true;canvas.setAttribute('aria-busy','false');
 }
 return {configure,visible,connect};
})();
