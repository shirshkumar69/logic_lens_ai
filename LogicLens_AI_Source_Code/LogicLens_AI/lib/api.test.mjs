import assert from 'node:assert/strict';
import {POST} from '../app/api/diagnose/route.ts';
const request=body=>new Request('http://localhost/api/diagnose',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
const missing=await POST(request({data:{}}));assert.equal(missing.status,400);
let called=false;const original=globalThis.fetch;
globalThis.fetch=async(url,options)=>{called=true;assert.equal(url,'https://api.openai.com/v1/chat/completions');const body=JSON.parse(options.body);assert.equal(body.store,false);assert.equal(body.model,'gpt-4.1-mini');assert.equal(body.messages.length,2);return Response.json({choices:[{message:{content:'OR and XOR disagree when both inputs are 1.'}}]});};
const success=await POST(request({apiKey:'test-placeholder-key',model:'gpt-4.1-mini',data:{rows:[]}}));assert.equal(success.status,200);assert.equal((await success.json()).answer,'OR and XOR disagree when both inputs are 1.');assert(called);
globalThis.fetch=async()=>new Response('',{status:401});const denied=await POST(request({apiKey:'test-placeholder-key',model:'gpt-4.1-mini',data:{rows:[]}}));assert.equal(denied.status,502);assert.match((await denied.json()).error,/rejected/);
globalThis.fetch=original;console.log('PASS: AI route validation, fixed provider destination, response handling and rejected-key errors (mock provider).');
