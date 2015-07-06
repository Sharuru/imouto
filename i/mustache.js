/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
var Mustache;
(function (b) {
    if (typeof module !== "undefined") {
        module.exports = b;
    } else {
        if (typeof define === "function") {
            define(b);
        } else {
            Mustache = b;
        }
    }
}(function () {
    var N = {};
    N.name = "mustache.js";
    N.version = "0.5.1-dev";
    N.tags = ["{{", "}}"];
    N.parse = P;
    N.clearCache = D;
    N.compile = W;
    N.compilePartial = T;
    N.render = C;
    N.Scanner = G;
    N.Context = J;
    N.Renderer = I;
    N.to_html = function (b, d, c, a) {
        var e = C(b, d, c);
        if (typeof a === "function") {
            a(e);
        } else {
            return e;
        }
    };
    var ab = /\s*/;
    var R = /\s+/;
    var V = /\S/;
    var X = /\s*=/;
    var O = /\s*\}/;
    var H = /#|\^|\/|>|\{|&|=|!/;

    function M(a, b) {
        return RegExp.prototype.test.call(a, b);
    }

    function Y(a) {
        return !M(V, a);
    }

    var U = Array.isArray || function (a) {
            return Object.prototype.toString.call(a) === "[object Array]";
        };
    var S = /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF\u2028\u2029]/gm;

    function E(a) {
        var b = a.replace(S, function (c) {
            return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
        });
        return '"' + b + '"';
    }

    function Z(a) {
        return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }

    var ac = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;"};

    function Q(a) {
        return String(a).replace(/[&<>"'\/]/g, function (b) {
            return ac[b];
        });
    }

    N.isWhitespace = Y;
    N.isArray = U;
    N.quote = E;
    N.escapeRe = Z;
    N.escapeHtml = Q;
    function G(a) {
        this.string = a;
        this.tail = a;
        this.pos = 0;
    }

    G.prototype.eos = function () {
        return this.tail === "";
    };
    G.prototype.scan = function (a) {
        var b = this.tail.match(a);
        if (b && b.index === 0) {
            this.tail = this.tail.substring(b[0].length);
            this.pos += b[0].length;
            return b[0];
        }
        return null;
    };
    G.prototype.scanUntil = function (b) {
        var c, a = this.tail.search(b);
        switch (a) {
            case -1:
                c = this.tail;
                this.pos += this.tail.length;
                this.tail = "";
                break;
            case 0:
                c = null;
                break;
            default:
                c = this.tail.substring(0, a);
                this.tail = this.tail.substring(a);
                this.pos += a;
        }
        return c;
    };
    function J(b, a) {
        this.view = b;
        this.parent = a;
        this.clearCache();
    }

    J.make = function (a) {
        return (a instanceof J) ? a : new J(a);
    };
    J.prototype.clearCache = function () {
        this._cache = {};
    };
    J.prototype.push = function (a) {
        return new J(a, this);
    };
    J.prototype.lookup = function (e) {
        var b = this._cache[e];
        if (!b) {
            if (e === ".") {
                b = this.view;
            } else {
                var c = this;
                while (c) {
                    if (e.indexOf(".") > 0) {
                        var a = e.split("."), d = 0;
                        b = c.view;
                        while (b && d < a.length) {
                            b = b[a[d++]];
                        }
                    } else {
                        b = c.view[e];
                    }
                    if (b != null) {
                        break;
                    }
                    c = c.parent;
                }
            }
            this._cache[e] = b;
        }
        if (typeof b === "function") {
            b = b.call(this.view);
        }
        return b;
    };
    function I() {
        this.clearCache();
    }

    I.prototype.clearCache = function () {
        this._cache = {};
        this._partialCache = {};
    };
    I.prototype.compile = function (a, c) {
        if (typeof a === "string") {
            a = P(a, c);
        }
        var b = aa(a), d = this;
        return function (e) {
            return b(J.make(e), d);
        };
    };
    I.prototype.compilePartial = function (b, a, c) {
        this._partialCache[b] = this.compile(a, c);
        return this._partialCache[b];
    };
    I.prototype.render = function (a, c) {
        var b = this._cache[a];
        if (!b) {
            b = this.compile(a);
            this._cache[a] = b;
        }
        return b(c);
    };
    I.prototype._section = function (b, a, d) {
        var e = a.lookup(b);
        switch (typeof e) {
            case"object":
                if (U(e)) {
                    var i = "";
                    for (var h = 0, f = e.length; h < f; ++h) {
                        i += d(a.push(e[h]), this);
                    }
                    return i;
                }
                return e ? d(a.push(e), this) : "";
            case"function":
                var j = d(a, this), c = this;
                var g = function (k) {
                    return c.render(k, a);
                };
                return e.call(a.view, j, g) || "";
            default:
                if (e) {
                    return d(a, this);
                }
        }
        return "";
    };
    I.prototype._inverted = function (d, c, a) {
        var b = c.lookup(d);
        if (b == null || b === false || (U(b) && b.length === 0)) {
            return a(c, this);
        }
        return "";
    };
    I.prototype._partial = function (c, b) {
        var a = this._partialCache[c];
        if (a) {
            return a(b, this);
        }
        return "";
    };
    I.prototype._name = function (d, c, b) {
        var a = c.lookup(d);
        if (typeof a === "function") {
            a = a.call(c.view);
        }
        var e = (a == null) ? "" : String(a);
        if (b) {
            return Q(e);
        }
        return e;
    };
    function aa(c, b) {
        var g = ['""'];
        var e, a, d;
        for (var f = 0, h = c.length; f < h; ++f) {
            e = c[f];
            switch (e.type) {
                case"#":
                case"^":
                    a = (e.type === "#") ? "_section" : "_inverted";
                    g.push("r." + a + "(" + E(e.value) + ", c, function (c, r) {\n" + "  " + aa(e.tokens, true) + "\n" + "})");
                    break;
                case"{":
                case"&":
                case"name":
                    d = e.type === "name" ? "true" : "false";
                    g.push("r._name(" + E(e.value) + ", c, " + d + ")");
                    break;
                case">":
                    g.push("r._partial(" + E(e.value) + ", c)");
                    break;
                case"text":
                    g.push(E(e.value));
                    break;
            }
        }
        g = "return " + g.join(" + ") + ";";
        if (b) {
            return g;
        }
        return new Function("c, r", g);
    }

    function K(a) {
        if (a.length === 2) {
            return [new RegExp(Z(a[0]) + "\\s*"), new RegExp("\\s*" + Z(a[1]))];
        }
        throw new Error("Invalid tags: " + a.join(" "));
    }

    function L(b) {
        var g = [];
        var c = g;
        var a = [];
        var e, d;
        for (var f = 0; f < b.length; ++f) {
            e = b[f];
            switch (e.type) {
                case"#":
                case"^":
                    e.tokens = [];
                    a.push(e);
                    c.push(e);
                    c = e.tokens;
                    break;
                case"/":
                    if (a.length === 0) {
                        throw new Error("Unopened section: " + e.value);
                    }
                    d = a.pop();
                    if (d.value !== e.value) {
                        throw new Error("Unclosed section: " + d.value);
                    }
                    if (a.length > 0) {
                        c = a[a.length - 1].tokens;
                    } else {
                        c = g;
                    }
                    break;
                default:
                    c.push(e);
            }
        }
        d = a.pop();
        if (d) {
            throw new Error("Unclosed section: " + d.value);
        }
        return g;
    }

    function ad(a) {
        var d;
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (d && d.type === "text" && c.type === "text") {
                d.value += c.value;
                a.splice(b--, 1);
            } else {
                d = c;
            }
        }
    }

    function P(f, d) {
        d = d || N.tags;
        var e = K(d);
        var o = new G(f);
        var h = [], j = [], l = false, c = false;
        var b = function () {
            if (l && !c) {
                while (j.length) {
                    h.splice(j.pop(), 1);
                }
            } else {
                j = [];
            }
            l = false;
            c = false;
        };
        var i, g, n;
        while (!o.eos()) {
            g = o.scanUntil(e[0]);
            if (g) {
                for (var m = 0, k = g.length; m < k; ++m) {
                    n = g.charAt(m);
                    if (Y(n)) {
                        j.push(h.length);
                    } else {
                        c = true;
                    }
                    h.push({type: "text", value: n});
                    if (n === "\n") {
                        b();
                    }
                }
            }
            if (!o.scan(e[0])) {
                break;
            }
            l = true;
            i = o.scan(H) || "name";
            o.scan(ab);
            if (i === "=") {
                g = o.scanUntil(X);
                o.scan(X);
                o.scanUntil(e[1]);
            } else {
                if (i === "{") {
                    var a = new RegExp("\\s*" + Z("}" + d[1]));
                    g = o.scanUntil(a);
                    o.scan(O);
                    o.scanUntil(e[1]);
                } else {
                    g = o.scanUntil(e[1]);
                }
            }
            if (!o.scan(e[1])) {
                throw new Error("Unclosed tag at " + o.pos);
            }
            h.push({type: i, value: g});
            if (i === "name" || i === "{" || i === "&") {
                c = true;
            }
            if (i === "=") {
                d = g.split(R);
                e = K(d);
            }
        }
        ad(h);
        return L(h);
    }

    var F = new I();

    function D() {
        F.clearCache();
    }

    function W(a, b) {
        return F.compile(a, b);
    }

    function T(b, a, c) {
        return F.compilePartial(b, a, c);
    }

    function C(a, d, b) {
        if (b) {
            for (var c in b) {
                T(c, b[c]);
            }
        }
        return F.render(a, d);
    }

    return N;
}()));
