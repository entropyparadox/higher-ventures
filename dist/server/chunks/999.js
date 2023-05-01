"use strict";
exports.id = 999;
exports.ids = [999];
exports.modules = {

/***/ 3430:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ AdminLayout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./src/admin/components/AdminMain.tsx
var AdminMain = __webpack_require__(6383);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/common/Icon.tsx + 48 modules
var Icon = __webpack_require__(3753);
;// CONCATENATED MODULE: ./src/admin/components/AdminSidebar.tsx




/**
 * @example
 * <Sidebar>
 *   <Sidebar.Title>Admin</Sidebar.Title>
 *   <Sidebar.Menu>
 *     <Sidebar.Menu.Item text="Users" to="/admin/users" />
 *   </Sidebar.Menu>
 * </Sidebar>
 */ const AdminSidebar = ({ children , className ="" , ...props })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: `sidebar ${className}`,
        ...props,
        children: children
    });
};
const AdminSidebarTitle = ({ children , className ="" , ...props })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: `sidebar-title ${className}`,
        ...props,
        children: children
    });
};
const AdminSidebarMenu = ({ children , className ="" , ...props })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: `sidebar-menu ${className}`,
        ...props,
        children: children
    });
};
const AdminSidebarMenuItem = ({ children , className ="" , text , to , selected =false , onClick , ...props })=>{
    const router = (0,router_.useRouter)();
    const { pathname  } = router;
    let _selected = selected;
    if (to && pathname.startsWith(to)) {
        _selected = true;
    }
    const [isOpen, setIsOpen] = (0,external_react_.useState)();
    const handleOnClick = (event)=>{
        if (to) {
            router.push(to);
            return;
        }
        if (onClick) {
            onClick(event);
            return;
        }
        setIsOpen(!isOpen);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                className: `sidebar-menu-item flex items-center justify-between ${_selected || isOpen ? "bg-black text-white" : "text-black hover:bg-gray-100 hover:text-gray-900"} ${className}`,
                onClick: handleOnClick,
                ...props,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: text
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: children && /*#__PURE__*/ jsx_runtime_.jsx(Icon/* Icon.ChevronUp */.J.ChevronUp, {
                            className: isOpen ? "" : "rotate-180"
                        })
                    })
                ]
            }),
            isOpen && children
        ]
    });
};
const AdminSidebarMenuSub = ({ className ="" , text , to , selected =false , onClick , ...props })=>{
    const router = (0,router_.useRouter)();
    const { pathname  } = router;
    let _selected = selected;
    if (to && pathname.startsWith(to)) {
        _selected = true;
    }
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
            className: `sidebar-menu-sub ${_selected ? "bg-gray-200 font-semibold text-black" : "text-gray-600 hover:text-gray-900"} ${className}`,
            onClick: to ? ()=>router.push(to) : onClick,
            ...props,
            children: text
        })
    });
};
AdminSidebar.Title = AdminSidebarTitle;
AdminSidebar.Menu = AdminSidebarMenu;
AdminSidebarMenu.Item = AdminSidebarMenuItem;
AdminSidebarMenuItem.Sub = AdminSidebarMenuSub;


// EXTERNAL MODULE: ./src/hooks.ts
var hooks = __webpack_require__(6816);
;// CONCATENATED MODULE: ./layouts/AdminLayout.tsx




function AdminLayout({ children  }) {
    const { logout  } = (0,hooks/* useAuth */.aC)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex h-screen",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(AdminSidebar, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(AdminSidebar.Title, {
                        children: "Admin"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(AdminSidebar.Menu, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(AdminSidebar.Menu.Item, {
                                text: "유저리스트",
                                to: "/admin/users"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(AdminSidebar.Menu.Item, {
                                text: "로그아웃",
                                onClick: logout
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex min-w-0 flex-1 flex-col overflow-hidden",
                children: /*#__PURE__*/ jsx_runtime_.jsx(AdminMain/* default */.Z, {
                    children: children
                })
            })
        ]
    });
}


/***/ }),

/***/ 5549:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ AdminCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const AdminCard = ({ children , className ="" , ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `card ${className}`,
        ...props,
        children: children
    });
};


/***/ }),

/***/ 6383:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ AdminH1)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function AdminH1({ children  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
        className: "relative flex flex-1 flex-col space-y-4 overflow-y-auto",
        children: children
    });
}


/***/ }),

/***/ 7882:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ fetcher)
/* harmony export */ });
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1115);

function fetcher({ queryKey  }) {
    return _axios__WEBPACK_IMPORTED_MODULE_0__/* .api.get */ .h.get(queryKey[0]).then(({ data  })=>data);
}


/***/ })

};
;