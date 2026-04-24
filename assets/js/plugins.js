// htmx
(function(e,t){if(typeof define==="function"&&define.amd){define([],t)}else if(typeof module==="object"&&module.exports){module.exports=t()}else{e.htmx=e.htmx||t()}})(typeof self!=="undefined"?self:this,function(){return function(){"use strict";var z={onLoad:t,process:Tt,on:le,off:ue,trigger:ie,ajax:dr,find:b,findAll:f,closest:d,values:function(e,t){var r=Jt(e,t||"post");return r.values},remove:B,addClass:j,removeClass:n,toggleClass:U,takeClass:V,defineExtension:yr,removeExtension:br,logAll:F,logger:null,config:{historyEnabled:true,historyCacheSize:10,refreshOnHistoryMiss:false,defaultSwapStyle:"innerHTML",defaultSwapDelay:0,defaultSettleDelay:20,includeIndicatorStyles:true,indicatorClass:"htmx-indicator",requestClass:"htmx-request",addedClass:"htmx-added",settlingClass:"htmx-settling",swappingClass:"htmx-swapping",allowEval:true,inlineScriptNonce:"",attributesToSettle:["class","style","width","height"],withCredentials:false,timeout:0,wsReconnectDelay:"full-jitter",wsBinaryType:"blob",disableSelector:"[hx-disable], [data-hx-disable]",useTemplateFragments:false,scrollBehavior:"smooth",defaultFocusScroll:false,getCacheBusterParam:false,globalViewTransitions:false},parseInterval:v,_:e,createEventSource:function(e){return new EventSource(e,{withCredentials:true})},createWebSocket:function(e){var t=new WebSocket(e,[]);t.binaryType=z.config.wsBinaryType;return t},version:"1.9.2"};var C={addTriggerHandler:xt,bodyContains:ee,canAccessLocalStorage:D,filterValues:er,hasAttribute:q,getAttributeValue:G,getClosestMatch:c,getExpressionVars:fr,getHeaders:Qt,getInputValues:Jt,getInternalData:Y,getSwapSpecification:rr,getTriggerSpecs:ze,getTarget:de,makeFragment:l,mergeObjects:te,makeSettleInfo:S,oobSwap:me,selectAndSwap:Me,settleImmediately:Bt,shouldCancel:Ke,triggerEvent:ie,triggerErrorEvent:ne,withExtensions:w};var R=["get","post","put","delete","patch"];var O=R.map(function(e){return"[hx-"+e+"], [data-hx-"+e+"]"}).join(", ");function v(e){if(e==undefined){return undefined}if(e.slice(-2)=="ms"){return parseFloat(e.slice(0,-2))||undefined}if(e.slice(-1)=="s"){return parseFloat(e.slice(0,-1))*1e3||undefined}if(e.slice(-1)=="m"){return parseFloat(e.slice(0,-1))*1e3*60||undefined}return parseFloat(e)||undefined}function $(e,t){return e.getAttribute&&e.getAttribute(t)}function q(e,t){return e.hasAttribute&&(e.hasAttribute(t)||e.hasAttribute("data-"+t))}function G(e,t){return $(e,t)||$(e,"data-"+t)}function u(e){return e.parentElement}function J(){return document}function c(e,t){while(e&&!t(e)){e=u(e)}return e?e:null}function T(e,t,r){var n=G(t,r);var i=G(t,"hx-disinherit");if(e!==t&&i&&(i==="*"||i.split(" ").indexOf(r)>=0)){return"unset"}else{return n}}function Z(t,r){var n=null;c(t,function(e){return n=T(t,e,r)});if(n!=="unset"){return n}}function h(e,t){var r=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector;return r&&r.call(e,t)}function H(e){var t=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i;var r=t.exec(e);if(r){return r[1].toLowerCase()}else{return""}}function i(e,t){var r=new DOMParser;var n=r.parseFromString(e,"text/html");var i=n.body;while(t>0){t--;i=i.firstChild}if(i==null){i=J().createDocumentFragment()}return i}function L(e){return e.match(/<body/)}function l(e){var t=!L(e);if(z.config.useTemplateFragments&&t){var r=i("<body><template>"+e+"</template></body>",0);return r.querySelector("template").content}else{var n=H(e);switch(n){case"thead":case"tbody":case"tfoot":case"colgroup":case"caption":return i("<table>"+e+"</table>",1);case"col":return i("<table><colgroup>"+e+"</colgroup></table>",2);case"tr":return i("<table><tbody>"+e+"</tbody></table>",2);case"td":case"th":return i("<table><tbody><tr>"+e+"</tr></tbody></table>",3);case"script":return i("<div>"+e+"</div>",1);default:return i(e,0)}}}function K(e){if(e){e()}}function A(e,t){return Object.prototype.toString.call(e)==="[object "+t+"]"}function N(e){return A(e,"Function")}function I(e){return A(e,"Object")}function Y(e){var t="htmx-internal-data";var r=e[t];if(!r){r=e[t]={}}return r}function k(e){var t=[];if(e){for(var r=0;r<e.length;r++){t.push(e[r])}}return t}function Q(e,t){if(e){for(var r=0;r<e.length;r++){t(e[r])}}}function P(e){var t=e.getBoundingClientRect();var r=t.top;var n=t.bottom;return r<window.innerHeight&&n>=0}function ee(e){if(e.getRootNode&&e.getRootNode()instanceof ShadowRoot){return J().body.contains(e.getRootNode().host)}else{return J().body.contains(e)}}function M(e){return e.trim().split(/\s+/)}function te(e,t){for(var r in t){if(t.hasOwnProperty(r)){e[r]=t[r]}}return e}function y(e){try{return JSON.parse(e)}catch(e){x(e);return null}}function D(){var e="htmx:localStorageTest";try{localStorage.setItem(e,e);localStorage.removeItem(e);return true}catch(e){return false}}function X(t){try{var e=new URL(t);if(e){t=e.pathname+e.search}if(!t.match("^/$")){t=t.replace(/\/+$/,"")}return t}catch(e){return t}}function e(e){return sr(J().body,function(){return eval(e)})}function t(t){var e=z.on("htmx:load",function(e){t(e.detail.elt)});return e}function F(){z.logger=function(e,t,r){if(console){console.log(t,e,r)}}}function b(e,t){if(t){return e.querySelector(t)}else{return b(J(),e)}}function f(e,t){if(t){return e.querySelectorAll(t)}else{return f(J(),e)}}function B(e,t){e=s(e);if(t){setTimeout(function(){B(e);e=null},t)}else{e.parentElement.removeChild(e)}}function j(e,t,r){e=s(e);if(r){setTimeout(function(){j(e,t);e=null},r)}else{e.classList&&e.classList.add(t)}}function n(e,t,r){e=s(e);if(r){setTimeout(function(){n(e,t);e=null},r)}else{if(e.classList){e.classList.remove(t);if(e.classList.length===0){e.removeAttribute("class")}}}}function U(e,t){e=s(e);e.classList.toggle(t)}function V(e,t){e=s(e);Q(e.parentElement.children,function(e){n(e,t)});j(e,t)}function d(e,t){e=s(e);if(e.closest){return e.closest(t)}else{do{if(e==null||h(e,t)){return e}}while(e=e&&u(e));return null}}function r(e){var t=e.trim();if(t.startsWith("<")&&t.endsWith("/>")){return t.substring(1,t.length-2)}else{return t}}function _(e,t){if(t.indexOf("closest ")===0){return[d(e,r(t.substr(8)))]}else if(t.indexOf("find ")===0){return[b(e,r(t.substr(5)))]}else if(t.indexOf("next ")===0){return[W(e,r(t.substr(5)))]}else if(t.indexOf("previous ")===0){return[oe(e,r(t.substr(9)))]}else if(t==="document"){return[document]}else if(t==="window"){return[window]}else{return J().querySelectorAll(r(t))}}var W=function(e,t){var r=J().querySelectorAll(t);for(var n=0;n<r.length;n++){var i=r[n];if(i.compareDocumentPosition(e)===Node.DOCUMENT_POSITION_PRECEDING){return i}}};var oe=function(e,t){var r=J().querySelectorAll(t);for(var n=r.length-1;n>=0;n--){var i=r[n];if(i.compareDocumentPosition(e)===Node.DOCUMENT_POSITION_FOLLOWING){return i}}};function re(e,t){if(t){return _(e,t)[0]}else{return _(J().body,e)[0]}}function s(e){if(A(e,"String")){return b(e)}else{return e}}function se(e,t,r){if(N(t)){return{target:J().body,event:e,listener:t}}else{return{target:s(e),event:t,listener:r}}}function le(t,r,n){Sr(function(){var e=se(t,r,n);e.target.addEventListener(e.event,e.listener)});var e=N(r);return e?r:n}function ue(t,r,n){Sr(function(){var e=se(t,r,n);e.target.removeEventListener(e.event,e.listener)});return N(r)?r:n}var fe=J().createElement("output");function ce(e,t){var r=Z(e,t);if(r){if(r==="this"){return[he(e,t)]}else{var n=_(e,r);if(n.length===0){x('The selector "'+r+'" on '+t+" returned no matches!");return[fe]}else{return n}}}}function he(e,t){return c(e,function(e){return G(e,t)!=null})}function de(e){var t=Z(e,"hx-target");if(t){if(t==="this"){return he(e,"hx-target")}else{return re(e,t)}}else{var r=Y(e);if(r.boosted){return J().body}else{return e}}}function ve(e){var t=z.config.attributesToSettle;for(var r=0;r<t.length;r++){if(e===t[r]){return true}}return false}function ge(t,r){Q(t.attributes,function(e){if(!r.hasAttribute(e.name)&&ve(e.name)){t.removeAttribute(e.name)}});Q(r.attributes,function(e){if(ve(e.name)){t.setAttribute(e.name,e.value)}})}function pe(e,t){var r=wr(t);for(var n=0;n<r.length;n++){var i=r[n];try{if(i.isInlineSwap(e)){return true}}catch(e){x(e)}}return e==="outerHTML"}function me(e,i,a){var t="#"+i.id;var o="outerHTML";if(e==="true"){}else if(e.indexOf(":")>0){o=e.substr(0,e.indexOf(":"));t=e.substr(e.indexOf(":")+1,e.length)}else{o=e}var r=J().querySelectorAll(t);if(r){Q(r,function(e){var t;var r=i.cloneNode(true);t=J().createDocumentFragment();t.appendChild(r);if(!pe(o,e)){t=r}var n={shouldSwap:true,target:e,fragment:t};if(!ie(e,"htmx:oobBeforeSwap",n))return;e=n.target;if(n["shouldSwap"]){ke(o,e,e,t,a)}Q(a.elts,function(e){ie(e,"htmx:oobAfterSwap",n)})});i.parentNode.removeChild(i)}else{i.parentNode.removeChild(i);ne(J().body,"htmx:oobErrorNoTarget",{content:i})}return e}function xe(e,t,r){var n=Z(e,"hx-select-oob");if(n){var i=n.split(",");for(let e=0;e<i.length;e++){var a=i[e].split(":",2);var o=a[0].trim();if(o.indexOf("#")===0){o=o.substring(1)}var s=a[1]||"true";var l=t.querySelector("#"+o);if(l){me(s,l,r)}}}Q(f(t,"[hx-swap-oob], [data-hx-swap-oob]"),function(e){var t=G(e,"hx-swap-oob");if(t!=null){me(t,e,r)}})}function ye(e){Q(f(e,"[hx-preserve], [data-hx-preserve]"),function(e){var t=G(e,"id");var r=J().getElementById(t);if(r!=null){e.parentNode.replaceChild(r,e)}})}function be(a,e,o){Q(e.querySelectorAll("[id]"),function(e){if(e.id&&e.id.length>0){var t=e.id.replace("'","\\'");var r=e.tagName.replace(":","\\:");var n=a.querySelector(r+"[id='"+t+"']");if(n&&n!==a){var i=e.cloneNode();ge(e,n);o.tasks.push(function(){ge(e,i)})}}})}function we(e){return function(){n(e,z.config.addedClass);Tt(e);bt(e);Se(e);ie(e,"htmx:load")}}function Se(e){var t="[autofocus]";var r=h(e,t)?e:e.querySelector(t);if(r!=null){r.focus()}}function a(e,t,r,n){be(e,r,n);while(r.childNodes.length>0){var i=r.firstChild;j(i,z.config.addedClass);e.insertBefore(i,t);if(i.nodeType!==Node.TEXT_NODE&&i.nodeType!==Node.COMMENT_NODE){n.tasks.push(we(i))}}}function Ee(e,t){var r=0;while(r<e.length){t=(t<<5)-t+e.charCodeAt(r++)|0}return t}function Ce(e){var t=0;if(e.attributes){for(var r=0;r<e.attributes.length;r++){var n=e.attributes[r];if(n.value){t=Ee(n.name,t);t=Ee(n.value,t)}}}return t}function Re(t){var r=Y(t);if(r.timeout){clearTimeout(r.timeout)}if(r.webSocket){r.webSocket.close()}if(r.sseEventSource){r.sseEventSource.close()}if(r.listenerInfos){Q(r.listenerInfos,function(e){if(e.on){e.on.removeEventListener(e.trigger,e.listener)}})}if(r.onHandlers){for(let e=0;e<r.onHandlers.length;e++){const n=r.onHandlers[e];t.removeEventListener(n.name,n.handler)}}}function o(e){ie(e,"htmx:beforeCleanupElement");Re(e);if(e.children){Q(e.children,function(e){o(e)})}}function Oe(e,t,r){if(e.tagName==="BODY"){return Ne(e,t,r)}else{var n;var i=e.previousSibling;a(u(e),e,t,r);if(i==null){n=u(e).firstChild}else{n=i.nextSibling}Y(e).replacedWith=n;r.elts=[];while(n&&n!==e){if(n.nodeType===Node.ELEMENT_NODE){r.elts.push(n)}n=n.nextElementSibling}o(e);u(e).removeChild(e)}}function qe(e,t,r){return a(e,e.firstChild,t,r)}function Te(e,t,r){return a(u(e),e,t,r)}function He(e,t,r){return a(e,null,t,r)}function Le(e,t,r){return a(u(e),e.nextSibling,t,r)}function Ae(e,t,r){o(e);return u(e).removeChild(e)}function Ne(e,t,r){var n=e.firstChild;a(e,n,t,r);if(n){while(n.nextSibling){o(n.nextSibling);e.removeChild(n.nextSibling)}o(n);e.removeChild(n)}}function Ie(e,t){var r=Z(e,"hx-select");if(r){var n=J().createDocumentFragment();Q(t.querySelectorAll(r),function(e){n.appendChild(e)});t=n}return t}function ke(e,t,r,n,i){switch(e){case"none":return;case"outerHTML":Oe(r,n,i);return;case"afterbegin":qe(r,n,i);return;case"beforebegin":Te(r,n,i);return;case"beforeend":He(r,n,i);return;case"afterend":Le(r,n,i);return;case"delete":Ae(r,n,i);return;default:var a=wr(t);for(var o=0;o<a.length;o++){var s=a[o];try{var l=s.handleSwap(e,r,n,i);if(l){if(typeof l.length!=="undefined"){for(var u=0;u<l.length;u++){var f=l[u];if(f.nodeType!==Node.TEXT_NODE&&f.nodeType!==Node.COMMENT_NODE){i.tasks.push(we(f))}}}return}}catch(e){x(e)}}if(e==="innerHTML"){Ne(r,n,i)}else{ke(z.config.defaultSwapStyle,t,r,n,i)}}}function Pe(e){if(e.indexOf("<title")>-1){var t=e.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");var r=t.match(/<title(\s[^>]*>|>)([\s\S]*?)<\/title>/im);if(r){return r[2]}}}function Me(e,t,r,n,i){i.title=Pe(n);var a=l(n);if(a){xe(r,a,i);a=Ie(r,a);ye(a);return ke(e,r,t,a,i)}}function De(e,t,r){var n=e.getResponseHeader(t);if(n.indexOf("{")===0){var i=y(n);for(var a in i){if(i.hasOwnProperty(a)){var o=i[a];if(!I(o)){o={value:o}}ie(r,a,o)}}}else{ie(r,n,[])}}var Xe=/\s/;var g=/[\s,]/;var Fe=/[_$a-zA-Z]/;var Be=/[_$a-zA-Z0-9]/;var je=['"',"'","/"];var p=/[^\s]/;function Ue(e){var t=[];var r=0;while(r<e.length){if(Fe.exec(e.charAt(r))){var n=r;while(Be.exec(e.charAt(r+1))){r++}t.push(e.substr(n,r-n+1))}else if(je.indexOf(e.charAt(r))!==-1){var i=e.charAt(r);var n=r;r++;while(r<e.length&&e.charAt(r)!==i){if(e.charAt(r)==="\\"){r++}r++}t.push(e.substr(n,r-n+1))}else{var a=e.charAt(r);t.push(a)}r++}return t}function Ve(e,t,r){return Fe.exec(e.charAt(0))&&e!=="true"&&e!=="false"&&e!=="this"&&e!==r&&t!=="."}function _e(e,t,r){if(t[0]==="["){t.shift();var n=1;var i=" return (function("+r+"){ return (";var a=null;while(t.length>0){var o=t[0];if(o==="]"){n--;if(n===0){if(a===null){i=i+"true"}t.shift();i+=")})";try{var s=sr(e,function(){return Function(i)()},function(){return true});s.source=i;return s}catch(e){ne(J().body,"htmx:syntax:error",{error:e,source:i});return null}}}else if(o==="["){n++}if(Ve(o,a,r)){i+="(("+r+"."+o+") ? ("+r+"."+o+") : (window."+o+"))"}else{i=i+o}a=t.shift()}}}function m(e,t){var r="";while(e.length>0&&!e[0].match(t)){r+=e.shift()}return r}var We="input, textarea, select";function ze(e){var t=G(e,"hx-trigger");var r=[];if(t){var n=Ue(t);do{m(n,p);var i=n.length;var a=m(n,/[,\[\s]/);if(a!==""){if(a==="every"){var o={trigger:"every"};m(n,p);o.pollInterval=v(m(n,/[,\[\s]/));m(n,p);var s=_e(e,n,"event");if(s){o.eventFilter=s}r.push(o)}else if(a.indexOf("sse:")===0){r.push({trigger:"sse",sseEvent:a.substr(4)})}else{var l={trigger:a};var s=_e(e,n,"event");if(s){l.eventFilter=s}while(n.length>0&&n[0]!==","){m(n,p);var u=n.shift();if(u==="changed"){l.changed=true}else if(u==="once"){l.once=true}else if(u==="consume"){l.consume=true}else if(u==="delay"&&n[0]===":"){n.shift();l.delay=v(m(n,g))}else if(u==="from"&&n[0]===":"){n.shift();var f=m(n,g);if(f==="closest"||f==="find"||f==="next"||f==="previous"){n.shift();f+=" "+m(n,g)}l.from=f}else if(u==="target"&&n[0]===":"){n.shift();l.target=m(n,g)}else if(u==="throttle"&&n[0]===":"){n.shift();l.throttle=v(m(n,g))}else if(u==="queue"&&n[0]===":"){n.shift();l.queue=m(n,g)}else if((u==="root"||u==="threshold")&&n[0]===":"){n.shift();l[u]=m(n,g)}else{ne(e,"htmx:syntax:error",{token:n.shift()})}}r.push(l)}}if(n.length===i){ne(e,"htmx:syntax:error",{token:n.shift()})}m(n,p)}while(n[0]===","&&n.shift())}if(r.length>0){return r}else if(h(e,"form")){return[{trigger:"submit"}]}else if(h(e,'input[type="button"]')){return[{trigger:"click"}]}else if(h(e,We)){return[{trigger:"change"}]}else{return[{trigger:"click"}]}}function $e(e){Y(e).cancelled=true}function Ge(e,t,r){var n=Y(e);n.timeout=setTimeout(function(){if(ee(e)&&n.cancelled!==true){if(!Qe(r,Lt("hx:poll:trigger",{triggerSpec:r,target:e}))){t(e)}Ge(e,t,r)}},r.pollInterval)}function Je(e){return location.hostname===e.hostname&&$(e,"href")&&$(e,"href").indexOf("#")!==0}function Ze(t,r,e){if(t.tagName==="A"&&Je(t)&&(t.target===""||t.target==="_self")||t.tagName==="FORM"){r.boosted=true;var n,i;if(t.tagName==="A"){n="get";i=t.href}else{var a=$(t,"method");n=a?a.toLowerCase():"get";if(n==="get"){}i=$(t,"action")}e.forEach(function(e){et(t,function(e,t){ae(n,i,e,t)},r,e,true)})}}function Ke(e,t){if(e.type==="submit"||e.type==="click"){if(t.tagName==="FORM"){return true}if(h(t,'input[type="submit"], button')&&d(t,"form")!==null){return true}if(t.tagName==="A"&&t.href&&(t.getAttribute("href")==="#"||t.getAttribute("href").indexOf("#")!==0)){return true}}return false}function Ye(e,t){return Y(e).boosted&&e.tagName==="A"&&t.type==="click"&&(t.ctrlKey||t.metaKey)}function Qe(e,t){var r=e.eventFilter;if(r){try{return r(t)!==true}catch(e){ne(J().body,"htmx:eventFilter:error",{error:e,source:r.source});return true}}return false}function et(i,a,e,o,s){var l=Y(i);var t;if(o.from){t=_(i,o.from)}else{t=[i]}if(o.changed){l.lastValue=i.value}Q(t,function(r){var n=function(e){if(!ee(i)){r.removeEventListener(o.trigger,n);return}if(Ye(i,e)){return}if(s||Ke(e,i)){e.preventDefault()}if(Qe(o,e)){return}var t=Y(e);t.triggerSpec=o;if(t.handledFor==null){t.handledFor=[]}if(t.handledFor.indexOf(i)<0){t.handledFor.push(i);if(o.consume){e.stopPropagation()}if(o.target&&e.target){if(!h(e.target,o.target)){return}}if(o.once){if(l.triggeredOnce){return}else{l.triggeredOnce=true}}if(o.changed){if(l.lastValue===i.value){return}else{l.lastValue=i.value}}if(l.delayed){clearTimeout(l.delayed)}if(l.throttle){return}if(o.throttle){if(!l.throttle){a(i,e);l.throttle=setTimeout(function(){l.throttle=null},o.throttle)}}else if(o.delay){l.delayed=setTimeout(function(){a(i,e)},o.delay)}else{ie(i,"htmx:trigger");a(i,e)}}};if(e.listenerInfos==null){e.listenerInfos=[]}e.listenerInfos.push({trigger:o.trigger,listener:n,on:r});r.addEventListener(o.trigger,n)})}var tt=false;var rt=null;function nt(){if(!rt){rt=function(){tt=true};window.addEventListener("scroll",rt);setInterval(function(){if(tt){tt=false;Q(J().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"),function(e){it(e)})}},200)}}function it(t){if(!q(t,"data-hx-revealed")&&P(t)){t.setAttribute("data-hx-revealed","true");var e=Y(t);if(e.initHash){ie(t,"revealed")}else{t.addEventListener("htmx:afterProcessNode",function(e){ie(t,"revealed")},{once:true})}}}function at(e,t,r){var n=M(r);for(var i=0;i<n.length;i++){var a=n[i].split(/:(.+)/);if(a[0]==="connect"){ot(e,a[1],0)}if(a[0]==="send"){lt(e)}}}function ot(s,r,n){if(!ee(s)){return}if(r.indexOf("/")==0){var e=location.hostname+(location.port?":"+location.port:"");if(location.protocol=="https:"){r="wss://"+e+r}else if(location.protocol=="http:"){r="ws://"+e+r}}var t=z.createWebSocket(r);t.onerror=function(e){ne(s,"htmx:wsError",{error:e,socket:t});st(s)};t.onclose=function(e){if([1006,1012,1013].indexOf(e.code)>=0){var t=ut(n);setTimeout(function(){ot(s,r,n+1)},t)}};t.onopen=function(e){n=0};Y(s).webSocket=t;t.addEventListener("message",function(e){if(st(s)){return}var t=e.data;w(s,function(e){t=e.transformResponse(t,null,s)});var r=S(s);var n=l(t);var i=k(n.children);for(var a=0;a<i.length;a++){var o=i[a];me(G(o,"hx-swap-oob")||"true",o,r)}Bt(r.tasks)})}function st(e){if(!ee(e)){Y(e).webSocket.close();return true}}function lt(u){var f=c(u,function(e){return Y(e).webSocket!=null});if(f){u.addEventListener(ze(u)[0].trigger,function(e){var t=Y(f).webSocket;var r=Qt(u,f);var n=Jt(u,"post");var i=n.errors;var a=n.values;var o=fr(u);var s=te(a,o);var l=er(s,u);l["HEADERS"]=r;if(i&&i.length>0){ie(u,"htmx:validation:halted",i);return}t.send(JSON.stringify(l));if(Ke(e,u)){e.preventDefault()}})}else{ne(u,"htmx:noWebSocketSourceError")}}function ut(e){var t=z.config.wsReconnectDelay;if(typeof t==="function"){return t(e)}if(t==="full-jitter"){var r=Math.min(e,6);var n=1e3*Math.pow(2,r);return n*Math.random()}x('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"')}function ft(e,t,r){var n=M(r);for(var i=0;i<n.length;i++){var a=n[i].split(/:(.+)/);if(a[0]==="connect"){ct(e,a[1])}if(a[0]==="swap"){ht(e,a[1])}}}function ct(t,e){var r=z.createEventSource(e);r.onerror=function(e){ne(t,"htmx:sseError",{error:e,source:r});vt(t)};Y(t).sseEventSource=r}function ht(a,o){var s=c(a,gt);if(s){var l=Y(s).sseEventSource;var u=function(e){if(vt(s)){l.removeEventListener(o,u);return}var t=e.data;w(a,function(e){t=e.transformResponse(t,null,a)});var r=rr(a);var n=de(a);var i=S(a);Me(r.swapStyle,a,n,t,i);Bt(i.tasks);ie(a,"htmx:sseMessage",e)};Y(a).sseListener=u;l.addEventListener(o,u)}else{ne(a,"htmx:noSSESourceError")}}function dt(e,t,r){var n=c(e,gt);if(n){var i=Y(n).sseEventSource;var a=function(){if(!vt(n)){if(ee(e)){t(e)}else{i.removeEventListener(r,a)}}};Y(e).sseListener=a;i.addEventListener(r,a)}else{ne(e,"htmx:noSSESourceError")}}function vt(e){if(!ee(e)){Y(e).sseEventSource.close();return true}}function gt(e){return Y(e).sseEventSource!=null}function pt(e,t,r,n){var i=function(){if(!r.loaded){r.loaded=true;t(e)}};if(n){setTimeout(i,n)}else{i()}}function mt(t,i,e){var a=false;Q(R,function(r){if(q(t,"hx-"+r)){var n=G(t,"hx-"+r);a=true;i.path=n;i.verb=r;e.forEach(function(e){xt(t,e,i,function(e,t){ae(r,n,e,t)})})}});return a}function xt(n,e,t,r){if(e.sseEvent){dt(n,r,e.sseEvent)}else if(e.trigger==="revealed"){nt();et(n,r,t,e);it(n)}else if(e.trigger==="intersect"){var i={};if(e.root){i.root=re(n,e.root)}if(e.threshold){i.threshold=parseFloat(e.threshold)}var a=new IntersectionObserver(function(e){for(var t=0;t<e.length;t++){var r=e[t];if(r.isIntersecting){ie(n,"intersect");break}}},i);a.observe(n);et(n,r,t,e)}else if(e.trigger==="load"){if(!Qe(e,Lt("load",{elt:n}))){pt(n,r,t,e.delay)}}else if(e.pollInterval){t.polling=true;Ge(n,r,e)}else{et(n,r,t,e)}}function yt(e){if(e.type==="text/javascript"||e.type==="module"||e.type===""){var t=J().createElement("script");Q(e.attributes,function(e){t.setAttribute(e.name,e.value)});t.textContent=e.textContent;t.async=false;if(z.config.inlineScriptNonce){t.nonce=z.config.inlineScriptNonce}var r=e.parentElement;try{r.insertBefore(t,e)}catch(e){x(e)}finally{if(e.parentElement){e.parentElement.removeChild(e)}}}}function bt(e){if(h(e,"script")){yt(e)}Q(f(e,"script"),function(e){yt(e)})}function wt(){return document.querySelector("[hx-boost], [data-hx-boost]")}function St(e){if(e.querySelectorAll){var t=wt()?", a, form":"";var r=e.querySelectorAll(O+t+", [hx-sse], [data-hx-sse], [hx-ws],"+" [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]");return r}else{return[]}}function Et(n){var e=function(e){var t=d(e.target,"button, input[type='submit']");if(t!==null){var r=Y(n);r.lastButtonClicked=t}};n.addEventListener("click",e);n.addEventListener("focusin",e);n.addEventListener("focusout",function(e){var t=Y(n);t.lastButtonClicked=null})}function Ct(e){var t=Ue(e);var r=0;for(let e=0;e<t.length;e++){const n=t[e];if(n==="{"){r++}else if(n==="}"){r--}}return r}function Rt(t,e,r){var n=Y(t);n.onHandlers=[];var i=new Function("event",r+"; return;");var a=t.addEventListener(e,function(e){return i.call(t,e)});n.onHandlers.push({event:e,listener:a});return{nodeData:n,code:r,func:i,listener:a}}function Ot(e){var t=G(e,"hx-on");if(t){var r={};var n=t.split("\n");var i=null;var a=0;while(n.length>0){var o=n.shift();var s=o.match(/^\s*([a-zA-Z:\-]+:)(.*)/);if(a===0&&s){o.split(":");i=s[1].slice(0,-1);r[i]=s[2]}else{r[i]+=o}a+=Ct(o)}for(var l in r){Rt(e,l,r[l])}}}function qt(t){if(t.closest&&t.closest(z.config.disableSelector)){return}var r=Y(t);if(r.initHash!==Ce(t)){r.initHash=Ce(t);Re(t);Ot(t);ie(t,"htmx:beforeProcessNode");if(t.value){r.lastValue=t.value}var e=ze(t);var n=mt(t,r,e);if(!n){if(Z(t,"hx-boost")==="true"){Ze(t,r,e)}else if(q(t,"hx-trigger")){e.forEach(function(e){xt(t,e,r,function(){})})}}if(t.tagName==="FORM"){Et(t)}var i=G(t,"hx-sse");if(i){ft(t,r,i)}var a=G(t,"hx-ws");if(a){at(t,r,a)}ie(t,"htmx:afterProcessNode")}}function Tt(e){e=s(e);qt(e);Q(St(e),function(e){qt(e)})}function Ht(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}function Lt(e,t){var r;if(window.CustomEvent&&typeof window.CustomEvent==="function"){r=new CustomEvent(e,{bubbles:true,cancelable:true,detail:t})}else{r=J().createEvent("CustomEvent");r.initCustomEvent(e,true,true,t)}return r}function ne(e,t,r){ie(e,t,te({error:t},r))}function At(e){return e==="htmx:afterProcessNode"}function w(e,t){Q(wr(e),function(e){try{t(e)}catch(e){x(e)}})}function x(e){if(console.error){console.error(e)}else if(console.log){console.log("ERROR: ",e)}}function ie(e,t,r){e=s(e);if(r==null){r={}}r["elt"]=e;var n=Lt(t,r);if(z.logger&&!At(t)){z.logger(e,t,r)}if(r.error){x(r.error);ie(e,"htmx:error",{errorInfo:r})}var i=e.dispatchEvent(n);var a=Ht(t);if(i&&a!==t){var o=Lt(a,n.detail);i=i&&e.dispatchEvent(o)}w(e,function(e){i=i&&e.onEvent(t,n)!==false});return i}var Nt=location.pathname+location.search;function It(){var e=J().querySelector("[hx-history-elt],[data-hx-history-elt]");return e||J().body}function kt(e,t,r,n){if(!D()){return}e=X(e);var i=y(localStorage.getItem("htmx-history-cache"))||[];for(var a=0;a<i.length;a++){if(i[a].url===e){i.splice(a,1);break}}var o={url:e,content:t,title:r,scroll:n};ie(J().body,"htmx:historyItemCreated",{item:o,cache:i});i.push(o);while(i.length>z.config.historyCacheSize){i.shift()}while(i.length>0){try{localStorage.setItem("htmx-history-cache",JSON.stringify(i));break}catch(e){ne(J().body,"htmx:historyCacheError",{cause:e,cache:i});i.shift()}}}function Pt(e){if(!D()){return null}e=X(e);var t=y(localStorage.getItem("htmx-history-cache"))||[];for(var r=0;r<t.length;r++){if(t[r].url===e){return t[r]}}return null}function Mt(e){var t=z.config.requestClass;var r=e.cloneNode(true);Q(f(r,"."+t),function(e){n(e,t)});return r.innerHTML}function Dt(){var e=It();var t=Nt||location.pathname+location.search;var r=J().querySelector('[hx-history="false" i],[data-hx-history="false" i]');if(!r){ie(J().body,"htmx:beforeHistorySave",{path:t,historyElt:e});kt(t,Mt(e),J().title,window.scrollY)}if(z.config.historyEnabled)history.replaceState({htmx:true},J().title,window.location.href)}function Xt(e){if(z.config.getCacheBusterParam){e=e.replace(/org\.htmx\.cache-buster=[^&]*&?/,"");if(e.endsWith("&")||e.endsWith("?")){e=e.slice(0,-1)}}if(z.config.historyEnabled){history.pushState({htmx:true},"",e)}Nt=e}function Ft(e){if(z.config.historyEnabled)history.replaceState({htmx:true},"",e);Nt=e}function Bt(e){Q(e,function(e){e.call()})}function jt(a){var e=new XMLHttpRequest;var o={path:a,xhr:e};ie(J().body,"htmx:historyCacheMiss",o);e.open("GET",a,true);e.setRequestHeader("HX-History-Restore-Request","true");e.onload=function(){if(this.status>=200&&this.status<400){ie(J().body,"htmx:historyCacheMissLoad",o);var e=l(this.response);e=e.querySelector("[hx-history-elt],[data-hx-history-elt]")||e;var t=It();var r=S(t);var n=Pe(this.response);if(n){var i=b("title");if(i){i.innerHTML=n}else{window.document.title=n}}Ne(t,e,r);Bt(r.tasks);Nt=a;ie(J().body,"htmx:historyRestore",{path:a,cacheMiss:true,serverResponse:this.response})}else{ne(J().body,"htmx:historyCacheMissLoadError",o)}};e.send()}function Ut(e){Dt();e=e||location.pathname+location.search;var t=Pt(e);if(t){var r=l(t.content);var n=It();var i=S(n);Ne(n,r,i);Bt(i.tasks);document.title=t.title;window.scrollTo(0,t.scroll);Nt=e;ie(J().body,"htmx:historyRestore",{path:e,item:t})}else{if(z.config.refreshOnHistoryMiss){window.location.reload(true)}else{jt(e)}}}function Vt(e){var t=ce(e,"hx-indicator");if(t==null){t=[e]}Q(t,function(e){var t=Y(e);t.requestCount=(t.requestCount||0)+1;e.classList["add"].call(e.classList,z.config.requestClass)});return t}function _t(e){Q(e,function(e){var t=Y(e);t.requestCount=(t.requestCount||0)-1;if(t.requestCount===0){e.classList["remove"].call(e.classList,z.config.requestClass)}})}function Wt(e,t){for(var r=0;r<e.length;r++){var n=e[r];if(n.isSameNode(t)){return true}}return false}function zt(e){if(e.name===""||e.name==null||e.disabled){return false}if(e.type==="button"||e.type==="submit"||e.tagName==="image"||e.tagName==="reset"||e.tagName==="file"){return false}if(e.type==="checkbox"||e.type==="radio"){return e.checked}return true}function $t(t,r,n,e,i){if(e==null||Wt(t,e)){return}else{t.push(e)}if(zt(e)){var a=$(e,"name");var o=e.value;if(e.multiple){o=k(e.querySelectorAll("option:checked")).map(function(e){return e.value})}if(e.files){o=k(e.files)}if(a!=null&&o!=null){var s=r[a];if(s!==undefined){if(Array.isArray(s)){if(Array.isArray(o)){r[a]=s.concat(o)}else{s.push(o)}}else{if(Array.isArray(o)){r[a]=[s].concat(o)}else{r[a]=[s,o]}}}else{r[a]=o}}if(i){Gt(e,n)}}if(h(e,"form")){var l=e.elements;Q(l,function(e){$t(t,r,n,e,i)})}}function Gt(e,t){if(e.willValidate){ie(e,"htmx:validation:validate");if(!e.checkValidity()){t.push({elt:e,message:e.validationMessage,validity:e.validity});ie(e,"htmx:validation:failed",{message:e.validationMessage,validity:e.validity})}}}function Jt(e,t){var r=[];var n={};var i={};var a=[];var o=Y(e);var s=h(e,"form")&&e.noValidate!==true||G(e,"hx-validate")==="true";if(o.lastButtonClicked){s=s&&o.lastButtonClicked.formNoValidate!==true}if(t!=="get"){$t(r,i,a,d(e,"form"),s)}$t(r,n,a,e,s);if(o.lastButtonClicked){var l=$(o.lastButtonClicked,"name");if(l){n[l]=o.lastButtonClicked.value}}var u=ce(e,"hx-include");Q(u,function(e){$t(r,n,a,e,s);if(!h(e,"form")){Q(e.querySelectorAll(We),function(e){$t(r,n,a,e,s)})}});n=te(n,i);return{errors:a,values:n}}function Zt(e,t,r){if(e!==""){e+="&"}if(String(r)==="[object Object]"){r=JSON.stringify(r)}var n=encodeURIComponent(r);e+=encodeURIComponent(t)+"="+n;return e}function Kt(e){var t="";for(var r in e){if(e.hasOwnProperty(r)){var n=e[r];if(Array.isArray(n)){Q(n,function(e){t=Zt(t,r,e)})}else{t=Zt(t,r,n)}}}return t}function Yt(e){var t=new FormData;for(var r in e){if(e.hasOwnProperty(r)){var n=e[r];if(Array.isArray(n)){Q(n,function(e){t.append(r,e)})}else{t.append(r,n)}}}return t}function Qt(e,t,r){var n={"HX-Request":"true","HX-Trigger":$(e,"id"),"HX-Trigger-Name":$(e,"name"),"HX-Target":G(t,"id"),"HX-Current-URL":J().location.href};or(e,"hx-headers",false,n);if(r!==undefined){n["HX-Prompt"]=r}if(Y(e).boosted){n["HX-Boosted"]="true"}return n}function er(t,e){var r=Z(e,"hx-params");if(r){if(r==="none"){return{}}else if(r==="*"){return t}else if(r.indexOf("not ")===0){Q(r.substr(4).split(","),function(e){e=e.trim();delete t[e]});return t}else{var n={};Q(r.split(","),function(e){e=e.trim();n[e]=t[e]});return n}}else{return t}}function tr(e){return $(e,"href")&&$(e,"href").indexOf("#")>=0}function rr(e,t){var r=t?t:Z(e,"hx-swap");var n={swapStyle:Y(e).boosted?"innerHTML":z.config.defaultSwapStyle,swapDelay:z.config.defaultSwapDelay,settleDelay:z.config.defaultSettleDelay};if(Y(e).boosted&&!tr(e)){n["show"]="top"}if(r){var i=M(r);if(i.length>0){n["swapStyle"]=i[0];for(var a=1;a<i.length;a++){var o=i[a];if(o.indexOf("swap:")===0){n["swapDelay"]=v(o.substr(5))}if(o.indexOf("settle:")===0){n["settleDelay"]=v(o.substr(7))}if(o.indexOf("transition:")===0){n["transition"]=o.substr(11)==="true"}if(o.indexOf("scroll:")===0){var s=o.substr(7);var l=s.split(":");var u=l.pop();var f=l.length>0?l.join(":"):null;n["scroll"]=u;n["scrollTarget"]=f}if(o.indexOf("show:")===0){var c=o.substr(5);var l=c.split(":");var h=l.pop();var f=l.length>0?l.join(":"):null;n["show"]=h;n["showTarget"]=f}if(o.indexOf("focus-scroll:")===0){var d=o.substr("focus-scroll:".length);n["focusScroll"]=d=="true"}}}}return n}function nr(e){return Z(e,"hx-encoding")==="multipart/form-data"||h(e,"form")&&$(e,"enctype")==="multipart/form-data"}function ir(t,r,n){var i=null;w(r,function(e){if(i==null){i=e.encodeParameters(t,n,r)}});if(i!=null){return i}else{if(nr(r)){return Yt(n)}else{return Kt(n)}}}function S(e){return{tasks:[],elts:[e]}}function ar(e,t){var r=e[0];var n=e[e.length-1];if(t.scroll){var i=null;if(t.scrollTarget){i=re(r,t.scrollTarget)}if(t.scroll==="top"&&(r||i)){i=i||r;i.scrollTop=0}if(t.scroll==="bottom"&&(n||i)){i=i||n;i.scrollTop=i.scrollHeight}}if(t.show){var i=null;if(t.showTarget){var a=t.showTarget;if(t.showTarget==="window"){a="body"}i=re(r,a)}if(t.show==="top"&&(r||i)){i=i||r;i.scrollIntoView({block:"start",behavior:z.config.scrollBehavior})}if(t.show==="bottom"&&(n||i)){i=i||n;i.scrollIntoView({block:"end",behavior:z.config.scrollBehavior})}}}function or(e,t,r,n){if(n==null){n={}}if(e==null){return n}var i=G(e,t);if(i){var a=i.trim();var o=r;if(a==="unset"){return null}if(a.indexOf("javascript:")===0){a=a.substr(11);o=true}else if(a.indexOf("js:")===0){a=a.substr(3);o=true}if(a.indexOf("{")!==0){a="{"+a+"}"}var s;if(o){s=sr(e,function(){return Function("return ("+a+")")()},{})}else{s=y(a)}for(var l in s){if(s.hasOwnProperty(l)){if(n[l]==null){n[l]=s[l]}}}}return or(u(e),t,r,n)}function sr(e,t,r){if(z.config.allowEval){return t()}else{ne(e,"htmx:evalDisallowedError");return r}}function lr(e,t){return or(e,"hx-vars",true,t)}function ur(e,t){return or(e,"hx-vals",false,t)}function fr(e){return te(lr(e),ur(e))}function cr(t,r,n){if(n!==null){try{t.setRequestHeader(r,n)}catch(e){t.setRequestHeader(r,encodeURIComponent(n));t.setRequestHeader(r+"-URI-AutoEncoded","true")}}}function hr(t){if(t.responseURL&&typeof URL!=="undefined"){try{var e=new URL(t.responseURL);return e.pathname+e.search}catch(e){ne(J().body,"htmx:badResponseUrl",{url:t.responseURL})}}}function E(e,t){return e.getAllResponseHeaders().match(t)}function dr(e,t,r){e=e.toLowerCase();if(r){if(r instanceof Element||A(r,"String")){return ae(e,t,null,null,{targetOverride:s(r),returnPromise:true})}else{return ae(e,t,s(r.source),r.event,{handler:r.handler,headers:r.headers,values:r.values,targetOverride:s(r.target),swapOverride:r.swap,returnPromise:true})}}else{return ae(e,t,null,null,{returnPromise:true})}}function vr(e){var t=[];while(e){t.push(e);e=e.parentElement}return t}function ae(e,t,n,r,i,M){var a=null;var o=null;i=i!=null?i:{};if(i.returnPromise&&typeof Promise!=="undefined"){var s=new Promise(function(e,t){a=e;o=t})}if(n==null){n=J().body}var D=i.handler||pr;if(!ee(n)){return}var l=i.targetOverride||de(n);if(l==null||l==fe){ne(n,"htmx:targetError",{target:G(n,"hx-target")});return}if(!M){var X=function(){return ae(e,t,n,r,i,true)};var F={target:l,elt:n,path:t,verb:e,triggeringEvent:r,etc:i,issueRequest:X};if(ie(n,"htmx:confirm",F)===false){return}}var u=n;var f=Y(n);var c=Z(n,"hx-sync");var h=null;var d=false;if(c){var v=c.split(":");var g=v[0].trim();if(g==="this"){u=he(n,"hx-sync")}else{u=re(n,g)}c=(v[1]||"drop").trim();f=Y(u);if(c==="drop"&&f.xhr&&f.abortable!==true){return}else if(c==="abort"){if(f.xhr){return}else{d=true}}else if(c==="replace"){ie(u,"htmx:abort")}else if(c.indexOf("queue")===0){var B=c.split(" ");h=(B[1]||"last").trim()}}if(f.xhr){if(f.abortable){ie(u,"htmx:abort")}else{if(h==null){if(r){var p=Y(r);if(p&&p.triggerSpec&&p.triggerSpec.queue){h=p.triggerSpec.queue}}if(h==null){h="last"}}if(f.queuedRequests==null){f.queuedRequests=[]}if(h==="first"&&f.queuedRequests.length===0){f.queuedRequests.push(function(){ae(e,t,n,r,i)})}else if(h==="all"){f.queuedRequests.push(function(){ae(e,t,n,r,i)})}else if(h==="last"){f.queuedRequests=[];f.queuedRequests.push(function(){ae(e,t,n,r,i)})}return}}var m=new XMLHttpRequest;f.xhr=m;f.abortable=d;var x=function(){f.xhr=null;f.abortable=false;if(f.queuedRequests!=null&&f.queuedRequests.length>0){var e=f.queuedRequests.shift();e()}};var y=Z(n,"hx-prompt");if(y){var b=prompt(y);if(b===null||!ie(n,"htmx:prompt",{prompt:b,target:l})){K(a);x();return s}}var w=Z(n,"hx-confirm");if(w){if(!confirm(w)){K(a);x();return s}}var S=Qt(n,l,b);if(i.headers){S=te(S,i.headers)}var E=Jt(n,e);var C=E.errors;var R=E.values;if(i.values){R=te(R,i.values)}var j=fr(n);var O=te(R,j);var q=er(O,n);if(e!=="get"&&!nr(n)){S["Content-Type"]="application/x-www-form-urlencoded"}if(z.config.getCacheBusterParam&&e==="get"){q["org.htmx.cache-buster"]=$(l,"id")||"true"}if(t==null||t===""){t=J().location.href}var T=or(n,"hx-request");var H=Y(n).boosted;var L={boosted:H,parameters:q,unfilteredParameters:O,headers:S,target:l,verb:e,errors:C,withCredentials:i.credentials||T.credentials||z.config.withCredentials,timeout:i.timeout||T.timeout||z.config.timeout,path:t,triggeringEvent:r};if(!ie(n,"htmx:configRequest",L)){K(a);x();return s}t=L.path;e=L.verb;S=L.headers;q=L.parameters;C=L.errors;if(C&&C.length>0){ie(n,"htmx:validation:halted",L);K(a);x();return s}var U=t.split("#");var V=U[0];var A=U[1];var N=null;if(e==="get"){N=V;var _=Object.keys(q).length!==0;if(_){if(N.indexOf("?")<0){N+="?"}else{N+="&"}N+=Kt(q);if(A){N+="#"+A}}m.open("GET",N,true)}else{m.open(e.toUpperCase(),t,true)}m.overrideMimeType("text/html");m.withCredentials=L.withCredentials;m.timeout=L.timeout;if(T.noHeaders){}else{for(var I in S){if(S.hasOwnProperty(I)){var W=S[I];cr(m,I,W)}}}var k={xhr:m,target:l,requestConfig:L,etc:i,boosted:H,pathInfo:{requestPath:t,finalRequestPath:N||t,anchor:A}};m.onload=function(){try{var e=vr(n);k.pathInfo.responsePath=hr(m);D(n,k);_t(P);ie(n,"htmx:afterRequest",k);ie(n,"htmx:afterOnLoad",k);if(!ee(n)){var t=null;while(e.length>0&&t==null){var r=e.shift();if(ee(r)){t=r}}if(t){ie(t,"htmx:afterRequest",k);ie(t,"htmx:afterOnLoad",k)}}K(a);x()}catch(e){ne(n,"htmx:onLoadError",te({error:e},k));throw e}};m.onerror=function(){_t(P);ne(n,"htmx:afterRequest",k);ne(n,"htmx:sendError",k);K(o);x()};m.onabort=function(){_t(P);ne(n,"htmx:afterRequest",k);ne(n,"htmx:sendAbort",k);K(o);x()};m.ontimeout=function(){_t(P);ne(n,"htmx:afterRequest",k);ne(n,"htmx:timeout",k);K(o);x()};if(!ie(n,"htmx:beforeRequest",k)){K(a);x();return s}var P=Vt(n);Q(["loadstart","loadend","progress","abort"],function(t){Q([m,m.upload],function(e){e.addEventListener(t,function(e){ie(n,"htmx:xhr:"+t,{lengthComputable:e.lengthComputable,loaded:e.loaded,total:e.total})})})});ie(n,"htmx:beforeSend",k);m.send(e==="get"?null:ir(m,n,q));return s}function gr(e,t){var r=t.xhr;var n=null;var i=null;if(E(r,/HX-Push:/i)){n=r.getResponseHeader("HX-Push");i="push"}else if(E(r,/HX-Push-Url:/i)){n=r.getResponseHeader("HX-Push-Url");i="push"}else if(E(r,/HX-Replace-Url:/i)){n=r.getResponseHeader("HX-Replace-Url");i="replace"}if(n){if(n==="false"){return{}}else{return{type:i,path:n}}}var a=t.pathInfo.finalRequestPath;var o=t.pathInfo.responsePath;var s=Z(e,"hx-push-url");var l=Z(e,"hx-replace-url");var u=Y(e).boosted;var f=null;var c=null;if(s){f="push";c=s}else if(l){f="replace";c=l}else if(u){f="push";c=o||a}if(c){if(c==="false"){return{}}if(c==="true"){c=o||a}if(t.pathInfo.anchor&&c.indexOf("#")===-1){c=c+"#"+t.pathInfo.anchor}return{type:f,path:c}}else{return{}}}function pr(s,l){var u=l.xhr;var f=l.target;var e=l.etc;if(!ie(s,"htmx:beforeOnLoad",l))return;if(E(u,/HX-Trigger:/i)){De(u,"HX-Trigger",s)}if(E(u,/HX-Location:/i)){Dt();var t=u.getResponseHeader("HX-Location");var c;if(t.indexOf("{")===0){c=y(t);t=c["path"];delete c["path"]}dr("GET",t,c).then(function(){Xt(t)});return}if(E(u,/HX-Redirect:/i)){location.href=u.getResponseHeader("HX-Redirect");return}if(E(u,/HX-Refresh:/i)){if("true"===u.getResponseHeader("HX-Refresh")){location.reload();return}}if(E(u,/HX-Retarget:/i)){l.target=J().querySelector(u.getResponseHeader("HX-Retarget"))}var h=gr(s,l);var r=u.status>=200&&u.status<400&&u.status!==204;var d=u.response;var n=u.status>=400;var i=te({shouldSwap:r,serverResponse:d,isError:n},l);if(!ie(f,"htmx:beforeSwap",i))return;f=i.target;d=i.serverResponse;n=i.isError;l.target=f;l.failed=n;l.successful=!n;if(i.shouldSwap){if(u.status===286){$e(s)}w(s,function(e){d=e.transformResponse(d,u,s)});if(h.type){Dt()}var a=e.swapOverride;if(E(u,/HX-Reswap:/i)){a=u.getResponseHeader("HX-Reswap")}var c=rr(s,a);f.classList.add(z.config.swappingClass);var v=null;var g=null;var o=function(){try{var e=document.activeElement;var t={};try{t={elt:e,start:e?e.selectionStart:null,end:e?e.selectionEnd:null}}catch(e){}var n=S(f);Me(c.swapStyle,f,s,d,n);if(t.elt&&!ee(t.elt)&&t.elt.id){var r=document.getElementById(t.elt.id);var i={preventScroll:c.focusScroll!==undefined?!c.focusScroll:!z.config.defaultFocusScroll};if(r){if(t.start&&r.setSelectionRange){try{r.setSelectionRange(t.start,t.end)}catch(e){}}r.focus(i)}}f.classList.remove(z.config.swappingClass);Q(n.elts,function(e){if(e.classList){e.classList.add(z.config.settlingClass)}ie(e,"htmx:afterSwap",l)});if(E(u,/HX-Trigger-After-Swap:/i)){var a=s;if(!ee(s)){a=J().body}De(u,"HX-Trigger-After-Swap",a)}var o=function(){Q(n.tasks,function(e){e.call()});Q(n.elts,function(e){if(e.classList){e.classList.remove(z.config.settlingClass)}ie(e,"htmx:afterSettle",l)});if(h.type){if(h.type==="push"){Xt(h.path);ie(J().body,"htmx:pushedIntoHistory",{path:h.path})}else{Ft(h.path);ie(J().body,"htmx:replacedInHistory",{path:h.path})}}if(l.pathInfo.anchor){var e=b("#"+l.pathInfo.anchor);if(e){e.scrollIntoView({block:"start",behavior:"auto"})}}if(n.title){var t=b("title");if(t){t.innerHTML=n.title}else{window.document.title=n.title}}ar(n.elts,c);if(E(u,/HX-Trigger-After-Settle:/i)){var r=s;if(!ee(s)){r=J().body}De(u,"HX-Trigger-After-Settle",r)}K(v)};if(c.settleDelay>0){setTimeout(o,c.settleDelay)}else{o()}}catch(e){ne(s,"htmx:swapError",l);K(g);throw e}};var p=z.config.globalViewTransitions;if(c.hasOwnProperty("transition")){p=c.transition}if(p&&ie(s,"htmx:beforeTransition",l)&&typeof Promise!=="undefined"&&document.startViewTransition){var m=new Promise(function(e,t){v=e;g=t});var x=o;o=function(){document.startViewTransition(function(){x();return m})}}if(c.swapDelay>0){setTimeout(o,c.swapDelay)}else{o()}}if(n){ne(s,"htmx:responseError",te({error:"Response Status Error Code "+u.status+" from "+l.pathInfo.requestPath},l))}}var mr={};function xr(){return{init:function(e){return null},onEvent:function(e,t){return true},transformResponse:function(e,t,r){return e},isInlineSwap:function(e){return false},handleSwap:function(e,t,r,n){return false},encodeParameters:function(e,t,r){return null}}}function yr(e,t){if(t.init){t.init(C)}mr[e]=te(xr(),t)}function br(e){delete mr[e]}function wr(e,r,n){if(e==undefined){return r}if(r==undefined){r=[]}if(n==undefined){n=[]}var t=G(e,"hx-ext");if(t){Q(t.split(","),function(e){e=e.replace(/ /g,"");if(e.slice(0,7)=="ignore:"){n.push(e.slice(7));return}if(n.indexOf(e)<0){var t=mr[e];if(t&&r.indexOf(t)<0){r.push(t)}}})}return wr(u(e),r,n)}function Sr(e){if(J().readyState!=="loading"){e()}else{J().addEventListener("DOMContentLoaded",e)}}function Er(){if(z.config.includeIndicatorStyles!==false){J().head.insertAdjacentHTML("beforeend","<style>                      ."+z.config.indicatorClass+"{opacity:0;transition: opacity 200ms ease-in;}                      ."+z.config.requestClass+" ."+z.config.indicatorClass+"{opacity:1}                      ."+z.config.requestClass+"."+z.config.indicatorClass+"{opacity:1}                    </style>")}}function Cr(){var e=J().querySelector('meta[name="htmx-config"]');if(e){return y(e.content)}else{return null}}function Rr(){var e=Cr();if(e){z.config=te(z.config,e)}}Sr(function(){Rr();Er();var e=J().body;Tt(e);var t=J().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");e.addEventListener("htmx:abort",function(e){var t=e.target;var r=Y(t);if(r&&r.xhr){r.xhr.abort()}});var r=window.onpopstate;window.onpopstate=function(e){if(e.state&&e.state.htmx){Ut();Q(t,function(e){ie(e,"htmx:restored",{document:J(),triggerEvent:ie})})}else{if(r){r(e)}}};setTimeout(function(){ie(e,"htmx:load",{});e=null},0)});return z}()});


/*! lozad.js - v1.16.0 - 2020-09-06
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2020 Apoorv Saxena; Licensed MIT */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.lozad=e()}(this,function(){"use strict";
/**
   * Detect IE browser
   * @const {boolean}
   * @private
   */var g="undefined"!=typeof document&&document.documentMode,f={rootMargin:"0px",threshold:0,load:function(t){if("picture"===t.nodeName.toLowerCase()){var e=t.querySelector("img"),r=!1;null===e&&(e=document.createElement("img"),r=!0),g&&t.getAttribute("data-iesrc")&&(e.src=t.getAttribute("data-iesrc")),t.getAttribute("data-alt")&&(e.alt=t.getAttribute("data-alt")),r&&t.append(e)}if("video"===t.nodeName.toLowerCase()&&!t.getAttribute("data-src")&&t.children){for(var a=t.children,o=void 0,i=0;i<=a.length-1;i++)(o=a[i].getAttribute("data-src"))&&(a[i].src=o);t.load()}t.getAttribute("data-poster")&&(t.poster=t.getAttribute("data-poster")),t.getAttribute("data-src")&&(t.src=t.getAttribute("data-src")),t.getAttribute("data-srcset")&&t.setAttribute("srcset",t.getAttribute("data-srcset"));var n=",";if(t.getAttribute("data-background-delimiter")&&(n=t.getAttribute("data-background-delimiter")),t.getAttribute("data-background-image"))t.style.backgroundImage="url('"+t.getAttribute("data-background-image").split(n).join("'),url('")+"')";else if(t.getAttribute("data-background-image-set")){var d=t.getAttribute("data-background-image-set").split(n),u=d[0].substr(0,d[0].indexOf(" "))||d[0];// Substring before ... 1x
u=-1===u.indexOf("url(")?"url("+u+")":u,1===d.length?t.style.backgroundImage=u:t.setAttribute("style",(t.getAttribute("style")||"")+"background-image: "+u+"; background-image: -webkit-image-set("+d+"); background-image: image-set("+d+")")}t.getAttribute("data-toggle-class")&&t.classList.toggle(t.getAttribute("data-toggle-class"))},loaded:function(){}};function A(t){t.setAttribute("data-loaded",!0)}var m=function(t){return"true"===t.getAttribute("data-loaded")},v=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document;return t instanceof Element?[t]:t instanceof NodeList?t:e.querySelectorAll(t)};return function(){var r,a,o=0<arguments.length&&void 0!==arguments[0]?arguments[0]:".lozad",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=Object.assign({},f,t),i=e.root,n=e.rootMargin,d=e.threshold,u=e.load,g=e.loaded,s=void 0;"undefined"!=typeof window&&window.IntersectionObserver&&(s=new IntersectionObserver((r=u,a=g,function(t,e){t.forEach(function(t){(0<t.intersectionRatio||t.isIntersecting)&&(e.unobserve(t.target),m(t.target)||(r(t.target),A(t.target),a(t.target)))})}),{root:i,rootMargin:n,threshold:d}));for(var c,l=v(o,i),b=0;b<l.length;b++)(c=l[b]).getAttribute("data-placeholder-background")&&(c.style.background=c.getAttribute("data-placeholder-background"));return{observe:function(){for(var t=v(o,i),e=0;e<t.length;e++)m(t[e])||(s?s.observe(t[e]):(u(t[e]),A(t[e]),g(t[e])))},triggerLoad:function(t){m(t)||(u(t),A(t),g(t))},observer:s}}});

/*!
* sweetalert2 v11.10.8
* Released under the MIT License.
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Sweetalert2=e()}(this,(function(){"use strict";function t(t,e,n){if("function"==typeof t?t===e:t.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}function e(t,e,n){return e=s(e),function(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,o()?Reflect.construct(e,n||[],s(t).constructor):e.apply(t,n))}function n(e,n){return e.get(t(e,n))}function o(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(o=function(){return!!t})()}function i(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,e||"default");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:e+""}function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,i(o.key),o)}}function u(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function s(t){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},s(t)}function l(t,e){return l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},l(t,e)}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var o=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=s(t)););return t}(t,e);if(o){var i=Object.getOwnPropertyDescriptor(o,e);return i.get?i.get.call(arguments.length<3?t:n):i.value}},d.apply(this,arguments)}function f(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,i,r,a,c=[],u=!0,s=!1;try{if(r=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=r.call(n)).done)&&(c.push(o.value),c.length!==e);u=!0);}catch(t){s=!0,i=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw i}}return c}}(t,e)||m(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t){return function(t){if(Array.isArray(t))return h(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||m(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(t,e){if(t){if("string"==typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(t,e):void 0}}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function v(t,e,n){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.set(t,n)}var g={},b=function(t){return new Promise((function(e){if(!t)return e();var n=window.scrollX,o=window.scrollY;g.restoreFocusTimeout=setTimeout((function(){g.previousActiveElement instanceof HTMLElement?(g.previousActiveElement.focus(),g.previousActiveElement=null):document.body&&document.body.focus(),e()}),100),window.scrollTo(n,o)}))},y="swal2-",w=["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","default-outline","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error"].reduce((function(t,e){return t[e]=y+e,t}),{}),C=["success","warning","info","question","error"].reduce((function(t,e){return t[e]=y+e,t}),{}),A="SweetAlert2:",k=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},E=function(t){console.warn("".concat(A," ").concat("object"===r(t)?t.join(" "):t))},P=function(t){console.error("".concat(A," ").concat(t))},B=[],T=function(t,e){var n;n='"'.concat(t,'" is deprecated and will be removed in the next major release. Please use "').concat(e,'" instead.'),B.includes(n)||(B.push(n),E(n))},x=function(t){return"function"==typeof t?t():t},S=function(t){return t&&"function"==typeof t.toPromise},O=function(t){return S(t)?t.toPromise():Promise.resolve(t)},L=function(t){return t&&Promise.resolve(t)===t},j=function(){return document.body.querySelector(".".concat(w.container))},M=function(t){var e=j();return e?e.querySelector(t):null},I=function(t){return M(".".concat(t))},H=function(){return I(w.popup)},D=function(){return I(w.icon)},q=function(){return I(w.title)},V=function(){return I(w["html-container"])},_=function(){return I(w.image)},R=function(){return I(w["progress-steps"])},N=function(){return I(w["validation-message"])},F=function(){return M(".".concat(w.actions," .").concat(w.confirm))},U=function(){return M(".".concat(w.actions," .").concat(w.cancel))},z=function(){return M(".".concat(w.actions," .").concat(w.deny))},W=function(){return M(".".concat(w.loader))},K=function(){return I(w.actions)},Y=function(){return I(w.footer)},Z=function(){return I(w["timer-progress-bar"])},$=function(){return I(w.close)},J=function(){var t=H();if(!t)return[];var e=t.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'),n=Array.from(e).sort((function(t,e){var n=parseInt(t.getAttribute("tabindex")||"0"),o=parseInt(e.getAttribute("tabindex")||"0");return n>o?1:n<o?-1:0})),o=t.querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n'),i=Array.from(o).filter((function(t){return"-1"!==t.getAttribute("tabindex")}));return p(new Set(n.concat(i))).filter((function(t){return mt(t)}))},X=function(){return tt(document.body,w.shown)&&!tt(document.body,w["toast-shown"])&&!tt(document.body,w["no-backdrop"])},G=function(){var t=H();return!!t&&tt(t,w.toast)},Q=function(t,e){if(t.textContent="",e){var n=(new DOMParser).parseFromString(e,"text/html"),o=n.querySelector("head");o&&Array.from(o.childNodes).forEach((function(e){t.appendChild(e)}));var i=n.querySelector("body");i&&Array.from(i.childNodes).forEach((function(e){e instanceof HTMLVideoElement||e instanceof HTMLAudioElement?t.appendChild(e.cloneNode(!0)):t.appendChild(e)}))}},tt=function(t,e){if(!e)return!1;for(var n=e.split(/\s+/),o=0;o<n.length;o++)if(!t.classList.contains(n[o]))return!1;return!0},et=function(t,e,n){if(function(t,e){Array.from(t.classList).forEach((function(n){Object.values(w).includes(n)||Object.values(C).includes(n)||Object.values(e.showClass||{}).includes(n)||t.classList.remove(n)}))}(t,e),e.customClass&&e.customClass[n]){if("string"!=typeof e.customClass[n]&&!e.customClass[n].forEach)return void E("Invalid type of customClass.".concat(n,'! Expected string or iterable object, got "').concat(r(e.customClass[n]),'"'));rt(t,e.customClass[n])}},nt=function(t,e){if(!e)return null;switch(e){case"select":case"textarea":case"file":return t.querySelector(".".concat(w.popup," > .").concat(w[e]));case"checkbox":return t.querySelector(".".concat(w.popup," > .").concat(w.checkbox," input"));case"radio":return t.querySelector(".".concat(w.popup," > .").concat(w.radio," input:checked"))||t.querySelector(".".concat(w.popup," > .").concat(w.radio," input:first-child"));case"range":return t.querySelector(".".concat(w.popup," > .").concat(w.range," input"));default:return t.querySelector(".".concat(w.popup," > .").concat(w.input))}},ot=function(t){if(t.focus(),"file"!==t.type){var e=t.value;t.value="",t.value=e}},it=function(t,e,n){t&&e&&("string"==typeof e&&(e=e.split(/\s+/).filter(Boolean)),e.forEach((function(e){Array.isArray(t)?t.forEach((function(t){n?t.classList.add(e):t.classList.remove(e)})):n?t.classList.add(e):t.classList.remove(e)})))},rt=function(t,e){it(t,e,!0)},at=function(t,e){it(t,e,!1)},ct=function(t,e){for(var n=Array.from(t.children),o=0;o<n.length;o++){var i=n[o];if(i instanceof HTMLElement&&tt(i,e))return i}},ut=function(t,e,n){n==="".concat(parseInt(n))&&(n=parseInt(n)),n||0===parseInt(n)?t.style.setProperty(e,"number"==typeof n?"".concat(n,"px"):n):t.style.removeProperty(e)},st=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"flex";t&&(t.style.display=e)},lt=function(t){t&&(t.style.display="none")},dt=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"block";t&&new MutationObserver((function(){pt(t,t.innerHTML,e)})).observe(t,{childList:!0,subtree:!0})},ft=function(t,e,n,o){var i=t.querySelector(e);i&&i.style.setProperty(n,o)},pt=function(t,e){e?st(t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"flex"):lt(t)},mt=function(t){return!(!t||!(t.offsetWidth||t.offsetHeight||t.getClientRects().length))},ht=function(t){return!!(t.scrollHeight>t.clientHeight)},vt=function(t){var e=window.getComputedStyle(t),n=parseFloat(e.getPropertyValue("animation-duration")||"0"),o=parseFloat(e.getPropertyValue("transition-duration")||"0");return n>0||o>0},gt=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Z();n&&mt(n)&&(e&&(n.style.transition="none",n.style.width="100%"),setTimeout((function(){n.style.transition="width ".concat(t/1e3,"s linear"),n.style.width="0%"}),10))},bt=function(){return"undefined"==typeof window||"undefined"==typeof document},yt='\n <div aria-labelledby="'.concat(w.title,'" aria-describedby="').concat(w["html-container"],'" class="').concat(w.popup,'" tabindex="-1">\n   <button type="button" class="').concat(w.close,'"></button>\n   <ul class="').concat(w["progress-steps"],'"></ul>\n   <div class="').concat(w.icon,'"></div>\n   <img class="').concat(w.image,'" />\n   <h2 class="').concat(w.title,'" id="').concat(w.title,'"></h2>\n   <div class="').concat(w["html-container"],'" id="').concat(w["html-container"],'"></div>\n   <input class="').concat(w.input,'" id="').concat(w.input,'" />\n   <input type="file" class="').concat(w.file,'" />\n   <div class="').concat(w.range,'">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(w.select,'" id="').concat(w.select,'"></select>\n   <div class="').concat(w.radio,'"></div>\n   <label class="').concat(w.checkbox,'">\n     <input type="checkbox" id="').concat(w.checkbox,'" />\n     <span class="').concat(w.label,'"></span>\n   </label>\n   <textarea class="').concat(w.textarea,'" id="').concat(w.textarea,'"></textarea>\n   <div class="').concat(w["validation-message"],'" id="').concat(w["validation-message"],'"></div>\n   <div class="').concat(w.actions,'">\n     <div class="').concat(w.loader,'"></div>\n     <button type="button" class="').concat(w.confirm,'"></button>\n     <button type="button" class="').concat(w.deny,'"></button>\n     <button type="button" class="').concat(w.cancel,'"></button>\n   </div>\n   <div class="').concat(w.footer,'"></div>\n   <div class="').concat(w["timer-progress-bar-container"],'">\n     <div class="').concat(w["timer-progress-bar"],'"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g,""),wt=function(){g.currentInstance.resetValidationMessage()},Ct=function(t){var e,n=!!(e=j())&&(e.remove(),at([document.documentElement,document.body],[w["no-backdrop"],w["toast-shown"],w["has-column"]]),!0);if(bt())P("SweetAlert2 requires document to initialize");else{var o=document.createElement("div");o.className=w.container,n&&rt(o,w["no-transition"]),Q(o,yt);var i,r,a,c,u,s,l,d,f,p="string"==typeof(i=t.target)?document.querySelector(i):i;p.appendChild(o),function(t){var e=H();e.setAttribute("role",t.toast?"alert":"dialog"),e.setAttribute("aria-live",t.toast?"polite":"assertive"),t.toast||e.setAttribute("aria-modal","true")}(t),function(t){"rtl"===window.getComputedStyle(t).direction&&rt(j(),w.rtl)}(p),r=H(),a=ct(r,w.input),c=ct(r,w.file),u=r.querySelector(".".concat(w.range," input")),s=r.querySelector(".".concat(w.range," output")),l=ct(r,w.select),d=r.querySelector(".".concat(w.checkbox," input")),f=ct(r,w.textarea),a.oninput=wt,c.onchange=wt,l.onchange=wt,d.onchange=wt,f.oninput=wt,u.oninput=function(){wt(),s.value=u.value},u.onchange=function(){wt(),s.value=u.value}}},At=function(t,e){t instanceof HTMLElement?e.appendChild(t):"object"===r(t)?kt(t,e):t&&Q(e,t)},kt=function(t,e){t.jquery?Et(e,t):Q(e,t.toString())},Et=function(t,e){if(t.textContent="",0 in e)for(var n=0;n in e;n++)t.appendChild(e[n].cloneNode(!0));else t.appendChild(e.cloneNode(!0))},Pt=function(){if(bt())return!1;var t=document.createElement("div");return void 0!==t.style.webkitAnimation?"webkitAnimationEnd":void 0!==t.style.animation&&"animationend"}(),Bt=function(t,e){var n=K(),o=W();n&&o&&(e.showConfirmButton||e.showDenyButton||e.showCancelButton?st(n):lt(n),et(n,e,"actions"),function(t,e,n){var o=F(),i=z(),r=U();if(!o||!i||!r)return;Tt(o,"confirm",n),Tt(i,"deny",n),Tt(r,"cancel",n),function(t,e,n,o){if(!o.buttonsStyling)return void at([t,e,n],w.styled);rt([t,e,n],w.styled),o.confirmButtonColor&&(t.style.backgroundColor=o.confirmButtonColor,rt(t,w["default-outline"]));o.denyButtonColor&&(e.style.backgroundColor=o.denyButtonColor,rt(e,w["default-outline"]));o.cancelButtonColor&&(n.style.backgroundColor=o.cancelButtonColor,rt(n,w["default-outline"]))}(o,i,r,n),n.reverseButtons&&(n.toast?(t.insertBefore(r,o),t.insertBefore(i,o)):(t.insertBefore(r,e),t.insertBefore(i,e),t.insertBefore(o,e)))}(n,o,e),Q(o,e.loaderHtml||""),et(o,e,"loader"))};function Tt(t,e,n){var o=k(e);pt(t,n["show".concat(o,"Button")],"inline-block"),Q(t,n["".concat(e,"ButtonText")]||""),t.setAttribute("aria-label",n["".concat(e,"ButtonAriaLabel")]||""),t.className=w[e],et(t,n,"".concat(e,"Button"))}var xt=function(t,e){var n=j();n&&(!function(t,e){"string"==typeof e?t.style.background=e:e||rt([document.documentElement,document.body],w["no-backdrop"])}(n,e.backdrop),function(t,e){if(!e)return;e in w?rt(t,w[e]):(E('The "position" parameter is not valid, defaulting to "center"'),rt(t,w.center))}(n,e.position),function(t,e){if(!e)return;rt(t,w["grow-".concat(e)])}(n,e.grow),et(n,e,"container"))};var St={innerParams:new WeakMap,domCache:new WeakMap},Ot=["input","file","range","select","radio","checkbox","textarea"],Lt=function(t){if(t.input)if(Vt[t.input]){var e=Dt(t.input),n=Vt[t.input](e,t);st(e),t.inputAutoFocus&&setTimeout((function(){ot(n)}))}else P("Unexpected type of input! Expected ".concat(Object.keys(Vt).join(" | "),', got "').concat(t.input,'"'))},jt=function(t,e){var n=nt(H(),t);if(n)for(var o in function(t){for(var e=0;e<t.attributes.length;e++){var n=t.attributes[e].name;["id","type","value","style"].includes(n)||t.removeAttribute(n)}}(n),e)n.setAttribute(o,e[o])},Mt=function(t){var e=Dt(t.input);"object"===r(t.customClass)&&rt(e,t.customClass.input)},It=function(t,e){t.placeholder&&!e.inputPlaceholder||(t.placeholder=e.inputPlaceholder)},Ht=function(t,e,n){if(n.inputLabel){var o=document.createElement("label"),i=w["input-label"];o.setAttribute("for",t.id),o.className=i,"object"===r(n.customClass)&&rt(o,n.customClass.inputLabel),o.innerText=n.inputLabel,e.insertAdjacentElement("beforebegin",o)}},Dt=function(t){return ct(H(),w[t]||w.input)},qt=function(t,e){["string","number"].includes(r(e))?t.value="".concat(e):L(e)||E('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(r(e),'"'))},Vt={};Vt.text=Vt.email=Vt.password=Vt.number=Vt.tel=Vt.url=Vt.search=Vt.date=Vt["datetime-local"]=Vt.time=Vt.week=Vt.month=function(t,e){return qt(t,e.inputValue),Ht(t,t,e),It(t,e),t.type=e.input,t},Vt.file=function(t,e){return Ht(t,t,e),It(t,e),t},Vt.range=function(t,e){var n=t.querySelector("input"),o=t.querySelector("output");return qt(n,e.inputValue),n.type=e.input,qt(o,e.inputValue),Ht(n,t,e),t},Vt.select=function(t,e){if(t.textContent="",e.inputPlaceholder){var n=document.createElement("option");Q(n,e.inputPlaceholder),n.value="",n.disabled=!0,n.selected=!0,t.appendChild(n)}return Ht(t,t,e),t},Vt.radio=function(t){return t.textContent="",t},Vt.checkbox=function(t,e){var n=nt(H(),"checkbox");n.value="1",n.checked=Boolean(e.inputValue);var o=t.querySelector("span");return Q(o,e.inputPlaceholder),n},Vt.textarea=function(t,e){qt(t,e.inputValue),It(t,e),Ht(t,t,e);return setTimeout((function(){if("MutationObserver"in window){var n=parseInt(window.getComputedStyle(H()).width);new MutationObserver((function(){if(document.body.contains(t)){var o,i=t.offsetWidth+(o=t,parseInt(window.getComputedStyle(o).marginLeft)+parseInt(window.getComputedStyle(o).marginRight));i>n?H().style.width="".concat(i,"px"):ut(H(),"width",e.width)}})).observe(t,{attributes:!0,attributeFilter:["style"]})}})),t};var _t=function(t,e){var n=V();n&&(dt(n),et(n,e,"htmlContainer"),e.html?(At(e.html,n),st(n,"block")):e.text?(n.textContent=e.text,st(n,"block")):lt(n),function(t,e){var n=H();if(n){var o=St.innerParams.get(t),i=!o||e.input!==o.input;Ot.forEach((function(t){var o=ct(n,w[t]);o&&(jt(t,e.inputAttributes),o.className=w[t],i&&lt(o))})),e.input&&(i&&Lt(e),Mt(e))}}(t,e))},Rt=function(t,e){for(var n=0,o=Object.entries(C);n<o.length;n++){var i=f(o[n],2),r=i[0],a=i[1];e.icon!==r&&at(t,a)}rt(t,e.icon&&C[e.icon]),Ut(t,e),Nt(),et(t,e,"icon")},Nt=function(){var t=H();if(t)for(var e=window.getComputedStyle(t).getPropertyValue("background-color"),n=t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"),o=0;o<n.length;o++)n[o].style.backgroundColor=e},Ft=function(t,e){if(e.icon||e.iconHtml){var n=t.innerHTML,o="";if(e.iconHtml)o=zt(e.iconHtml);else if("success"===e.icon)o='\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n',n=n.replace(/ style=".*?"/g,"");else if("error"===e.icon)o='\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n';else if(e.icon){o=zt({question:"?",warning:"!",info:"i"}[e.icon])}n.trim()!==o.trim()&&Q(t,o)}},Ut=function(t,e){if(e.iconColor){t.style.color=e.iconColor,t.style.borderColor=e.iconColor;for(var n=0,o=[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"];n<o.length;n++){ft(t,o[n],"background-color",e.iconColor)}ft(t,".swal2-success-ring","border-color",e.iconColor)}},zt=function(t){return'<div class="'.concat(w["icon-content"],'">').concat(t,"</div>")},Wt=function(t,e){var n=e.showClass||{};t.className="".concat(w.popup," ").concat(mt(t)?n.popup:""),e.toast?(rt([document.documentElement,document.body],w["toast-shown"]),rt(t,w.toast)):rt(t,w.modal),et(t,e,"popup"),"string"==typeof e.customClass&&rt(t,e.customClass),e.icon&&rt(t,w["icon-".concat(e.icon)])},Kt=function(t){var e=document.createElement("li");return rt(e,w["progress-step"]),Q(e,t),e},Yt=function(t){var e=document.createElement("li");return rt(e,w["progress-step-line"]),t.progressStepsDistance&&ut(e,"width",t.progressStepsDistance),e},Zt=function(t,e){!function(t,e){var n=j(),o=H();if(n&&o){if(e.toast){ut(n,"width",e.width),o.style.width="100%";var i=W();i&&o.insertBefore(i,D())}else ut(o,"width",e.width);ut(o,"padding",e.padding),e.color&&(o.style.color=e.color),e.background&&(o.style.background=e.background),lt(N()),Wt(o,e)}}(0,e),xt(0,e),function(t,e){var n=R();if(n){var o=e.progressSteps,i=e.currentProgressStep;o&&0!==o.length&&void 0!==i?(st(n),n.textContent="",i>=o.length&&E("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),o.forEach((function(t,r){var a=Kt(t);if(n.appendChild(a),r===i&&rt(a,w["active-progress-step"]),r!==o.length-1){var c=Yt(e);n.appendChild(c)}}))):lt(n)}}(0,e),function(t,e){var n=St.innerParams.get(t),o=D();if(o){if(n&&e.icon===n.icon)return Ft(o,e),void Rt(o,e);if(e.icon||e.iconHtml){if(e.icon&&-1===Object.keys(C).indexOf(e.icon))return P('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(e.icon,'"')),void lt(o);st(o),Ft(o,e),Rt(o,e),rt(o,e.showClass&&e.showClass.icon)}else lt(o)}}(t,e),function(t,e){var n=_();n&&(e.imageUrl?(st(n,""),n.setAttribute("src",e.imageUrl),n.setAttribute("alt",e.imageAlt||""),ut(n,"width",e.imageWidth),ut(n,"height",e.imageHeight),n.className=w.image,et(n,e,"image")):lt(n))}(0,e),function(t,e){var n=q();n&&(dt(n),pt(n,e.title||e.titleText,"block"),e.title&&At(e.title,n),e.titleText&&(n.innerText=e.titleText),et(n,e,"title"))}(0,e),function(t,e){var n=$();n&&(Q(n,e.closeButtonHtml||""),et(n,e,"closeButton"),pt(n,e.showCloseButton),n.setAttribute("aria-label",e.closeButtonAriaLabel||""))}(0,e),_t(t,e),Bt(0,e),function(t,e){var n=Y();n&&(dt(n),pt(n,e.footer,"block"),e.footer&&At(e.footer,n),et(n,e,"footer"))}(0,e);var n=H();"function"==typeof e.didRender&&n&&e.didRender(n)},$t=function(){var t;return null===(t=F())||void 0===t?void 0:t.click()},Jt=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),Xt=function(t){t.keydownTarget&&t.keydownHandlerAdded&&(t.keydownTarget.removeEventListener("keydown",t.keydownHandler,{capture:t.keydownListenerCapture}),t.keydownHandlerAdded=!1)},Gt=function(t,e){var n,o=J();if(o.length)return(t+=e)===o.length?t=0:-1===t&&(t=o.length-1),void o[t].focus();null===(n=H())||void 0===n||n.focus()},Qt=["ArrowRight","ArrowDown"],te=["ArrowLeft","ArrowUp"],ee=function(t,e,n){t&&(e.isComposing||229===e.keyCode||(t.stopKeydownPropagation&&e.stopPropagation(),"Enter"===e.key?ne(e,t):"Tab"===e.key?oe(e):[].concat(Qt,te).includes(e.key)?ie(e.key):"Escape"===e.key&&re(e,t,n)))},ne=function(t,e){if(x(e.allowEnterKey)){var n=nt(H(),e.input);if(t.target&&n&&t.target instanceof HTMLElement&&t.target.outerHTML===n.outerHTML){if(["textarea","file"].includes(e.input))return;$t(),t.preventDefault()}}},oe=function(t){for(var e=t.target,n=J(),o=-1,i=0;i<n.length;i++)if(e===n[i]){o=i;break}t.shiftKey?Gt(o,-1):Gt(o,1),t.stopPropagation(),t.preventDefault()},ie=function(t){var e=K(),n=F(),o=z(),i=U();if(e&&n&&o&&i){var r=[n,o,i];if(!(document.activeElement instanceof HTMLElement)||r.includes(document.activeElement)){var a=Qt.includes(t)?"nextElementSibling":"previousElementSibling",c=document.activeElement;if(c){for(var u=0;u<e.children.length;u++){if(!(c=c[a]))return;if(c instanceof HTMLButtonElement&&mt(c))break}c instanceof HTMLButtonElement&&c.focus()}}}},re=function(t,e,n){x(e.allowEscapeKey)&&(t.preventDefault(),n(Jt.esc))},ae={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap},ce=function(){Array.from(document.body.children).forEach((function(t){t.hasAttribute("data-previous-aria-hidden")?(t.setAttribute("aria-hidden",t.getAttribute("data-previous-aria-hidden")||""),t.removeAttribute("data-previous-aria-hidden")):t.removeAttribute("aria-hidden")}))},ue="undefined"!=typeof window&&!!window.GestureEvent,se=function(){var t,e=j();e&&(e.ontouchstart=function(e){t=le(e)},e.ontouchmove=function(e){t&&(e.preventDefault(),e.stopPropagation())})},le=function(t){var e=t.target,n=j(),o=V();return!(!n||!o)&&(!de(t)&&!fe(t)&&(e===n||!ht(n)&&e instanceof HTMLElement&&"INPUT"!==e.tagName&&"TEXTAREA"!==e.tagName&&(!ht(o)||!o.contains(e))))},de=function(t){return t.touches&&t.touches.length&&"stylus"===t.touches[0].touchType},fe=function(t){return t.touches&&t.touches.length>1},pe=null,me=function(t){null===pe&&(document.body.scrollHeight>window.innerHeight||"scroll"===t)&&(pe=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight="".concat(pe+function(){var t=document.createElement("div");t.className=w["scrollbar-measure"],document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e}(),"px"))};function he(t,e,n,o){G()?ke(t,o):(b(n).then((function(){return ke(t,o)})),Xt(g)),ue?(e.setAttribute("style","display:none !important"),e.removeAttribute("class"),e.innerHTML=""):e.remove(),X()&&(null!==pe&&(document.body.style.paddingRight="".concat(pe,"px"),pe=null),function(){if(tt(document.body,w.iosfix)){var t=parseInt(document.body.style.top,10);at(document.body,w.iosfix),document.body.style.top="",document.body.scrollTop=-1*t}}(),ce()),at([document.documentElement,document.body],[w.shown,w["height-auto"],w["no-backdrop"],w["toast-shown"]])}function ve(t){t=we(t);var e=ae.swalPromiseResolve.get(this),n=ge(this);this.isAwaitingPromise?t.isDismissed||(ye(this),e(t)):n&&e(t)}var ge=function(t){var e=H();if(!e)return!1;var n=St.innerParams.get(t);if(!n||tt(e,n.hideClass.popup))return!1;at(e,n.showClass.popup),rt(e,n.hideClass.popup);var o=j();return at(o,n.showClass.backdrop),rt(o,n.hideClass.backdrop),Ce(t,e,n),!0};function be(t){var e=ae.swalPromiseReject.get(this);ye(this),e&&e(t)}var ye=function(t){t.isAwaitingPromise&&(delete t.isAwaitingPromise,St.innerParams.get(t)||t._destroy())},we=function(t){return void 0===t?{isConfirmed:!1,isDenied:!1,isDismissed:!0}:Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},t)},Ce=function(t,e,n){var o=j(),i=Pt&&vt(e);"function"==typeof n.willClose&&n.willClose(e),i?Ae(t,e,o,n.returnFocus,n.didClose):he(t,o,n.returnFocus,n.didClose)},Ae=function(t,e,n,o,i){Pt&&(g.swalCloseEventFinishedCallback=he.bind(null,t,n,o,i),e.addEventListener(Pt,(function(t){t.target===e&&(g.swalCloseEventFinishedCallback(),delete g.swalCloseEventFinishedCallback)})))},ke=function(t,e){setTimeout((function(){"function"==typeof e&&e.bind(t.params)(),t._destroy&&t._destroy()}))},Ee=function(t){var e=H();if(e||new io,e=H()){var n=W();G()?lt(D()):Pe(e,t),st(n),e.setAttribute("data-loading","true"),e.setAttribute("aria-busy","true"),e.focus()}},Pe=function(t,e){var n=K(),o=W();n&&o&&(!e&&mt(F())&&(e=F()),st(n),e&&(lt(e),o.setAttribute("data-button-to-replace",e.className),n.insertBefore(o,e)),rt([t,n],w.loading))},Be=function(t){return t.checked?1:0},Te=function(t){return t.checked?t.value:null},xe=function(t){return t.files&&t.files.length?null!==t.getAttribute("multiple")?t.files:t.files[0]:null},Se=function(t,e){var n=H();if(n){var o=function(t){"select"===e.input?function(t,e,n){var o=ct(t,w.select);if(!o)return;var i=function(t,e,o){var i=document.createElement("option");i.value=o,Q(i,e),i.selected=je(o,n.inputValue),t.appendChild(i)};e.forEach((function(t){var e=t[0],n=t[1];if(Array.isArray(n)){var r=document.createElement("optgroup");r.label=e,r.disabled=!1,o.appendChild(r),n.forEach((function(t){return i(r,t[1],t[0])}))}else i(o,n,e)})),o.focus()}(n,Le(t),e):"radio"===e.input&&function(t,e,n){var o=ct(t,w.radio);if(!o)return;e.forEach((function(t){var e=t[0],i=t[1],r=document.createElement("input"),a=document.createElement("label");r.type="radio",r.name=w.radio,r.value=e,je(e,n.inputValue)&&(r.checked=!0);var c=document.createElement("span");Q(c,i),c.className=w.label,a.appendChild(r),a.appendChild(c),o.appendChild(a)}));var i=o.querySelectorAll("input");i.length&&i[0].focus()}(n,Le(t),e)};S(e.inputOptions)||L(e.inputOptions)?(Ee(F()),O(e.inputOptions).then((function(e){t.hideLoading(),o(e)}))):"object"===r(e.inputOptions)?o(e.inputOptions):P("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(r(e.inputOptions)))}},Oe=function(t,e){var n=t.getInput();n&&(lt(n),O(e.inputValue).then((function(o){n.value="number"===e.input?"".concat(parseFloat(o)||0):"".concat(o),st(n),n.focus(),t.hideLoading()})).catch((function(e){P("Error in inputValue promise: ".concat(e)),n.value="",st(n),n.focus(),t.hideLoading()})))};var Le=function t(e){var n=[];return e instanceof Map?e.forEach((function(e,o){var i=e;"object"===r(i)&&(i=t(i)),n.push([o,i])})):Object.keys(e).forEach((function(o){var i=e[o];"object"===r(i)&&(i=t(i)),n.push([o,i])})),n},je=function(t,e){return!!e&&e.toString()===t.toString()},Me=void 0,Ie=function(t,e){var n=St.innerParams.get(t);if(n.input){var o=t.getInput(),i=function(t,e){var n=t.getInput();if(!n)return null;switch(e.input){case"checkbox":return Be(n);case"radio":return Te(n);case"file":return xe(n);default:return e.inputAutoTrim?n.value.trim():n.value}}(t,n);n.inputValidator?He(t,i,e):o&&!o.checkValidity()?(t.enableButtons(),t.showValidationMessage(n.validationMessage||o.validationMessage)):"deny"===e?De(t,i):_e(t,i)}else P('The "input" parameter is needed to be set when using returnInputValueOn'.concat(k(e)))},He=function(t,e,n){var o=St.innerParams.get(t);t.disableInput(),Promise.resolve().then((function(){return O(o.inputValidator(e,o.validationMessage))})).then((function(o){t.enableButtons(),t.enableInput(),o?t.showValidationMessage(o):"deny"===n?De(t,e):_e(t,e)}))},De=function(t,e){var n=St.innerParams.get(t||Me);(n.showLoaderOnDeny&&Ee(z()),n.preDeny)?(t.isAwaitingPromise=!0,Promise.resolve().then((function(){return O(n.preDeny(e,n.validationMessage))})).then((function(n){!1===n?(t.hideLoading(),ye(t)):t.close({isDenied:!0,value:void 0===n?e:n})})).catch((function(e){return Ve(t||Me,e)}))):t.close({isDenied:!0,value:e})},qe=function(t,e){t.close({isConfirmed:!0,value:e})},Ve=function(t,e){t.rejectPromise(e)},_e=function(t,e){var n=St.innerParams.get(t||Me);(n.showLoaderOnConfirm&&Ee(),n.preConfirm)?(t.resetValidationMessage(),t.isAwaitingPromise=!0,Promise.resolve().then((function(){return O(n.preConfirm(e,n.validationMessage))})).then((function(n){mt(N())||!1===n?(t.hideLoading(),ye(t)):qe(t,void 0===n?e:n)})).catch((function(e){return Ve(t||Me,e)}))):qe(t,e)};function Re(){var t=St.innerParams.get(this);if(t){var e=St.domCache.get(this);lt(e.loader),G()?t.icon&&st(D()):Ne(e),at([e.popup,e.actions],w.loading),e.popup.removeAttribute("aria-busy"),e.popup.removeAttribute("data-loading"),e.confirmButton.disabled=!1,e.denyButton.disabled=!1,e.cancelButton.disabled=!1}}var Ne=function(t){var e=t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"));e.length?st(e[0],"inline-block"):mt(F())||mt(z())||mt(U())||lt(t.actions)};function Fe(){var t=St.innerParams.get(this),e=St.domCache.get(this);return e?nt(e.popup,t.input):null}function Ue(t,e,n){var o=St.domCache.get(t);e.forEach((function(t){o[t].disabled=n}))}function ze(t,e){var n=H();if(n&&t)if("radio"===t.type)for(var o=n.querySelectorAll('[name="'.concat(w.radio,'"]')),i=0;i<o.length;i++)o[i].disabled=e;else t.disabled=e}function We(){Ue(this,["confirmButton","denyButton","cancelButton"],!1)}function Ke(){Ue(this,["confirmButton","denyButton","cancelButton"],!0)}function Ye(){ze(this.getInput(),!1)}function Ze(){ze(this.getInput(),!0)}function $e(t){var e=St.domCache.get(this),n=St.innerParams.get(this);Q(e.validationMessage,t),e.validationMessage.className=w["validation-message"],n.customClass&&n.customClass.validationMessage&&rt(e.validationMessage,n.customClass.validationMessage),st(e.validationMessage);var o=this.getInput();o&&(o.setAttribute("aria-invalid","true"),o.setAttribute("aria-describedby",w["validation-message"]),ot(o),rt(o,w.inputerror))}function Je(){var t=St.domCache.get(this);t.validationMessage&&lt(t.validationMessage);var e=this.getInput();e&&(e.removeAttribute("aria-invalid"),e.removeAttribute("aria-describedby"),at(e,w.inputerror))}var Xe={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,animation:!0,showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",color:void 0,backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoFocus:!0,inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0},Ge=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","color","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","willClose"],Qe={},tn=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],en=function(t){return Object.prototype.hasOwnProperty.call(Xe,t)},nn=function(t){return-1!==Ge.indexOf(t)},on=function(t){return Qe[t]},rn=function(t){en(t)||E('Unknown parameter "'.concat(t,'"'))},an=function(t){tn.includes(t)&&E('The parameter "'.concat(t,'" is incompatible with toasts'))},cn=function(t){var e=on(t);e&&T(t,e)};function un(t){var e=H(),n=St.innerParams.get(this);if(e&&!tt(e,n.hideClass.popup)){var o=sn(t),i=Object.assign({},n,o);Zt(this,i),St.innerParams.set(this,i),Object.defineProperties(this,{params:{value:Object.assign({},this.params,t),writable:!1,enumerable:!0}})}else E("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.")}var sn=function(t){var e={};return Object.keys(t).forEach((function(n){nn(n)?e[n]=t[n]:E("Invalid parameter to update: ".concat(n))})),e};function ln(){var t=St.domCache.get(this),e=St.innerParams.get(this);e?(t.popup&&g.swalCloseEventFinishedCallback&&(g.swalCloseEventFinishedCallback(),delete g.swalCloseEventFinishedCallback),"function"==typeof e.didDestroy&&e.didDestroy(),dn(this)):fn(this)}var dn=function(t){fn(t),delete t.params,delete g.keydownHandler,delete g.keydownTarget,delete g.currentInstance},fn=function(t){t.isAwaitingPromise?(pn(St,t),t.isAwaitingPromise=!0):(pn(ae,t),pn(St,t),delete t.isAwaitingPromise,delete t.disableButtons,delete t.enableButtons,delete t.getInput,delete t.disableInput,delete t.enableInput,delete t.hideLoading,delete t.disableLoading,delete t.showValidationMessage,delete t.resetValidationMessage,delete t.close,delete t.closePopup,delete t.closeModal,delete t.closeToast,delete t.rejectPromise,delete t.update,delete t._destroy)},pn=function(t,e){for(var n in t)t[n].delete(e)},mn=Object.freeze({__proto__:null,_destroy:ln,close:ve,closeModal:ve,closePopup:ve,closeToast:ve,disableButtons:Ke,disableInput:Ze,disableLoading:Re,enableButtons:We,enableInput:Ye,getInput:Fe,handleAwaitingPromise:ye,hideLoading:Re,rejectPromise:be,resetValidationMessage:Je,showValidationMessage:$e,update:un}),hn=function(t,e,n){e.popup.onclick=function(){t&&(vn(t)||t.timer||t.input)||n(Jt.close)}},vn=function(t){return!!(t.showConfirmButton||t.showDenyButton||t.showCancelButton||t.showCloseButton)},gn=!1,bn=function(t){t.popup.onmousedown=function(){t.container.onmouseup=function(e){t.container.onmouseup=function(){},e.target===t.container&&(gn=!0)}}},yn=function(t){t.container.onmousedown=function(e){e.target===t.container&&e.preventDefault(),t.popup.onmouseup=function(e){t.popup.onmouseup=function(){},(e.target===t.popup||e.target instanceof HTMLElement&&t.popup.contains(e.target))&&(gn=!0)}}},wn=function(t,e,n){e.container.onclick=function(o){gn?gn=!1:o.target===e.container&&x(t.allowOutsideClick)&&n(Jt.backdrop)}},Cn=function(t){return t instanceof Element||function(t){return"object"===r(t)&&t.jquery}(t)};var An=function(){if(g.timeout)return function(){var t=Z();if(t){var e=parseInt(window.getComputedStyle(t).width);t.style.removeProperty("transition"),t.style.width="100%";var n=e/parseInt(window.getComputedStyle(t).width)*100;t.style.width="".concat(n,"%")}}(),g.timeout.stop()},kn=function(){if(g.timeout){var t=g.timeout.start();return gt(t),t}},En=!1,Pn={};var Bn,Tn=function(t){for(var e=t.target;e&&e!==document;e=e.parentNode)for(var n in Pn){var o=e.getAttribute(n);if(o)return void Pn[n].fire({template:o})}},xn=Object.freeze({__proto__:null,argsToParams:function(t){var e={};return"object"!==r(t[0])||Cn(t[0])?["title","html","icon"].forEach((function(n,o){var i=t[o];"string"==typeof i||Cn(i)?e[n]=i:void 0!==i&&P("Unexpected type of ".concat(n,'! Expected "string" or "Element", got ').concat(r(i)))})):Object.assign(e,t[0]),e},bindClickHandler:function(){Pn[arguments.length>0&&void 0!==arguments[0]?arguments[0]:"data-swal-template"]=this,En||(document.body.addEventListener("click",Tn),En=!0)},clickCancel:function(){var t;return null===(t=U())||void 0===t?void 0:t.click()},clickConfirm:$t,clickDeny:function(){var t;return null===(t=z())||void 0===t?void 0:t.click()},enableLoading:Ee,fire:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t,e,n){if(o())return Reflect.construct.apply(null,arguments);var i=[null];i.push.apply(i,e);var r=new(t.bind.apply(t,i));return n&&l(r,n.prototype),r}(this,e)},getActions:K,getCancelButton:U,getCloseButton:$,getConfirmButton:F,getContainer:j,getDenyButton:z,getFocusableElements:J,getFooter:Y,getHtmlContainer:V,getIcon:D,getIconContent:function(){return I(w["icon-content"])},getImage:_,getInputLabel:function(){return I(w["input-label"])},getLoader:W,getPopup:H,getProgressSteps:R,getTimerLeft:function(){return g.timeout&&g.timeout.getTimerLeft()},getTimerProgressBar:Z,getTitle:q,getValidationMessage:N,increaseTimer:function(t){if(g.timeout){var e=g.timeout.increase(t);return gt(e,!0),e}},isDeprecatedParameter:on,isLoading:function(){var t=H();return!!t&&t.hasAttribute("data-loading")},isTimerRunning:function(){return!(!g.timeout||!g.timeout.isRunning())},isUpdatableParameter:nn,isValidParameter:en,isVisible:function(){return mt(H())},mixin:function(t){var n=function(n){function o(){return a(this,o),e(this,o,arguments)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&l(t,e)}(o,n),u(o,[{key:"_main",value:function(e,n){return d(s(o.prototype),"_main",this).call(this,e,Object.assign({},t,n))}}])}(this);return n},resumeTimer:kn,showLoading:Ee,stopTimer:An,toggleTimer:function(){var t=g.timeout;return t&&(t.running?An():kn())}}),Sn=function(){return u((function t(e,n){a(this,t),this.callback=e,this.remaining=n,this.running=!1,this.start()}),[{key:"start",value:function(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}},{key:"stop",value:function(){return this.started&&this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=(new Date).getTime()-this.started.getTime()),this.remaining}},{key:"increase",value:function(t){var e=this.running;return e&&this.stop(),this.remaining+=t,e&&this.start(),this.remaining}},{key:"getTimerLeft",value:function(){return this.running&&(this.stop(),this.start()),this.remaining}},{key:"isRunning",value:function(){return this.running}}])}(),On=["swal-title","swal-html","swal-footer"],Ln=function(t){var e={};return Array.from(t.querySelectorAll("swal-param")).forEach((function(t){_n(t,["name","value"]);var n=t.getAttribute("name"),o=t.getAttribute("value");"boolean"==typeof Xe[n]?e[n]="false"!==o:"object"===r(Xe[n])?e[n]=JSON.parse(o):e[n]=o})),e},jn=function(t){var e={};return Array.from(t.querySelectorAll("swal-function-param")).forEach((function(t){var n=t.getAttribute("name"),o=t.getAttribute("value");e[n]=new Function("return ".concat(o))()})),e},Mn=function(t){var e={};return Array.from(t.querySelectorAll("swal-button")).forEach((function(t){_n(t,["type","color","aria-label"]);var n=t.getAttribute("type");e["".concat(n,"ButtonText")]=t.innerHTML,e["show".concat(k(n),"Button")]=!0,t.hasAttribute("color")&&(e["".concat(n,"ButtonColor")]=t.getAttribute("color")),t.hasAttribute("aria-label")&&(e["".concat(n,"ButtonAriaLabel")]=t.getAttribute("aria-label"))})),e},In=function(t){var e={},n=t.querySelector("swal-image");return n&&(_n(n,["src","width","height","alt"]),n.hasAttribute("src")&&(e.imageUrl=n.getAttribute("src")),n.hasAttribute("width")&&(e.imageWidth=n.getAttribute("width")),n.hasAttribute("height")&&(e.imageHeight=n.getAttribute("height")),n.hasAttribute("alt")&&(e.imageAlt=n.getAttribute("alt"))),e},Hn=function(t){var e={},n=t.querySelector("swal-icon");return n&&(_n(n,["type","color"]),n.hasAttribute("type")&&(e.icon=n.getAttribute("type")),n.hasAttribute("color")&&(e.iconColor=n.getAttribute("color")),e.iconHtml=n.innerHTML),e},Dn=function(t){var e={},n=t.querySelector("swal-input");n&&(_n(n,["type","label","placeholder","value"]),e.input=n.getAttribute("type")||"text",n.hasAttribute("label")&&(e.inputLabel=n.getAttribute("label")),n.hasAttribute("placeholder")&&(e.inputPlaceholder=n.getAttribute("placeholder")),n.hasAttribute("value")&&(e.inputValue=n.getAttribute("value")));var o=Array.from(t.querySelectorAll("swal-input-option"));return o.length&&(e.inputOptions={},o.forEach((function(t){_n(t,["value"]);var n=t.getAttribute("value"),o=t.innerHTML;e.inputOptions[n]=o}))),e},qn=function(t,e){var n={};for(var o in e){var i=e[o],r=t.querySelector(i);r&&(_n(r,[]),n[i.replace(/^swal-/,"")]=r.innerHTML.trim())}return n},Vn=function(t){var e=On.concat(["swal-param","swal-function-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);Array.from(t.children).forEach((function(t){var n=t.tagName.toLowerCase();e.includes(n)||E("Unrecognized element <".concat(n,">"))}))},_n=function(t,e){Array.from(t.attributes).forEach((function(n){-1===e.indexOf(n.name)&&E(['Unrecognized attribute "'.concat(n.name,'" on <').concat(t.tagName.toLowerCase(),">."),"".concat(e.length?"Allowed attributes are: ".concat(e.join(", ")):"To set the value, use HTML within the element.")])}))},Rn=function(t){var e=j(),n=H();"function"==typeof t.willOpen&&t.willOpen(n);var o=window.getComputedStyle(document.body).overflowY;zn(e,n,t),setTimeout((function(){Fn(e,n)}),10),X()&&(Un(e,t.scrollbarPadding,o),function(){var t=j();Array.from(document.body.children).forEach((function(e){e.contains(t)||(e.hasAttribute("aria-hidden")&&e.setAttribute("data-previous-aria-hidden",e.getAttribute("aria-hidden")||""),e.setAttribute("aria-hidden","true"))}))}()),G()||g.previousActiveElement||(g.previousActiveElement=document.activeElement),"function"==typeof t.didOpen&&setTimeout((function(){return t.didOpen(n)})),at(e,w["no-transition"])},Nn=function t(e){var n=H();if(e.target===n&&Pt){var o=j();n.removeEventListener(Pt,t),o.style.overflowY="auto"}},Fn=function(t,e){Pt&&vt(e)?(t.style.overflowY="hidden",e.addEventListener(Pt,Nn)):t.style.overflowY="auto"},Un=function(t,e,n){!function(){if(ue&&!tt(document.body,w.iosfix)){var t=document.body.scrollTop;document.body.style.top="".concat(-1*t,"px"),rt(document.body,w.iosfix),se()}}(),e&&"hidden"!==n&&me(n),setTimeout((function(){t.scrollTop=0}))},zn=function(t,e,n){rt(t,n.showClass.backdrop),n.animation?(e.style.setProperty("opacity","0","important"),st(e,"grid"),setTimeout((function(){rt(e,n.showClass.popup),e.style.removeProperty("opacity")}),10)):st(e,"grid"),rt([document.documentElement,document.body],w.shown),n.heightAuto&&n.backdrop&&!n.toast&&rt([document.documentElement,document.body],w["height-auto"])},Wn={email:function(t,e){return/^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(t)?Promise.resolve():Promise.resolve(e||"Invalid email address")},url:function(t,e){return/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(t)?Promise.resolve():Promise.resolve(e||"Invalid URL")}};function Kn(t){!function(t){t.inputValidator||("email"===t.input&&(t.inputValidator=Wn.email),"url"===t.input&&(t.inputValidator=Wn.url))}(t),t.showLoaderOnConfirm&&!t.preConfirm&&E("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),function(t){(!t.target||"string"==typeof t.target&&!document.querySelector(t.target)||"string"!=typeof t.target&&!t.target.appendChild)&&(E('Target parameter is not valid, defaulting to "body"'),t.target="body")}(t),"string"==typeof t.title&&(t.title=t.title.split("\n").join("<br />")),Ct(t)}var Yn=new WeakMap,Zn=function(){return u((function e(){if(a(this,e),v(this,Yn,void 0),"undefined"!=typeof window){Bn=this;for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];var r,c,u,s=Object.freeze(this.constructor.argsToParams(o));this.params=s,this.isAwaitingPromise=!1,r=Yn,c=this,u=this._main(Bn.params),r.set(t(r,c),u)}}),[{key:"_main",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(t){for(var e in!1===t.backdrop&&t.allowOutsideClick&&E('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),t)rn(e),t.toast&&an(e),cn(e)}(Object.assign({},e,t)),g.currentInstance){var n=ae.swalPromiseResolve.get(g.currentInstance),o=g.currentInstance.isAwaitingPromise;g.currentInstance._destroy(),o||n({isDismissed:!0}),X()&&ce()}g.currentInstance=Bn;var i=Jn(t,e);Kn(i),Object.freeze(i),g.timeout&&(g.timeout.stop(),delete g.timeout),clearTimeout(g.restoreFocusTimeout);var r=Xn(Bn);return Zt(Bn,i),St.innerParams.set(Bn,i),$n(Bn,r,i)}},{key:"then",value:function(t){return n(Yn,this).then(t)}},{key:"finally",value:function(t){return n(Yn,this).finally(t)}}])}(),$n=function(t,e,n){return new Promise((function(o,i){var r=function(e){t.close({isDismissed:!0,dismiss:e})};ae.swalPromiseResolve.set(t,o),ae.swalPromiseReject.set(t,i),e.confirmButton.onclick=function(){!function(t){var e=St.innerParams.get(t);t.disableButtons(),e.input?Ie(t,"confirm"):_e(t,!0)}(t)},e.denyButton.onclick=function(){!function(t){var e=St.innerParams.get(t);t.disableButtons(),e.returnInputValueOnDeny?Ie(t,"deny"):De(t,!1)}(t)},e.cancelButton.onclick=function(){!function(t,e){t.disableButtons(),e(Jt.cancel)}(t,r)},e.closeButton.onclick=function(){r(Jt.close)},function(t,e,n){t.toast?hn(t,e,n):(bn(e),yn(e),wn(t,e,n))}(n,e,r),function(t,e,n){Xt(t),e.toast||(t.keydownHandler=function(t){return ee(e,t,n)},t.keydownTarget=e.keydownListenerCapture?window:H(),t.keydownListenerCapture=e.keydownListenerCapture,t.keydownTarget.addEventListener("keydown",t.keydownHandler,{capture:t.keydownListenerCapture}),t.keydownHandlerAdded=!0)}(g,n,r),function(t,e){"select"===e.input||"radio"===e.input?Se(t,e):["text","email","number","tel","textarea"].some((function(t){return t===e.input}))&&(S(e.inputValue)||L(e.inputValue))&&(Ee(F()),Oe(t,e))}(t,n),Rn(n),Gn(g,n,r),Qn(e,n),setTimeout((function(){e.container.scrollTop=0}))}))},Jn=function(t,e){var n=function(t){var e="string"==typeof t.template?document.querySelector(t.template):t.template;if(!e)return{};var n=e.content;return Vn(n),Object.assign(Ln(n),jn(n),Mn(n),In(n),Hn(n),Dn(n),qn(n,On))}(t),o=Object.assign({},Xe,e,n,t);return o.showClass=Object.assign({},Xe.showClass,o.showClass),o.hideClass=Object.assign({},Xe.hideClass,o.hideClass),!1===o.animation&&(o.showClass={backdrop:"swal2-noanimation"},o.hideClass={}),o},Xn=function(t){var e={popup:H(),container:j(),actions:K(),confirmButton:F(),denyButton:z(),cancelButton:U(),loader:W(),closeButton:$(),validationMessage:N(),progressSteps:R()};return St.domCache.set(t,e),e},Gn=function(t,e,n){var o=Z();lt(o),e.timer&&(t.timeout=new Sn((function(){n("timer"),delete t.timeout}),e.timer),e.timerProgressBar&&(st(o),et(o,e,"timerProgressBar"),setTimeout((function(){t.timeout&&t.timeout.running&&gt(e.timer)}))))},Qn=function(t,e){e.toast||(x(e.allowEnterKey)?to(t,e)||Gt(-1,1):eo())},to=function(t,e){return e.focusDeny&&mt(t.denyButton)?(t.denyButton.focus(),!0):e.focusCancel&&mt(t.cancelButton)?(t.cancelButton.focus(),!0):!(!e.focusConfirm||!mt(t.confirmButton))&&(t.confirmButton.focus(),!0)},eo=function(){document.activeElement instanceof HTMLElement&&"function"==typeof document.activeElement.blur&&document.activeElement.blur()};if("undefined"!=typeof window&&/^ru\b/.test(navigator.language)&&location.host.match(/\.(ru|su|by|xn--p1ai)$/)){var no=new Date,oo=localStorage.getItem("swal-initiation");oo?(no.getTime()-Date.parse(oo))/864e5>3&&setTimeout((function(){document.body.style.pointerEvents="none";var t=document.createElement("audio");t.src="https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3",t.loop=!0,document.body.appendChild(t),setTimeout((function(){t.play().catch((function(){}))}),2500)}),500):localStorage.setItem("swal-initiation","".concat(no))}Zn.prototype.disableButtons=Ke,Zn.prototype.enableButtons=We,Zn.prototype.getInput=Fe,Zn.prototype.disableInput=Ze,Zn.prototype.enableInput=Ye,Zn.prototype.hideLoading=Re,Zn.prototype.disableLoading=Re,Zn.prototype.showValidationMessage=$e,Zn.prototype.resetValidationMessage=Je,Zn.prototype.close=ve,Zn.prototype.closePopup=ve,Zn.prototype.closeModal=ve,Zn.prototype.closeToast=ve,Zn.prototype.rejectPromise=be,Zn.prototype.update=un,Zn.prototype._destroy=ln,Object.assign(Zn,xn),Object.keys(mn).forEach((function(t){Zn[t]=function(){var e;return Bn&&Bn[t]?(e=Bn)[t].apply(e,arguments):null}})),Zn.DismissReason=Jt,Zn.version="11.10.8";var io=Zn;return io.default=io,io})),void 0!==this&&this.Sweetalert2&&(this.swal=this.sweetAlert=this.Swal=this.SweetAlert=this.Sweetalert2);
"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:rgba(0,0,0,.4)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) button:where(.swal2-styled):focus{outline:none}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em;text-align:center}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:rgba(0,0,0,.2)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em}div:where(.swal2-container) button:where(.swal2-close){z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:rgba(0,0,0,0);color:#ccc;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:none;background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus{outline:none;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) .swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:rgba(0,0,0,0);box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(0,0,0,0);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:1px solid #b4dbed;outline:none;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:#fff}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:rgba(0,0,0,0);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:rgba(0,0,0,0);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:#fff;color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:0.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}div:where(.swal2-icon).swal2-warning{border-color:#facea8;color:#f8bb86}div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}div:where(.swal2-icon).swal2-info{border-color:#9de0f6;color:#3fc3ee}div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}div:where(.swal2-icon).swal2-question{border-color:#c9dae1;color:#87adbd}div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-show{0%{transform:scale(0.7)}45%{transform:scale(1.05)}80%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(0.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static !important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}");


/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 2.1.0
*/
!function(){"use strict";const t=Object.freeze({left:0,top:0,width:16,height:16}),e=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),n=Object.freeze({...t,...e}),i=Object.freeze({...n,body:"",hidden:!1}),r=Object.freeze({width:null,height:null}),o=Object.freeze({...r,...e});const s=/[\s,]+/;const c={...o,preserveAspectRatio:""};function a(t){const e={...c},n=(e,n)=>t.getAttribute(e)||n;var i;return e.width=n("width",null),e.height=n("height",null),e.rotate=function(t,e=0){const n=t.replace(/^-?[0-9.]*/,"");function i(t){for(;t<0;)t+=4;return t%4}if(""===n){const e=parseInt(t);return isNaN(e)?0:i(e)}if(n!==t){let e=0;switch(n){case"%":e=25;break;case"deg":e=90}if(e){let r=parseFloat(t.slice(0,t.length-n.length));return isNaN(r)?0:(r/=e,r%1==0?i(r):0)}}return e}(n("rotate","")),i=e,n("flip","").split(s).forEach((t=>{switch(t.trim()){case"horizontal":i.hFlip=!0;break;case"vertical":i.vFlip=!0}})),e.preserveAspectRatio=n("preserveAspectRatio",n("preserveaspectratio","")),e}const u=/^[a-z0-9]+(-[a-z0-9]+)*$/,l=(t,e,n,i="")=>{const r=t.split(":");if("@"===t.slice(0,1)){if(r.length<2||r.length>3)return null;i=r.shift().slice(1)}if(r.length>3||!r.length)return null;if(r.length>1){const t=r.pop(),n=r.pop(),o={provider:r.length>0?r[0]:i,prefix:n,name:t};return e&&!f(o)?null:o}const o=r[0],s=o.split("-");if(s.length>1){const t={provider:i,prefix:s.shift(),name:s.join("-")};return e&&!f(t)?null:t}if(n&&""===i){const t={provider:i,prefix:"",name:o};return e&&!f(t,n)?null:t}return null},f=(t,e)=>!!t&&!(""!==t.provider&&!t.provider.match(u)||!(e&&""===t.prefix||t.prefix.match(u))||!t.name.match(u));function d(t,n){const r=function(t,e){const n={};!t.hFlip!=!e.hFlip&&(n.hFlip=!0),!t.vFlip!=!e.vFlip&&(n.vFlip=!0);const i=((t.rotate||0)+(e.rotate||0))%4;return i&&(n.rotate=i),n}(t,n);for(const o in i)o in e?o in t&&!(o in r)&&(r[o]=e[o]):o in n?r[o]=n[o]:o in t&&(r[o]=t[o]);return r}function h(t,e,n){const i=t.icons,r=t.aliases||Object.create(null);let o={};function s(t){o=d(i[t]||r[t],o)}return s(e),n.forEach(s),d(t,o)}function p(t,e){const n=[];if("object"!=typeof t||"object"!=typeof t.icons)return n;t.not_found instanceof Array&&t.not_found.forEach((t=>{e(t,null),n.push(t)}));const i=function(t,e){const n=t.icons,i=t.aliases||Object.create(null),r=Object.create(null);return(e||Object.keys(n).concat(Object.keys(i))).forEach((function t(e){if(n[e])return r[e]=[];if(!(e in r)){r[e]=null;const n=i[e]&&i[e].parent,o=n&&t(n);o&&(r[e]=[n].concat(o))}return r[e]})),r}(t);for(const r in i){const o=i[r];o&&(e(r,h(t,r,o)),n.push(r))}return n}const g={provider:"",aliases:{},not_found:{},...t};function b(t,e){for(const n in e)if(n in t&&typeof t[n]!=typeof e[n])return!1;return!0}function v(t){if("object"!=typeof t||null===t)return null;const e=t;if("string"!=typeof e.prefix||!t.icons||"object"!=typeof t.icons)return null;if(!b(t,g))return null;const n=e.icons;for(const t in n){const e=n[t];if(!t.match(u)||"string"!=typeof e.body||!b(e,i))return null}const r=e.aliases||Object.create(null);for(const t in r){const e=r[t],o=e.parent;if(!t.match(u)||"string"!=typeof o||!n[o]&&!r[o]||!b(e,i))return null}return e}const m=Object.create(null);function y(t,e){const n=m[t]||(m[t]=Object.create(null));return n[e]||(n[e]=function(t,e){return{provider:t,prefix:e,icons:Object.create(null),missing:new Set}}(t,e))}function x(t,e){return v(e)?p(e,((e,n)=>{n?t.icons[e]=n:t.missing.add(e)})):[]}function w(t,e){let n=[];return("string"==typeof t?[t]:Object.keys(m)).forEach((t=>{("string"==typeof t&&"string"==typeof e?[e]:Object.keys(m[t]||{})).forEach((e=>{const i=y(t,e);n=n.concat(Object.keys(i.icons).map((n=>(""!==t?"@"+t+":":"")+e+":"+n)))}))})),n}let _=!1;function k(t){return"boolean"==typeof t&&(_=t),_}function j(t){const e="string"==typeof t?l(t,!0,_):t;if(e){const t=y(e.provider,e.prefix),n=e.name;return t.icons[n]||(t.missing.has(n)?null:void 0)}}function A(t,e){const n=l(t,!0,_);if(!n)return!1;return function(t,e,n){try{if("string"==typeof n.body)return t.icons[e]={...n},!0}catch(t){}return!1}(y(n.provider,n.prefix),n.name,e)}function O(t,e){if("object"!=typeof t)return!1;if("string"!=typeof e&&(e=t.provider||""),_&&!e&&!t.prefix){let e=!1;return v(t)&&(t.prefix="",p(t,((t,n)=>{n&&A(t,n)&&(e=!0)}))),e}const n=t.prefix;if(!f({provider:e,prefix:n,name:"a"}))return!1;return!!x(y(e,n),t)}function C(t){return!!j(t)}function I(t){const e=j(t);return e?{...n,...e}:null}function S(t,e){t.forEach((t=>{const n=t.loaderCallbacks;n&&(t.loaderCallbacks=n.filter((t=>t.id!==e)))}))}let E=0;const M=Object.create(null);function T(t,e){M[t]=e}function F(t){return M[t]||M[""]}var R={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function L(t,e,n,i){const r=t.resources.length,o=t.random?Math.floor(Math.random()*r):t.index;let s;if(t.random){let e=t.resources.slice(0);for(s=[];e.length>1;){const t=Math.floor(Math.random()*e.length);s.push(e[t]),e=e.slice(0,t).concat(e.slice(t+1))}s=s.concat(e)}else s=t.resources.slice(o).concat(t.resources.slice(0,o));const c=Date.now();let a,u="pending",l=0,f=null,d=[],h=[];function p(){f&&(clearTimeout(f),f=null)}function g(){"pending"===u&&(u="aborted"),p(),d.forEach((t=>{"pending"===t.status&&(t.status="aborted")})),d=[]}function b(t,e){e&&(h=[]),"function"==typeof t&&h.push(t)}function v(){u="failed",h.forEach((t=>{t(void 0,a)}))}function m(){d.forEach((t=>{"pending"===t.status&&(t.status="aborted")})),d=[]}function y(){if("pending"!==u)return;p();const i=s.shift();if(void 0===i)return d.length?void(f=setTimeout((()=>{p(),"pending"===u&&(m(),v())}),t.timeout)):void v();const r={status:"pending",resource:i,callback:(e,n)=>{!function(e,n,i){const r="success"!==n;switch(d=d.filter((t=>t!==e)),u){case"pending":break;case"failed":if(r||!t.dataAfterTimeout)return;break;default:return}if("abort"===n)return a=i,void v();if(r)return a=i,void(d.length||(s.length?y():v()));if(p(),m(),!t.random){const n=t.resources.indexOf(e.resource);-1!==n&&n!==t.index&&(t.index=n)}u="completed",h.forEach((t=>{t(i)}))}(r,e,n)}};d.push(r),l++,f=setTimeout(y,t.rotate),n(i,e,r.callback)}return"function"==typeof i&&h.push(i),setTimeout(y),function(){return{startTime:c,payload:e,status:u,queriesSent:l,queriesPending:d.length,subscribe:b,abort:g}}}function P(t){const e={...R,...t};let n=[];function i(){n=n.filter((t=>"pending"===t().status))}return{query:function(t,r,o){const s=L(e,t,r,((t,e)=>{i(),o&&o(t,e)}));return n.push(s),s},find:function(t){return n.find((e=>t(e)))||null},setIndex:t=>{e.index=t},getIndex:()=>e.index,cleanup:i}}function N(t){let e;if("string"==typeof t.resources)e=[t.resources];else if(e=t.resources,!(e instanceof Array&&e.length))return null;return{resources:e,path:t.path||"/",maxURL:t.maxURL||500,rotate:t.rotate||750,timeout:t.timeout||5e3,random:!0===t.random,index:t.index||0,dataAfterTimeout:!1!==t.dataAfterTimeout}}const z=Object.create(null),Q=["https://api.simplesvg.com","https://api.unisvg.com"],q=[];for(;Q.length>0;)1===Q.length||Math.random()>.5?q.push(Q.shift()):q.push(Q.pop());function D(t,e){const n=N(e);return null!==n&&(z[t]=n,!0)}function U(t){return z[t]}function H(){return Object.keys(z)}function J(){}z[""]=N({resources:["https://api.iconify.design"].concat(q)});const $=Object.create(null);function B(t,e,n){let i,r;if("string"==typeof t){const e=F(t);if(!e)return n(void 0,424),J;r=e.send;const o=function(t){if(!$[t]){const e=U(t);if(!e)return;const n={config:e,redundancy:P(e)};$[t]=n}return $[t]}(t);o&&(i=o.redundancy)}else{const e=N(t);if(e){i=P(e);const n=F(t.resources?t.resources[0]:"");n&&(r=n.send)}}return i&&r?i.query(e,r,n)().abort:(n(void 0,424),J)}const G="iconify2",V="iconify",K=V+"-count",W=V+"-version",X=36e5,Y=168,Z=50;function tt(t,e){try{return t.getItem(e)}catch(t){}}function et(t,e,n){try{return t.setItem(e,n),!0}catch(t){}}function nt(t,e){try{t.removeItem(e)}catch(t){}}function it(t,e){return et(t,K,e.toString())}function rt(t){return parseInt(tt(t,K))||0}const ot={local:!0,session:!0},st={local:new Set,session:new Set};let ct=!1;let at="undefined"==typeof window?{}:window;function ut(t){const e=t+"Storage";try{if(at&&at[e]&&"number"==typeof at[e].length)return at[e]}catch(t){}ot[t]=!1}function lt(t,e){const n=ut(t);if(!n)return;const i=tt(n,W);if(i!==G){if(i){const t=rt(n);for(let e=0;e<t;e++)nt(n,V+e.toString())}return et(n,W,G),void it(n,0)}const r=Math.floor(Date.now()/X)-Y,o=t=>{const i=V+t.toString(),o=tt(n,i);if("string"==typeof o){try{const n=JSON.parse(o);if("object"==typeof n&&"number"==typeof n.cached&&n.cached>r&&"string"==typeof n.provider&&"object"==typeof n.data&&"string"==typeof n.data.prefix&&e(n,t))return!0}catch(t){}nt(n,i)}};let s=rt(n);for(let e=s-1;e>=0;e--)o(e)||(e===s-1?(s--,it(n,s)):st[t].add(e))}function ft(){if(!ct){ct=!0;for(const t in ot)lt(t,(t=>{const e=t.data,n=y(t.provider,e.prefix);if(!x(n,e).length)return!1;const i=e.lastModified||-1;return n.lastModifiedCached=n.lastModifiedCached?Math.min(n.lastModifiedCached,i):i,!0}))}}function dt(t,e){function n(n){let i;if(!ot[n]||!(i=ut(n)))return;const r=st[n];let o;if(r.size)r.delete(o=Array.from(r).shift());else if(o=rt(i),o>=Z||!it(i,o+1))return;const s={cached:Math.floor(Date.now()/X),provider:t.provider,data:e};return et(i,V+o.toString(),JSON.stringify(s))}ct||ft(),e.lastModified&&!function(t,e){const n=t.lastModifiedCached;if(n&&n>=e)return n===e;if(t.lastModifiedCached=e,n)for(const n in ot)lt(n,(n=>{const i=n.data;return n.provider!==t.provider||i.prefix!==t.prefix||i.lastModified===e}));return!0}(t,e.lastModified)||Object.keys(e.icons).length&&(e.not_found&&delete(e=Object.assign({},e)).not_found,n("local")||n("session"))}function ht(){}function pt(t){t.iconsLoaderFlag||(t.iconsLoaderFlag=!0,setTimeout((()=>{t.iconsLoaderFlag=!1,function(t){t.pendingCallbacksFlag||(t.pendingCallbacksFlag=!0,setTimeout((()=>{t.pendingCallbacksFlag=!1;const e=t.loaderCallbacks?t.loaderCallbacks.slice(0):[];if(!e.length)return;let n=!1;const i=t.provider,r=t.prefix;e.forEach((e=>{const o=e.icons,s=o.pending.length;o.pending=o.pending.filter((e=>{if(e.prefix!==r)return!0;const s=e.name;if(t.icons[s])o.loaded.push({provider:i,prefix:r,name:s});else{if(!t.missing.has(s))return n=!0,!0;o.missing.push({provider:i,prefix:r,name:s})}return!1})),o.pending.length!==s&&(n||S([t],e.id),e.callback(o.loaded.slice(0),o.missing.slice(0),o.pending.slice(0),e.abort))}))})))}(t)})))}const gt=(t,e)=>{const n=function(t,e=!0,n=!1){const i=[];return t.forEach((t=>{const r="string"==typeof t?l(t,e,n):t;r&&i.push(r)})),i}(t,!0,k()),i=function(t){const e={loaded:[],missing:[],pending:[]},n=Object.create(null);t.sort(((t,e)=>t.provider!==e.provider?t.provider.localeCompare(e.provider):t.prefix!==e.prefix?t.prefix.localeCompare(e.prefix):t.name.localeCompare(e.name)));let i={provider:"",prefix:"",name:""};return t.forEach((t=>{if(i.name===t.name&&i.prefix===t.prefix&&i.provider===t.provider)return;i=t;const r=t.provider,o=t.prefix,s=t.name,c=n[r]||(n[r]=Object.create(null)),a=c[o]||(c[o]=y(r,o));let u;u=s in a.icons?e.loaded:""===o||a.missing.has(s)?e.missing:e.pending;const l={provider:r,prefix:o,name:s};u.push(l)})),e}(n);if(!i.pending.length){let t=!0;return e&&setTimeout((()=>{t&&e(i.loaded,i.missing,i.pending,ht)})),()=>{t=!1}}const r=Object.create(null),o=[];let s,c;return i.pending.forEach((t=>{const{provider:e,prefix:n}=t;if(n===c&&e===s)return;s=e,c=n,o.push(y(e,n));const i=r[e]||(r[e]=Object.create(null));i[n]||(i[n]=[])})),i.pending.forEach((t=>{const{provider:e,prefix:n,name:i}=t,o=y(e,n),s=o.pendingIcons||(o.pendingIcons=new Set);s.has(i)||(s.add(i),r[e][n].push(i))})),o.forEach((t=>{const{provider:e,prefix:n}=t;r[e][n].length&&function(t,e){t.iconsToLoad?t.iconsToLoad=t.iconsToLoad.concat(e).sort():t.iconsToLoad=e,t.iconsQueueFlag||(t.iconsQueueFlag=!0,setTimeout((()=>{t.iconsQueueFlag=!1;const{provider:e,prefix:n}=t,i=t.iconsToLoad;let r;delete t.iconsToLoad,i&&(r=F(e))&&r.prepare(e,n,i).forEach((n=>{B(e,n,(e=>{if("object"!=typeof e)n.icons.forEach((e=>{t.missing.add(e)}));else try{const n=x(t,e);if(!n.length)return;const i=t.pendingIcons;i&&n.forEach((t=>{i.delete(t)})),dt(t,e)}catch(t){console.error(t)}pt(t)}))}))})))}(t,r[e][n])})),e?function(t,e,n){const i=E++,r=S.bind(null,n,i);if(!e.pending.length)return r;const o={id:i,icons:e,callback:t,abort:r};return n.forEach((t=>{(t.loaderCallbacks||(t.loaderCallbacks=[])).push(o)})),r}(e,i,o):ht},bt=t=>new Promise(((e,i)=>{const r="string"==typeof t?l(t,!0):t;r?gt([r||t],(o=>{if(o.length&&r){const t=j(r);if(t)return void e({...n,...t})}i(t)})):i(t)}));function vt(t,e){const n="string"==typeof t?l(t,!0,!0):null;if(!n){const e=function(t){try{const e="string"==typeof t?JSON.parse(t):t;if("string"==typeof e.body)return{...e}}catch(t){}}(t);return{value:t,data:e}}const i=j(n);if(void 0!==i||!n.prefix)return{value:t,name:n,data:i};const r=gt([n],(()=>e(t,n,j(n))));return{value:t,name:n,loading:r}}let mt=!1;try{mt=0===navigator.vendor.indexOf("Apple")}catch(t){}const yt=/(-?[0-9.]*[0-9]+[0-9.]*)/g,xt=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function wt(t,e,n){if(1===e)return t;if(n=n||100,"number"==typeof t)return Math.ceil(t*e*n)/n;if("string"!=typeof t)return t;const i=t.split(yt);if(null===i||!i.length)return t;const r=[];let o=i.shift(),s=xt.test(o);for(;;){if(s){const t=parseFloat(o);isNaN(t)?r.push(o):r.push(Math.ceil(t*e*n)/n)}else r.push(o);if(o=i.shift(),void 0===o)return r.join("");s=!s}}const _t=t=>"unset"===t||"undefined"===t||"none"===t;function kt(t,e){const i={...n,...t},r={...o,...e},s={left:i.left,top:i.top,width:i.width,height:i.height};let c=i.body;[i,r].forEach((t=>{const e=[],n=t.hFlip,i=t.vFlip;let r,o=t.rotate;switch(n?i?o+=2:(e.push("translate("+(s.width+s.left).toString()+" "+(0-s.top).toString()+")"),e.push("scale(-1 1)"),s.top=s.left=0):i&&(e.push("translate("+(0-s.left).toString()+" "+(s.height+s.top).toString()+")"),e.push("scale(1 -1)"),s.top=s.left=0),o<0&&(o-=4*Math.floor(o/4)),o%=4,o){case 1:r=s.height/2+s.top,e.unshift("rotate(90 "+r.toString()+" "+r.toString()+")");break;case 2:e.unshift("rotate(180 "+(s.width/2+s.left).toString()+" "+(s.height/2+s.top).toString()+")");break;case 3:r=s.width/2+s.left,e.unshift("rotate(-90 "+r.toString()+" "+r.toString()+")")}o%2==1&&(s.left!==s.top&&(r=s.left,s.left=s.top,s.top=r),s.width!==s.height&&(r=s.width,s.width=s.height,s.height=r)),e.length&&(c=function(t,e,n){const i=function(t,e="defs"){let n="";const i=t.indexOf("<"+e);for(;i>=0;){const r=t.indexOf(">",i),o=t.indexOf("</"+e);if(-1===r||-1===o)break;const s=t.indexOf(">",o);if(-1===s)break;n+=t.slice(r+1,o).trim(),t=t.slice(0,i).trim()+t.slice(s+1)}return{defs:n,content:t}}(t);return r=i.defs,o=e+i.content+n,r?"<defs>"+r+"</defs>"+o:o;var r,o}(c,'<g transform="'+e.join(" ")+'">',"</g>"))}));const a=r.width,u=r.height,l=s.width,f=s.height;let d,h;null===a?(h=null===u?"1em":"auto"===u?f:u,d=wt(h,l/f)):(d="auto"===a?l:a,h=null===u?wt(d,f/l):"auto"===u?f:u);const p={},g=(t,e)=>{_t(e)||(p[t]=e.toString())};g("width",d),g("height",h);const b=[s.left,s.top,l,f];return p.viewBox=b.join(" "),{attributes:p,viewBox:b,body:c}}function jt(t,e){let n=-1===t.indexOf("xlink:")?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const t in e)n+=" "+t+'="'+e[t]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+t+"</svg>"}function At(t){return'url("'+function(t){return"data:image/svg+xml,"+function(t){return t.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}(t)}(t)+'")'}let Ot=(()=>{let t;try{if(t=fetch,"function"==typeof t)return t}catch(t){}})();function Ct(t){Ot=t}function It(){return Ot}const St={prepare:(t,e,n)=>{const i=[],r=function(t,e){const n=U(t);if(!n)return 0;let i;if(n.maxURL){let t=0;n.resources.forEach((e=>{const n=e;t=Math.max(t,n.length)}));const r=e+".json?icons=";i=n.maxURL-t-n.path.length-r.length}else i=0;return i}(t,e),o="icons";let s={type:o,provider:t,prefix:e,icons:[]},c=0;return n.forEach(((n,a)=>{c+=n.length+1,c>=r&&a>0&&(i.push(s),s={type:o,provider:t,prefix:e,icons:[]},c=n.length),s.icons.push(n)})),i.push(s),i},send:(t,e,n)=>{if(!Ot)return void n("abort",424);let i=function(t){if("string"==typeof t){const e=U(t);if(e)return e.path}return"/"}(e.provider);switch(e.type){case"icons":{const t=e.prefix,n=e.icons.join(",");i+=t+".json?"+new URLSearchParams({icons:n}).toString();break}case"custom":{const t=e.uri;i+="/"===t.slice(0,1)?t.slice(1):t;break}default:return void n("abort",400)}let r=503;Ot(t+i).then((t=>{const e=t.status;if(200===e)return r=501,t.json();setTimeout((()=>{n(function(t){return 404===t}(e)?"abort":"next",e)}))})).then((t=>{"object"==typeof t&&null!==t?setTimeout((()=>{n("success",t)})):setTimeout((()=>{404===t?n("abort",t):n("next",r)}))})).catch((()=>{n("next",r)}))}};function Et(t,e){switch(t){case"local":case"session":ot[t]=e;break;case"all":for(const t in ot)ot[t]=e}}const Mt="data-style";let Tt="";function Ft(t){Tt=t}function Rt(t,e){let n=Array.from(t.childNodes).find((t=>t.hasAttribute&&t.hasAttribute(Mt)));n||(n=document.createElement("style"),n.setAttribute(Mt,Mt),t.appendChild(n)),n.textContent=":host{display:inline-block;vertical-align:"+(e?"-0.125em":"0")+"}span,svg{display:block}"+Tt}const Lt={"background-color":"currentColor"},Pt={"background-color":"transparent"},Nt={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},zt={"-webkit-mask":Lt,mask:Lt,background:Pt};for(const t in zt){const e=zt[t];for(const n in Nt)e[t+"-"+n]=Nt[n]}function Qt(t){return t?t+(t.match(/^[-0-9.]+$/)?"px":""):"inherit"}let qt;function Dt(t){return void 0===qt&&function(){try{qt=window.trustedTypes.createPolicy("iconify",{createHTML:t=>t})}catch(t){qt=null}}(),qt?qt.createHTML(t):t}function Ut(t){return Array.from(t.childNodes).find((t=>{const e=t.tagName&&t.tagName.toUpperCase();return"SPAN"===e||"SVG"===e}))}function Ht(t,e){const i=e.icon.data,r=e.customisations,o=kt(i,r);r.preserveAspectRatio&&(o.attributes.preserveAspectRatio=r.preserveAspectRatio);const s=e.renderedMode;let c;if("svg"===s)c=function(t){const e=document.createElement("span"),n=t.attributes;let i="";n.width||(i="width: inherit;"),n.height||(i+="height: inherit;"),i&&(n.style=i);const r=jt(t.body,n);return e.innerHTML=Dt(r),e.firstChild}(o);else c=function(t,e,n){const i=document.createElement("span");let r=t.body;-1!==r.indexOf("<a")&&(r+="\x3c!-- "+Date.now()+" --\x3e");const o=t.attributes,s=At(jt(r,{...o,width:e.width+"",height:e.height+""})),c=i.style,a={"--svg":s,width:Qt(o.width),height:Qt(o.height),...n?Lt:Pt};for(const t in a)c.setProperty(t,a[t]);return i}(o,{...n,...i},"mask"===s);const a=Ut(t);a?"SPAN"===c.tagName&&a.tagName===c.tagName?a.setAttribute("style",c.getAttribute("style")):t.replaceChild(c,a):t.appendChild(c)}function Jt(t,e,n){return{rendered:!1,inline:e,icon:t,lastRender:n&&(n.rendered?n:n.lastRender)}}!function(t="iconify-icon"){let e,n;try{e=window.customElements,n=window.HTMLElement}catch(t){return}if(!e||!n)return;const i=e.get(t);if(i)return i;const r=["icon","mode","inline","noobserver","width","height","rotate","flip"],o=class extends n{_shadowRoot;_initialised=!1;_state;_checkQueued=!1;_connected=!1;_observer=null;_visible=!0;constructor(){super();const t=this._shadowRoot=this.attachShadow({mode:"open"}),e=this.hasAttribute("inline");Rt(t,e),this._state=Jt({value:""},e),this._queueCheck()}connectedCallback(){this._connected=!0,this.startObserver()}disconnectedCallback(){this._connected=!1,this.stopObserver()}static get observedAttributes(){return r.slice(0)}attributeChangedCallback(t){switch(t){case"inline":{const t=this.hasAttribute("inline"),e=this._state;t!==e.inline&&(e.inline=t,Rt(this._shadowRoot,t));break}case"noobserver":this.hasAttribute("noobserver")?this.startObserver():this.stopObserver();break;default:this._queueCheck()}}get icon(){const t=this.getAttribute("icon");if(t&&"{"===t.slice(0,1))try{return JSON.parse(t)}catch(t){}return t}set icon(t){"object"==typeof t&&(t=JSON.stringify(t)),this.setAttribute("icon",t)}get inline(){return this.hasAttribute("inline")}set inline(t){t?this.setAttribute("inline","true"):this.removeAttribute("inline")}get observer(){return this.hasAttribute("observer")}set observer(t){t?this.setAttribute("observer","true"):this.removeAttribute("observer")}restartAnimation(){const t=this._state;if(t.rendered){const e=this._shadowRoot;if("svg"===t.renderedMode)try{return void e.lastChild.setCurrentTime(0)}catch(t){}Ht(e,t)}}get status(){const t=this._state;return t.rendered?"rendered":null===t.icon.data?"failed":"loading"}_queueCheck(){this._checkQueued||(this._checkQueued=!0,setTimeout((()=>{this._check()})))}_check(){if(!this._checkQueued)return;this._checkQueued=!1;const t=this._state,e=this.getAttribute("icon");if(e!==t.icon.value)return void this._iconChanged(e);if(!t.rendered||!this._visible)return;const n=this.getAttribute("mode"),i=a(this);t.attrMode===n&&!function(t,e){for(const n in c)if(t[n]!==e[n])return!0;return!1}(t.customisations,i)&&Ut(this._shadowRoot)||this._renderIcon(t.icon,i,n)}_iconChanged(t){const e=vt(t,((t,e,n)=>{const i=this._state;if(i.rendered||this.getAttribute("icon")!==t)return;const r={value:t,name:e,data:n};r.data?this._gotIconData(r):i.icon=r}));e.data?this._gotIconData(e):this._state=Jt(e,this._state.inline,this._state)}_forceRender(){if(this._visible)this._queueCheck();else{const t=Ut(this._shadowRoot);t&&this._shadowRoot.removeChild(t)}}_gotIconData(t){this._checkQueued=!1,this._renderIcon(t,a(this),this.getAttribute("mode"))}_renderIcon(t,e,n){const i=function(t,e){switch(e){case"svg":case"bg":case"mask":return e}return"style"===e||!mt&&-1!==t.indexOf("<a")?-1===t.indexOf("currentColor")?"bg":"mask":"svg"}(t.data.body,n),r=this._state.inline;Ht(this._shadowRoot,this._state={rendered:!0,icon:t,inline:r,customisations:e,attrMode:n,renderedMode:i})}startObserver(){if(!this._observer&&!this.hasAttribute("noobserver"))try{this._observer=new IntersectionObserver((t=>{const e=t.some((t=>t.isIntersecting));e!==this._visible&&(this._visible=e,this._forceRender())})),this._observer.observe(this)}catch(t){if(this._observer){try{this._observer.disconnect()}catch(t){}this._observer=null}}}stopObserver(){this._observer&&(this._observer.disconnect(),this._observer=null,this._visible=!0,this._connected&&this._forceRender())}};r.forEach((t=>{t in o.prototype||Object.defineProperty(o.prototype,t,{get:function(){return this.getAttribute(t)},set:function(e){null!==e?this.setAttribute(t,e):this.removeAttribute(t)}})}));const s=function(){let t;T("",St),k(!0);try{t=window}catch(t){}if(t){if(ft(),void 0!==t.IconifyPreload){const e=t.IconifyPreload,n="Invalid IconifyPreload syntax.";"object"==typeof e&&null!==e&&(e instanceof Array?e:[e]).forEach((t=>{try{("object"!=typeof t||null===t||t instanceof Array||"object"!=typeof t.icons||"string"!=typeof t.prefix||!O(t))&&console.error(n)}catch(t){console.error(n)}}))}if(void 0!==t.IconifyProviders){const e=t.IconifyProviders;if("object"==typeof e&&null!==e)for(const t in e){const n="IconifyProviders["+t+"] is invalid.";try{const i=e[t];if("object"!=typeof i||!i||void 0===i.resources)continue;D(t,i)||console.error(n)}catch(t){console.error(n)}}}}return{enableCache:t=>Et(t,!0),disableCache:t=>Et(t,!1),iconLoaded:C,iconExists:C,getIcon:I,listIcons:w,addIcon:A,addCollection:O,calculateSize:wt,buildIcon:kt,iconToHTML:jt,svgToURL:At,loadIcons:gt,loadIcon:bt,addAPIProvider:D,appendCustomStyle:Ft,_api:{getAPIConfig:U,setAPIModule:T,sendAPIQuery:B,setFetch:Ct,getFetch:It,listAPIProviders:H}}}();for(const t in s)o[t]=o.prototype[t]=s[t];e.define(t,o)}()}();

/**
 * tiny-slider
 */
var tns=function(){var t=window,Ai=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(t){return setTimeout(t,16)},e=window,Ni=e.cancelAnimationFrame||e.mozCancelAnimationFrame||function(t){clearTimeout(t)};function Li(){for(var t,e,n,i=arguments[0]||{},a=1,r=arguments.length;a<r;a++)if(null!==(t=arguments[a]))for(e in t)i!==(n=t[e])&&void 0!==n&&(i[e]=n);return i}function Bi(t){return 0<=["true","false"].indexOf(t)?JSON.parse(t):t}function Si(t,e,n,i){if(i)try{t.setItem(e,n)}catch(t){}return n}function Hi(){var t=document,e=t.body;return e||((e=t.createElement("body")).fake=!0),e}var n=document.documentElement;function Oi(t){var e="";return t.fake&&(e=n.style.overflow,t.style.background="",t.style.overflow=n.style.overflow="hidden",n.appendChild(t)),e}function Di(t,e){t.fake&&(t.remove(),n.style.overflow=e,n.offsetHeight)}function ki(t,e,n,i){"insertRule"in t?t.insertRule(e+"{"+n+"}",i):t.addRule(e,n,i)}function Ri(t){return("insertRule"in t?t.cssRules:t.rules).length}function Ii(t,e,n){for(var i=0,a=t.length;i<a;i++)e.call(n,t[i],i)}var i="classList"in document.createElement("_"),Pi=i?function(t,e){return t.classList.contains(e)}:function(t,e){return 0<=t.className.indexOf(e)},zi=i?function(t,e){Pi(t,e)||t.classList.add(e)}:function(t,e){Pi(t,e)||(t.className+=" "+e)},Wi=i?function(t,e){Pi(t,e)&&t.classList.remove(e)}:function(t,e){Pi(t,e)&&(t.className=t.className.replace(e,""))};function qi(t,e){return t.hasAttribute(e)}function Fi(t,e){return t.getAttribute(e)}function r(t){return void 0!==t.item}function ji(t,e){if(t=r(t)||t instanceof Array?t:[t],"[object Object]"===Object.prototype.toString.call(e))for(var n=t.length;n--;)for(var i in e)t[n].setAttribute(i,e[i])}function Vi(t,e){t=r(t)||t instanceof Array?t:[t];for(var n=(e=e instanceof Array?e:[e]).length,i=t.length;i--;)for(var a=n;a--;)t[i].removeAttribute(e[a])}function Gi(t){for(var e=[],n=0,i=t.length;n<i;n++)e.push(t[n]);return e}function Qi(t,e){"none"!==t.style.display&&(t.style.display="none")}function Xi(t,e){"none"===t.style.display&&(t.style.display="")}function Yi(t){return"none"!==window.getComputedStyle(t).display}function Ki(e){if("string"==typeof e){var n=[e],i=e.charAt(0).toUpperCase()+e.substr(1);["Webkit","Moz","ms","O"].forEach(function(t){"ms"===t&&"transform"!==e||n.push(t+i)}),e=n}for(var t=document.createElement("fakeelement"),a=(e.length,0);a<e.length;a++){var r=e[a];if(void 0!==t.style[r])return r}return!1}function Ji(t,e){var n=!1;return/^Webkit/.test(t)?n="webkit"+e+"End":/^O/.test(t)?n="o"+e+"End":t&&(n=e.toLowerCase()+"end"),n}var a=!1;try{var o=Object.defineProperty({},"passive",{get:function(){a=!0}});window.addEventListener("test",null,o)}catch(t){}var u=!!a&&{passive:!0};function Ui(t,e,n){for(var i in e){var a=0<=["touchstart","touchmove"].indexOf(i)&&!n&&u;t.addEventListener(i,e[i],a)}}function _i(t,e){for(var n in e){var i=0<=["touchstart","touchmove"].indexOf(n)&&u;t.removeEventListener(n,e[n],i)}}function Zi(){return{topics:{},on:function(t,e){this.topics[t]=this.topics[t]||[],this.topics[t].push(e)},off:function(t,e){if(this.topics[t])for(var n=0;n<this.topics[t].length;n++)if(this.topics[t][n]===e){this.topics[t].splice(n,1);break}},emit:function(e,n){n.type=e,this.topics[e]&&this.topics[e].forEach(function(t){t(n,e)})}}}Object.keys||(Object.keys=function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e}),"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)});var $i=function(H){H=Li({container:".slider",mode:"carousel",axis:"horizontal",items:1,gutter:0,edgePadding:0,fixedWidth:!1,autoWidth:!1,viewportMax:!1,slideBy:1,center:!1,controls:!0,controlsPosition:"top",controlsText:["prev","next"],controlsContainer:!1,prevButton:!1,nextButton:!1,nav:!0,navPosition:"top",navContainer:!1,navAsThumbnails:!1,arrowKeys:!1,speed:300,autoplay:!1,autoplayPosition:"top",autoplayTimeout:5e3,autoplayDirection:"forward",autoplayText:["start","stop"],autoplayHoverPause:!1,autoplayButton:!1,autoplayButtonOutput:!0,autoplayResetOnVisibility:!0,animateIn:"tns-fadeIn",animateOut:"tns-fadeOut",animateNormal:"tns-normal",animateDelay:!1,loop:!0,rewind:!1,autoHeight:!1,responsive:!1,lazyload:!1,lazyloadSelector:".tns-lazy-img",touch:!0,mouseDrag:!1,swipeAngle:15,nested:!1,preventActionWhenRunning:!1,preventScrollOnTouch:!1,freezable:!0,onInit:!1,useLocalStorage:!0,nonce:!1},H||{});var O=document,m=window,a={ENTER:13,SPACE:32,LEFT:37,RIGHT:39},e={},n=H.useLocalStorage;if(n){var t=navigator.userAgent,i=new Date;try{(e=m.localStorage)?(e.setItem(i,i),n=e.getItem(i)==i,e.removeItem(i)):n=!1,n||(e={})}catch(t){n=!1}n&&(e.tnsApp&&e.tnsApp!==t&&["tC","tPL","tMQ","tTf","t3D","tTDu","tTDe","tADu","tADe","tTE","tAE"].forEach(function(t){e.removeItem(t)}),localStorage.tnsApp=t)}var y=e.tC?Bi(e.tC):Si(e,"tC",function(){var t=document,e=Hi(),n=Oi(e),i=t.createElement("div"),a=!1;e.appendChild(i);try{for(var r,o="(10px * 10)",u=["calc"+o,"-moz-calc"+o,"-webkit-calc"+o],l=0;l<3;l++)if(r=u[l],i.style.width=r,100===i.offsetWidth){a=r.replace(o,"");break}}catch(t){}return e.fake?Di(e,n):i.remove(),a}(),n),g=e.tPL?Bi(e.tPL):Si(e,"tPL",function(){var t,e=document,n=Hi(),i=Oi(n),a=e.createElement("div"),r=e.createElement("div"),o="";a.className="tns-t-subp2",r.className="tns-t-ct";for(var u=0;u<70;u++)o+="<div></div>";return r.innerHTML=o,a.appendChild(r),n.appendChild(a),t=Math.abs(a.getBoundingClientRect().left-r.children[67].getBoundingClientRect().left)<2,n.fake?Di(n,i):a.remove(),t}(),n),D=e.tMQ?Bi(e.tMQ):Si(e,"tMQ",function(){if(window.matchMedia||window.msMatchMedia)return!0;var t,e=document,n=Hi(),i=Oi(n),a=e.createElement("div"),r=e.createElement("style"),o="@media all and (min-width:1px){.tns-mq-test{position:absolute}}";return r.type="text/css",a.className="tns-mq-test",n.appendChild(r),n.appendChild(a),r.styleSheet?r.styleSheet.cssText=o:r.appendChild(e.createTextNode(o)),t=window.getComputedStyle?window.getComputedStyle(a).position:a.currentStyle.position,n.fake?Di(n,i):a.remove(),"absolute"===t}(),n),r=e.tTf?Bi(e.tTf):Si(e,"tTf",Ki("transform"),n),o=e.t3D?Bi(e.t3D):Si(e,"t3D",function(t){if(!t)return!1;if(!window.getComputedStyle)return!1;var e,n=document,i=Hi(),a=Oi(i),r=n.createElement("p"),o=9<t.length?"-"+t.slice(0,-9).toLowerCase()+"-":"";return o+="transform",i.insertBefore(r,null),r.style[t]="translate3d(1px,1px,1px)",e=window.getComputedStyle(r).getPropertyValue(o),i.fake?Di(i,a):r.remove(),void 0!==e&&0<e.length&&"none"!==e}(r),n),x=e.tTDu?Bi(e.tTDu):Si(e,"tTDu",Ki("transitionDuration"),n),u=e.tTDe?Bi(e.tTDe):Si(e,"tTDe",Ki("transitionDelay"),n),b=e.tADu?Bi(e.tADu):Si(e,"tADu",Ki("animationDuration"),n),l=e.tADe?Bi(e.tADe):Si(e,"tADe",Ki("animationDelay"),n),s=e.tTE?Bi(e.tTE):Si(e,"tTE",Ji(x,"Transition"),n),c=e.tAE?Bi(e.tAE):Si(e,"tAE",Ji(b,"Animation"),n),f=m.console&&"function"==typeof m.console.warn,d=["container","controlsContainer","prevButton","nextButton","navContainer","autoplayButton"],v={};if(d.forEach(function(t){if("string"==typeof H[t]){var e=H[t],n=O.querySelector(e);if(v[t]=e,!n||!n.nodeName)return void(f&&console.warn("Can't find",H[t]));H[t]=n}}),!(H.container.children.length<1)){var k=H.responsive,R=H.nested,I="carousel"===H.mode;if(k){0 in k&&(H=Li(H,k[0]),delete k[0]);var p={};for(var h in k){var w=k[h];w="number"==typeof w?{items:w}:w,p[h]=w}k=p,p=null}if(I||function t(e){for(var n in e)I||("slideBy"===n&&(e[n]="page"),"edgePadding"===n&&(e[n]=!1),"autoHeight"===n&&(e[n]=!1)),"responsive"===n&&t(e[n])}(H),!I){H.axis="horizontal",H.slideBy="page",H.edgePadding=!1;var P=H.animateIn,z=H.animateOut,C=H.animateDelay,W=H.animateNormal}var M,q,F="horizontal"===H.axis,T=O.createElement("div"),j=O.createElement("div"),V=H.container,E=V.parentNode,A=V.outerHTML,G=V.children,Q=G.length,X=rn(),Y=!1;k&&En(),I&&(V.className+=" tns-vpfix");var N,L,B,S,K,J,U,_,Z,$=H.autoWidth,tt=sn("fixedWidth"),et=sn("edgePadding"),nt=sn("gutter"),it=un(),at=sn("center"),rt=$?1:Math.floor(sn("items")),ot=sn("slideBy"),ut=H.viewportMax||H.fixedWidthViewportWidth,lt=sn("arrowKeys"),st=sn("speed"),ct=H.rewind,ft=!ct&&H.loop,dt=sn("autoHeight"),vt=sn("controls"),pt=sn("controlsText"),ht=sn("nav"),mt=sn("touch"),yt=sn("mouseDrag"),gt=sn("autoplay"),xt=sn("autoplayTimeout"),bt=sn("autoplayText"),wt=sn("autoplayHoverPause"),Ct=sn("autoplayResetOnVisibility"),Mt=(U=null,_=sn("nonce"),Z=document.createElement("style"),U&&Z.setAttribute("media",U),_&&Z.setAttribute("nonce",_),document.querySelector("head").appendChild(Z),Z.sheet?Z.sheet:Z.styleSheet),Tt=H.lazyload,Et=H.lazyloadSelector,At=[],Nt=ft?(K=function(){{if($||tt&&!ut)return Q-1;var t=tt?"fixedWidth":"items",e=[];if((tt||H[t]<Q)&&e.push(H[t]),k)for(var n in k){var i=k[n][t];i&&(tt||i<Q)&&e.push(i)}return e.length||e.push(0),Math.ceil(tt?ut/Math.min.apply(null,e):Math.max.apply(null,e))}}(),J=I?Math.ceil((5*K-Q)/2):4*K-Q,J=Math.max(K,J),ln("edgePadding")?J+1:J):0,Lt=I?Q+2*Nt:Q+Nt,Bt=!(!tt&&!$||ft),St=tt?_n():null,Ht=!I||!ft,Ot=F?"left":"top",Dt="",kt="",Rt=tt?function(){return at&&!ft?Q-1:Math.ceil(-St/(tt+nt))}:$?function(){for(var t=0;t<Lt;t++)if(N[t]>=-St)return t}:function(){return at&&I&&!ft?Q-1:ft||I?Math.max(0,Lt-Math.ceil(rt)):Lt-1},It=en(sn("startIndex")),Pt=It,zt=(tn(),0),Wt=$?null:Rt(),qt=H.preventActionWhenRunning,Ft=H.swipeAngle,jt=!Ft||"?",Vt=!1,Gt=H.onInit,Qt=new Zi,Xt=" tns-slider tns-"+H.mode,Yt=V.id||(S=window.tnsId,window.tnsId=S?S+1:1,"tns"+window.tnsId),Kt=sn("disable"),Jt=!1,Ut=H.freezable,_t=!(!Ut||$)&&Tn(),Zt=!1,$t={click:oi,keydown:function(t){t=pi(t);var e=[a.LEFT,a.RIGHT].indexOf(t.keyCode);0<=e&&(0===e?we.disabled||oi(t,-1):Ce.disabled||oi(t,1))}},te={click:function(t){if(Vt){if(qt)return;ai()}var e=hi(t=pi(t));for(;e!==Ae&&!qi(e,"data-nav");)e=e.parentNode;if(qi(e,"data-nav")){var n=Se=Number(Fi(e,"data-nav")),i=tt||$?n*Q/Le:n*rt,a=le?n:Math.min(Math.ceil(i),Q-1);ri(a,t),He===n&&(Pe&&fi(),Se=-1)}},keydown:function(t){t=pi(t);var e=O.activeElement;if(!qi(e,"data-nav"))return;var n=[a.LEFT,a.RIGHT,a.ENTER,a.SPACE].indexOf(t.keyCode),i=Number(Fi(e,"data-nav"));0<=n&&(0===n?0<i&&vi(Ee[i-1]):1===n?i<Le-1&&vi(Ee[i+1]):ri(Se=i,t))}},ee={mouseover:function(){Pe&&(li(),ze=!0)},mouseout:function(){ze&&(ui(),ze=!1)}},ne={visibilitychange:function(){O.hidden?Pe&&(li(),qe=!0):qe&&(ui(),qe=!1)}},ie={keydown:function(t){t=pi(t);var e=[a.LEFT,a.RIGHT].indexOf(t.keyCode);0<=e&&oi(t,0===e?-1:1)}},ae={touchstart:xi,touchmove:bi,touchend:wi,touchcancel:wi},re={mousedown:xi,mousemove:bi,mouseup:wi,mouseleave:wi},oe=ln("controls"),ue=ln("nav"),le=!!$||H.navAsThumbnails,se=ln("autoplay"),ce=ln("touch"),fe=ln("mouseDrag"),de="tns-slide-active",ve="tns-slide-cloned",pe="tns-complete",he={load:function(t){kn(hi(t))},error:function(t){e=hi(t),zi(e,"failed"),Rn(e);var e}},me="force"===H.preventScrollOnTouch;if(oe)var ye,ge,xe=H.controlsContainer,be=H.controlsContainer?H.controlsContainer.outerHTML:"",we=H.prevButton,Ce=H.nextButton,Me=H.prevButton?H.prevButton.outerHTML:"",Te=H.nextButton?H.nextButton.outerHTML:"";if(ue)var Ee,Ae=H.navContainer,Ne=H.navContainer?H.navContainer.outerHTML:"",Le=$?Q:Mi(),Be=0,Se=-1,He=an(),Oe=He,De="tns-nav-active",ke="Carousel Page ",Re=" (Current Slide)";if(se)var Ie,Pe,ze,We,qe,Fe="forward"===H.autoplayDirection?1:-1,je=H.autoplayButton,Ve=H.autoplayButton?H.autoplayButton.outerHTML:"",Ge=["<span class='tns-visually-hidden'>"," animation</span>"];if(ce||fe)var Qe,Xe,Ye={},Ke={},Je=!1,Ue=F?function(t,e){return t.x-e.x}:function(t,e){return t.y-e.y};$||$e(Kt||_t),r&&(Ot=r,Dt="translate",o?(Dt+=F?"3d(":"3d(0px, ",kt=F?", 0px, 0px)":", 0px)"):(Dt+=F?"X(":"Y(",kt=")")),I&&(V.className=V.className.replace("tns-vpfix","")),function(){ln("gutter");T.className="tns-outer",j.className="tns-inner",T.id=Yt+"-ow",j.id=Yt+"-iw",""===V.id&&(V.id=Yt);Xt+=g||$?" tns-subpixel":" tns-no-subpixel",Xt+=y?" tns-calc":" tns-no-calc",$&&(Xt+=" tns-autowidth");Xt+=" tns-"+H.axis,V.className+=Xt,I?((M=O.createElement("div")).id=Yt+"-mw",M.className="tns-ovh",T.appendChild(M),M.appendChild(j)):T.appendChild(j);if(dt){var t=M||j;t.className+=" tns-ah"}if(E.insertBefore(T,V),j.appendChild(V),Ii(G,function(t,e){zi(t,"tns-item"),t.id||(t.id=Yt+"-item"+e),!I&&W&&zi(t,W),ji(t,{"aria-hidden":"true",tabindex:"-1"})}),Nt){for(var e=O.createDocumentFragment(),n=O.createDocumentFragment(),i=Nt;i--;){var a=i%Q,r=G[a].cloneNode(!0);if(zi(r,ve),Vi(r,"id"),n.insertBefore(r,n.firstChild),I){var o=G[Q-1-a].cloneNode(!0);zi(o,ve),Vi(o,"id"),e.appendChild(o)}}V.insertBefore(e,V.firstChild),V.appendChild(n),G=V.children}}(),function(){if(!I)for(var t=It,e=It+Math.min(Q,rt);t<e;t++){var n=G[t];n.style.left=100*(t-It)/rt+"%",zi(n,P),Wi(n,W)}F&&(g||$?(ki(Mt,"#"+Yt+" > .tns-item","font-size:"+m.getComputedStyle(G[0]).fontSize+";",Ri(Mt)),ki(Mt,"#"+Yt,"font-size:0;",Ri(Mt))):I&&Ii(G,function(t,e){var n;t.style.marginLeft=(n=e,y?y+"("+100*n+"% / "+Lt+")":100*n/Lt+"%")}));if(D){if(x){var i=M&&H.autoHeight?hn(H.speed):"";ki(Mt,"#"+Yt+"-mw",i,Ri(Mt))}i=cn(H.edgePadding,H.gutter,H.fixedWidth,H.speed,H.autoHeight),ki(Mt,"#"+Yt+"-iw",i,Ri(Mt)),I&&(i=F&&!$?"width:"+fn(H.fixedWidth,H.gutter,H.items)+";":"",x&&(i+=hn(st)),ki(Mt,"#"+Yt,i,Ri(Mt))),i=F&&!$?dn(H.fixedWidth,H.gutter,H.items):"",H.gutter&&(i+=vn(H.gutter)),I||(x&&(i+=hn(st)),b&&(i+=mn(st))),i&&ki(Mt,"#"+Yt+" > .tns-item",i,Ri(Mt))}else{I&&dt&&(M.style[x]=st/1e3+"s"),j.style.cssText=cn(et,nt,tt,dt),I&&F&&!$&&(V.style.width=fn(tt,nt,rt));var i=F&&!$?dn(tt,nt,rt):"";nt&&(i+=vn(nt)),i&&ki(Mt,"#"+Yt+" > .tns-item",i,Ri(Mt))}if(k&&D)for(var a in k){a=parseInt(a);var r=k[a],i="",o="",u="",l="",s="",c=$?null:sn("items",a),f=sn("fixedWidth",a),d=sn("speed",a),v=sn("edgePadding",a),p=sn("autoHeight",a),h=sn("gutter",a);x&&M&&sn("autoHeight",a)&&"speed"in r&&(o="#"+Yt+"-mw{"+hn(d)+"}"),("edgePadding"in r||"gutter"in r)&&(u="#"+Yt+"-iw{"+cn(v,h,f,d,p)+"}"),I&&F&&!$&&("fixedWidth"in r||"items"in r||tt&&"gutter"in r)&&(l="width:"+fn(f,h,c)+";"),x&&"speed"in r&&(l+=hn(d)),l&&(l="#"+Yt+"{"+l+"}"),("fixedWidth"in r||tt&&"gutter"in r||!I&&"items"in r)&&(s+=dn(f,h,c)),"gutter"in r&&(s+=vn(h)),!I&&"speed"in r&&(x&&(s+=hn(d)),b&&(s+=mn(d))),s&&(s="#"+Yt+" > .tns-item{"+s+"}"),(i=o+u+l+s)&&Mt.insertRule("@media (min-width: "+a/16+"em) {"+i+"}",Mt.cssRules.length)}}(),yn();var _e=ft?I?function(){var t=zt,e=Wt;t+=ot,e-=ot,et?(t+=1,e-=1):tt&&(it+nt)%(tt+nt)&&(e-=1),Nt&&(e<It?It-=Q:It<t&&(It+=Q))}:function(){if(Wt<It)for(;zt+Q<=It;)It-=Q;else if(It<zt)for(;It<=Wt-Q;)It+=Q}:function(){It=Math.max(zt,Math.min(Wt,It))},Ze=I?function(){var e,n,i,a,t,r,o,u,l,s,c;Jn(V,""),x||!st?(ti(),st&&Yi(V)||ai()):(e=V,n=Ot,i=Dt,a=kt,t=Zn(),r=st,o=ai,u=Math.min(r,10),l=0<=t.indexOf("%")?"%":"px",t=t.replace(l,""),s=Number(e.style[n].replace(i,"").replace(a,"").replace(l,"")),c=(t-s)/r*u,setTimeout(function t(){r-=u,s+=c,e.style[n]=i+s+l+a,0<r?setTimeout(t,u):o()},u)),F||Ci()}:function(){At=[];var t={};t[s]=t[c]=ai,_i(G[Pt],t),Ui(G[It],t),ei(Pt,P,z,!0),ei(It,W,P),s&&c&&st&&Yi(V)||ai()};return{version:"2.9.3",getInfo:Ei,events:Qt,goTo:ri,play:function(){gt&&!Pe&&(ci(),We=!1)},pause:function(){Pe&&(fi(),We=!0)},isOn:Y,updateSliderHeight:Fn,refresh:yn,destroy:function(){if(Mt.disabled=!0,Mt.ownerNode&&Mt.ownerNode.remove(),_i(m,{resize:Cn}),lt&&_i(O,ie),xe&&_i(xe,$t),Ae&&_i(Ae,te),_i(V,ee),_i(V,ne),je&&_i(je,{click:di}),gt&&clearInterval(Ie),I&&s){var t={};t[s]=ai,_i(V,t)}mt&&_i(V,ae),yt&&_i(V,re);var r=[A,be,Me,Te,Ne,Ve];for(var e in d.forEach(function(t,e){var n="container"===t?T:H[t];if("object"==typeof n&&n){var i=!!n.previousElementSibling&&n.previousElementSibling,a=n.parentNode;n.outerHTML=r[e],H[t]=i?i.nextElementSibling:a.firstElementChild}}),d=P=z=C=W=F=T=j=V=E=A=G=Q=q=X=$=tt=et=nt=it=rt=ot=ut=lt=st=ct=ft=dt=Mt=Tt=N=At=Nt=Lt=Bt=St=Ht=Ot=Dt=kt=Rt=It=Pt=zt=Wt=Ft=jt=Vt=Gt=Qt=Xt=Yt=Kt=Jt=Ut=_t=Zt=$t=te=ee=ne=ie=ae=re=oe=ue=le=se=ce=fe=de=pe=he=L=vt=pt=xe=be=we=Ce=ye=ge=ht=Ae=Ne=Ee=Le=Be=Se=He=Oe=De=ke=Re=gt=xt=Fe=bt=wt=je=Ve=Ct=Ge=Ie=Pe=ze=We=qe=Ye=Ke=Qe=Je=Xe=Ue=mt=yt=null,this)"rebuild"!==e&&(this[e]=null);Y=!1},rebuild:function(){return $i(Li(H,v))}}}function $e(t){t&&(vt=ht=mt=yt=lt=gt=wt=Ct=!1)}function tn(){for(var t=I?It-Nt:It;t<0;)t+=Q;return t%Q+1}function en(t){return t=t?Math.max(0,Math.min(ft?Q-1:Q-rt,t)):0,I?t+Nt:t}function nn(t){for(null==t&&(t=It),I&&(t-=Nt);t<0;)t+=Q;return Math.floor(t%Q)}function an(){var t,e=nn();return t=le?e:tt||$?Math.ceil((e+1)*Le/Q-1):Math.floor(e/rt),!ft&&I&&It===Wt&&(t=Le-1),t}function rn(){return m.innerWidth||O.documentElement.clientWidth||O.body.clientWidth}function on(t){return"top"===t?"afterbegin":"beforeend"}function un(){var t=et?2*et-nt:0;return function t(e){if(null!=e){var n,i,a=O.createElement("div");return e.appendChild(a),i=(n=a.getBoundingClientRect()).right-n.left,a.remove(),i||t(e.parentNode)}}(E)-t}function ln(t){if(H[t])return!0;if(k)for(var e in k)if(k[e][t])return!0;return!1}function sn(t,e){if(null==e&&(e=X),"items"===t&&tt)return Math.floor((it+nt)/(tt+nt))||1;var n=H[t];if(k)for(var i in k)e>=parseInt(i)&&t in k[i]&&(n=k[i][t]);return"slideBy"===t&&"page"===n&&(n=sn("items")),I||"slideBy"!==t&&"items"!==t||(n=Math.floor(n)),n}function cn(t,e,n,i,a){var r="";if(void 0!==t){var o=t;e&&(o-=e),r=F?"margin: 0 "+o+"px 0 "+t+"px;":"margin: "+t+"px 0 "+o+"px 0;"}else if(e&&!n){var u="-"+e+"px";r="margin: 0 "+(F?u+" 0 0":"0 "+u+" 0")+";"}return!I&&a&&x&&i&&(r+=hn(i)),r}function fn(t,e,n){return t?(t+e)*Lt+"px":y?y+"("+100*Lt+"% / "+n+")":100*Lt/n+"%"}function dn(t,e,n){var i;if(t)i=t+e+"px";else{I||(n=Math.floor(n));var a=I?Lt:n;i=y?y+"(100% / "+a+")":100/a+"%"}return i="width:"+i,"inner"!==R?i+";":i+" !important;"}function vn(t){var e="";!1!==t&&(e=(F?"padding-":"margin-")+(F?"right":"bottom")+": "+t+"px;");return e}function pn(t,e){var n=t.substring(0,t.length-e).toLowerCase();return n&&(n="-"+n+"-"),n}function hn(t){return pn(x,18)+"transition-duration:"+t/1e3+"s;"}function mn(t){return pn(b,17)+"animation-duration:"+t/1e3+"s;"}function yn(){if(ln("autoHeight")||$||!F){var t=V.querySelectorAll("img");Ii(t,function(t){var e=t.src;Tt||(e&&e.indexOf("data:image")<0?(t.src="",Ui(t,he),zi(t,"loading"),t.src=e):kn(t))}),Ai(function(){zn(Gi(t),function(){L=!0})}),ln("autoHeight")&&(t=In(It,Math.min(It+rt-1,Lt-1))),Tt?gn():Ai(function(){zn(Gi(t),gn)})}else I&&$n(),bn(),wn()}function gn(){if($&&1<Q){var i=ft?It:Q-1;!function t(){var e=G[i].getBoundingClientRect().left,n=G[i-1].getBoundingClientRect().right;Math.abs(e-n)<=1?xn():setTimeout(function(){t()},16)}()}else xn()}function xn(){F&&!$||(jn(),$?(St=_n(),Ut&&(_t=Tn()),Wt=Rt(),$e(Kt||_t)):Ci()),I&&$n(),bn(),wn()}function bn(){if(Vn(),T.insertAdjacentHTML("afterbegin",'<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">'+Hn()+"</span>  of "+Q+"</div>"),B=T.querySelector(".tns-liveregion .current"),se){var t=gt?"stop":"start";je?ji(je,{"data-action":t}):H.autoplayButtonOutput&&(T.insertAdjacentHTML(on(H.autoplayPosition),'<button type="button" data-action="'+t+'">'+Ge[0]+t+Ge[1]+bt[0]+"</button>"),je=T.querySelector("[data-action]")),je&&Ui(je,{click:di}),gt&&(ci(),wt&&Ui(V,ee),Ct&&Ui(V,ne))}if(ue){if(Ae)ji(Ae,{"aria-label":"Carousel Pagination"}),Ii(Ee=Ae.children,function(t,e){ji(t,{"data-nav":e,tabindex:"-1","aria-label":ke+(e+1),"aria-controls":Yt})});else{for(var e="",n=le?"":'style="display:none"',i=0;i<Q;i++)e+='<button type="button" data-nav="'+i+'" tabindex="-1" aria-controls="'+Yt+'" '+n+' aria-label="'+ke+(i+1)+'"></button>';e='<div class="tns-nav" aria-label="Carousel Pagination">'+e+"</div>",T.insertAdjacentHTML(on(H.navPosition),e),Ae=T.querySelector(".tns-nav"),Ee=Ae.children}if(Ti(),x){var a=x.substring(0,x.length-18).toLowerCase(),r="transition: all "+st/1e3+"s";a&&(r="-"+a+"-"+r),ki(Mt,"[aria-controls^="+Yt+"-item]",r,Ri(Mt))}ji(Ee[He],{"aria-label":ke+(He+1)+Re}),Vi(Ee[He],"tabindex"),zi(Ee[He],De),Ui(Ae,te)}oe&&(xe||we&&Ce||(T.insertAdjacentHTML(on(H.controlsPosition),'<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="'+Yt+'">'+pt[0]+'</button><button type="button" data-controls="next" tabindex="-1" aria-controls="'+Yt+'">'+pt[1]+"</button></div>"),xe=T.querySelector(".tns-controls")),we&&Ce||(we=xe.children[0],Ce=xe.children[1]),H.controlsContainer&&ji(xe,{"aria-label":"Carousel Navigation",tabindex:"0"}),(H.controlsContainer||H.prevButton&&H.nextButton)&&ji([we,Ce],{"aria-controls":Yt,tabindex:"-1"}),(H.controlsContainer||H.prevButton&&H.nextButton)&&(ji(we,{"data-controls":"prev"}),ji(Ce,{"data-controls":"next"})),ye=Qn(we),ge=Qn(Ce),Kn(),xe?Ui(xe,$t):(Ui(we,$t),Ui(Ce,$t))),An()}function wn(){if(I&&s){var t={};t[s]=ai,Ui(V,t)}mt&&Ui(V,ae,H.preventScrollOnTouch),yt&&Ui(V,re),lt&&Ui(O,ie),"inner"===R?Qt.on("outerResized",function(){Mn(),Qt.emit("innerLoaded",Ei())}):(k||tt||$||dt||!F)&&Ui(m,{resize:Cn}),dt&&("outer"===R?Qt.on("innerLoaded",Pn):Kt||Pn()),Dn(),Kt?Bn():_t&&Ln(),Qt.on("indexChanged",Wn),"inner"===R&&Qt.emit("innerLoaded",Ei()),"function"==typeof Gt&&Gt(Ei()),Y=!0}function Cn(t){Ai(function(){Mn(pi(t))})}function Mn(t){if(Y){"outer"===R&&Qt.emit("outerResized",Ei(t)),X=rn();var e,n=q,i=!1;k&&(En(),(e=n!==q)&&Qt.emit("newBreakpointStart",Ei(t)));var a,r,o,u,l=rt,s=Kt,c=_t,f=lt,d=vt,v=ht,p=mt,h=yt,m=gt,y=wt,g=Ct,x=It;if(e){var b=tt,w=dt,C=pt,M=at,T=bt;if(!D)var E=nt,A=et}if(lt=sn("arrowKeys"),vt=sn("controls"),ht=sn("nav"),mt=sn("touch"),at=sn("center"),yt=sn("mouseDrag"),gt=sn("autoplay"),wt=sn("autoplayHoverPause"),Ct=sn("autoplayResetOnVisibility"),e&&(Kt=sn("disable"),tt=sn("fixedWidth"),st=sn("speed"),dt=sn("autoHeight"),pt=sn("controlsText"),bt=sn("autoplayText"),xt=sn("autoplayTimeout"),D||(et=sn("edgePadding"),nt=sn("gutter"))),$e(Kt),it=un(),F&&!$||Kt||(jn(),F||(Ci(),i=!0)),(tt||$)&&(St=_n(),Wt=Rt()),(e||tt)&&(rt=sn("items"),ot=sn("slideBy"),(r=rt!==l)&&(tt||$||(Wt=Rt()),_e())),e&&Kt!==s&&(Kt?Bn():function(){if(!Jt)return;if(Mt.disabled=!1,V.className+=Xt,$n(),ft)for(var t=Nt;t--;)I&&Xi(G[t]),Xi(G[Lt-t-1]);if(!I)for(var e=It,n=It+Q;e<n;e++){var i=G[e],a=e<It+rt?P:W;i.style.left=100*(e-It)/rt+"%",zi(i,a)}Nn(),Jt=!1}()),Ut&&(e||tt||$)&&(_t=Tn())!==c&&(_t?(ti(Zn(en(0))),Ln()):(!function(){if(!Zt)return;et&&D&&(j.style.margin="");if(Nt)for(var t="tns-transparent",e=Nt;e--;)I&&Wi(G[e],t),Wi(G[Lt-e-1],t);Nn(),Zt=!1}(),i=!0)),$e(Kt||_t),gt||(wt=Ct=!1),lt!==f&&(lt?Ui(O,ie):_i(O,ie)),vt!==d&&(vt?xe?Xi(xe):(we&&Xi(we),Ce&&Xi(Ce)):xe?Qi(xe):(we&&Qi(we),Ce&&Qi(Ce))),ht!==v&&(ht?(Xi(Ae),Ti()):Qi(Ae)),mt!==p&&(mt?Ui(V,ae,H.preventScrollOnTouch):_i(V,ae)),yt!==h&&(yt?Ui(V,re):_i(V,re)),gt!==m&&(gt?(je&&Xi(je),Pe||We||ci()):(je&&Qi(je),Pe&&fi())),wt!==y&&(wt?Ui(V,ee):_i(V,ee)),Ct!==g&&(Ct?Ui(O,ne):_i(O,ne)),e){if(tt===b&&at===M||(i=!0),dt!==w&&(dt||(j.style.height="")),vt&&pt!==C&&(we.innerHTML=pt[0],Ce.innerHTML=pt[1]),je&&bt!==T){var N=gt?1:0,L=je.innerHTML,B=L.length-T[N].length;L.substring(B)===T[N]&&(je.innerHTML=L.substring(0,B)+bt[N])}}else at&&(tt||$)&&(i=!0);if((r||tt&&!$)&&(Le=Mi(),Ti()),(a=It!==x)?(Qt.emit("indexChanged",Ei()),i=!0):r?a||Wn():(tt||$)&&(Dn(),Vn(),Sn()),r&&!I&&function(){for(var t=It+Math.min(Q,rt),e=Lt;e--;){var n=G[e];It<=e&&e<t?(zi(n,"tns-moving"),n.style.left=100*(e-It)/rt+"%",zi(n,P),Wi(n,W)):n.style.left&&(n.style.left="",zi(n,W),Wi(n,P)),Wi(n,z)}setTimeout(function(){Ii(G,function(t){Wi(t,"tns-moving")})},300)}(),!Kt&&!_t){if(e&&!D&&(et===A&&nt===E||(j.style.cssText=cn(et,nt,tt,st,dt)),F)){I&&(V.style.width=fn(tt,nt,rt));var S=dn(tt,nt,rt)+vn(nt);u=Ri(o=Mt)-1,"deleteRule"in o?o.deleteRule(u):o.removeRule(u),ki(Mt,"#"+Yt+" > .tns-item",S,Ri(Mt))}dt&&Pn(),i&&($n(),Pt=It)}e&&Qt.emit("newBreakpointEnd",Ei(t))}}function Tn(){if(!tt&&!$)return Q<=(at?rt-(rt-1)/2:rt);var t=tt?(tt+nt)*Q:N[Q],e=et?it+2*et:it+nt;return at&&(e-=tt?(it-tt)/2:(it-(N[It+1]-N[It]-nt))/2),t<=e}function En(){for(var t in q=0,k)(t=parseInt(t))<=X&&(q=t)}function An(){!gt&&je&&Qi(je),!ht&&Ae&&Qi(Ae),vt||(xe?Qi(xe):(we&&Qi(we),Ce&&Qi(Ce)))}function Nn(){gt&&je&&Xi(je),ht&&Ae&&Xi(Ae),vt&&(xe?Xi(xe):(we&&Xi(we),Ce&&Xi(Ce)))}function Ln(){if(!Zt){if(et&&(j.style.margin="0px"),Nt)for(var t="tns-transparent",e=Nt;e--;)I&&zi(G[e],t),zi(G[Lt-e-1],t);An(),Zt=!0}}function Bn(){if(!Jt){if(Mt.disabled=!0,V.className=V.className.replace(Xt.substring(1),""),Vi(V,["style"]),ft)for(var t=Nt;t--;)I&&Qi(G[t]),Qi(G[Lt-t-1]);if(F&&I||Vi(j,["style"]),!I)for(var e=It,n=It+Q;e<n;e++){var i=G[e];Vi(i,["style"]),Wi(i,P),Wi(i,W)}An(),Jt=!0}}function Sn(){var t=Hn();B.innerHTML!==t&&(B.innerHTML=t)}function Hn(){var t=On(),e=t[0]+1,n=t[1]+1;return e===n?e+"":e+" to "+n}function On(t){null==t&&(t=Zn());var n,i,a,r=It;if(at||et?($||tt)&&(i=-(parseFloat(t)+et),a=i+it+2*et):$&&(i=N[It],a=i+it),$)N.forEach(function(t,e){e<Lt&&((at||et)&&t<=i+.5&&(r=e),.5<=a-t&&(n=e))});else{if(tt){var e=tt+nt;at||et?(r=Math.floor(i/e),n=Math.ceil(a/e-1)):n=r+Math.ceil(it/e)-1}else if(at||et){var o=rt-1;if(at?(r-=o/2,n=It+o/2):n=It+o,et){var u=et*rt/it;r-=u,n+=u}r=Math.floor(r),n=Math.ceil(n)}else n=r+rt-1;r=Math.max(r,0),n=Math.min(n,Lt-1)}return[r,n]}function Dn(){if(Tt&&!Kt){var t=On();t.push(Et),In.apply(null,t).forEach(function(t){if(!Pi(t,pe)){var e={};e[s]=function(t){t.stopPropagation()},Ui(t,e),Ui(t,he),t.src=Fi(t,"data-src");var n=Fi(t,"data-srcset");n&&(t.srcset=n),zi(t,"loading")}})}}function kn(t){zi(t,"loaded"),Rn(t)}function Rn(t){zi(t,pe),Wi(t,"loading"),_i(t,he)}function In(t,e,n){var i=[];for(n||(n="img");t<=e;)Ii(G[t].querySelectorAll(n),function(t){i.push(t)}),t++;return i}function Pn(){var t=In.apply(null,On());Ai(function(){zn(t,Fn)})}function zn(n,t){return L?t():(n.forEach(function(t,e){!Tt&&t.complete&&Rn(t),Pi(t,pe)&&n.splice(e,1)}),n.length?void Ai(function(){zn(n,t)}):t())}function Wn(){Dn(),Vn(),Sn(),Kn(),function(){if(ht&&(He=0<=Se?Se:an(),Se=-1,He!==Oe)){var t=Ee[Oe],e=Ee[He];ji(t,{tabindex:"-1","aria-label":ke+(Oe+1)}),Wi(t,De),ji(e,{"aria-label":ke+(He+1)+Re}),Vi(e,"tabindex"),zi(e,De),Oe=He}}()}function qn(t,e){for(var n=[],i=t,a=Math.min(t+e,Lt);i<a;i++)n.push(G[i].offsetHeight);return Math.max.apply(null,n)}function Fn(){var t=dt?qn(It,rt):qn(Nt,Q),e=M||j;e.style.height!==t&&(e.style.height=t+"px")}function jn(){N=[0];var n=F?"left":"top",i=F?"right":"bottom",a=G[0].getBoundingClientRect()[n];Ii(G,function(t,e){e&&N.push(t.getBoundingClientRect()[n]-a),e===Lt-1&&N.push(t.getBoundingClientRect()[i]-a)})}function Vn(){var t=On(),n=t[0],i=t[1];Ii(G,function(t,e){n<=e&&e<=i?qi(t,"aria-hidden")&&(Vi(t,["aria-hidden","tabindex"]),zi(t,de)):qi(t,"aria-hidden")||(ji(t,{"aria-hidden":"true",tabindex:"-1"}),Wi(t,de))})}function Gn(t){return t.nodeName.toLowerCase()}function Qn(t){return"button"===Gn(t)}function Xn(t){return"true"===t.getAttribute("aria-disabled")}function Yn(t,e,n){t?e.disabled=n:e.setAttribute("aria-disabled",n.toString())}function Kn(){if(vt&&!ct&&!ft){var t=ye?we.disabled:Xn(we),e=ge?Ce.disabled:Xn(Ce),n=It<=zt,i=!ct&&Wt<=It;n&&!t&&Yn(ye,we,!0),!n&&t&&Yn(ye,we,!1),i&&!e&&Yn(ge,Ce,!0),!i&&e&&Yn(ge,Ce,!1)}}function Jn(t,e){x&&(t.style[x]=e)}function Un(t){return null==t&&(t=It),$?(it-(et?nt:0)-(N[t+1]-N[t]-nt))/2:tt?(it-tt)/2:(rt-1)/2}function _n(){var t=it+(et?nt:0)-(tt?(tt+nt)*Lt:N[Lt]);return at&&!ft&&(t=tt?-(tt+nt)*(Lt-1)-Un():Un(Lt-1)-N[Lt-1]),0<t&&(t=0),t}function Zn(t){var e;if(null==t&&(t=It),F&&!$)if(tt)e=-(tt+nt)*t,at&&(e+=Un());else{var n=r?Lt:rt;at&&(t-=Un()),e=100*-t/n}else e=-N[t],at&&$&&(e+=Un());return Bt&&(e=Math.max(e,St)),e+=!F||$||tt?"px":"%"}function $n(t){Jn(V,"0s"),ti(t)}function ti(t){null==t&&(t=Zn()),V.style[Ot]=Dt+t+kt}function ei(t,e,n,i){var a=t+rt;ft||(a=Math.min(a,Lt));for(var r=t;r<a;r++){var o=G[r];i||(o.style.left=100*(r-It)/rt+"%"),C&&u&&(o.style[u]=o.style[l]=C*(r-t)/1e3+"s"),Wi(o,e),zi(o,n),i&&At.push(o)}}function ni(t,e){Ht&&_e(),(It!==Pt||e)&&(Qt.emit("indexChanged",Ei()),Qt.emit("transitionStart",Ei()),dt&&Pn(),Pe&&t&&0<=["click","keydown"].indexOf(t.type)&&fi(),Vt=!0,Ze())}function ii(t){return t.toLowerCase().replace(/-/g,"")}function ai(t){if(I||Vt){if(Qt.emit("transitionEnd",Ei(t)),!I&&0<At.length)for(var e=0;e<At.length;e++){var n=At[e];n.style.left="",l&&u&&(n.style[l]="",n.style[u]=""),Wi(n,z),zi(n,W)}if(!t||!I&&t.target.parentNode===V||t.target===V&&ii(t.propertyName)===ii(Ot)){if(!Ht){var i=It;_e(),It!==i&&(Qt.emit("indexChanged",Ei()),$n())}"inner"===R&&Qt.emit("innerLoaded",Ei()),Vt=!1,Pt=It}}}function ri(t,e){if(!_t)if("prev"===t)oi(e,-1);else if("next"===t)oi(e,1);else{if(Vt){if(qt)return;ai()}var n=nn(),i=0;if("first"===t?i=-n:"last"===t?i=I?Q-rt-n:Q-1-n:("number"!=typeof t&&(t=parseInt(t)),isNaN(t)||(e||(t=Math.max(0,Math.min(Q-1,t))),i=t-n)),!I&&i&&Math.abs(i)<rt){var a=0<i?1:-1;i+=zt<=It+i-Q?Q*a:2*Q*a*-1}It+=i,I&&ft&&(It<zt&&(It+=Q),Wt<It&&(It-=Q)),nn(It)!==nn(Pt)&&ni(e)}}function oi(t,e){if(Vt){if(qt)return;ai()}var n;if(!e){for(var i=hi(t=pi(t));i!==xe&&[we,Ce].indexOf(i)<0;)i=i.parentNode;var a=[we,Ce].indexOf(i);0<=a&&(n=!0,e=0===a?-1:1)}if(ct){if(It===zt&&-1===e)return void ri("last",t);if(It===Wt&&1===e)return void ri("first",t)}e&&(It+=ot*e,$&&(It=Math.floor(It)),ni(n||t&&"keydown"===t.type?t:null))}function ui(){Ie=setInterval(function(){oi(null,Fe)},xt),Pe=!0}function li(){clearInterval(Ie),Pe=!1}function si(t,e){ji(je,{"data-action":t}),je.innerHTML=Ge[0]+t+Ge[1]+e}function ci(){ui(),je&&si("stop",bt[1])}function fi(){li(),je&&si("start",bt[0])}function di(){Pe?(fi(),We=!0):(ci(),We=!1)}function vi(t){t.focus()}function pi(t){return mi(t=t||m.event)?t.changedTouches[0]:t}function hi(t){return t.target||m.event.srcElement}function mi(t){return 0<=t.type.indexOf("touch")}function yi(t){t.preventDefault?t.preventDefault():t.returnValue=!1}function gi(){return a=Ke.y-Ye.y,r=Ke.x-Ye.x,t=Math.atan2(a,r)*(180/Math.PI),e=Ft,n=!1,i=Math.abs(90-Math.abs(t)),90-e<=i?n="horizontal":i<=e&&(n="vertical"),n===H.axis;var t,e,n,i,a,r}function xi(t){if(Vt){if(qt)return;ai()}gt&&Pe&&li(),Je=!0,Xe&&(Ni(Xe),Xe=null);var e=pi(t);Qt.emit(mi(t)?"touchStart":"dragStart",Ei(t)),!mi(t)&&0<=["img","a"].indexOf(Gn(hi(t)))&&yi(t),Ke.x=Ye.x=e.clientX,Ke.y=Ye.y=e.clientY,I&&(Qe=parseFloat(V.style[Ot].replace(Dt,"")),Jn(V,"0s"))}function bi(t){if(Je){var e=pi(t);Ke.x=e.clientX,Ke.y=e.clientY,I?Xe||(Xe=Ai(function(){!function t(e){if(!jt)return void(Je=!1);Ni(Xe);Je&&(Xe=Ai(function(){t(e)}));"?"===jt&&(jt=gi());if(jt){!me&&mi(e)&&(me=!0);try{e.type&&Qt.emit(mi(e)?"touchMove":"dragMove",Ei(e))}catch(t){}var n=Qe,i=Ue(Ke,Ye);if(!F||tt||$)n+=i,n+="px";else{var a=r?i*rt*100/((it+nt)*Lt):100*i/(it+nt);n+=a,n+="%"}V.style[Ot]=Dt+n+kt}}(t)})):("?"===jt&&(jt=gi()),jt&&(me=!0)),("boolean"!=typeof t.cancelable||t.cancelable)&&me&&t.preventDefault()}}function wi(i){if(Je){Xe&&(Ni(Xe),Xe=null),I&&Jn(V,""),Je=!1;var t=pi(i);Ke.x=t.clientX,Ke.y=t.clientY;var a=Ue(Ke,Ye);if(Math.abs(a)){if(!mi(i)){var n=hi(i);Ui(n,{click:function t(e){yi(e),_i(n,{click:t})}})}I?Xe=Ai(function(){if(F&&!$){var t=-a*rt/(it+nt);t=0<a?Math.floor(t):Math.ceil(t),It+=t}else{var e=-(Qe+a);if(e<=0)It=zt;else if(e>=N[Lt-1])It=Wt;else for(var n=0;n<Lt&&e>=N[n];)e>N[It=n]&&a<0&&(It+=1),n++}ni(i,a),Qt.emit(mi(i)?"touchEnd":"dragEnd",Ei(i))}):jt&&oi(i,0<a?-1:1)}}"auto"===H.preventScrollOnTouch&&(me=!1),Ft&&(jt="?"),gt&&!Pe&&ui()}function Ci(){(M||j).style.height=N[It+rt]-N[It]+"px"}function Mi(){var t=tt?(tt+nt)*Q/it:Q/rt;return Math.min(Math.ceil(t),Q)}function Ti(){if(ht&&!le&&Le!==Be){var t=Be,e=Le,n=Xi;for(Le<Be&&(t=Le,e=Be,n=Qi);t<e;)n(Ee[t]),t++;Be=Le}}function Ei(t){return{container:V,slideItems:G,navContainer:Ae,navItems:Ee,controlsContainer:xe,hasControls:oe,prevButton:we,nextButton:Ce,items:rt,slideBy:ot,cloneCount:Nt,slideCount:Q,slideCountNew:Lt,index:It,indexCached:Pt,displayIndex:tn(),navCurrentIndex:He,navCurrentIndexCached:Oe,pages:Le,pagesCached:Be,sheet:Mt,isOn:Y,event:t||{}}}f&&console.warn("No slides found in",H.container)};return $i}();


/*!
 * OverlayScrollbars
 * Version: 2.11.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(t) {
  "use strict";
  const createCache = (t, n) => {
    const {o: o, i: s, u: e} = t;
    let c = o;
    let r;
    const cacheUpdateContextual = (t, n) => {
      const o = c;
      const l = t;
      const i = n || (s ? !s(o, l) : o !== l);
      if (i || e) {
        c = l;
        r = o;
      }
      return [ c, i, r ];
    };
    const cacheUpdateIsolated = t => cacheUpdateContextual(n(c, r), t);
    const getCurrentCache = t => [ c, !!t, r ];
    return [ n ? cacheUpdateIsolated : cacheUpdateContextual, getCurrentCache ];
  };
  const n = typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document;
  const o = n ? window : {};
  const s = Math.max;
  const e = Math.min;
  const c = Math.round;
  const r = Math.abs;
  const l = Math.sign;
  const i = o.cancelAnimationFrame;
  const a = o.requestAnimationFrame;
  const u = o.setTimeout;
  const _ = o.clearTimeout;
  const getApi = t => typeof o[t] !== "undefined" ? o[t] : void 0;
  const d = getApi("MutationObserver");
  const f = getApi("IntersectionObserver");
  const v = getApi("ResizeObserver");
  const p = getApi("ScrollTimeline");
  const isUndefined = t => t === void 0;
  const isNull = t => t === null;
  const isNumber = t => typeof t === "number";
  const isString = t => typeof t === "string";
  const isBoolean = t => typeof t === "boolean";
  const isFunction = t => typeof t === "function";
  const isArray = t => Array.isArray(t);
  const isObject = t => typeof t === "object" && !isArray(t) && !isNull(t);
  const isArrayLike = t => {
    const n = !!t && t.length;
    const o = isNumber(n) && n > -1 && n % 1 == 0;
    return isArray(t) || !isFunction(t) && o ? n > 0 && isObject(t) ? n - 1 in t : true : false;
  };
  const isPlainObject = t => !!t && t.constructor === Object;
  const isHTMLElement = t => t instanceof HTMLElement;
  const isElement = t => t instanceof Element;
  const animationCurrentTime = () => performance.now();
  const animateNumber = (t, n, o, e, c) => {
    let r = 0;
    const l = animationCurrentTime();
    const u = s(0, o);
    const frame = o => {
      const i = animationCurrentTime();
      const _ = i - l;
      const d = _ >= u;
      const f = o ? 1 : 1 - (s(0, l + u - i) / u || 0);
      const v = (n - t) * (isFunction(c) ? c(f, f * u, 0, 1, u) : f) + t;
      const p = d || f === 1;
      e && e(v, f, p);
      r = p ? 0 : a((() => frame()));
    };
    frame();
    return t => {
      i(r);
      t && frame(t);
    };
  };
  function each(t, n) {
    if (isArrayLike(t)) {
      for (let o = 0; o < t.length; o++) {
        if (n(t[o], o, t) === false) {
          break;
        }
      }
    } else if (t) {
      each(Object.keys(t), (o => n(t[o], o, t)));
    }
    return t;
  }
  const inArray = (t, n) => t.indexOf(n) >= 0;
  const concat = (t, n) => t.concat(n);
  const push = (t, n, o) => {
    !isString(n) && isArrayLike(n) ? Array.prototype.push.apply(t, n) : t.push(n);
    return t;
  };
  const from = t => Array.from(t || []);
  const createOrKeepArray = t => {
    if (isArray(t)) {
      return t;
    }
    return !isString(t) && isArrayLike(t) ? from(t) : [ t ];
  };
  const isEmptyArray = t => !!t && !t.length;
  const deduplicateArray = t => from(new Set(t));
  const runEachAndClear = (t, n, o) => {
    const runFn = t => t ? t.apply(void 0, n || []) : true;
    each(t, runFn);
    !o && (t.length = 0);
  };
  const h = "paddingTop";
  const g = "paddingRight";
  const b = "paddingLeft";
  const y = "paddingBottom";
  const w = "marginLeft";
  const S = "marginRight";
  const m = "marginBottom";
  const O = "overflowX";
  const $ = "overflowY";
  const C = "width";
  const x = "height";
  const H = "visible";
  const E = "hidden";
  const z = "scroll";
  const capitalizeFirstLetter = t => {
    const n = String(t || "");
    return n ? n[0].toUpperCase() + n.slice(1) : "";
  };
  const equal = (t, n, o, s) => {
    if (t && n) {
      let s = true;
      each(o, (o => {
        const e = t[o];
        const c = n[o];
        if (e !== c) {
          s = false;
        }
      }));
      return s;
    }
    return false;
  };
  const equalWH = (t, n) => equal(t, n, [ "w", "h" ]);
  const equalXY = (t, n) => equal(t, n, [ "x", "y" ]);
  const equalTRBL = (t, n) => equal(t, n, [ "t", "r", "b", "l" ]);
  const noop = () => {};
  const bind = (t, ...n) => t.bind(0, ...n);
  const selfClearTimeout = t => {
    let n;
    const o = t ? u : a;
    const s = t ? _ : i;
    return [ e => {
      s(n);
      n = o((() => e()), isFunction(t) ? t() : t);
    }, () => s(n) ];
  };
  const debounce = (t, n) => {
    const {_: o, v: s, p: e, S: c} = n || {};
    let r;
    let l;
    let d;
    let f;
    let v = noop;
    const p = function invokeFunctionToDebounce(n) {
      v();
      _(r);
      f = r = l = void 0;
      v = noop;
      t.apply(this, n);
    };
    const mergeParms = t => c && l ? c(l, t) : t;
    const flush = () => {
      if (v !== noop) {
        p(mergeParms(d) || d);
      }
    };
    const h = function debouncedFn() {
      const t = from(arguments);
      const n = isFunction(o) ? o() : o;
      const c = isNumber(n) && n >= 0;
      if (c) {
        const o = isFunction(s) ? s() : s;
        const c = isNumber(o) && o >= 0;
        const h = n > 0 ? u : a;
        const g = n > 0 ? _ : i;
        const b = mergeParms(t);
        const y = b || t;
        const w = p.bind(0, y);
        let S;
        v();
        if (e && !f) {
          w();
          f = true;
          S = h((() => f = void 0), n);
        } else {
          S = h(w, n);
          if (c && !r) {
            r = u(flush, o);
          }
        }
        v = () => g(S);
        l = d = y;
      } else {
        p(t);
      }
    };
    h.m = flush;
    return h;
  };
  const hasOwnProperty = (t, n) => Object.prototype.hasOwnProperty.call(t, n);
  const keys = t => t ? Object.keys(t) : [];
  const assignDeep = (t, n, o, s, e, c, r) => {
    const l = [ n, o, s, e, c, r ];
    if ((typeof t !== "object" || isNull(t)) && !isFunction(t)) {
      t = {};
    }
    each(l, (n => {
      each(n, ((o, s) => {
        const e = n[s];
        if (t === e) {
          return true;
        }
        const c = isArray(e);
        if (e && isPlainObject(e)) {
          const n = t[s];
          let o = n;
          if (c && !isArray(n)) {
            o = [];
          } else if (!c && !isPlainObject(n)) {
            o = {};
          }
          t[s] = assignDeep(o, e);
        } else {
          t[s] = c ? e.slice() : e;
        }
      }));
    }));
    return t;
  };
  const removeUndefinedProperties = (t, n) => each(assignDeep({}, t), ((t, n, o) => {
    if (t === void 0) {
      delete o[n];
    } else if (t && isPlainObject(t)) {
      o[n] = removeUndefinedProperties(t);
    }
  }));
  const isEmptyObject = t => !keys(t).length;
  const capNumber = (t, n, o) => s(t, e(n, o));
  const getDomTokensArray = t => deduplicateArray((isArray(t) ? t : (t || "").split(" ")).filter((t => t)));
  const getAttr = (t, n) => t && t.getAttribute(n);
  const hasAttr = (t, n) => t && t.hasAttribute(n);
  const setAttrs = (t, n, o) => {
    each(getDomTokensArray(n), (n => {
      t && t.setAttribute(n, String(o || ""));
    }));
  };
  const removeAttrs = (t, n) => {
    each(getDomTokensArray(n), (n => t && t.removeAttribute(n)));
  };
  const domTokenListAttr = (t, n) => {
    const o = getDomTokensArray(getAttr(t, n));
    const s = bind(setAttrs, t, n);
    const domTokenListOperation = (t, n) => {
      const s = new Set(o);
      each(getDomTokensArray(t), (t => {
        s[n](t);
      }));
      return from(s).join(" ");
    };
    return {
      O: t => s(domTokenListOperation(t, "delete")),
      $: t => s(domTokenListOperation(t, "add")),
      C: t => {
        const n = getDomTokensArray(t);
        return n.reduce(((t, n) => t && o.includes(n)), n.length > 0);
      }
    };
  };
  const removeAttrClass = (t, n, o) => {
    domTokenListAttr(t, n).O(o);
    return bind(addAttrClass, t, n, o);
  };
  const addAttrClass = (t, n, o) => {
    domTokenListAttr(t, n).$(o);
    return bind(removeAttrClass, t, n, o);
  };
  const addRemoveAttrClass = (t, n, o, s) => (s ? addAttrClass : removeAttrClass)(t, n, o);
  const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).C(o);
  const createDomTokenListClass = t => domTokenListAttr(t, "class");
  const removeClass = (t, n) => {
    createDomTokenListClass(t).O(n);
  };
  const addClass = (t, n) => {
    createDomTokenListClass(t).$(n);
    return bind(removeClass, t, n);
  };
  const find = (t, n) => {
    const o = n ? isElement(n) && n : document;
    return o ? from(o.querySelectorAll(t)) : [];
  };
  const findFirst = (t, n) => {
    const o = n ? isElement(n) && n : document;
    return o && o.querySelector(t);
  };
  const is = (t, n) => isElement(t) && t.matches(n);
  const isBodyElement = t => is(t, "body");
  const contents = t => t ? from(t.childNodes) : [];
  const parent = t => t && t.parentElement;
  const closest = (t, n) => isElement(t) && t.closest(n);
  const getFocusedElement = t => document.activeElement;
  const liesBetween = (t, n, o) => {
    const s = closest(t, n);
    const e = t && findFirst(o, s);
    const c = closest(e, n) === s;
    return s && e ? s === t || e === t || c && closest(closest(t, o), n) !== s : false;
  };
  const removeElements = t => {
    each(createOrKeepArray(t), (t => {
      const n = parent(t);
      t && n && n.removeChild(t);
    }));
  };
  const appendChildren = (t, n) => bind(removeElements, t && n && each(createOrKeepArray(n), (n => {
    n && t.appendChild(n);
  })));
  let I;
  const getTrustedTypePolicy = () => I;
  const setTrustedTypePolicy = t => {
    I = t;
  };
  const createDiv = t => {
    const n = document.createElement("div");
    setAttrs(n, "class", t);
    return n;
  };
  const createDOM = t => {
    const n = createDiv();
    const o = getTrustedTypePolicy();
    const s = t.trim();
    n.innerHTML = o ? o.createHTML(s) : s;
    return each(contents(n), (t => removeElements(t)));
  };
  const getCSSVal = (t, n) => t.getPropertyValue(n) || t[n] || "";
  const validFiniteNumber = t => {
    const n = t || 0;
    return isFinite(n) ? n : 0;
  };
  const parseToZeroOrNumber = t => validFiniteNumber(parseFloat(t || ""));
  const roundCssNumber = t => Math.round(t * 1e4) / 1e4;
  const numberToCssPx = t => `${roundCssNumber(validFiniteNumber(t))}px`;
  function setStyles(t, n) {
    t && n && each(n, ((n, o) => {
      try {
        const s = t.style;
        const e = isNull(n) || isBoolean(n) ? "" : isNumber(n) ? numberToCssPx(n) : n;
        if (o.indexOf("--") === 0) {
          s.setProperty(o, e);
        } else {
          s[o] = e;
        }
      } catch (s) {}
    }));
  }
  function getStyles(t, n, s) {
    const e = isString(n);
    let c = e ? "" : {};
    if (t) {
      const r = o.getComputedStyle(t, s) || t.style;
      c = e ? getCSSVal(r, n) : from(n).reduce(((t, n) => {
        t[n] = getCSSVal(r, n);
        return t;
      }), c);
    }
    return c;
  }
  const topRightBottomLeft = (t, n, o) => {
    const s = n ? `${n}-` : "";
    const e = o ? `-${o}` : "";
    const c = `${s}top${e}`;
    const r = `${s}right${e}`;
    const l = `${s}bottom${e}`;
    const i = `${s}left${e}`;
    const a = getStyles(t, [ c, r, l, i ]);
    return {
      t: parseToZeroOrNumber(a[c]),
      r: parseToZeroOrNumber(a[r]),
      b: parseToZeroOrNumber(a[l]),
      l: parseToZeroOrNumber(a[i])
    };
  };
  const getTrasformTranslateValue = (t, n) => `translate${isObject(t) ? `(${t.x},${t.y})` : `${n ? "X" : "Y"}(${t})`}`;
  const elementHasDimensions = t => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
  const A = {
    w: 0,
    h: 0
  };
  const getElmWidthHeightProperty = (t, n) => n ? {
    w: n[`${t}Width`],
    h: n[`${t}Height`]
  } : A;
  const getWindowSize = t => getElmWidthHeightProperty("inner", t || o);
  const D = bind(getElmWidthHeightProperty, "offset");
  const M = bind(getElmWidthHeightProperty, "client");
  const T = bind(getElmWidthHeightProperty, "scroll");
  const getFractionalSize = t => {
    const n = parseFloat(getStyles(t, C)) || 0;
    const o = parseFloat(getStyles(t, x)) || 0;
    return {
      w: n - c(n),
      h: o - c(o)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const hasDimensions = t => !!t && elementHasDimensions(t);
  const domRectHasDimensions = t => !!(t && (t[x] || t[C]));
  const domRectAppeared = (t, n) => {
    const o = domRectHasDimensions(t);
    const s = domRectHasDimensions(n);
    return !s && o;
  };
  const removeEventListener = (t, n, o, s) => {
    each(getDomTokensArray(n), (n => {
      t && t.removeEventListener(n, o, s);
    }));
  };
  const addEventListener = (t, n, o, s) => {
    var e;
    const c = (e = s && s.H) != null ? e : true;
    const r = s && s.I || false;
    const l = s && s.A || false;
    const i = {
      passive: c,
      capture: r
    };
    return bind(runEachAndClear, getDomTokensArray(n).map((n => {
      const s = l ? e => {
        removeEventListener(t, n, s, r);
        o && o(e);
      } : o;
      t && t.addEventListener(n, s, i);
      return bind(removeEventListener, t, n, s, r);
    })));
  };
  const stopPropagation = t => t.stopPropagation();
  const preventDefault = t => t.preventDefault();
  const stopAndPrevent = t => stopPropagation(t) || preventDefault(t);
  const scrollElementTo = (t, n) => {
    const {x: o, y: s} = isNumber(n) ? {
      x: n,
      y: n
    } : n || {};
    isNumber(o) && (t.scrollLeft = o);
    isNumber(s) && (t.scrollTop = s);
  };
  const getElementScroll = t => ({
    x: t.scrollLeft,
    y: t.scrollTop
  });
  const getZeroScrollCoordinates = () => ({
    D: {
      x: 0,
      y: 0
    },
    M: {
      x: 0,
      y: 0
    }
  });
  const sanitizeScrollCoordinates = (t, n) => {
    const {D: o, M: s} = t;
    const {w: e, h: c} = n;
    const sanitizeAxis = (t, n, o) => {
      let s = l(t) * o;
      let e = l(n) * o;
      if (s === e) {
        const o = r(t);
        const c = r(n);
        e = o > c ? 0 : e;
        s = o < c ? 0 : s;
      }
      s = s === e ? 0 : s;
      return [ s + 0, e + 0 ];
    };
    const [i, a] = sanitizeAxis(o.x, s.x, e);
    const [u, _] = sanitizeAxis(o.y, s.y, c);
    return {
      D: {
        x: i,
        y: u
      },
      M: {
        x: a,
        y: _
      }
    };
  };
  const isDefaultDirectionScrollCoordinates = ({D: t, M: n}) => {
    const getAxis = (t, n) => t === 0 && t <= n;
    return {
      x: getAxis(t.x, n.x),
      y: getAxis(t.y, n.y)
    };
  };
  const getScrollCoordinatesPercent = ({D: t, M: n}, o) => {
    const getAxis = (t, n, o) => capNumber(0, 1, (t - o) / (t - n) || 0);
    return {
      x: getAxis(t.x, n.x, o.x),
      y: getAxis(t.y, n.y, o.y)
    };
  };
  const focusElement = t => {
    if (t && t.focus) {
      t.focus({
        preventScroll: true
      });
    }
  };
  const manageListener = (t, n) => {
    each(createOrKeepArray(n), t);
  };
  const createEventListenerHub = t => {
    const n = new Map;
    const removeEvent = (t, o) => {
      if (t) {
        const s = n.get(t);
        manageListener((t => {
          if (s) {
            s[t ? "delete" : "clear"](t);
          }
        }), o);
      } else {
        n.forEach((t => {
          t.clear();
        }));
        n.clear();
      }
    };
    const addEvent = (t, o) => {
      if (isString(t)) {
        const s = n.get(t) || new Set;
        n.set(t, s);
        manageListener((t => {
          isFunction(t) && s.add(t);
        }), o);
        return bind(removeEvent, t, o);
      }
      if (isBoolean(o) && o) {
        removeEvent();
      }
      const s = keys(t);
      const e = [];
      each(s, (n => {
        const o = t[n];
        o && push(e, addEvent(n, o));
      }));
      return bind(runEachAndClear, e);
    };
    const triggerEvent = (t, o) => {
      each(from(n.get(t)), (t => {
        if (o && !isEmptyArray(o)) {
          t.apply(0, o);
        } else {
          t();
        }
      }));
    };
    addEvent(t || {});
    return [ addEvent, removeEvent, triggerEvent ];
  };
  const k = {};
  const R = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      k[o] = t[o];
    }))));
  };
  const registerPluginModuleInstances = (t, n, o) => keys(t).map((s => {
    const {static: e, instance: c} = t[s];
    const [r, l, i] = o || [];
    const a = o ? c : e;
    if (a) {
      const t = o ? a(r, l, n) : a(n);
      return (i || R)[s] = t;
    }
  }));
  const getStaticPluginModuleInstance = t => R[t];
  const V = "__osOptionsValidationPlugin";
  const L = `data-overlayscrollbars`;
  const U = "os-environment";
  const P = `${U}-scrollbar-hidden`;
  const N = `${L}-initialize`;
  const q = "noClipping";
  const j = `${L}-body`;
  const B = L;
  const F = "host";
  const X = `${L}-viewport`;
  const Y = O;
  const W = $;
  const G = "arrange";
  const J = "measuring";
  const K = "scrolling";
  const Q = "scrollbarHidden";
  const Z = "noContent";
  const tt = `${L}-padding`;
  const nt = `${L}-content`;
  const ot = "os-size-observer";
  const st = `${ot}-appear`;
  const et = `${ot}-listener`;
  const ct = `${et}-scroll`;
  const rt = `${et}-item`;
  const lt = `${rt}-final`;
  const it = "os-trinsic-observer";
  const at = "os-theme-none";
  const ut = "os-scrollbar";
  const _t = `${ut}-rtl`;
  const dt = `${ut}-horizontal`;
  const ft = `${ut}-vertical`;
  const vt = `${ut}-track`;
  const pt = `${ut}-handle`;
  const ht = `${ut}-visible`;
  const gt = `${ut}-cornerless`;
  const bt = `${ut}-interaction`;
  const yt = `${ut}-unusable`;
  const wt = `${ut}-auto-hide`;
  const St = `${wt}-hidden`;
  const mt = `${ut}-wheel`;
  const Ot = `${vt}-interactive`;
  const $t = `${pt}-interactive`;
  const Ct = "__osSizeObserverPlugin";
  const xt = /* @__PURE__ */ (() => ({
    [Ct]: {
      static: () => (t, n, o) => {
        const s = 3333333;
        const e = "scroll";
        const c = createDOM(`<div class="${rt}" dir="ltr"><div class="${rt}"><div class="${lt}"></div></div><div class="${rt}"><div class="${lt}" style="width: 200%; height: 200%"></div></div></div>`);
        const r = c[0];
        const l = r.lastChild;
        const u = r.firstChild;
        const _ = u == null ? void 0 : u.firstChild;
        let d = D(r);
        let f = d;
        let v = false;
        let p;
        const reset = () => {
          scrollElementTo(u, s);
          scrollElementTo(l, s);
        };
        const onResized = t => {
          p = 0;
          if (v) {
            d = f;
            n(t === true);
          }
        };
        const onScroll = t => {
          f = D(r);
          v = !t || !equalWH(f, d);
          if (t) {
            stopPropagation(t);
            if (v && !p) {
              i(p);
              p = a(onResized);
            }
          } else {
            onResized(t === false);
          }
          reset();
        };
        const h = [ appendChildren(t, c), addEventListener(u, e, onScroll), addEventListener(l, e, onScroll) ];
        addClass(t, ct);
        setStyles(_, {
          [C]: s,
          [x]: s
        });
        a(reset);
        return [ o ? bind(onScroll, false) : reset, h ];
      }
    }
  }))();
  const getShowNativeOverlaidScrollbars = (t, n) => {
    const {T: o} = n;
    const [s, e] = t("showNativeOverlaidScrollbars");
    return [ s && o.x && o.y, e ];
  };
  const overflowIsVisible = t => t.indexOf(H) === 0;
  const createViewportOverflowState = (t, n) => {
    const getAxisOverflowStyle = (t, n, o, s) => {
      const e = t === H ? E : t.replace(`${H}-`, "");
      const c = overflowIsVisible(t);
      const r = overflowIsVisible(o);
      if (!n && !s) {
        return E;
      }
      if (c && r) {
        return H;
      }
      if (c) {
        const t = n ? H : E;
        return n && s ? e : t;
      }
      const l = r && s ? H : E;
      return n ? e : l;
    };
    const o = {
      x: getAxisOverflowStyle(n.x, t.x, n.y, t.y),
      y: getAxisOverflowStyle(n.y, t.y, n.x, t.x)
    };
    return {
      k: o,
      R: {
        x: o.x === z,
        y: o.y === z
      }
    };
  };
  const Ht = "__osScrollbarsHidingPlugin";
  const Et = /* @__PURE__ */ (() => ({
    [Ht]: {
      static: () => ({
        V: (t, n, o, s, e) => {
          const {L: c, U: r} = t;
          const {P: l, T: i, N: a} = s;
          const u = !c && !l && (i.x || i.y);
          const [_] = getShowNativeOverlaidScrollbars(e, s);
          const readViewportOverflowState = () => {
            const getStatePerAxis = t => {
              const n = getStyles(r, t);
              const o = n === z;
              return [ n, o ];
            };
            const [t, n] = getStatePerAxis(O);
            const [o, s] = getStatePerAxis($);
            return {
              k: {
                x: t,
                y: o
              },
              R: {
                x: n,
                y: s
              }
            };
          };
          const _getViewportOverflowHideOffset = t => {
            const {R: n} = t;
            const o = l || _ ? 0 : 42;
            const getHideOffsetPerAxis = (t, n, s) => {
              const e = t ? o : s;
              const c = n && !l ? e : 0;
              const r = t && !!o;
              return [ c, r ];
            };
            const [s, e] = getHideOffsetPerAxis(i.x, n.x, a.x);
            const [c, r] = getHideOffsetPerAxis(i.y, n.y, a.y);
            return {
              q: {
                x: s,
                y: c
              },
              j: {
                x: e,
                y: r
              }
            };
          };
          const _hideNativeScrollbars = (t, {B: o}, s) => {
            if (!c) {
              const e = assignDeep({}, {
                [S]: 0,
                [m]: 0,
                [w]: 0
              });
              const {q: c, j: r} = _getViewportOverflowHideOffset(t);
              const {x: l, y: i} = r;
              const {x: a, y: u} = c;
              const {F: _} = n;
              const d = o ? w : S;
              const f = o ? b : g;
              const v = _[d];
              const p = _[m];
              const h = _[f];
              const O = _[y];
              e[C] = `calc(100% + ${u + v * -1}px)`;
              e[d] = -u + v;
              e[m] = -a + p;
              if (s) {
                e[f] = h + (i ? u : 0);
                e[y] = O + (l ? a : 0);
              }
              return e;
            }
          };
          const _arrangeViewport = (t, s, e) => {
            if (u) {
              const {F: c} = n;
              const {q: l, j: i} = _getViewportOverflowHideOffset(t);
              const {x: a, y: u} = i;
              const {x: _, y: d} = l;
              const {B: f} = o;
              const v = f ? g : b;
              const p = c[v];
              const h = c.paddingTop;
              const y = s.w + e.w;
              const w = s.h + e.h;
              const S = {
                w: d && u ? `${d + y - p}px` : "",
                h: _ && a ? `${_ + w - h}px` : ""
              };
              setStyles(r, {
                "--os-vaw": S.w,
                "--os-vah": S.h
              });
            }
            return u;
          };
          const _undoViewportArrange = t => {
            if (u) {
              const s = t || readViewportOverflowState();
              const {F: e} = n;
              const {j: c} = _getViewportOverflowHideOffset(s);
              const {x: l, y: i} = c;
              const a = {};
              const assignProps = t => each(t, (t => {
                a[t] = e[t];
              }));
              if (l) {
                assignProps([ m, h, y ]);
              }
              if (i) {
                assignProps([ w, S, b, g ]);
              }
              const _ = getStyles(r, keys(a));
              const d = removeAttrClass(r, X, G);
              setStyles(r, a);
              return [ () => {
                setStyles(r, assignDeep({}, _, _hideNativeScrollbars(s, o, u)));
                d();
              }, s ];
            }
            return [ noop ];
          };
          return {
            X: _getViewportOverflowHideOffset,
            Y: _arrangeViewport,
            W: _undoViewportArrange,
            G: _hideNativeScrollbars
          };
        }
      })
    }
  }))();
  const zt = "__osClickScrollPlugin";
  const It = /* @__PURE__ */ (() => ({
    [zt]: {
      static: () => (t, n, o, s) => {
        let e = false;
        let c = noop;
        const r = 133;
        const l = 222;
        const [i, a] = selfClearTimeout(r);
        const u = Math.sign(n);
        const _ = o * u;
        const d = _ / 2;
        const easing = t => 1 - (1 - t) * (1 - t);
        const easedEndPressAnimation = (n, o) => animateNumber(n, o, l, t, easing);
        const linearPressAnimation = (o, s) => animateNumber(o, n - _, r * s, ((o, s, e) => {
          t(o);
          if (e) {
            c = easedEndPressAnimation(o, n);
          }
        }));
        const f = animateNumber(0, _, l, ((r, l, a) => {
          t(r);
          if (a) {
            s(e);
            if (!e) {
              const t = n - r;
              const s = Math.sign(t - d) === u;
              s && i((() => {
                const s = t - _;
                const e = Math.sign(s) === u;
                c = e ? linearPressAnimation(r, Math.abs(s) / o) : easedEndPressAnimation(r, n);
              }));
            }
          }
        }), easing);
        return t => {
          e = true;
          if (t) {
            f();
          }
          a();
          c();
        };
      }
    }
  }))();
  const opsStringify = t => JSON.stringify(t, ((t, n) => {
    if (isFunction(n)) {
      throw 0;
    }
    return n;
  }));
  const getPropByPath = (t, n) => t ? `${n}`.split(".").reduce(((t, n) => t && hasOwnProperty(t, n) ? t[n] : void 0), t) : void 0;
  const At = {
    paddingAbsolute: false,
    showNativeOverlaidScrollbars: false,
    update: {
      elementEvents: [ [ "img", "load" ] ],
      debounce: [ 0, 33 ],
      attributes: null,
      ignoreMutation: null
    },
    overflow: {
      x: "scroll",
      y: "scroll"
    },
    scrollbars: {
      theme: "os-theme-dark",
      visibility: "auto",
      autoHide: "never",
      autoHideDelay: 1300,
      autoHideSuspend: false,
      dragScroll: true,
      clickScroll: false,
      pointers: [ "mouse", "touch", "pen" ]
    }
  };
  const getOptionsDiff = (t, n) => {
    const o = {};
    const s = concat(keys(n), keys(t));
    each(s, (s => {
      const e = t[s];
      const c = n[s];
      if (isObject(e) && isObject(c)) {
        assignDeep(o[s] = {}, getOptionsDiff(e, c));
        if (isEmptyObject(o[s])) {
          delete o[s];
        }
      } else if (hasOwnProperty(n, s) && c !== e) {
        let t = true;
        if (isArray(e) || isArray(c)) {
          try {
            if (opsStringify(e) === opsStringify(c)) {
              t = false;
            }
          } catch (r) {}
        }
        if (t) {
          o[s] = c;
        }
      }
    }));
    return o;
  };
  const createOptionCheck = (t, n, o) => s => [ getPropByPath(t, s), o || getPropByPath(n, s) !== void 0 ];
  let Dt;
  const getNonce = () => Dt;
  const setNonce = t => {
    Dt = t;
  };
  let Mt;
  const createEnvironment = () => {
    const getNativeScrollbarSize = (t, n, o) => {
      appendChildren(document.body, t);
      appendChildren(document.body, t);
      const s = M(t);
      const e = D(t);
      const c = getFractionalSize(n);
      o && removeElements(t);
      return {
        x: e.h - s.h + c.h,
        y: e.w - s.w + c.w
      };
    };
    const getNativeScrollbarsHiding = t => {
      let n = false;
      const o = addClass(t, P);
      try {
        n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
      } catch (s) {}
      o();
      return n;
    };
    const t = `.${U}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${U} div{width:200%;height:200%;margin:10px 0}.${P}{scrollbar-width:none!important}.${P}::-webkit-scrollbar,.${P}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
    const n = createDOM(`<div class="${U}"><div></div><style>${t}</style></div>`);
    const s = n[0];
    const e = s.firstChild;
    const c = s.lastChild;
    const r = getNonce();
    if (r) {
      c.nonce = r;
    }
    const [l, , i] = createEventListenerHub();
    const [a, u] = createCache({
      o: getNativeScrollbarSize(s, e),
      i: equalXY
    }, bind(getNativeScrollbarSize, s, e, true));
    const [_] = u();
    const d = getNativeScrollbarsHiding(s);
    const f = {
      x: _.x === 0,
      y: _.y === 0
    };
    const v = {
      elements: {
        host: null,
        padding: !d,
        viewport: t => d && isBodyElement(t) && t,
        content: false
      },
      scrollbars: {
        slot: true
      },
      cancel: {
        nativeScrollbarsOverlaid: false,
        body: null
      }
    };
    const h = assignDeep({}, At);
    const g = bind(assignDeep, {}, h);
    const b = bind(assignDeep, {}, v);
    const y = {
      N: _,
      T: f,
      P: d,
      J: !!p,
      K: bind(l, "r"),
      Z: b,
      tt: t => assignDeep(v, t) && b(),
      nt: g,
      ot: t => assignDeep(h, t) && g(),
      st: assignDeep({}, v),
      et: assignDeep({}, h)
    };
    removeAttrs(s, "style");
    removeElements(s);
    addEventListener(o, "resize", (() => {
      i("r", []);
    }));
    if (isFunction(o.matchMedia) && !d && (!f.x || !f.y)) {
      const addZoomListener = t => {
        const n = o.matchMedia(`(resolution: ${o.devicePixelRatio}dppx)`);
        addEventListener(n, "change", (() => {
          t();
          addZoomListener(t);
        }), {
          A: true
        });
      };
      addZoomListener((() => {
        const [t, n] = a();
        assignDeep(y.N, t);
        i("r", [ n ]);
      }));
    }
    return y;
  };
  const getEnvironment = () => {
    if (!Mt) {
      Mt = createEnvironment();
    }
    return Mt;
  };
  const createEventContentChange = (t, n, o) => {
    let s = false;
    const e = o ? new WeakMap : false;
    const destroy = () => {
      s = true;
    };
    const updateElements = c => {
      if (e && o) {
        const r = o.map((n => {
          const [o, s] = n || [];
          const e = s && o ? (c || find)(o, t) : [];
          return [ e, s ];
        }));
        each(r, (o => each(o[0], (c => {
          const r = o[1];
          const l = e.get(c) || [];
          const i = t.contains(c);
          if (i && r) {
            const t = addEventListener(c, r, (o => {
              if (s) {
                t();
                e.delete(c);
              } else {
                n(o);
              }
            }));
            e.set(c, push(l, t));
          } else {
            runEachAndClear(l);
            e.delete(c);
          }
        }))));
      }
    };
    updateElements();
    return [ destroy, updateElements ];
  };
  const createDOMObserver = (t, n, o, s) => {
    let e = false;
    const {ct: c, rt: r, lt: l, it: i, ut: a, _t: u} = s || {};
    const _ = debounce((() => e && o(true)), {
      _: 33,
      v: 99
    });
    const [f, v] = createEventContentChange(t, _, l);
    const p = c || [];
    const h = r || [];
    const g = concat(p, h);
    const observerCallback = (e, c) => {
      if (!isEmptyArray(c)) {
        const r = a || noop;
        const l = u || noop;
        const _ = [];
        const d = [];
        let f = false;
        let p = false;
        each(c, (o => {
          const {attributeName: e, target: c, type: a, oldValue: u, addedNodes: v, removedNodes: g} = o;
          const b = a === "attributes";
          const y = a === "childList";
          const w = t === c;
          const S = b && e;
          const m = S && getAttr(c, e || "");
          const O = isString(m) ? m : null;
          const $ = S && u !== O;
          const C = inArray(h, e) && $;
          if (n && (y || !w)) {
            const n = b && $;
            const a = n && i && is(c, i);
            const d = a ? !r(c, e, u, O) : !b || n;
            const f = d && !l(o, !!a, t, s);
            each(v, (t => push(_, t)));
            each(g, (t => push(_, t)));
            p = p || f;
          }
          if (!n && w && $ && !r(c, e, u, O)) {
            push(d, e);
            f = f || C;
          }
        }));
        v((t => deduplicateArray(_).reduce(((n, o) => {
          push(n, find(t, o));
          return is(o, t) ? push(n, o) : n;
        }), [])));
        if (n) {
          !e && p && o(false);
          return [ false ];
        }
        if (!isEmptyArray(d) || f) {
          const t = [ deduplicateArray(d), f ];
          !e && o.apply(0, t);
          return t;
        }
      }
    };
    const b = new d(bind(observerCallback, false));
    return [ () => {
      b.observe(t, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: g,
        subtree: n,
        childList: n,
        characterData: n
      });
      e = true;
      return () => {
        if (e) {
          f();
          b.disconnect();
          e = false;
        }
      };
    }, () => {
      if (e) {
        _.m();
        return observerCallback(true, b.takeRecords());
      }
    } ];
  };
  const createSizeObserver = (t, n, o) => {
    const {dt: s} = o || {};
    const e = getStaticPluginModuleInstance(Ct);
    const [c] = createCache({
      o: false,
      u: true
    });
    return () => {
      const o = [];
      const r = createDOM(`<div class="${ot}"><div class="${et}"></div></div>`);
      const l = r[0];
      const i = l.firstChild;
      const onSizeChangedCallbackProxy = t => {
        const o = t instanceof ResizeObserverEntry;
        let s = false;
        let e = false;
        if (o) {
          const [n, , o] = c(t.contentRect);
          const r = domRectHasDimensions(n);
          e = domRectAppeared(n, o);
          s = !e && !r;
        } else {
          e = t === true;
        }
        if (!s) {
          n({
            ft: true,
            dt: e
          });
        }
      };
      if (v) {
        const t = new v((t => onSizeChangedCallbackProxy(t.pop())));
        t.observe(i);
        push(o, (() => {
          t.disconnect();
        }));
      } else if (e) {
        const [t, n] = e(i, onSizeChangedCallbackProxy, s);
        push(o, concat([ addClass(l, st), addEventListener(l, "animationstart", t) ], n));
      } else {
        return noop;
      }
      return bind(runEachAndClear, push(o, appendChildren(t, l)));
    };
  };
  const createTrinsicObserver = (t, n) => {
    let o;
    const isHeightIntrinsic = t => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;
    const s = createDiv(it);
    const [e] = createCache({
      o: false
    });
    const triggerOnTrinsicChangedCallback = (t, o) => {
      if (t) {
        const s = e(isHeightIntrinsic(t));
        const [, c] = s;
        return c && !o && n(s) && [ s ];
      }
    };
    const intersectionObserverCallback = (t, n) => triggerOnTrinsicChangedCallback(n.pop(), t);
    return [ () => {
      const n = [];
      if (f) {
        o = new f(bind(intersectionObserverCallback, false), {
          root: t
        });
        o.observe(s);
        push(n, (() => {
          o.disconnect();
        }));
      } else {
        const onSizeChanged = () => {
          const t = D(s);
          triggerOnTrinsicChangedCallback(t);
        };
        push(n, createSizeObserver(s, onSizeChanged)());
        onSizeChanged();
      }
      return bind(runEachAndClear, push(n, appendChildren(t, s)));
    }, () => o && intersectionObserverCallback(true, o.takeRecords()) ];
  };
  const createObserversSetup = (t, n, o, s) => {
    let e;
    let c;
    let r;
    let l;
    let i;
    let a;
    const u = `[${B}]`;
    const _ = `[${X}]`;
    const d = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
    const {vt: f, ht: p, U: h, gt: g, bt: b, L: y, yt: w, wt: S, St: m, Ot: O} = t;
    const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
    const $ = {
      $t: false,
      B: getDirectionIsRTL(f)
    };
    const C = getEnvironment();
    const x = getStaticPluginModuleInstance(Ht);
    const [H] = createCache({
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const s = x && x.V(t, n, $, C, o).W;
      const e = w && y;
      const c = !e && hasAttrClass(p, B, q);
      const r = !y && S(G);
      const l = r && getElementScroll(g);
      const i = l && O();
      const a = m(J, c);
      const u = r && s && s()[0];
      const _ = T(h);
      const d = getFractionalSize(h);
      u && u();
      scrollElementTo(g, l);
      i && i();
      c && a();
      return {
        w: _.w + d.w,
        h: _.h + d.h
      };
    }));
    const E = debounce(s, {
      _: () => e,
      v: () => c,
      S(t, n) {
        const [o] = t;
        const [s] = n;
        return [ concat(keys(o), keys(s)).reduce(((t, n) => {
          t[n] = o[n] || s[n];
          return t;
        }), {}) ];
      }
    });
    const setDirection = t => {
      const n = getDirectionIsRTL(f);
      assignDeep(t, {
        Ct: a !== n
      });
      assignDeep($, {
        B: n
      });
      a = n;
    };
    const onTrinsicChanged = (t, n) => {
      const [o, e] = t;
      const c = {
        xt: e
      };
      assignDeep($, {
        $t: o
      });
      !n && s(c);
      return c;
    };
    const onSizeChanged = ({ft: t, dt: n}) => {
      const o = t && !n;
      const e = !o && C.P ? E : s;
      const c = {
        ft: t || n,
        dt: n
      };
      setDirection(c);
      e(c);
    };
    const onContentMutation = (t, n) => {
      const [, o] = H();
      const e = {
        Ht: o
      };
      setDirection(e);
      const c = t ? s : E;
      o && !n && c(e);
      return e;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        Et: n
      };
      setDirection(s);
      if (n && !o) {
        E(s);
      }
      return s;
    };
    const [z, I] = b ? createTrinsicObserver(p, onTrinsicChanged) : [];
    const A = !y && createSizeObserver(p, onSizeChanged, {
      dt: true
    });
    const [D, M] = createDOMObserver(p, false, onHostMutation, {
      rt: d,
      ct: d
    });
    const k = y && v && new v((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        ft: true,
        dt: domRectAppeared(n, i)
      });
      i = n;
    }));
    const R = debounce((() => {
      const [, t] = H();
      s({
        Ht: t
      });
    }), {
      _: 222,
      p: true
    });
    return [ () => {
      k && k.observe(p);
      const t = A && A();
      const n = z && z();
      const o = D();
      const s = C.K((t => {
        if (t) {
          E({
            zt: t
          });
        } else {
          R();
        }
      }));
      return () => {
        k && k.disconnect();
        t && t();
        n && n();
        l && l();
        o();
        s();
      };
    }, ({It: t, At: n, Dt: o}) => {
      const s = {};
      const [i] = t("update.ignoreMutation");
      const [a, f] = t("update.attributes");
      const [v, p] = t("update.elementEvents");
      const [g, w] = t("update.debounce");
      const S = p || f;
      const m = n || o;
      const ignoreMutationFromOptions = t => isFunction(i) && i(t);
      if (S) {
        r && r();
        l && l();
        const [t, n] = createDOMObserver(b || h, true, onContentMutation, {
          ct: concat(d, a || []),
          lt: v,
          it: u,
          _t: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !y ? liesBetween(o, u, _) : false;
            return e || !!closest(o, `.${ut}`) || !!ignoreMutationFromOptions(t);
          }
        });
        l = t();
        r = n;
      }
      if (w) {
        E.m();
        if (isArray(g)) {
          const t = g[0];
          const n = g[1];
          e = isNumber(t) && t;
          c = isNumber(n) && n;
        } else if (isNumber(g)) {
          e = g;
          c = false;
        } else {
          e = false;
          c = false;
        }
      }
      if (m) {
        const t = M();
        const n = I && I();
        const o = r && r();
        t && assignDeep(s, onHostMutation(t[0], t[1], m));
        n && assignDeep(s, onTrinsicChanged(n[0], m));
        o && assignDeep(s, onContentMutation(o[0], m));
      }
      setDirection(s);
      return s;
    }, $ ];
  };
  const resolveInitialization = (t, n) => isFunction(n) ? n.apply(0, t) : n;
  const staticInitializationElement = (t, n, o, s) => {
    const e = isUndefined(s) ? o : s;
    const c = resolveInitialization(t, e);
    return c || n.apply(0, t);
  };
  const dynamicInitializationElement = (t, n, o, s) => {
    const e = isUndefined(s) ? o : s;
    const c = resolveInitialization(t, e);
    return !!c && (isHTMLElement(c) ? c : n.apply(0, t));
  };
  const cancelInitialization = (t, n) => {
    const {nativeScrollbarsOverlaid: o, body: s} = n || {};
    const {T: e, P: c, Z: r} = getEnvironment();
    const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
    const a = o != null ? o : l;
    const u = isUndefined(s) ? i : s;
    const _ = (e.x || e.y) && a;
    const d = t && (isNull(u) ? !c : u);
    return !!_ || !!d;
  };
  const createScrollbarsSetupElements = (t, n, o, s) => {
    const e = "--os-viewport-percent";
    const c = "--os-scroll-percent";
    const r = "--os-scroll-direction";
    const {Z: l} = getEnvironment();
    const {scrollbars: i} = l();
    const {slot: a} = i;
    const {vt: u, ht: _, U: d, Mt: f, gt: v, yt: h, L: g} = n;
    const {scrollbars: b} = f ? {} : t;
    const {slot: y} = b || {};
    const w = [];
    const S = [];
    const m = [];
    const O = dynamicInitializationElement([ u, _, d ], (() => g && h ? u : _), a, y);
    const initScrollTimeline = t => {
      if (p) {
        let n = null;
        let s = [];
        const e = new p({
          source: v,
          axis: t
        });
        const cancelAnimation = () => {
          n && n.cancel();
          n = null;
        };
        const _setScrollPercentAnimation = c => {
          const {Tt: r} = o;
          const l = isDefaultDirectionScrollCoordinates(r)[t];
          const i = t === "x";
          const a = [ getTrasformTranslateValue(0, i), getTrasformTranslateValue(`calc(100cq${i ? "w" : "h"} + -100%)`, i) ];
          const u = l ? a : a.reverse();
          if (s[0] === u[0] && s[1] === u[1]) {
            return cancelAnimation;
          }
          cancelAnimation();
          s = u;
          n = c.kt.animate({
            clear: [ "left" ],
            transform: u
          }, {
            timeline: e
          });
          return cancelAnimation;
        };
        return {
          Rt: _setScrollPercentAnimation
        };
      }
    };
    const $ = {
      x: initScrollTimeline("x"),
      y: initScrollTimeline("y")
    };
    const getViewportPercent = () => {
      const {Vt: t, Lt: n} = o;
      const getAxisValue = (t, n) => capNumber(0, 1, t / (t + n) || 0);
      return {
        x: getAxisValue(n.x, t.x),
        y: getAxisValue(n.y, t.y)
      };
    };
    const scrollbarStructureAddRemoveClass = (t, n, o) => {
      const s = o ? addClass : removeClass;
      each(t, (t => {
        s(t.Ut, n);
      }));
    };
    const scrollbarStyle = (t, n) => {
      each(t, (t => {
        const [o, s] = n(t);
        setStyles(o, s);
      }));
    };
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      e && scrollbarStructureAddRemoveClass(S, t, n);
      c && scrollbarStructureAddRemoveClass(m, t, n);
    };
    const refreshScrollbarsHandleLength = () => {
      const t = getViewportPercent();
      const createScrollbarStyleFn = t => n => [ n.Ut, {
        [e]: roundCssNumber(t) + ""
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(t.x));
      scrollbarStyle(m, createScrollbarStyleFn(t.y));
    };
    const refreshScrollbarsHandleOffset = () => {
      if (!p) {
        const {Tt: t} = o;
        const n = getScrollCoordinatesPercent(t, getElementScroll(v));
        const createScrollbarStyleFn = t => n => [ n.Ut, {
          [c]: roundCssNumber(t) + ""
        } ];
        scrollbarStyle(S, createScrollbarStyleFn(n.x));
        scrollbarStyle(m, createScrollbarStyleFn(n.y));
      }
    };
    const refreshScrollbarsScrollCoordinates = () => {
      const {Tt: t} = o;
      const n = isDefaultDirectionScrollCoordinates(t);
      const createScrollbarStyleFn = t => n => [ n.Ut, {
        [r]: t ? "0" : "1"
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(n.x));
      scrollbarStyle(m, createScrollbarStyleFn(n.y));
      if (p) {
        S.forEach($.x.Rt);
        m.forEach($.y.Rt);
      }
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (g && !h) {
        const {Vt: t, Tt: n} = o;
        const s = isDefaultDirectionScrollCoordinates(n);
        const e = getScrollCoordinatesPercent(n, getElementScroll(v));
        const styleScrollbarPosition = n => {
          const {Ut: o} = n;
          const c = parent(o) === d && o;
          const getTranslateValue = (t, n, o) => {
            const s = n * t;
            return numberToCssPx(o ? s : -s);
          };
          return [ c, c && {
            transform: getTrasformTranslateValue({
              x: getTranslateValue(e.x, t.x, s.x),
              y: getTranslateValue(e.y, t.y, s.y)
            })
          } ];
        };
        scrollbarStyle(S, styleScrollbarPosition);
        scrollbarStyle(m, styleScrollbarPosition);
      }
    };
    const generateScrollbarDOM = t => {
      const n = t ? "x" : "y";
      const o = t ? dt : ft;
      const e = createDiv(`${ut} ${o}`);
      const c = createDiv(vt);
      const r = createDiv(pt);
      const l = {
        Ut: e,
        Pt: c,
        kt: r
      };
      const i = $[n];
      push(t ? S : m, l);
      push(w, [ appendChildren(e, c), appendChildren(c, r), bind(removeElements, e), i && i.Rt(l), s(l, scrollbarsAddRemoveClass, t) ]);
      return l;
    };
    const C = bind(generateScrollbarDOM, true);
    const x = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(O, S[0].Ut);
      appendChildren(O, m[0].Ut);
      return bind(runEachAndClear, w);
    };
    C();
    x();
    return [ {
      Nt: refreshScrollbarsHandleLength,
      qt: refreshScrollbarsHandleOffset,
      jt: refreshScrollbarsScrollCoordinates,
      Bt: refreshScrollbarsScrollbarOffset,
      Ft: scrollbarsAddRemoveClass,
      Xt: {
        Yt: S,
        Wt: C,
        Gt: bind(scrollbarStyle, S)
      },
      Jt: {
        Yt: m,
        Wt: x,
        Gt: bind(scrollbarStyle, m)
      }
    }, appendElements ];
  };
  const createScrollbarsSetupEvents = (t, n, o, s) => (e, l, i) => {
    const {ht: a, U: _, L: d, gt: f, Kt: v, Ot: p} = n;
    const {Ut: h, Pt: g, kt: b} = e;
    const [y, w] = selfClearTimeout(333);
    const [S, m] = selfClearTimeout(444);
    const scrollOffsetElementScrollBy = t => {
      isFunction(f.scrollBy) && f.scrollBy({
        behavior: "smooth",
        left: t.x,
        top: t.y
      });
    };
    const createInteractiveScrollEvents = () => {
      const n = "pointerup pointercancel lostpointercapture";
      const s = `client${i ? "X" : "Y"}`;
      const e = i ? C : x;
      const l = i ? "left" : "top";
      const a = i ? "w" : "h";
      const u = i ? "x" : "y";
      const createRelativeHandleMove = (t, n) => s => {
        const {Vt: e} = o;
        const c = D(g)[a] - D(b)[a];
        const r = n * s / c;
        const l = r * e[u];
        scrollElementTo(f, {
          [u]: t + l
        });
      };
      const _ = [];
      return addEventListener(g, "pointerdown", (o => {
        const i = closest(o.target, `.${pt}`) === b;
        const d = i ? b : g;
        const h = t.scrollbars;
        const y = h[i ? "dragScroll" : "clickScroll"];
        const {button: w, isPrimary: O, pointerType: $} = o;
        const {pointers: C} = h;
        const x = w === 0 && O && y && (C || []).includes($);
        if (x) {
          runEachAndClear(_);
          m();
          const t = !i && (o.shiftKey || y === "instant");
          const h = bind(getBoundingClientRect, b);
          const w = bind(getBoundingClientRect, g);
          const getHandleOffset = (t, n) => (t || h())[l] - (n || w())[l];
          const O = c(getBoundingClientRect(f)[e]) / D(f)[a] || 1;
          const $ = createRelativeHandleMove(getElementScroll(f)[u], 1 / O);
          const C = o[s];
          const x = h();
          const H = w();
          const E = x[e];
          const z = getHandleOffset(x, H) + E / 2;
          const I = C - H[l];
          const A = i ? 0 : I - z;
          const releasePointerCapture = t => {
            runEachAndClear(k);
            d.releasePointerCapture(t.pointerId);
          };
          const M = i || t;
          const T = p();
          const k = [ addEventListener(v, n, releasePointerCapture), addEventListener(v, "selectstart", (t => preventDefault(t)), {
            H: false
          }), addEventListener(g, n, releasePointerCapture), M && addEventListener(g, "pointermove", (t => $(A + (t[s] - C)))), M && (() => {
            const t = getElementScroll(f);
            T();
            const n = getElementScroll(f);
            const o = {
              x: n.x - t.x,
              y: n.y - t.y
            };
            if (r(o.x) > 3 || r(o.y) > 3) {
              p();
              scrollElementTo(f, t);
              scrollOffsetElementScrollBy(o);
              S(T);
            }
          }) ];
          d.setPointerCapture(o.pointerId);
          if (t) {
            $(A);
          } else if (!i) {
            const t = getStaticPluginModuleInstance(zt);
            if (t) {
              const n = t($, A, E, (t => {
                if (t) {
                  T();
                } else {
                  push(k, T);
                }
              }));
              push(k, n);
              push(_, bind(n, true));
            }
          }
        }
      }));
    };
    let O = true;
    return bind(runEachAndClear, [ addEventListener(b, "pointermove pointerleave", s), addEventListener(h, "pointerenter", (() => {
      l(bt, true);
    })), addEventListener(h, "pointerleave pointercancel", (() => {
      l(bt, false);
    })), !d && addEventListener(h, "mousedown", (() => {
      const t = getFocusedElement();
      if (hasAttr(t, X) || hasAttr(t, B) || t === document.body) {
        u(bind(focusElement, _), 25);
      }
    })), addEventListener(h, "wheel", (t => {
      const {deltaX: n, deltaY: o, deltaMode: s} = t;
      if (O && s === 0 && parent(h) === a) {
        scrollOffsetElementScrollBy({
          x: n,
          y: o
        });
      }
      O = false;
      l(mt, true);
      y((() => {
        O = true;
        l(mt);
      }));
      preventDefault(t);
    }), {
      H: false,
      I: true
    }), addEventListener(h, "pointerdown", bind(addEventListener, v, "click", stopAndPrevent, {
      A: true,
      I: true,
      H: false
    }), {
      I: true
    }), createInteractiveScrollEvents(), w, m ]);
  };
  const createScrollbarsSetup = (t, n, o, s, e, c) => {
    let r;
    let l;
    let i;
    let a;
    let u;
    let _ = noop;
    let d = 0;
    const f = [ "mouse", "pen" ];
    const isHoverablePointerType = t => f.includes(t.pointerType);
    const [v, p] = selfClearTimeout();
    const [h, g] = selfClearTimeout(100);
    const [b, y] = selfClearTimeout(100);
    const [w, S] = selfClearTimeout((() => d));
    const [m, O] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
    const {ht: $, Qt: C, yt: x} = e;
    const {Ft: E, Nt: I, qt: A, jt: D, Bt: M} = m;
    const manageScrollbarsAutoHide = (t, n) => {
      S();
      if (t) {
        E(St);
      } else {
        const t = bind(E, St, true);
        if (d > 0 && !n) {
          w(t);
        } else {
          t();
        }
      }
    };
    const manageScrollbarsAutoHideInstantInteraction = () => {
      if (i ? !r : !a) {
        manageScrollbarsAutoHide(true);
        h((() => {
          manageScrollbarsAutoHide(false);
        }));
      }
    };
    const manageAutoHideSuspension = t => {
      E(wt, t, true);
      E(wt, t, false);
    };
    const onHostMouseEnter = t => {
      if (isHoverablePointerType(t)) {
        r = i;
        i && manageScrollbarsAutoHide(true);
      }
    };
    const T = [ S, g, y, p, () => _(), addEventListener($, "pointerover", onHostMouseEnter, {
      A: true
    }), addEventListener($, "pointerenter", onHostMouseEnter), addEventListener($, "pointerleave", (t => {
      if (isHoverablePointerType(t)) {
        r = false;
        i && manageScrollbarsAutoHide(false);
      }
    })), addEventListener($, "pointermove", (t => {
      isHoverablePointerType(t) && l && manageScrollbarsAutoHideInstantInteraction();
    })), addEventListener(C, "scroll", (t => {
      v((() => {
        A();
        manageScrollbarsAutoHideInstantInteraction();
      }));
      c(t);
      M();
    })) ];
    return [ () => bind(runEachAndClear, push(T, O())), ({It: t, Dt: n, Zt: e, tn: c}) => {
      const {nn: r, sn: f, en: v, cn: p} = c || {};
      const {Ct: h, dt: g} = e || {};
      const {B: y} = o;
      const {T: w} = getEnvironment();
      const {k: S, rn: m} = s;
      const [O, $] = t("showNativeOverlaidScrollbars");
      const [T, k] = t("scrollbars.theme");
      const [R, V] = t("scrollbars.visibility");
      const [L, U] = t("scrollbars.autoHide");
      const [P, N] = t("scrollbars.autoHideSuspend");
      const [q] = t("scrollbars.autoHideDelay");
      const [j, B] = t("scrollbars.dragScroll");
      const [F, X] = t("scrollbars.clickScroll");
      const [Y, W] = t("overflow");
      const G = g && !n;
      const J = m.x || m.y;
      const K = r || f || p || h || n;
      const Q = v || V || W;
      const Z = O && w.x && w.y;
      const setScrollbarVisibility = (t, n, o) => {
        const s = t.includes(z) && (R === H || R === "auto" && n === z);
        E(ht, s, o);
        return s;
      };
      d = q;
      if (G) {
        if (P && J) {
          manageAutoHideSuspension(false);
          _();
          b((() => {
            _ = addEventListener(C, "scroll", bind(manageAutoHideSuspension, true), {
              A: true
            });
          }));
        } else {
          manageAutoHideSuspension(true);
        }
      }
      if ($) {
        E(at, Z);
      }
      if (k) {
        E(u);
        E(T, true);
        u = T;
      }
      if (N && !P) {
        manageAutoHideSuspension(true);
      }
      if (U) {
        l = L === "move";
        i = L === "leave";
        a = L === "never";
        manageScrollbarsAutoHide(a, true);
      }
      if (B) {
        E($t, j);
      }
      if (X) {
        E(Ot, !!F);
      }
      if (Q) {
        const t = setScrollbarVisibility(Y.x, S.x, true);
        const n = setScrollbarVisibility(Y.y, S.y, false);
        const o = t && n;
        E(gt, !o);
      }
      if (K) {
        A();
        I();
        M();
        p && D();
        E(yt, !m.x, true);
        E(yt, !m.y, false);
        E(_t, y && !x);
      }
    }, {}, m ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {Z: s, P: e} = n;
    const {elements: c} = s();
    const {padding: r, viewport: l, content: i} = c;
    const a = isHTMLElement(t);
    const u = a ? {} : t;
    const {elements: _} = u;
    const {padding: d, viewport: f, content: v} = _ || {};
    const p = a ? t : u.target;
    const h = isBodyElement(p);
    const g = p.ownerDocument;
    const b = g.documentElement;
    const getDocumentWindow = () => g.defaultView || o;
    const y = bind(staticInitializationElement, [ p ]);
    const w = bind(dynamicInitializationElement, [ p ]);
    const S = bind(createDiv, "");
    const m = bind(y, S, l);
    const C = bind(w, S, i);
    const elementHasOverflow = t => {
      const n = D(t);
      const o = T(t);
      const s = getStyles(t, O);
      const e = getStyles(t, $);
      return o.w - n.w > 0 && !overflowIsVisible(s) || o.h - n.h > 0 && !overflowIsVisible(e);
    };
    const x = m(f);
    const H = x === p;
    const E = H && h;
    const z = !H && C(v);
    const I = !H && x === z;
    const A = E ? b : x;
    const M = E ? A : p;
    const k = !H && w(S, r, d);
    const R = !I && z;
    const V = [ R, A, k, M ].map((t => isHTMLElement(t) && !parent(t) && t));
    const elementIsGenerated = t => t && inArray(V, t);
    const L = !elementIsGenerated(A) && elementHasOverflow(A) ? A : p;
    const U = E ? b : A;
    const P = E ? g : A;
    const q = {
      vt: p,
      ht: M,
      U: A,
      ln: k,
      bt: R,
      gt: U,
      Qt: P,
      an: h ? b : L,
      Kt: g,
      yt: h,
      Mt: a,
      L: H,
      un: getDocumentWindow,
      wt: t => hasAttrClass(A, X, t),
      St: (t, n) => addRemoveAttrClass(A, X, t, n),
      Ot: () => addRemoveAttrClass(U, X, K, true)
    };
    const {vt: Y, ht: W, ln: G, U: J, bt: Z} = q;
    const ot = [ () => {
      removeAttrs(W, [ B, N ]);
      removeAttrs(Y, N);
      if (h) {
        removeAttrs(b, [ N, B ]);
      }
    } ];
    let st = contents([ Z, J, G, W, Y ].find((t => t && !elementIsGenerated(t))));
    const et = E ? Y : Z || J;
    const ct = bind(runEachAndClear, ot);
    const appendElements = () => {
      const t = getDocumentWindow();
      const n = getFocusedElement();
      const unwrap = t => {
        appendChildren(parent(t), contents(t));
        removeElements(t);
      };
      const prepareWrapUnwrapFocus = t => addEventListener(t, "focusin focusout focus blur", stopAndPrevent, {
        I: true,
        H: false
      });
      const o = "tabindex";
      const s = getAttr(J, o);
      const c = prepareWrapUnwrapFocus(n);
      setAttrs(W, B, H ? "" : F);
      setAttrs(G, tt, "");
      setAttrs(J, X, "");
      setAttrs(Z, nt, "");
      if (!H) {
        setAttrs(J, o, s || "-1");
        h && setAttrs(b, j, "");
      }
      appendChildren(et, st);
      appendChildren(W, G);
      appendChildren(G || W, !H && J);
      appendChildren(J, Z);
      push(ot, [ c, () => {
        const t = getFocusedElement();
        const n = elementIsGenerated(J);
        const e = n && t === J ? Y : t;
        const c = prepareWrapUnwrapFocus(e);
        removeAttrs(G, tt);
        removeAttrs(Z, nt);
        removeAttrs(J, X);
        h && removeAttrs(b, j);
        s ? setAttrs(J, o, s) : removeAttrs(J, o);
        elementIsGenerated(Z) && unwrap(Z);
        n && unwrap(J);
        elementIsGenerated(G) && unwrap(G);
        focusElement(e);
        c();
      } ]);
      if (e && !H) {
        addAttrClass(J, X, Q);
        push(ot, bind(removeAttrs, J, X));
      }
      focusElement(!H && h && n === Y && t.top === t ? J : n);
      c();
      st = 0;
      return ct;
    };
    return [ q, appendElements, ct ];
  };
  const createTrinsicUpdateSegment = ({bt: t}) => ({Zt: n, _n: o, Dt: s}) => {
    const {xt: e} = n || {};
    const {$t: c} = o;
    const r = t && (e || s);
    if (r) {
      setStyles(t, {
        [x]: c && "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({ht: t, ln: n, U: o, L: s}, e) => {
    const [c, r] = createCache({
      i: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({It: t, Zt: l, _n: i, Dt: a}) => {
      let [u, _] = r(a);
      const {P: d} = getEnvironment();
      const {ft: f, Ht: v, Ct: p} = l || {};
      const {B: O} = i;
      const [$, x] = t("paddingAbsolute");
      const H = a || v;
      if (f || _ || H) {
        [u, _] = c(a);
      }
      const E = !s && (x || p || _);
      if (E) {
        const t = !$ || !n && !d;
        const s = u.r + u.l;
        const c = u.t + u.b;
        const r = {
          [S]: t && !O ? -s : 0,
          [m]: t ? -c : 0,
          [w]: t && O ? -s : 0,
          top: t ? -u.t : 0,
          right: t ? O ? -u.r : "auto" : 0,
          left: t ? O ? "auto" : -u.l : 0,
          [C]: t && `calc(100% + ${s}px)`
        };
        const l = {
          [h]: t ? u.t : 0,
          [g]: t ? u.r : 0,
          [y]: t ? u.b : 0,
          [b]: t ? u.l : 0
        };
        setStyles(n || o, r);
        setStyles(o, l);
        assignDeep(e, {
          ln: u,
          dn: !t,
          F: n ? l : assignDeep({}, r, l)
        });
      }
      return {
        fn: E
      };
    };
  };
  const createOverflowUpdateSegment = (t, n) => {
    const e = getEnvironment();
    const {ht: c, ln: r, U: l, L: i, Qt: u, gt: _, yt: d, St: f, un: v} = t;
    const {P: p} = e;
    const h = d && i;
    const g = bind(s, 0);
    const b = {
      display: () => false,
      direction: t => t !== "ltr",
      flexDirection: t => t.endsWith("-reverse"),
      writingMode: t => t !== "horizontal-tb"
    };
    const y = keys(b);
    const w = {
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    };
    const S = {
      i: equalXY,
      o: {}
    };
    const setMeasuringMode = t => {
      f(J, !h && t);
    };
    const getMeasuredScrollCoordinates = t => {
      const n = y.some((n => {
        const o = t[n];
        return o && b[n](o);
      }));
      if (!n) {
        return {
          D: {
            x: 0,
            y: 0
          },
          M: {
            x: 1,
            y: 1
          }
        };
      }
      setMeasuringMode(true);
      const o = getElementScroll(_);
      const s = f(Z, true);
      const e = addEventListener(u, z, (t => {
        const n = getElementScroll(_);
        if (t.isTrusted && n.x === o.x && n.y === o.y) {
          stopPropagation(t);
        }
      }), {
        I: true,
        A: true
      });
      scrollElementTo(_, {
        x: 0,
        y: 0
      });
      s();
      const c = getElementScroll(_);
      const r = T(_);
      scrollElementTo(_, {
        x: r.w,
        y: r.h
      });
      const l = getElementScroll(_);
      scrollElementTo(_, {
        x: l.x - c.x < 1 && -r.w,
        y: l.y - c.y < 1 && -r.h
      });
      const i = getElementScroll(_);
      scrollElementTo(_, o);
      a((() => e()));
      return {
        D: c,
        M: i
      };
    };
    const getOverflowAmount = (t, n) => {
      const s = o.devicePixelRatio % 1 !== 0 ? 1 : 0;
      const e = {
        w: g(t.w - n.w),
        h: g(t.h - n.h)
      };
      return {
        w: e.w > s ? e.w : 0,
        h: e.h > s ? e.h : 0
      };
    };
    const [m, O] = createCache(w, bind(getFractionalSize, l));
    const [$, C] = createCache(w, bind(T, l));
    const [x, I] = createCache(w);
    const [A] = createCache(S);
    const [D, k] = createCache(w);
    const [R] = createCache(S);
    const [V] = createCache({
      i: (t, n) => equal(t, n, y),
      o: {}
    }, (() => hasDimensions(l) ? getStyles(l, y) : {}));
    const [L, U] = createCache({
      i: (t, n) => equalXY(t.D, n.D) && equalXY(t.M, n.M),
      o: getZeroScrollCoordinates()
    });
    const P = getStaticPluginModuleInstance(Ht);
    const createViewportOverflowStyleClassName = (t, n) => {
      const o = n ? Y : W;
      return `${o}${capitalizeFirstLetter(t)}`;
    };
    const setViewportOverflowStyle = t => {
      const createAllOverflowStyleClassNames = t => [ H, E, z ].map((n => createViewportOverflowStyleClassName(n, t)));
      const n = createAllOverflowStyleClassNames(true).concat(createAllOverflowStyleClassNames()).join(" ");
      f(n);
      f(keys(t).map((n => createViewportOverflowStyleClassName(t[n], n === "x"))).join(" "), true);
    };
    return ({It: o, Zt: s, _n: i, Dt: a}, {fn: u}) => {
      const {ft: _, Ht: d, Ct: b, dt: y, zt: w} = s || {};
      const S = P && P.V(t, n, i, e, o);
      const {Y: H, W: E, G: z} = S || {};
      const [T, N] = getShowNativeOverlaidScrollbars(o, e);
      const [j, F] = o("overflow");
      const X = overflowIsVisible(j.x);
      const Y = overflowIsVisible(j.y);
      const W = true;
      let G = O(a);
      let J = C(a);
      let K = I(a);
      let Z = k(a);
      if (N && p) {
        f(Q, !T);
      }
      {
        if (hasAttrClass(c, B, q)) {
          setMeasuringMode(true);
        }
        const [t] = E ? E() : [];
        const [n] = G = m(a);
        const [o] = J = $(a);
        const s = M(l);
        const e = h && getWindowSize(v());
        const r = {
          w: g(o.w + n.w),
          h: g(o.h + n.h)
        };
        const i = {
          w: g((e ? e.w : s.w + g(s.w - o.w)) + n.w),
          h: g((e ? e.h : s.h + g(s.h - o.h)) + n.h)
        };
        t && t();
        Z = D(i);
        K = x(getOverflowAmount(r, i), a);
      }
      const [nt, ot] = Z;
      const [st, et] = K;
      const [ct, rt] = J;
      const [lt, it] = G;
      const [at, ut] = A({
        x: st.w > 0,
        y: st.h > 0
      });
      const _t = X && Y && (at.x || at.y) || X && at.x && !at.y || Y && at.y && !at.x;
      const dt = u || b || w || it || rt || ot || et || F || N || W;
      const ft = createViewportOverflowState(at, j);
      const [vt, pt] = R(ft.k);
      const [ht, gt] = V(a);
      const bt = b || y || gt || ut || a;
      const [yt, wt] = bt ? L(getMeasuredScrollCoordinates(ht), a) : U();
      if (dt) {
        pt && setViewportOverflowStyle(ft.k);
        if (z && H) {
          setStyles(l, z(ft, i, H(ft, ct, lt)));
        }
      }
      setMeasuringMode(false);
      addRemoveAttrClass(c, B, q, _t);
      addRemoveAttrClass(r, tt, q, _t);
      assignDeep(n, {
        k: vt,
        Lt: {
          x: nt.w,
          y: nt.h
        },
        Vt: {
          x: st.w,
          y: st.h
        },
        rn: at,
        Tt: sanitizeScrollCoordinates(yt, st)
      });
      return {
        en: pt,
        nn: ot,
        sn: et,
        cn: wt || et,
        vn: bt
      };
    };
  };
  const createStructureSetup = t => {
    const [n, o, s] = createStructureSetupElements(t);
    const e = {
      ln: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      dn: false,
      F: {
        [S]: 0,
        [m]: 0,
        [w]: 0,
        [h]: 0,
        [g]: 0,
        [y]: 0,
        [b]: 0
      },
      Lt: {
        x: 0,
        y: 0
      },
      Vt: {
        x: 0,
        y: 0
      },
      k: {
        x: E,
        y: E
      },
      rn: {
        x: false,
        y: false
      },
      Tt: getZeroScrollCoordinates()
    };
    const {vt: c, gt: r, L: l, Ot: i} = n;
    const {P: a, T: u} = getEnvironment();
    const _ = !a && (u.x || u.y);
    const d = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
    return [ o, t => {
      const n = {};
      const o = _;
      const s = o && getElementScroll(r);
      const e = s && i();
      each(d, (o => {
        assignDeep(n, o(t, n) || {});
      }));
      scrollElementTo(r, s);
      e && e();
      !l && scrollElementTo(c, 0);
      return n;
    }, e, n, s ];
  };
  const createSetups = (t, n, o, s, e) => {
    let c = false;
    const r = createOptionCheck(n, {});
    const [l, i, a, u, _] = createStructureSetup(t);
    const [d, f, v] = createObserversSetup(u, a, r, (t => {
      update({}, t);
    }));
    const [p, h, , g] = createScrollbarsSetup(t, n, v, a, u, e);
    const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
    const update = (t, e) => {
      if (o()) {
        return false;
      }
      const {pn: r, Dt: l, At: a, hn: u} = t;
      const _ = r || {};
      const d = !!l || !c;
      const p = {
        It: createOptionCheck(n, _, d),
        pn: _,
        Dt: d
      };
      if (u) {
        h(p);
        return false;
      }
      const g = e || f(assignDeep({}, p, {
        At: a
      }));
      const b = i(assignDeep({}, p, {
        _n: v,
        Zt: g
      }));
      h(assignDeep({}, p, {
        Zt: g,
        tn: b
      }));
      const y = updateHintsAreTruthy(g);
      const w = updateHintsAreTruthy(b);
      const S = y || w || !isEmptyObject(_) || d;
      c = true;
      S && s(t, {
        Zt: g,
        tn: b
      });
      return S;
    };
    return [ () => {
      const {an: t, gt: n, Ot: o} = u;
      const s = getElementScroll(t);
      const e = [ d(), l(), p() ];
      const c = o();
      scrollElementTo(n, s);
      c();
      return bind(runEachAndClear, e);
    }, update, () => ({
      gn: v,
      bn: a
    }), {
      yn: u,
      wn: g
    }, _ ];
  };
  const Tt = new WeakMap;
  const addInstance = (t, n) => {
    Tt.set(t, n);
  };
  const removeInstance = t => {
    Tt.delete(t);
  };
  const getInstance = t => Tt.get(t);
  const OverlayScrollbars = (t, n, o) => {
    const {nt: s} = getEnvironment();
    const e = isHTMLElement(t);
    const c = e ? t : t.target;
    const r = getInstance(c);
    if (n && !r) {
      let r = false;
      const l = [];
      const i = {};
      const validateOptions = t => {
        const n = removeUndefinedProperties(t);
        const o = getStaticPluginModuleInstance(V);
        return o ? o(n, true) : n;
      };
      const a = assignDeep({}, s(), validateOptions(n));
      const [u, _, d] = createEventListenerHub();
      const [f, v, p] = createEventListenerHub(o);
      const triggerEvent = (t, n) => {
        p(t, n);
        d(t, n);
      };
      const [h, g, b, y, w] = createSetups(t, a, (() => r), (({pn: t, Dt: n}, {Zt: o, tn: s}) => {
        const {ft: e, Ct: c, xt: r, Ht: l, Et: i, dt: a} = o;
        const {nn: u, sn: _, en: d, cn: f} = s;
        triggerEvent("updated", [ S, {
          updateHints: {
            sizeChanged: !!e,
            directionChanged: !!c,
            heightIntrinsicChanged: !!r,
            overflowEdgeChanged: !!u,
            overflowAmountChanged: !!_,
            overflowStyleChanged: !!d,
            scrollCoordinatesChanged: !!f,
            contentMutation: !!l,
            hostMutation: !!i,
            appear: !!a
          },
          changedOptions: t || {},
          force: !!n
        } ]);
      }), (t => triggerEvent("scroll", [ S, t ])));
      const destroy = t => {
        removeInstance(c);
        runEachAndClear(l);
        r = true;
        triggerEvent("destroyed", [ S, t ]);
        _();
        v();
      };
      const S = {
        options(t, n) {
          if (t) {
            const o = n ? s() : {};
            const e = getOptionsDiff(a, assignDeep(o, validateOptions(t)));
            if (!isEmptyObject(e)) {
              assignDeep(a, e);
              g({
                pn: e
              });
            }
          }
          return assignDeep({}, a);
        },
        on: f,
        off: (t, n) => {
          t && n && v(t, n);
        },
        state() {
          const {gn: t, bn: n} = b();
          const {B: o} = t;
          const {Lt: s, Vt: e, k: c, rn: l, ln: i, dn: a, Tt: u} = n;
          return assignDeep({}, {
            overflowEdge: s,
            overflowAmount: e,
            overflowStyle: c,
            hasOverflow: l,
            scrollCoordinates: {
              start: u.D,
              end: u.M
            },
            padding: i,
            paddingAbsolute: a,
            directionRTL: o,
            destroyed: r
          });
        },
        elements() {
          const {vt: t, ht: n, ln: o, U: s, bt: e, gt: c, Qt: r} = y.yn;
          const {Xt: l, Jt: i} = y.wn;
          const translateScrollbarStructure = t => {
            const {kt: n, Pt: o, Ut: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {Yt: n, Wt: o} = t;
            const s = translateScrollbarStructure(n[0]);
            return assignDeep({}, s, {
              clone: () => {
                const t = translateScrollbarStructure(o());
                g({
                  hn: true
                });
                return t;
              }
            });
          };
          return assignDeep({}, {
            target: t,
            host: n,
            padding: o || s,
            viewport: s,
            content: e || s,
            scrollOffsetElement: c,
            scrollEventElement: r,
            scrollbarHorizontal: translateScrollbarsSetupElement(l),
            scrollbarVertical: translateScrollbarsSetupElement(i)
          });
        },
        update: t => g({
          Dt: t,
          At: true
        }),
        destroy: bind(destroy, false),
        plugin: t => i[keys(t)[0]]
      };
      push(l, [ w ]);
      addInstance(c, S);
      registerPluginModuleInstances(k, OverlayScrollbars, [ S, u, i ]);
      if (cancelInitialization(y.yn.yt, !e && t.cancel)) {
        destroy(true);
        return S;
      }
      push(l, h());
      triggerEvent("initialized", [ S ]);
      S.update();
      return S;
    }
    return r;
  };
  OverlayScrollbars.plugin = t => {
    const n = isArray(t);
    const o = n ? t : [ t ];
    const s = o.map((t => registerPluginModuleInstances(t, OverlayScrollbars)[0]));
    addPlugins(o);
    return n ? s : s[0];
  };
  OverlayScrollbars.valid = t => {
    const n = t && t.elements;
    const o = isFunction(n) && n();
    return isPlainObject(o) && !!getInstance(o.target);
  };
  OverlayScrollbars.env = () => {
    const {N: t, T: n, P: o, J: s, st: e, et: c, Z: r, tt: l, nt: i, ot: a} = getEnvironment();
    return assignDeep({}, {
      scrollbarsSize: t,
      scrollbarsOverlaid: n,
      scrollbarsHiding: o,
      scrollTimeline: s,
      staticDefaultInitialization: e,
      staticDefaultOptions: c,
      getDefaultInitialization: r,
      setDefaultInitialization: l,
      getDefaultOptions: i,
      setDefaultOptions: a
    });
  };
  OverlayScrollbars.nonce = setNonce;
  OverlayScrollbars.trustedTypePolicy = setTrustedTypePolicy;
  t.ClickScrollPlugin = It;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = Et;
  t.SizeObserverPlugin = xt;
  Object.defineProperty(t, Symbol.toStringTag, {
    value: "Module"
  });
  return t;
}({});