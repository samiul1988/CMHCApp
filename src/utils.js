
// CONSTANTS
// Table 3.1.1 to Table 3.1.8 - Equivalent noise level at 30m from centreline if posted speed limit is 40 km/h
const table_speed = [40,50,60,70,80,90,100,110];
const table_trafficVolume=[1000,1250,1600,2000,2500,3150,4000,5000,6300,8000,10000,12500,16000,20000,25000,31500,40000,50000,63000,80000,100000,125000,160000,200000,250000]; 
const table_splAt30m = [{
    speed:40,
    percent_heavy_traffic_lower_limit: [0.0,	2.0,	3.8,	6.1,	9.0,	13.0,	18.0,	23.0,	31.0,	40.0,	51.0,	66.0,	84.0],
    percent_heavy_traffic_upper_limit: [1.9,	3.7,	6,	8.9,	12,	17,	22,	30,	39,	50,	65,	83,	100],
    matrix:[
        [45,46,47,48,49,50,51,52,53,54,55,56,57],
        [46,47,48,49,50,51,52,53,54,55,56,57,58],
        [47,48,49,50,51,52,53,54,55,56,57,58,59],
        [48,49,50,51,52,53,54,55,56,57,58,59,60],
        [49,50,51,52,53,54,55,56,57,58,59,60,61],
        [50,51,52,53,54,55,56,57,58,59,60,61,62],
        [51,52,53,54,55,56,57,58,59,60,61,62,63],
        [52,53,54,55,56,57,58,59,60,61,62,63,64],
        [53,54,55,56,57,58,59,60,61,62,63,64,65],
        [54,55,56,57,58,59,60,61,62,63,64,65,66],
        [55,56,57,58,59,60,61,62,63,64,65,66,67],
        [56,57,58,59,60,61,62,63,64,65,66,67,68],
        [57,58,59,60,61,62,63,64,65,66,67,68,69],
        [58,59,60,61,62,63,64,65,66,67,68,69,70],
        [59,60,61,62,63,64,65,66,67,68,69,70,71],
        [60,61,62,63,64,65,66,67,68,69,70,71,72],
        [61,62,63,64,65,66,67,68,69,70,71,72,73],
        [62,63,64,65,66,67,68,69,70,71,72,73,74],
        [63,64,65,66,67,68,69,70,71,72,73,74,75],
        [64,65,66,67,68,69,70,71,72,73,74,75,76],
        [65,66,67,68,69,70,71,72,73,74,75,76,77],
        [66,67,68,69,70,71,72,73,74,75,76,77,78],
        [67,68,69,70,71,72,73,74,75,76,77,78,79],
        [68,69,70,71,72,73,74,75,76,77,78,79,80],
        [69,70,71,72,73,74,75,76,77,78,79,80,81]
    ]
    },{
    speed:50,
    percent_heavy_traffic_lower_limit: [0.0,	1.6,	3.6,	6.1,	9.3,	14.0,	19.0,	25.0,	33.0,	43.0,	56.0,	72.0,	92.0],
    percent_heavy_traffic_upper_limit: [1.5,	3.5,	6,	9.2,	13,	18,	24,	32,	42,	55,	71,	91,	100],
    matrix:[
        [47,48,49,50,51,52,53,54,55,56,57,58,59],
        [48,49,50,51,52,53,54,55,56,57,58,59,60],
        [49,50,51,52,53,54,55,56,57,58,59,60,61],
        [50,51,52,53,54,55,56,57,58,59,60,61,62],
        [51,52,53,54,55,56,57,58,59,60,61,62,63],
        [52,53,54,55,56,57,58,59,60,61,62,63,64],
        [53,54,55,56,57,58,59,60,61,62,63,64,65],
        [54,55,56,57,58,59,60,61,62,63,64,65,66],
        [55,56,57,58,59,60,61,62,63,64,65,66,67],
        [56,57,58,59,60,61,62,63,64,65,66,67,68],
        [57,58,59,60,61,62,63,64,65,66,67,68,69],
        [58,59,60,61,62,63,64,65,66,67,68,69,70],
        [59,60,61,62,63,64,65,66,67,68,69,70,71],
        [60,61,62,63,64,65,66,67,68,69,70,71,72],
        [61,62,63,64,65,66,67,68,69,70,71,72,73],
        [62,63,64,65,66,67,68,69,70,71,72,73,74],
        [63,64,65,66,67,68,69,70,71,72,73,74,75],
        [64,65,66,67,68,69,70,71,72,73,74,75,76],
        [65,66,67,68,69,70,71,72,73,74,75,76,77],
        [66,67,68,69,70,71,72,73,74,75,76,77,78],
        [67,68,69,70,71,72,73,74,75,76,77,78,79],
        [68,69,70,71,72,73,74,75,76,77,78,79,80],
        [69,70,71,72,73,74,75,76,77,78,79,80,81],
        [70,71,72,73,74,75,76,77,78,79,80,81,82],
        [71,72,73,74,75,76,77,78,79,80,81,82,83]]
    },{
    speed:60,
    percent_heavy_traffic_lower_limit: [0,1.8,4.1,6.9,11,15,21,28,37,48,62,80],
    percent_heavy_traffic_upper_limit: [1.7,4,6.8,10,14,20,27,36,47,61,79,100],
    matrix:[
        [49,50,51,52,53,54,55,56,57,58,59,60],
        [50,51,52,53,54,55,56,57,58,59,60,61],
        [51,52,53,54,55,56,57,58,59,60,61,62],
        [52,53,54,55,56,57,58,59,60,61,62,63],
        [53,54,55,56,57,58,59,60,61,62,63,64],
        [54,55,56,57,58,59,60,61,62,63,64,65],
        [55,56,57,58,59,60,61,62,63,64,65,66],
        [56,57,58,59,60,61,62,63,64,65,66,67],
        [57,58,59,60,61,62,63,64,65,66,67,68],
        [58,59,60,61,62,63,64,65,66,67,68,69],
        [59,60,61,62,63,64,65,66,67,68,69,70],
        [60,61,62,63,64,65,66,67,68,69,70,71],
        [61,62,63,64,65,66,67,68,69,70,71,72],
        [62,63,64,65,66,67,68,69,70,71,72,73],
        [63,64,65,66,67,68,69,70,71,72,73,74],
        [64,65,66,67,68,69,70,71,72,73,74,75],
        [65,66,67,68,69,70,71,72,73,74,75,76],
        [66,67,68,69,70,71,72,73,74,75,76,77],
        [67,68,69,70,71,72,73,74,75,76,77,78],
        [68,69,70,71,72,73,74,75,76,77,78,79],
        [69,70,71,72,73,74,75,76,77,78,79,80],
        [70,71,72,73,74,75,76,77,78,79,80,81],
        [71,72,73,74,75,76,77,78,79,80,81,82],
        [72,73,74,75,76,77,78,79,80,81,82,83],
        [73,74,75,76,77,78,79,80,81,82,83,84]
    ]    
    },{
    speed:70,
    percent_heavy_traffic_lower_limit: [0,0.7,2.8,5.6,9,14,19,26,35,45,59,76,98],
    percent_heavy_traffic_upper_limit: [0.6,2.7,5.5,8.9,13,18,25,34,44,58,75,97,100],
    matrix:[
        [50,51,52,53,54,55,56,57,58,59,60,61,62],
        [51,52,53,54,55,56,57,58,59,60,61,62,63],
        [52,53,54,55,56,57,58,59,60,61,62,63,64],
        [53,54,55,56,57,58,59,60,61,62,63,64,65],
        [54,55,56,57,58,59,60,61,62,63,64,65,66],
        [55,56,57,58,59,60,61,62,63,64,65,66,67],
        [56,57,58,59,60,61,62,63,64,65,66,67,68],
        [57,58,59,60,61,62,63,64,65,66,67,68,69],
        [58,59,60,61,62,63,64,65,66,67,68,69,70],
        [59,60,61,62,63,64,65,66,67,68,69,70,71],
        [60,61,62,63,64,65,66,67,68,69,70,71,72],
        [61,62,63,64,65,66,67,68,69,70,71,72,73],
        [62,63,64,65,66,67,68,69,70,71,72,73,74],
        [63,64,65,66,67,68,69,70,71,72,73,74,75],
        [64,65,66,67,68,69,70,71,72,73,74,75,76],
        [65,66,67,68,69,70,71,72,73,74,75,76,77],
        [66,67,68,69,70,71,72,73,74,75,76,77,78],
        [67,68,69,70,71,72,73,74,75,76,77,78,79],
        [68,69,70,71,72,73,74,75,76,77,78,79,80],
        [69,70,71,72,73,74,75,76,77,78,79,80,81],
        [70,71,72,73,74,75,76,77,78,79,80,81,82],
        [71,72,73,74,75,76,77,78,79,80,81,82,83],
        [72,73,74,75,76,77,78,79,80,81,82,83,84],
        [73,74,75,76,77,78,79,80,81,82,83,84,85],
        [74,75,76,77,78,79,80,81,82,83,84,85,86]
    ]     
    },{
    speed:80,
    percent_heavy_traffic_lower_limit: [0,2,4.7,8.1,13,18,25,33,44,58,75,96],
    percent_heavy_traffic_upper_limit: [1.9,4.6,8,12,17,24,32,43,57,74,95,100],
    matrix: [
        [52,53,54,55,56,57,58,59,60,61,62,63],
        [53,54,55,56,57,58,59,60,61,62,63,64],
        [54,55,56,57,58,59,60,61,62,63,64,65],
        [55,56,57,58,59,60,61,62,63,64,65,66],
        [56,57,58,59,60,61,62,63,64,65,66,67],
        [57,58,59,60,61,62,63,64,65,66,67,68],
        [58,59,60,61,62,63,64,65,66,67,68,69],
        [59,60,61,62,63,64,65,66,67,68,69,70],
        [60,61,62,63,64,65,66,67,68,69,70,71],
        [61,62,63,64,65,66,67,68,69,70,71,72],
        [62,63,64,65,66,67,68,69,70,71,72,73],
        [63,64,65,66,67,68,69,70,71,72,73,74],
        [64,65,66,67,68,69,70,71,72,73,74,75],
        [65,66,67,68,69,70,71,72,73,74,75,76],
        [66,67,68,69,70,71,72,73,74,75,76,77],
        [67,68,69,70,71,72,73,74,75,76,77,78],
        [68,69,70,71,72,73,74,75,76,77,78,79],
        [69,70,71,72,73,74,75,76,77,78,79,80],
        [70,71,72,73,74,75,76,77,78,79,80,81],
        [71,72,73,74,75,76,77,78,79,80,81,82],
        [72,73,74,75,76,77,78,79,80,81,82,83],
        [73,74,75,76,77,78,79,80,81,82,83,84],
        [74,75,76,77,78,79,80,81,82,83,84,85],
        [75,76,77,78,79,80,81,82,83,84,85,86],
        [76,77,78,79,80,81,82,83,84,85,86,87]
    ] 
    },{
    speed:90,
    percent_heavy_traffic_lower_limit: [0,1.3,3.9,7,12,17,23,31,41,54,70,90],
    percent_heavy_traffic_upper_limit: [1.2,3.8,6.9,11,16,22,30,40,53,69,89,100],
    matrix: [
        [53,54,55,56,57,58,59,60,61,62,63,64],
        [54,55,56,57,58,59,60,61,62,63,64,65],
        [55,56,57,58,59,60,61,62,63,64,65,66],
        [56,57,58,59,60,61,62,63,64,65,66,67],
        [57,58,55,60,61,62,63,64,65,66,67,68],
        [58,59,60,61,62,63,64,65,66,67,68,69],
        [59,60,61,62,63,64,65,66,67,68,69,70],
        [60,61,62,63,64,65,66,67,68,69,70,71],
        [61,62,63,64,65,66,67,68,69,70,71,72],
        [62,63,64,65,66,67,68,69,70,71,72,73],
        [63,64,65,66,67,68,69,70,71,72,73,74],
        [64,65,66,67,68,69,70,71,72,73,74,75],
        [65,66,67,68,69,70,71,72,73,74,75,76],
        [66,67,68,69,70,71,72,73,74,75,76,77],
        [67,68,69,70,71,72,73,74,75,76,77,78],
        [68,69,70,71,72,73,74,75,76,77,78,79],
        [69,70,71,72,73,74,75,76,77,78,79,80],
        [70,71,72,73,74,75,76,77,78,79,80,81],
        [71,72,73,74,75,76,77,78,79,80,81,82],
        [72,73,74,75,76,77,78,79,80,81,82,83],
        [73,74,75,76,77,78,79,80,81,82,83,84],
        [74,75,76,77,78,79,80,81,82,83,84,85],
        [75,76,77,78,79,80,81,82,83,84,85,86],
        [76,77,78,79,80,81,82,83,84,85,86,87],
        [77,78,79,80,81,82,83,84,85,86,87,88]
    ]    
    },{
    speed:100,
    percent_heavy_traffic_lower_limit: [0,1,3.5,6.5,11,16,22,30,39,52,67,86],
    percent_heavy_traffic_upper_limit: [0.9,3.4,6.4,10,15,21,29,38,51,66,85,100],
    matrix: [
        [54,55,56,57,58,59,60,61,62,63,64,65],
        [55,56,57,58,59,60,61,62,63,64,65,66],
        [56,57,58,59,60,61,62,63,64,65,66,67],
        [57,58,59,60,61,62,63,64,65,66,67,68],
        [58,59,60,61,62,63,64,65,66,67,68,69],
        [59,60,61,62,63,64,65,66,67,68,69,70],
        [60,61,62,63,64,65,66,67,68,69,70,71],
        [61,62,63,64,65,66,67,68,69,70,71,72],
        [62,63,64,65,66,67,68,69,70,71,72,73],
        [63,64,65,66,67,68,69,70,71,72,73,74],
        [64,65,66,67,68,69,70,71,72,73,74,75],
        [65,66,67,68,69,70,71,72,73,74,75,76],
        [66,67,68,69,70,71,72,73,74,75,76,77],
        [67,68,69,70,71,72,73,74,75,76,77,78],
        [68,69,70,71,72,73,74,75,76,77,78,79],
        [69,70,71,72,73,74,75,76,77,78,79,80],
        [70,71,72,73,74,75,76,77,78,79,80,81],
        [71,72,73,74,75,76,77,78,79,80,81,82],
        [72,73,74,75,76,77,78,79,80,81,82,83],
        [73,74,75,76,77,78,79,80,81,82,83,84],
        [74,75,76,77,78,79,80,81,82,83,84,85],
        [75,76,77,78,79,80,81,82,83,84,85,86],
        [76,77,78,79,80,81,82,83,84,85,86,87],
        [77,78,79,80,81,82,83,84,85,86,87,88],
        [78,79,80,81,82,83,84,85,86,87,88,89]
    ]    
    },{
    speed:110,
    percent_heavy_traffic_lower_limit: [0,1,3.4,6.4,11,16,22,29,39,51,66,86],
    percent_heavy_traffic_upper_limit: [0.9,3.3,6.3,10,15,21,28,38,50,65,85,100],
    matrix: [
        [55,56,57,58,59,60,61,62,63,64,65,66],
        [56,57,58,59,60,61,62,63,64,65,66,67],
        [57,58,59,60,61,62,63,64,65,66,67,68],
        [58,59,60,61,62,63,64,65,66,67,68,69],
        [59,60,61,62,63,64,65,66,67,68,69,70],
        [60,61,62,63,64,65,66,67,68,69,70,71],
        [61,62,63,64,65,66,67,68,69,70,71,72],
        [62,63,64,65,66,67,68,69,70,71,72,73],
        [63,64,65,66,67,68,69,70,71,72,73,74],
        [64,65,66,67,68,69,70,71,72,73,74,75],
        [65,66,67,68,69,70,71,72,73,74,75,76],
        [66,67,68,69,70,71,72,73,74,75,76,77],
        [67,68,69,70,71,72,73,74,75,76,77,78],
        [68,69,70,71,72,73,74,75,76,77,78,79],
        [69,70,71,72,73,74,75,76,77,78,79,80],
        [70,71,72,73,74,75,76,77,78,79,80,81],
        [71,72,73,74,75,76,77,78,79,80,81,82],
        [72,73,74,75,76,77,78,79,80,81,82,83],
        [73,74,75,76,77,78,79,80,81,82,83,84],
        [74,75,76,77,78,79,80,81,82,83,84,85],
        [75,76,77,78,79,80,81,82,83,84,85,86],
        [76,77,78,79,80,81,82,83,84,85,86,87],
        [77,78,79,80,81,82,83,84,85,86,87,88],
        [78,79,80,81,82,83,84,85,86,87,88,89],
        [79,80,81,82,83,84,85,86,87,88,89,90]
    ]     
    }
];

// Table 3.2 - Correction (in dB) to be added for road gradient
const table_correctionForRoadGradient = {
    road_gradient:[0,1,2,3,4,5],
    percent_heavy_traffic_upper_limit:[7,12,17,100],
    matrix:[
        [0,0,1,1,1,2],
        [0,1,1,2,2,3],
        [0,1,1,2,3,3],
        [0,1,2,3,3,4]
    ]
};

// Table 3.3 - Correction (in dB) to be added for interrupted traffic flow
const table_correctionForInterruptedTrafficFlow = {
    distance_from_intersection:[59,150,Infinity],
    matrix:[2,1,0] 
};

// Table 3.4 - Equivalent source height (m) for road traffic
const table_equivalentSourceHeight = {
    percent_heavy_traffic_upper_limit:[0.7,2,4,6,8.5,12,16,22,50,100],
    matrix:[
        [0.5,0.4,0.4,0.4,0.4,0.3,0.3,0.3],
        [0.7,0.6,0.5,0.5,0.4,0.4,0.4,0.3],
        [1.1,0.8,0.7,0.6,0.5,0.5,0.4,0.4],
        [1.4,1,0.8,0.7,0.6,0.5,0.5,0.4],
        [1.5,1.1,0.9,0.7,0.7,0.6,0.5,0.5],
        [1.6,1.2,1,0.8,0.7,0.6,0.6,0.5],
        [1.7,1.3,1.1,0.9,0.8,0.7,0.6,0.6],
        [1.8,1.4,1.2,0.9,0.8,0.7,0.6,0.6],
        [1.9,1.5,1.2,1,0.9,0.7,0.6,0.6],
        [2,1.6,1.3,1.1,1,0.8,0.7,0.7]
    ]
}

// Table 3.5 - Correction (in dB) for distance from source to receiver and for total effective height above ground
const table_correctionForSrcRcvDistAndTotEffHeight = [
    {
        eff_height_upper_limit:[2.5,4,5.5,7,9,11,14,18,22,28,36,45,57,Infinity],
        h_dist_source_receiver_upper_limit:[11,14,18,22,27,35,45,57,72,90,112,142,180,225,275,350,450,Infinity],
        matrix:[
            [5,4,3,1,-1,-3,-5,-7,-9,-11,-13,-15,-17,-19,-21,-22,-23,-25],
            [5,4,3,1,0,-2,-4,-6,-8,-10,-12,-14,-16,-18,-19,-21,-22,-24],
            [5,4,3,2,0,-2,-4,-6,-8,-10,-12,-14,-15,-17,-18,-20,-21,-23],
            [5,4,3,2,1,-1,-3,-5,-7,-9,-11,-13,-14,-16,-18,-19,-20,-22],
            [5,4,3,2,1,0,-2,-4,-6,-8,-10,-12,-14,-16,-17,-19,-20,-22],
            [5,4,3,2,1,0,-1,-3,-5,-7,-9,-11,-13,-15,-17,-18,-20,-21],
            [5,4,3,2,1,0,-1,-2,-4,-6,-8,-10,-12,-14,-16,-17,-19,-21],
            [5,4,3,2,1,0,-1,-2,-3,-5,-7,-9,-11,-13,-15,-17,-18,-20],
            [5,4,3,2,1,0,-1,-2,-3,-4,-6,-8,-10,-12,-14,-16,-18,-20],
            [5,4,3,2,1,0,-1,-2,-3,-4,-5,-7,-9,-11,-13,-15,-17,-19],
            [5,4,3,2,1,0,-1,-2,-3,-4,-5,-6,-8,-10,-12,-14,-16,-18],
            [5,4,3,2,1,0,-1,-2,-3,-4,-5,-6,-7,-9,-11,-13,-15,-17],
            [5,4,3,2,1,0,-1,-2,-3,-4,-5,-6,-7,-8,-10,-12,-14,-16],
            [5,4,3,2,1,0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-11,-13,-15]
        ]
    },{
    eff_height_upper_limit:[Infinity],
    h_dist_source_receiver_upper_limit:[11,14,18,22,27,35,45,57,72,90,112,142,180,225,275,350,450,Infinity],
    matrix:[
        [5,4,3,2,1,0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12]
    ]
    }
];

// Table 3.6 - Effective barrier length ratio (w) for asymetric barriers
const table_effbarrierLengthRatio = {
    ratio_v_by_g_upper_limit:[0.15,0.35,0.5,0.8,1.2,1.7,2.2,2.7,3.5,4.5,5.5,6.5,7.5,8.5,9.5,1000],
    ratio_u_by_g_upper_limit:[0.15,0.35,0.5,0.8,1.2,1.7,2.2,2.7,3.5,4.5,5.5,6.5,7.5,8.5,9.5,1000],
    matrix:[
        [0,0,0,0.3,0.5,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7],
        [0,0.3,0.3,0.5,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7],
        [0,0.3,0.5,0.5,0.7,1,1,1,1,1,1,1,1,1,1,1],
        [0.3,0.5,0.5,0.7,0.7,1,1,1,1,1,1,1,1,1,1,1],
        [0.5,0.7,0.7,0.7,1,1,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5],
        [0.7,0.7,1,1,1,1.5,1.5,2,2,2,2,2,2,2,2,2],
        [0.7,0.7,1,1,1.5,1.5,2,2,2.5,2.5,3,3,3,3,3,3],
        [0.7,0.7,1,1,1.5,2,2,2.5,2.5,3,3,4,4,4,4,4],
        [0.7,0.7,1,1,1.5,2,2.5,2.5,3,3,4,4,4,4,4,4],
        [0.7,0.7,1,1,1.5,2,2.5,3,3,4,4,5,5,5,5,5],
        [0.7,0.7,1,1,1.5,2,3,3,4,4,5,5,6,6,6,6],
        [0.7,0.7,1,1,1.5,2,3,3,4,5,5,6,6,7,7,7],
        [0.7,0.7,1,1,1.5,2,3,3,4,5,6,6,7,7,7,8],
        [0.7,0.7,1,1,1.5,2,3,4,4,5,6,7,7,8,8,9],
        [0.7,0.7,1,1,1.5,2,3,4,4,5,6,7,7,8,9,9],
        [0.7,0.7,1,1,1.5,2,3,4,4,5,6,7,8,9,9,10]
    ]
};

// Table 3.7 - Barrier Attenuation (in dB) for various values of the effective barrier length ratio (w)
const table_barrierAttenuationForW = [
    {
        path_length_difference:[0.06,0.05,0.04,0.03,0.02,0],
        w:[0.3,0.5,0.7,1,1.5,2,2.5,3,4,5,6,7,8,9,10,Infinity],
        matrix:[
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [1,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3],
            [1,2,2,3,4,4,4,4,4,4,4,4,4,4,4,4],
            [1,2,2,3,4,5,5,5,5,5,5,5,5,5,5,5]            
        ]
    },{
        path_length_difference:[0.03,0.07,0.13,0.2,0.3,0.41,0.55,0.79,1,1.4,1.8,2.5,3.3,4.5,6],
        w:[0.3,0.5,0.7,1,1.5,2,2.5,3,4,5,6,7,8,9,10,Infinity],
        matrix:[
            [1,2,3,4,5,6,6,6,6,6,6,6,6,6,6,6],
            [1,2,3,4,5,6,6,6,7,7,7,7,7,7,7,7],
            [1,2,3,4,6,7,7,7,8,8,8,8,8,8,8,8],
            [1,2,3,4,6,7,7,8,9,9,9,9,9,9,9,9],
            [1,2,3,4,6,7,8,9,9,10,10,10,10,10,10,10],
            [1,2,3,4,6,7,8,9,10,10,11,11,11,11,11,11],
            [1,2,3,4,6,8,9,10,11,11,12,12,12,12,12,12],
            [1,2,3,4,6,8,9,10,11,11,12,12,12,12,12,13],
            [1,2,3,4,6,8,9,10,11,12,12,13,13,13,13,14],
            [1,2,3,4,6,8,9,10,11,12,12,13,14,14,14,15],
            [1,2,3,4,6,8,9,10,12,13,13,14,14,14,15,16],
            [1,2,3,4,6,8,9,10,12,13,14,15,15,15,16,17],
            [1,2,3,4,6,8,9,11,12,13,15,15,16,16,17,18],
            [1,2,3,4,6,8,9,11,12,14,15,16,17,17,18,19],
            [2,3,3,5,7,8,10,11,13,15,16,17,18,18,19,20]
        ]
    }
];

const findNearestIndex = (val,arr)=>{
    let diffArray = arr.map((element)=>Math.abs(val - element));
    return diffArray.indexOf(Math.min(...diffArray));
};

const findIndexFromUpperLimitArray = (val, arr)=>{
    let count = {};
    let flagArray = arr.map((element)=>val<=element?"y":"n");
    let countArray = flagArray.map((element)=>count[element] = (count[element]||0) + 1);
    return arr.length - count["y"];
};

const calculateSPLat30m = (speedLimit,trafficVolume,percentageOfHeavyTraffic)=>{
    // console.log(table_splAt30m);
    let i = table_speed.indexOf(speedLimit);
    let j = findNearestIndex(trafficVolume,table_trafficVolume);
    let k = findIndexFromUpperLimitArray(percentageOfHeavyTraffic,table_splAt30m[i].percent_heavy_traffic_upper_limit);
    // console.log(i+'     '+j+'    '+k);
    return table_splAt30m[i].matrix[j][k]; 
};

const calculateCorrectionForRoadGrad = (percentageOfHeavyTraffic,roadGradient)=>{
    let i = findIndexFromUpperLimitArray(percentageOfHeavyTraffic,table_correctionForRoadGradient.percent_heavy_traffic_upper_limit);
    let j = findNearestIndex(roadGradient,table_correctionForRoadGradient.road_gradient);
    // console.log(i+'     '+j);
    return table_correctionForRoadGradient.matrix[i][j]; 
};

const calculateCorrectionForInterruptedTrafficFlow = (distanceReceiverIntersection)=>{
    return table_correctionForInterruptedTrafficFlow.matrix[findIndexFromUpperLimitArray(distanceReceiverIntersection,table_correctionForInterruptedTrafficFlow.distance_from_intersection)]; 
};

const calculateEqSourceHeight = (speedLimit, percentageOfHeavyTraffic)=>{
    let i = findIndexFromUpperLimitArray(percentageOfHeavyTraffic,table_equivalentSourceHeight.percent_heavy_traffic_upper_limit);
    let j = table_speed.indexOf(speedLimit);
    // console.log(i+'     '+j);
    return table_equivalentSourceHeight.matrix[i][j]; 
};

const calculateCorrDistAndHeight = (isGroundSurfaceSoft,cal_effectiveTotalHeight,hDistanceSourceToReceiver)=>{
    let i = isGroundSurfaceSoft==true?0:1;
    let j = findIndexFromUpperLimitArray(cal_effectiveTotalHeight,table_correctionForSrcRcvDistAndTotEffHeight[i].eff_height_upper_limit);
    let k = findIndexFromUpperLimitArray(hDistanceSourceToReceiver,table_correctionForSrcRcvDistAndTotEffHeight[i].h_dist_source_receiver_upper_limit);
    
    return table_correctionForSrcRcvDistAndTotEffHeight[i].matrix[j][k]; 
};

const calculateEffBarrierAtt = (barrierInterruptsLOS, pathLengthDifference, w)=>{
    let i = barrierInterruptsLOS==false?0:1;
    let j = findNearestIndex(pathLengthDifference,table_barrierAttenuationForW[i].path_length_difference);
    let k = findIndexFromUpperLimitArray(w,table_barrierAttenuationForW[i].w);
    
    return table_barrierAttenuationForW[i].matrix[j][k]; 
};

const calculatePathLengthDiffFromEffBarrierAtt = (barrierInterruptsLOS, effBarrierAtt, w)=>{
    let i = barrierInterruptsLOS==false?0:1;
    // let j = findNearestIndex(pathLengthDifference,table_barrierAttenuationForW[i].path_length_difference);
    let k = findIndexFromUpperLimitArray(w,table_barrierAttenuationForW[i].w);
    let j;
    let tempArr = [];
    for (j of table_barrierAttenuationForW[i].matrix){
        tempArr.push(j[k]);
    }
    return table_barrierAttenuationForW[i].path_length_difference[findNearestIndex(effBarrierAtt,tempArr)]; 
};



const isBreakingLOS = (sourceObject, receiverObject, lineObject)=>{
    let xi, yi;
    let sourceToReceiverLineMandC = calculateMandC(sourceObject.x2, sourceObject.y2, receiverObject.x2, receiverObject.y2);
    let lineObjectMandC;

    if (lineObject.x1 == lineObject.x2){
        yi = sourceToReceiverLineMandC.m * lineObject.x1 + sourceToReceiverLineMandC.c

        if ((yi < lineObject.y1) && (yi > lineObject.y2)){
            return "true";
        }else{
            return "false";
        }
    }else if(lineObject.y1 == lineObject.y2){
        xi = (lineObject.y1 - sourceToReceiverLineMandC.c) / sourceToReceiverLineMandC.m;

        if ((xi > lineObject.x1) && (xi < lineObject.x2)){
            return "true";
        }else{
            return "false";
        }
    }else{
        lineObjectMandC = calculateMandC(lineObject.x1, lineObject. y1, lineObject.x2, lineObject.y2);

        xi = - ((sourceToReceiverLineMandC.c - lineObjectMandC.c) / (sourceToReceiverLineMandC.m - lineObjectMandC.m));
        yi = ((sourceToReceiverLineMandC.m * lineObjectMandC.c) - (lineObjectMandC.m * sourceToReceiverLineMandC.c) ) / (sourceToReceiverLineMandC.m - lineObjectMandC.m);

        if ((xi > lineObject.x1) && (xi < lineObject.x2)){
            return "true";
        }else{
            return "false";
        }
    }
};

const calculateMandC = (x1, y1, x2, y2) =>{
    let m, c;

    if (y1 == y2){
        m = 0;
        c = y1;
    }else if (x1 == x2){
        m = Infinity;
        c = Infinity;
    }else{
        m = (y1 - y2)/(x1 - x2);
        c = y1 - (m * x1);
    }
    return {m: m, c:c}
};


const angleBetweenPoints = (x1, y1, x2, y2)=>{
    return Math.atan2((y2 - y1) , (x2 - x1)) * 180 / Math.PI;
}


const calculateFirstPointOfContact =  (object, objectType, sourceLine, receiverLine, barrierLine)=>{
    const decisionOptions = ["SourceLine", "ReceiverLine", "Barrier"];
    let tmpArr = [];
    let decision = "";
    let x,y;

    if (objectType == "source"){
        tmpArr.push(angleBetweenPoints(object.x2, object.y2, sourceLine.x2, sourceLine.y2));
        tmpArr.push(angleBetweenPoints(object.x2, object.y2, receiverLine.x1, receiverLine.y1));
        tmpArr.push(angleBetweenPoints(object.x2, object.y2, barrierLine.x2, barrierLine.y2));
        decision = decisionOptions[tmpArr.indexOf(Math.min(...tmpArr))];
        
    } else if (objectType == "receiver"){
        tmpArr.push(angleBetweenPoints(sourceLine.x2, sourceLine.y2, object.x2, object.y2));
        tmpArr.push(angleBetweenPoints(receiverLine.x1, receiverLine.y1, object.x2, object.y2));
        tmpArr.push(angleBetweenPoints(barrierLine.x2, barrierLine.y2, object.x2, object.y2));
        decision = decisionOptions[tmpArr.indexOf(Math.max(...tmpArr))];
    }
    
    if (decision == "SourceLine"){
        x = sourceLine.x2;
        y = sourceLine.y2;
    }else if (decision == "ReceiverLine"){
        x = receiverLine.x1;
        y = receiverLine.y1;
    }else if (decision == "Barrier"){
        x = barrierLine.x2;
        y = barrierLine.y2;
    }

    return {
        decision,
        x,
        y
    };
};

const calculateEffectiveBarrierPosition = (source, receiver, sourceLine, receiverLine, barrierLine)=>{
    const contactPointSource = calculateFirstPointOfContact(source, "source", sourceLine, receiverLine, barrierLine);
    const contactPointReceiver = calculateFirstPointOfContact(receiver, "receiver", sourceLine, receiverLine, barrierLine);

    const sourceToContactPointLineMandC = calculateMandC(source.x2, source.y2, contactPointSource.x, contactPointSource.y);
    const receiverToContactPointLineMandC = calculateMandC(receiver.x2, receiver.y2, contactPointReceiver.x, contactPointReceiver.y);

    return ({
        x: - ((sourceToContactPointLineMandC.c - receiverToContactPointLineMandC.c) / (sourceToContactPointLineMandC.m - receiverToContactPointLineMandC.m)),
        y: ((sourceToContactPointLineMandC.m * receiverToContactPointLineMandC.c) - (receiverToContactPointLineMandC.m * sourceToContactPointLineMandC.c) ) / (sourceToContactPointLineMandC.m - receiverToContactPointLineMandC.m)
    });
};

const extrapolateLine = (x1, y1, x2, y2, X)=>{
    return ((y2 - y1) / (x2 - x1) * X) + (((x2 * y1) - (x1 * y2)) / (x2 - x1));
};
// console.log(calculatePathLengthDiffFromEffBarrierAtt(true,-6,100));

// User Inputs (to be obtained)...
// const speedLimit = 110;  
// const trafficVolume = 3400;
// const percentageOfHeavyTraffic = 5.9;

// const roadWidth = 1.8;
// const hDistanceSourceToReceiver = 20;

// const roadGradient = 2.5;

// const distanceReceiverIntersection = 160;

// const sourceGroundLevel = 0;
// const receiverGroundLevel = 5;
// const receiverHeight = 1.5;
// const isGroundSurfaceSoft = true; // true: soft, false: hard


// WE WILL NOT CONSIDER THE EFFECT OF HORIZONTAL BARRIER LENGTH
// const length_v = 5;
// const length_u = 5;
// const length_g = 5;
// let ratio_v_g;
// let ratio_u_g;
// let w;

// const hDistanceSourceToBarrier = 5;
// let bGroundLevel;
// let bHeight;
// let length_a;
// let length_b;
// let length_c;
// const pathLengthDifference = 6;
// const barrierInterruptsLOS = true;
// let barrierAttenuation;
// let effectiveTotalHeightWithBarrier;
// let noiseLevelWithoutBarrier;
// let noiseLevelWithBarrier;
// let targetNoiseLevel = 58;

// Calculated Fields
// const cal_SPLat30m = findSPLat30m(speedLimit,trafficVolume,percentageOfHeavyTraffic); 
// console.log(cal_SPLat30m);


// const cal_IsOneRoad = roadWidth<hDistanceSourceToReceiver?true:false;

// const cal_correctionRoadGradient = findCorrectionForRoadGrad(percentageOfHeavyTraffic,roadGradient); 
// console.log(cal_correctionRoadGradient);

// const cal_correctionInterruptedTrafficFlow = findCorrectionForInterruptedTrafficFlow(distanceReceiverIntersection);
// console.log(cal_correctionInterruptedTrafficFlow);

// const cal_s = findEqSourceHeight(speedLimit, percentageOfHeavyTraffic);
// console.log(cal_s);

// const cal_effectiveTotalHeightWithoutBarrier = cal_s + receiverHeight + Math.abs(sourceGroundLevel - receiverGroundLevel);
// console.log(cal_effectiveTotalHeightWithoutBarrier);

// const cDistanceAndHeightWithoutBarrier = findCorrDistAndHeight(isGroundSurfaceSoft,cal_effectiveTotalHeightWithoutBarrier,hDistanceSourceToReceiver);
// console.log(cDistanceAndHeightWithoutBarrier);

// const cal_EffBarrierAtt = findEffBarrierAtt(barrierInterruptsLOS, pathLengthDifference, 100); // w is forcefully set to 100 to make the barrier of infinite length
// console.log(cal_EffBarrierAtt);

module.exports={
    calculateSPLat30m,
    calculateCorrectionForRoadGrad,
    calculateCorrectionForInterruptedTrafficFlow,
    calculateEqSourceHeight,
    calculateCorrDistAndHeight,
    calculateEffBarrierAtt, 
    isBreakingLOS, 
    angleBetweenPoints, 
    calculateFirstPointOfContact, 
    calculateEffectiveBarrierPosition, 
    extrapolateLine
};
