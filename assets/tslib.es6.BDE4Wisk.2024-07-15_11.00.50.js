import{R as i}from"./index.A5_RCYys.2024-07-15_11.00.50.js";import{R as p}from"./CloseOutlined.dEC9RxCi.2024-07-15_11.00.50.js";import{p as h}from"./pickAttrs.CoR-7awW.2024-07-15_11.00.50.js";function O(a){if(a)return{closable:a.closable,closeIcon:a.closeIcon}}function d(a){const{closable:o,closeIcon:n}=a||{};return i.useMemo(()=>{if(!o&&(o===!1||n===!1||n===null))return!1;if(o===void 0&&n===void 0)return null;let r={closeIcon:typeof n!="boolean"&&n!==null?n:void 0};return o&&typeof o=="object"&&(r=Object.assign(Object.assign({},r),o)),r},[o,n])}function y(){const a={};for(var o=arguments.length,n=new Array(o),r=0;r<o;r++)n[r]=arguments[r];return n.forEach(l=>{l&&Object.keys(l).forEach(e=>{l[e]!==void 0&&(a[e]=l[e])})}),a}const m={};function E(a,o){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:m;const r=d(a),l=d(o),e=i.useMemo(()=>Object.assign({closeIcon:i.createElement(p,null)},n),[n]),s=i.useMemo(()=>r===!1?!1:r?y(e,l,r):l===!1?!1:l?y(e,l):e.closable?e:!1,[r,l,e]);return i.useMemo(()=>{if(s===!1)return[!1,null];const{closeIconRender:u}=e,{closeIcon:f}=s;let t=f;if(t!=null){u&&(t=u(f));const c=h(s,!0);Object.keys(c).length&&(t=i.isValidElement(t)?i.cloneElement(t,c):i.createElement("span",Object.assign({},c),t))}return[!0,t]},[s,e])}var g=function(){return g=Object.assign||function(o){for(var n,r=1,l=arguments.length;r<l;r++){n=arguments[r];for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(o[e]=n[e])}return o},g.apply(this,arguments)};function _(a,o){var n={};for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&o.indexOf(r)<0&&(n[r]=a[r]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,r=Object.getOwnPropertySymbols(a);l<r.length;l++)o.indexOf(r[l])<0&&Object.prototype.propertyIsEnumerable.call(a,r[l])&&(n[r[l]]=a[r[l]]);return n}function I(a,o,n,r){function l(e){return e instanceof n?e:new n(function(s){s(e)})}return new(n||(n=Promise))(function(e,s){function u(c){try{t(r.next(c))}catch(b){s(b)}}function f(c){try{t(r.throw(c))}catch(b){s(b)}}function t(c){c.done?e(c.value):l(c.value).then(u,f)}t((r=r.apply(a,o||[])).next())})}function j(a,o){var n={label:0,sent:function(){if(e[0]&1)throw e[1];return e[1]},trys:[],ops:[]},r,l,e,s;return s={next:u(0),throw:u(1),return:u(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function u(t){return function(c){return f([t,c])}}function f(t){if(r)throw new TypeError("Generator is already executing.");for(;s&&(s=0,t[0]&&(n=0)),n;)try{if(r=1,l&&(e=t[0]&2?l.return:t[0]?l.throw||((e=l.return)&&e.call(l),0):l.next)&&!(e=e.call(l,t[1])).done)return e;switch(l=0,e&&(t=[t[0]&2,e.value]),t[0]){case 0:case 1:e=t;break;case 4:return n.label++,{value:t[1],done:!1};case 5:n.label++,l=t[1],t=[0];continue;case 7:t=n.ops.pop(),n.trys.pop();continue;default:if(e=n.trys,!(e=e.length>0&&e[e.length-1])&&(t[0]===6||t[0]===2)){n=0;continue}if(t[0]===3&&(!e||t[1]>e[0]&&t[1]<e[3])){n.label=t[1];break}if(t[0]===6&&n.label<e[1]){n.label=e[1],e=t;break}if(e&&n.label<e[2]){n.label=e[2],n.ops.push(t);break}e[2]&&n.ops.pop(),n.trys.pop();continue}t=o.call(a,n)}catch(c){t=[6,c],l=0}finally{r=e=0}if(t[0]&5)throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}function S(a,o){var n=typeof Symbol=="function"&&a[Symbol.iterator];if(!n)return a;var r=n.call(a),l,e=[],s;try{for(;(o===void 0||o-- >0)&&!(l=r.next()).done;)e.push(l.value)}catch(u){s={error:u}}finally{try{l&&!l.done&&(n=r.return)&&n.call(r)}finally{if(s)throw s.error}}return e}function x(a,o,n){if(n||arguments.length===2)for(var r=0,l=o.length,e;r<l;r++)(e||!(r in o))&&(e||(e=Array.prototype.slice.call(o,0,r)),e[r]=o[r]);return a.concat(e||Array.prototype.slice.call(o))}export{x as _,S as a,g as b,I as c,j as d,_ as e,O as p,E as u};
