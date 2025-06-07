(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/requisition.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "editProfileRequisition": (()=>editProfileRequisition),
    "getPdfUrl": (()=>getPdfUrl),
    "getPngUrl": (()=>getPngUrl),
    "getPosts": (()=>getPosts),
    "getUserProfile": (()=>getUserProfile),
    "getUsers": (()=>getUsers),
    "login": (()=>login),
    "makeFilePost": (()=>makeFilePost),
    "register": (()=>register)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
"use client";
const backendUrl = "https://backredes-production.up.railway.app";
;
async function login(values) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${backendUrl}/auth/login`, values);
    return response;
}
async function register(values, file) {
    const form_data = new FormData();
    if (file) {
        form_data.append("image", file);
    }
    form_data.append("name", values.name);
    form_data.append("password", values.password);
    form_data.append("bio", values.bio);
    form_data.append("job", values.job);
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${backendUrl}/user`, form_data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response;
}
async function editProfileRequisition(data, file) {
    const token = localStorage.getItem("token");
    const fields_edition = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${backendUrl}/user`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (file) {
        const form_data = new FormData();
        form_data.append("image", file);
        const image_edition = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${backendUrl}/user/image`, form_data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            fields_edition,
            image_edition
        };
    }
    return {
        fields_edition
    };
}
async function getPosts() {
    const token = localStorage.getItem("token");
    const result = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${backendUrl}/post/recent`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${backendUrl}/pdf/recent`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${backendUrl}/png/recent`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    ]);
    const [txt_result, pdf_result, png_result] = result.values();
    if (txt_result.status === 200 && pdf_result.status === 200 && png_result.status === 200) {
        const txts = txt_result.data;
        const pdfs = pdf_result.data;
        const pngs = png_result.data;
        const posts = [
            ...txts.map(servToCardTxtPost),
            ...pdfs.map(servToCardPdfPost),
            ...pngs.map(servToCardPngPost)
        ];
        return posts;
    }
    throw new Error("Failed to fetch posts");
}
async function getUsers() {
    const token = localStorage.getItem("token");
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${backendUrl}/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (result.status === 200) {
        const user = result.data;
        return user;
    }
    throw new Error("Failed to fetch user");
}
async function getUserProfile(user_id) {
    const token = localStorage.getItem("token");
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${backendUrl}/user/profile${user_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (result.status === 200) {
        const user = result.data;
        const client_data = {
            id: user.id,
            owner: user.owner,
            name: user.name,
            bio: user.bio,
            image: user.image,
            job: user.job,
            posts: [
                ...user.posts.map(servToCardTxtPost),
                ...user.pdfs.map(servToCardPdfPost),
                ...user.pngs.map(servToCardPngPost)
            ]
        };
        return client_data;
    }
    throw new Error("Failed to fetch user");
}
async function makeFilePost(file, title, type) {
    if (file.name.split(".").at(-1) != type) {
        throw new Error("formato de arquivo inválido");
    }
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    form_data.append("title", title);
    form_data.append("image", file);
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${backendUrl}/${type}`, form_data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}
function getPngUrl(entity_id, entity_type) {
    const path = `${backendUrl}/png/see${entity_type[0]}${entity_id}.png`;
    console.log(path);
    return path;
}
function getPdfUrl(entity_id) {
    const path = `${backendUrl}/pdf/seep${entity_id}.pdf`;
    console.log(path);
    return path;
}
function servToCardTxtPost(post) {
    return {
        txt: undefined,
        id: post.id,
        title: post.title,
        body: post.body,
        author_id: post.user.id,
        author_name: post.user.name
    };
}
function servToCardPdfPost(post) {
    return {
        pdf: undefined,
        id: post.id,
        title: post.title,
        file_name: post.file_name,
        author_id: post.user.id,
        author_name: post.user.name
    };
}
function servToCardPngPost(post) {
    return {
        png: undefined,
        id: post.id,
        title: post.title,
        file_name: post.file_name,
        author_id: post.user.id,
        author_name: post.user.name
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/pdf_viewer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// components/PdfViewer.jsx
__turbopack_context__.s({
    "default": (()=>PdfViewer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__ = __turbopack_context__.i("[project]/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript) <export * as pdfjs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$esm$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__ = __turbopack_context__.i("[project]/node_modules/react-pdf/dist/esm/Document.js [app-client] (ecmascript) <export default as Document>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$esm$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__ = __turbopack_context__.i("[project]/node_modules/react-pdf/dist/esm/Page.js [app-client] (ecmascript) <export default as Page>");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("src/components/pdf_viewer.tsx")}`;
    }
};
"use client";
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].GlobalWorkerOptions.workerSrc = new __turbopack_context__.U(__turbopack_context__.r("[project]/node_modules/pdfjs-dist/build/pdf.worker.min.mjs (static in ecmascript)")).toString();
function PdfViewer({ url }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$esm$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__["Document"], {
            file: url,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$esm$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__["Page"], {
                pageNumber: 1,
                renderTextLayer: false,
                renderAnnotationLayer: false,
                width: 300
            }, void 0, false, {
                fileName: "[project]/src/components/pdf_viewer.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/pdf_viewer.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/pdf_viewer.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = PdfViewer;
var _c;
__turbopack_context__.k.register(_c, "PdfViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/postcard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "makePostCard": (()=>makePostCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/requisition.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pdf_viewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pdf_viewer.tsx [app-client] (ecmascript)");
;
;
;
;
;
function makePostCard(data) {
    let content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false);
    let doc_type = "none";
    if ("png" in data) {
        content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPngUrl"])(data.id, "post"),
                alt: "postagem",
                width: 500,
                height: 500,
                className: "w-full rounded-lg"
            }, void 0, false, {
                fileName: "[project]/src/components/postcard.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/postcard.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this);
        doc_type = "png";
    }
    if ("pdf" in data) {
        content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPdfUrl"])(data.id),
            className: "flex justify-center overflow-hidden rounded-lg",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pdf_viewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPdfUrl"])(data.id)
            }, void 0, false, {
                fileName: "[project]/src/components/postcard.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/postcard.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this);
        doc_type = "pdf";
    }
    if ("txt" in data) {
        content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: data.body
        }, void 0, false, {
            fileName: "[project]/src/components/postcard.tsx",
            lineNumber: 40,
            columnNumber: 15
        }, this);
        doc_type = "txt";
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-md p-4 border w-78 h-106 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-bold text-sm",
                        children: [
                            data.author_name,
                            " postou:"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/postcard.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "bg-blue-400 px-2 rounded-full",
                        children: doc_type
                    }, void 0, false, {
                        fileName: "[project]/src/components/postcard.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/postcard.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-lg font-bold mb-3",
                children: data.title
            }, void 0, false, {
                fileName: "[project]/src/components/postcard.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            content
        ]
    }, `${data.id}${doc_type}`, true, {
        fileName: "[project]/src/components/postcard.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/(protected)/dashboard/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DashboardPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$postcard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/postcard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/requisition.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/axios/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function DashboardPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [profCards, setProfCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [studentCards, setStudentCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            if (!localStorage.getItem("token")) {
                router.push("/login");
                return;
            }
            setProfCards([]);
            setStudentCards([]);
            const response = Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPosts"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUsers"])()
            ]);
            setLoading(true);
            response.then({
                "DashboardPage.useEffect": (data)=>{
                    setPosts(data[0]);
                    setProfCards(data[1].filter({
                        "DashboardPage.useEffect": (professor)=>professor.job === "professor"
                    }["DashboardPage.useEffect"]));
                    setStudentCards(data[1].filter({
                        "DashboardPage.useEffect": (student)=>student.job === "student"
                    }["DashboardPage.useEffect"]));
                    setLoading(false);
                }
            }["DashboardPage.useEffect"]);
            response.catch({
                "DashboardPage.useEffect": (error)=>{
                    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AxiosError"]) {
                        router.push("/login");
                        localStorage.removeItem("token");
                        return;
                    }
                }
            }["DashboardPage.useEffect"]);
        }
    }["DashboardPage.useEffect"], [
        setProfCards,
        setStudentCards,
        setPosts,
        router,
        setLoading
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
            lineNumber: 51,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col p-14",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "p-3 text-3xl font-bold",
                children: "Professores"
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3 gap-3 mb-8",
                children: profCards.map((prof)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/profile/${encodeURIComponent(prof.id)}`,
                        className: "bg-white rounded-lg shadow-md p-4 border flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold",
                                children: prof.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPngUrl"])(prof.id, "user"),
                                    alt: "professor image",
                                    width: 120,
                                    height: 120,
                                    className: "rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this)
                        ]
                    }, prof.id, true, {
                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "p-3 text-3xl font-bold",
                children: "Alunos"
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 grid grid-cols-5 gap-3 mb-8 xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3",
                children: studentCards.map((prof)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/profile/${encodeURIComponent(prof.id)}`,
                        className: "bg-white rounded-lg shadow-md p-4 border flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold",
                                children: prof.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPngUrl"])(prof.id, "user"),
                                    alt: "professor image",
                                    width: 120,
                                    height: 120,
                                    className: "rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        ]
                    }, prof.id, true, {
                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "p-5 text-2xl font-bold mb-8",
                children: "Últimas postagens"
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 flex-wrap ",
                children: posts.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$postcard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makePostCard"])
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "eVEdPm/9aHlK0XsYHQvyldcG5CY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_194b126c._.js.map