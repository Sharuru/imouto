var hljs = new function () {
    function n(v) {
        return v.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
    }

    function m(v) {
        return v.nodeName.toLowerCase();
    }

    function j(v, w) {
        var x = v && v.exec(w);
        return x && x.index == 0;
    }

    function i(w) {
        var v = (w.className + " " + (w.parentNode ? w.parentNode.className : "")).split(/\s+/);
        v = v.map(function (x) {
            return x.replace(/^lang(uage)?-/, "");
        });
        return v.filter(function (x) {
            return l(x) || x == "no-highlight";
        })[0];
    }

    function t(w, x) {
        var y = {};
        for (var v in w) {
            y[v] = w[v];
        }
        if (x) {
            for (var v in x) {
                y[v] = x[v];
            }
        }
        return y;
    }

    function o(w) {
        var x = [];
        (function v(y, z) {
            for (var A = y.firstChild; A; A = A.nextSibling) {
                if (A.nodeType == 3) {
                    z += A.nodeValue.length;
                } else {
                    if (m(A) == "br") {
                        z += 1;
                    } else {
                        if (A.nodeType == 1) {
                            x.push({event: "start", offset: z, node: A});
                            z = v(A, z);
                            x.push({event: "stop", offset: z, node: A});
                        }
                    }
                }
            }
            return z;
        })(w, 0);
        return x;
    }

    function g(y, A, E) {
        var z = 0;
        var w = "";
        var B = [];

        function D() {
            if (!y.length || !A.length) {
                return y.length ? y : A;
            }
            if (y[0].offset != A[0].offset) {
                return (y[0].offset < A[0].offset) ? y : A;
            }
            return A[0].event == "start" ? y : A;
        }

        function C(H) {
            function G(I) {
                return " " + I.nodeName + '="' + n(I.value) + '"';
            }

            w += "<" + m(H) + Array.prototype.map.call(H.attributes, G).join("") + ">";
        }

        function v(G) {
            w += "</" + m(G) + ">";
        }

        function x(G) {
            (G.event == "start" ? C : v)(G.node);
        }

        while (y.length || A.length) {
            var F = D();
            w += n(E.substr(z, F[0].offset - z));
            z = F[0].offset;
            if (F == y) {
                B.reverse().forEach(v);
                do {
                    x(F.splice(0, 1)[0]);
                    F = D();
                } while (F == y && F.length && F[0].offset == z);
                B.reverse().forEach(C);
            } else {
                if (F[0].event == "start") {
                    B.push(F[0].node);
                } else {
                    B.pop();
                }
                x(F.splice(0, 1)[0]);
            }
        }
        return w + n(E.substr(z));
    }

    function r(x) {
        function y(z) {
            return (z && z.source) || z;
        }

        function v(A, z) {
            return RegExp(y(A), "m" + (x.cI ? "i" : "") + (z ? "g" : ""));
        }

        function w(C, A) {
            if (C.compiled) {
                return;
            }
            C.compiled = true;
            C.k = C.k || C.bK;
            if (C.k) {
                var B = {};
                var D = function (G, F) {
                    if (x.cI) {
                        F = F.toLowerCase();
                    }
                    F.split(" ").forEach(function (I) {
                        var H = I.split("|");
                        B[H[0]] = [G, H[1] ? Number(H[1]) : 1];
                    });
                };
                if (typeof C.k == "string") {
                    D("keyword", C.k);
                } else {
                    Object.keys(C.k).forEach(function (F) {
                        D(F, C.k[F]);
                    });
                }
                C.k = B;
            }
            C.lR = v(C.l || /\b[A-Za-z0-9_]+\b/, true);
            if (A) {
                if (C.bK) {
                    C.b = "\\b(" + C.bK.split(" ").join("|") + ")\\b";
                }
                if (!C.b) {
                    C.b = /\B|\b/;
                }
                C.bR = v(C.b);
                if (!C.e && !C.eW) {
                    C.e = /\B|\b/;
                }
                if (C.e) {
                    C.eR = v(C.e);
                }
                C.tE = y(C.e) || "";
                if (C.eW && A.tE) {
                    C.tE += (C.e ? "|" : "") + A.tE;
                }
            }
            if (C.i) {
                C.iR = v(C.i);
            }
            if (C.r === undefined) {
                C.r = 1;
            }
            if (!C.c) {
                C.c = [];
            }
            var z = [];
            C.c.forEach(function (F) {
                if (F.v) {
                    F.v.forEach(function (G) {
                        z.push(t(F, G));
                    });
                } else {
                    z.push(F == "self" ? C : F);
                }
            });
            C.c = z;
            C.c.forEach(function (F) {
                w(F, C);
            });
            if (C.starts) {
                w(C.starts, A);
            }
            var E = C.c.map(function (F) {
                return F.bK ? "\\.?(" + F.b + ")\\.?" : F.b;
            }).concat([C.tE, C.i]).map(y).filter(Boolean);
            C.t = E.length ? v(E.join("|"), true) : {
                exec: function (F) {
                    return null;
                }
            };
            C.continuation = {};
        }

        w(x);
    }

    function c(S, L, H, R) {
        function B(U, V) {
            for (var T = 0; T < V.c.length; T++) {
                if (j(V.c[T].bR, U)) {
                    return V.c[T];
                }
            }
        }

        function J(U, T) {
            if (j(U.eR, T)) {
                return U;
            }
            if (U.eW) {
                return J(U.parent, T);
            }
        }

        function v(T, U) {
            return !H && j(U.iR, T);
        }

        function z(V, T) {
            var U = M.cI ? T[0].toLowerCase() : T[0];
            return V.k.hasOwnProperty(U) && V.k[U];
        }

        function D(Y, V, X, U) {
            var Z = U ? "" : b.classPrefix, T = '<span class="' + Z, W = X ? "" : "</span>";
            T += Y + '">';
            return T + V + W;
        }

        function N() {
            if (!F.k) {
                return n(x);
            }
            var W = "";
            var V = 0;
            F.lR.lastIndex = 0;
            var T = F.lR.exec(x);
            while (T) {
                W += n(x.substr(V, T.index - V));
                var U = z(F, T);
                if (U) {
                    E += U[1];
                    W += D(U[0], n(T[0]));
                } else {
                    W += n(T[0]);
                }
                V = F.lR.lastIndex;
                T = F.lR.exec(x);
            }
            return W + n(x.substr(V));
        }

        function A() {
            if (F.sL && !f[F.sL]) {
                return n(x);
            }
            var T = F.sL ? c(F.sL, x, true, F.continuation.top) : e(x);
            if (F.r > 0) {
                E += T.r;
            }
            if (F.subLanguageMode == "continuous") {
                F.continuation.top = T.top;
            }
            return D(T.language, T.value, false, true);
        }

        function Q() {
            return F.sL !== undefined ? A() : N();
        }

        function P(V, U) {
            var T = V.cN ? D(V.cN, "", true) : "";
            if (V.rB) {
                y += T;
                x = "";
            } else {
                if (V.eB) {
                    y += n(U) + T;
                    x = "";
                } else {
                    y += T;
                    x = U;
                }
            }
            F = Object.create(V, {parent: {value: F}});
        }

        function C(X, W) {
            x += X;
            if (W === undefined) {
                y += Q();
                return 0;
            }
            var U = B(W, F);
            if (U) {
                y += Q();
                P(U, W);
                return U.rB ? 0 : W.length;
            }
            var V = J(F, W);
            if (V) {
                var T = F;
                if (!(T.rE || T.eE)) {
                    x += W;
                }
                y += Q();
                do {
                    if (F.cN) {
                        y += "</span>";
                    }
                    E += F.r;
                    F = F.parent;
                } while (F != V.parent);
                if (T.eE) {
                    y += n(W);
                }
                x = "";
                if (V.starts) {
                    P(V.starts, "");
                }
                return T.rE ? 0 : W.length;
            }
            if (v(W, F)) {
                throw new Error('Illegal lexeme "' + W + '" for mode "' + (F.cN || "<unnamed>") + '"');
            }
            x += W;
            return W.length || 1;
        }

        var M = l(S);
        if (!M) {
            throw new Error('Unknown language: "' + S + '"');
        }
        r(M);
        var F = R || M;
        var y = "";
        for (var K = F; K != M; K = K.parent) {
            if (K.cN) {
                y += D(K.cN, y, true);
            }
        }
        var x = "";
        var E = 0;
        try {
            var w, I, G = 0;
            while (true) {
                F.t.lastIndex = G;
                w = F.t.exec(L);
                if (!w) {
                    break;
                }
                I = C(L.substr(G, w.index - G), w[0]);
                G = w.index + I;
            }
            C(L.substr(G));
            for (var K = F; K.parent; K = K.parent) {
                if (K.cN) {
                    y += "</span>";
                }
            }
            return {r: E, value: y, language: S, top: F};
        } catch (O) {
            if (O.message.indexOf("Illegal") != -1) {
                return {r: 0, value: n(L)};
            } else {
                throw O;
            }
        }
    }

    function e(x, w) {
        w = w || b.languages || Object.keys(f);
        var y = {r: 0, value: n(x)};
        var v = y;
        w.forEach(function (z) {
            if (!l(z)) {
                return;
            }
            var A = c(z, x, false);
            A.language = z;
            if (A.r > v.r) {
                v = A;
            }
            if (A.r > y.r) {
                v = y;
                y = A;
            }
        });
        if (v.language) {
            y.second_best = v;
        }
        return y;
    }

    function h(v) {
        if (b.tabReplace) {
            v = v.replace(/^((<[^>]+>|\t)+)/gm, function (z, y, x, w) {
                return y.replace(/\t/g, b.tabReplace);
            });
        }
        if (b.useBR) {
            v = v.replace(/\n/g, "<br>");
        }
        return v;
    }

    function u(y) {
        var x = b.useBR ? y.innerHTML.replace(/\n/g, "").replace(/<br>|<br [^>]*>/g, "\n").replace(/<[^>]*>/g, "") : y.textContent;
        var v = i(y);
        if (v == "no-highlight") {
            return;
        }
        var z = v ? c(v, x, true) : e(x);
        var A = o(y);
        if (A.length) {
            var w = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
            w.innerHTML = z.value;
            z.value = g(A, o(w), x);
        }
        z.value = h(z.value);
        y.innerHTML = z.value;
        y.className += " hljs " + (!v && z.language || "");
        y.result = {language: z.language, re: z.r};
        if (z.second_best) {
            y.second_best = {language: z.second_best.language, re: z.second_best.r};
        }
    }

    var b = {classPrefix: "hljs-", tabReplace: null, useBR: false, languages: undefined};

    function k(v) {
        b = t(b, v);
    }

    function q() {
        if (q.called) {
            return;
        }
        q.called = true;
        var v = document.querySelectorAll("pre code");
        Array.prototype.forEach.call(v, u);
    }

    function a() {
        addEventListener("DOMContentLoaded", q, false);
        addEventListener("load", q, false);
    }

    var f = {};
    var s = {};

    function d(x, w) {
        var v = f[x] = w(this);
        if (v.aliases) {
            v.aliases.forEach(function (y) {
                s[y] = x;
            });
        }
    }

    function p() {
        return Object.keys(f);
    }

    function l(v) {
        return f[v] || f[s[v]];
    }

    this.highlight = c;
    this.highlightAuto = e;
    this.fixMarkup = h;
    this.highlightBlock = u;
    this.configure = k;
    this.initHighlighting = q;
    this.initHighlightingOnLoad = a;
    this.registerLanguage = d;
    this.listLanguages = p;
    this.getLanguage = l;
    this.inherit = t;
    this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
    this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
    this.NR = "\\b\\d+(\\.\\d+)?";
    this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
    this.BNR = "\\b(0b[01]+)";
    this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
    this.BE = {b: "\\\\[\\s\\S]", r: 0};
    this.ASM = {cN: "string", b: "'", e: "'", i: "\\n", c: [this.BE]};
    this.QSM = {cN: "string", b: '"', e: '"', i: "\\n", c: [this.BE]};
    this.PWM = {b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/};
    this.CLCM = {cN: "comment", b: "//", e: "$", c: [this.PWM]};
    this.CBCM = {cN: "comment", b: "/\\*", e: "\\*/", c: [this.PWM]};
    this.HCM = {cN: "comment", b: "#", e: "$", c: [this.PWM]};
    this.NM = {cN: "number", b: this.NR, r: 0};
    this.CNM = {cN: "number", b: this.CNR, r: 0};
    this.BNM = {cN: "number", b: this.BNR, r: 0};
    this.CSSNM = {
        cN: "number",
        b: this.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    };
    this.RM = {cN: "regexp", b: /\//, e: /\/[gim]*/, i: /\n/, c: [this.BE, {b: /\[/, e: /\]/, r: 0, c: [this.BE]}]};
    this.TM = {cN: "title", b: this.IR, r: 0};
    this.UTM = {cN: "title", b: this.UIR, r: 0};
}();
hljs.registerLanguage("javascript", function (a) {
    return {
        aliases: ["js"],
        k: {
            keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"
        },
        c: [{
            cN: "pi",
            b: /^\s*('|")use strict('|")/,
            r: 10
        }, a.ASM, a.QSM, a.CLCM, a.CBCM, a.CNM, {
            b: "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [a.CLCM, a.CBCM, a.RM, {b: /</, e: />;/, r: 0, sL: "xml"}],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            eE: true,
            c: [a.inherit(a.TM, {b: /[A-Za-z$_][0-9A-Za-z$_]*/}), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                c: [a.CLCM, a.CBCM],
                i: /["'\(]/
            }],
            i: /\[|%/
        }, {b: /\$[(.]/}, {b: "\\." + a.IR, r: 0}]
    };
});
hljs.registerLanguage("css", function (b) {
    var c = "[a-zA-Z-][a-zA-Z0-9_-]*";
    var a = {cN: "function", b: c + "\\(", rB: true, eE: true, e: "\\("};
    return {
        cI: true,
        i: "[=/|']",
        c: [b.CBCM, {cN: "id", b: "\\#[A-Za-z0-9_-]+"}, {
            cN: "class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {cN: "attr_selector", b: "\\[", e: "\\]", i: "$"}, {
            cN: "pseudo",
            b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
        }, {cN: "at_rule", b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page"}, {
            cN: "at_rule",
            b: "@",
            e: "[{;]",
            c: [{cN: "keyword", b: /\S+/}, {b: /\s/, eW: true, eE: true, r: 0, c: [a, b.ASM, b.QSM, b.CSSNM]}]
        }, {cN: "tag", b: c, r: 0}, {
            cN: "rules",
            b: "{",
            e: "}",
            i: "[^\\s]",
            r: 0,
            c: [b.CBCM, {
                cN: "rule",
                b: "[^\\s]",
                rB: true,
                e: ";",
                eW: true,
                c: [{
                    cN: "attribute",
                    b: "[A-Z\\_\\.\\-]+",
                    e: ":",
                    eE: true,
                    i: "[^\\s]",
                    starts: {
                        cN: "value",
                        eW: true,
                        eE: true,
                        c: [a, b.CSSNM, b.QSM, b.ASM, b.CBCM, {cN: "hexcolor", b: "#[0-9A-Fa-f]+"}, {
                            cN: "important",
                            b: "!important"
                        }]
                    }
                }]
            }]
        }]
    };
});
hljs.registerLanguage("xml", function (c) {
    var a = "[A-Za-z0-9\\._:-]+";
    var b = {b: /<\?(php)?(?!\w)/, e: /\?>/, sL: "php", subLanguageMode: "continuous"};
    var d = {
        eW: true,
        i: /</,
        r: 0,
        c: [b, {cN: "attribute", b: a, r: 0}, {
            b: "=",
            r: 0,
            c: [{cN: "value", v: [{b: /"/, e: /"/}, {b: /'/, e: /'/}, {b: /[^\s\/>]+/}]}]
        }]
    };
    return {
        aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
        cI: true,
        c: [{cN: "doctype", b: "<!DOCTYPE", e: ">", r: 10, c: [{b: "\\[", e: "\\]"}]}, {
            cN: "comment",
            b: "<!--",
            e: "-->",
            r: 10
        }, {cN: "cdata", b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10}, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {title: "style"},
            c: [d],
            starts: {e: "</style>", rE: true, sL: "css"}
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {title: "script"},
            c: [d],
            starts: {e: "<\/script>", rE: true, sL: "javascript"}
        }, {b: "<%", e: "%>", sL: "vbscript"}, b, {cN: "pi", b: /<\?\w+/, e: /\?>/, r: 10}, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{cN: "title", b: "[^ /><]+", r: 0}, d]
        }]
    };
});
hljs.registerLanguage("http", function (a) {
    return {
        i: "\\S",
        c: [{cN: "status", b: "^HTTP/[0-9\\.]+", e: "$", c: [{cN: "number", b: "\\b\\d{3}\\b"}]}, {
            cN: "request",
            b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
            rB: true,
            e: "$",
            c: [{cN: "string", b: " ", e: " ", eB: true, eE: true}]
        }, {
            cN: "attribute",
            b: "^\\w",
            e: ": ",
            eE: true,
            i: "\\n|\\s|=",
            starts: {cN: "string", e: "$"}
        }, {b: "\\n\\n", starts: {sL: "", eW: true}}]
    };
});
hljs.registerLanguage("php", function (e) {
    var c = {cN: "variable", b: "(\\$|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*"};
    var d = {cN: "preprocessor", b: /<\?(php)?|\?>/};
    var a = {
        cN: "string",
        c: [e.BE, d],
        v: [{b: 'b"', e: '"'}, {b: "b'", e: "'"}, e.inherit(e.ASM, {i: null}), e.inherit(e.QSM, {i: null})]
    };
    var b = {v: [e.BNM, e.CNM]};
    return {
        aliases: ["php3", "php4", "php5", "php6"],
        cI: true,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
        c: [e.CLCM, e.HCM, {
            cN: "comment",
            b: "/\\*",
            e: "\\*/",
            c: [{cN: "phpdoc", b: "\\s@[A-Za-z]+"}, d]
        }, {cN: "comment", b: "__halt_compiler.+?;", eW: true, k: "__halt_compiler", l: e.UIR}, {
            cN: "string",
            b: "<<<['\"]?\\w+['\"]?$",
            e: "^\\w+;",
            c: [e.BE]
        }, d, c, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            eE: true,
            i: "\\$|\\[|%",
            c: [e.UTM, {cN: "params", b: "\\(", e: "\\)", c: ["self", c, e.CBCM, a, b]}]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: true,
            i: /[:\(\$"]/,
            c: [{bK: "extends implements", r: 10}, e.UTM]
        }, {bK: "namespace", e: ";", i: /[\.']/, c: [e.UTM]}, {bK: "use", e: ";", c: [e.UTM]}, {b: "=>"}, a, b]
    };
});
hljs.registerLanguage("python", function (e) {
    var d = {cN: "prompt", b: /^(>>>|\.\.\.) /};
    var f = {
        cN: "string",
        c: [e.BE],
        v: [{b: /(u|b)?r?'''/, e: /'''/, c: [d], r: 10}, {b: /(u|b)?r?"""/, e: /"""/, c: [d], r: 10}, {
            b: /(u|r|ur)'/,
            e: /'/,
            r: 10
        }, {b: /(u|r|ur)"/, e: /"/, r: 10}, {b: /(b|br)'/, e: /'/}, {b: /(b|br)"/, e: /"/}, e.ASM, e.QSM]
    };
    var b = {cN: "number", r: 0, v: [{b: e.BNR + "[lLjJ]?"}, {b: "\\b(0o[0-7]+)[lLjJ]?"}, {b: e.CNR + "[lLjJ]?"}]};
    var c = {cN: "params", b: /\(/, e: /\)/, c: ["self", d, b, f]};
    var a = {e: /:/, i: /[${=;\n]/, c: [e.UTM, c]};
    return {
        aliases: ["py", "gyp"],
        k: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        i: /(<\/|->|\?)/,
        c: [d, b, f, e.HCM, e.inherit(a, {cN: "function", bK: "def", r: 10}), e.inherit(a, {
            cN: "class",
            bK: "class"
        }), {cN: "decorator", b: /@/, e: /$/}, {b: /\b(print|exec)\(/}]
    };
});
hljs.registerLanguage("sql", function (a) {
    var b = {cN: "comment", b: "--", e: "$"};
    return {
        cI: true,
        i: /[<>]/,
        c: [{
            cN: "operator",
            bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate savepoint release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup",
            e: /;/,
            eW: true,
            k: {
                keyword: "abs absolute acos action add adddate addtime aes_decrypt aes_encrypt after aggregate all allocate alter analyze and any are as asc ascii asin assertion at atan atan2 atn2 authorization authors avg backup before begin benchmark between bin binlog bit_and bit_count bit_length bit_or bit_xor both by cache call cascade cascaded case cast catalog ceil ceiling chain change changed char_length character_length charindex charset check checksum checksum_agg choose close coalesce coercibility collate collation collationproperty column columns columns_updated commit compress concat concat_ws concurrent connect connection connection_id consistent constraint constraints continue contributors conv convert convert_tz corresponding cos cot count count_big crc32 create cross cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime data database databases datalength date_add date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear deallocate declare decode default deferrable deferred degrees delayed delete des_decrypt des_encrypt des_key_file desc describe descriptor diagnostics difference disconnect distinct distinctrow div do domain double drop dumpfile each else elt enclosed encode encrypt end end-exec engine engines eomonth errors escape escaped event eventdata events except exception exec execute exists exp explain export_set extended external extract fast fetch field fields find_in_set first first_value floor flush for force foreign format found found_rows from from_base64 from_days from_unixtime full function get get_format get_lock getdate getutcdate global go goto grant grants greatest group group_concat grouping grouping_id gtid_subset gtid_subtract handler having help hex high_priority hosts hour ident_current ident_incr ident_seed identified identity if ifnull ignore iif ilike immediate in index indicator inet6_aton inet6_ntoa inet_aton inet_ntoa infile initially inner innodb input insert install instr intersect into is is_free_lock is_ipv4 is_ipv4_compat is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation join key kill language last last_day last_insert_id last_value lcase lead leading least leaves left len lenght level like limit lines ln load load_file local localtime localtimestamp locate lock log log10 log2 logfile logs low_priority lower lpad ltrim make_set makedate maketime master master_pos_wait match matched max md5 medium merge microsecond mid min minute mod mode module month monthname mutex name_const names national natural nchar next no no_write_to_binlog not now nullif nvarchar oct octet_length of old_password on only open optimize option optionally or ord order outer outfile output pad parse partial partition password patindex percent_rank percentile_cont percentile_disc period_add period_diff pi plugin position pow power pragma precision prepare preserve primary prior privileges procedure procedure_analyze processlist profile profiles public publishingservername purge quarter query quick quote quotename radians rand read references regexp relative relaylog release release_lock rename repair repeat replace replicate reset restore restrict return returns reverse revoke right rlike rollback rollup round row row_count rows rpad rtrim savepoint schema scroll sec_to_time second section select serializable server session session_user set sha sha1 sha2 share show sign sin size slave sleep smalldatetimefromparts snapshot some soname soundex sounds_like space sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sql_variant_property sqlstate sqrt square start starting status std stddev stddev_pop stddev_samp stdev stdevp stop str str_to_date straight_join strcmp string stuff subdate substr substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset system_user sysutcdatetime table tables tablespace tan temporary terminated tertiary_weights then time time_format time_to_sec timediff timefromparts timestamp timestampadd timestampdiff timezone_hour timezone_minute to to_base64 to_days to_seconds todatetimeoffset trailing transaction translation trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse ucase uncompress uncompressed_length unhex unicode uninstall union unique unix_timestamp unknown unlock update upgrade upped upper usage use user user_resources using utc_date utc_time utc_timestamp uuid uuid_short validate_password_strength value values var var_pop var_samp variables variance varp version view warnings week weekday weekofyear weight_string when whenever where with work write xml xor year yearweek zon",
                literal: "true false null",
                built_in: "array bigint binary bit blob boolean char character date dec decimal float int integer interval number numeric real serial smallint varchar varying int8 serial8 text"
            },
            c: [{cN: "string", b: "'", e: "'", c: [a.BE, {b: "''"}]}, {
                cN: "string",
                b: '"',
                e: '"',
                c: [a.BE, {b: '""'}]
            }, {cN: "string", b: "`", e: "`", c: [a.BE]}, a.CNM, a.CBCM, b]
        }, a.CBCM, b]
    };
});
hljs.registerLanguage("json", function (e) {
    var c = {literal: "true false null"};
    var b = [e.QSM, e.CNM];
    var a = {cN: "value", e: ",", eW: true, eE: true, c: b, k: c};
    var f = {
        b: "{",
        e: "}",
        c: [{cN: "attribute", b: '\\s*"', e: '"\\s*:\\s*', eB: true, eE: true, c: [e.BE], i: "\\n", starts: a}],
        i: "\\S"
    };
    var d = {b: "\\[", e: "\\]", c: [e.inherit(a, {cN: null})], i: "\\S"};
    b.splice(b.length, 0, f, d);
    return {c: b, k: c, i: "\\S"};
});
