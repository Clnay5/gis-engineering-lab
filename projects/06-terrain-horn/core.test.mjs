import {test} from 'node:test';import assert from 'node:assert/strict';import {run} from './core.mjs';
const opt={units:'meters'};
test('flat surface has zero slope and null aspect',()=>{const r=run({...opt,dem:[[5,5,5],[5,5,5],[5,5,5]]});assert.equal(r.slope[1][1],0);assert.equal(r.aspect[1][1],null);});
test('east-rising plane drains west at 270 degrees',()=>{const r=run({...opt,dem:[[0,1,2],[0,1,2],[0,1,2]]});assert.equal(r.slope[1][1],45);assert.equal(r.aspect[1][1],270);});
test('north-rising plane drains south',()=>assert.equal(run({...opt,dem:[[2,2,2],[1,1,1],[0,0,0]]}).aspect[1][1],180));
test('south-rising plane drains north',()=>assert.equal(run({...opt,dem:[[0,0,0],[1,1,1],[2,2,2]]}).aspect[1][1],0));
test('non-square cells respect dx',()=>assert.ok(Math.abs(run({...opt,dx:2,dem:[[0,1,2],[0,1,2],[0,1,2]]}).slope[1][1]-26.565051177)<1e-8));
test('NoData stencil and edges remain null',()=>{const r=run({...opt,dem:[[null,1,2],[0,1,2],[0,1,2]]});assert.ok(r.slope.flat().every(v=>v===null));});
test('unprojected and tiny DEMs are refused',()=>{assert.throws(()=>run({dem:[[1]]}));assert.throws(()=>run({...opt,dem:[[1,1],[1,1]]}));});
