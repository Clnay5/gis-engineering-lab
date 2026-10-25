import {test} from 'node:test';import assert from 'node:assert/strict';import {run,haversine} from './core.mjs';
const p=(lon,time,lat=0)=>({lon,lat,time});
test('zero distance is exact',()=>assert.equal(haversine([0,0],[0,0]),0));
test('equatorial degree has expected spherical distance',()=>assert.ok(Math.abs(haversine([0,0],[1,0])-111195.0802335)<.001));
test('antimeridian uses shortest spherical arc',()=>assert.ok(haversine([179.9,0],[-179.9,0])<23000));
test('duplicate timestamp yields flag and null speed',()=>{const r=run({track:[p(0,'2026-01-01T00:00:00Z'),p(1,'2026-01-01T00:00:00Z')]});assert.equal(r.issues[0].code,'DUPLICATE_TIME');assert.equal(r.segments[0].speedKmh,null);});
test('speed threshold flags impossible jump',()=>assert.ok(run({track:[p(0,'2026-01-01T00:00:00Z'),p(1,'2026-01-01T00:00:01Z')]}).issues.some(x=>x.code==='SPEED_SPIKE')));
test('bad sample is not bridged during distance computation',()=>{const r=run({track:[p(0,'2026-01-01T00:00:00Z'),p(200,'2026-01-01T00:00:01Z'),p(1,'2026-01-01T01:00:00Z')]});assert.equal(r.segments.length,0);assert.equal(r.summary.distanceMeters,0);});
test('reversed time and impossible calendar dates are reported',()=>{assert.equal(run({track:[p(0,'2026-01-02T00:00:00Z'),p(0,'2026-01-01T00:00:00Z')]}).issues[0].code,'TIME_REVERSED');assert.equal(run({track:[p(0,'2026-02-30T00:00:00Z')]}).issues[0].code,'TIME');});
