import{c as v,H as le,i as s,_ as oe,j as q}from"./main.BkD57bvT.2024-07-15_11.00.50.js";import{R as i,r as W}from"./index.A5_RCYys.2024-07-15_11.00.50.js";function ie(e){return!!(e.addonBefore||e.addonAfter)}function ce(e){return!!(e.prefix||e.suffix||e.allowClear)}function z(e,a,l){var t=a.cloneNode(!0),r=Object.create(e,{target:{value:t},currentTarget:{value:t}});return t.value=l,typeof a.selectionStart=="number"&&typeof a.selectionEnd=="number"&&(t.selectionStart=a.selectionStart,t.selectionEnd=a.selectionEnd),t.setSelectionRange=function(){a.setSelectionRange.apply(a,arguments)},r}function ve(e,a,l,t){if(l){var r=a;if(a.type==="click"){r=z(a,e,""),l(r);return}if(e.type!=="file"&&t!==void 0){r=z(a,e,t),l(r);return}l(r)}}function se(e,a){if(e){e.focus(a);var l=a||{},t=l.cursor;if(t){var r=e.value.length;switch(t){case"start":e.setSelectionRange(0,0);break;case"end":e.setSelectionRange(r,r);break;default:e.setSelectionRange(0,r)}}}}var fe=i.forwardRef(function(e,a){var l,t,r=e.inputElement,R=e.children,f=e.prefixCls,j=e.prefix,y=e.suffix,I=e.addonBefore,O=e.addonAfter,J=e.className,K=e.style,N=e.disabled,$=e.readOnly,L=e.focused,h=e.triggerFocus,u=e.allowClear,w=e.value,Q=e.handleReset,U=e.hidden,c=e.classes,n=e.classNames,x=e.dataAttrs,d=e.styles,o=e.components,D=R??r,X=(o==null?void 0:o.affixWrapper)||"span",Y=(o==null?void 0:o.groupWrapper)||"span",Z=(o==null?void 0:o.wrapper)||"span",F=(o==null?void 0:o.groupAddon)||"span",g=W.useRef(null),_=function(k){var B;(B=g.current)!==null&&B!==void 0&&B.contains(k.target)&&(h==null||h())},G=ce(e),m=W.cloneElement(D,{value:w,className:v(D.props.className,!G&&(n==null?void 0:n.variant))||null}),H=W.useRef(null);if(i.useImperativeHandle(a,function(){return{nativeElement:H.current||g.current}}),G){var p,M=null;if(u){var b,V=!N&&!$&&w,A="".concat(f,"-clear-icon"),P=le(u)==="object"&&u!==null&&u!==void 0&&u.clearIcon?u.clearIcon:"✖";M=i.createElement("span",{onClick:Q,onMouseDown:function(k){return k.preventDefault()},className:v(A,(b={},s(b,"".concat(A,"-hidden"),!V),s(b,"".concat(A,"-has-suffix"),!!y),b)),role:"button",tabIndex:-1},P)}var E="".concat(f,"-affix-wrapper"),ee=v(E,(p={},s(p,"".concat(f,"-disabled"),N),s(p,"".concat(E,"-disabled"),N),s(p,"".concat(E,"-focused"),L),s(p,"".concat(E,"-readonly"),$),s(p,"".concat(E,"-input-with-clear-btn"),y&&u&&w),p),c==null?void 0:c.affixWrapper,n==null?void 0:n.affixWrapper,n==null?void 0:n.variant),ne=(y||u)&&i.createElement("span",{className:v("".concat(f,"-suffix"),n==null?void 0:n.suffix),style:d==null?void 0:d.suffix},M,y);m=i.createElement(X,oe({className:ee,style:d==null?void 0:d.affixWrapper,onClick:_},x==null?void 0:x.affixWrapper,{ref:g}),j&&i.createElement("span",{className:v("".concat(f,"-prefix"),n==null?void 0:n.prefix),style:d==null?void 0:d.prefix},j),m,ne)}if(ie(e)){var S="".concat(f,"-group"),T="".concat(S,"-addon"),C="".concat(S,"-wrapper"),ae=v("".concat(f,"-wrapper"),S,c==null?void 0:c.wrapper,n==null?void 0:n.wrapper),te=v(C,s({},"".concat(C,"-disabled"),N),c==null?void 0:c.group,n==null?void 0:n.groupWrapper);m=i.createElement(Y,{className:te,ref:H},i.createElement(Z,{className:ae},I&&i.createElement(F,{className:T},I),m,O&&i.createElement(F,{className:T},O)))}return i.cloneElement(m,{className:v((l=m.props)===null||l===void 0?void 0:l.className,J)||null,style:q(q({},(t=m.props)===null||t===void 0?void 0:t.style),K),hidden:U})});export{fe as B,ve as r,se as t};
