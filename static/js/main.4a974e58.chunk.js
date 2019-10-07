(window["webpackJsonpbl-dps-calc"]=window["webpackJsonpbl-dps-calc"]||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(6),c=a.n(l),m=(a(13),a(7)),u=a(4),o=(a(14),a(2));a(17);function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(a,!0).forEach((function(t){Object(m.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var s="04bf5b6d4c793afde872cbd276679ee56339997e";var E=function(){var e=Object(n.useState)({damage:17,accuracy:60,reloadTime:4,fireRate:13.67,magazineSize:60}),t=Object(u.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)({damage:20,accuracy:80,reloadTime:3.2,fireRate:12.71,magazineSize:44}),m=Object(u.a)(c,2),i=m[0],E=m[1];function g(e,t,a){var n=a.target.value;switch(a.target.name){case"damage":return t(d({},e,{damage:Number.parseInt(n)}));case"accuracy":return t(d({},e,{accuracy:Number.parseInt(n)}));case"reloadTime":return t(d({},e,{reloadTime:Number.parseFloat(n)}));case"fireRate":return t(d({},e,{fireRate:Number.parseFloat(n)}));case"magazineSize":return t(d({},e,{magazineSize:Number.parseInt(n)}));default:return}}function p(e){var t=e.damage*e.fireRate,a=e.magazineSize/e.fireRate;return{dps:t,magTime:a,mag2magDps:t*a/(a+e.reloadTime)}}var f=p(a),b=p(i),h=function(e){return e.target.select()},S=function(e,t,a){return r.a.createElement("td",{style:e>t?a?{color:"#00C800"}:{color:"red"}:{}},function(e,t){return e<t?"+":""}(e,t),Math.round((t-e)/e*100).toString(),"%")};function z(e,t){return r.a.createElement("form",null,r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("label",{htmlFor:"damage"},"Damage")),r.a.createElement("td",null,r.a.createElement("input",{onFocus:h,onChange:t,name:"damage",type:"number",value:e.damage.toString(),min:"0"}))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("label",{htmlFor:"reloadTime"},"Reload Time")),r.a.createElement("td",null,r.a.createElement("input",{onFocus:h,onChange:t,name:"reloadTime",type:"number",value:e.reloadTime.toString(),min:"0",step:"0.1"}))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("label",{htmlFor:"fireRate"},"Fire Rate")),r.a.createElement("td",null,r.a.createElement("input",{onFocus:h,onChange:t,name:"fireRate",type:"number",value:e.fireRate.toString(),min:"0",step:"0.01"}))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("label",{htmlFor:"magazineSize"},"Magazine Size")),r.a.createElement("td",null,r.a.createElement("input",{onFocus:h,onChange:t,name:"magazineSize",type:"number",value:e.magazineSize.toString(),min:"0"}))))))}function v(e,t,a,n){var l=Math.round(t.dps).toString(),c=Math.round(t.mag2magDps).toString();return r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"Mag-2-Mag DPS:"),r.a.createElement("td",null,c),n&&S(n.mag2magDps,t.mag2magDps)),r.a.createElement("tr",null,r.a.createElement("td",null,"Base DPS:"),r.a.createElement("td",null,l),n&&S(n.dps,t.dps)),n&&r.a.createElement("tr",null,r.a.createElement("td",null,"Fire Rate:"),r.a.createElement("td",null,(e.fireRate-a.fireRate).toFixed(2)),S(a.fireRate,e.fireRate)),n&&r.a.createElement("tr",null,r.a.createElement("td",null,"Reload time:"),r.a.createElement("td",null,(e.reloadTime-a.reloadTime).toFixed(2)),S(a.reloadTime,e.reloadTime,!0)),n&&r.a.createElement("tr",null,r.a.createElement("td",null,"Magazine Size:"),r.a.createElement("td",null,(e.magazineSize-a.magazineSize).toFixed(2)),S(a.magazineSize,e.magazineSize))))}return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h2",null,"Borderlands DPS Calc")),r.a.createElement("main",null,r.a.createElement(o.d,null,r.a.createElement(o.b,null,r.a.createElement(o.a,null,"Gun A"),r.a.createElement(o.a,null,"Gun B")),r.a.createElement(o.c,null,r.a.createElement("div",{className:"flex flexColumn"},r.a.createElement("span",null,"Gun A"),z(a,(function(e){return g(a,l,e)}))),r.a.createElement("div",{className:"flex flexColumn"},r.a.createElement("h2",null,"Stats"),v(a,f))),r.a.createElement(o.c,null,r.a.createElement("div",{className:"flex flexColumn"},r.a.createElement("span",null,"Gun B"),z(i,(function(e){return g(i,E,e)}))),r.a.createElement("div",{className:"flex flexColumn"},r.a.createElement("h2",null,"Stats"),v(i,b,a,f))))),r.a.createElement("footer",null,r.a.createElement("h6",null,r.a.createElement("a",{rel:"author",href:"https://twitter.com/nearwood"},"@nearwood")," ",r.a.createElement("a",{href:"https://github.com/nearwood/bl-dps-calc"},"GitHub")," ",r.a.createElement("span",{title:"version"},s.substring(0,7)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,a){e.exports=a(18)}},[[8,1,2]]]);
//# sourceMappingURL=main.4a974e58.chunk.js.map