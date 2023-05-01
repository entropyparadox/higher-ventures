"use strict";
exports.id = 317;
exports.ids = [317];
exports.modules = {

/***/ 1317:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "q": () => (/* binding */ newRidgeState)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./node_modules/react-ridge-state/dist/e.js

/* harmony default export */ const dist_e = ( false ? 0 : external_react_.useEffect);

;// CONCATENATED MODULE: ./node_modules/react-ridge-state/dist/index.js


let i = (r, a)=>r === a, l = {};
function v(r, a = i) {
    let n = external_react_.useRef(l), e = n.current;
    return dist_e(()=>{
        n.current = e;
    }), (n.current === l || !a(r, n.current)) && (e = r), e;
}
function newRidgeState(r, a) {
    let n = [], e = r;
    function o(t, T) {
        let c = e;
        e = t instanceof Function ? t(e) : t, setTimeout(()=>{
            n.forEach((f)=>f(e)), T && T(e), a && a.onSet && a.onSet(e, c);
        });
    }
    function p(t) {
        dist_e(()=>(n.push(t), ()=>{
                n = n.filter((T)=>T !== t);
            }), [
            t
        ]);
    }
    function u() {
        let [t, T] = external_react_.useState(e);
        return p(T), [
            t,
            o
        ];
    }
    function d(t, T = i) {
        const [c] = u();
        return v(t(c), T);
    }
    return {
        use: u,
        useSelector: d,
        useValue: ()=>u()[0],
        get: ()=>e,
        set: o,
        reset: ()=>o(r)
    };
}


/***/ })

};
;