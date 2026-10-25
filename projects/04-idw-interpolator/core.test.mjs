import {test} from 'node:test';import assert from 'node:assert/strict';import {predict,run} from './core.mjs';
const samples=[{x:0,y:0,value:10},{x:2,y:0,value:30}];
test('equal distances give arithmetic mean',()=>assert.equal(predict(samples,1,0),20));
test('exact observations are honoured',()=>assert.equal(predict(samples,0,0),10));
test('coincident observations are averaged',()=>assert.equal(predict([...samples,{x:0,y:0,value:20}],0,0),15));
test('radius gaps remain NoData',()=>assert.equal(predict(samples,50,50,2,2,1),null));
test('constant field remains constant',()=>{const r=run({units:'meters',samples:samples.map(s=>({...s,value:7})),bbox:[0,0,2,2],width:4,height:4});assert.ok(r.grid.flat().every(v=>Math.abs(v-7)<1e-12));});
test('geographic degrees are refused',()=>assert.throws(()=>run({units:'degrees',samples,bbox:[0,0,2,2]})));
test('invalid k and powers are refused',()=>{for(const change of [{k:0},{power:0}])assert.throws(()=>run({units:'meters',samples,bbox:[0,0,2,2],...change}));});
