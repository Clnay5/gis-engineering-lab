import {test} from 'node:test';import assert from 'node:assert/strict';import {forward,inverse,run,MAX_X} from './core.mjs';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} ≠ ${b}`);
test('origin is stable',()=>{const p=forward([0,0]);close(p[0],0);close(p[1],0);});
test('one degree longitude follows spherical arc length',()=>close(forward([1,0])[0],111319.49079327357));
test('roundtrip across hemispheres',()=>{for(const p of [[114.3,30.5],[-74,40],[-179,-80],[180,85]]){const q=inverse(forward(p));close(q[0],p[0]);close(q[1],p[1]);}});
test('poles fail instead of silently clamping',()=>assert.throws(()=>forward([0,90])));
test('invalid projected square fails',()=>assert.throws(()=>inverse([MAX_X*2,0])));
test('GeoJSON export always uses longitude/latitude',()=>{const r=run({direction:'inverse',points:[forward([114,30])]});close(r.geojson.features[0].geometry.coordinates[0],114);});
test('unknown direction is rejected',()=>assert.throws(()=>run({direction:'datum-shift',points:[]})));
