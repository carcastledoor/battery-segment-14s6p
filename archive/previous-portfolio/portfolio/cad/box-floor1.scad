// Box base, outer walls and partitions: aluminum; alloy unspecified.
// V2 A/B: A=0 degrees, B=180 degrees about vertical Y. Standalone V2 unchanged.
// Units mm; Y is vertical. First floor with second-floor deck draft. Segment source preserves approved draft.
include <segment-source.scad>
box_wall=2;box_base=4;box_inner_x=428.66;box_inner_z=486.125;box_h=230.4;slot_pitch=97.625;
partition_top=93.4;partition_h=208.6;deck_t=2;deck_edge=.5;deck_hole=44;show_floor2=true;
show_segments=true;show_box=true;show_partitions=true;
module floor1_shell(){
 color([.76,.78,.80])translate([0,-box_h/2-box_base/2,0])cube([box_inner_x+2*box_wall,box_base,box_inner_z+2*box_wall],center=true);
 color([.76,.78,.80])import("../models/pack-boxwalls.stl");
}
if(show_box)floor1_shell();
if(show_partitions)for(i=[0:3])color([.76,.78,.80])translate([0,(-box_h/2+partition_top)/2,(i-1.5)*slot_pitch])cube([box_inner_x,partition_h,box_wall],center=true);
if(show_segments)for(i=[0:4])translate([0,95-box_h/2,(i-2)*slot_pitch])rotate([0,i%2==0?180:0,0])let($layout_hand=i%2==0?-1:1)assembly();

// Original cooling assemblies, simplified display threads; exact geometry in STEP.
show_cooling=true;
// External outlet fans removed; retain inlet/filter assemblies.
if(show_cooling)for(i=[0:4])for(side=[1])color([.25,.28,.30])translate([side*(box_inner_x/2+box_wall),95-box_h/2,(i-2)*slot_pitch])import(side==1?"cooling/Inlet-display.stl":"cooling/Outlet-display.stl");

module floor2_deck(){color([.76,.78,.80])import("../models/pack-floor2.stl");}
if(show_floor2)floor2_deck();

include <equipment-layout.scad>
show_non_hv=true;show_equipment=true;show_power_routing=true;
if(show_equipment)equipment_layout();
if(show_power_routing)routing_layout();


// Lid skirt overlaps the existing inner box wall; M5 rivet nut sizes provisional.
show_lid=true;
if(show_lid){
 color([.76,.78,.80])import("../models/pack-lidtop.stl");
 color([.70,.73,.76])import("../models/pack-lidlocating.stl");
 color([.65,.68,.70])import("../models/pack-lidbolts.stl");
}
color([.65,.68,.70])import("../models/pack-lidrivnuts.stl");
