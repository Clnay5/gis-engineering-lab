import {test} from 'node:test';import assert from 'node:assert/strict';import {run,encode,decode} from './core.mjs';
test('known reference vector matches standard geohash',()=>assert.equal(encode(-5.6,42.6,5),'ezs42'));
test('decoded cell contains original coordinate',()=>{const [w,s,e,n]=decode(encode(114.3,30.5,8)).bbox;assert.ok(w<=114.3&&114.3<e&&s<=30.5&&30.5<n);});
test('precision increases spatial resolution',()=>{const a=decode(encode(0,0,4)),b=decode(encode(0,0,5));assert.ok(b.bbox[2]-b.bbox[0]<a.bbox[2]-a.bbox[0]);});
test('ordinary cell has eight distinct neighbours',()=>{const r=run({lon:114.3,lat:30.5,precision:6});assert.equal(new Set(r.neighbours.map(n=>n.hash)).size,8);});
test('longitude wraps around dateline neighbours',()=>{const r=run({lon:179.99,lat:0,precision:3});assert.ok(r.neighbours.some(n=>decode(n.hash).center[0]<-170));});
test('pole-crossing neighbours are omitted',()=>assert.ok(run({lon:0,lat:89.99,precision:1}).neighbours.length<8));
test('bad alphabet, poles and precision are refused',()=>{assert.throws(()=>decode('aaaa'));assert.throws(()=>encode(0,90));assert.throws(()=>encode(0,0,13));});
