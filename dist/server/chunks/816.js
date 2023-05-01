"use strict";
exports.id = 816;
exports.ids = [816];
exports.modules = {

/***/ 6816:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Nc": () => (/* binding */ useQueryString),
/* harmony export */   "aC": () => (/* binding */ useAuth)
/* harmony export */ });
/* unused harmony exports DEBOUNCE_THRESHOLD_MS, useDebounce, usePrevious, useInterval, usePageLoading */
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7104);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _plugins_axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1115);
/* harmony import */ var _plugins_ridge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6610);






const DEBOUNCE_THRESHOLD_MS = 250;
const useAuth = ()=>{
    const [token, setToken] = _plugins_ridge__WEBPACK_IMPORTED_MODULE_5__/* .tokenState.use */ .J1.use();
    const authenticated = token !== null;
    const signup = (data)=>_plugins_axios__WEBPACK_IMPORTED_MODULE_4__/* .api.post */ .h.post("/auth/signup", data).then(({ data: { token  }  })=>setToken(token));
    const login = (data)=>_plugins_axios__WEBPACK_IMPORTED_MODULE_4__/* .api.post */ .h.post("/auth/login", data).then(({ data: { token  }  })=>setToken(token));
    const logout = ()=>_plugins_ridge__WEBPACK_IMPORTED_MODULE_5__/* .tokenState.reset */ .J1.reset();
    return {
        token,
        authenticated,
        signup,
        login,
        logout
    };
};
function useQueryString(queryObject = {}) {
    const { query  } = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const searchObject = {
        page: "1",
        limit: "10",
        sort: {
            id: "DESC"
        },
        ...query,
        ...queryObject
    };
    return (0,qs__WEBPACK_IMPORTED_MODULE_2__.stringify)(searchObject, {
        addQueryPrefix: true,
        encode: false
    });
}
function useDebounce({ value , delay  }) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(()=>{
        if (isEqual(value, debouncedValue)) {
            return;
        }
        const handler = setTimeout(()=>{
            setDebouncedValue(value);
        }, delay);
        return ()=>{
            clearTimeout(handler);
        };
    }, [
        value,
        delay
    ]);
    return debouncedValue;
}
function usePrevious(value) {
    const ref = useRef();
    useEffect(()=>{
        ref.current = value;
    }, [
        value
    ]);
    return ref.current;
}
function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(()=>{
        savedCallback.current = callback;
    });
    // Set up the interval.
    useEffect(()=>{
        function tick() {
            if (typeof (savedCallback === null || savedCallback === void 0 ? void 0 : savedCallback.current) === "function") {
                savedCallback.current();
            }
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return ()=>clearInterval(id);
        }
    }, [
        delay
    ]);
}
function usePageLoading() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const _parseUrl = (url)=>{
        return chain(url).split("?").first().value();
    };
    useEffect(()=>{
        const handleStart = (url)=>router.isReady && _parseUrl(url) !== _parseUrl(router.asPath);
        const handleComplete = ()=>{
            setLoading(false);
        };
        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);
        return ()=>{
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    });
    return loading;
}


/***/ })

};
;