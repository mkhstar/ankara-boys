parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"epB2":[function(require,module,exports) {
var e=[{userName:"Musah Kusi Hussein mkhstar"},{userName:"Mohammed SharifDeen"},{userName:"Vandana Saifullah"},{userName:"Yusif Mustapha"}],t=1560546e6,a=(new Date).getTime(),n=6048e5,r=(a-t)/n,o=Math.floor(r)%4,u=["BATHROOM","FRIDGE AND FLOOR (KITCHEN AND ITS BALCONY)","COOKING AREA AND WOODWORK","CORRIDOR AND TOILET"],c=document.querySelector(".duty-content tbody"),s=document.querySelector(".day-and-date"),d=document.querySelector("#searchDuty");s&&(s.innerHTML=(new Date).toDateString()+", "+(new Date).toLocaleTimeString()),c&&(c.innerHTML="",e.forEach(function(e,t){c.innerHTML+='\n    <tr data-name="'.concat(e.userName,'">\n    <td>').concat(e.userName,"</td>\n    <td>").concat(u[o+t],"</td>\n    </tr>\n    ")})),d&&d.addEventListener("keyup",function(e){var t=e.target.value;c.querySelectorAll("tr").forEach(function(e){var a=e.getAttribute("data-name");t.length>0&&a.toLowerCase().indexOf(t.toLowerCase())<0?e.className="hide":e.className=""})});
},{}]},{},["epB2"], null)
//# sourceMappingURL=/main.8bf10a4a.map