const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/TransactionEditor-vYKHu4iV.js","assets/index-zOlwCGlo.js","assets/index-CIgBICLL.css","assets/index-cYYrD3AN.js"])))=>i.map(i=>d[i]);
import{s as X}from"./index-XMlkdD7N.js";import{B as Y,o as l,c as f,a as V,m as E,r as J,b as C,d as K,e as a,t as D,s as Q,f as I,u as z,g as W,h as u,i as R,w as M,j as o,k as B,S as Z,l as tt,n as et,p as j,q as N,v as A,_ as L,x as nt,y as at,z as ot,A as st,C as rt,D as U,E as it,F,G as O,H as ct,I as lt}from"./index-zOlwCGlo.js";var dt=function(v){var t=v.dt;return`
.p-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: `.concat(t("tag.primary.background"),`;
    color: `).concat(t("tag.primary.color"),`;
    font-size: `).concat(t("tag.font.size"),`;
    font-weight: `).concat(t("tag.font.weight"),`;
    padding: `).concat(t("tag.padding"),`;
    border-radius: `).concat(t("tag.border.radius"),`;
    gap: `).concat(t("tag.gap"),`;
}

.p-tag-icon {
    font-size: `).concat(t("tag.icon.size"),`;
    width: `).concat(t("tag.icon.size"),`;
    height:`).concat(t("tag.icon.size"),`;
}

.p-tag-rounded {
    border-radius: `).concat(t("tag.rounded.border.radius"),`;
}

.p-tag-success {
    background: `).concat(t("tag.success.background"),`;
    color: `).concat(t("tag.success.color"),`;
}

.p-tag-info {
    background: `).concat(t("tag.info.background"),`;
    color: `).concat(t("tag.info.color"),`;
}

.p-tag-warn {
    background: `).concat(t("tag.warn.background"),`;
    color: `).concat(t("tag.warn.color"),`;
}

.p-tag-danger {
    background: `).concat(t("tag.danger.background"),`;
    color: `).concat(t("tag.danger.color"),`;
}

.p-tag-secondary {
    background: `).concat(t("tag.secondary.background"),`;
    color: `).concat(t("tag.secondary.color"),`;
}

.p-tag-contrast {
    background: `).concat(t("tag.contrast.background"),`;
    color: `).concat(t("tag.contrast.color"),`;
}
`)},ut={root:function(v){var t=v.props;return["p-tag p-component",{"p-tag-info":t.severity==="info","p-tag-success":t.severity==="success","p-tag-warn":t.severity==="warn","p-tag-danger":t.severity==="danger","p-tag-secondary":t.severity==="secondary","p-tag-contrast":t.severity==="contrast","p-tag-rounded":t.rounded}]},icon:"p-tag-icon",label:"p-tag-label"},pt=Y.extend({name:"tag",theme:dt,classes:ut}),gt={name:"BaseTag",extends:Q,props:{value:null,severity:null,rounded:Boolean,icon:String},style:pt,provide:function(){return{$pcTag:this,$parentInstance:this}}},G={name:"Tag",extends:gt,inheritAttrs:!1};function mt(n,v,t,y,k,p){return l(),f("span",E({class:n.cx("root")},n.ptmi("root")),[n.$slots.icon?(l(),V(J(n.$slots.icon),E({key:0,class:n.cx("icon")},n.ptm("icon")),null,16,["class"])):n.icon?(l(),f("span",E({key:1,class:[n.cx("icon"),n.icon]},n.ptm("icon")),null,16)):C("",!0),n.value!=null||n.$slots.default?K(n.$slots,"default",{key:2},function(){return[a("span",E({class:n.cx("label")},n.ptm("label")),D(n.value),17)]}):C("",!0)],16)}G.render=mt;const ft={class:"bg-white rounded-lg p-3 flex gap-2"},vt={class:"bg-slate-100 p-2 rounded-full flex-shrink-0 flex"},yt={key:0,class:"text-[--p-primary-500] pi pi-arrow-circle-up"},_t={key:1,class:"text-red-500 self-end pi pi-arrow-circle-down"},ht={class:"w-full"},bt={class:"flex items-center gap-2 justify-between w-full min-w-0"},$t={class:"truncate"},wt={class:"flex items-end gap-2 justify-between w-full min-w-0"},kt={class:"md:text-lg font-semibold"},Tt={class:"text-xs text-slate-500"},Pt={class:"mt-2 flex items-center gap-2 justify-between"},xt=I({__name:"TransactionItem",props:{transaction:{}},emits:["delete-transaction","update-transaction"],setup(n,{emit:v}){const t=z(),y=W(),k=et({loader:()=>L(()=>import("./TransactionEditor-vYKHu4iV.js"),__vite__mapDeps([0,1,2,3]))}),p=u({successful:"success",pending:"warn",failed:"danger"}),T=R(()=>p.value[n.transaction.status]),$=v,h=u(!1),d=u(null),w=async()=>{await A(`api/transactions/${n.transaction._id}`,{loading:h,error:d,config:{router:t,method:"DELETE"}},()=>{$("delete-transaction",n.transaction)})},_=()=>{y.require({message:"Do you want to delete this transaction?",header:"Delete Transaction",icon:"pi pi-info-circle",rejectLabel:"Cancel",rejectProps:{label:"Cancel",severity:"secondary",outlined:!0},acceptProps:{label:"Delete",severity:"danger"},accept:()=>{w()}})},i=u(!1);return(e,r)=>{const b=j,s=G,g=N;return l(),f("div",ft,[(l(),V(Z,null,{default:M(()=>[o(B(k),{onUpdateTransaction:r[0]||(r[0]=c=>e.$emit("update-transaction",c)),visible:i.value,"onUpdate:visible":r[1]||(r[1]=c=>i.value=c),transaction:e.transaction},null,8,["visible","transaction"])]),fallback:M(()=>[o(b,{header:"Edit Transaction",visible:i.value,"onUpdate:visible":r[2]||(r[2]=c=>i.value=c)},{default:M(()=>r[4]||(r[4]=[a("div",{class:"h-60 flex items-center justify-center"},"Loading...",-1)])),_:1},8,["visible"])]),_:1})),a("div",vt,[e.transaction.type==="deposit"?(l(),f("span",yt)):(l(),f("span",_t))]),a("div",ht,[a("div",bt,[a("h1",$t,D(e.transaction.title),1),o(s,{value:e.transaction.status,severity:T.value,class:"py-1 px-2 text-xs"},null,8,["value","severity"])]),a("div",wt,[a("h1",kt,D(e.transaction.type==="deposit"?"+":"-")+"₩"+D(e.transaction.amountPaid.toLocaleString()),1),a("p",Tt,D(B(tt)(e.transaction.transactionDate,"dd MM, yyyy T")),1)]),a("div",Pt,[o(g,{onClick:r[3]||(r[3]=c=>i.value=!0),size:"small",severity:"secondary",label:"Edit",icon:"pi pi-file-edit",class:"py-1 px-2"}),o(g,{onClick:_,loading:h.value,size:"small",severity:"danger",icon:"pi pi-trash",class:"py-1 px-2"},null,8,["loading"])])])])}}}),St={class:"grid gap-4"},Dt={class:"form-control"},Ct={key:0,class:"text-red-500"},Mt={class:"form-control"},Et={class:"form-control"},Vt={class:"form-control mt-2"},At=I({__name:"TransactionCreator",emits:["add-transaction"],setup(n,{emit:v}){const t=z(),y=u(!1),k=v,p=u({type:"deposit",status:"successful"}),T=u(!1),$=u(null),h=u(!1),d=async()=>{if(h.value=!1,!p.value.amountPaid){h.value=!0;return}const i=await w(p.value);await A("api/transactions",{loading:T,error:$,config:{router:t,method:"POST",body:i}},e=>{y.value=!1,k("add-transaction",e.item)})};async function w(i){const e=i.type==="deposit"?"Property Sale":"Property Purchase",r=i.amountPaid??0,b=[.02,.05,.08,.1,.12,.15,.18,.2],s=b[Math.floor(Math.random()*b.length)],g=Math.round(r*s),c=Math.round(r-g),[P,x]=await Promise.all([L(()=>import("./customers-C0e4AJWQ.js"),[]),L(()=>import("./locations-DF6UexsP.js"),[])]),m=[Math.floor(Math.random()*P.default.length),Math.floor(Math.random()*x.default.length)],S=P.default[m[0]],q=x.default[m[1]],H=`${i.type==="deposit"?"Sale":"Purchase"} of property at ${q}`;return{title:e,amount:c,charges:g,amountPaid:r,type:i.type??"deposit",status:i.status??"successful",recipientName:S,transactionDate:new Date(Date.now()),transactionRef:_(),description:H}}function _(){const i="TXN",e=new Date,r=`${e.getFullYear()}${(e.getMonth()+1).toString().padStart(2,"0")}${e.getDate().toString().padStart(2,"0")}`,b=`${e.getHours().toString().padStart(2,"0")}${e.getMinutes().toString().padStart(2,"0")}${e.getSeconds().toString().padStart(2,"0")}`,s=Math.floor(1e3+Math.random()*9e3);return`${i}${r}${b}${s}`}return(i,e)=>{const r=N,b=at,s=ot,g=st,c=rt,P=U,x=j;return l(),f("div",null,[o(r,{onClick:e[0]||(e[0]=m=>y.value=!0),label:"Add",icon:"pi pi-plus"}),o(x,{header:"New Transaction",visible:y.value,"onUpdate:visible":e[4]||(e[4]=m=>y.value=m),modal:""},{default:M(()=>[a("div",St,[a("div",Dt,[e[6]||(e[6]=a("label",{for:"amount"},"Amount",-1)),o(g,null,{default:M(()=>[o(b,null,{default:M(()=>e[5]||(e[5]=[nt("₩")])),_:1}),o(s,{modelValue:p.value.amountPaid,"onUpdate:modelValue":e[1]||(e[1]=m=>p.value.amountPaid=m),placeholder:"Amount"},null,8,["modelValue"])]),_:1}),h.value?(l(),f("small",Ct,"Enter an amount")):C("",!0)]),a("div",Mt,[e[7]||(e[7]=a("label",{for:"type"},"Transaction Type",-1)),o(c,{modelValue:p.value.type,"onUpdate:modelValue":e[2]||(e[2]=m=>p.value.type=m),"input-id":"type",options:["deposit","withdrawal"]},null,8,["modelValue"])]),a("div",Et,[e[8]||(e[8]=a("label",{for:"status"},"Transaction Status",-1)),o(c,{modelValue:p.value.status,"onUpdate:modelValue":e[3]||(e[3]=m=>p.value.status=m),"input-id":"status",options:["successful","pending","failed"]},null,8,["modelValue"])]),o(P,{error:$.value,"show-header":""},null,8,["error"]),a("div",Vt,[o(r,{label:"Add",icon:"pi pi-plus",loading:T.value,onClick:d},null,8,["loading"])])])]),_:1},8,["visible"])])}}}),Lt={},It={class:"grid gap-4"},zt={class:"flex flex-col gap-2"},Bt={class:"flex flex-col items-end gap-1 justify-between"};function Rt(n,v){const t=ct;return l(),f("div",It,[(l(),f(F,null,O(3,y=>a("div",{key:y,class:"bg-white rounded-lg p-4 grid grid-cols-2 gap-2"},[a("div",zt,[o(t,{height:"1rem",width:"70%"}),o(t,{height:"1.3rem",width:"10rem"}),o(t,{height:"2rem",width:"5rem"})]),a("div",Bt,[o(t,{height:"0.8rem",width:"8rem"}),o(t,{height:"1rem",width:"70%"}),o(t,{height:"2rem",width:"3rem"})])])),64))])}const jt=it(Lt,[["render",Rt]]),Nt={class:"p-4 lg:p-0 md:h-[calc(100dvh-7rem)]"},Ut={class:"fixed z-[100] top-2 right-16 lg:top-6 lg:right-8 flex items-center gap-2"},Ft={key:0,class:"font-bold text-[--p-primary-color]"},Ot={key:1,class:"grid gap-2 mb-4"},Ht=I({__name:"TransactionsView",setup(n){const v=z(),t=u(0),y=u(0),k=s=>{y.value=s.page,w()},p=u(10),T=R(()=>p.value*y.value),$=u(!1),h=u(null),d=u(null);async function w(){await A(`api/transactions?skip=${T.value}&limit=${p.value}&sort=transactionDate,desc`,{loading:$,error:h,config:{router:v,cache:!0}},s=>{d.value=s.items})}const _=u();async function i(){await A("api/transactions-count",{loading:$,error:h,config:{router:v,cache:!0}},s=>{_.value=s.count})}lt(async()=>{await Promise.all([i(),w()])});const e=s=>{d.value=d.value?[s,...d.value]:[s],_.value=(_.value??0)+1},r=s=>{var g;d.value&&(d.value=(g=d.value)==null?void 0:g.filter(c=>c._id!==s._id),_.value=Math.max((_.value??0)-1,0))},b=s=>{if(!d.value)return;const g=d.value.findIndex(c=>c._id===s._id);d.value[g]=s};return(s,g)=>{const c=At,P=U,x=xt,m=X;return l(),f("main",Nt,[a("div",Ut,[_.value?(l(),f("p",Ft," ("+D(_.value)+") ",1)):C("",!0),o(c,{onAddTransaction:e})]),$.value?(l(),V(jt,{key:0})):C("",!0),o(P,{error:h.value,"show-retry-button":"",onRetry:w,"show-header":""},null,8,["error"]),!$.value&&!h.value&&d.value?(l(),f("div",Ot,[(l(!0),f(F,null,O(d.value,S=>(l(),V(x,{key:S._id,transaction:S,onDeleteTransaction:r,onUpdateTransaction:b},null,8,["transaction"]))),128))])):C("",!0),a("div",null,[o(m,{first:t.value,"onUpdate:first":g[0]||(g[0]=S=>t.value=S),onPage:k,rows:p.value,totalRecords:_.value,template:"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"},null,8,["first","rows","totalRecords"])])])}}});export{Ht as default};
