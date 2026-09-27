// 14S6P segment — dimensional concept, not a fabrication release.
// Units: mm. Open in OpenSCAD. Edit parameters; F5 preview, F6 render.
// Export one part at a time with part="holder" / "bridge" / "terminal".
$fn=64;
series=14;
parallel=6;
cell_d=21.55;
cell_l=70.15;
pitch=24;
edge=15;
holder_t=4;
seat_depth=2.5;
clearance=0.30;
access_d=18;
bridge_w=42;
bridge_t=0.30; // Placeholder only: conductor sizing NOT evaluated.
terminal_w=28;
endplate_contact_w=18;
terminal_t=2; // Placeholder only.
terminal_hole=5.5;
terminal_tab=40;
terminal_side_gap=3;
terminal_overlap=12;
pcb_t=1.6;
pcb_gap=2;
pcb_cell_gap=2;
pcb_edge=4;
ear_w=66;
ear_h=16;
mount_hole=6.5;
explode=0;
part="assembly";
show_cells=true;
show_holders=true;
show_bridges=true;
show_terminals=true;
show_pcb=true;
W=(series-1)*pitch+2*edge;
H=(parallel-1)*pitch+2*edge;
bridge_h=(parallel-1)*pitch+18;
function cx(c)=(c-(series-1)/2)*pitch;
function cy(r)=(r-(parallel-1)/2)*pitch;
outer=cell_l/2+holder_t-seat_depth;
module holder(){
 difference(){
  union(){
   translate([-W/2,-H/2,0]) cube([W,H,holder_t]);
   for(sx=[-1,1],sy=[-1,1]) translate([sx*(W/2-ear_w/2),sy*(H/2+ear_h/2),holder_t/2]) cube([ear_w,ear_h,holder_t],center=true);
  }
  for(sx=[-1,1],sy=[-1,1],dx=[-20,20]) translate([sx*(W/2-ear_w/2)+dx,sy*(H/2+ear_h/2),-0.01]) cylinder(d=mount_hole,h=holder_t+0.02);
  for(c=[0:series-1],r=[0:parallel-1]) translate([cx(c),cy(r),0]) {
   translate([0,0,-0.01]) cylinder(d=cell_d+clearance,h=seat_depth+0.01);
   translate([0,0,-0.01]) cylinder(d=access_d,h=holder_t+0.02);
  }
 }
}
module cell(c,r){
 translate([cx(c),cy(r),0]) {
  color([0.06,0.42,0.32]) cylinder(d=cell_d,h=cell_l,center=true);
  for(s=[-1,1]) translate([0,0,s*(cell_l/2+0.03)])
   color((c%2==0 && s==1)||(c%2==1 && s==-1)?[0.85,0.88,0.88]:[0.55,0.61,0.63])
   cylinder(d=((c%2==0 && s==1)||(c%2==1 && s==-1))?9:17,h=0.06,center=true);
 }
}
module bridge(){translate([-bridge_w/2,-bridge_h/2,0]) cube([bridge_w,bridge_h,bridge_t]);}
cell_top=(parallel-1)*pitch/2+cell_d/2;
pcb_y=cell_top+pcb_cell_gap;
terminal_top=pcb_y-pcb_gap;
terminal_base=-outer-0.3-bridge_t-terminal_t;
terminal_x=W/2+terminal_side_gap+terminal_w/2;
endplate_inner=(series-1)*pitch/2-endplate_contact_w/2;
endplate_outer=W/2+terminal_side_gap+terminal_overlap;
terminal_hole_z=terminal_base+terminal_tab-9;

pcb_depth=cell_l-2*seat_depth-1;
pcb_width=W+2*(terminal_side_gap+terminal_w+pcb_edge);
module terminal(){
 // Outboard busbar: lap-connected to the lateral extension of the end Ni/Cu plate.
 // Local Z starts at the rear outside surface and increases into the segment.
 // Sharp bend is a concept approximation; actual bend radius is unassigned.
 difference(){
  union(){
   translate([-terminal_w/2,-bridge_h/2,0]) cube([terminal_w,terminal_top+bridge_h/2,terminal_t]);
   translate([-terminal_w/2,terminal_top-terminal_t,0]) cube([terminal_w,terminal_t,terminal_tab]);
  }
  translate([0,terminal_top+1,terminal_tab-9]) rotate([90,0,0]) cylinder(d=terminal_hole,h=terminal_t+2);
 }
}
module endplate(){
 translate([endplate_inner,-bridge_h/2,0]) cube([endplate_outer-endplate_inner,bridge_h,bridge_t]);
}
module pcb(){
 difference(){
  translate([-pcb_width/2,0,-pcb_depth/2]) cube([pcb_width,pcb_t,pcb_depth]);
  for(side=[-1,1]) translate([side*terminal_x,pcb_t+0.1,terminal_hole_z]) rotate([90,0,0]) cylinder(d=terminal_hole,h=pcb_t+0.2);
 }
}
module assembly(){
 if(show_cells) for(c=[0:series-1],r=[0:parallel-1]) cell(c,r);
 if(show_holders) for(s=[-1,1]) color([0.12,0.14,0.16])
  scale([1,1,s]) translate([0,0,cell_l/2-seat_depth+explode]) holder();
 // Alternating polarity columns: front links 1-2,3-4,...13-14;
 // rear links 2-3,4-5,...12-13. Both outputs at rear end columns.
 if(show_bridges) for(c=[0:series-2]) let(s=c%2==0?1:-1)
  color([0.72,0.47,0.23]) scale([1,1,s])
  translate([(cx(c)+cx(c+1))/2,0,outer+0.3+2*explode]) bridge();
 if(show_bridges) for(side=[-1,1]) color([0.72,0.47,0.23])
  scale([side,1,1]) translate([0,0,-outer-0.3-bridge_t-2*explode]) endplate();
 if(show_terminals) for(side=[-1,1]) color([0.88,0.40,0.12])
  translate([side*terminal_x,0,terminal_base-2*explode]) terminal();
 if(show_pcb) color([0.12,0.42,0.32]) translate([0,pcb_y+3*explode,0]) pcb();
}
assert(pitch>cell_d+clearance,"Pitch must exceed pocket diameter");
assert(series%2==0,"This terminal arrangement assumes an even series count");
assert(bridge_w<2*pitch,"Adjacent bridge plates must remain separated");
if(part=="assembly") assembly();
else if(part=="holder") holder();
else if(part=="bridge") bridge();
else if(part=="terminal") terminal();
else if(part=="pcb") pcb();
else if(part=="endplate") endplate();
echo(holder_dimensions=[W,H,holder_t],cells=series*parallel);
