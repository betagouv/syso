(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{vMIm:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return g}));var n=r("oYCi"),i=r("UutA"),o=r("mXGw"),a=r("egL6"),c=r("Ntue");function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var l=Object(i.default)("input").withConfig({displayName:"SelectTauxRisque___StyledInput",componentId:"sc-1dar8iv-0"})(["padding:0.4rem;margin:0.2rem 0;width:100%;border:1px solid var(--lighterTextColor);border-radius:0.3rem;color:inherit;font-size:inherit;transition:border-color 0.1s;position:relative;:focus{border-color:var(--color);}"]),p=Object(i.default)("div").withConfig({displayName:"SelectTauxRisque___StyledDiv",componentId:"sc-1dar8iv-1"})(["text-align:left;width:100%;padding:0 0.4rem;border-radius:0.3rem;display:flex;align-items:center;cursor:pointer;:hover,:focus{background-color:var(--lighterColor);}background:white;border-radius:0.6rem;margin-top:0.4rem;span{display:inline-block;margin:0.6rem;}"]),b=Object(i.default)("span").withConfig({displayName:"SelectTauxRisque___StyledSpan",componentId:"sc-1dar8iv-2"})(["width:65%;font-size:85%;"]),f=Object(i.default)("span").withConfig({displayName:"SelectTauxRisque___StyledSpan2",componentId:"sc-1dar8iv-3"})(["width:10%;min-width:3em;color:#333;"]),h=Object(i.default)("span").withConfig({displayName:"SelectTauxRisque___StyledSpan3",componentId:"sc-1dar8iv-4"})(["width:20%;font-size:85%;background-color:#ddd;color:#333;border-radius:0.25em;padding:0.5em;text-align:center;"]);function j(e){var{onChange:t,onSubmit:r,options:i}=e,[s,d]=Object(o.useState)(),{t:u}=Object(a.a)();return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(l,{type:"search",placeholder:u("Saisissez votre domaine d'activit\xe9"),onChange:e=>{var t=e.target.value;t.length<2?d(void 0):worker.postMessage({input:t})}}),s&&0===s.length&&Object(n.jsx)("p",{children:Object(n.jsx)(c.a,{children:"Aucun r\xe9sultat"})}),s&&s.map((e=>Object(n.jsxs)(p,{onClick:()=>(e=>{t(e["Taux net"].replace(",",".")+"%"),r()})(e),children:[Object(n.jsx)(b,{children:e["Nature du risque"]}),Object(n.jsx)(f,{children:Object(n.jsx)("span",{children:e["Taux net"]+" %"})}),Object(n.jsx)(h,{children:e["Cat\xe9gorie"]})]},JSON.stringify(e))))]})}function g(e){var[t,r]=Object(o.useState)(null);return Object(o.useEffect)((()=>{fetch("https://raw.githubusercontent.com/betagouv/taux-collectifs-cotisation-atmp/master/taux-2021.json").then((e=>{if(!e.ok){var t=new Error(e.statusText);throw t.response=e,t}return e.json()})).then((e=>r(e))).catch((e=>console.warn("Erreur dans la r\xe9cup\xe9ration des codes risques",e)))}),[]),t?Object(n.jsx)(j,d(d({},e),{},{options:t})):null}}}]);