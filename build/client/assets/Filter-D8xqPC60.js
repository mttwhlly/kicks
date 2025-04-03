import{r as m,j as r}from"./chunk-K6CSEXPM-D4OhfGCF.js";import{u as X,B as ye,c as Z}from"./ButtonBase-CT9WhBBT.js";import{u as se,m as fe,f as ue,a as D,b as ve,z as U,T as G,A as te}from"./use-debounce-CpbkYV4p.js";import{g as J,a as V,b as _,s as W,c as K,d as M,e as Y,m as Q,f as ae,x as me,t as le,B as L}from"./Box-ZWDu6dtx.js";import{i as Ce}from"./index-BYOop6yO.js";import{u as Se}from"./Skeletons-Dq2uldXt.js";function Pe(e){return J("MuiTypography",e)}V("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);const ke={primary:!0,secondary:!0,error:!0,info:!0,success:!0,warning:!0,textPrimary:!0,textSecondary:!0,textDisabled:!0},Te=Ce(),Ie=e=>{const{align:t,gutterBottom:o,noWrap:l,paragraph:i,variant:c,classes:u}=e,p={root:["root",c,e.align!=="inherit"&&`align${M(t)}`,o&&"gutterBottom",l&&"noWrap",i&&"paragraph"]};return Y(p,Pe,u)},je=W("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.variant&&t[o.variant],o.align!=="inherit"&&t[`align${M(o.align)}`],o.noWrap&&t.noWrap,o.gutterBottom&&t.gutterBottom,o.paragraph&&t.paragraph]}})(Q(({theme:e})=>{var t;return{margin:0,variants:[{props:{variant:"inherit"},style:{font:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}},...Object.entries(e.typography).filter(([o,l])=>o!=="inherit"&&l&&typeof l=="object").map(([o,l])=>({props:{variant:o},style:l})),...Object.entries(e.palette).filter(ae()).map(([o])=>({props:{color:o},style:{color:(e.vars||e).palette[o].main}})),...Object.entries(((t=e.palette)==null?void 0:t.text)||{}).filter(([,o])=>typeof o=="string").map(([o])=>({props:{color:`text${M(o)}`},style:{color:(e.vars||e).palette.text[o]}})),{props:({ownerState:o})=>o.align!=="inherit",style:{textAlign:"var(--Typography-textAlign)"}},{props:({ownerState:o})=>o.noWrap,style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},{props:({ownerState:o})=>o.gutterBottom,style:{marginBottom:"0.35em"}},{props:({ownerState:o})=>o.paragraph,style:{marginBottom:16}}]}})),ie={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},ce=m.forwardRef(function(t,o){const{color:l,...i}=_({props:t,name:"MuiTypography"}),c=!ke[l],u=Te({...i,...c&&{color:l}}),{align:p="inherit",className:b,component:g,gutterBottom:y=!1,noWrap:j=!1,paragraph:N=!1,variant:f="body1",variantMapping:F=ie,...k}=u,v={...u,align:p,color:l,className:b,component:g,gutterBottom:y,noWrap:j,paragraph:N,variant:f,variantMapping:F},C=g||(N?"p":F[f]||ie[f])||"span",w=Ie(v);return r.jsx(je,{as:C,ref:o,className:K(w.root,b),...k,ownerState:v,style:{...p!=="inherit"&&{"--Typography-textAlign":p},...k.style}})});function Ne(e){return J("PrivateSwitchBase",e)}V("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const Fe=e=>{const{classes:t,checked:o,disabled:l,edge:i}=e,c={root:["root",o&&"checked",l&&"disabled",i&&`edge${M(i)}`],input:["input"]};return Y(c,Ne,t)},we=W(ye)({padding:9,borderRadius:"50%",variants:[{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:({edge:e,ownerState:t})=>e==="start"&&t.size!=="small",style:{marginLeft:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}},{props:({edge:e,ownerState:t})=>e==="end"&&t.size!=="small",style:{marginRight:-12}}]}),Me=W("input",{shouldForwardProp:me})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),Re=m.forwardRef(function(t,o){const{autoFocus:l,checked:i,checkedIcon:c,defaultChecked:u,disabled:p,disableFocusRipple:b=!1,edge:g=!1,icon:y,id:j,inputProps:N,inputRef:f,name:F,onBlur:k,onChange:v,onFocus:C,readOnly:w,required:R=!1,tabIndex:S,type:P,value:T,slots:$={},slotProps:E={},...B}=t,[z,H]=Se({controlled:i,default:!!u,name:"SwitchBase",state:"checked"}),x=se(),A=d=>{C&&C(d),x&&x.onFocus&&x.onFocus(d)},h=d=>{k&&k(d),x&&x.onBlur&&x.onBlur(d)},a=d=>{if(d.nativeEvent.defaultPrevented)return;const I=d.target.checked;H(I),v&&v(d,I)};let n=p;x&&typeof n>"u"&&(n=x.disabled);const s=P==="checkbox"||P==="radio",ee={...t,checked:z,disabled:n,disableFocusRipple:b,edge:g},re=Fe(ee),ne={slots:$,slotProps:{input:N,...E}},[he,be]=X("root",{ref:o,elementType:we,className:re.root,shouldForwardComponentProp:!0,externalForwardedProps:{...ne,component:"span",...B},getSlotProps:d=>({...d,onFocus:I=>{var O;(O=d.onFocus)==null||O.call(d,I),A(I)},onBlur:I=>{var O;(O=d.onBlur)==null||O.call(d,I),h(I)}}),ownerState:ee,additionalProps:{centerRipple:!0,focusRipple:!b,disabled:n,role:void 0,tabIndex:null}}),[ge,xe]=X("input",{ref:f,elementType:Me,className:re.input,externalForwardedProps:ne,getSlotProps:d=>({onChange:I=>{var O;(O=d.onChange)==null||O.call(d,I),a(I)}}),ownerState:ee,additionalProps:{autoFocus:l,checked:i,defaultChecked:u,disabled:n,id:s?j:void 0,name:F,readOnly:w,required:R,tabIndex:S,type:P,...P==="checkbox"&&T===void 0?{}:{value:T}}});return r.jsxs(he,{...be,children:[r.jsx(ge,{...xe}),z?c:y]})}),Be=Z(r.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),ze=Z(r.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),Ae=Z(r.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function Oe(e){return J("MuiCheckbox",e)}const oe=V("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),Le=e=>{const{classes:t,indeterminate:o,color:l,size:i}=e,c={root:["root",o&&"indeterminate",`color${M(l)}`,`size${M(i)}`]},u=Y(c,Oe,t);return{...t,...u}},$e=W(Re,{shouldForwardProp:e=>me(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.indeterminate&&t.indeterminate,t[`size${M(o.size)}`],o.color!=="default"&&t[`color${M(o.color)}`]]}})(Q(({theme:e})=>({color:(e.vars||e).palette.text.secondary,variants:[{props:{color:"default",disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:le(e.palette.action.active,e.palette.action.hoverOpacity)}}},...Object.entries(e.palette).filter(ae()).map(([t])=>({props:{color:t,disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:le(e.palette[t].main,e.palette.action.hoverOpacity)}}})),...Object.entries(e.palette).filter(ae()).map(([t])=>({props:{color:t},style:{[`&.${oe.checked}, &.${oe.indeterminate}`]:{color:(e.vars||e).palette[t].main},[`&.${oe.disabled}`]:{color:(e.vars||e).palette.action.disabled}}})),{props:{disableRipple:!1},style:{"&:hover":{"@media (hover: none)":{backgroundColor:"transparent"}}}}]}))),De=r.jsx(ze,{}),We=r.jsx(Be,{}),Ee=r.jsx(Ae,{}),pe=m.forwardRef(function(t,o){const l=_({props:t,name:"MuiCheckbox"}),{checkedIcon:i=De,color:c="primary",icon:u=We,indeterminate:p=!1,indeterminateIcon:b=Ee,inputProps:g,size:y="medium",disableRipple:j=!1,className:N,slots:f={},slotProps:F={},...k}=l,v=p?b:u,C=p?b:i,w={...l,disableRipple:j,color:c,indeterminate:p,size:y},R=Le(w),S=F.input??g,[P,T]=X("root",{ref:o,elementType:$e,className:K(R.root,N),shouldForwardComponentProp:!0,externalForwardedProps:{slots:f,slotProps:F,...k},ownerState:w,additionalProps:{type:"checkbox",icon:m.cloneElement(v,{fontSize:v.props.fontSize??y}),checkedIcon:m.cloneElement(C,{fontSize:C.props.fontSize??y}),disableRipple:j,slots:f,slotProps:{input:fe(typeof S=="function"?S(w):S,{"data-indeterminate":p})}}});return r.jsx(P,{...T,classes:R})});function He(e){return J("MuiFormControlLabel",e)}const q=V("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),Ue=e=>{const{classes:t,disabled:o,labelPlacement:l,error:i,required:c}=e,u={root:["root",o&&"disabled",`labelPlacement${M(l)}`,i&&"error",c&&"required"],label:["label",o&&"disabled"],asterisk:["asterisk",i&&"error"]};return Y(u,He,t)},Ge=W("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[{[`& .${q.label}`]:t.label},t.root,t[`labelPlacement${M(o.labelPlacement)}`]]}})(Q(({theme:e})=>({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${q.disabled}`]:{cursor:"default"},[`& .${q.label}`]:{[`&.${q.disabled}`]:{color:(e.vars||e).palette.text.disabled}},variants:[{props:{labelPlacement:"start"},style:{flexDirection:"row-reverse",marginRight:-11}},{props:{labelPlacement:"top"},style:{flexDirection:"column-reverse"}},{props:{labelPlacement:"bottom"},style:{flexDirection:"column"}},{props:({labelPlacement:t})=>t==="start"||t==="top"||t==="bottom",style:{marginLeft:16}}]}))),qe=W("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,t)=>t.asterisk})(Q(({theme:e})=>({[`&.${q.error}`]:{color:(e.vars||e).palette.error.main}}))),de=m.forwardRef(function(t,o){const l=_({props:t,name:"MuiFormControlLabel"}),{checked:i,className:c,componentsProps:u={},control:p,disabled:b,disableTypography:g,inputRef:y,label:j,labelPlacement:N="end",name:f,onChange:F,required:k,slots:v={},slotProps:C={},value:w,...R}=l,S=se(),P=b??p.props.disabled??(S==null?void 0:S.disabled),T=k??p.props.required,$={disabled:P,required:T};["checked","name","onChange","value","inputRef"].forEach(a=>{typeof p.props[a]>"u"&&typeof l[a]<"u"&&($[a]=l[a])});const E=ue({props:l,muiFormControl:S,states:["error"]}),B={...l,disabled:P,labelPlacement:N,required:T,error:E.error},z=Ue(B),H={slots:v,slotProps:{...u,...C}},[x,A]=X("typography",{elementType:ce,externalForwardedProps:H,ownerState:B});let h=j;return h!=null&&h.type!==ce&&!g&&(h=r.jsx(x,{component:"span",...A,className:K(z.label,A==null?void 0:A.className),children:h})),r.jsxs(Ge,{className:K(z.root,c),ownerState:B,ref:o,...R,children:[m.cloneElement(p,$),T?r.jsxs("div",{children:[h,r.jsxs(qe,{ownerState:B,"aria-hidden":!0,className:z.asterisk,children:[" ","*"]})]}):h]})});function Ke(e){return J("MuiFormGroup",e)}V("MuiFormGroup",["root","row","error"]);const Je=e=>{const{classes:t,row:o,error:l}=e;return Y({root:["root",o&&"row",l&&"error"]},Ke,t)},Ve=W("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.row&&t.row]}})({display:"flex",flexDirection:"column",flexWrap:"wrap",variants:[{props:{row:!0},style:{flexDirection:"row"}}]}),Ye=m.forwardRef(function(t,o){const l=_({props:t,name:"MuiFormGroup"}),{className:i,row:c=!1,...u}=l,p=se(),b=ue({props:l,muiFormControl:p,states:["error"]}),g={...l,row:c,error:b.error},y=Je(g);return r.jsx(Ve,{className:K(y.root,i),ownerState:g,ref:o,...u})}),Xe=Z(r.jsx("path",{d:"M3 17v2h6v-2zM3 5v2h10V5zm10 16v-2h8v-2h-8v-2h-2v6zM7 9v2H3v2h4v2h2V9zm14 4v-2H11v2zm-6-4h2V7h4V5h-4V3h-2z"}),"Tune"),Ze=[{id:"AL",label:"Alabama"},{id:"AK",label:"Alaska"},{id:"AZ",label:"Arizona"},{id:"AR",label:"Arkansas"},{id:"CA",label:"California"},{id:"CO",label:"Colorado"},{id:"CT",label:"Connecticut"},{id:"DE",label:"Delaware"},{id:"FL",label:"Florida"},{id:"GA",label:"Georgia"},{id:"HI",label:"Hawaii"},{id:"ID",label:"Idaho"},{id:"IL",label:"Illinois"},{id:"IN",label:"Indiana"},{id:"IA",label:"Iowa"},{id:"KS",label:"Kansas"},{id:"KY",label:"Kentucky"},{id:"LA",label:"Louisiana"},{id:"ME",label:"Maine"},{id:"MD",label:"Maryland"},{id:"MA",label:"Massachusetts"},{id:"MI",label:"Michigan"},{id:"MN",label:"Minnesota"},{id:"MS",label:"Mississippi"},{id:"MO",label:"Missouri"},{id:"MT",label:"Montana"},{id:"NE",label:"Nebraska"},{id:"NV",label:"Nevada"},{id:"NH",label:"New Hampshire"},{id:"NJ",label:"New Jersey"},{id:"NM",label:"New Mexico"},{id:"NY",label:"New York"},{id:"NC",label:"North Carolina"},{id:"ND",label:"North Dakota"},{id:"OH",label:"Ohio"},{id:"OK",label:"Oklahoma"},{id:"OR",label:"Oregon"},{id:"PA",label:"Pennsylvania"},{id:"RI",label:"Rhode Island"},{id:"SC",label:"South Carolina"},{id:"SD",label:"South Dakota"},{id:"TN",label:"Tennessee"},{id:"TX",label:"Texas"},{id:"UT",label:"Utah"},{id:"VT",label:"Vermont"},{id:"VA",label:"Virginia"},{id:"WA",label:"Washington"},{id:"WV",label:"West Virginia"},{id:"WI",label:"Wisconsin"},{id:"WY",label:"Wyoming"}];function st({onFilterChange:e}){const[t,o]=m.useState(""),[l,i]=m.useState(""),[c,u]=m.useState(null),[p,b]=m.useState(""),[g,y]=m.useState(""),[j,N]=m.useState(""),[f,F]=m.useState(""),[k,v]=m.useState(""),[C,w]=m.useState(!0),[R,S]=m.useState(!1),P=D(t,500),T=D(l,500),$=D(c==null?void 0:c.id,500),E=D(g,500),B=D(f,500),z=D(C,500),H=D(R,500),x=[{id:"cardiology",label:"Cardiology"},{id:"dermatology",label:"Dermatology"},{id:"neurology",label:"Neurology"},{id:"orthopedics",label:"Orthopedic Surgery"},{id:"pediatrics",label:"Pediatrics"},{id:"psychiatry",label:"Psychiatry"},{id:"gynecology",label:"Gynecology"}],A=[{id:"individual",label:"Individual"},{id:"group",label:"Group"},{id:"facility",label:"Facility"}],h=ve({defaultValues:{name:"",city:"",state:"",specialty:"",providerType:""},validators:{onChange:U.object({name:U.string(),city:U.string(),state:U.string(),specialty:U.string(),providerType:U.string()})},onSubmit:()=>{}});return m.useEffect(()=>{e({name:P,city:T,state:$||"",specialty:E,providerType:B,acceptingNewPatients:z,includeInactive:H})},[P,T,$,E,B,z,H,e]),r.jsx("div",{className:"max-w-7xl mx-auto p-4 pt-0 sticky top-0 z-[1001] bg-white border-neutral-300 border-b border-x-0 rounded-none",children:r.jsxs("form",{onSubmit:a=>{a.preventDefault(),a.stopPropagation(),h.handleSubmit()},children:[r.jsxs(L,{className:"flex justify-between items-center mb-2",children:[r.jsxs("h3",{className:"text-lg font-bold flex items-center gap-2",children:[r.jsx(Xe,{})," Filter"]}),r.jsx(L,{className:"flex justify-end mb-2",children:r.jsxs(Ye,{"aria-label":"position",className:"justify-end",row:!0,children:[r.jsx(de,{value:"bottom",control:r.jsx(pe,{checked:C,onChange:a=>w(a.target.checked)}),label:"Accepting new patients",labelPlacement:"end"}),r.jsx(de,{value:"end",control:r.jsx(pe,{checked:R,onChange:a=>S(a.target.checked)}),label:"Include inactive locations",labelPlacement:"end"})]})})]}),r.jsxs(L,{className:"flex gap-2 flex-wrap md:flex-nowrap",children:[r.jsx(h.AppField,{name:"name",children:a=>r.jsx(L,{className:"flex flex-1 min-w-[200px]",children:r.jsx(G,{label:"Practitioner Name",placeholder:'e.g. "John Doe"',variant:"outlined",size:"small",fullWidth:!0,id:a.name,name:a.name,value:t,onChange:n=>{const s=n.target.value;o(s),a.handleChange(s)},error:a.state.meta.isTouched&&a.state.meta.errors.length>0,helperText:a.state.meta.isTouched&&a.state.meta.errors.length>0?a.state.meta.errors.map(n=>n==null?void 0:n.message):null})})}),r.jsx(h.AppField,{name:"city",children:a=>r.jsx(L,{className:"flex flex-1 min-w-[200px]",children:r.jsx(G,{label:"City",placeholder:'e.g. "San Francisco"',variant:"outlined",size:"small",fullWidth:!0,id:a.name,name:a.name,value:l,onChange:n=>{const s=n.target.value;i(s),a.handleChange(s)},error:a.state.meta.isTouched&&a.state.meta.errors.length>0,helperText:a.state.meta.isTouched&&a.state.meta.errors.length>0?a.state.meta.errors.map(n=>n==null?void 0:n.message):null})})}),r.jsx(h.AppField,{name:"state",children:a=>r.jsx(L,{className:"flex flex-1 min-w-[200px]",children:r.jsx(te,{disablePortal:!0,value:c,onChange:(n,s)=>{u(s),a.handleChange((s==null?void 0:s.id)||"")},inputValue:p,onInputChange:(n,s)=>{b(s)},options:Ze,isOptionEqualToValue:(n,s)=>n.id===(s==null?void 0:s.id),getOptionLabel:n=>n.label,className:"flex-1",renderInput:n=>r.jsx(G,{...n,label:"State",placeholder:'e.g. "California"',variant:"outlined",size:"small",id:a.name,name:a.name,error:a.state.meta.isTouched&&a.state.meta.errors.length>0,helperText:a.state.meta.isTouched&&a.state.meta.errors.length>0?a.state.meta.errors.map(s=>s==null?void 0:s.message):null})})})}),r.jsx(h.AppField,{name:"specialty",children:a=>r.jsx(L,{className:"flex flex-1 min-w-[200px]",children:r.jsx(te,{disablePortal:!0,options:x,value:x.find(n=>n.id===g)||null,onChange:(n,s)=>{y((s==null?void 0:s.id)||""),a.handleChange((s==null?void 0:s.id)||"")},inputValue:j,onInputChange:(n,s)=>{N(s)},isOptionEqualToValue:(n,s)=>n.id===(s==null?void 0:s.id),getOptionLabel:n=>n.label,className:"flex-1",renderInput:n=>r.jsx(G,{...n,label:"Specialty",placeholder:'e.g. "Cardiology"',variant:"outlined",size:"small",id:a.name,name:a.name,error:a.state.meta.isTouched&&a.state.meta.errors.length>0,helperText:a.state.meta.isTouched&&a.state.meta.errors.length>0?a.state.meta.errors.map(s=>s==null?void 0:s.message):null})})})}),r.jsx(h.AppField,{name:"providerType",children:a=>r.jsx(L,{className:"flex flex-1 min-w-[200px]",children:r.jsx(te,{disablePortal:!0,options:A,value:A.find(n=>n.id===f)||null,onChange:(n,s)=>{F((s==null?void 0:s.id)||""),a.handleChange((s==null?void 0:s.id)||"")},inputValue:k,onInputChange:(n,s)=>{v(s)},isOptionEqualToValue:(n,s)=>n.id===(s==null?void 0:s.id),getOptionLabel:n=>n.label,className:"flex-1",renderInput:n=>r.jsx(G,{...n,label:"Provider Type",placeholder:'e.g. "Individual"',variant:"outlined",size:"small",id:a.name,name:a.name,error:a.state.meta.isTouched&&a.state.meta.errors.length>0,helperText:a.state.meta.isTouched&&a.state.meta.errors.length>0?a.state.meta.errors.map(s=>s==null?void 0:s.message):null})})})})]})]})})}export{st as F};
