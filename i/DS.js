window.DS_cfg ? window.DS = function (j, c) {
    if (!j) {
        alert("无法读取多说信息")
    }
    $.ua = function (k) {
        k = k || navigator.userAgent;
        return k.match(/Windows Phone/i) ? "Mango" : k.match(/Windows CE/i) ? "winCE" : k.match(/ipad/i) ? "iPad" : k.match(/iPod/i) ? "Touch" : k.match(/iphone/i) ? "iPhone" : k.match(/android/i) ? "Android" : k.match(/Ubuntu/i) ? "Ubuntu" : k.match(/Mac OS X/i) ? "Mac OS X" : k.match(/360/i) ? "Shit!" : k.match(/opera minf/i) ? "Opera mini" : k.match(/Chrome/i) ? "Cr" : k.match(/Safarf/i) ? "Safari" : k.match(/Opera/i) ? "Opera" : k.match(/UCWEB/i) ? "UC" : k.match(/PHP/i) ? "PHP" : ""
    };
    $.t = function (l, k) {
        !k && (k = l) && (l = document);
        return l.getElementsByTagName(k)
    };
    $.c = function (q, t) {
        !t && (t = q) && (q = document);
        for (var s = " ", o = q.getElementsByTagName("*"), m = [], l = 0, k; k = o[l]; l++) {
            (s + k.className + s).indexOf(s + t + s) == -1 || m.push(k)
        }
        return m
    };
    $.lcss("http://i.mouto.org/f/DS.m.css");
    var f = function (k) {
        return function (m, q, n, o, l) {
            if (typeof q == "function") {
                o = n;
                n = q;
                q = 0
            }
            if (k[m]) {
                return n(k[m])
            }
            m = "//" + j.id + ".duoshuo.com/api/" + m;
            l = c.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            if (!(l.withCredentials === undefined)) {
                l.open(q ? "POST" : "GET", m, 1);
                if (q) {
                    l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                }
                l.withCredentials = 1;
                if (n || o) {
                    l.onreadystatechange = function () {
                        if (l.readyState == 4) {
                            ((l.status > 199 && l.status < 301) || l.status == 304 || l.status == 400) ? n(JSON.parse(l.responseText)) : o(l.responseText, l.status)
                        }
                    }
                }
                l.send(q || "")
            } else {
                $.j(m.replace(".json", ".jsonp") + (q ? ("&" + q) : "") + "&callback={cb}", n || 0)
            }
        }
    }({}), h = function () {
        var k = $.c("DS");
        for (var l in k) {
            a(k[l])
        }
    }, g = function () {
        var k = $(".DS-set");
        if (!k) {
            k = $.D.m("div");
            k.className = "DS-set h";
            k.innerHTML = '				<div class="DS-box">					<span class="close">×</span>					<iframe src="http://duoshuo.com/settings/" scrolling="no"></iframe>				</div>				<div class="DS-setBg"></div>';
            $.D.a(k);
            k.className = "DS-set";
            $(".DS-set .close").onclick = $(".DS-setBg").onclick = function () {
                $(".DS-set").className = "DS-set h"
            }
        } else {
            k.className = "DS-set"
        }
        return false
    }, a = function (p, m) {
        if (p.innerHTML.length > 30) {
            return
        }
        p.innerHTML = '<div class="banner">评论载入中...</div>';
        if (m = p.getAttribute("data-key")) {
            var o = encodeURIComponent, l, n = "", k;
            if (l = p.getAttribute("data-key")) {
                n = "&thread_key=" + o(l);
                k = l
            }
            m = (INF.url || "http://" + location.host + location.pathname) + "#!" + m;
            l = p.getAttribute("data-title");
            n += "&title=" + o(l || ("因为多说不认识没标题的我，文章ID=" + k));
            console.log(n);
            f("threads/listPosts.json?require=visitor%2Cnonce%2Cunread&url=" + o(m) + n, function (s) {
                if (s.visitor) {
                    DS.U = s.visitor
                }
                p.innerHTML = '<div class="DS-hot"></div>				<div class="DS-input"><div class="DS-v">' + e(s.visitor) + "</div>" + d(s.thread, s.nonce) + '</div>				<div class="DS-cmt">' + b(s.response, s.parentPosts) + "</div>";
                if (c.DsCmt) {
                    c.scrollTo(0, $("#C-" + DsCmt).offsetTop);
                    DsCmt = null
                }
                if ($(".DS-setBtn")) {
                    $(".DS-setBtn").onclick = DS.set
                }
                var w = $.c(p, "fo"), u = $.c(p, "like"), y = $.t(p, "form")[0], x = y.message, t = function () {
                    $(".DS-foRebox").innerHTML = y.parent_id.value = ""
                };
                var q;
                if (q = $(".DS-visitor a[rel=nofollow]")) {
                    q.onclick = function () {
                        i();
                        return false
                    }
                }
                for (var v in w) {
                    w[v].onclick = function () {
                        y.parent_id.value = this.getAttribute("data-cid");
                        var z = this.parentNode.parentNode;
                        if ($(".DS-visitor")) {
                            $(".DS-foRebox").innerHTML = '<h3>正在回复这一条消息</h3><div class="DS-post">' + z.innerHTML + '</div><span class="close" title="取消回复">×</span>';
                            $(".DS-foRebox .close").onclick = t;
                            x.focus()
                        } else {
                            scrollTo(0, $(".DS").offsetTop)
                        }
                    }
                }
                x.value = ($.cookie("cmTypeV") || "");
                x.onfocus = x.onchange = x.onkeypress = x.onkeyup = function () {
                    $.cookie("cmTypeV", x.value);
                    var z = x.value.match(/\n/g) || [];
                    x.setAttribute("rows", z.length + 4)
                };
                x.onkeydown = function () {
                    x.onkeyup();
                    if (window.event.ctrlKey && window.event.keyCode == 13) {
                        y.onsubmit();
                        return false
                    }
                };
                var r;
                if (r = $(".DS-smile")) {
                    $.x("i/smile", function (z) {
                        r.innerHTML = '<b>(・ω・)</b><ul class="c"><li>' + z.split("\n").join("</li><li>") + "</li></ul>";
                        $(".DS-smile b").onclick = function () {
                            r.className = r.className == "DS-smile l" ? "DS-smile l a" : "DS-smile l";
                            return false
                        };
                        $(".DS-smile ul").onclick = function (A) {
                            A = A || window.event;
                            var B = A.srcElement || A.target;
                            if (B.tagName == "LI") {
                                x.focus();
                                x.value += " " + B.innerHTML + " "
                            }
                        }
                    })
                }
                for (var v in u) {
                    u[v].onclick = function () {
                        if (this.className == "like a") {
                            this.innerHTML = (this.innerHTML * 1 - 1);
                            this.className = "like"
                        } else {
                            this.innerHTML = (this.innerHTML * 1 + 1);
                            this.className = "like a"
                        }
                        f("posts/vote.json", "post_id=" + this.getAttribute("data-cid") + "&vote=" + (this.innerHTML))
                    }
                }
                y.onsubmit = function () {
                    var A = x.value;
                    if (!A) {
                        x.focus();
                        return false
                    }
                    var z = "thread_id=" + y.thread_id.value + "&parent_id=" + y.parent_id.value + "&nonce=" + y.nonce.value + "&message=" + encodeURIComponent(A) + "&v=131205";
                    y.className = "run";
                    f("posts/create.json", z, function (D) {
                        if (D.errorMessage) {
                            alert(D.errorMessage);
                            return
                        }
                        D = D.response;
                        var E = $.D.m("ul");
                        D.author.avatar_url = D.author.avatar_url || "//ds.cdncache.org/avatar-50/636/11505.jpg";
                        E.innerHTML = '<li id="C-' + D.post_id + '">							<div class="DS-post">' + (D.author.url ? '<a class="user" href="' + D.author.url + '" target="_blank">								<img class="avatar" src="' + D.author.avatar_url + '">								' + D.author.name + "							</a>" : '<span class="user">								<img class="avatar" src="' + D.author.avatar_url + '">								' + D.author.name + "							</span>") + '<span class="agent">' + $.ua(D.agent) + '</span><p class="msg">' + D.message + '</p>							<div class="ctrl">								<span>刚刚</span>							</div>						</li>';
                        if (INF.wb_name) {
                            new Image().src = "http://x.mouto.org/wb/x.php?name=" + INF.wb_name + "&itorr=" + encodeURIComponent("@" + D.author.name + " 在 " + location.href + " 评论 「" + D.message + "」")
                        }
                        var B;
                        if (B = $(".DS-li_notice")) {
                            $.D.d(B)
                        }
                        var C;
                        if (C = y.parent_id.value) {
                            E.className = "child";
                            $.D.a($("#C-" + C), E)
                        } else {
                            $.D.a($(".DS-cmt"), E)
                        }
                        t();
                        $.cookie("cmTypeV", x.value = "");
                        scrollTo(0, E.offsetTop);
                        $(".DS-smile").className = "DS-smile l";
                        setTimeout(function () {
                            y.className = ""
                        }, 100)
                    });
                    return false
                }
            }, function (q, r) {
                p.innerHTML = '<div class="banner">评论载入失败OAQ</div>'
            })
        } else {
            console.log(p, "没设置url信息")
        }
        return
    }, e = function (p) {
        var r = "";
        if (p.user_id) {
            r = '<div class="DS-visitor">				<div class="DS-foRebox"></div>				<div class="c">					<div class="l">						<span>' + p.name + '</span><!--a href="' + p.url + '" target="_blank"-->					</div>					<div class="r">						<a target="_blank" class="DS-setBtn" href="//duoshuo.com/settings/">设置</a>						<a rel="nofollow" href>登出</a>					</div>				</div>			</div>'
        } else {
            r = '<div class="DS-login"><h2>/*参与评论请先登录！*/</h2><p><span>多平台登录:</span>';
            var m = encodeURIComponent(location.href);
            for (var o = ["weibo", "qq", "baidu", "google", "renren", "douban", "netease"], k = ["微博", "QQ", "百度", "谷歌", "人人", "豆瓣", "网易"], n = o.length, q = 0; q < n; q++) {
                r += '<a class="DS-' + o[q] + '" href="//' + j.id + ".duoshuo.com/login/" + o[q] + "?redirect_uri=" + m + '">' + k[q] + "</a>"
            }
            r += "</p></div>"
        }
        return r
    }, d = function (k, l) {
        return '<form method="post">			<p><textarea name="message" rows="4" title="Ctrl+Enter快捷提交" placeholder="在这里评论哟～"></textarea></p>			<input type="hidden" name="thread_id" value="' + k.thread_id + '">			<input name="parent_id" type="hidden">			<input name="nonce" value="' + l + '" type="hidden">			<!--<input type="checkbox" name="repost" value="weibo">-->			<div class="p c">				<button class="l" type="submit">评论</button>				<smile class="DS-smile l"></smile>			</div>		</form>'
    }, b = function (k, n) {
        var m = function (q) {
            var p = "";
            if (!q) {
                return p
            }
            p += '<ul class="child">';
            for (var o in q) {
                q[o].author.avatar_url = q[o].author.avatar_url || "//ds.cdncache.org/avatar-50/636/11505.jpg";
                p += '<li id="C-' + q[o].post_id + '">					<div class="DS-post">' + (q[o].author.url ? '<a class="user" href="' + q[o].author.url + '" target="_blank">						<img class="avatar" src="' + q[o].author.avatar_url + '">						' + q[o].author.name + "					</a>" : '<span class="user">						<img class="avatar" src="' + q[o].author.avatar_url + '">						' + q[o].author.name + "					</span>") + '<span class="agent">' + $.ua(q[o].agent) + '</span><p class="msg">' + q[o].message + '</p>					<div class="ctrl">						<span>' + $.re_date(q[o].created_at) + '</span>						<span class="fo" data-cid="' + q[o].post_id + '">回应</span>						<span class="like' + (q[o].vote == "1" ? " a" : "") + '" data-cid="' + q[o].post_id + '">' + q[o].likes + "</span></div>					</div>				" + m(q[o].children) + "				</li>"
            }
            return p + "</ul>"
        }, l = function (q, r) {
            var p = "<ul>";
            for (var o in q) {
                r[q[o]].author.avatar_url = r[q[o]].author.avatar_url || "//ds.cdncache.org/avatar-50/636/11505.jpg";
                p += '<li id="C-' + r[q[o]].post_id + '">					<div class="DS-post">' + (r[q[o]].author.url ? '<a class="user" href="' + r[q[o]].author.url + '" target="_blank">						<img class="avatar" src="' + r[q[o]].author.avatar_url + '">						' + r[q[o]].author.name + "					</a>" : '<span class="user">						<img class="avatar" src="' + r[q[o]].author.avatar_url + '">						' + r[q[o]].author.name + "					</span>") + '<span class="agent">' + $.ua(r[q[o]].agent) + '</span><p class="msg">' + r[q[o]].message + '</p>					<div class="ctrl">						<span>' + $.re_date(r[q[o]].created_at) + '</span>						<span class="fo" data-cid="' + r[q[o]].post_id + '">回应</span>						<span class="like' + (r[q[o]].vote == "1" ? " a" : "") + '" data-cid="' + r[q[o]].post_id + '">' + r[q[o]].likes + "</span></div>					</div>					" + m(r[q[o]].children) + "				</li>"
            }
            if (p.length < 5) {
                p += '<li class="DS-li_notice">沙发还在，还不快抢？</li>'
            }
            return p + "</ul>"
        };
        return l(k, n)
    }, i = function () {
        new Image().src = "//" + j.id + ".duoshuo.com/logout/";
        $(".DS-v").innerHTML = e({})
    };
    if ($.S(".DS").length == 0) {
        $.j("//" + j.id + ".duoshuo.com/api/analytics/ping.jsonp?require=visitor%2Cnonce%2Cunread&callback={cb}", function (l) {
            var k = l.unread;
            if (l.visitor) {
                DS.U = l.visitor
            } else {
                return
            }
            if (k.comments) {
                console.log("你有" + k.comments + "条评论")
            }
        })
    }
    return {load: h, U: {}, set: g}
}(DS_cfg, window) : alert("请添加设置信息");
DS.load();
