/* LaTeX check across every chapter file present. Run: node audit.js
   Catches three things: KaTeX parse failures, unmatched $ delimiters, and
   single-backslash LaTeX (JS eats \f, \t, \r and silently drops \z, \o, \p).  */
const fs=require('fs'),path=require('path'),vm=require('vm'),katex=require('katex');
const CH=[];let REF=null;
const ctx={registerChapter:c=>CH.push(c),registerReference:r=>{REF=r},console};
vm.createContext(ctx);
const files=['reference.js'].concat(
  fs.readdirSync('chapters').filter(f=>/^ch\d+\.js$/.test(f)).sort().map(f=>path.join('chapters',f)));
for(const f of files) vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});

function walk(o,p,out){
  if(typeof o==='string'){out.push([p,o]);return;}
  if(Array.isArray(o)){o.forEach((v,i)=>walk(v,p+'['+i+']',out));return;}
  if(o&&typeof o==='object')for(const k of Object.keys(o))walk(o[k],p+'.'+k,out);
}
const strs=[];
CH.forEach(c=>walk(c,'ch'+c.id,strs));
walk(REF,'reference',strs);

function extract(src){                       // mirrors app.js mdMath() order
  const out=[];
  let s=String(src).replace(/<figure[\s\S]*?<\/figure>/g,'').replace(/<svg[\s\S]*?<\/svg>/g,'');
  s=s.replace(/\$\$([\s\S]*?)\$\$/g,(m,t)=>{out.push([t,true]);return ' ';});
  s=s.replace(/\\\[([\s\S]*?)\\\]/g,(m,t)=>{out.push([t,true]);return ' ';});
  s=s.replace(/\\\(([\s\S]*?)\\\)/g,(m,t)=>{out.push([t,false]);return ' ';});
  s=s.replace(/\$([^$\n]+?)\$/g,(m,t)=>{out.push([t,false]);return ' ';});
  return {math:out,rest:s};
}
const CMDS=['pi','cdot','frac','dfrac','tfrac','sqrt','theta','omega','zeta','sigma','alpha','beta',
 'gamma','delta','lambda','phi','psi','tau','infty','approx','leq','geq','neq','pm','times','cos',
 'sin','tan','log','ln','lim','partial','dot','hat','bar','angle','circ','boxed','Longrightarrow',
 'underbrace','mathcal','mathbf','checkmark','quad','qquad','det','epsilon','le','ge','sum','int',
 'vmatrix','bmatrix','array','left','right','begin','end'];
const strip=t=>t.replace(/\\(?:text|textbf|textit|textrm|mathrm|mathbf|mathit|mathsf|mathtt|operatorname|begin|end)\{[^}]*\}/g,' ').replace(/\\[a-zA-Z]+/g,' ');

let total=0;const errs=[],odd=[],dropped=[],ctrl=[];
for(const [p,str] of strs){
  if(/[\x08\x0b\x0c\x0d\x09]/.test(str)) ctrl.push(p);
  if(!/[$\\]/.test(str))continue;
  const {math,rest}=extract(str);
  const left=(rest.match(/\$/g)||[]).length;
  if(left) odd.push([p,left,rest.replace(/\s+/g,' ').slice(0,140)]);
  for(const [t,disp] of math){
    total++;
    try{katex.renderToString(t,{displayMode:disp,throwOnError:true,strict:'ignore'});}
    catch(e){errs.push([p,disp,t.replace(/\s+/g,' ').trim().slice(0,150),e.message.slice(0,160)]);}
    const s=strip(t);
    for(const c of CMDS)
      if(new RegExp('(^|[^a-zA-Z\\\\])'+c+'($|[^a-zA-Z])').test(s)){
        dropped.push([p,c,t.replace(/\s+/g,' ').slice(0,90)]);break;
      }
  }
}
console.log('math expressions checked:',total);
console.log('\n=== PARSE ERRORS ('+errs.length+') ===');
errs.forEach(e=>console.log(`\n[${e[0]}] display=${e[1]}\n  LATEX: ${e[2]}\n  ERR  : ${e[3]}`));
console.log('\n=== UNMATCHED $ ('+odd.length+') ===');
odd.forEach(d=>console.log(`[${d[0]}] leftover=${d[1]}\n  ${d[2]}`));
console.log('\n=== DROPPED BACKSLASH ('+dropped.length+') ===');
dropped.forEach(d=>console.log(`[${d[0]}] bare "${d[1]}" in: ${d[2]}`));
console.log('\n=== CONTROL CHARACTERS ('+ctrl.length+') ===');
ctrl.forEach(p=>console.log('['+p+']'));
process.exit(errs.length+odd.length+dropped.length+ctrl.length?1:0);
