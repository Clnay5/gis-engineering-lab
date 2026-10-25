import {test} from 'node:test';import assert from 'node:assert/strict';import {run} from './core.mjs';import {rectangle} from '../../shared/geometry.mjs';
const opt={units:'meters',values:[[1,2],[3,4]],origin:[0,2],zones:[rectangle([0,0,2,2])]};
test('whole grid has known mean and population variance',()=>{const s=run(opt).statistics[0];assert.equal(s.mean,2.5);assert.equal(s.populationVariance,1.25);assert.equal(s.sum,10);});
test('cell area uses dx×dy',()=>{const s=run({...opt,dx:2,zones:[rectangle([0,0,4,2])]}).statistics[0];assert.equal(s.validArea,8);});
test('NoData is not converted to zero',()=>{const s=run({...opt,values:[[null,2],[3,4]]}).statistics[0];assert.equal(s.count,3);assert.equal(s.mean,3);assert.equal(s.nodata,1);});
test('empty zone statistics are null',()=>assert.equal(run({...opt,zones:[rectangle([50,50,60,60])]}).statistics[0].mean,null));
test('holes exclude cell centres',()=>{const poly=rectangle([0,0,2,2]);poly.coordinates.push([[0,1],[0,2],[1,2],[1,1],[0,1]]);assert.equal(run({...opt,zones:[poly]}).statistics[0].count,3);});
test('north-up origin selects top row',()=>assert.equal(run({...opt,zones:[rectangle([0,1,2,2])]}).statistics[0].sum,3));
test('overlapping zones are independent',()=>assert.equal(run({...opt,zones:[...opt.zones,...opt.zones]}).summary.totalZoneObservations,8));
