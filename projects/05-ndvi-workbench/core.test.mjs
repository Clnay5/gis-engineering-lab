import {test} from 'node:test';import assert from 'node:assert/strict';import {run} from './core.mjs';
test('known reflectance yields NDVI 0.6',()=>assert.ok(Math.abs(run({red:[[.2]],nir:[[.8]]}).ndvi[0][0]-.6)<1e-12));
test('zero denominator produces null',()=>assert.equal(run({red:[[0]],nir:[[0]]}).summary.zeroDenominator,1));
test('NoData propagates',()=>assert.equal(run({red:[[null]],nir:[[.8]]}).ndvi[0][0],null));
test('mask excludes cloud pixels',()=>assert.equal(run({red:[[.2,.2]],nir:[[.8,.8]],mask:[[1,0]]}).summary.count,1));
test('negative reflectance is rejected',()=>assert.throws(()=>run({red:[[-.1]],nir:[[.5]]})));
test('mismatched and ragged arrays fail',()=>{assert.throws(()=>run({red:[[1,2]],nir:[[1]]}));assert.throws(()=>run({red:[[1],[1,2]],nir:[[1]]}));});
test('reflectance NDVI stays between -1 and 1',()=>assert.deepEqual(run({red:[[0,1]],nir:[[1,0]]}).ndvi,[[1,-1]]));
