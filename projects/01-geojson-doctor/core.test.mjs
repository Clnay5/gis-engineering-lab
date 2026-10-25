import {test} from 'node:test';import assert from 'node:assert/strict';import {run} from './core.mjs';
const f=(geometry,id=1)=>({type:'Feature',id,properties:{},geometry});
test('valid Point reports bounds',()=>{const r=run(f({type:'Point',coordinates:[114,30]}));assert.equal(r.summary.issues,0);assert.deepEqual(r.bbox,[114,30,114,30]);});
test('unclosed rings have a located issue',()=>assert.ok(run(f({type:'Polygon',coordinates:[[[0,0],[1,0],[1,1],[0,1]]]})).issues.some(x=>x.code==='RING_OPEN'&&x.path.includes('coordinates'))));
test('invalid coordinates do not enter valid export',()=>assert.equal(run(f({type:'Point',coordinates:[181,30]})).geojson.features.length,0));
test('duplicate identifiers are reported',()=>{const a=f(null);assert.ok(run({type:'FeatureCollection',features:[a,a]}).issues.some(x=>x.code==='DUPLICATE_ID'));});
test('nested collections and null geometry are accepted',()=>assert.equal(run(f({type:'GeometryCollection',geometries:[null,{type:'Point',coordinates:[1,1]}]})).summary.valid,1));
test('bad properties and short lines are rejected',()=>{const a=f({type:'LineString',coordinates:[[0,0]]});a.properties=[];assert.equal(run(a).summary.issues,2);});
test('unsupported root fails clearly',()=>assert.throws(()=>run({type:'Polygon'})));
