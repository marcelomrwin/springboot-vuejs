(function(t){function e(e){for(var n,i,l=e[0],u=e[1],s=e[2],f=0,p=[];f<l.length;f++)i=l[f],a[i]&&p.push(a[i][0]),a[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);c&&c(e);while(p.length)p.shift()();return o.push.apply(o,s||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],n=!0,l=1;l<r.length;l++){var u=r[l];0!==a[u]&&(n=!1)}n&&(o.splice(e--,1),t=i(i.s=r[0]))}return t}var n={},a={app:0},o=[];function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=n,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var s=0;s<l.length;s++)e(l[s]);var c=u;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"56d7":function(t,e,r){"use strict";r.r(e);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},o=[],i=r("2877"),l={},u=Object(i["a"])(l,a,o,!1,null,null,null),s=u.exports,c=r("8c4f"),f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-layout",{attrs:{view:"lHh Lpr lFf"}},[r("q-layout-header",[r("q-toolbar",{attrs:{color:"primary",glossy:"mat"===t.$q.theme,inverted:"ios"===t.$q.theme}},[r("q-btn",{attrs:{flat:"",dense:"",round:"","aria-label":"Menu",icon:"menu"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}}),r("q-toolbar-title",[t._v("\n        Quasar App\n        "),r("div",{attrs:{slot:"subtitle"},slot:"subtitle"},[t._v("Running on Quasar v"+t._s(t.$q.version))])])],1)],1),r("q-layout-drawer",{attrs:{"content-class":"mat"===t.$q.theme?"bg-grey-2":null},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[r("q-list",{attrs:{"no-border":"",link:"","inset-delimiter":""}},[r("q-list",{attrs:{"no-border":"",link:"","inset-delimiter":""}},[r("q-list-header",[t._v("Navigation")]),r("q-item",{attrs:{to:"/",exact:""}},[r("q-item-side",{attrs:{icon:"home"}}),r("q-item-main",{attrs:{label:"Home"}})],1),r("q-item",{attrs:{to:"/about"}},[r("q-item-side",{attrs:{icon:"info_outline"}}),r("q-item-main",{attrs:{label:"About"}})],1),r("q-item-separator"),r("q-list-header",[t._v("Essential Links")]),r("q-item",{nativeOn:{click:function(e){return t.openURL("http://quasar-framework.org")}}},[r("q-item-side",{attrs:{icon:"school"}}),r("q-item-main",{attrs:{label:"Docs",sublabel:"quasar-framework.org"}})],1),r("q-item",{nativeOn:{click:function(e){return t.openURL("https://discord.gg/5TDhbDg")}}},[r("q-item-side",{attrs:{icon:"chat"}}),r("q-item-main",{attrs:{label:"Discord Chat Channel",sublabel:"https://discord.gg/5TDhbDg"}})],1),r("q-item",{nativeOn:{click:function(e){return t.openURL("http://forum.quasar-framework.org")}}},[r("q-item-side",{attrs:{icon:"forum"}}),r("q-item-main",{attrs:{label:"Forum",sublabel:"forum.quasar-framework.org"}})],1),r("q-item",{nativeOn:{click:function(e){return t.openURL("https://twitter.com/quasarframework")}}},[r("q-item-side",{attrs:{icon:"rss feed"}}),r("q-item-main",{attrs:{label:"Twitter",sublabel:"@quasarframework"}})],1)],1)],1)],1),r("q-page-container",[r("router-view")],1)],1)},p=[],m=r("e083"),d={name:"LayoutDefault",data:function(){return{leftDrawerOpen:this.$q.platform.is.desktop}},methods:{openURL:m["b"]}},b=d,h=Object(i["a"])(b,f,p,!1,null,null,null),q=h.exports,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",{staticClass:"flex flex-center"},[n("img",{attrs:{alt:"Quasar logo",src:r("cf05")}})])},g=[],w={name:"PageHome"},O=w,y=Object(i["a"])(O,v,g,!1,null,null,null),_=y.exports,k=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{attrs:{padding:""}},[r("p",[t._v("This is an about page")])])},x=[],D={name:"PageAbout"},j=D,$=Object(i["a"])(j,k,x,!1,null,null,null),L=$.exports;n["default"].use(c["a"]);var P=new c["a"]({routes:[{path:"/",component:q,children:[{path:"",name:"home",component:_},{path:"/about",name:"about",component:L}]}]}),T=r("9f7b"),R=r.n(T),E=(r("f9e3"),r("2dd8"),r("a4ac"),r("b848"));r("7e57"),r("38aa");n["default"].use(m["a"],{config:{},i18n:E["a"]}),n["default"].config.productionTip=!1,n["default"].use(R.a),new n["default"]({router:P,render:function(t){return t(s)}}).$mount("#app")},a4ac:function(t,e,r){},cf05:function(t,e,r){t.exports=r.p+"static/img/logo.8c4120b4.png"}});
//# sourceMappingURL=app.2736bd2b.js.map