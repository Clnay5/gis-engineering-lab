import {readFile} from 'node:fs/promises';
import {run} from './core.mjs';
try {const raw=await readFile(process.argv[2]??new URL('./example.json',import.meta.url),'utf8');if(raw.length>10*1024*1024)throw new Error('input exceeds 10 MB');console.log(JSON.stringify(run(JSON.parse(raw)),null,2));}catch(error){console.error(error.message);process.exitCode=1;}
