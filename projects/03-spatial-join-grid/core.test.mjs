import {test} from 'node:test';import assert from 'node:assert/strict';import {run} from './core.mjs';
const poly={type:'Polygon',coordinates:[[[0,0],[10,0],[10,10],[0,10],[0,0]],[[3,3],[3,7],[7,7],[7,3],[3,3]]]};
test('points inside holes are excluded',()=>assert.deepEqual(run({points:[[1,1],[5,5],[20,20]],polygons:[poly]}).matches.map(x=>x.polygons),[[0],[],[]]));
test('boundary policy applies to exterior and hole boundary',()=>{const a={points:[[0,1],[3,5]],polygons:[poly]};assert.equal(run(a).summary.matched,2);assert.equal(run({...a,includeBoundary:false}).summary.matched,0);});
test('overlapping polygons retain all matches',()=>assert.deepEqual(run({points:[[1,1]],polygons:[poly,poly]}).matches[0].polygons,[0,1]));
test('index cuts unnecessary candidates',()=>{const r=run({points:[[1,1],[200,200]],polygons:[poly],cellSize:5});assert.equal(r.summary.candidateTests,1);assert.equal(r.summary.bruteForceTests,2);});
test('negative coordinates index correctly',()=>{const p={type:'Polygon',coordinates:[[[-5,-5],[-1,-5],[-1,-1],[-5,-1],[-5,-5]]]};assert.equal(run({points:[[-3,-3]],polygons:[p]}).summary.matched,1);});
test('open rings and excessive index size fail',()=>{assert.throws(()=>run({points:[],polygons:[{type:'Polygon',coordinates:[[[0,0],[1,0],[1,1],[0,1]]]}]}));assert.throws(()=>run({points:[],polygons:[poly],cellSize:1e-6}));});
