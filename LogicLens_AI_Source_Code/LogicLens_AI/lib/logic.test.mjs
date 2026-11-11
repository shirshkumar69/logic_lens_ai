import assert from 'node:assert/strict';
import {goodGates,fullAdder,generateRows,mismatches,candidates,evaluate,parseCSV,csvFor,sop} from './logic.ts';
const faulty=['XOR','OR','AND','AND','OR'];
const rows=generateRows(3,b=>{const sum=b.reduce((a,x)=>a+x,0);return [sum%2,Number(sum>=2)]},b=>fullAdder(b,[...faulty]));
assert.deepEqual(mismatches(rows).map(r=>r.bits.join('')),['011','101']);
assert.deepEqual(candidates(rows,[...faulty]),[{index:1,from:'OR',to:'XOR',pass:true}]);
for(const r of rows) assert.deepEqual(fullAdder(r.bits,goodGates),r.expected);
assert.equal(evaluate('!A & (B ^ C)',{A:0,B:1,C:0}),1);
assert.equal(evaluate('A OR B AND C',{A:1,B:0,C:0}),1);
assert.equal(evaluate('A ^ B ^ C',{A:1,B:1,C:1}),1);
assert.throws(()=>evaluate('process.exit()',{}));assert.throws(()=>evaluate('A B',{A:1,B:0}));assert.throws(()=>evaluate('(A & B',{A:1,B:0}));
const csv=csvFor(rows,['A','B','Cin'],['Sum','Cout']);assert.deepEqual(parseCSV(csv).rows,rows);
assert.throws(()=>parseCSV(csv+'\n0,0,0,0,0,0,0'));
assert.throws(()=>parseCSV('A,Y_expected,Y_actual\n0,0,0\n0,1,1'));
assert.throws(()=>parseCSV('A,Y_expected,Y_actual\n0,2,0\n1,1,1'));
for(let n=1;n<=4;n++){const names=Array.from({length:n},(_,i)=>String.fromCharCode(65+i));for(let seed=0;seed<15;seed++){const rs=generateRows(n,b=>[Number((b.reduce((a,v,i)=>a+v*(i+1),seed)%3)===0)],()=>[0]);const expr=sop(rs,names,0);for(const r of rs)assert.equal(evaluate(expr,Object.fromEntries(names.map((k,i)=>[k,r.bits[i]]))),r.expected[0]);}}
console.log('PASS: adder fault detection, single-gate repair, arithmetic reference, Boolean parser, CSV validation, and 60 generated SOP implementations.');
