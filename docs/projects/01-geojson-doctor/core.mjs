export function run(data){
 const issues=[],features=data?.type==='FeatureCollection'?data.features:data?.type==='Feature'?[data]:null;
 if(!Array.isArray(features))throw new Error('Feature or FeatureCollection required');if(features.length>20000)throw new Error('maximum 20,000 features');
 const positions=[],ids=new Set();let coordinateCount=0;
 const add=(index,path,code,message)=>issues.push({index,path,code,message});
 function position(p,index,path){if(!Array.isArray(p)||p.length<2||!p.every(Number.isFinite)){add(index,path,'POSITION','position requires at least two finite numbers');return;}coordinateCount++;positions.push(p);if(Math.abs(p[0])>180||Math.abs(p[1])>90)add(index,path,'RANGE','expected WGS84 longitude/latitude');}
 function ring(r,index,path){if(!Array.isArray(r)||r.length<4){add(index,path,'RING_SIZE','ring requires at least four positions');return;}r.forEach((p,j)=>position(p,index,`${path}/${j}`));if(JSON.stringify(r[0])!==JSON.stringify(r.at(-1)))add(index,path,'RING_OPEN','ring is not closed');}
 function geometry(g,index,path,depth=0){if(depth>16){add(index,path,'DEPTH','geometry nesting exceeds 16');return;}if(g===null)return;if(!g||typeof g!=='object'){add(index,path,'GEOMETRY','invalid geometry');return;}const c=g.coordinates;
 if(g.type==='GeometryCollection'){if(!Array.isArray(g.geometries))add(index,path,'GEOMETRIES','geometries must be an array');else g.geometries.forEach((v,j)=>geometry(v,index,`${path}/geometries/${j}`,depth+1));return;}
 if(!Array.isArray(c)){add(index,path,'COORDINATES','missing coordinates');return;}
 if(g.type==='Point')position(c,index,path+'/coordinates');
 else if(g.type==='MultiPoint'){if(!c.length)add(index,path,'EMPTY','empty coordinates');c.forEach((p,j)=>position(p,index,`${path}/coordinates/${j}`));}
 else if(g.type==='LineString'){if(c.length<2)add(index,path,'LINE_SIZE','line needs two positions');c.forEach((p,j)=>position(p,index,`${path}/coordinates/${j}`));}
 else if(g.type==='MultiLineString'){if(!c.length)add(index,path,'EMPTY','empty coordinates');c.forEach((r,j)=>geometry({type:'LineString',coordinates:r},index,`${path}/${j}`));}
 else if(g.type==='Polygon'){if(!c.length)add(index,path,'EMPTY','empty polygon');c.forEach((r,j)=>ring(r,index,`${path}/coordinates/${j}`));}
 else if(g.type==='MultiPolygon'){if(!c.length)add(index,path,'EMPTY','empty multipolygon');c.forEach((p,j)=>geometry({type:'Polygon',coordinates:p},index,`${path}/${j}`));}
 else add(index,path,'TYPE','unsupported geometry type');}
 features.forEach((f,i)=>{if(!f||f.type!=='Feature'){add(i,'/','FEATURE','invalid Feature');return;}if(f.id!==undefined){const key=JSON.stringify(f.id);if(ids.has(key))add(i,'/id','DUPLICATE_ID','duplicate id');ids.add(key);}if(!('properties'in f)||(f.properties!==null&&(typeof f.properties!=='object'||Array.isArray(f.properties))))add(i,'/properties','PROPERTIES','properties must be object or null');geometry(f.geometry,i,'/geometry');});
 let bbox=null;if(positions.length){bbox=[Infinity,Infinity,-Infinity,-Infinity];for(const [x,y]of positions){bbox[0]=Math.min(bbox[0],x);bbox[1]=Math.min(bbox[1],y);bbox[2]=Math.max(bbox[2],x);bbox[3]=Math.max(bbox[3],y);}}
 const valid=features.filter((_,i)=>!issues.some(x=>x.index===i));return {summary:{features:features.length,coordinateCount,issues:issues.length,valid:valid.length},issues,bbox,geojson:{type:'FeatureCollection',features:valid},visual:{kind:'features',features:valid},limitations:'Structural audit only; no self-intersection, winding repair, topology or antimeridian repair.'};
}
