/* Structural check across every chapter file present. Run: node smoke.js */
const fs=require('fs'),path=require('path'),vm=require('vm');
const CH=[];let REF=null;
const ctx={registerChapter:c=>CH.push(c),registerReference:r=>{REF=r},console};
vm.createContext(ctx);
const files=['reference.js'].concat(
  fs.readdirSync('chapters').filter(f=>/^ch\d+\.js$/.test(f)).sort().map(f=>path.join('chapters',f)));
for(const f of files) vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
let bad=0;
CH.sort((a,b)=>a.id-b.id).forEach(c=>{
  const gp=(c.guide||[]).length,pr=(c.problems||[]).length;
  const ex=(c.problems||[]).filter(p=>p.expert).length,hn=(c.problems||[]).filter(p=>p.hint).length;
  const ids=new Set((c.sectionList||[]).map(s=>s.id));
  const pids=new Set((c.problems||[]).map(p=>p.id));
  const orphan=[...new Set([...(c.guide||[]),...(c.problems||[])].filter(x=>x.sec&&!ids.has(x.sec)).map(x=>x.sec))];
  const noSol=(c.problems||[]).filter(p=>!p.solution).length;
  const dup=pr-pids.size;
  const badEx=(c.guide||[]).filter(g=>g.example&&!pids.has(g.example)).map(g=>g.example);
  const emptySec=(c.sectionList||[]).filter(s=>
    !(c.guide||[]).some(g=>g.sec===s.id) && !(c.problems||[]).some(p=>p.sec===s.id)).map(s=>s.id);
  console.log(`ch${c.id} "${c.title}" ${c.sections} guide=${gp} problems=${pr} hint=${hn} expert=${ex} `+
    `noSolution=${noSol} dupIDs=${dup} orphanSec=[${orphan}] badExample=[${badEx}] noContentSec=[${emptySec}]`);
  if(noSol||dup||orphan.length||badEx.length||emptySec.length) bad++;
});
console.log('reference loaded:',!!REF,'| chapters:',CH.length,'| files with issues:',bad);
process.exit(bad?1:0);
