(()=>{
 'use strict';
 const pages={segment:{title:'Segment',index:'01',subtitle:'14S6P / V2 / A & B',summary:'셀 배열에서 체결 구조까지, 세그먼트 단위로 살펴봅니다.'},'battery-box':{title:'Battery Box',index:'02',subtitle:'70S6P / B–A–B–A–B',summary:'5개 세그먼트와 2층 소자방을 하나의 패키지로.'},frame:{title:'Frame',index:'03',subtitle:'VEHICLE INTEGRATION / V1',summary:'제공된 차량 프레임 안에서 배터리팩의 배치를 확인합니다.'},description:{title:'Description',index:'04',subtitle:'MOLICEL P45B / 70S6P / DESIGN PROCESS',summary:'직접 만든 계산기를 바탕으로 셀 구성과 패키징을 검토한 과정.'}};
 const query=new URLSearchParams(location.search),view=query.get('view'),main=document.getElementById('main');
 const heading=p=>`<div class="page-heading"><a class="back-link" href="index.html">← Archive</a><div class="title-line"><h1>${p.title}<span class="index">${p.index}</span></h1><p class="kicker">${p.subtitle}</p></div></div>`;
 document.querySelectorAll('nav a').forEach(a=>{if(a.search==='?view='+view)a.setAttribute('aria-current','page');});
 function landing(){
  main.innerHTML=`<section class="archive-intro"><p class="kicker">FORMULA STUDENT / BATTERY SYSTEM</p><h1>Battery<br>Design Files<span class="accent">.</span></h1><div class="intro-bottom"><p>셀에서 세그먼트로.<br>배터리팩에서 차량으로.</p><span class="archive-number">DESIGN ARCHIVE<br>01—04</span></div></section><section class="archive-list" aria-label="설계 파일">${Object.entries(pages).map(([key,p])=>`<a class="archive-entry" href="index.html?view=${key}"><span class="entry-index">${p.index}</span><div><h2>${p.title}</h2><p>${p.summary}</p></div><span class="entry-meta">${p.subtitle}</span><span class="entry-arrow" aria-hidden="true">↗</span></a>`).join('')}</section>`;
 }
 const sections=[
  [
    "overview",
    "Design approach",
    "계산에서 시작한 배터리 설계",
    "<p>현재 배터리는 <strong>몰리셀(Molicel) INR-21700-P45B를 사용한 70S6P 구성</strong>이다. 셀 420개를 14S6P 세그먼트 5개로 나누고, 세그먼트를 직렬로 연결한다.</p><p>설계의 출발점은 직접 만든 <strong>Formula Student Battery Pack Calculator</strong>다. 셀 데이터와 직·병렬 수를 입력하면 전압, 용량, 에너지, 셀 질량과 배열 크기를 함께 계산하도록 구성했다. 전기적 구성과 셀 배치가 서로 맞는지 같은 입력 기준으로 검토하는 데 사용한다.</p><div class=\"architecture-line\"><span>셀 사양 입력</span><b>→</b><span>직·병렬 계산</span><b>→</b><span>세그먼트 분할</span><b>→</b><span>배치·연결·정비 검토</span></div>"
  ],
  [
    "cell",
    "Selected cell",
    "사용 셀: Molicel P45B",
    "<p>현재 설계에 사용하는 셀은 21700 규격의 P45B다. 계산기의 <code>Cell_DB</code>에서 모델을 선택하면 공칭·최대 전압, 용량, 전류, 질량과 외형 치수를 불러온다. 셀 모델을 바꾸어도 동일한 식으로 팩 수준의 결과를 비교할 수 있도록 했다.</p><table><thead><tr><th>계산 입력</th><th>P45B 값</th></tr></thead><tbody><tr><td>공칭 전압</td><td>3.6V</td></tr><tr><td>최대 충전 전압 — 계산기 입력</td><td>4.2V</td></tr><tr><td>대표 용량</td><td>4.5Ah</td></tr><tr><td>방전 전류 — 셀 데이터 기준</td><td>45A</td></tr><tr><td>최대 질량</td><td>69g</td></tr><tr><td>최대 외경 × 높이</td><td>21.6 × 70.2mm</td></tr></tbody></table><p>근거: 계산기 <code>Cell_DB!A7:K7</code>. 공칭 전압·용량·방전 전류·최대 질량·외형은 <a href=\"https://www.molicel.com/product/inr-21700-p45b/\">Molicel 공식 P45B 제품 정보</a>와 대조했다. 셀 전류값을 팩 전체의 검증된 연속 허용전류로 그대로 취급하지 않는다.</p>"
  ],
  [
    "calculator",
    "Pack calculation",
    "자체 계산기로 70S6P 검토",
    "<p>직렬 수는 팩 전압에, 병렬 수는 용량과 셀 전류 분담에 영향을 준다. 현재 구성인 70S6P를 P45B 사양에 적용해 아래 값을 계산했다. 수식은 첨부 계산기의 전기적 출력 식과 같다.</p><table><thead><tr><th>검토 항목</th><th>계산 과정</th><th>70S6P 결과</th></tr></thead><tbody><tr><td>전체 셀 수</td><td>70 × 6</td><td>420개</td></tr><tr><td>공칭 전압</td><td>3.6 × 70</td><td>252V</td></tr><tr><td>최대 전압</td><td>4.2 × 70</td><td>294V</td></tr><tr><td>팩 용량</td><td>4.5 × 6</td><td>27Ah</td></tr><tr><td>공칭 에너지</td><td>252 × 27 ÷ 1000</td><td>6.804kWh</td></tr><tr><td>셀 질량 합계</td><td>420 × 69 ÷ 1000</td><td>28.98kg</td></tr></tbody></table><p>전류 비교 식은 45 × 6 = 270A이고, 이를 공칭 전압에 곱하면 68.04kW다. 두 값은 셀 데이터의 단순 합산 비교값이다. 버스바·접속부·퓨즈·AIR 및 냉각 조건을 반영한 팩의 최종 운전 정격이나 실측 출력은 아니다. 질량 역시 셀만 포함하며 케이스와 전장품은 제외한다.</p><p>근거 수식: <code>Battery_Calculator!B16:H18</code>. 첨부 파일의 저장 입력은 Samsung 50S·24S12P 예시이므로, 위 결과는 저장된 출력값을 옮긴 것이 아니라 P45B·70S6P 조건으로 동일 수식을 별도 계산한 값이다.</p>"
  ],
  [
    "segment",
    "Segmentation",
    "14S6P 세그먼트 5개로 분할",
    "<p>전체 70S6P 구성을 14S6P 단위 다섯 개로 나누었다. 병렬 수 6P를 유지한 채 세그먼트 다섯 개를 직렬 연결하면 전체 직렬 수는 14 × 5 = 70S가 된다.</p><table><thead><tr><th>세그먼트 1개</th><th>계산값</th></tr></thead><tbody><tr><td>셀 수</td><td>14 × 6 = 84개</td></tr><tr><td>공칭 / 최대 전압</td><td>50.4 / 58.8V</td></tr><tr><td>용량 / 공칭 에너지</td><td>27Ah / 1.3608kWh</td></tr><tr><td>셀 질량 합계</td><td>5.796kg</td></tr></tbody></table><p>이 분할 단위를 기준으로 셀홀더, 니켈·구리 연결판, 절연판과 센싱 PCB를 구성했다. 한 세그먼트의 전기적 연결과 기계적 조립 구조를 반복 사용할 수 있도록 설계하고, 실제 분리·인출할 때의 체결 순서를 함께 검토했다.</p>"
  ],
  [
    "packaging",
    "Packaging calculation",
    "셀 배열 계산을 패키징에 연결",
    "<p>계산기는 전기적 구성뿐 아니라 가로·세로 셀 수, 셀 사이 간격, 외곽 여유, 셀 방향과 층간 간격을 입력받는다. 전체 셀 수를 한 층의 셀 수로 나누고 올림해 필요한 층수를 구한다.</p><p><strong>층수 = ⌈(S × P) ÷ (X × Y)⌉</strong><br>한 방향의 배열 길이 = 셀 수 × 해당 방향 셀 치수 + (셀 수 − 1) × 셀 간격 + 양쪽 외곽 여유</p><p>이를 통해 배열 방향이나 셀 수가 달라질 때 차지하는 공간을 비교할 수 있다. 현재 세그먼트는 14 × 6 배열을 사용한다. 계산기의 단순 배열 치수에 홀더, 절연재, 연결판, 체결부와 인출 여유를 추가로 검토해 실제 패키징으로 연결한다.</p><p>근거: <code>Battery_Calculator!B7:B12</code> 입력과 <code>B20:H20</code> 수식. 첨부 파일에 저장된 12 × 4 × 6층 예시 치수를 현재 배터리박스 외형으로 사용하지 않는다.</p>"
  ],
  [
    "box",
    "Electrical & service layout",
    "전력 연결과 정비를 함께 고려",
    "<p>세그먼트는 B–A–B–A–B 순서로 배치한다. 인접 세그먼트의 +와 − 단자를 가깝게 두는 A/B 형식을 적용해 직렬 연결 경로를 정리하고, 반대 조합의 접속을 제한하는 구조를 검토했다.</p><p>전력 경로는 팩 양극에서 퓨즈와 AIR+를 거쳐 외부 고전압 커넥터로, 음극은 AIR−를 거쳐 외부 커넥터로 이어지도록 구성했다. 구리 버스바를 사용하는 경로에서는 단자 높이, 볼트 접근, 커넥터 인출 공간을 함께 고려했다.</p><p>1층은 세그먼트, 2층은 BMS·온도 확장모듈·IMD와 전력 소자를 배치하는 구조다. 상부 소자방을 들어내고 세그먼트를 꺼낼 수 있도록 배선과 체결 관계를 검토했다. 세그먼트 팬 방향을 통일하고 필터·덕트를 배치해 냉각 경로를 구성했다.</p>"
  ],
  [
    "evidence",
    "Calculation evidence",
    "계산 근거와 남은 검토",
    "<p>이 설명의 수치 근거는 직접 제작한 계산기의 <code>Cell_DB</code>와 <code>Battery_Calculator</code> 시트다. 셀 데이터 → 직·병렬 입력 → 전압·용량·에너지·질량 → 배열 치수의 관계를 확인했다. 이 계산기는 전기적 구성과 셀 배열 크기를 검토하는 도구이며, 열해석·단락전류·퓨즈 선정 계산은 포함하지 않는다.</p><p>P45B 사양과 70S6P 구성은 현재 설계 기준이다. 계산기·제조사의 최대 셀 치수 21.6 × 70.2mm와 기존 형상에 사용된 21.55 × 70.15mm는 차이가 있어, 셀홀더 치수와 공차를 확정할 때 일치 여부를 확인해야 한다.</p><p>버스바 단면, 접속부 온도, 퓨즈 차단용량, 절연 거리와 냉각 성능은 이 계산기의 출력 범위에 포함되지 않는다. 별도 계산·시험 근거가 확보되면 해당 설계 결정과 연결해 기록한다.</p><ul class=\"source-list\"><li><a href=\"documents/battery-pack-calculator.xlsx\" download>직접 제작한 배터리팩 계산기 원본 (.xlsx)</a> — 저장 예시는 Samsung 50S·24S12P</li><li><a href=\"https://www.molicel.com/product/inr-21700-p45b/\">Molicel P45B 공식 사양</a></li></ul>"
  ]
];
 function description(){main.innerHTML=heading(pages.description)+`<div class="document-layout"><nav class="document-nav" aria-label="설명 목차">${sections.map(([id,en,ko],i)=>`<a href="#${id}"><span>${String(i+1).padStart(2,'0')}</span>${ko}</a>`).join('')}</nav><article>${sections.map(([id,en,ko,body],i)=>`<section id="${id}" class="document-section"><p class="kicker">${String(i+1).padStart(2,'0')} / ${en}</p><h2>${ko}</h2>${body}</section>`).join('')}</article></div>`;}

 const compressedScripts={"models/parts.js":["data/parts-01.bin"],"models/segment.js":["data/segment-01.bin"],"models/battery-box.js":["data/battery-box-01.bin","data/battery-box-02.bin"],"models/frame.js":["data/frame-01.bin"]};
 async function unpack(paths){
  if(typeof DecompressionStream==='undefined')throw Error('최신 Chrome, Edge 또는 Safari에서 열어 주세요.');
  const stream=new ReadableStream({async start(controller){try{
   for(const path of paths){const response=await fetch(path);if(!response.ok)throw Error('모델 파일 로딩 실패: '+path);controller.enqueue(new Uint8Array(await response.arrayBuffer()));}
   controller.close();
  }catch(error){controller.error(error);}}});
  return new Response(stream.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
 }
 async function loadScript(path){
  const bytes=await unpack(compressedScripts[path]);
  const url=URL.createObjectURL(new Blob([bytes],{type:'text/javascript'}));
  try{await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=url;script.onload=resolve;script.onerror=()=>reject(Error('모델 실행 실패: '+path));document.body.appendChild(script);});}
  finally{URL.revokeObjectURL(url);}
 }
 async function loadFrame(){
  const response=await fetch('data/frame.json');if(!response.ok)throw Error('프레임 목록을 불러오지 못했습니다.');
  const model=await response.json(),buffer=await unpack(model.chunks);
  window.SCENE=model.parts.map(part=>({...part,vertexBytes:new Uint8Array(buffer,part.data.offset,part.data.length),indexBytes:new Uint8Array(buffer,part.indices.offset,part.indices.length)}));
 }
 function fail(error){const loading=document.getElementById('loading');if(loading){loading.hidden=false;loading.textContent='모델을 표시하지 못했습니다. '+error.message;loading.setAttribute('role','alert');}}
 async function viewer(){
  const groups=DesignAssemblies[view],isFrame=view==='frame',max=view==='segment'?10:12;
  DesignUI.configure(groups);
  main.innerHTML=heading(pages[view])+`<div class="model-layout"><section class="model-space" aria-label="3D 미리보기"><div class="view-tools"><div class="view-presets">${[['iso','입체'],['front','앞'],['back','뒤'],['left','좌'],['right','우'],['top','위']].map(([key,label])=>`<button data-view="${key}" aria-pressed="${key==='iso'}">${label}</button>`).join('')}</div><div class="view-utilities"><button id="zoom-out" aria-label="축소">−</button><button id="zoom-in" aria-label="확대">+</button><button id="reset">초기 시점</button>${isFrame?'<button id="focus">팩 확대</button>':''}</div></div><div class="canvas-wrap"><canvas id="view" tabindex="0" aria-label="${pages[view].title} 3D 모델. 드래그 회전, 휠 또는 두 손가락 확대" aria-busy="true"></canvas><p id="loading" role="status">모델을 불러오는 중…</p><span class="canvas-caption">DRAG TO ROTATE / SCROLL TO ZOOM</span></div>${!isFrame?`<div class="assembly-bar"><div class="assembly-caption"><span>ASSEMBLY</span><output id="assembly-stage" for="explode">조립 완료</output><span class="key-hint">↑ 분해 / ↓ 조립 · 길게 누르기</span></div><div class="assembly-controls"><button id="assembled">조립</button><input id="explode" type="range" min="0" max="${max}" step="0.01" value="0" aria-label="조립 분해"><button id="removed">분해</button></div></div>`:''}</section><aside class="model-options"><div class="options-title"><h2>View options</h2><span>${pages[view].index}</span></div>${view==='segment'?'<label class="select-row">형식<select id="variant"><option value="1">A형</option><option value="-1">B형</option></select></label>':''}${view==='battery-box'?'<label class="select-row">인출 세그먼트<select id="extractSegment"><option value="all">전체</option><option value="0">S1</option><option value="1">S2</option><option value="2">S3</option><option value="3">S4</option><option value="4">S5</option></select></label><div class="opacity-control"><label for="wallTransparency">외벽·뚜껑 투명도</label><output id="wall-value">0%</output><input id="wallTransparency" type="range" min="0" max="100" value="0" aria-label="외벽과 뚜껑 투명도"></div>':''}<details class="parts-panel" open><summary>조립체 표시</summary><div class="part-list">${groups.map(g=>`<label><input type="checkbox" data-group="${g.id}" ${g.initial===false?'':'checked'}><span>${g.label}</span>${g.permanent?'<span class="permanent-mark" title="개별 분해 없는 영구 조립체" aria-label="영구 조립체">●</span>':''}</label>`).join('')}</div></details><a class="details-link" href="index.html?view=description#${view==='battery-box'?'box':view==='frame'?'overview':view}">구조 및 설계 기록 ↗</a></aside></div>`;
  window.addEventListener('error',e=>fail(e.error||Error(e.message)));
  try{if(isFrame)await loadFrame();else await loadScript('models/parts.js');await loadScript('models/'+view+'.js');}catch(error){fail(error);}
 }
 if(view&&pages[view]){document.title=pages[view].title+' — Battery Design Files';if(view==='description')description();else viewer();}else landing();
})();
