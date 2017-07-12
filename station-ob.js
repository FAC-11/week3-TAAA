



var stationString="1000003,ALDGATE"
// 1000004,ALDGATE EAST
// 1000013,BANK
// 1000022,BETHNAL GREEN
// 1001023,BETHNAL GREEN NR
// 1002019,BOW CHURCH
// 1000029,BOW ROAD
// 1000138,LIVERPOOL STREET
// 1000139,LONDON BRIDGE
// 1000146,MILE END
// 1000148,MONUMENT
// 1000149,MOORGATE
// 1000169,OLD STREET
// 1002066,PUDDING MILL LANE
// 1000225,ST PAUL'S
// 1000220,STEPNEY GREEN
// 1000226,STRATFORD
// 1003007,STRATFORD HIGH STREET
// 1003009,STRATFORD INTERNATIONAL
// 1002076,TOWER GATEWAY
// 1000238,TOWER HILL
// 1000268,WHITECHAPEL
// "
stationsArray=stationString.split("/n");

stationsObj={};
stationsArray=[];
intermediateArray.forEach (function (stationPair) {
  var pair=stationPair.split(",");
  if (pair[0]>=1000000) & pair[1] && pair[1].length>0) {
    stationsObj [pair[0]]=pair[1];
    stationsArray [pair[0].slice(3,6)]=pair[1];
  }
  else {
    console.log ('weird data found:',stationPair);
  }
});


exports.stationsArray = stationsArray;
exports.stationsObj = stationsObj;
