function n(r){const t=r==null?void 0:r.replace(/\D/g,"");return(t==null?void 0:t.length)===10?`(${t.slice(0,3)}) ${t.slice(3,6)}-${t.slice(6)}`:"Invalid phone number"}function s(r){const t=r==null?void 0:r.replace(/\D/g,"");return(t==null?void 0:t.length)===9?t.slice(0,5)+"-"+t.slice(5):(t==null?void 0:t.length)===5?t:"Invalid ZIP Code"}export{n as a,s as f};
