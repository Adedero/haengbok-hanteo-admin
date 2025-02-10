import{f as _,J as f,h as u,i as $,L as k,o as V,a as C,w as x,c as B,e as l,j as a,b as A,v as E,N as P,z as j,C as z,Z as I,D as S,q,p as J}from"./index-zOlwCGlo.js";import{s as L}from"./index-cYYrD3AN.js";const O={key:0,class:"grid gap-4 md:grid-cols-2 md:w-96"},R={class:"form-control md:col-span-2"},Z={class:"form-control"},F={class:"form-control"},G={class:"form-control"},H={class:"form-control"},K={class:"form-control md:col-span-2"},Q={class:"form-control md:col-span-2"},W={class:"form-control md:col-span-2"},X={class:"form-control md:col-span-2"},ee=_({__name:"TransactionEditor",props:f({transaction:{}},{visible:{default:!1},visibleModifiers:{}}),emits:f(["update-transaction"],["update:visible"]),setup(i,{emit:b}){var m;const g=b,t=u({...i.transaction,transactionDate:new Date(((m=i.transaction)==null?void 0:m.transactionDate)??Date.now())}),D=$(()=>t.value?Object.values(t.value).some(s=>s===""||s===null||s===void 0)||!t.value.amount:!0),n=k(i,"visible"),d=u(!1),r=u(null),y=async()=>{t.value&&(t.value.amountPaid=(t.value.amount||0)+(t.value.charges||0),delete t.value.createdAt,delete t.value.updatedAt,await E(`api/transactions/${t.value._id}`,{loading:d,error:r,config:{method:"PUT",body:t.value}},s=>{n.value=!1,g("update-transaction",s.item),n.value=!1}))};return(s,e)=>{const p=P,c=j,v=z,T=I,M=L,N=S,U=q,w=J;return V(),C(w,{visible:n.value,"onUpdate:visible":e[8]||(e[8]=o=>n.value=o),header:"Edit Transaction",modal:""},{default:x(()=>[t.value?(V(),B("div",O,[l("div",R,[e[9]||(e[9]=l("label",{for:"title"},"Transaction Title",-1)),a(p,{modelValue:t.value.title,"onUpdate:modelValue":e[0]||(e[0]=o=>t.value.title=o),modelModifiers:{trim:!0},id:"title",fluid:""},null,8,["modelValue"])]),l("div",Z,[e[10]||(e[10]=l("label",{for:"amount"},"Amount",-1)),a(c,{modelValue:t.value.amount,"onUpdate:modelValue":e[1]||(e[1]=o=>t.value.amount=o),"input-id":"amount",fluid:""},null,8,["modelValue"])]),l("div",F,[e[11]||(e[11]=l("label",{for:"charges"},"Charges",-1)),a(c,{modelValue:t.value.charges,"onUpdate:modelValue":e[2]||(e[2]=o=>t.value.charges=o),"input-id":"charges",fluid:""},null,8,["modelValue"])]),l("div",G,[e[12]||(e[12]=l("label",{for:"type"},"Transaction Type",-1)),a(v,{modelValue:t.value.type,"onUpdate:modelValue":e[3]||(e[3]=o=>t.value.type=o),modelModifiers:{trim:!0},"input-id":"type",options:["deposit","withdrawal"],fluid:""},null,8,["modelValue"])]),l("div",H,[e[13]||(e[13]=l("label",{for:"status"},"Transaction Status",-1)),a(v,{modelValue:t.value.status,"onUpdate:modelValue":e[4]||(e[4]=o=>t.value.status=o),modelModifiers:{trim:!0},"input-id":"status",options:["successful","pending","failed"],fluid:""},null,8,["modelValue"])]),l("div",K,[e[14]||(e[14]=l("label",{for:"recipientName"},"Recipient Name",-1)),a(p,{modelValue:t.value.recipientName,"onUpdate:modelValue":e[5]||(e[5]=o=>t.value.recipientName=o),modelModifiers:{trim:!0},id:"recipientName",fluid:""},null,8,["modelValue"])]),l("div",Q,[e[15]||(e[15]=l("label",{for:"transactionDate"},"Transaction Date",-1)),a(T,{modelValue:t.value.transactionDate,"onUpdate:modelValue":e[6]||(e[6]=o=>t.value.transactionDate=o),"date-format":"dd MM, yy","input-id":"transactionDate",fluid:""},null,8,["modelValue"])]),l("div",W,[e[16]||(e[16]=l("label",{for:"description"},"Description",-1)),a(M,{modelValue:t.value.description,"onUpdate:modelValue":e[7]||(e[7]=o=>t.value.description=o),id:"description",fluid:"",rows:"3",class:"resize-none"},null,8,["modelValue"])]),a(N,{error:r.value},null,8,["error"]),l("div",X,[a(U,{onClick:y,label:"Done",loading:d.value,disabled:D.value||d.value,icon:"pi pi-check",fluid:""},null,8,["loading","disabled"])])])):A("",!0)]),_:1},8,["visible"])}}});export{ee as default};
