(function () {
    var a = {}, k = {}, p = {}, o = window.document, q = window.RegExp, g = window.navigator, t = {lineLength: 72}, m = {
        isIE: /msie/.test(g.userAgent.toLowerCase()),
        isIE_5or6: /msie 6/.test(g.userAgent.toLowerCase()) || /msie 5/.test(g.userAgent.toLowerCase()),
        isOpera: /opera/.test(g.userAgent.toLowerCase())
    };
    var i = {
        bold: "加粗 <strong> Ctrl+B",
        boldexample: "加粗文字",
        italic: "斜体 <em> Ctrl+I",
        italicexample: "斜体文字",
        link: "链接 <a> Ctrl+L",
        linkdescription: "链接描述",
        quote: "引用 <blockquote> Ctrl+Q",
        quoteexample: "引用文字",
        code: "代码 <pre><code> Ctrl+K",
        codeexample: "请输入代码",
        image: "图片 <img> Ctrl+G",
        imagedescription: "图片描述",
        olist: "数字列表 <ol> Ctrl+O",
        ulist: "普通列表 <ul> Ctrl+U",
        litem: "列表项目",
        heading: "标题 <h1>/<h2> Ctrl+H",
        headingexample: "标题文字",
        hr: "分割线 <hr> Ctrl+R",
        more: "摘要分割线 <!--more--> Ctrl+M",
        undo: "撤销 - Ctrl+Z",
        redo: "重做 - Ctrl+Y",
        redomac: "重做 - Ctrl+Shift+Z",
        fullscreen: "全屏 - Ctrl+J",
        exitFullscreen: "退出全屏 - Ctrl+E",
        fullscreenUnsupport: "此浏览器不支持全屏操作",
        imagedialog: "<p><b>插入图片</b></p><p>请在下方的输入框内输入要插入的远程图片地址</p><p>您也可以使用编辑器下方的文件上传功能插入本地图片</p>",
        linkdialog: "<p><b>插入链接</b></p><p>请在下方的输入框内输入要插入的链接地址</p>",
        ok: "确定",
        cancel: "取消",
        help: "MD语法帮助"
    };
    var c = "http://";
    var d = "http://";
    MD.Editor = function (z, D, x) {
        x = x || {};
        if (typeof x.handler === "function") {
            x = {helpButton: x};
        }
        x.strings = x.strings || {};
        if (x.helpButton) {
            x.strings.help = x.strings.help || x.helpButton.title;
        }
        var A = function (F) {
            var E = x.strings[F] || i[F];
            if ("imagename" == F || "linkname" == F) {
                x.strings[F] = null;
            }
            return E;
        };
        D = D || "";
        var y = this.hooks = new MD.HookCollection();
        y.addNoop("onPreviewRefresh");
        y.addNoop("postBlockquoteCreation");
        y.addFalse("insertImageDialog");
        y.addFalse("insertLinkDialog");
        y.addNoop("enterFullScreen");
        y.addNoop("enterFakeFullScreen");
        y.addNoop("exitFullScreen");
        this.getC = function () {
            return z;
        };
        var B = this, C;
        this.run = function () {
            if (C) {
                return;
            }
            C = new l(D);
            var G = new n(y, A);
            var E = new h(z, C, function () {
                y.onPreviewRefresh();
            });
            var H, F;
            if (!/\?noundo/.test(o.location.href)) {
                H = new e(function () {
                    E.refresh();
                    if (F) {
                        F.setUndoRedoButtonStates();
                    }
                }, C);
                this.textOperation = function (J) {
                    H.setCommandMode();
                    J();
                    B.refreshPreview();
                };
            }
            fullScreenManager = new r(y, A);
            F = new w(D, C, H, E, G, fullScreenManager, x.helpButton, A);
            F.setUndoRedoButtonStates();
            var I = B.refreshPreview = function () {
                E.refresh(true);
            };
            I();
        };
    };
    function v() {
    }

    v.prototype.findTags = function (z, x) {
        var y = this;
        var A;
        if (z) {
            A = a.extendRegExp(z, "", "$");
            this.before = this.before.replace(A, function (B) {
                y.startTag = y.startTag + B;
                return "";
            });
            A = a.extendRegExp(z, "^", "");
            this.selection = this.selection.replace(A, function (B) {
                y.startTag = y.startTag + B;
                return "";
            });
        }
        if (x) {
            A = a.extendRegExp(x, "", "$");
            this.selection = this.selection.replace(A, function (B) {
                y.endTag = B + y.endTag;
                return "";
            });
            A = a.extendRegExp(x, "^", "");
            this.after = this.after.replace(A, function (B) {
                y.endTag = B + y.endTag;
                return "";
            });
        }
    };
    v.prototype.trimWhitespace = function (z) {
        var x, y, A = this;
        if (z) {
            x = y = "";
        } else {
            x = function (B) {
                A.before += B;
                return "";
            };
            y = function (B) {
                A.after = B + A.after;
                return "";
            };
        }
        this.selection = this.selection.replace(/^(\s*)/, x).replace(/(\s*)$/, y);
    };
    v.prototype.skipLines = function (B, z, x) {
        if (B === undefined) {
            B = 1;
        }
        if (z === undefined) {
            z = 1;
        }
        B++;
        z++;
        var y;
        var A;
        if (navigator.userAgent.match(/Chrome/)) {
            "X".match(/()./);
        }
        this.selection = this.selection.replace(/(^\n*)/, "");
        this.startTag = this.startTag + q.$1;
        this.selection = this.selection.replace(/(\n*$)/, "");
        this.endTag = this.endTag + q.$1;
        this.startTag = this.startTag.replace(/(^\n*)/, "");
        this.before = this.before + q.$1;
        this.endTag = this.endTag.replace(/(\n*$)/, "");
        this.after = this.after + q.$1;
        if (this.before) {
            y = A = "";
            while (B--) {
                y += "\\n?";
                A += "\n";
            }
            if (x) {
                y = "\\n*";
            }
            this.before = this.before.replace(new q(y + "$", ""), A);
        }
        if (this.after) {
            y = A = "";
            while (z--) {
                y += "\\n?";
                A += "\n";
            }
            if (x) {
                y = "\\n*";
            }
            this.after = this.after.replace(new q(y, ""), A);
        }
    };
    function l(x) {
        this.buttonBar = o.getElementById("wmd-button-bar" + x);
        this.preview = o.getElementById("p" + x);
        this.input = o.getElementById("text");
    }

    a.isVisible = function (x) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(x, null).getPropertyValue("display") !== "none";
        } else {
            if (x.currentStyle) {
                return x.currentStyle.display !== "none";
            }
        }
    };
    a.addEvent = function (z, y, x) {
        if (z.attachEvent) {
            z.attachEvent("on" + y, x);
        } else {
            z.addEventListener(y, x, false);
        }
    };
    a.removeEvent = function (z, y, x) {
        if (z.detachEvent) {
            z.detachEvent("on" + y, x);
        } else {
            z.removeEventListener(y, x, false);
        }
    };
    a.fixEolChars = function (x) {
        x = x.replace(/\r\n/g, "\n");
        x = x.replace(/\r/g, "\n");
        return x;
    };
    a.extendRegExp = function (B, z, A) {
        if (z === null || z === undefined) {
            z = "";
        }
        if (A === null || A === undefined) {
            A = "";
        }
        var x = B.toString();
        var y;
        x = x.replace(/\/([gim]*)$/, function (C, D) {
            y = D;
            return "";
        });
        x = x.replace(/(^\/|\/$)/g, "");
        x = z + x + A;
        return new q(x, y);
    };
    k.getTop = function (x, z) {
        var y = x.offsetTop;
        if (!z) {
            while (x = x.offsetParent) {
                y += x.offsetTop;
            }
        }
        return y;
    };
    k.getHeight = function (x) {
        return x.offsetHeight || x.scrollHeight;
    };
    k.getWidth = function (x) {
        return x.offsetWidth || x.scrollWidth;
    };
    k.getPageSize = function () {
        var z, B;
        var x, C;
        if (self.innerHeight && self.scrollMaxY) {
            z = o.body.scrollWidth;
            B = self.innerHeight + self.scrollMaxY;
        } else {
            if (o.body.scrollHeight > o.body.offsetHeight) {
                z = o.body.scrollWidth;
                B = o.body.scrollHeight;
            } else {
                z = o.body.offsetWidth;
                B = o.body.offsetHeight;
            }
        }
        if (self.innerHeight) {
            x = self.innerWidth;
            C = self.innerHeight;
        } else {
            if (o.documentElement && o.documentElement.clientHeight) {
                x = o.documentElement.clientWidth;
                C = o.documentElement.clientHeight;
            } else {
                if (o.body) {
                    x = o.body.clientWidth;
                    C = o.body.clientHeight;
                }
            }
        }
        var A = Math.max(z, x);
        var y = Math.max(B, C);
        return [A, y, x, C];
    };
    function e(C, z) {
        var I = this;
        var A = [];
        var x = 0;
        var M = "none";
        var E;
        var G;
        var L;
        var D = function (O, N) {
            if (M != O) {
                M = O;
                if (!N) {
                    J();
                }
            }
            if (!m.isIE || M != "moving") {
                G = setTimeout(y, 1);
            } else {
                L = null;
            }
        };
        var y = function (N) {
            L = new b(z, N);
            G = undefined;
        };
        this.setCommandMode = function () {
            M = "command";
            J();
            G = setTimeout(y, 0);
        };
        this.canUndo = function () {
            return x > 1;
        };
        this.canRedo = function () {
            if (A[x + 1]) {
                return true;
            }
            return false;
        };
        this.undo = function () {
            if (I.canUndo()) {
                if (E) {
                    E.restore();
                    E = null;
                } else {
                    A[x] = new b(z);
                    A[--x].restore();
                    if (C) {
                        C();
                    }
                }
            }
            M = "none";
            z.input.focus();
            y();
        };
        this.redo = function () {
            if (I.canRedo()) {
                A[++x].restore();
                if (C) {
                    C();
                }
            }
            M = "none";
            z.input.focus();
            y();
        };
        var J = function () {
            var N = L || new b(z);
            if (!N) {
                return false;
            }
            if (M == "moving") {
                if (!E) {
                    E = N;
                }
                return;
            }
            if (E) {
                if (A[x - 1].text != E.text) {
                    A[x++] = E;
                }
                E = null;
            }
            A[x++] = N;
            A[x + 1] = null;
            if (C) {
                C();
            }
        };
        var B = function (N) {
            var P = false;
            if ((N.ctrlKey || N.metaKey) && !N.altKey) {
                var O = N.charCode || N.keyCode;
                var Q = String.fromCharCode(O);
                switch (Q.toLowerCase()) {
                    case"y":
                        I.redo();
                        P = true;
                        break;
                    case"z":
                        if (!N.shiftKey) {
                            I.undo();
                        } else {
                            I.redo();
                        }
                        P = true;
                        break;
                }
            }
            if (P) {
                if (N.preventDefault) {
                    N.preventDefault();
                }
                if (window.event) {
                    window.event.returnValue = false;
                }
                return;
            }
        };
        var H = function (N) {
            if (!N.ctrlKey && !N.metaKey) {
                var O = N.keyCode;
                if ((O >= 33 && O <= 40) || (O >= 63232 && O <= 63235)) {
                    D("moving");
                } else {
                    if (O == 8 || O == 46 || O == 127) {
                        D("deleting");
                    } else {
                        if (O == 13) {
                            D("newlines");
                        } else {
                            if (O == 27) {
                                D("escape");
                            } else {
                                if ((O < 16 || O > 20) && O != 91) {
                                    D("typing");
                                }
                            }
                        }
                    }
                }
            }
        };
        var K = function () {
            a.addEvent(z.input, "keypress", function (O) {
                if ((O.ctrlKey || O.metaKey) && !O.altKey && (O.keyCode == 89 || O.keyCode == 90)) {
                    O.preventDefault();
                }
            });
            var N = function () {
                if (m.isIE || (L && L.text != z.input.value)) {
                    if (G == undefined) {
                        M = "paste";
                        J();
                        y();
                    }
                }
            };
            a.addEvent(z.input, "keydown", B);
            a.addEvent(z.input, "keydown", H);
            a.addEvent(z.input, "mousedown", function () {
                D("moving");
            });
            z.input.onpaste = N;
            z.input.ondrop = N;
        };
        var F = function () {
            K();
            y(true);
            J();
        };
        F();
    }

    function b(z, x) {
        var y = this;
        var A = z.input;
        this.init = function () {
            if (!a.isVisible(A)) {
                return;
            }
            if (!x && o.activeElement && o.activeElement !== A) {
                return;
            }
            this.setInputAreaSelectionStartEnd();
            this.scrollTop = A.scrollTop;
            if (!this.text && A.selectionStart || A.selectionStart === 0) {
                this.text = A.value;
            }
        };
        this.setInputAreaSelection = function () {
            if (!a.isVisible(A)) {
                return;
            }
            if (A.selectionStart !== undefined && !m.isOpera) {
                A.focus();
                A.selectionStart = y.start;
                A.selectionEnd = y.end;
                A.scrollTop = y.scrollTop;
            } else {
                if (o.selection) {
                    if (o.activeElement && o.activeElement !== A) {
                        return;
                    }
                    A.focus();
                    var B = A.createTextRange();
                    B.moveStart("character", -A.value.length);
                    B.moveEnd("character", -A.value.length);
                    B.moveEnd("character", y.end);
                    B.moveStart("character", y.start);
                    B.select();
                }
            }
        };
        this.setInputAreaSelectionStartEnd = function () {
            if (!z.ieCachedRange && (A.selectionStart || A.selectionStart === 0)) {
                y.start = A.selectionStart;
                y.end = A.selectionEnd;
            } else {
                if (o.selection) {
                    y.text = a.fixEolChars(A.value);
                    var E = z.ieCachedRange || o.selection.createRange();
                    var F = a.fixEolChars(E.text);
                    var D = "\x07";
                    var C = D + F + D;
                    E.text = C;
                    var G = a.fixEolChars(A.value);
                    E.moveStart("character", -C.length);
                    E.text = F;
                    y.start = G.indexOf(D);
                    y.end = G.lastIndexOf(D) - D.length;
                    var B = y.text.length - a.fixEolChars(A.value).length;
                    if (B) {
                        E.moveStart("character", -F.length);
                        while (B--) {
                            F += "\n";
                            y.end += 1;
                        }
                        E.text = F;
                    }
                    if (z.ieCachedRange) {
                        y.scrollTop = z.ieCachedScrollTop;
                    }
                    z.ieCachedRange = null;
                    this.setInputAreaSelection();
                }
            }
        };
        this.restore = function () {
            if (y.text != undefined && y.text != A.value) {
                A.value = y.text;
            }
            this.setInputAreaSelection();
            A.scrollTop = y.scrollTop;
        };
        this.getChunks = function () {
            var B = new v();
            B.before = a.fixEolChars(y.text.substring(0, y.start));
            B.startTag = "";
            B.selection = a.fixEolChars(y.text.substring(y.start, y.end));
            B.endTag = "";
            B.after = a.fixEolChars(y.text.substring(y.end));
            B.scrollTop = y.scrollTop;
            return B;
        };
        this.setChunks = function (B) {
            B.before = B.before + B.startTag;
            B.after = B.endTag + B.after;
            this.start = B.before.length;
            this.end = B.before.length + B.selection.length;
            this.text = B.before + B.selection + B.after;
            this.scrollTop = B.scrollTop;
        };
        this.init();
    }

    function h(R, x, L) {
        var H = this;
        var C;
        var B;
        var O;
        var J = 3000;
        var D = "delayed";
        var z = function (U, T) {
            a.addEvent(U, "input", T);
            U.onpaste = T;
            U.ondrop = T;
            a.addEvent(U, "keypress", T);
            a.addEvent(U, "keydown", T);
        };
        var K = function () {
            var T = 0;
            if (window.innerHeight) {
                T = window.pageYOffset;
            } else {
                if (o.documentElement && o.documentElement.scrollTop) {
                    T = o.documentElement.scrollTop;
                } else {
                    if (o.body) {
                        T = o.body.scrollTop;
                    }
                }
            }
            return T;
        };
        var A = function () {
            if (!x.preview) {
                return;
            }
            var U = iBlog.ex(x.input.value);
            if (U && U == O) {
                return;
            } else {
                O = U;
            }
            var T = new Date().getTime();
            U = R.makeHtml(U);
            var V = new Date().getTime();
            B = V - T;
            G(U);
        };
        var Q = function () {
            if (C) {
                clearTimeout(C);
                C = undefined;
            }
            if (D !== "manual") {
                var T = 0;
                if (D === "delayed") {
                    T = B;
                }
                if (T > J) {
                    T = J;
                }
                C = setTimeout(A, T);
            }
        };
        var y = function (T) {
            if (T.scrollHeight <= T.clientHeight) {
                return 1;
            }
            return T.scrollTop / (T.scrollHeight - T.clientHeight);
        };
        var S = function () {
            if (x.preview) {
                x.preview.scrollTop = (x.preview.scrollHeight - x.preview.clientHeight) * y(x.preview);
            }
        };
        this.refresh = function (T) {
            if (T) {
                O = "";
                A();
            } else {
                Q();
            }
        };
        this.processingTime = function () {
            return B;
        };
        var E = true;
        var F = function (T) {
            var W = x.preview;
            var V = W.parentNode;
            var U = W.nextSibling;
            V.removeChild(W);
            W.innerHTML = T;
            if (!U) {
                V.appendChild(W);
            } else {
                V.insertBefore(W, U);
            }
        };
        var N = function (T) {
            x.preview.innerHTML = T;
        };
        var I;
        var M = function (U) {
            if (I) {
                return I(U);
            }
            try {
                N(U);
                I = N;
            } catch (T) {
                I = F;
                I(U);
            }
        };
        var G = function (U) {
            var V = k.getTop(x.input) - K();
            if (x.preview) {
                M(U);
                L();
            }
            S();
            if (E) {
                E = false;
                return;
            }
            var T = k.getTop(x.input) - K();
            if (m.isIE) {
                setTimeout(function () {
                    window.scrollBy(0, T - V);
                }, 0);
            } else {
                window.scrollBy(0, T - V);
            }
        };
        var P = function () {
            z(x.input, Q);
            A();
            if (x.preview) {
                x.preview.scrollTop = 0;
            }
        };
        P();
    }

    p.createBackground = function () {
        var z = o.createElement("div"), x = z.style;
        z.className = "wmd-prompt-background";
        x.position = "absolute";
        x.top = "0";
        x.zIndex = "1000";
        if (m.isIE) {
            x.filter = "alpha(opacity=50)";
        } else {
            x.opacity = "0.5";
        }
        var y = k.getPageSize();
        x.height = y[1] + "px";
        if (m.isIE) {
            x.left = o.documentElement.scrollLeft;
            x.width = o.documentElement.clientWidth;
        } else {
            x.left = "0";
            x.width = "100%";
        }
        o.body.appendChild(z);
        return z;
    };
    p.prompt = function (F, z, D, B, x) {
        var A;
        var C;
        if (z === undefined) {
            z = "";
        }
        var E = function (H) {
            var I = (H.charCode || H.keyCode);
            if (I === 27) {
                G(true);
            }
        };
        var G = function (H) {
            a.removeEvent(o.body, "keydown", E);
            var I = C.value;
            if (H) {
                I = null;
            } else {
                I = I.replace(/^http:\/\/(https?|ftp):\/\//, "$1://");
                if (!/^(?:https?|ftp):\/\//.test(I)) {
                }
            }
            A.parentNode.removeChild(A);
            D(I);
            return false;
        };
        var y = function () {
            A = o.createElement("div");
            A.className = "wmd-prompt-dialog";
            var K = o.createElement("div");
            K.innerHTML = F;
            A.appendChild(K);
            var H = o.createElement("form"), L = H.style;
            H.onsubmit = function () {
                return G(false);
            };
            A.appendChild(H);
            C = o.createElement("input");
            C.type = "text";
            C.value = z;
            H.appendChild(C);
            var J = o.createElement("button");
            J.type = "button";
            J.className = "btn-s primary";
            J.onclick = function () {
                return G(false);
            };
            J.innerHTML = B;
            var I = o.createElement("button");
            I.type = "button";
            I.className = "btn-s";
            I.onclick = function () {
                return G(true);
            };
            I.innerHTML = x;
            H.appendChild(J);
            H.appendChild(I);
            a.addEvent(o.body, "keydown", E);
            o.body.appendChild(A);
        };
        setTimeout(function () {
            y();
            var I = z.length;
            if (C.selectionStart !== undefined) {
                C.selectionStart = 0;
                C.selectionEnd = I;
            } else {
                if (C.createTextRange) {
                    var H = C.createTextRange();
                    H.collapse(false);
                    H.moveStart("character", -I);
                    H.moveEnd("character", I);
                    H.select();
                }
            }
            C.focus();
        }, 0);
    };
    function w(E, x, I, J, C, B, M, F) {
        var L = x.input, z = {};
        K();
        var y = "keydown";
        if (m.isOpera) {
            y = "keypress";
        }
        a.addEvent(L, y, function (O) {
            if ((O.ctrlKey || O.metaKey) && !O.altKey && !O.shiftKey) {
                var Q = O.charCode || O.keyCode;
                var N = String.fromCharCode(Q).toLowerCase();
                switch (N) {
                    case"b":
                        G(z.bold);
                        break;
                    case"i":
                        G(z.italic);
                        break;
                    case"l":
                        G(z.link);
                        break;
                    case"q":
                        G(z.quote);
                        break;
                    case"k":
                        G(z.code);
                        break;
                    case"g":
                        G(z.image);
                        break;
                    case"o":
                        G(z.olist);
                        break;
                    case"u":
                        G(z.ulist);
                        break;
                    case"m":
                        G(z.more);
                        break;
                    case"j":
                        G(z.fullscreen);
                        break;
                    case"e":
                        G(z.exitFullscreen);
                        break;
                    case"h":
                        G(z.heading);
                        break;
                    case"r":
                        G(z.hr);
                        break;
                    case"y":
                        G(z.redo);
                        break;
                    case"z":
                        if (O.shiftKey) {
                            G(z.redo);
                        } else {
                            G(z.undo);
                        }
                        break;
                    default:
                        return;
                }
                if (O.preventDefault) {
                    O.preventDefault();
                }
                if (window.event) {
                    window.event.returnValue = false;
                }
            } else {
                if (O.keyCode == 9) {
                    var P = {};
                    P.textOp = H("doTab");
                    G(P);
                    if (O.preventDefault) {
                        O.preventDefault();
                    }
                    if (window.event) {
                        window.event.returnValue = false;
                    }
                }
            }
        });
        a.addEvent(L, "keyup", function (O) {
            if (O.shiftKey && !O.ctrlKey && !O.metaKey) {
                var P = O.charCode || O.keyCode;
                if (P === 13) {
                    var N = {};
                    N.textOp = H("doAutoindent");
                    G(N);
                }
            }
        });
        if (m.isIE) {
            a.addEvent(L, "keydown", function (N) {
                var O = N.keyCode;
                if (O === 27) {
                    return false;
                }
            });
        }
        function G(O) {
            L.focus();
            if (O.textOp) {
                if (I) {
                    I.setCommandMode();
                }
                var Q = new b(x);
                if (!Q) {
                    return;
                }
                var R = Q.getChunks();
                var N = function () {
                    L.focus();
                    if (R) {
                        Q.setChunks(R);
                    }
                    Q.restore();
                    J.refresh();
                };
                var P = O.textOp(R, N);
                if (!P) {
                    N();
                }
            }
            if (O.execute) {
                O.execute(I);
            }
        }

        function D(N, O) {
            if (O) {
                if (m.isIE) {
                    N.onmousedown = function () {
                        if (o.activeElement && o.activeElement !== x.input) {
                            return;
                        }
                        x.ieCachedRange = document.selection.createRange();
                        x.ieCachedScrollTop = x.input.scrollTop;
                    };
                }
                if (!N.isHelp) {
                    N.onclick = function () {
                        if (this.onmouseout) {
                            this.onmouseout();
                        }
                        G(this);
                        return false;
                    };
                }
            } else {
                N.onmouseover = N.onmouseout = N.onclick = function () {
                };
            }
        }

        function H(N) {
            if (typeof N === "string") {
                N = C[N];
            }
            return function () {
                N.apply(C, arguments);
            };
        }

        function K() {
            var Q = x.buttonBar;
            var S = document.createElement("ul");
            S.id = "wmd-button-row" + E;
            S.className = "wmd-button-row";
            S = Q.appendChild(S);
            var T = function (aa, Y, Z) {
                var ab = document.createElement("li");
                ab.className = "wmd-button";
                ab.id = aa + E;
                ab.innerHTML = Y.match(/[\u4e00-\u9fa5]+/);
                ab.title = Y;
                if (Z) {
                    ab.textOp = Z;
                }
                D(ab, true);
                S.appendChild(ab);
                return ab;
            };
            var P = function (X) {
                var W = document.createElement("li");
                W.className = "wmd-spacer";
                W.innerHTML = "";
                S.appendChild(W);
            };
            z.bold = T("wmd-bold-button", F("bold"), H("doBold"));
            z.italic = T("wmd-italic-button", F("italic"), H("doItalic"));
            P(1);
            z.link = T("wmd-link-button", F("link"), H(function (W, X) {
                return this.doLinkOrImage(W, X, false);
            }));
            z.quote = T("wmd-quote-button", F("quote"), H("doBlockquote"));
            z.code = T("wmd-code-button", F("code"), H("doCode"));
            z.image = T("wmd-image-button", F("image"), H(function (W, X) {
                return this.doLinkOrImage(W, X, true);
            }));
            P(2);
            z.olist = T("wmd-olist-button", F("olist"), H(function (W, X) {
                this.doList(W, X, true);
            }));
            z.ulist = T("wmd-ulist-button", F("ulist"), H(function (W, X) {
                this.doList(W, X, false);
            }));
            z.heading = T("wmd-heading-button", F("heading"), H("doHeading"));
            z.hr = T("wmd-hr-button", F("hr"), H("doHorizontalRule"));
            z.more = T("wmd-more-button", F("more"), H("doMore"));
            P(3);
            z.undo = T("wmd-undo-button", F("undo"), null);
            z.undo.execute = function (V) {
                if (V) {
                    V.undo();
                }
            };
            var N = /win/.test(g.platform.toLowerCase()) ? F("redo") : F("redomac");
            z.redo = T("wmd-redo-button", N, null);
            z.redo.execute = function (V) {
                if (V) {
                    V.redo();
                }
            };
            z.fullscreen = T("wmd-fullscreen-button", F("fullscreen"), null);
            z.fullscreen.execute = function () {
                B.doFullScreen(z, true);
            };
            z.exitFullscreen = T("wmd-exit-fullscreen-button", F("exitFullscreen"), null);
            z.exitFullscreen.style.display = "none";
            z.exitFullscreen.execute = function () {
                B.doFullScreen(z, false);
            };
            if (M) {
                var R = document.createElement("li");
                var O = document.createElement("span");
                R.appendChild(O);
                R.className = "wmd-button wmd-help-button";
                R.id = "wmd-help-button" + E;
                R.isHelp = true;
                R.style.right = "0px";
                R.title = F("help");
                R.onclick = M.handler;
                D(R, true);
                S.appendChild(R);
                z.help = R;
            }
            A();
        }

        function A() {
            if (I) {
                D(z.undo, I.canUndo());
                D(z.redo, I.canRedo());
            }
        }

        this.setUndoRedoButtonStates = A;
    }

    function n(x, y) {
        this.hooks = x;
        this.getString = y;
    }

    var f = n.prototype;
    f.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)";
    f.unwrap = function (x) {
        var y = new q("([^\\n])\\n(?!(\\n|" + this.prefixes + "))", "g");
        x.selection = x.selection.replace(y, "$1 $2");
    };
    f.wrap = function (z, x) {
        this.unwrap(z);
        var y = new q("(.{1," + x + "})( +|$\\n?)", "gm"), A = this;
        z.selection = z.selection.replace(y, function (B, C) {
            if (new q("^" + A.prefixes, "").test(B)) {
                return B;
            }
            return C + "\n";
        });
        z.selection = z.selection.replace(/\s+$/, "");
    };
    f.doBold = function (y, x) {
        return this.doBorI(y, x, 2, this.getString("boldexample"));
    };
    f.doItalic = function (y, x) {
        return this.doBorI(y, x, 1, this.getString("italicexample"));
    };
    f.doBorI = function (F, D, E, z) {
        F.trimWhitespace();
        F.selection = F.selection.replace(/\n{2,}/g, "\n");
        var C = /(\**$)/.exec(F.before)[0];
        var A = /(^\**)/.exec(F.after)[0];
        var x = Math.min(C.length, A.length);
        if ((x >= E) && (x != 2 || E != 1)) {
            F.before = F.before.replace(q("[*]{" + E + "}$", ""), "");
            F.after = F.after.replace(q("^[*]{" + E + "}", ""), "");
        } else {
            if (!F.selection && A) {
                F.after = F.after.replace(/^([*_]*)/, "");
                F.before = F.before.replace(/(\s?)$/, "");
                var B = q.$1;
                F.before = F.before + A + B;
            } else {
                if (!F.selection && !A) {
                    F.selection = z;
                }
                var y = E <= 1 ? "*" : "**";
                F.before = F.before + y;
                F.after = y + F.after;
            }
        }
        return;
    };
    f.stripLinkDefs = function (x, y) {
        x = x.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm, function (A, C, B, D, z) {
            y[C] = A.replace(/\s*$/, "");
            if (D) {
                y[C] = A.replace(/["(](.+?)[")]$/, "");
                return D + z;
            }
            return "";
        });
        return x;
    };
    f.addLinkDef = function (x, C) {
        var z = 0;
        var B = {};
        x.before = this.stripLinkDefs(x.before, B);
        x.selection = this.stripLinkDefs(x.selection, B);
        x.after = this.stripLinkDefs(x.after, B);
        var A = "";
        var F = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g;
        var E = function (G) {
            z++;
            G = G.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + z + "]:");
            A += "\n" + G;
        };
        var D = function (L, I, G, H, J, K) {
            G = G.replace(F, D);
            if (B[J]) {
                E(B[J]);
                return I + G + H + z + K;
            }
            return L;
        };
        x.before = x.before.replace(F, D);
        if (C) {
            E(C);
        } else {
            x.selection = x.selection.replace(F, D);
        }
        var y = z;
        x.after = x.after.replace(F, D);
        if (x.after) {
            x.after = x.after.replace(/\n*$/, "");
        }
        if (!x.after) {
            x.selection = x.selection.replace(/\n*$/, "");
        }
        return y;
    };
    function s(x) {
        return x.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/, function (A, z, y) {
            z = z.replace(/\?.*$/, function (B) {
                return B.replace(/\+/g, " ");
            });
            z = decodeURIComponent(z);
            z = encodeURI(z).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
            z = z.replace(/\?.*$/, function (B) {
                return B.replace(/\+/g, "%2b");
            });
            if (y) {
                y = y.trim ? y.trim() : y.replace(/^\s*/, "").replace(/\s*$/, "");
                y = y.replace(/"/g, "quot;").replace(/\(/g, "&#40;").replace(/\)/g, "&#41;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
            return y ? z + ' "' + y + '"' : z;
        });
    }

    f.doLinkOrImage = function (x, B, C) {
        x.trimWhitespace();
        x.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);
        var z;
        if (x.endTag.length > 1 && x.startTag.length > 0) {
            x.startTag = x.startTag.replace(/!?\[/, "");
            x.endTag = "";
            this.addLinkDef(x, null);
        } else {
            x.selection = x.startTag + x.selection + x.endTag;
            x.startTag = x.endTag = "";
            if (/\n\n/.test(x.selection)) {
                this.addLinkDef(x, null);
                return;
            }
            var y = this;
            var A = function (G) {
                console.log(G);
                z.parentNode.removeChild(z);
                if (G !== null) {
                    x.selection = (" " + x.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1);
                    var F = s(G);
                    var E = y.addLinkDef(x);
                    x.startTag = C ? "![" : "[";
                    x.endTag = "](" + s(G) + ")";
                    if (!x.selection) {
                        if (C) {
                            var H = y.getString("imagename");
                            if (!!H) {
                                H = H.replace(/_/g, "\\_");
                            }
                            x.selection = H || y.getString("imagedescription");
                        } else {
                            var D = y.getString("linkname");
                            if (!!D) {
                                D = D.replace(/_/g, "\\_");
                            }
                            x.selection = D || y.getString("linkdescription");
                        }
                    }
                }
                B();
            };
            z = p.createBackground();
            if (C) {
                if (!this.hooks.insertImageDialog(A)) {
                    p.prompt(this.getString("imagedialog"), c, A, this.getString("ok"), this.getString("cancel"));
                }
            } else {
                if (!this.hooks.insertLinkDialog(A)) {
                    p.prompt(this.getString("linkdialog"), d, A, this.getString("ok"), this.getString("cancel"));
                }
            }
            return true;
        }
    };
    f.doAutoindent = function (A, x) {
        var z = this, y = false;
        A.before = A.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n");
        A.before = A.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n");
        A.before = A.before.replace(/(\n|^)[ \t]+\n$/, "\n\n");
        if (!A.selection && !/^[ \t]*(?:\n|$)/.test(A.after)) {
            A.after = A.after.replace(/^[^\n]*/, function (B) {
                A.selection = B;
                return "";
            });
            y = true;
        }
        if (/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(A.before)) {
            if (z.doList) {
                z.doList(A);
            }
        }
        if (/(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(A.before)) {
            if (z.doBlockquote) {
                z.doBlockquote(A);
            }
        }
        if (/(\n|^)(\t|[ ]{4,}).*\n$/.test(A.before)) {
            if (z.doCode) {
                z.doCode(A);
            }
        }
        if (y) {
            A.after = A.selection + A.after;
            A.selection = "";
        }
    };
    f.doBlockquote = function (x, C) {
        x.selection = x.selection.replace(/^(\n*)([^\r]+?)(\n*)$/, function (J, I, H, K) {
            x.before += I;
            x.after = K + x.after;
            return H;
        });
        x.before = x.before.replace(/(>[ \t]*)$/, function (I, H) {
            x.selection = H + x.selection;
            return "";
        });
        x.selection = x.selection.replace(/^(\s|>)+$/, "");
        x.selection = x.selection || this.getString("quoteexample");
        var G = "", F = "", y;
        if (x.before) {
            var z = x.before.replace(/\n$/, "").split("\n");
            var E = false;
            for (var D = 0; D < z.length; D++) {
                var B = false;
                y = z[D];
                E = E && y.length > 0;
                if (/^>/.test(y)) {
                    B = true;
                    if (!E && y.length > 1) {
                        E = true;
                    }
                } else {
                    if (/^[ \t]*$/.test(y)) {
                        B = true;
                    } else {
                        B = E;
                    }
                }
                if (B) {
                    G += y + "\n";
                } else {
                    F += G + y;
                    G = "\n";
                }
            }
            if (!/(^|\n)>/.test(G)) {
                F += G;
                G = "";
            }
        }
        x.startTag = G;
        x.before = F;
        if (x.after) {
            x.after = x.after.replace(/^\n?/, "\n");
        }
        x.after = x.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/, function (H) {
            x.endTag = H;
            return "";
        });
        var A = function (I) {
            var H = I ? "> " : "";
            if (x.startTag) {
                x.startTag = x.startTag.replace(/\n((>|\s)*)\n$/, function (J, K) {
                    return "\n" + K.replace(/^[ ]{0,3}>?[ \t]*$/gm, H) + "\n";
                });
            }
            if (x.endTag) {
                x.endTag = x.endTag.replace(/^\n((>|\s)*)\n/, function (J, K) {
                    return "\n" + K.replace(/^[ ]{0,3}>?[ \t]*$/gm, H) + "\n";
                });
            }
        };
        if (/^(?![ ]{0,3}>)/m.test(x.selection)) {
            this.wrap(x, t.lineLength - 2);
            x.selection = x.selection.replace(/^/gm, "> ");
            A(true);
            x.skipLines();
        } else {
            x.selection = x.selection.replace(/^[ ]{0,3}> ?/gm, "");
            this.unwrap(x);
            A(false);
            if (!/^(\n|^)[ ]{0,3}>/.test(x.selection) && x.startTag) {
                x.startTag = x.startTag.replace(/\n{0,2}$/, "\n\n");
            }
            if (!/(\n|^)[ ]{0,3}>.*$/.test(x.selection) && x.endTag) {
                x.endTag = x.endTag.replace(/^\n{0,2}/, "\n\n");
            }
        }
        x.selection = this.hooks.postBlockquoteCreation(x.selection);
        if (!/\n/.test(x.selection)) {
            x.selection = x.selection.replace(/^(> *)/, function (H, I) {
                x.startTag += I;
                return "";
            });
        }
    };
    f.doCode = function (x, z) {
        var y = /```([\w]{1,})[\s]{0,2}$/m.test(x.before);
        var A = /^[\s]{0,2}```/.test(x.after);
        if ((!A && !y)) {
            x.startTag = "\n```code\n";
            x.endTag = "\n```\n";
            if (!x.selection) {
                x.selection = "在这里输入代码";
            }
        } else {
            if (x.selection == "在这里输入代码") {
                x.before = x.before.replace(/\n```code\n/, "");
                x.after = x.after.replace(/^\n```\n/, "");
                x.selection = "";
            } else {
                x.trimWhitespace();
                x.findTags(/```/, /```/);
                if (!x.startTag && !x.endTag) {
                    x.startTag = "\n```code\n";
                    x.endTag = "\n```\n";
                    if (!x.selection) {
                        x.selection = "在这里输入代码";
                    }
                }
            }
        }
    };
    f.doList = function (B, I, H) {
        var E = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/;
        var D = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/;
        var C = "-";
        var y = 1;
        var K = function () {
            var L;
            if (H) {
                L = " " + y + ". ";
                y++;
            } else {
                L = " " + C + " ";
            }
            return L;
        };
        var x = function (L) {
            if (H === undefined) {
                H = /^\s*\d/.test(L);
            }
            L = L.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm, function (M) {
                return K();
            });
            return L;
        };
        B.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null);
        if (B.before && !/\n$/.test(B.before) && !/^\n/.test(B.startTag)) {
            B.before += B.startTag;
            B.startTag = "";
        }
        if (B.startTag) {
            var G = /\d+[.]/.test(B.startTag);
            B.startTag = "";
            B.selection = B.selection.replace(/\n[ ]{4}/g, "\n");
            this.unwrap(B);
            B.skipLines();
            if (G) {
                B.after = B.after.replace(D, x);
            }
            if (H == G) {
                return;
            }
        }
        var J = 1;
        B.before = B.before.replace(E, function (L) {
            if (/^\s*([*+-])/.test(L)) {
                C = q.$1;
            }
            J = /[^\n]\n\n[^\n]/.test(L) ? 1 : 0;
            return x(L);
        });
        if (!B.selection) {
            B.selection = this.getString("litem");
        }
        var z = K();
        var F = 1;
        B.after = B.after.replace(D, function (L) {
            F = /[^\n]\n\n[^\n]/.test(L) ? 1 : 0;
            return x(L);
        });
        B.trimWhitespace(true);
        B.skipLines(J, F, true);
        B.startTag = z;
        var A = z.replace(/./g, " ");
        this.wrap(B, t.lineLength - A.length);
        B.selection = B.selection.replace(/\n/g, "\n" + A);
    };
    f.doHeading = function (B, x) {
        B.selection = B.selection.replace(/\s+/g, " ");
        B.selection = B.selection.replace(/(^\s+|\s+$)/g, "");
        if (!B.selection) {
            B.startTag = "## ";
            B.selection = this.getString("headingexample");
            return;
        }
        var z = 0;
        B.findTags(/#+[ ]*/, /[ ]*#+/);
        if (/#+/.test(B.startTag)) {
            z = q.lastMatch.length;
        }
        B.startTag = B.endTag = "";
        B.findTags(null, /\s?(-+|=+)/);
        if (/=+/.test(B.endTag)) {
            z = 1;
        }
        if (/-+/.test(B.endTag)) {
            z = 2;
        }
        B.startTag = B.endTag = "";
        B.skipLines(1, 1);
        var C = z == 0 ? 2 : z - 1;
        if (C > 0) {
            var A = C >= 2 ? "-" : "=";
            var y = B.selection.length;
            if (y > t.lineLength) {
                y = t.lineLength;
            }
            B.endTag = "\n";
            while (y--) {
                B.endTag += A;
            }
        }
    };
    f.doHorizontalRule = function (y, x) {
        if (!y.before.match(/\n$/)) {
            y.before += "\n";
        }
        y.startTag = "------\n";
    };
    f.doMore = function (y, x) {
        y.before = y.before.replace("<!--more-->", "");
        y.after = y.after.replace("<!--more-->", "");
        if (y.selection != "<!--more-->") {
            if (y.before) {
                y.startTag = "\n";
            }
            y.selection = "<!--more-->";
            y.endTag = "\n";
        } else {
            y.before = y.before.replace(/\n$/, "");
            y.after = y.after.replace(/^\n/, "");
            y.selection = "";
        }
    };
    f.doTab = function (y, x) {
        y.startTag = "    ";
        y.selection = "";
    };
    function r(y, x) {
        this.fullScreenBind = false;
        this.hooks = y;
        this.getString = x;
        this.isFakeFullScreen = false;
    }

    function j() {
        var z = {
            fullScreenChange: ["onfullscreenchange", "onwebkitfullscreenchange", "onmozfullscreenchange", "onmsfullscreenchange"],
            requestFullscreen: ["requestFullscreen", "webkitRequestFullScreen", "mozRequestFullScreen", "msRequestFullScreen"],
            cancelFullscreen: ["cancelFullscreen", "exitFullScreen", "webkitCancelFullScreen", "mozCancelFullScreen", "msCancelFullScreen"]
        }, B = {};
        for (var x in z) {
            var y = z[x].length, C = false;
            for (var A = 0; A < y; A++) {
                var D = z[x][A];
                if ("undefined" != typeof(document[D]) || "undefined" != typeof(document.body[D])) {
                    B[x] = D;
                    C = true;
                    break;
                }
            }
            if (!C) {
                return false;
            }
        }
        return B;
    }

    function u() {
        return document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msIsFullScreen;
    }

    r.prototype.doFullScreen = function (A, x) {
        var y = j(), z = this;
        if (!y) {
            alert(z.getString("fullscreenUnsupport"));
            return false;
        }
        if (!this.fullScreenBind) {
            a.addEvent(document, y.fullScreenChange.substring(2), function () {
                if (!u()) {
                    A.fullscreen.style.display = "";
                    A.exitFullscreen.style.display = "none";
                    z.hooks.exitFullScreen();
                } else {
                    A.fullscreen.style.display = "none";
                    A.exitFullscreen.style.display = "";
                    z.hooks.enterFullScreen();
                }
            });
            this.fullScreenBind = true;
        }
        if (x) {
            if (z.isFakeFullScreen) {
                document.body[y.requestFullscreen]("webkitRequestFullScreen" == y.requestFullscreen ? Element.ALLOW_KEYBOARD_INPUT : null);
                z.isFakeFullScreen = false;
            } else {
                if (!u()) {
                    A.exitFullscreen.style.display = "";
                    z.hooks.enterFakeFullScreen();
                    z.isFakeFullScreen = true;
                }
            }
        } else {
            if (z.isFakeFullScreen) {
                A.exitFullscreen.style.display = "none";
                z.hooks.exitFullScreen();
            } else {
                if (u()) {
                    document[y.cancelFullscreen]();
                }
            }
            z.isFakeFullScreen = false;
        }
    };
})();
