iTorr.ua = function (a) {
    a = a || navigator.userAgent;
    return a.match(/Windows Phone/i) ? "Mango" : a.match(/Windows CE/i) ? "winCE" : a.match(/ipad/i) ? "iPad" : a.match(/iPod/i) ? "Touch" : a.match(/iphone/i) ? "iPhone" : a.match(/android/i) ? "Android" : a.match(/Ubuntu/i) ? "Ubuntu" : a.match(/Mac OS X/i) ? "Mac OS X" : a.match(/360/i) ? "Shit!" : a.match(/opera minf/i) ? "Opera mini" : a.match(/Chrome/i) ? "Cr" : a.match(/Safarf/i) ? "Safari" : a.match(/Opera/i) ? "Opera" : a.match(/UCWEB/i) ? "UC" : a.match(/PHP/i) ? "PHP" : "";
};
String.prototype.enHtml = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "").replace(/(http\:\/\/[0-9A-Za-z\/.#&!?%:;=_]+\.)(gif|jpg|jpeg|png)/g, '<img src="$1$2">').replace(/(http\:\/\/ww[0-9]{1}\.sinaimg\.cn\/)([\w]{4,10})(\/[\w]{16,32}\.)(gif|jpg|jpeg|png)/g, "$1mw1024$3$4").replace(/http:\/\/www\.xiami\.com\/song\/([0-9]{5,12})[\?\w\.\=]*/g, '<a href="//www.xiami.com/song/$1" target="_blank" class="xiami">http://www.xiami.com/song/$1</a>').replace(/(@)([\u4e00-\u9fa5\u0800-\u4e00A-Za-z0-9\-_]{2,32})/g, '<b class="at">$1$2</b>').replace(/(^|[^\"\'\]>])(http|ftp|mms|rstp|news|https|telnet)\:\/\/([0-9A-Za-z\/.#&!?%:;=\-_]+)/g, '$1<a href="$2://$3" rel="external nofollow noreferer" class="link" target="_blank">$2://$3</a>').replace(/\n/g, "<br>");
};
String.prototype.enTxt = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;").replace(/\n/g, "<br>");
};
$.lcss("i/cmts.css");
var cmt = function (b) {
    var a = function (d, c) {
        if (c) {
            window.localStorage ? localStorage.setItem(d, c) : b.cookie(d, c);
        } else {
            return window.localStorage ? localStorage.getItem(d) : b.cookie(d);
        }
    };
    return cmt = {
        load: function (c) {
            Q.x("cmt", "x/?a=c&id=" + c, function (e) {
                for (var d in e) {
                    e[d].ua = b.ua(e[d].agent);
                    if (!e[d].url) {
                        delete e[d].url;
                    }
                    e[d].date = b.re_date(e[d].created);
                    e[d].html = e[d].text.enTxt().enHtml();
                }
                return {pid: c, c: e};
            }, function (e) {
                b(".cmt").innerHTML = e;
                var g = b(".cmt form"), d = b.S(".cmt form input,.cmt form textarea");
                b(".cmt ul").onclick = function (h) {
                    h = h || window.event;
                    var i = h.srcElement || h.target;
                    if (i.className == "fo") {
                        g.text.focus();
                        g.text.value += "@" + i.getAttribute("data-name") + " ";
                    }
                };
                for (var e in d) {
                    var f = d[e];
                    if (f.type == "hidden") {
                        continue;
                    }
                    f.onfocus = f.onchange = f.onkeypress = f.onkeyup = f.onkeydown = function () {
                        a("cmtU" + this.name, this.value);
                    };
                    f.value = a("cmtU" + f.name) || f.value;
                }
                g.text.onfocus = g.text.onchange = g.text.onkeypress = g.text.onkeyup = function () {
                    a("cmTypeV", this.value);
                    var h = this.value.match(/\n/g) || [];
                    this.setAttribute("rows", h.length + 5);
                };
                g.text.value = a("cmTypeV") || "";
                g.text.onkeydown = function () {
                    g.text.onkeyup();
                    if (window.event.ctrlKey && window.event.keyCode == 13) {
                        g.onsubmit();
                        return false;
                    }
                };
                g.onsubmit = function () {
                    for (var j in d) {
                        var k = d[j];
                        if (k.required && (!k.value || (k.type == "email" && !k.value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) || (k.type == "url" && !k.value.match(/^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-.\/?%&=]*)?$/)))) {
                            alert("请输入正确的" + k.title);
                            k.focus();
                            return false;
                        }
                    }
                    var m = [];
                    for (var j = 0, h = d.length; j < h; j++) {
                        var k = d[j];
                        m.push(k.name + "=" + encodeURIComponent(k.value));
                    }
                    b.x("x/?a=addc", m.join("&"), function (n) {
                        if (n.error) {
                            return alert(n.error);
                        }
                        var l = b.D.m("li");
                        l.className = "C-li a";
                        l.innerHTML = '<div class="DS-post"><a class="user" href="' + n.url + '" target="_blank"><img class="avatar" src="http://gravatar.duoshuo.com/avatar/' + n.avatar + '?s=50">' + n.author + '</a><span class="agent">' + b.ua(n.agent) + '</span><p class="msg">' + n.text.enTxt().enHtml() + '</p><div class="ctrl"><span>刚刚</span><span class="fo" data-name="' + n.author + '">回应</span></div></div></li>';
                        b.D.a(b(".cmt ul"), l);
                        var i;
                        if (i = b(".DS .banner")) {
                            b.D.d(i);
                        }
                        g.text.value = "";
                        a("cmTypeV", "");
                        window.scrollTo(0, l.offsetTop);
                    });
                    return false;
                };
            });
        }
    };
}(iTorr);
