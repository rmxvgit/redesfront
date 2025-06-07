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
"[project]/src/app/(protected)/profile/[profile]/forms.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "NewPdfForm": (()=>NewPdfForm),
    "NewPngForm": (()=>NewPngForm),
    "NewTxtForm": (()=>NewTxtForm),
    "default": (()=>NewPostForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/requisition.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
;
;
function NewPostForm(post_type, errorMsg, setErrMsg, file, setFile, router) {
    if (post_type == "txt") {
        return NewTxtForm();
    }
    if (post_type == "png") {
        return NewPngForm(errorMsg, setErrMsg, file, setFile, router);
    }
    return NewPdfForm(errorMsg, setErrMsg, file, setFile, router);
}
_c = NewPostForm;
function NewPngForm(errorMsg, setErrMsg, file, setFile, router) {
    function postFormSubmit(values) {
        console.log("submit button pressed");
        console.log(values);
        if (file == null) {
            setErrMsg("arquivo não foi selecionado");
            return;
        }
        const promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeFilePost"])(file, values.title, "png");
        promise.then((result)=>{
            if (result.status === 201) {
                setErrMsg("");
                console.log("sucesso png");
                return;
            }
            console.log(result);
        });
        promise.catch((err)=>{
            if (err.status === 403) {
                console.log(err);
                router.push("/login");
            }
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Formik"], {
        initialValues: {
            title: ""
        },
        onSubmit: postFormSubmit,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Form"], {
            className: "flex flex-col gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: errorMsg
                }, void 0, false, {
                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                    name: "title",
                    placeholder: "Título do png",
                    className: "border p-2 rounded"
                }, void 0, false, {
                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 border rounded-lg p-2 ",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/file.svg",
                                    alt: "file icon",
                                    height: 20,
                                    width: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    onChange: (e)=>{
                                        setFile(e.currentTarget.files ? e.currentTarget.files[0] : null);
                                    },
                                    placeholder: "batata",
                                    className: "text-lg"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "border rounded-lg p-2",
                            children: "Enviar"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c1 = NewPngForm;
function NewPdfForm(errorMsg, setErrMsg, file, setFile, router) {
    function postFormSubmit(values) {
        console.log("submit button pressed");
        console.log(values);
        if (file == null) {
            setErrMsg("arquivo não foi selecionado");
            return;
        }
        const promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeFilePost"])(file, values.title, "pdf");
        promise.then((result)=>{
            if (result.status === 201) {
                setErrMsg("");
                console.log("sucesso png");
                return;
            }
            console.log(result);
        });
        promise.catch((err)=>{
            if (err.status === 403) {
                console.log(err);
                router.push("/login");
            }
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Formik"], {
        initialValues: {
            title: ""
        },
        onSubmit: postFormSubmit,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Form"], {
            className: "flex flex-col gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: errorMsg
                }, void 0, false, {
                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                    name: "title",
                    placeholder: "Título do png",
                    className: "border p-2 rounded"
                }, void 0, false, {
                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 border rounded-lg p-2 ",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/file.svg",
                                    alt: "file icon",
                                    height: 20,
                                    width: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    onChange: (e)=>{
                                        setFile(e.currentTarget.files ? e.currentTarget.files[0] : null);
                                    },
                                    placeholder: "batata",
                                    className: "text-lg"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "border rounded-lg p-2",
                            children: "Enviar"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
            lineNumber: 129,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_c2 = NewPdfForm;
function NewTxtForm() {
    function postFormSubmit(values) {
        console.log("submit button pressed");
        console.log(values);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Formik"], {
        initialValues: {
            title: "",
            body: ""
        },
        onSubmit: postFormSubmit,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Form"], {
            className: "flex flex-col gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                    name: "title",
                    placeholder: "Título",
                    className: "border p-2 rounded"
                }, void 0, false, {
                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                    name: "body",
                    placeholder: "Conteúdo",
                    className: "border p-2 rounded"
                }, void 0, false, {
                    fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
                    lineNumber: 174,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
            lineNumber: 168,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(protected)/profile/[profile]/forms.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
_c3 = NewTxtForm;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "NewPostForm");
__turbopack_context__.k.register(_c1, "NewPngForm");
__turbopack_context__.k.register(_c2, "NewPdfForm");
__turbopack_context__.k.register(_c3, "NewTxtForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/(protected)/profile/[profile]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>UserProfilePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/requisition.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/axios/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$postcard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/postcard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$profile$2f5b$profile$5d2f$forms$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(protected)/profile/[profile]/forms.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
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
;
;
function UserProfilePage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [newPostType, setPostType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("none");
    const [errorMsg, setErrMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const profile_id = params.profile;
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        id: 0,
        owner: true,
        name: "",
        bio: "",
        image: "",
        job: "",
        posts: []
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserProfilePage.useEffect": ()=>{
            const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserProfile"])(profile_id);
            response.then({
                "UserProfilePage.useEffect": (result)=>{
                    setUser(result);
                    setLoading(false);
                }
            }["UserProfilePage.useEffect"]);
            response.catch({
                "UserProfilePage.useEffect": (err)=>{
                    if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AxiosError"]) {
                        if (err.status === 403) {
                            router.push("/login");
                        }
                    }
                    console.error(err);
                    setLoading(false);
                }
            }["UserProfilePage.useEffect"]);
        }
    }["UserProfilePage.useEffect"], [
        setUser,
        profile_id,
        router
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
            lineNumber: 55,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-12 flex flex-col gap-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex p-3 rounded gap-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-10 justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border rounded-full w-60 aspect-square overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$requisition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPngUrl"])(user.id, "user"),
                                alt: "profile image",
                                width: 160,
                                height: 160,
                                className: "w-full"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-5xl font-bold content-center",
                                        children: user.owner ? "Seu perfil" : `${user.name}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "content-center text-4xl font-bold",
                                        children: "-"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                                        lineNumber: 80,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "content-center text-2xl",
                                        children: user.job
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            user.owner ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/edit_profile",
                                className: "bg-blue-400 rounded-xl p-2 text-2xl font-bold w-fit hover:bg-blue-500",
                                children: "Editar perfil"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border p-3 rounded-lg flex flex-col gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold",
                        children: "Sobre mim:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "border rounded-lg p-2",
                        children: user.bio === "" ? "Não há bio disponível." : user.bio
                    }, void 0, false, {
                        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            user.owner ? newPostType == "none" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "text-2xl font-bold border rounded-lg p-2",
                    onClick: ()=>setPostType("txt"),
                    children: "Fazer postagem"
                }, void 0, false, {
                    fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                    lineNumber: 106,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                lineNumber: 105,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border p-3 flex flex-col gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold",
                                children: "Nova postagem:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                                lineNumber: 116,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `p-2 rounded-lg border ${newPostType == "txt" ? "bg-blue-400" : ""}`,
                                        onClick: ()=>setPostType("txt"),
                                        children: "Texto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `p-2 rounded-lg border ${newPostType == "pdf" ? "bg-blue-400" : ""}`,
                                        onClick: ()=>setPostType("pdf"),
                                        children: "Pdf"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `p-2 rounded-lg border ${newPostType == "png" ? "bg-blue-400" : ""}`,
                                        onClick: ()=>setPostType("png"),
                                        children: "Png"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                        lineNumber: 115,
                        columnNumber: 13
                    }, this),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$profile$2f5b$profile$5d2f$forms$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(newPostType, errorMsg, setErrMsg, file, setFile, router)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                lineNumber: 114,
                columnNumber: 11
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl p-3 font-bold",
                children: "Postagens:"
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 flex-wrap ",
                children: user.posts.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$postcard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makePostCard"])
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(protected)/profile/[profile]/page.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(UserProfilePage, "3Sv6ZCwLq8pKWukNRqMwBYgb+6s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = UserProfilePage;
var _c;
__turbopack_context__.k.register(_c, "UserProfilePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_6814534a._.js.map