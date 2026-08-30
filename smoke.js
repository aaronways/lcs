const fs=require('fs'),vm=require('vm');
const CH=[];let REF=null;
const ctx={registerChapter:c=>CH.push(c),registerReference:r=>{REF=r},console};
vm.createContext(ctx);
for(const f of ['reference.js','chapters/ch01.js','chapters/ch02.js','chapters/ch04.js','chapters/ch05.js'])
  vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
let bad=0;
CH.forEach(c=>{
  const gp=(c.guide||[]).length,pr=(c.problems||[]).length,ex=(c.problems||[]).filter(p=>p.expert).length;
  const ids=new Set((c.sectionList||[]).map(s=>s.id));
  const orphanG=(c.guide||[]).filter(g=>g.sec&&!ids.has(g.sec)).map(g=>g.sec);
  const orphanP=(c.problems||[]).filter(p=>p.sec&&!ids.has(p.sec)).map(p=>p.sec);
  const noSol=(c.problems||[]).filter(p=>!p.solution).length;
  const dup=pr-new Set((c.problems||[]).map(p=>p.id)).size;
  console.log(`ch${c.id} "${c.title}" sections=${c.sections} guide=${gp} problems=${pr} expert=${ex} noSolution=${noSol} dupIDs=${dup} orphanSec=[${[...new Set([...orphanG,...orphanP])]}]`);
  if(noSol||dup||orphanG.length||orphanP.length) bad++;
});
console.log('reference loaded:', !!REF, 'chapters:', CH.length, 'problem files with issues:', bad);
