// A permanent assembly is the smallest visibility unit. Its children have no UI
// selection or transform handles. Detachable parts retain their original motions.
window.DesignAssemblies={
 segment:[
  {id:'cell-core',label:'셀·용접 연결판',permanent:true,keys:['cells','bridges','nickel','terminals']},
  {id:'holders',label:'셀홀더·고정 인서트',keys:['holders','topinserts']},
  {id:'boards',label:'센싱 PCB·절연판',keys:['pcb','sensing','insulator','bottomcase']},
  {id:'terminals',label:'전력 단자',keys:['pins']},
  {id:'covers',label:'아크릴 케이스',keys:['covers']},
  {id:'handles',label:'손잡이·하부 연결봉',keys:['handles','lowerties']},
  {id:'cooling',label:'팬·덕트·받침',keys:['fans','fanmount','busbarcradles']},
  {id:'fasteners',label:'분리형 체결부',keys:['covermounts','topfasteners','casefasteners','hardware']}
 ],
 'battery-box':[
  {id:'shell',label:'박스 용접 본체·덕트 체결 받침',permanent:true,keys:['boxwalls','boxbase','partitions','coolingWelded']},
  {id:'lid',label:'뚜껑 영구 조립체·고정 팝너트',permanent:true,keys:['lidtop','lidlocating','lidrivnuts']},
  {id:'lid-bolts',label:'뚜껑 체결 볼트',keys:['lidbolts']},
  {id:'tray',label:'2층 바닥·용접 고정 탭',permanent:true,keys:['floor2','deckbrackets']},
  {id:'equipment',label:'BMS·IMD·온도 확장모듈',keys:['bms','thermistor','imd','imdstack','sensingmates']},
  {id:'power',label:'AIR·퓨즈·고전압 경로',keys:['airs','mainfuse','packnegative','packrings','packplugs','fixedshrink','hvpanel','hvoutput','fuselinks']},
  {id:'links',label:'세그먼트 연결쌍',keys:['powerplugs','powercables','ringadapters','hvfasteners','shrinkwrap']},
  {id:'cell-core',label:'세그먼트 셀·용접 연결판',permanent:true,keys:['cells','bridges','nickel','terminals']},
  {id:'segment-housing',label:'세그먼트 케이스·홀더·센싱',keys:['holders','topinserts','pcb','insulator','sensing','bottomcase','pins','covers','covermounts','handles','topfasteners','hardware','lowerties','casefasteners']},
  {id:'cooling',label:'팬·분리형 필터 덕트·씰',keys:['fans','fanmount','busbarcradles','coolingInlet','coolingSeals']},
  {id:'fasteners',label:'분리형 체결부·지지대',keys:['coolingFasteners','equipmentbolts','captivenuts','deckbolts','equipmentmounts','airnuts','airwashers','airmounts','panelmountbolts','panelmountnuts','imdmounts','packfasteners','hvoutputbolts','fusebolts']}
 ],
 frame:[
  {id:'frame',label:'차량 용접 프레임',permanent:true,keys:['frame']},
  {id:'pack',label:'배터리팩 조립체',keys:['pack']},
  {id:'reference',label:'기존 박스 위치 비교',initial:false,keys:['old-box']}
 ]
};
