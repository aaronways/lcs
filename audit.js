const fs=require('fs'),vm=require('vm'),katex=require('/home/claude/node_modules/katex');
const CH=[];let REF=null;
const ctx={registerChapter:c=>CH.push(c),registerReference:r=>{REF=r},console};
vm.createContext(ctx);
for(const f of ['reference.js','chapters/ch01.js','chapters/ch02.js','chapters/ch04.js','chapters/ch05.js'])
  vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});

function walk(o,path,out){
  if(typeof o==='string'){out.push([path,o]);return;}
  if(Array.isArray(o)){o.forEach((v,i)=>walk(v,path+'['+i+']',out));return;}
  if(o&&typeof o==='object'){for(const k of Object.keys(o))walk(o[k],path+'.'+k,out);}
}
const strs=[];
CH.forEach(c=>walk(c,'ch'+c.id,strs));
walk(REF,'reference',strs);

// mirror app.js extraction order
function extract(src){
  const out=[];let s=String(src)
    .replace(/<figure[\s\S]*?<\/figure>/g,'')
    .replace(/<svg[\s\S]*?<\/svg>/g,'');
  s=s.replace(/\$\$([\s\S]*?)\$\$/g,(m,t)=>{out.push([t,true]);return ' ';});
  s=s.replace(/\\\[([\s\S]*?)\\\]/g,(m,t)=>{out.push([t,true]);return ' ';});
  s=s.replace(/\\\(([\s\S]*?)\\\)/g,(m,t)=>{out.push([t,false]);return ' ';});
  s=s.replace(/\$([^$\n]+?)\$/g,(m,t)=>{out.push([t,false]);return ' ';});
  return {math:out,rest:s};
}
let total=0,errs=[],oddDollars=[];
for(const [path,str] of strs){
  if(!/[$\\]/.test(str))continue;
  const {math,rest}=extract(str);
  // leftover single $ means an unmatched delimiter
  const left=(rest.match(/\$/g)||[]).length;
  if(left) oddDollars.push([path,left,rest.replace(/\s+/g,' ').slice(0,140)]);
  for(const [t,disp] of math){
    total++;
    try{ katex.renderToString(t,{displayMode:disp,throwOnError:true,strict:'ignore'}); }
    catch(e){ errs.push([path,disp,t.replace(/\s+/g,' ').trim().slice(0,150),e.message.slice(0,160)]); }
  }
}
console.log('math expressions checked:',total);
console.log('\n=== PARSE ERRORS ('+errs.length+') ===');
errs.forEach(e=>console.log(`\n[${e[0]}] display=${e[1]}\n  LATEX: ${e[2]}\n  ERR  : ${e[3]}`));
console.log('\n=== UNMATCHED $ ('+oddDollars.length+') ===');
oddDollars.forEach(d=>console.log(`[${d[0]}] leftover=${d[1]}\n  ${d[2]}`));
