(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[587],{9393:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/mypage",function(){return n(9953)}])},9953:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return i}});var r=n(5893),o=n(59),u=n(7882);function i(){var e=(0,o.a)(["/users/me"],u._).data;return e?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("h1",{children:"MyPage"}),(0,r.jsx)("pre",{children:JSON.stringify(e,void 0,2)})]}):(0,r.jsx)(r.Fragment,{})}},1115:function(e,t,n){"use strict";n.d(t,{h:function(){return a}});var r=n(9669),o=n.n(r),u=n(6610),i=n(4155),a=o().create({baseURL:i.env.NEXT_PUBLIC_API_URL});a.interceptors.request.use(function(e){var t=u.J1.get();return t?e.headers.Authorization="Bearer ".concat(t):delete e.headers.Authorization,e}),a.interceptors.response.use(void 0,function(e){return 401===e.response.status&&u.J1.reset(),Promise.reject(e)})},7882:function(e,t,n){"use strict";n.d(t,{_:function(){return o}});var r=n(1115);function o(e){var t=e.queryKey;return r.h.get(t[0]).then(function(e){return e.data})}},6610:function(e,t,n){"use strict";n.d(t,{J1:function(){return f}});var r,o,u,i,a=n(7568),s=n(655),c=n(1317),f=(0,c.q)(null,{onSet:(r=(0,a.Z)(function(e){return(0,s.__generator)(this,function(t){return e?localStorage.setItem("token",e):localStorage.removeItem("token"),[2]})}),function(e){return r.apply(this,arguments)})}),l=(0,c.q)(null,{onSet:(o=(0,a.Z)(function(e){return(0,s.__generator)(this,function(t){return e?localStorage.setItem("adminToken",e):localStorage.removeItem("adminToken"),[2]})}),function(e){return o.apply(this,arguments)})});(0,c.q)(""),(0,c.q)(!1),u=localStorage.getItem("token"),i=localStorage.getItem("adminToken"),f.set(u),l.set(i)}},function(e){e.O(0,[240,59,774,888,179],function(){return e(e.s=9393)}),_N_E=e.O()}]);