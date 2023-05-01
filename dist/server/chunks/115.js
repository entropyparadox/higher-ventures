"use strict";
exports.id = 115;
exports.ids = [115];
exports.modules = {

/***/ 1115:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ api)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ridge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6610);


const api = axios__WEBPACK_IMPORTED_MODULE_0___default().create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});
api.interceptors.request.use((config)=>{
    const token = _ridge__WEBPACK_IMPORTED_MODULE_1__/* .tokenState.get */ .J1.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});
api.interceptors.response.use(undefined, (error)=>{
    if (error.response.status === 401) {
        _ridge__WEBPACK_IMPORTED_MODULE_1__/* .tokenState.reset */ .J1.reset();
    }
    return Promise.reject(error);
});



/***/ }),

/***/ 6610:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J1": () => (/* binding */ tokenState)
/* harmony export */ });
/* unused harmony exports adminTokenState, osState, resetQueryClientState */
/* harmony import */ var react_ridge_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1317);

const tokenState = (0,react_ridge_state__WEBPACK_IMPORTED_MODULE_0__/* .newRidgeState */ .q)(null, {
    onSet: async (newState)=>{
        if (newState) {
            localStorage.setItem("token", newState);
        } else {
            localStorage.removeItem("token");
        }
    }
});
const adminTokenState = (0,react_ridge_state__WEBPACK_IMPORTED_MODULE_0__/* .newRidgeState */ .q)(null, {
    onSet: async (newState)=>{
        if (newState) {
            localStorage.setItem("adminToken", newState);
        } else {
            localStorage.removeItem("adminToken");
        }
    }
});
const osState = (0,react_ridge_state__WEBPACK_IMPORTED_MODULE_0__/* .newRidgeState */ .q)("");
const resetQueryClientState = (0,react_ridge_state__WEBPACK_IMPORTED_MODULE_0__/* .newRidgeState */ .q)(false);
function setInitialState() {
    if (true) {
        return;
    }
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    tokenState.set(token);
    adminTokenState.set(adminToken);
}
setInitialState();


/***/ })

};
;