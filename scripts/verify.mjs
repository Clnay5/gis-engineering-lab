import {spawnSync} from 'node:child_process';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {platform,arch,cpus} from 'node:os';
import {performance} from 'node:perf_hooks';
const catalog=JSON.parse(await readFile('catalog.json','utf8'));
await mkdir('evidence',{recursive:true});
const tests=spawnSync(process.execPath,['--test','--test-reporter=tap'],{encoding:'utf8'});
await writeFile('evidence/tests.tap',tests.stdout+tests.stderr);if(tests.status!==0)throw new Error('Core tests failed; inspect evidence/tests.tap');
const demos=[];for(const p of catalog){const {run}=await import('../projects/'+p.slug+'/core.mjs');const input=JSON.parse(await readFile('projects/'+p.slug+'/example.json','utf8'));const inputBefore=JSON.stringify(input);const t=performance.now();const output=run(input),ms=performance.now()-t;if(JSON.stringify(input)!==inputBefore)throw new Error(p.slug+' mutated input');if(!output.summary||!output.visual)throw new Error(p.slug+' has no demo result');await writeFile('projects/'+p.slug+'/example-output.json',JSON.stringify(output,null,2)+'\n');const cli=spawnSync(process.execPath,['projects/'+p.slug+'/cli.mjs'],{encoding:'utf8'});if(cli.status!==0||JSON.stringify(JSON.parse(cli.stdout))!==JSON.stringify(output))throw new Error(p.slug+' CLI result differs');demos.push({slug:p.slug,tests:p.tests,cli:'passed',inputUnchanged:true,summary:output.summary,singleRunMilliseconds:Number(ms.toFixed(3))});}
const result={createdAt:new Date().toISOString(),environment:{node:process.version,platform:platform(),arch:arch(),cpu:cpus()[0]?.model},totalProjects:catalog.length,totalTests:catalog.reduce((n,p)=>n+p.tests,0),coreTests:'passed',demos,note:'Timing is one local default-example run; not a benchmark or comparative performance claim. Unit tests use independent known answers; generated example outputs alone are not correctness evidence.'};
await writeFile('evidence/verification.json',JSON.stringify(result,null,2)+'\n');console.log(`Verified ${result.totalTests} tests, ${demos.length} CLI examples, ${demos.length} immutable input checks`);
