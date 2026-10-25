import {test} from 'node:test';import assert from 'node:assert/strict';import {run} from './core.mjs';
test('uniform 4-neighbour cost is Manhattan distance',()=>{const r=run({cost:[[1,1,1],[1,1,1],[1,1,1]],start:[0,0],end:[2,2]});assert.equal(r.summary.totalCost,4);assert.equal(r.path.length,5);});
test('8-neighbour cost includes geometric diagonal distance',()=>assert.ok(Math.abs(run({cost:[[1,1],[1,1]],start:[0,0],end:[1,1],diagonal:true}).summary.totalCost-Math.SQRT2)<1e-12));
test('diagonal cannot slip between barriers',()=>assert.equal(run({cost:[[1,null],[null,1]],start:[0,0],end:[1,1],diagonal:true}).summary.reachable,false));
test('source equals destination costs zero',()=>assert.equal(run({cost:[[2]],start:[0,0],end:[0,0]}).summary.totalCost,0));
test('path detours around high friction',()=>{const r=run({cost:[[1,100,1],[1,1,1]],start:[0,0],end:[0,2]});assert.equal(r.summary.totalCost,4);assert.ok(!r.path.some(([r,c])=>r===0&&c===1));});
test('edge cost averages endpoint friction',()=>assert.equal(run({cost:[[2,4]],start:[0,0],end:[0,1],cellSize:10}).summary.totalCost,30));
test('blocked endpoints and nonpositive friction are rejected',()=>{assert.throws(()=>run({cost:[[null]],start:[0,0],end:[0,0]}));assert.throws(()=>run({cost:[[0]],start:[0,0],end:[0,0]}));});
