import{readFileSync as R,writeFileSync as W,mkdirSync as M}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
const B={16:(a,b)=>a+b|0,17:(a,b)=>a-b|0,18:Math.imul,19:(a,b)=>a/b|0,20:(a,b)=>a%b,21:(a,b)=>(a>>>0)/(b>>>0)|0,22:(a,b)=>(a>>>0)%(b>>>0)|0,24:(a,b)=>a&b,25:(a,b)=>a|b,26:(a,b)=>a^b,28:(a,b)=>a<<b,29:(a,b)=>a>>b,30:(a,b)=>(a>>>b)|0,32:(a,b)=>a==b?1:0,33:(a,b)=>a<b?1:0,34:(a,b)=>(a>>>0)<(b>>>0)?1:0};
function V(p,g){
const s=[],c=[],m=new Int32Array(256),o=[];
let q=0,n=0,i=0,x,y,v,a,f,L=p.length;
try{for(;;){
if(n>999999)throw 10;
if(q<0||q>=L)throw 9;
let k=p[q];n++;
if(f=B[k]){if(s.length<2)throw 2;y=s.pop(),x=s.pop();if(k>18&&k<23&&!y)throw 4;s.push(f(x,y)),q++;continue;}
switch(k){
case 0:return[o,0];
case 1:if(q+2>p.length)throw 9;if(s.length>255)throw 3;s.push(p[q+1]<<24>>24),q+=2;break;
case 2:if(q+5>p.length)throw 9;if(s.length>255)throw 3;s.push(p[q+1]|p[q+2]<<8|p[q+3]<<16|p[q+4]<<24),q+=5;break;
case 3:if(s.length<1)throw 2;s.pop(),q++;break;
case 4:if(s.length<1)throw 2;if(s.length>255)throw 3;s.push(s[s.length-1]),q++;break;
case 5:if(s.length<2)throw 2;y=s.pop(),x=s.pop(),s.push(y,x),q++;break;
case 6:if(s.length<2)throw 2;if(s.length>255)throw 3;s.push(s[s.length-2]),q++;break;
case 7:if(s.length<3)throw 2;a=s[s.length-3],s[s.length-3]=s[s.length-2],s[s.length-2]=s[s.length-1],s[s.length-1]=a,q++;break;
case 23:if(s.length<1)throw 2;s.push(-s.pop()|0),q++;break;
case 27:if(s.length<1)throw 2;s.push(~s.pop()),q++;break;
case 48:if(q+3>p.length)throw 9;q+=3+((p[q+1]|p[q+2]<<8)<<16>>16);break;
case 49:if(q+3>p.length)throw 9;if(s.length<1)throw 2;a=(p[q+1]|p[q+2]<<8)<<16>>16,v=s.pop(),q+=v?3:3+a;break;
case 50:if(q+3>p.length)throw 9;if(s.length<1)throw 2;a=(p[q+1]|p[q+2]<<8)<<16>>16,v=s.pop(),q+=v?3+a:3;break;
case 51:if(q+3>p.length)throw 9;if(c.length>63)throw 7;c.push(q+3),q=p[q+1]|p[q+2]<<8;break;
case 52:if(!c.length)throw 8;q=c.pop();break;
case 64:if(s.length<1)throw 2;a=s.pop();if(a<0||a>255)throw 6;s.push(m[a]),q++;break;
case 65:if(s.length<2)throw 2;a=s.pop(),v=s.pop();if(a<0||a>255)throw 6;m[a]=v,q++;break;
case 80:if(s.length<1)throw 2;v=s.pop(),a=String(v);if(o.length+a.length>65536)throw 11;for(let j=0;j<a.length;j++)o.push(a.charCodeAt(j));q++;break;
case 81:if(s.length<1)throw 2;v=s.pop();if(o.length>65535)throw 11;o.push(v&255),q++;break;
case 82:if(s.length>255)throw 3;s.push(i<g.length?g[i++]:-1),q++;break;
case 83:if(s.length<1)throw 2;return[o,s.pop()&255];
default:throw 5;
}}}catch(e){return[o,(e|0)===e?e:0];}}
function A(d,o,e){M(`${O}/${d}`,{recursive:true}),W(`${O}/${d}/stdout.bin`,Buffer.from(o)),W(`${O}/${d}/exit.txt`,String(e));}
for(let n=1;n<41;n++){let d="i"+(n<10?"00":"0")+n;try{let[u,e]=V(R(`${I}/${d}/program.bin`),R(`${I}/${d}/input.bin`));A(d,u,e);}catch{try{A(d,[],0);}catch{}}}
