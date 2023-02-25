!(function () {
    var t,
        e = window.jQuery,
        n = "mathquill-command-id",
        i = "mathquill-block-id",
        s = Math.min,
        r = Math.max;
    function o() {}
    var a = [].slice;
    function l(t) {
        var e = t.length - 1;
        return function () {
            var n = a.call(arguments, 0, e),
                i = a.call(arguments, e);
            return t.apply(this, n.concat([i]));
        };
    }
    var c = l(function (t, e) {
        return l(function (n, i) {
            if (t in n) return n[t].apply(n, e.concat(i));
        });
    });
    function h(t) {
        return l(function (e, n) {
            return (
                "function" != typeof e && (e = c(e)),
                t.call(this, function (t) {
                    return e.apply(t, [t].concat(n));
                })
            );
        });
    }
    function u(t) {
        var e = a.call(arguments, 1);
        return function () {
            return t.apply(this, e);
        };
    }
    function f(t, e) {
        if (!e) throw Error("prayer failed: " + t);
    }
    var p,
        d,
        m =
            ((p = "prototype"),
            (d = {}.hasOwnProperty),
            function t(e, n) {
                function i() {
                    var t = new s();
                    return _(t.init) && t.init.apply(t, arguments), t;
                }
                function s() {}
                void 0 === n && ((n = e), (e = Object)), (i.Bare = s);
                var r,
                    o = ($[p] = e[p]),
                    a = (s[p] = i[p] = i.p = new $());
                return (
                    ((a.constructor = i).mixin = function (e) {
                        return (s[p] = i[p] = t(i, e)[p]), i;
                    }),
                    (i.open = function (t) {
                        if (((r = {}), _(t) ? (r = t.call(i, a, o, i, e)) : g(t) && (r = t), g(r))) for (var n in r) d.call(r, n) && (a[n] = r[n]);
                        return _(a.init) || (a.init = e), i;
                    })(n)
                );
            });
    function g(t) {
        return "object" == typeof t;
    }
    function _(t) {
        return "function" == typeof t;
    }
    function $() {}
    var v = -1,
        b = 1;
    function w(t) {
        f("a direction was passed", t === v || t === b);
    }
    var x = m(e, function (t) {
            (t.insDirOf = function (t, e) {
                return t === v ? this.insertBefore(e.first()) : this.insertAfter(e.last());
            }),
                (t.insAtDirEnd = function (t, e) {
                    return t === v ? this.prependTo(e) : this.appendTo(e);
                });
        }),
        q = m(function (t) {
            (t.parent = 0),
                (t[v] = 0),
                (t[b] = 0),
                (t.init = function (t, e, n) {
                    (this.parent = t), (this[v] = e), (this[b] = n);
                }),
                (this.copy = function (t) {
                    return q(t.parent, t[v], t[b]);
                });
        }),
        y = m(function (t) {
            (t[v] = 0), (t[b] = 0);
            var e = (t.parent = 0);
            (this.byId = {}),
                (t.init = function () {
                    (this.id = e += 1), ((y.byId[this.id] = this).ends = {}), (this.ends[v] = 0), (this.ends[b] = 0);
                }),
                (t.dispose = function () {
                    delete y.byId[this.id];
                }),
                (t.toString = function () {
                    return "{{ MathQuill Node #" + this.id + " }}";
                }),
                (t.jQ = x()),
                (t.jQadd = function (t) {
                    return (this.jQ = this.jQ.add(t));
                }),
                (t.jQize = function (t) {
                    t = x(t || this.html());
                    for (var e = 0; e < t.length; e += 1)
                        !(function t(e) {
                            var n, i;
                            for (e.getAttribute && ((n = e.getAttribute("mathquill-command-id")), (i = e.getAttribute("mathquill-block-id")), n && y.byId[n].jQadd(e), i && y.byId[i].jQadd(e)), e = e.firstChild; e; e = e.nextSibling) t(e);
                        })(t[e]);
                    return t;
                }),
                (t.createDir = function (t, e) {
                    return w(t), this.jQize(), this.jQ.insDirOf(t, e.jQ), (e[t] = this.adopt(e.parent, e[v], e[b])), this;
                }),
                (t.createLeftOf = function (t) {
                    return this.createDir(v, t);
                }),
                (t.selectChildren = function (t, e) {
                    return T(t, e);
                }),
                (t.bubble = h(function (t) {
                    for (var e = this; e && !1 !== t(e); e = e.parent);
                    return this;
                })),
                (t.postOrder = h(function (t) {
                    return (
                        (function e(n) {
                            n.eachChild(e), t(n);
                        })(this),
                        this
                    );
                })),
                (t.isEmpty = function () {
                    return 0 === this.ends[v] && 0 === this.ends[b];
                }),
                (t.children = function () {
                    return k(this.ends[v], this.ends[b]);
                }),
                (t.eachChild = function () {
                    var t = this.children();
                    return t.each.apply(t, arguments), this;
                }),
                (t.foldChildren = function (t, e) {
                    return this.children().fold(t, e);
                }),
                (t.withDirAdopt = function (t, e, n, i) {
                    return k(this, this).withDirAdopt(t, e, n, i), this;
                }),
                (t.adopt = function (t, e, n) {
                    return k(this, this).adopt(t, e, n), this;
                }),
                (t.disown = function () {
                    return k(this, this).disown(), this;
                }),
                (t.remove = function () {
                    return this.jQ.remove(), this.postOrder("dispose"), this.disown();
                });
        });
    function O(t, e, n) {
        f("a parent is always present", t), f("leftward is properly set up", e ? e[b] === n && e.parent === t : t.ends[v] === n), f("rightward is properly set up", n ? n[v] === e && n.parent === t : t.ends[b] === e);
    }
    var k = m(function (e) {
            (e.init = function (e, n, i) {
                i === t && (i = v),
                    w(i),
                    f("no half-empty fragments", !e == !n),
                    (this.ends = {}),
                    e &&
                        (f("withDir is passed to Fragment", e instanceof y),
                        f("oppDir is passed to Fragment", n instanceof y),
                        f("withDir and oppDir have the same parent", e.parent === n.parent),
                        (this.ends[i] = e),
                        (this.ends[-i] = n),
                        (n = this.fold([], function (t, e) {
                            return t.push.apply(t, e.jQ.get()), t;
                        })),
                        (this.jQ = this.jQ.add(n)));
            }),
                (e.jQ = x()),
                (e.withDirAdopt = function (t, e, n, i) {
                    return t === v ? this.adopt(e, n, i) : this.adopt(e, i, n);
                }),
                (e.adopt = function (t, e, n) {
                    O(t, e, n);
                    var i = this;
                    i.disowned = !1;
                    var s = i.ends[v];
                    if (!s) return this;
                    var r = i.ends[b];
                    return (
                        e || (t.ends[v] = s),
                        n ? (n[v] = r) : (t.ends[b] = r),
                        (i.ends[b][b] = n),
                        i.each(function (n) {
                            (n[v] = e), (n.parent = t), e && (e[b] = n), (e = n);
                        }),
                        i
                    );
                }),
                (e.disown = function () {
                    var t = this,
                        e = t.ends[v];
                    if (!e || t.disowned) return t;
                    t.disowned = !0;
                    var n = t.ends[b],
                        i = e.parent;
                    return O(i, e[v], e), O(i, n, n[b]), e[v] ? (e[v][b] = n[b]) : (i.ends[v] = n[b]), n[b] ? (n[b][v] = e[v]) : (i.ends[b] = e[v]), t;
                }),
                (e.remove = function () {
                    return this.jQ.remove(), this.each("postOrder", "dispose"), this.disown();
                }),
                (e.each = h(function (t) {
                    var e = this.ends[v];
                    if (!e) return this;
                    for (; e !== this.ends[b][b] && !1 !== t(e); e = e[b]);
                    return this;
                })),
                (e.fold = function (t, e) {
                    return (
                        this.each(function (n) {
                            t = e.call(this, t, n);
                        }),
                        t
                    );
                });
        }),
        C = {},
        j = {},
        Q = m(q, function (t) {
            (t.init = function (t, e) {
                (this.parent = t), (this.options = e);
                var n = (this.jQ = this._jQ = x('<span class="mq-cursor">&#8203;</span>'));
                (this.blink = function () {
                    n.toggleClass("mq-blink");
                }),
                    (this.upDownCache = {});
            }),
                (t.show = function () {
                    return (this.jQ = this._jQ.removeClass("mq-blink")), "intervalId" in this ? clearInterval(this.intervalId) : (this[b] ? (this.selection && this.selection.ends[v][v] === this[v] ? this.jQ.insertBefore(this.selection.jQ) : this.jQ.insertBefore(this[b].jQ.first())) : this.jQ.appendTo(this.parent.jQ), this.parent.focus()), (this.intervalId = setInterval(this.blink, 500)), this;
                }),
                (t.hide = function () {
                    return "intervalId" in this && clearInterval(this.intervalId), delete this.intervalId, this.jQ.detach(), (this.jQ = x()), this;
                }),
                (t.withDirInsertAt = function (t, e, n, i) {
                    var s = this.parent;
                    (this.parent = e), (this[t] = n), (this[-t] = i), s !== e && s.blur && s.blur();
                }),
                (t.insDirOf = function (t, e) {
                    return w(t), this.jQ.insDirOf(t, e.jQ), this.withDirInsertAt(t, e.parent, e[t], e), this.parent.jQ.addClass("mq-hasCursor"), this;
                }),
                (t.insLeftOf = function (t) {
                    return this.insDirOf(v, t);
                }),
                (t.insRightOf = function (t) {
                    return this.insDirOf(b, t);
                }),
                (t.insAtDirEnd = function (t, e) {
                    return w(t), this.jQ.insAtDirEnd(t, e.jQ), this.withDirInsertAt(t, e, 0, e.ends[t]), e.focus(), this;
                }),
                (t.insAtLeftEnd = function (t) {
                    return this.insAtDirEnd(v, t);
                }),
                (t.insAtRightEnd = function (t) {
                    return this.insAtDirEnd(b, t);
                }),
                (t.jumpUpDown = function (t, e) {
                    var n = this;
                    (n.upDownCache[t.id] = q.copy(n)), (t = n.upDownCache[e.id]) ? (t[b] ? n.insLeftOf(t[b]) : n.insAtRightEnd(t.parent)) : ((t = n.offset().left), e.seek(t, n));
                }),
                (t.offset = function () {
                    var t = this.jQ.removeClass("mq-cursor").offset();
                    return this.jQ.addClass("mq-cursor"), t;
                }),
                (t.unwrapGramp = function () {
                    var t = this.parent.parent,
                        e = t.parent,
                        n = t[b],
                        i = t[v];
                    if (
                        (t.disown().eachChild(function (s) {
                            s.isEmpty() ||
                                (s
                                    .children()
                                    .adopt(e, i, n)
                                    .each(function (e) {
                                        e.jQ.insertBefore(t.jQ.first());
                                    }),
                                (i = s.ends[b]));
                        }),
                        !this[b])
                    ) {
                        if (this[v]) this[b] = this[v][b];
                        else
                            for (; !this[b]; ) {
                                if (((this.parent = this.parent[b]), !this.parent)) {
                                    (this[b] = t[b]), (this.parent = e);
                                    break;
                                }
                                this[b] = this.parent.ends[v];
                            }
                    }
                    this[b] ? this.insLeftOf(this[b]) : this.insAtRightEnd(e), t.jQ.remove(), t[v].siblingDeleted && t[v].siblingDeleted(this.options, b), t[b].siblingDeleted && t[b].siblingDeleted(this.options, v);
                }),
                (t.startSelection = function () {
                    for (var t = (this.anticursor = q.copy(this)), e = (t.ancestors = {}), n = t; n.parent; n = n.parent) e[n.parent.id] = n;
                }),
                (t.endSelection = function () {
                    delete this.anticursor;
                }),
                (t.select = function () {
                    var t = this.anticursor;
                    if (this[v] === t[v] && this.parent === t.parent) return !1;
                    for (var e = this; e.parent; e = e.parent)
                        if (e.parent.id in t.ancestors) {
                            var n = e.parent;
                            break;
                        }
                    f("cursor and anticursor in the same tree", n);
                    var i,
                        s,
                        r = t.ancestors[n.id],
                        o = b;
                    if (e[v] !== r) {
                        for (var a = e; a; a = a[b])
                            if (a[b] === r[b]) {
                                (o = v), (i = e), (s = r);
                                break;
                            }
                    }
                    return o === b && ((i = r), (s = e)), i instanceof q && (i = i[b]), s instanceof q && (s = s[v]), (this.hide().selection = n.selectChildren(i, s)), this.insDirOf(o, this.selection.ends[o]), this.selectionChanged(), !0;
                }),
                (t.clearSelection = function () {
                    return this.selection && (this.selection.clear(), delete this.selection, this.selectionChanged()), this;
                }),
                (t.deleteSelection = function () {
                    this.selection && ((this[v] = this.selection.ends[v][v]), (this[b] = this.selection.ends[b][b]), this.selection.remove(), this.selectionChanged(), delete this.selection);
                }),
                (t.replaceSelection = function () {
                    var t = this.selection;
                    return t && ((this[v] = t.ends[v][v]), (this[b] = t.ends[b][b]), delete this.selection), t;
                });
        }),
        T = m(k, function (t, e) {
            (t.init = function () {
                e.init.apply(this, arguments), (this.jQ = this.jQ.wrapAll('<span class="mq-selection"></span>').parent());
            }),
                (t.adopt = function () {
                    return this.jQ.replaceWith((this.jQ = this.jQ.children())), e.adopt.apply(this, arguments);
                }),
                (t.clear = function () {
                    return this.jQ.replaceWith(this.jQ[0].childNodes), this;
                }),
                (t.join = function (t) {
                    return this.fold("", function (e, n) {
                        return e + n[t]();
                    });
                });
        }),
        S = m(function (t) {
            (t.init = function (t, e, n) {
                (this.id = t.id), (this.data = {}), (this.root = t), (this.container = e), (this.options = n), ((t.controller = this).cursor = t.cursor = Q(t, n));
            }),
                (t.handle = function (t, e) {
                    var n,
                        i = this.options.handlers;
                    i && i.fns[t] && ((n = i.APIClasses[this.KIND_OF_MQ](this)), e === v || e === b ? i.fns[t](e, n) : i.fns[t](n));
                });
            var e = [];
            (this.onNotify = function (t) {
                e.push(t);
            }),
                (t.notify = function () {
                    for (var t = 0; t < e.length; t += 1) e[t].apply(this.cursor, arguments);
                    return this;
                });
        }),
        D = {},
        L = m(),
        E = {},
        A = m(),
        I = {};
    function R() {
        window.console && console.warn('You are using the MathQuill API without specifying an interface version, which will fail in v1.0.0. You can fix this easily by doing this before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\nSee also the "`dev` branch (2014–2015) → v0.10.0 Migration Guide" at\n  https://github.com/mathquill/mathquill/wiki/%60dev%60-branch-(2014%E2%80%932015)-%E2%86%92-v0.10.0-Migration-Guide');
    }
    function z(t) {
        return R(), tD(t);
    }
    (z.prototype = A.p),
        (z.interfaceVersion = function (t) {
            if (1 !== t) throw "Only interface version 1 supported. You specified: " + t;
            return (
                (R = function () {
                    window.console && console.warn('You called MathQuill.interfaceVersion(1); to specify the interface version, which will fail in v1.0.0. You can fix this easily by doing this before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\nSee also the "`dev` branch (2014–2015) → v0.10.0 Migration Guide" at\n  https://github.com/mathquill/mathquill/wiki/%60dev%60-branch-(2014%E2%80%932015)-%E2%86%92-v0.10.0-Migration-Guide');
                })(),
                z
            );
        });
    var B = ((z.getInterface = F).MIN = 1),
        M = (F.MAX = 2);
    function F(t) {
        if (!(B <= t && t <= M)) throw "Only interface versions between " + B + " and " + M + " supported. You specified: " + t;
        function e(t) {
            return t && t.nodeType && (t = (t = x(t).children(".mq-root-block").attr(i)) && y.byId[t].controller) ? n[t.KIND_OF_MQ](t) : null;
        }
        var n = {};
        function s(t, e) {
            for (var i in (e && e.handlers && (e.handlers = { fns: e.handlers, APIClasses: n }), e)) {
                var s, r;
                e.hasOwnProperty(i) && ((s = e[i]), (r = E[i]), (t[i] = r ? r(s) : s));
            }
        }
        (e.L = v),
            (e.R = b),
            (e.config = function (t) {
                return s(L.p, t), this;
            }),
            (e.registerEmbed = function (t, e) {
                if (!/^[a-z][a-z0-9]*$/i.test(t)) throw "Embed name must start with letter and be only letters and digits";
                I[t] = e;
            });
        var r,
            a = (n.AbstractMathQuill = m(A, function (t) {
                (t.init = function (t) {
                    (this.__controller = t), (this.__options = t.options), (this.id = t.id), (this.data = t.data);
                }),
                    (t.__mathquillify = function (t) {
                        var e = this.__controller,
                            n = e.root,
                            s = e.container;
                        e.createTextarea();
                        var r = s.addClass(t).contents().detach();
                        (n.jQ = x('<math-field class="mq-root-block"/>').attr(i, n.id).appendTo(s)),
                            this.latex(r.text()),
                            (this.revert = function () {
                                return s.empty().unbind(".mathquill").removeClass("mq-editable-field mq-math-mode mq-text-mode").append(r);
                            });
                    }),
                    (t.config = function (t) {
                        return s(this.__options, t), this;
                    }),
                    (t.el = function () {
                        return this.__controller.container[0];
                    }),
                    (t.text = function () {
                        return this.__controller.exportText();
                    }),
                    (t.latex = function (t) {
                        return 0 < arguments.length ? (this.__controller.renderLatexMath(t), this.__controller.blurred && this.__controller.cursor.hide().parent.blur(), this) : this.__controller.exportLatex();
                    }),
                    (t.html = function () {
                        return this.__controller.root.jQ
                            .html()
                            .replace(/ mathquill-(?:command|block)-id="?\d+"?/g, "")
                            .replace(/<span class="?mq-cursor( mq-blink)?"?>.?<\/span>/i, "")
                            .replace(/ mq-hasCursor|mq-hasCursor ?/, "")
                            .replace(/ class=(""|(?= |>))/g, "");
                    }),
                    (t.reflow = function () {
                        return this.__controller.root.postOrder("reflow"), this;
                    });
            }));
        for (r in ((e.prototype = a.prototype),
        (n.EditableField = m(a, function (t, e) {
            (t.__mathquillify = function () {
                return e.__mathquillify.apply(this, arguments), (this.__controller.editable = !0), this.__controller.delegateMouseEvents(), this.__controller.editablesTextareaEvents(), this;
            }),
                (t.focus = function () {
                    return this.__controller.textarea.focus(), this;
                }),
                (t.blur = function () {
                    return this.__controller.textarea.blur(), this;
                }),
                (t.write = function (t) {
                    return this.__controller.writeLatex(t), this.__controller.scrollHoriz(), this.__controller.blurred && this.__controller.cursor.hide().parent.blur(), this;
                }),
                (t.cmd = function (t) {
                    var e,
                        n = this.__controller.notify(),
                        i = n.cursor;
                    return /^\\[a-z]+$/i.test(t) ? (e = C[(t = t.slice(1))]) && ((t = e(t)), i.selection && t.replaces(i.replaceSelection()), t.createLeftOf(i.show()), this.__controller.scrollHoriz()) : i.parent.write(i, t), n.blurred && i.hide().parent.blur(), this;
                }),
                (t.select = function () {
                    var t = this.__controller;
                    for (t.notify("move").cursor.insAtRightEnd(t.root); t.cursor[v]; ) t.selectLeft();
                    return this;
                }),
                (t.clearSelection = function () {
                    return this.__controller.cursor.clearSelection(), this;
                }),
                (t.moveToDirEnd = function (t) {
                    return this.__controller.notify("move").cursor.insAtDirEnd(t, this.__controller.root), this;
                }),
                (t.moveToLeftEnd = function () {
                    return this.moveToDirEnd(v);
                }),
                (t.moveToRightEnd = function () {
                    return this.moveToDirEnd(b);
                }),
                (t.keystroke = function (t) {
                    for (var t = t.replace(/^\s+|\s+$/g, "").split(/\s+/), e = 0; e < t.length; e += 1) this.__controller.keystroke(t[e], { preventDefault: o });
                    return this;
                }),
                (t.typedText = function (t) {
                    for (var e = 0; e < t.length; e += 1) this.__controller.typedText(t.charAt(e));
                    return this;
                }),
                (t.dropEmbedded = function (t, e, n) {
                    var i = t - x(window).scrollLeft(),
                        s = e - x(window).scrollTop(),
                        s = document.elementFromPoint(i, s);
                    this.__controller.seek(x(s), t, e), tS().setOptions(n).createLeftOf(this.__controller.cursor);
                });
        })),
        ((e.EditableField = function () {
            throw "wtf don't call me, I'm 'abstract'";
        }).prototype = n.EditableField.prototype),
        D))
            !(function (i, s) {
                var r = (n[i] = s(n));
                (e[i] = function (n, s) {
                    var o = e(n);
                    return o instanceof r || !n || !n.nodeType ? o : (((n = S(r.RootBlock(), x(n), L())).KIND_OF_MQ = i), r(n).__mathquillify(s, t));
                }).prototype = r.prototype;
            })(r, D[r]);
        return e;
    }
    z.noConflict = function () {
        return (window.MathQuill = N), z;
    };
    var N = window.MathQuill;
    function P(t) {
        for (var e = "moveOutOf deleteOutOf selectOutOf upOutOf downOutOf".split(" "), n = 0; n < e.length; n += 1)
            !(function (e) {
                t[e] = function (t) {
                    this.controller.handle(e, t);
                };
            })(e[n]);
        t.reflow = function () {
            this.controller.handle("reflow"), this.controller.handle("edited"), this.controller.handle("edit");
        };
    }
    window.MathQuill = z;
    var H,
        W = m(function (t, e, n) {
            function i(t, e) {
                throw "Parse Error: " + e + " at " + (t = t ? "'" + t + "'" : "EOF");
            }
            (t.init = function (t) {
                this._ = t;
            }),
                (t.parse = function (t) {
                    return this.skip(r)._(
                        "" + t,
                        function (t, e) {
                            return e;
                        },
                        i
                    );
                }),
                (t.or = function (t) {
                    f("or is passed a parser", t instanceof n);
                    var e = this;
                    return n(function (n, i, s) {
                        return e._(n, i, function (e) {
                            return t._(n, i, s);
                        });
                    });
                }),
                (t.then = function (t) {
                    var e = this;
                    return n(function (i, s, r) {
                        return e._(
                            i,
                            function (e, i) {
                                return f("a parser is returned", (i = t instanceof n ? t : t(i)) instanceof n), i._(e, s, r);
                            },
                            r
                        );
                    });
                }),
                (t.many = function () {
                    var t = this;
                    return n(function (e, n, i) {
                        for (var s = []; t._(e, r, o); );
                        return n(e, s);
                        function r(t, n) {
                            return (e = t), s.push(n), !0;
                        }
                        function o() {
                            return !1;
                        }
                    });
                }),
                (t.times = function (t, e) {
                    arguments.length < 2 && (e = t);
                    var i = this;
                    return n(function (n, s, r) {
                        for (var o, a = [], l = !0, c = 0; c < t; c += 1) if (!(l = i._(n, h, u))) return r(n, o);
                        for (; c < e && l; c += 1) l = i._(n, h, f);
                        return s(n, a);
                        function h(t, e) {
                            return a.push(e), (n = t), !0;
                        }
                        function u(t, e) {
                            return (o = e), (n = t), !1;
                        }
                        function f(t, e) {
                            return !1;
                        }
                    });
                }),
                (t.result = function (t) {
                    return this.then(s(t));
                }),
                (t.atMost = function (t) {
                    return this.times(0, t);
                }),
                (t.atLeast = function (t) {
                    var e = this;
                    return e.times(t).then(function (t) {
                        return e.many().map(function (e) {
                            return t.concat(e);
                        });
                    });
                }),
                (t.map = function (t) {
                    return this.then(function (e) {
                        return s(t(e));
                    });
                }),
                (t.skip = function (t) {
                    return this.then(function (e) {
                        return t.result(e);
                    });
                }),
                (this.string = function (t) {
                    var e = t.length,
                        i = "expected '" + t + "'";
                    return n(function (n, s, r) {
                        var o = n.slice(0, e);
                        return o === t ? s(n.slice(e), o) : r(n, i);
                    });
                });
            var t = (this.regex = function (t) {
                    f("regexp parser is anchored", "^" === t.toString().charAt(1));
                    var e = "expected " + t;
                    return n(function (n, i, s) {
                        var r = t.exec(n);
                        return r ? ((r = r[0]), i(n.slice(r.length), r)) : s(n, e);
                    });
                }),
                s = (n.succeed = function (t) {
                    return n(function (e, n) {
                        return n(e, t);
                    });
                }),
                r =
                    ((n.fail = function (t) {
                        return n(function (e, n, i) {
                            return i(e, t);
                        });
                    }),
                    (n.letter = t(/^[a-z]/i)),
                    (n.letters = t(/^[a-z]*/i)),
                    (n.digit = t(/^[0-9]/)),
                    (n.digits = t(/^[0-9]*/)),
                    (n.whitespace = t(/^\s+/)),
                    (n.optWhitespace = t(/^\s*/)),
                    (n.any = n(function (t, e, n) {
                        return t ? e(t.slice(1), t.charAt(0)) : n(t, "expected any character");
                    })),
                    (n.all = n(function (t, e, n) {
                        return e("", t);
                    })),
                    (n.eof = n(function (t, e, n) {
                        return t ? n(t, "expected EOF") : e(t, t);
                    })));
        }),
        U =
            ((H = { 8: "Backspace", 9: "Tab", 10: "Enter", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 20: "CapsLock", 27: "Esc", 32: "Spacebar", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 45: "Insert", 46: "Del", 144: "NumLock" }),
            function (t, n) {
                var i,
                    s = null,
                    r = null,
                    a = e(t),
                    t = e(n.container || a),
                    l = o;
                function c(t) {
                    (l = t), clearTimeout(i), (i = setTimeout(t));
                }
                t.bind("keydown keypress input keyup focusout paste", function (t) {
                    l(t);
                });
                var h = !1;
                function u() {
                    var t, e, i, r;
                    n.keystroke(((i = H[(e = (t = s).which || t.keyCode)]), (r = []), t.ctrlKey && r.push("Ctrl"), t.originalEvent && t.originalEvent.metaKey && r.push("Meta"), t.altKey && r.push("Alt"), t.shiftKey && r.push("Shift"), (e = i || String.fromCharCode(e)), r.length || i ? (r.push(e), r.join("-")) : e), s);
                }
                function f() {
                    var t;
                    ("selectionStart" in (t = a[0]) && t.selectionStart !== t.selectionEnd) || (1 === (t = a.val()).length ? (a.val(""), n.typedText(t)) : t && a[0].select && a[0].select());
                }
                function p() {
                    var t = a.val();
                    a.val(""), t && n.paste(t);
                }
                return (
                    t.bind({
                        keydown: function (t) {
                            (s = t),
                                (r = null),
                                h &&
                                    c(function (t) {
                                        (t && "focusout" === t.type) || !a[0].select || a[0].select(), (l = o), clearTimeout(i);
                                    }),
                                u();
                        },
                        keypress: function (t) {
                            s && r && u(), (r = t), c(f);
                        },
                        focusout: function () {
                            s = r = null;
                        },
                        paste: function (t) {
                            a.focus(), c(p);
                        },
                    }),
                    {
                        select: function (t) {
                            l(), (l = o), clearTimeout(i), a.val(t), t && a[0].select && a[0].select(), (h = !!t);
                        },
                    }
                );
            });
    S.open(function (t, e) {
        t.exportText = function () {
            return this.root.foldChildren("", function (t, e) {
                return t + e.text();
            });
        };
    }),
        S.open(function (t) {
            t.focusBlurEvents = function () {
                var t,
                    e = this,
                    n = e.root,
                    i = e.cursor;
                function s() {
                    clearTimeout(t), i.selection && i.selection.jQ.addClass("mq-blur"), r();
                }
                function r() {
                    i.hide().parent.blur(), e.container.removeClass("mq-focused"), x(window).off("blur", s);
                }
                e.textarea
                    .focus(function () {
                        (e.blurred = !1), clearTimeout(t), e.container.addClass("mq-focused"), i.parent || i.insAtRightEnd(n), i.selection ? (i.selection.jQ.removeClass("mq-blur"), e.selectionChanged()) : i.show();
                    })
                    .blur(function () {
                        (e.blurred = !0),
                            (t = setTimeout(function () {
                                n.postOrder("intentionalBlur"), i.clearSelection().endSelection(), r();
                            })),
                            x(window).on("blur", s);
                    }),
                    (e.blurred = !0),
                    i.hide().parent.blur();
            };
        }),
        S.open(function (t) {
            t.keystroke = function (t, e) {
                this.cursor.parent.keystroke(t, e, this);
            };
        }),
        y.open(function (t) {
            (t.keystroke = function (t, e, n) {
                var i = n.cursor;
                switch (t) {
                    case "Ctrl-Shift-Backspace":
                    case "Ctrl-Backspace":
                        n.ctrlDeleteDir(v);
                        break;
                    case "Shift-Backspace":
                    case "Backspace":
                        n.backspace();
                        break;
                    case "Esc":
                    case "Tab":
                        return void n.escapeDir(b, t, e);
                    case "Shift-Tab":
                    case "Shift-Esc":
                        return void n.escapeDir(v, t, e);
                    case "End":
                        n.notify("move").cursor.insAtRightEnd(i.parent);
                        break;
                    case "Ctrl-End":
                        n.notify("move").cursor.insAtRightEnd(n.root);
                        break;
                    case "Shift-End":
                        for (; i[b]; ) n.selectRight();
                        break;
                    case "Ctrl-Shift-End":
                        for (; i[b] || i.parent !== n.root; ) n.selectRight();
                        break;
                    case "Home":
                        n.notify("move").cursor.insAtLeftEnd(i.parent);
                        break;
                    case "Ctrl-Home":
                        n.notify("move").cursor.insAtLeftEnd(n.root);
                        break;
                    case "Shift-Home":
                        for (; i[v]; ) n.selectLeft();
                        break;
                    case "Ctrl-Shift-Home":
                        for (; i[v] || i.parent !== n.root; ) n.selectLeft();
                        break;
                    case "Left":
                        n.moveLeft();
                        break;
                    case "Shift-Left":
                        n.selectLeft();
                        break;
                    case "Ctrl-Left":
                    case "Ctrl-Right":
                        break;
                    case "Right":
                        n.moveRight();
                        break;
                    case "Shift-Right":
                        n.selectRight();
                        break;
                    case "Up":
                        n.moveUp();
                        break;
                    case "Down":
                        n.moveDown();
                        break;
                    case "Shift-Up":
                        if (i[v]) for (; i[v]; ) n.selectLeft();
                        else n.selectLeft();
                    case "Ctrl-Up":
                    case "Ctrl-Down":
                        break;
                    case "Ctrl-Shift-Del":
                    case "Ctrl-Del":
                        n.ctrlDeleteDir(b);
                        break;
                    case "Shift-Del":
                    case "Del":
                        n.deleteForward();
                        break;
                    case "Meta-A":
                    case "Ctrl-A":
                        for (n.notify("move").cursor.insAtRightEnd(n.root); i[v]; ) n.selectLeft();
                        break;
                    default:
                        return;
                    case "Shift-Down":
                        if (i[b]) for (; i[b]; ) n.selectRight();
                        else n.selectRight();
                }
                e.preventDefault(), n.scrollHoriz();
            }),
                (t.moveOutOf =
                    t.moveTowards =
                    t.deleteOutOf =
                    t.deleteTowards =
                    t.unselectInto =
                    t.selectOutOf =
                    t.selectTowards =
                        function () {
                            f("overridden or never called on this node");
                        });
        }),
        S.open(function (t) {
            function e(t, e) {
                var n = t.notify("upDown").cursor,
                    i = e + "Into",
                    s = e + "OutOf";
                return (
                    n[b][i]
                        ? n.insAtLeftEnd(n[b][i])
                        : n[v][i]
                        ? n.insAtRightEnd(n[v][i])
                        : n.parent.bubble(function (t) {
                              var e = t[s];
                              if (e && ("function" == typeof e && (e = t[s](n)), e instanceof y && n.jumpUpDown(t, e), !0 !== e)) return !1;
                          }),
                    t
                );
            }
            this.onNotify(function (t) {
                ("move" !== t && "upDown" !== t) || this.show().clearSelection();
            }),
                (t.escapeDir = function (t, e, n) {
                    w(t);
                    var i = this.cursor;
                    if ((i.parent !== this.root && n.preventDefault(), i.parent !== this.root)) return i.parent.moveOutOf(t, i), this.notify("move");
                }),
                (E.leftRightIntoCmdGoes = function (t) {
                    if (t && "up" !== t && "down" !== t) throw '"up" or "down" required for leftRightIntoCmdGoes option, got "' + t + '"';
                    return t;
                }),
                (t.moveDir = function (t) {
                    w(t);
                    var e = this.cursor,
                        n = e.options.leftRightIntoCmdGoes;
                    return e.selection ? e.insDirOf(t, e.selection.ends[t]) : e[t] ? e[t].moveTowards(t, e, n) : e.parent.moveOutOf(t, e, n), this.notify("move");
                }),
                (t.moveLeft = function () {
                    return this.moveDir(v);
                }),
                (t.moveRight = function () {
                    return this.moveDir(b);
                }),
                (t.moveUp = function () {
                    return e(this, "up");
                }),
                (t.moveDown = function () {
                    return e(this, "down");
                }),
                this.onNotify(function (t) {
                    "upDown" !== t && (this.upDownCache = {});
                }),
                this.onNotify(function (t) {
                    "edit" === t && this.show().deleteSelection();
                }),
                (t.deleteDir = function (t) {
                    w(t);
                    var e = this.cursor,
                        n = e.selection;
                    return this.notify("edit"), n || (e[t] ? e[t].deleteTowards(t, e) : e.parent.deleteOutOf(t, e)), e[v].siblingDeleted && e[v].siblingDeleted(e.options, b), e[b].siblingDeleted && e[b].siblingDeleted(e.options, v), e.parent.bubble("reflow"), this;
                }),
                (t.ctrlDeleteDir = function (t) {
                    return w(t), !(t = this.cursor)[v] || t.selection ? ctrlr.deleteDir() : (this.notify("edit"), k(t.parent.ends[v], t[v]).remove(), t.insAtDirEnd(v, t.parent), t[v].siblingDeleted && t[v].siblingDeleted(t.options, b), t[b].siblingDeleted && t[b].siblingDeleted(t.options, v), t.parent.bubble("reflow"), this);
                }),
                (t.backspace = function () {
                    return this.deleteDir(v);
                }),
                (t.deleteForward = function () {
                    return this.deleteDir(b);
                }),
                this.onNotify(function (t) {
                    "select" !== t && this.endSelection();
                }),
                (t.selectDir = function (t) {
                    var e = this.notify("select").cursor,
                        n = e.selection;
                    w(t), e.anticursor || e.startSelection();
                    var i = e[t];
                    i ? (n && n.ends[t] === i && e.anticursor[-t] !== i ? i.unselectInto(t, e) : i.selectTowards(t, e)) : e.parent.selectOutOf(t, e), e.clearSelection(), e.select() || e.show();
                }),
                (t.selectLeft = function () {
                    return this.selectDir(v);
                }),
                (t.selectRight = function () {
                    return this.selectDir(b);
                });
        });
    var G,
        K,
        Y,
        Z,
        X,
        V,
        J =
            ((tx = W.string),
            (G = W.regex),
            (K = W.letter),
            (Y = W.any),
            (tw = W.optWhitespace),
            (Z = W.succeed),
            (X = W.fail),
            (te = K.map(function (t) {
                return tm(t);
            })),
            (K = G(/^[^${}\\_^]/).map(function (t) {
                return ts(t);
            })),
            (te = G(/^[^\\a-eg-zA-Z]/)
                .or(
                    tx("\\").then(
                        G(/^begin\{.?matrix\}/)
                            .or(G(/^[a-z]+/i))
                            .or(G(/^\s+/).result(" "))
                            .or(Y)
                    )
                )
                .then(function (t) {
                    var e = C[(t = t.replace(/^begin\{(.?matrix)\}$/, "$1"))];
                    return e ? e(t).parser() : X("unknown command: \\" + t);
                })
                .or(te)
                .or(K)),
            (K = tx("{")
                .then(function () {
                    return V;
                })
                .skip(tx("}"))),
            (V = (te = tw.then(
                K.or(
                    te.map(function (t) {
                        var e = to();
                        return t.adopt(e, 0, 0), e;
                    })
                )
            ))
                .many()
                .map(tt)
                .skip(tw)),
            (tw = tx("[")
                .then(
                    te
                        .then(function (t) {
                            return "]" !== t.join("latex") ? Z(t) : X();
                        })
                        .many()
                        .map(tt)
                        .skip(tw)
                )
                .skip(tx("]"))),
            ((tx = V).block = te),
            (tx.optBlock = tw),
            tx);
    function tt(t) {
        for (var e = t[0] || to(), n = 1; n < t.length; n += 1) t[n].children().adopt(e, e.ends[b], 0);
        return e;
    }
    S.open(function (t, e) {
        (t.exportLatex = function () {
            return this.root.latex().replace(/(\\[a-z]+) (?![a-z])/gi, "$1");
        }),
            (t.writeLatex = function (t) {
                var e = this.notify("edit").cursor,
                    n = W.all,
                    i = W.eof,
                    t = J.skip(i).or(n.result(!1)).parse(t);
                return t && !t.isEmpty() && (t.children().adopt(e.parent, e[v], e[b]), t.jQize().insertBefore(e.jQ), (e[v] = t.ends[b]), t.finalizeInsert(e.options, e), t.ends[b][b].siblingCreated && t.ends[b][b].siblingCreated(e.options, v), t.ends[v][v].siblingCreated && t.ends[v][v].siblingCreated(e.options, b), e.parent.bubble("reflow")), this;
            }),
            (t.renderLatexMath = function (t) {
                var e = this.root,
                    n = this.cursor,
                    i = W.all,
                    s = W.eof,
                    i = J.skip(s).or(i.result(!1)).parse(t);
                e.eachChild("postOrder", "dispose"), (e.ends[v] = e.ends[b] = 0), i && i.children().adopt(e, 0, 0), (t = e.jQ), i ? ((i = i.join("html")), t.html(i), e.jQize(t.children()), e.finalizeInsert(n.options)) : t.empty(), delete n.selection, n.insAtRightEnd(e);
            }),
            (t.renderLatexText = function (t) {
                var e = this.root,
                    n = this.cursor;
                e.jQ.children().slice(1).remove(), e.eachChild("postOrder", "dispose"), (e.ends[v] = e.ends[b] = 0), delete n.selection, n.show().insAtRightEnd(e);
                var i = W.regex,
                    s = W.string,
                    r = W.eof,
                    o = W.all,
                    a = s("$")
                        .then(J)
                        .skip(s("$").or(r))
                        .map(function (t) {
                            var e = tu(n);
                            e.createBlocks();
                            var i = e.ends[v];
                            return t.children().adopt(i, 0, 0), e;
                        }),
                    i = s("\\$").result("$").or(i(/^[^$]/)).map(ts),
                    l = a.or(i).many().skip(r).or(o.result(!1)).parse(t);
                if (l) {
                    for (var c = 0; c < l.length; c += 1) l[c].adopt(e, e.ends[b], 0);
                    e.jQize().appendTo(e.jQ), e.finalizeInsert(n.options);
                }
            });
    }),
        S.open(function (e) {
            e.delegateMouseEvents = function () {
                var e = this.root.jQ;
                this.container.bind("mousedown.mathquill", function (n) {
                    var s,
                        r = x(n.target).closest(".mq-root-block"),
                        a = y.byId[r.attr(i) || e.attr(i)].controller,
                        l = a.cursor,
                        c = l.blink,
                        h = a.textareaSpan,
                        u = a.textarea;
                    function f(t) {
                        s = x(t.target);
                    }
                    function p(e) {
                        l.anticursor || l.startSelection(), a.seek(s, e.pageX, e.pageY).cursor.select(), (s = t);
                    }
                    a.blurred && (a.editable || r.prepend(h), u.focus()),
                        n.preventDefault(),
                        (n.target.unselectable = !0),
                        (l.blink = o),
                        a.seek(x(n.target), n.pageX, n.pageY).cursor.startSelection(),
                        r.mousemove(f),
                        x(n.target.ownerDocument)
                            .mousemove(p)
                            .mouseup(function t(e) {
                                (l.blink = c), l.selection || (a.editable ? l.show() : h.detach()), r.unbind("mousemove", f), x(e.target.ownerDocument).unbind("mousemove", p).unbind("mouseup", t);
                            });
                });
            };
        }),
        S.open(function (t) {
            t.seek = function (t, e, s) {
                var r = this.notify("select").cursor;
                t && ((o = t.attr(i) || t.attr(n)) || (o = (t = t.parent()).attr(i) || t.attr(n)));
                var o = o ? y.byId[o] : this.root;
                return f("nodeId is the id of some Node that exists", o), r.clearSelection().show(), o.seek(e, r), this.scrollHoriz(), this;
            };
        }),
        S.open(function (t) {
            t.scrollHoriz = function () {
                var t = this.cursor,
                    e = t.selection,
                    n = this.root.jQ[0].getBoundingClientRect();
                if (e) {
                    var i = e.jQ[0].getBoundingClientRect(),
                        s = i.left - (n.left + 20),
                        r = i.right - (n.right - 20);
                    if (e.ends[v] === t[b]) {
                        if (s < 0) var o = s;
                        else {
                            if (!(0 < r)) return;
                            o = i.left - r < n.left + 20 ? s : r;
                        }
                    } else if (0 < r) o = r;
                    else {
                        if (!(s < 0)) return;
                        o = i.right - s > n.right - 20 ? r : s;
                    }
                } else if ((t = t.jQ[0].getBoundingClientRect().left) > n.right - 20) var o = t - (n.right - 20);
                else {
                    if (!(t < n.left + 20)) return;
                    var o = t - (n.left + 20);
                }
                this.root.jQ.stop().animate({ scrollLeft: "+=" + o }, 100);
            };
        }),
        S.open(function (e) {
            (L.p.substituteTextarea = function () {
                return x("<textarea autocapitalize=off autocomplete=off autocorrect=off spellcheck=false x-palm-disable-ste-all=true />")[0];
            }),
                (e.createTextarea = function () {
                    var t = (this.textareaSpan = x('<span class="mq-textarea"></span>')),
                        e = this.options.substituteTextarea();
                    if (!e.nodeType) throw "substituteTextarea() must return a DOM element, got " + e;
                    e = this.textarea = x(e).appendTo(t);
                    var n = this;
                    (n.cursor.selectionChanged = function () {
                        n.selectionChanged();
                    }),
                        n.container.bind("copy", function () {
                            n.setTextareaSelection();
                        });
                }),
                (e.selectionChanged = function () {
                    var e = this;
                    tO(e.container[0]),
                        e.textareaSelectionTimeout === t &&
                            (e.textareaSelectionTimeout = setTimeout(function () {
                                e.setTextareaSelection();
                            }));
                }),
                (e.setTextareaSelection = function () {
                    this.textareaSelectionTimeout = t;
                    var e = "";
                    this.cursor.selection && ((e = this.cursor.selection.join("latex")), this.options.statelessClipboard && (e = "$" + e + "$")), this.selectFn(e);
                }),
                (e.staticMathTextareaEvents = function () {
                    var t = this,
                        e = (t.root, t.cursor),
                        n = t.textarea,
                        i = t.textareaSpan;
                    function s() {
                        i.detach(), (t.blurred = !0);
                    }
                    this.container.prepend('<span class="mq-selectable">$' + t.exportLatex() + "$</span>"),
                        (t.blurred = !0),
                        n
                            .bind("cut paste", !1)
                            .focus(function () {
                                t.blurred = !1;
                            })
                            .blur(function () {
                                e.selection && e.selection.clear(), setTimeout(s);
                            }),
                        (t.selectFn = function (t) {
                            n.val(t), t && n.select();
                        });
                }),
                (e.editablesTextareaEvents = function () {
                    var t = this,
                        e = (t.root, t.cursor),
                        n = t.textarea,
                        i = t.textareaSpan,
                        s = U(n, this);
                    (this.selectFn = function (t) {
                        s.select(t);
                    }),
                        this.container.prepend(i).on("cut", function (n) {
                            e.selection &&
                                setTimeout(function () {
                                    t.notify("edit"), e.parent.bubble("reflow");
                                });
                        }),
                        this.focusBlurEvents();
                }),
                (e.typedText = function (t) {
                    if ("\n" === t) return this.handle("enter");
                    var e = this.notify().cursor;
                    e.parent.write(e, t), this.scrollHoriz();
                }),
                (e.paste = function (t) {
                    this.options.statelessClipboard && (t = "$" === t.slice(0, 1) && "$" === t.slice(-1) ? t.slice(1, -1) : "\\text{" + t + "}"), this.writeLatex(t).cursor.show();
                });
        });
    var te = m(y, function (t, e) {
            t.finalizeInsert = function (t, e) {
                this.postOrder("finalizeTree", t), this.postOrder("contactWeld", e), this.postOrder("blur"), this.postOrder("reflow"), this[b].siblingCreated && this[b].siblingCreated(t, v), this[v].siblingCreated && this[v].siblingCreated(t, b), this.bubble("reflow");
            };
        }),
        tn = m(te, function (t, e) {
            (t.init = function (t, n, i) {
                var s = this;
                e.init.call(s), s.ctrlSeq || (s.ctrlSeq = t), n && (s.htmlTemplate = n), i && (s.textTemplate = i);
            }),
                (t.replaces = function (t) {
                    t.disown(), (this.replacedFragment = t);
                }),
                (t.isEmpty = function () {
                    return this.foldChildren(!0, function (t, e) {
                        return t && e.isEmpty();
                    });
                }),
                (t.parser = function () {
                    var t = J.block,
                        e = this;
                    return t.times(e.numBlocks()).map(function (t) {
                        e.blocks = t;
                        for (var n = 0; n < t.length; n += 1) t[n].adopt(e, e.ends[b], 0);
                        return e;
                    });
                }),
                (t.createLeftOf = function (t) {
                    var n = this.replacedFragment;
                    this.createBlocks(), e.createLeftOf.call(this, t), n && (n.adopt(this.ends[v], 0, 0), n.jQ.appendTo(this.ends[v].jQ)), this.finalizeInsert(t.options), this.placeCursor(t);
                }),
                (t.createBlocks = function () {
                    for (var t = this.numBlocks(), e = (this.blocks = Array(t)), n = 0; n < t; n += 1) (e[n] = to()).adopt(this, this.ends[b], 0);
                }),
                (t.placeCursor = function (t) {
                    t.insAtRightEnd(
                        this.foldChildren(this.ends[v], function (t, e) {
                            return t.isEmpty() ? t : e;
                        })
                    );
                }),
                (t.moveTowards = function (t, e, n) {
                    (n = n && this[n + "Into"]), e.insAtDirEnd(-t, n || this.ends[-t]);
                }),
                (t.deleteTowards = function (t, e) {
                    this.isEmpty() ? (e[t] = this.remove()[t]) : this.moveTowards(t, e, null);
                }),
                (t.selectTowards = function (t, e) {
                    (e[-t] = this), (e[t] = this[t]);
                }),
                (t.selectChildren = function () {
                    return T(this, this);
                }),
                (t.unselectInto = function (t, e) {
                    e.insAtDirEnd(-t, e.anticursor.ancestors[this.id]);
                }),
                (t.seek = function (t, e) {
                    function n(t) {
                        var e = {};
                        return (e[v] = t.jQ.offset().left), (e[b] = e[v] + t.jQ.outerWidth()), e;
                    }
                    var i = this,
                        s = n(i);
                    if (t < s[v]) return e.insLeftOf(i);
                    if (t > s[b]) return e.insRightOf(i);
                    var r = s[v];
                    i.eachChild(function (o) {
                        var a = n(o);
                        return t < a[v] ? (t - r < a[v] - t ? (o[v] ? e.insAtRightEnd(o[v]) : e.insLeftOf(i)) : e.insAtLeftEnd(o), !1) : t > a[b] ? void (o[b] ? (r = a[b]) : s[b] - t < t - a[b] ? e.insRightOf(i) : e.insAtRightEnd(o)) : (o.seek(t, e), !1);
                    });
                }),
                (t.numBlocks = function () {
                    var t = this.htmlTemplate.match(/&\d+/g);
                    return t ? t.length : 0;
                }),
                (t.html = function () {
                    var t = this.blocks,
                        e = " mathquill-command-id=" + this.id,
                        n = this.htmlTemplate.match(/<[^<>]+>|[^<>]+/g);
                    f("no unmatched angle brackets", n.join("") === this.htmlTemplate);
                    for (var i = 0, s = n[0]; s; s = n[(i += 1)])
                        if ("/>" === s.slice(-2)) n[i] = s.slice(0, -2) + e + "/>";
                        else if ("<" === s.charAt(0)) {
                            f("not an unmatched top-level close tag", "/" !== s.charAt(1)), (n[i] = s.slice(0, -1) + e + ">");
                            for (var r = 1; f("no missing close tags", (s = n[(i += 1)])), "</" === s.slice(0, 2) ? --r : "<" === s.charAt(0) && "/>" !== s.slice(-2) && (r += 1), 0 < r; );
                        }
                    return n.join("").replace(/>&(\d+)/g, function (e, n) {
                        return " mathquill-block-id=" + t[n].id + ">" + t[n].join("html");
                    });
                }),
                (t.latex = function () {
                    return this.foldChildren(this.ctrlSeq, function (t, e) {
                        return t + "{" + (e.latex() || " ") + "}";
                    });
                }),
                (t.textTemplate = [""]),
                (t.text = function () {
                    var t = this,
                        e = 0;
                    return t.foldChildren(t.textTemplate[e], function (n, i) {
                        e += 1;
                        var s = i.text();
                        return n && "(" === t.textTemplate[e] && "(" === s[0] && ")" === s.slice(-1) ? n + s.slice(1, -1) + t.textTemplate[e] : n + i.text() + (t.textTemplate[e] || "");
                    });
                });
        }),
        ti = m(tn, function (t, e) {
            (t.init = function (t, n, i) {
                (i = i || (t && 1 < t.length ? t.slice(1) : t)), e.init.call(this, t, n, [i]);
            }),
                (t.parser = function () {
                    return W.succeed(this);
                }),
                (t.numBlocks = function () {
                    return 0;
                }),
                (t.replaces = function (t) {
                    t.remove();
                }),
                (t.createBlocks = o),
                (t.moveTowards = function (t, e) {
                    e.jQ.insDirOf(t, this.jQ), (e[-t] = this), (e[t] = this[t]);
                }),
                (t.deleteTowards = function (t, e) {
                    e[t] = this.remove()[t];
                }),
                (t.seek = function (t, e) {
                    t - this.jQ.offset().left < this.jQ.outerWidth() / 2 ? e.insLeftOf(this) : e.insRightOf(this);
                }),
                (t.latex = function () {
                    return this.ctrlSeq;
                }),
                (t.text = function () {
                    return this.textTemplate;
                }),
                (t.placeCursor = o),
                (t.isEmpty = function () {
                    return !0;
                });
        }),
        ts = m(ti, function (t, e) {
            t.init = function (t, n) {
                e.init.call(this, t, "<span>" + (n || t) + "</span>");
            };
        }),
        tr = m(ti, function (t, e) {
            t.init = function (t, n, i) {
                e.init.call(this, t, '<span class="mq-binary-operator">' + n + "</span>", i);
            };
        }),
        to = m(te, function (t, e) {
            (t.join = function (t) {
                return this.foldChildren("", function (e, n) {
                    return e + n[t]();
                });
            }),
                (t.html = function () {
                    return this.join("html");
                }),
                (t.latex = function () {
                    return this.join("latex");
                }),
                (t.text = function () {
                    return this.ends[v] === this.ends[b] && 0 !== this.ends[v] ? this.ends[v].text() : this.join("text");
                }),
                (t.keystroke = function (t, n, i) {
                    return i.options.spaceBehavesLikeTab && ("Spacebar" === t || "Shift-Spacebar" === t) ? (n.preventDefault(), void i.escapeDir("Shift-Spacebar" === t ? v : b, t, n)) : e.keystroke.apply(this, arguments);
                }),
                (t.moveOutOf = function (t, e, n) {
                    !(n && this.parent[n + "Into"]) && this[t] ? e.insAtDirEnd(-t, this[t]) : e.insDirOf(t, this.parent);
                }),
                (t.selectOutOf = function (t, e) {
                    e.insDirOf(t, this.parent);
                }),
                (t.deleteOutOf = function (t, e) {
                    e.unwrapGramp();
                }),
                (t.seek = function (t, e) {
                    var n = this.ends[b];
                    if (!n || n.jQ.offset().left + n.jQ.outerWidth() < t) return e.insAtRightEnd(this);
                    if (t < this.ends[v].jQ.offset().left) return e.insAtLeftEnd(this);
                    for (; t < n.jQ.offset().left; ) n = n[v];
                    return n.seek(t, e);
                }),
                (t.chToCmd = function (t) {
                    var e;
                    return (t.match(/^[a-eg-zA-Z]$/) ? tm : /^\d$/.test(t) ? tp : (e = j[t] || C[t]) ? e : ts)(t);
                }),
                (t.write = function (t, e) {
                    (e = this.chToCmd(e)), t.selection && e.replaces(t.replaceSelection()), e.createLeftOf(t.show());
                }),
                (t.focus = function () {
                    return this.jQ.addClass("mq-hasCursor"), this.jQ.removeClass("mq-empty"), this;
                }),
                (t.blur = function () {
                    return this.jQ.removeClass("mq-hasCursor"), this.isEmpty() && this.jQ.addClass("mq-empty"), this;
                });
        });
    D.StaticMath = function (t) {
        return m(t.AbstractMathQuill, function (e, n) {
            (this.RootBlock = to),
                (e.__mathquillify = function () {
                    return n.__mathquillify.call(this, "mq-math-mode"), this.__controller.delegateMouseEvents(), this.__controller.staticMathTextareaEvents(), this;
                }),
                (e.init = function () {
                    n.init.apply(this, arguments), this.__controller.root.postOrder("registerInnerField", (this.innerFields = []), t.MathField);
                }),
                (e.latex = function () {
                    var e = n.latex.apply(this, arguments);
                    return 0 < arguments.length && this.__controller.root.postOrder("registerInnerField", (this.innerFields = []), t.MathField), e;
                });
        });
    };
    var ta = m(to, P);
    D.MathField = function (t) {
        return m(t.EditableField, function (t, e) {
            (this.RootBlock = ta),
                (t.__mathquillify = function (t, n) {
                    return this.config(t), 1 < n && (this.__controller.root.reflow = o), e.__mathquillify.call(this, "mq-editable-field mq-math-mode"), delete this.__controller.root.reflow, this;
                });
        });
    };
    var tl = m(y, function (t, e) {
            function n(t) {
                t.jQ[0].normalize();
                var e = t.jQ[0].firstChild;
                f("only node in TextBlock span is Text node", 3 === e.nodeType);
                var n = tc(e.data);
                return n.jQadd(e), t.children().disown(), n.adopt(t, 0, 0);
            }
            (t.ctrlSeq = "\\text"),
                (t.replaces = function (t) {
                    t instanceof k ? (this.replacedText = t.remove().jQ.text()) : "string" == typeof t && (this.replacedText = t);
                }),
                (t.jQadd = function (t) {
                    e.jQadd.call(this, t), this.ends[v] && this.ends[v].jQadd(this.jQ[0].firstChild);
                }),
                (t.createLeftOf = function (t) {
                    if ((e.createLeftOf.call(this, t), this[b].siblingCreated && this[b].siblingCreated(t.options, v), this[v].siblingCreated && this[v].siblingCreated(t.options, b), this.bubble("reflow"), t.insAtRightEnd(this), this.replacedText)) for (var n = 0; n < this.replacedText.length; n += 1) this.write(t, this.replacedText.charAt(n));
                }),
                (t.parser = function () {
                    var t = this,
                        e = W.string,
                        n = W.regex;
                    return W.optWhitespace
                        .then(e("{"))
                        .then(n(/^[^}]*/))
                        .skip(e("}"))
                        .map(function (e) {
                            return tc(e).adopt(t, 0, 0), t;
                        });
                }),
                (t.textContents = function () {
                    return this.foldChildren("", function (t, e) {
                        return t + e.text;
                    });
                }),
                (t.text = function () {
                    return '"' + this.textContents() + '"';
                }),
                (t.latex = function () {
                    return "\\text{" + this.textContents() + "}";
                }),
                (t.html = function () {
                    return '<span class="mq-text-mode" mathquill-command-id=' + this.id + ">" + this.textContents() + "</span>";
                }),
                (t.moveTowards = function (t, e) {
                    e.insAtDirEnd(-t, this);
                }),
                (t.moveOutOf = function (t, e) {
                    e.insDirOf(t, this);
                }),
                (t.unselectInto = t.moveTowards),
                (t.selectTowards = tn.prototype.selectTowards),
                (t.deleteTowards = tn.prototype.deleteTowards),
                (t.selectOutOf = function (t, e) {
                    e.insDirOf(t, this);
                }),
                (t.deleteOutOf = function (t, e) {
                    this.isEmpty() && e.insRightOf(this);
                }),
                (t.write = function (t, n) {
                    var i;
                    t.show().deleteSelection(), "$" !== n ? (t[v] ? t[v].appendText(n) : tc(n).createLeftOf(t)) : this.isEmpty() ? (t.insRightOf(this), ts("\\$", "$").createLeftOf(t)) : t[b] ? (t[v] ? ((i = tl()), (n = this.ends[v]).disown(), n.adopt(i, 0, 0), t.insLeftOf(this), e.createLeftOf.call(i, t)) : t.insLeftOf(this)) : t.insRightOf(this);
                }),
                (t.seek = function (t, e) {
                    e.hide();
                    var i = n(this),
                        s = this.jQ.width() / this.text.length,
                        s = Math.round((t - this.jQ.offset().left) / s);
                    s <= 0 ? e.insAtLeftEnd(this) : s >= i.text.length ? e.insAtRightEnd(this) : e.insLeftOf(i.splitRight(s));
                    for (var r, o = t - e.show().offset().left, a = o && o < 0 ? v : b, l = a; e[a] && 0 < o * l; ) e[a].moveTowards(a, e), (l = o), (o = t - e.offset().left);
                    a * o < -a * l && e[-a].moveTowards(-a, e), e.anticursor ? e.anticursor.parent === this && ((s = e[v] && e[v].text.length), this.anticursorPosition === s ? (e.anticursor = q.copy(e)) : (this.anticursorPosition < s ? ((r = e[v].splitRight(this.anticursorPosition)), (e[v] = r)) : (r = e[b].splitRight(this.anticursorPosition - s)), (e.anticursor = q(this, r[v], r)))) : (this.anticursorPosition = e[v] && e[v].text.length);
                }),
                (t.blur = function () {
                    to.prototype.blur.call(this), n(this);
                }),
                (t.focus = to.prototype.focus);
        }),
        tc = m(y, function (t, e) {
            function n(t, e) {
                return e.charAt(t === v ? 0 : -1 + e.length);
            }
            (t.init = function (t) {
                e.init.call(this), (this.text = t);
            }),
                (t.jQadd = function (t) {
                    (this.dom = t), (this.jQ = x(t));
                }),
                (t.jQize = function () {
                    return this.jQadd(document.createTextNode(this.text));
                }),
                (t.appendText = function (t) {
                    (this.text += t), this.dom.appendData(t);
                }),
                (t.prependText = function (t) {
                    (this.text = t + this.text), this.dom.insertData(0, t);
                }),
                (t.insTextAtDirEnd = function (t, e) {
                    w(e), e === b ? this.appendText(t) : this.prependText(t);
                }),
                (t.splitRight = function (t) {
                    var e = tc(this.text.slice(t)).adopt(this.parent, this, this[b]);
                    return e.jQadd(this.dom.splitText(t)), (this.text = this.text.slice(0, t)), e;
                }),
                (t.moveTowards = function (t, e) {
                    w(t);
                    var i = n(-t, this.text),
                        s = this[-t];
                    return s ? s.insTextAtDirEnd(i, t) : tc(i).createDir(-t, e), this.deleteTowards(t, e);
                }),
                (t.latex = function () {
                    return this.text;
                }),
                (t.deleteTowards = function (t, e) {
                    1 < this.text.length ? (t === b ? (this.dom.deleteData(0, 1), (this.text = this.text.slice(1))) : (this.dom.deleteData(-1 + this.text.length, 1), (this.text = this.text.slice(0, -1)))) : (this.remove(), this.jQ.remove(), (e[t] = this[t]));
                }),
                (t.selectTowards = function (t, e) {
                    w(t);
                    var i,
                        s,
                        r = e.anticursor,
                        o = n(-t, this.text);
                    return r[t] === this ? ((s = tc(o).createDir(t, e)), (r[t] = s), e.insDirOf(t, s)) : ((i = this[-t]) ? i.insTextAtDirEnd(o, t) : (s = tc(o).createDir(-t, e)).jQ.insDirOf(-t, e.selection.jQ), 1 === this.text.length && r[-t] === this && (r[-t] = this[-t])), this.deleteTowards(t, e);
                });
        });
    function th(t, e, n) {
        return m(tl, { ctrlSeq: t, htmlTemplate: "<" + e + " " + n + ">&0</" + e + ">" });
    }
    (j.$ = C.text = C.textnormal = C.textrm = C.textup = C.textmd = tl), (C.em = C.italic = C.italics = C.emph = C.textit = C.textsl = th("\\textit", "i", 'class="mq-text-mode"')), (C.strong = C.bold = C.textbf = th("\\textbf", "b", 'class="mq-text-mode"')), (C.sf = C.textsf = th("\\textsf", "span", 'class="mq-sans-serif mq-text-mode"')), (C.tt = C.texttt = th("\\texttt", "span", 'class="mq-monospace mq-text-mode"')), (C.textsc = th("\\textsc", "span", 'style="font-variant:small-caps" class="mq-text-mode"')), (C.uppercase = th("\\uppercase", "span", 'style="text-transform:uppercase" class="mq-text-mode"')), (C.lowercase = th("\\lowercase", "span", 'style="text-transform:lowercase" class="mq-text-mode"'));
    var tu = m(tn, function (t, e) {
            (t.init = function (t) {
                e.init.call(this, "$"), (this.cursor = t);
            }),
                (t.htmlTemplate = '<span class="mq-math-mode">&0</span>'),
                (t.createBlocks = function () {
                    e.createBlocks.call(this),
                        (this.ends[v].cursor = this.cursor),
                        (this.ends[v].write = function (t, e) {
                            "$" !== e ? to.prototype.write.call(this, t, e) : this.isEmpty() ? (t.insRightOf(this.parent), this.parent.deleteTowards(dir, t), ts("\\$", "$").createLeftOf(t.show())) : t[b] ? (t[v] ? to.prototype.write.call(this, t, e) : t.insLeftOf(this.parent)) : t.insRightOf(this.parent);
                        });
                }),
                (t.latex = function () {
                    return "$" + this.ends[v].latex() + "$";
                });
        }),
        tf = m(ta, function (t, e) {
            (t.keystroke = function (t) {
                if ("Spacebar" !== t && "Shift-Spacebar" !== t) return e.keystroke.apply(this, arguments);
            }),
                (t.write = function (t, e) {
                    var n;
                    t.show().deleteSelection(), "$" === e ? tu(t).createLeftOf(t) : ("<" === e ? (n = "&lt;") : ">" === e && (n = "&gt;"), ts(e, n).createLeftOf(t));
                });
        });
    (D.TextField = function (t) {
        return m(t.EditableField, function (t, e) {
            (this.RootBlock = tf),
                (t.__mathquillify = function () {
                    return e.__mathquillify.call(this, "mq-editable-field mq-text-mode");
                }),
                (t.latex = function (t) {
                    return 0 < arguments.length ? (this.__controller.renderLatexText(t), this.__controller.blurred && this.__controller.cursor.hide().parent.blur(), this) : this.__controller.exportLatex();
                });
        });
    }),
        (j["\\"] = m(tn, function (t, e) {
            (t.ctrlSeq = "\\"),
                (t.replaces = function (t) {
                    (this._replacedFragment = t.disown()),
                        (this.isEmpty = function () {
                            return !1;
                        });
                }),
                (t.htmlTemplate = '<span class="mq-latex-command-input mq-non-leaf">\\<span>&0</span></span>'),
                (t.textTemplate = ["\\"]),
                (t.createBlocks = function () {
                    e.createBlocks.call(this),
                        (this.ends[v].focus = function () {
                            return this.parent.jQ.addClass("mq-hasCursor"), this.isEmpty() && this.parent.jQ.removeClass("mq-empty"), this;
                        }),
                        (this.ends[v].blur = function () {
                            return this.parent.jQ.removeClass("mq-hasCursor"), this.isEmpty() && this.parent.jQ.addClass("mq-empty"), this;
                        }),
                        (this.ends[v].write = function (t, e) {
                            t.show().deleteSelection(), e.match(/[a-z]/i) ? ts(e).createLeftOf(t) : (this.parent.renderCommand(t), ("\\" === e && this.isEmpty()) || this.parent.parent.write(t, e));
                        }),
                        (this.ends[v].keystroke = function (t, n, i) {
                            return "Tab" === t || "Enter" === t || "Spacebar" === t ? (this.parent.renderCommand(i.cursor), void n.preventDefault()) : e.keystroke.apply(this, arguments);
                        });
                }),
                (t.createLeftOf = function (t) {
                    var n;
                    e.createLeftOf.call(this, t),
                        this._replacedFragment &&
                            ((n = this.jQ[0]),
                            (this.jQ = this._replacedFragment.jQ
                                .addClass("mq-blur")
                                .bind("mousedown mousemove", function (t) {
                                    return x((t.target = n)).trigger(t), !1;
                                })
                                .insertBefore(this.jQ)
                                .add(this.jQ)));
                }),
                (t.latex = function () {
                    return "\\" + this.ends[v].latex() + " ";
                }),
                (t.renderCommand = function (t) {
                    (this.jQ = this.jQ.last()), this.remove(), this[b] ? t.insLeftOf(this[b]) : t.insAtRightEnd(this.parent);
                    var e = this.ends[v].latex(),
                        n = C[(e = e || " ")];
                    n ? ((n = n(e)), this._replacedFragment && n.replaces(this._replacedFragment), n.createLeftOf(t)) : ((n = tl()).replaces(e), n.createLeftOf(t), t.insRightOf(n), this._replacedFragment && this._replacedFragment.remove());
                });
        })),
        (C.notin =
            C.cong =
            C.equiv =
            C.oplus =
            C.otimes =
                m(tr, function (t, e) {
                    t.init = function (t) {
                        e.init.call(this, "\\" + t + " ", "&" + t + ";");
                    };
                })),
        (C["≠"] = C.ne = C.neq = u(tr, "\\ne ", "&ne;")),
        (C.ast = C.star = C.loast = C.lowast = u(tr, "\\ast ", "&lowast;")),
        (C.therefor = C.therefore = u(tr, "\\therefore ", "&there4;")),
        (C.cuz = C.because = u(tr, "\\because ", "&#8757;")),
        (C.prop = C.propto = u(tr, "\\propto ", "&prop;")),
        (C["≈"] = C.asymp = C.approx = u(tr, "\\approx ", "&asymp;")),
        (C.isin = C.in = u(tr, "\\in ", "&isin;")),
        (C.ni = C.contains = u(tr, "\\ni ", "&ni;")),
        (C.notni = C.niton = C.notcontains = C.doesnotcontain = u(tr, "\\not\\ni ", "&#8716;")),
        (C.sub = C.subset = u(tr, "\\subset ", "&sub;")),
        (C.sup = C.supset = C.superset = u(tr, "\\supset ", "&sup;")),
        (C.nsub = C.notsub = C.nsubset = C.notsubset = u(tr, "\\not\\subset ", "&#8836;")),
        (C.nsup = C.notsup = C.nsupset = C.notsupset = C.nsuperset = C.notsuperset = u(tr, "\\not\\supset ", "&#8837;")),
        (C.sube = C.subeq = C.subsete = C.subseteq = u(tr, "\\subseteq ", "&sube;")),
        (C.supe = C.supeq = C.supsete = C.supseteq = C.supersete = C.superseteq = u(tr, "\\supseteq ", "&supe;")),
        (C.nsube = C.nsubeq = C.notsube = C.notsubeq = C.nsubsete = C.nsubseteq = C.notsubsete = C.notsubseteq = u(tr, "\\not\\subseteq ", "&#8840;")),
        (C.nsupe = C.nsupeq = C.notsupe = C.notsupeq = C.nsupsete = C.nsupseteq = C.notsupsete = C.notsupseteq = C.nsupersete = C.nsuperseteq = C.notsupersete = C.notsuperseteq = u(tr, "\\not\\supseteq ", "&#8841;")),
        (C.N = C.naturals = C.Naturals = u(ts, "\\mathbb{N}", "&#8469;")),
        (C.P = C.primes = C.Primes = C.projective = C.Projective = C.probability = C.Probability = u(ts, "\\mathbb{P}", "&#8473;")),
        (C.Z = C.integers = C.Integers = u(ts, "\\mathbb{Z}", "&#8484;")),
        (C.Q = C.rationals = C.Rationals = u(ts, "\\mathbb{Q}", "&#8474;")),
        (C.R = C.reals = C.Reals = u(ts, "\\mathbb{R}", "&#8477;")),
        (C.C = C.complex = C.Complex = C.complexes = C.Complexes = C.complexplane = C.Complexplane = C.ComplexPlane = u(ts, "\\mathbb{C}", "&#8450;")),
        (C.H = C.Hamiltonian = C.quaternions = C.Quaternions = u(ts, "\\mathbb{H}", "&#8461;")),
        (C.quad = C.emsp = u(ts, "\\quad ", "    ")),
        (C.qquad = u(ts, "\\qquad ", "        ")),
        (C.diamond = u(ts, "\\diamond ", "&#9671;")),
        (C.bigtriangleup = u(ts, "\\bigtriangleup ", "&#9651;")),
        (C.ominus = u(ts, "\\ominus ", "&#8854;")),
        (C.uplus = u(ts, "\\uplus ", "&#8846;")),
        (C.bigtriangledown = u(ts, "\\bigtriangledown ", "&#9661;")),
        (C.sqcap = u(ts, "\\sqcap ", "&#8851;")),
        (C.triangleleft = u(ts, "\\triangleleft ", "&#8882;")),
        (C.sqcup = u(ts, "\\sqcup ", "&#8852;")),
        (C.triangleright = u(ts, "\\triangleright ", "&#8883;")),
        (C.odot = C.circledot = u(ts, "\\odot ", "&#8857;")),
        (C.bigcirc = u(ts, "\\bigcirc ", "&#9711;")),
        (C.dagger = u(ts, "\\dagger ", "&#0134;")),
        (C.ddagger = u(ts, "\\ddagger ", "&#135;")),
        (C.wr = u(ts, "\\wr ", "&#8768;")),
        (C.amalg = u(ts, "\\amalg ", "&#8720;")),
        (C.models = u(ts, "\\models ", "&#8872;")),
        (C.prec = u(ts, "\\prec ", "&#8826;")),
        (C.succ = u(ts, "\\succ ", "&#8827;")),
        (C.preceq = u(ts, "\\preceq ", "&#8828;")),
        (C.succeq = u(ts, "\\succeq ", "&#8829;")),
        (C.simeq = u(ts, "\\simeq ", "&#8771;")),
        (C.mid = u(ts, "\\mid ", "&#8739;")),
        (C.ll = u(ts, "\\ll ", "&#8810;")),
        (C.gg = u(ts, "\\gg ", "&#8811;")),
        (C.parallel = u(ts, "\\parallel ", "&#8741;")),
        (C.nparallel = u(ts, "\\nparallel ", "&#8742;")),
        (C.bowtie = u(ts, "\\bowtie ", "&#8904;")),
        (C.sqsubset = u(ts, "\\sqsubset ", "&#8847;")),
        (C.sqsupset = u(ts, "\\sqsupset ", "&#8848;")),
        (C.smile = u(ts, "\\smile ", "&#8995;")),
        (C.sqsubseteq = u(ts, "\\sqsubseteq ", "&#8849;")),
        (C.sqsupseteq = u(ts, "\\sqsupseteq ", "&#8850;")),
        (C.doteq = u(ts, "\\doteq ", "&#8784;")),
        (C.frown = u(ts, "\\frown ", "&#8994;")),
        (C.vdash = u(ts, "\\vdash ", "&#8870;")),
        (C.dashv = u(ts, "\\dashv ", "&#8867;")),
        (C.nless = u(ts, "\\nless ", "&#8814;")),
        (C.ngtr = u(ts, "\\ngtr ", "&#8815;")),
        (C.longleftarrow = u(ts, "\\longleftarrow ", "&#8592;")),
        (C.longrightarrow = u(ts, "\\longrightarrow ", "&#8594;")),
        (C.Longleftarrow = u(ts, "\\Longleftarrow ", "&#8656;")),
        (C.Longrightarrow = u(ts, "\\Longrightarrow ", "&#8658;")),
        (C.longleftrightarrow = u(ts, "\\longleftrightarrow ", "&#8596;")),
        (C.updownarrow = u(ts, "\\updownarrow ", "&#8597;")),
        (C.Longleftrightarrow = u(ts, "\\Longleftrightarrow ", "&#8660;")),
        (C.Updownarrow = u(ts, "\\Updownarrow ", "&#8661;")),
        (C.mapsto = u(ts, "\\mapsto ", "&#8614;")),
        (C.nearrow = u(ts, "\\nearrow ", "&#8599;")),
        (C.hookleftarrow = u(ts, "\\hookleftarrow ", "&#8617;")),
        (C.hookrightarrow = u(ts, "\\hookrightarrow ", "&#8618;")),
        (C.searrow = u(ts, "\\searrow ", "&#8600;")),
        (C.leftharpoonup = u(ts, "\\leftharpoonup ", "&#8636;")),
        (C.rightharpoonup = u(ts, "\\rightharpoonup ", "&#8640;")),
        (C.swarrow = u(ts, "\\swarrow ", "&#8601;")),
        (C.leftharpoondown = u(ts, "\\leftharpoondown ", "&#8637;")),
        (C.rightharpoondown = u(ts, "\\rightharpoondown ", "&#8641;")),
        (C.nwarrow = u(ts, "\\nwarrow ", "&#8598;")),
        (C.ldots = u(ts, "\\ldots ", "&#8230;")),
        (C.cdots = u(ts, "\\cdots ", "&#8943;")),
        (C.vdots = u(ts, "\\vdots ", "&#8942;")),
        (C.ddots = u(ts, "\\ddots ", "&#8945;")),
        (C.surd = u(ts, "\\surd ", "&#8730;")),
        (C.triangle = u(ts, "\\triangle ", "&#9651;")),
        (C.ell = u(ts, "\\ell ", "&#8467;")),
        (C.top = u(ts, "\\top ", "&#8868;")),
        (C.flat = u(ts, "\\flat ", "&#9837;")),
        (C.natural = u(ts, "\\natural ", "&#9838;")),
        (C.sharp = u(ts, "\\sharp ", "&#9839;")),
        (C.wp = u(ts, "\\wp ", "&#8472;")),
        (C.bot = u(ts, "\\bot ", "&#8869;")),
        (C.clubsuit = u(ts, "\\clubsuit ", "&#9827;")),
        (C.diamondsuit = u(ts, "\\diamondsuit ", "&#9826;")),
        (C.heartsuit = u(ts, "\\heartsuit ", "&#9825;")),
        (C.spadesuit = u(ts, "\\spadesuit ", "&#9824;")),
        (C.parallelogram = u(ts, "\\parallelogram ", "&#9649;")),
        (C.square = u(ts, "\\square ", "&#11036;")),
        (C.oint = u(ts, "\\oint ", "&#8750;")),
        (C.bigcap = u(ts, "\\bigcap ", "&#8745;")),
        (C.bigcup = u(ts, "\\bigcup ", "&#8746;")),
        (C.bigsqcup = u(ts, "\\bigsqcup ", "&#8852;")),
        (C.bigvee = u(ts, "\\bigvee ", "&#8744;")),
        (C.bigwedge = u(ts, "\\bigwedge ", "&#8743;")),
        (C.bigodot = u(ts, "\\bigodot ", "&#8857;")),
        (C.bigotimes = u(ts, "\\bigotimes ", "&#8855;")),
        (C.bigoplus = u(ts, "\\bigoplus ", "&#8853;")),
        (C.biguplus = u(ts, "\\biguplus ", "&#8846;")),
        (C.lfloor = u(ts, "\\lfloor ", "&#8970;")),
        (C.rfloor = u(ts, "\\rfloor ", "&#8971;")),
        (C.lceil = u(ts, "\\lceil ", "&#8968;")),
        (C.rceil = u(ts, "\\rceil ", "&#8969;")),
        (C.opencurlybrace = C.lbrace = u(ts, "\\lbrace ", "{")),
        (C.closecurlybrace = C.rbrace = u(ts, "\\rbrace ", "}")),
        (C.lbrack = u(ts, "[")),
        (C.rbrack = u(ts, "]")),
        (C.slash = u(ts, "/")),
        (C.vert = u(ts, "|")),
        (C.perp = C.perpendicular = u(ts, "\\perp ", "&perp;")),
        (C.nabla = C.del = u(ts, "\\nabla ", "&nabla;")),
        (C.hbar = u(ts, "\\hbar ", "&#8463;")),
        (C.AA = C.Angstrom = C.angstrom = u(ts, "\\text\\AA ", "&#8491;")),
        (C.ring = C.circ = C.circle = u(ts, "\\circ ", "&#8728;")),
        (C.bull = C.bullet = u(ts, "\\bullet ", "&bull;")),
        (C.setminus = C.smallsetminus = u(ts, "\\setminus ", "&#8726;")),
        (C.not = C["\xac"] = C.neg = u(ts, "\\neg ", "&not;")),
        (C["…"] = C.dots = C.ellip = C.hellip = C.ellipsis = C.hellipsis = u(ts, "\\dots ", "&hellip;")),
        (C.converges = C.darr = C.dnarr = C.dnarrow = C.downarrow = u(ts, "\\downarrow ", "&darr;")),
        (C.dArr = C.dnArr = C.dnArrow = C.Downarrow = u(ts, "\\Downarrow ", "&dArr;")),
        (C.diverges = C.uarr = C.uparrow = u(ts, "\\uparrow ", "&uarr;")),
        (C.uArr = C.Uparrow = u(ts, "\\Uparrow ", "&uArr;")),
        (C.to = u(tr, "\\to ", "&rarr;")),
        (C.rarr = C.rightarrow = u(ts, "\\rightarrow ", "&rarr;")),
        (C.implies = u(tr, "\\Rightarrow ", "&rArr;")),
        (C.rArr = C.Rightarrow = u(ts, "\\Rightarrow ", "&rArr;")),
        (C.gets = u(tr, "\\gets ", "&larr;")),
        (C.larr = C.leftarrow = u(ts, "\\leftarrow ", "&larr;")),
        (C.impliedby = u(tr, "\\Leftarrow ", "&lArr;")),
        (C.lArr = C.Leftarrow = u(ts, "\\Leftarrow ", "&lArr;")),
        (C.harr = C.lrarr = C.leftrightarrow = u(ts, "\\leftrightarrow ", "&harr;")),
        (C.iff = u(tr, "\\Leftrightarrow ", "&hArr;")),
        (C.hArr = C.lrArr = C.Leftrightarrow = u(ts, "\\Leftrightarrow ", "&hArr;")),
        (C.Re = C.Real = C.real = u(ts, "\\Re ", "&real;")),
        (C.Im = C.imag = C.image = C.imagin = C.imaginary = C.Imaginary = u(ts, "\\Im ", "&image;")),
        (C.part = C.partial = u(ts, "\\partial ", "&part;")),
        (C.infty = C.infin = C.infinity = u(ts, "\\infty ", "&infin;")),
        (C.alef = C.alefsym = C.aleph = C.alephsym = u(ts, "\\aleph ", "&alefsym;")),
        (C.xist = C.xists = C.exist = C.exists = u(ts, "\\exists ", "&exist;")),
        (C.and = C.land = C.wedge = u(ts, "\\wedge ", "&and;")),
        (C.or = C.lor = C.vee = u(ts, "\\vee ", "&or;")),
        (C.o = C.O = C.empty = C.emptyset = C.oslash = C.Oslash = C.nothing = C.varnothing = u(tr, "\\varnothing ", "&empty;")),
        (C.cup = C.union = u(tr, "\\cup ", "&cup;")),
        (C.cap = C.intersect = C.intersection = u(tr, "\\cap ", "&cap;")),
        (C.deg = C.degree = u(ts, "\\degree ", "&deg;")),
        (C.ang = C.angle = u(ts, "\\angle ", "&ang;")),
        (C.measuredangle = u(ts, "\\measuredangle ", "&#8737;"));
    var tp = m(ts, function (t, e) {
            t.createLeftOf = function (t) {
                t.options.autoSubscriptNumerals && t.parent !== t.parent.parent.sub && ((t[v] instanceof td && !1 !== t[v].isItalic) || (t[v] instanceof t7 && t[v][v] instanceof td && !1 !== t[v][v].isItalic)) ? (C._().createLeftOf(t), e.createLeftOf.call(this, t), t.insRightOf(t.parent.parent)) : e.createLeftOf.call(this, t);
            };
        }),
        td = m(ti, function (t, e) {
            (t.init = function (t, n) {
                e.init.call(this, t, '<var class="' + (n || t) + '">' + (n || t) + "</var>");
            }),
                (t.text = function () {
                    var t = this.ctrlSeq;
                    return !this[v] || this[v] instanceof td || this[v] instanceof tr || "\\ " === this[v].ctrlSeq || (t = "*" + t), !this[b] || this[b] instanceof tr || this[b] instanceof t7 || (t += "*"), t;
                });
        });
    (L.p.autoCommands = { _maxLength: 0 }),
        (E.autoCommands = function (t) {
            if (!/^[a-z]+(?: [a-z]+)*$/i.test(t)) throw '"' + t + '" not a space-delimited list of only letters';
            for (var e = t.split(" "), n = {}, i = 0, s = 0; s < e.length; s += 1) {
                var o = e[s];
                if (o.length < 2) throw 'autocommand "' + o + '" not minimum length of 2';
                if (C[o] === tb) throw '"' + o + '" is a built-in operator name';
                (n[o] = 1), (i = r(i, o.length));
            }
            return (n._maxLength = i), n;
        });
    var tm = m(td, function (t, e) {
            function n(t) {
                return t instanceof ti && !(t instanceof tr);
            }
            (t.init = function (t) {
                return e.init.call(this, (this.letter = t));
            }),
                (t.createLeftOf = function (t) {
                    var n = t.options.autoCommands,
                        i = n._maxLength;
                    if (0 < i) {
                        for (var s = this.letter, r = t[v], o = 1; r instanceof tm && o < i; ) (s = r.letter + s), (r = r[v]), (o += 1);
                        for (; s.length; ) {
                            if (n.hasOwnProperty(s)) {
                                for (o = 2, r = t[v]; o < s.length; o += 1, r = r[v]);
                                return k(r, t[v]).remove(), (t[v] = r[v]), C[s](s).createLeftOf(t);
                            }
                            s = s.slice(1);
                        }
                    }
                    e.createLeftOf.apply(this, arguments);
                }),
                (t.italicize = function (t) {
                    return (this.isItalic = t), this.jQ.toggleClass("mq-operator-name", !t), this;
                }),
                (t.finalizeTree =
                    t.siblingDeleted =
                    t.siblingCreated =
                        function (t, e) {
                            (e !== v && this[b] instanceof tm) || this.autoUnItalicize(t);
                        }),
                (t.autoUnItalicize = function (t) {
                    var e = t.autoOperatorNames;
                    if (0 !== e._maxLength) {
                        for (var i = this.letter, r = this[v]; r instanceof tm; r = r[v]) i = r.letter + i;
                        for (var o = this[b]; o instanceof tm; o = o[b]) i += o.letter;
                        k(r[b] || this.parent.ends[v], o[v] || this.parent.ends[b]).each(function (t) {
                            t.italicize(!0).jQ.removeClass("mq-first mq-last"), (t.ctrlSeq = t.letter);
                        });
                        t: for (var a = 0, l = r[b] || this.parent.ends[v]; a < i.length; a += 1, l = l[b])
                            for (var c = s(e._maxLength, i.length - a); 0 < c; --c) {
                                var h = i.slice(a, a + c);
                                if (e.hasOwnProperty(h)) {
                                    for (var u = 0, f = l; u < c; u += 1, f = f[b]) {
                                        f.italicize(!1);
                                        var p = f;
                                    }
                                    var d = tg.hasOwnProperty(h);
                                    (l.ctrlSeq = (d ? "\\" : "\\operatorname{") + l.ctrlSeq), (p.ctrlSeq += d ? " " : "}"), t$.hasOwnProperty(h) && p[v][v][v].jQ.addClass("mq-last"), n(l[v]) && l.jQ.addClass("mq-first"), n(p[b]) && p.jQ.addClass("mq-last"), (a += c - 1), (l = p);
                                    continue t;
                                }
                            }
                    }
                });
        }),
        tg = {},
        t_ = (L.p.autoOperatorNames = { _maxLength: 9 }),
        t$ = { limsup: 1, liminf: 1, projlim: 1, injlim: 1 };
    !(function () {
        for (var t = "arg deg det dim exp gcd hom inf ker lg lim ln log max min sup limsup liminf injlim projlim Pr".split(" "), e = 0; e < t.length; e += 1) tg[t[e]] = t_[t[e]] = 1;
        for (var n = "sin cos tan arcsin arccos arctan sinh cosh tanh sec csc cot coth".split(" "), e = 0; e < n.length; e += 1) tg[n[e]] = 1;
        for (var i = "sin cos tan sec cosec csc cotan cot ctg".split(" "), e = 0; e < i.length; e += 1) t_[i[e]] = t_["arc" + i[e]] = t_[i[e] + "h"] = t_["ar" + i[e] + "h"] = t_["arc" + i[e] + "h"] = 1;
        for (var s = "gcf hcf lcm proj span".split(" "), e = 0; e < s.length; e += 1) t_[s[e]] = 1;
    })(),
        (E.autoOperatorNames = function (t) {
            if (!/^[a-z]+(?: [a-z]+)*$/i.test(t)) throw '"' + t + '" not a space-delimited list of only letters';
            for (var e = t.split(" "), n = {}, i = 0, s = 0; s < e.length; s += 1) {
                var o = e[s];
                if (o.length < 2) throw '"' + o + '" not minimum length of 2';
                (n[o] = 1), (i = r(i, o.length));
            }
            return (n._maxLength = i), n;
        });
    var tv,
        tb = m(ti, function (t, e) {
            (t.init = function (t) {
                this.ctrlSeq = t;
            }),
                (t.createLeftOf = function (t) {
                    for (var e = this.ctrlSeq, n = 0; n < e.length; n += 1) tm(e.charAt(n)).createLeftOf(t);
                }),
                (t.parser = function () {
                    for (var t = this.ctrlSeq, e = to(), n = 0; n < t.length; n += 1) tm(t.charAt(n)).adopt(e, e.ends[b], 0);
                    return W.succeed(e.children());
                });
        });
    for (tv in t_) t_.hasOwnProperty(tv) && (C[tv] = tb);
    (C.operatorname = m(tn, function (t) {
        (t.createLeftOf = o),
            (t.numBlocks = function () {
                return 1;
            }),
            (t.parser = function () {
                return J.block.map(function (t) {
                    return t.children();
                });
            });
    })),
        (C.f = m(tm, function (t, e) {
            (t.init = function () {
                ti.p.init.call(this, (this.letter = "f"), '<var class="mq-f">f</var>');
            }),
                (t.italicize = function (t) {
                    return this.jQ.html("f").toggleClass("mq-f", t), e.italicize.apply(this, arguments);
                });
        })),
        (C[" "] = C.space = u(ts, "\\ ", "&nbsp;")),
        (C["'"] = C.prime = u(ts, "'", "&prime;")),
        (C.backslash = u(ts, "\\backslash ", "\\")),
        j["\\"] || (j["\\"] = C.backslash),
        (C.$ = u(ts, "\\$", "$"));
    var tw = m(ti, function (t, e) {
        t.init = function (t, n) {
            e.init.call(this, t, '<span class="mq-nonSymbola">' + (n || t) + "</span>");
        };
    });
    (C["@"] = tw),
        (C["&"] = u(tw, "\\&", "&amp;")),
        (C["%"] = u(tw, "\\%", "%")),
        (C.alpha =
            C.beta =
            C.gamma =
            C.delta =
            C.zeta =
            C.eta =
            C.theta =
            C.iota =
            C.kappa =
            C.mu =
            C.nu =
            C.xi =
            C.rho =
            C.sigma =
            C.tau =
            C.chi =
            C.psi =
            C.omega =
                m(td, function (t, e) {
                    t.init = function (t) {
                        e.init.call(this, "\\" + t + " ", "&" + t + ";");
                    };
                })),
        (C.phi = u(td, "\\phi ", "&#981;")),
        (C.phiv = C.varphi = u(td, "\\varphi ", "&phi;")),
        (C.epsilon = u(td, "\\epsilon ", "&#1013;")),
        (C.epsiv = C.varepsilon = u(td, "\\varepsilon ", "&epsilon;")),
        (C.piv = C.varpi = u(td, "\\varpi ", "&piv;")),
        (C.sigmaf = C.sigmav = C.varsigma = u(td, "\\varsigma ", "&sigmaf;")),
        (C.thetav = C.vartheta = C.thetasym = u(td, "\\vartheta ", "&thetasym;")),
        (C.upsilon = C.upsi = u(td, "\\upsilon ", "&upsilon;")),
        (C.gammad = C.Gammad = C.digamma = u(td, "\\digamma ", "&#989;")),
        (C.kappav = C.varkappa = u(td, "\\varkappa ", "&#1008;")),
        (C.rhov = C.varrho = u(td, "\\varrho ", "&#1009;")),
        (C.pi = C["π"] = u(tw, "\\pi ", "&pi;")),
        (C.lambda = u(tw, "\\lambda ", "&lambda;")),
        (C.Upsilon = C.Upsi = C.upsih = C.Upsih = u(ti, "\\Upsilon ", '<var style="font-family: serif">&upsih;</var>')),
        (C.Gamma =
            C.Delta =
            C.Theta =
            C.Lambda =
            C.Xi =
            C.Pi =
            C.Sigma =
            C.Phi =
            C.Psi =
            C.Omega =
            C.forall =
                m(ts, function (t, e) {
                    t.init = function (t) {
                        e.init.call(this, "\\" + t + " ", "&" + t + ";");
                    };
                }));
    var tx = m(tn, function (t) {
        (t.init = function (t) {
            this.latex = t;
        }),
            (t.createLeftOf = function (t) {
                var e = J.parse(this.latex);
                e.children().adopt(t.parent, t[v], t[b]), (t[v] = e.ends[b]), e.jQize().insertBefore(t.jQ), e.finalizeInsert(t.options, t), e.ends[b][b].siblingCreated && e.ends[b][b].siblingCreated(t.options, v), e.ends[v][v].siblingCreated && e.ends[v][v].siblingCreated(t.options, b), t.parent.bubble("reflow");
            }),
            (t.parser = function () {
                var t = J.parse(this.latex).children();
                return W.succeed(t);
            });
    });
    (C["\xb9"] = u(tx, "^1")),
        (C["\xb2"] = u(tx, "^2")),
        (C["\xb3"] = u(tx, "^3")),
        (C["\xbc"] = u(tx, "\\frac14")),
        (C["\xbd"] = u(tx, "\\frac12")),
        (C["\xbe"] = u(tx, "\\frac34")),
        (te = m(tr, function (t) {
            (t.init = ts.prototype.init),
                (t.contactWeld =
                    t.siblingCreated =
                    t.siblingDeleted =
                        function (t, e) {
                            if (e !== b) return (this.jQ[0].className = !this[v] || this[v] instanceof tr ? "" : "mq-binary-operator"), this;
                        });
        })),
        (C["+"] = u(te, "+", "+")),
        (C["–"] = C["-"] = u(te, "-", "&minus;")),
        (C["\xb1"] = C.pm = C.plusmn = C.plusminus = u(te, "\\pm ", "&plusmn;")),
        (C.mp = C.mnplus = C.minusplus = u(te, "\\mp ", "&#8723;")),
        (j["*"] = C.sdot = C.cdot = u(tr, "\\cdot ", "&middot;", "*"));
    var t0 = m(tr, function (t, e) {
            (t.init = function (t, n) {
                (this.data = t), (n = (this.strict = n) ? "Strict" : ""), e.init.call(this, t["ctrlSeq" + n], t["html" + n], t["text" + n]);
            }),
                (t.swap = function (t) {
                    (t = (this.strict = t) ? "Strict" : ""), (this.ctrlSeq = this.data["ctrlSeq" + t]), this.jQ.html(this.data["html" + t]), (this.textTemplate = [this.data["text" + t]]);
                }),
                (t.deleteTowards = function (t, n) {
                    if (t === v && !this.strict) return this.swap(!0), void this.bubble("reflow");
                    e.deleteTowards.apply(this, arguments);
                });
        }),
        tw = { ctrlSeq: "\\le ", html: "&le;", text: "≤", ctrlSeqStrict: "<", htmlStrict: "&lt;", textStrict: "<" },
        tx = { ctrlSeq: "\\ge ", html: "&ge;", text: "≥", ctrlSeqStrict: ">", htmlStrict: "&gt;", textStrict: ">" };
    (C["<"] = C.lt = u(t0, tw, !0)), (C[">"] = C.gt = u(t0, tx, !0)), (C["≤"] = C.le = C.leq = u(t0, tw, !1)), (C["≥"] = C.ge = C.geq = u(t0, tx, !1));
    var tq = m(tr, function (t, e) {
        (t.init = function () {
            e.init.call(this, "=", "=");
        }),
            (t.createLeftOf = function (t) {
                if (t[v] instanceof t0 && t[v].strict) return t[v].swap(!1), void t[v].bubble("reflow");
                e.createLeftOf.apply(this, arguments);
            });
    });
    (C["="] = tq), (C["\xd7"] = C.times = u(tr, "\\times ", "&times;", "[x]")), (C["\xf7"] = C.div = C.divide = C.divides = u(tr, "\\div ", "&divide;", "[/]")), (j["~"] = C.sim = u(tr, "\\sim ", "~", "~"));
    var t6,
        ty,
        t1,
        tO = o,
        t2 = document.createElement("div").style;
    for (t1 in { transform: 1, WebkitTransform: 1, MozTransform: 1, OTransform: 1, msTransform: 1 })
        if (t1 in t2) {
            ty = t1;
            break;
        }
    (t6 = ty
        ? function (t, e, n) {
              t.css(ty, "scale(" + e + "," + n + ")");
          }
        : "filter" in t2
        ? ((tO = function (t) {
              t.className = t.className;
          }),
          function (t, e, n) {
              (e /= 1 + (n - 1) / 2), t.css("fontSize", n + "em"), t.hasClass("mq-matrixed-container") || t.addClass("mq-matrixed-container").wrapInner('<span class="mq-matrixed"></span>');
              var i = t.children().css("filter", "progid:DXImageTransform.Microsoft.Matrix(M11=" + e + ",SizingMethod='auto expand')");
              function s() {
                  t.css("marginRight", ((i.width() - 1) * (e - 1)) / e + "px");
              }
              s();
              var r = setInterval(s);
              x(window).load(function () {
                  clearTimeout(r), s();
              });
          })
        : function (t, e, n) {
              t.css("fontSize", n + "em");
          }),
        (te = m(tn, function (t, e) {
            t.init = function (t, n, i) {
                e.init.call(this, t, "<" + n + " " + i + ">&0</" + n + ">");
            };
        })),
        (C.mathrm = u(te, "\\mathrm", "span", 'class="mq-roman mq-font"')),
        (C.mathit = u(te, "\\mathit", "i", 'class="mq-font"')),
        (C.mathbf = u(te, "\\mathbf", "b", 'class="mq-font"')),
        (C.mathsf = u(te, "\\mathsf", "span", 'class="mq-sans-serif mq-font"')),
        (C.mathtt = u(te, "\\mathtt", "span", 'class="mq-monospace mq-font"')),
        (C.underline = u(te, "\\underline", "span", 'class="mq-non-leaf mq-underline"')),
        (C.overline = C.bar = u(te, "\\overline", "span", 'class="mq-non-leaf mq-overline"')),
        (C.overrightarrow = u(te, "\\overrightarrow", "span", 'class="mq-non-leaf mq-overarrow mq-arrow-right"')),
        (C.overleftarrow = u(te, "\\overleftarrow", "span", 'class="mq-non-leaf mq-overarrow mq-arrow-left"')),
        (C.textcolor = m(tn, function (t, e) {
            (t.setColor = function (t) {
                (this.color = t), (this.htmlTemplate = '<span class="mq-textcolor" style="color:' + t + '">&0</span>');
            }),
                (t.latex = function () {
                    return "\\textcolor{" + this.color + "}{" + this.blocks[0].latex() + "}";
                }),
                (t.parser = function () {
                    var t = this,
                        n = W.optWhitespace,
                        i = W.string,
                        s = W.regex;
                    return n
                        .then(i("{"))
                        .then(s(/^[#\w\s.,()%-]*/))
                        .skip(i("}"))
                        .then(function (n) {
                            return t.setColor(n), e.parser.call(t);
                        });
                });
        })),
        (C.class = m(tn, function (t, e) {
            t.parser = function () {
                var t = this,
                    n = W.string,
                    i = W.regex;
                return W.optWhitespace
                    .then(n("{"))
                    .then(i(/^[-\w\s\\\xA0-\xFF]*/))
                    .skip(n("}"))
                    .then(function (n) {
                        return (t.htmlTemplate = '<span class="mq-class ' + n + '">&0</span>'), e.parser.call(t);
                    });
            };
        }));
    var t7 = m(tn, function (t, e) {
        (t.ctrlSeq = "_{...}^{...}"),
            (t.createLeftOf = function (t) {
                if (t[v] || !t.options.supSubsRequireOperand) return e.createLeftOf.apply(this, arguments);
            }),
            (t.contactWeld = function (t) {
                for (var e = v; e; e = e === v && b)
                    if (this[e] instanceof t7) {
                        for (var n = "sub"; n; n = "sub" === n && "sup") {
                            var i,
                                s,
                                r = this[n],
                                o = this[e][n];
                            r &&
                                (o ? (r.isEmpty() ? (s = q(o, 0, o.ends[v])) : (r.jQ.children().insAtDirEnd(-e, o.jQ), (s = q(o, (i = r.children().disown()).ends[b], o.ends[v])), e === v ? i.adopt(o, o.ends[b], 0) : i.adopt(o, 0, o.ends[v]))) : this[e].addBlock(r.disown()),
                                (this.placeCursor = (function (t, n) {
                                    return function (i) {
                                        i.insAtDirEnd(-e, t || n);
                                    };
                                })(o, r)));
                        }
                        this.remove(), t && t[v] === this && (e === b && s ? (s[v] ? t.insRightOf(s[v]) : t.insAtLeftEnd(s.parent)) : t.insRightOf(this[e]));
                        break;
                    }
                this.respace();
            }),
            (L.p.charsThatBreakOutOfSupSub = ""),
            (t.finalizeTree = function () {
                this.ends[v].write = function (t, e) {
                    if (t.options.autoSubscriptNumerals && this === this.parent.sub) {
                        if ("_" === e) return;
                        var n = this.chToCmd(e);
                        return n instanceof ti ? t.deleteSelection() : t.clearSelection().insRightOf(this.parent), n.createLeftOf(t.show());
                    }
                    t[v] && !t[b] && !t.selection && -1 < t.options.charsThatBreakOutOfSupSub.indexOf(e) && t.insRightOf(this.parent), to.p.write.apply(this, arguments);
                };
            }),
            (t.moveTowards = function (t, n, i) {
                n.options.autoSubscriptNumerals && !this.sup ? n.insDirOf(t, this) : e.moveTowards.apply(this, arguments);
            }),
            (t.deleteTowards = function (t, n) {
                var i;
                n.options.autoSubscriptNumerals && this.sub ? ((i = this.sub.ends[-t]) instanceof ti ? i.remove() : i && i.deleteTowards(t, n.insAtDirEnd(-t, this.sub)), this.sub.isEmpty() && (this.sub.deleteOutOf(v, n.insAtLeftEnd(this.sub)), this.sup && n.insDirOf(-t, this))) : e.deleteTowards.apply(this, arguments);
            }),
            (t.latex = function () {
                function t(t, e) {
                    var n = e && e.latex();
                    return e ? t + (1 === n.length ? n : "{" + (n || " ") + "}") : "";
                }
                return t("_", this.sub) + t("^", this.sup);
            }),
            (t.respace =
                t.siblingCreated =
                t.siblingDeleted =
                    function (t, e) {
                        e !== b && this.jQ.toggleClass("mq-limit", "\\int " === this[v].ctrlSeq);
                    }),
            (t.addBlock = function (t) {
                "sub" === this.supsub ? (((this.sup = this.upInto = this.sub.upOutOf = t).adopt(this, this.sub, 0).downOutOf = this.sub), (t.jQ = x('<span class="mq-sup"/>').append(t.jQ.children()).attr(i, t.id).prependTo(this.jQ))) : (((this.sub = this.downInto = this.sup.downOutOf = t).adopt(this, 0, this.sup).upOutOf = this.sup), (t.jQ = x('<span class="mq-sub"></span>').append(t.jQ.children()).attr(i, t.id).appendTo(this.jQ.removeClass("mq-sup-only"))), this.jQ.append('<span style="display:inline-block;width:0">&#8203;</span>'));
                for (var e = 0; e < 2; e += 1)
                    !(function (t, e, n, i) {
                        t[e].deleteOutOf = function (s, r) {
                            var o;
                            r.insDirOf(this[s] ? -s : s, this.parent), this.isEmpty() || ((o = this.ends[s]), this.children().disown().withDirAdopt(s, r.parent, r[s], r[-s]).jQ.insDirOf(-s, r.jQ), (r[-s] = o)), (t.supsub = n), delete t[e], delete t[i + "Into"], (t[n][i + "OutOf"] = tk), delete t[n].deleteOutOf, "sub" === e && x(t.jQ.addClass("mq-sup-only")[0].lastChild).remove(), this.remove();
                        };
                    })(this, "sub sup".split(" ")[e], "sup sub".split(" ")[e], "down up".split(" ")[e]);
            });
    });
    function tk(t) {
        var e = this.parent,
            n = t;
        do if (n[b]) return t.insLeftOf(e);
        while ((n = n.parent.parent) !== e);
        t.insRightOf(e);
    }
    (C.subscript = C._ =
        m(t7, function (t, e) {
            (t.supsub = "sub"),
                (t.htmlTemplate = '<span class="mq-supsub mq-non-leaf"><span class="mq-sub">&0</span><span style="display:inline-block;width:0">&#8203;</span></span>'),
                (t.textTemplate = ["_"]),
                (t.finalizeTree = function () {
                    (this.downInto = this.sub = this.ends[v]), (this.sub.upOutOf = tk), e.finalizeTree.call(this);
                });
        })),
        (C.superscript =
            C.supscript =
            C["^"] =
                m(t7, function (t, e) {
                    (t.supsub = "sup"),
                        (t.htmlTemplate = '<span class="mq-supsub mq-non-leaf mq-sup-only"><span class="mq-sup">&0</span></span>'),
                        (t.textTemplate = ["^"]),
                        (t.finalizeTree = function () {
                            (this.upInto = this.sup = this.ends[b]), (this.sup.downOutOf = tk), e.finalizeTree.call(this);
                        });
                }));
    var tC = m(tn, function (t, e) {
            (t.init = function (t, e) {
                (e = '<span class="mq-large-operator mq-non-leaf"><span class="mq-to"><span><small>&1</small></span></span><big class="sum">' + e + '</big><span class="mq-from"><span><small>&0</small></span></span></span>'), ti.prototype.init.call(this, t, e);
            }),
                (t.createLeftOf = function (t) {
                    e.createLeftOf.apply(this, arguments), t.options.sumStartsWithNEquals && (tm("n").createLeftOf(t), tq().createLeftOf(t));
                }),
                (t.latex = function () {
                    function t(t) {
                        return 1 === t.length ? t : "{" + (t || " ") + "}";
                    }
                    return this.ctrlSeq + "_" + t(this.ends[v].latex()) + "^" + t(this.ends[b].latex());
                }),
                (t.parser = function () {
                    for (var t = W.string, e = W.optWhitespace, n = W.succeed, i = J.block, s = this, r = (s.blocks = [to(), to()]), o = 0; o < r.length; o += 1) r[o].adopt(s, s.ends[b], 0);
                    return e
                        .then(t("_").or(t("^")))
                        .then(function (t) {
                            var e = r["_" === t ? 0 : 1];
                            return i.then(function (t) {
                                return t.children().adopt(e, e.ends[b], 0), n(s);
                            });
                        })
                        .many()
                        .result(s);
                }),
                (t.finalizeTree = function () {
                    (this.downInto = this.ends[v]), (this.upInto = this.ends[b]), (this.ends[v].upOutOf = this.ends[b]), (this.ends[b].downOutOf = this.ends[v]);
                });
        }),
        tw = (C.matrix = m(tn, function (t, e) {
            var n = m(to, function (t, e) {
                    (t.init = function (t, n) {
                        return (this.column = t), (this.row = n), e.init.call(this);
                    }),
                        (t.keystroke = function (t, n, i) {
                            switch (t) {
                                case "Shift-Spacebar":
                                    return n.preventDefault(), this.parent.insertColumn(this);
                                case "Shift-Enter":
                                    return this.parent.insertRow(this);
                            }
                            return e.keystroke.apply(this, arguments);
                        }),
                        (t.deleteOutOf = function (t, n) {
                            var i = this,
                                s = arguments;
                            this.parent.backspace(this, t, n, function () {
                                return e.deleteOutOf.apply(i, s);
                            });
                        });
                }),
                r = "\\\\";
            (t.parentheses = { left: null, right: null }),
                (t.maximum = { rows: 5, columns: 5 }),
                (t.defaults = { rows: 1, columns: 1 }),
                (t.ctrlSeq = "\\matrix"),
                (t.createBlocks = function () {
                    var t,
                        e,
                        i = this,
                        s = (i.blocks = []),
                        r = 0;
                    this.htmlTemplate.replace(/&\d+/g, function (o, a) {
                        (e = t === (a = i.htmlTemplate.substring(0, a).match(/<tr[^>]*>/gi).length - 1) ? e + 1 : 0), (s[r] = n(e, a)), s[r].adopt(i, i.ends[b], 0), (t = a), r++;
                    });
                }),
                (t.edited = function () {
                    var t = this.jQ.children("table"),
                        e = t.outerHeight() / +t.css("fontSize").slice(0, -2),
                        t = this.jQ.children(".mq-paren");
                    t.length && t6(t, s(1 + 0.2 * (e - 1), 1.2), 1.05 * e);
                }),
                (t.latex = function () {
                    for (var t, e, n = this.getMatrixName(), i = "\\begin{" + n + "}", s = 0; s < this.blocks.length; s++) (t = this.blocks[s].row), void 0 !== e && (i += e !== t ? r : "&"), (e = t), (i += this.blocks[s].latex());
                    return i + ("\\end{" + n) + "}";
                }),
                (t.createLeftOf = function (n) {
                    this.cursor = n;
                    var i = Math.min(this.defaults.rows, this.maximum.rows),
                        s = Math.min(this.defaults.columns, this.maximum.columns);
                    (this.defaultHtmlTemplate = this.defaultHtmlTemplate || this.generateHtmlTemplate(i, s)), (t.htmlTemplate = this.defaultHtmlTemplate), e.createLeftOf.call(this, n);
                }),
                (t.getMatrixName = function () {
                    return this.ctrlSeq.replace("\\", "");
                }),
                (t.generateHtmlTemplate = function (t, e) {
                    var n = '<span class="mq-matrix mq-non-leaf">' + o(this.parentheses.left);
                    (n += '<table class="mq-non-leaf">'), (t = Math.min(t, this.maximum.rows)), (e = Math.min(e, this.maximum.columns));
                    for (var i = 0, s = 0; s < t; s++) {
                        n += "<tr>";
                        for (var r = 0; r < e; r++) (n += "<td>&" + i + "</td>"), i++;
                        n += "</tr>";
                    }
                    return (n += "</table>"), (n += o(this.parentheses.right) + "</span>");
                    function o(t) {
                        return t ? '<span class="mq-paren mq-scaled">' + t + "</span>" : "";
                    }
                }),
                (t.htmlTemplate = t.generateHtmlTemplate(1, 1)),
                (t.parser = function () {
                    var t = W.regex,
                        e = this,
                        i = this.getMatrixName(),
                        s = RegExp("^(.*)\\\\end{" + i + "}"),
                        o = RegExp("\\\\end{" + i + "}");
                    return t(s).then(function (t) {
                        var i,
                            s = [],
                            a = t.replace(o, "").split(r),
                            l = Math.min(a.length, e.maximum.rows),
                            c = 0;
                        for (u = 0; u < l; u++) c = Math.max(c, (i = a[u].split("&")).length);
                        for (c = Math.min(c, e.maximum.columns), u = 0; u < l; u++)
                            for (t = 0, i = a[u].split("&"); t < c; t++) {
                                var h = n(t, u);
                                J.parse(i[t] || " ")
                                    .children()
                                    .adopt(h, h.ends[b], 0),
                                    s.push(h);
                            }
                        (e.htmlTemplate = e.generateHtmlTemplate(l, c)), (e.blocks = s);
                        for (var u = 0; u < s.length; u += 1) s[u].adopt(e, e.ends[b], 0);
                        return W.succeed(e);
                    });
                }),
                (t.finalizeTree = function () {
                    var t = this.jQ.find("table");
                    t.length &&
                        (this.relink(),
                        t.removeClass(function (t, e) {
                            return ((e = e.match(/mq-rows-\d+/g)) && e.join(" ")) || "";
                        }),
                        t.addClass("mq-rows-" + t.find("tr").length));
                }),
                (t.relink = function () {
                    var t = this.jQ.find("td"),
                        e = y.byId[t.first().attr(i)],
                        n = y.byId[t.last().attr(i)],
                        s = t.eq(0).closest("tr"),
                        r = [];
                    t.each(function (e) {
                        var n = y.byId[x(this).attr(i)],
                            o = t.eq(e + 1),
                            a = x(this).closest("tr").next("tr"),
                            l = x(this).closest("tr").index(),
                            e = x(this).index();
                        o.length && ((o = y.byId[o.attr(i)]), ((n[b] = o)[v] = n)), (a = a.length ? a.find("td").eq(e) : s.find("td").eq(e + 1)).length && ((a = y.byId[a.attr(i)]), ((n.downOutOf = a).upOutOf = n)), (n.column = e), (n.row = l), r.push(n);
                    }),
                        (this.ends[v] = e),
                        (this.ends[b] = n),
                        e && e[v] && delete e[v],
                        n && n[b] && delete n[b],
                        (this.blocks = r);
                }),
                (t.deleteCell = function (t) {
                    var e,
                        n = t.jQ.closest("tr"),
                        s = t.jQ.index(),
                        r = n.index(),
                        o = n.find("td").not(t.jQ),
                        a = this.jQ
                            .find("tr")
                            .not(n)
                            .map(function () {
                                return x(this).find("td")[s];
                            }),
                        l = 1 === this.jQ.find("td").length;
                    function c() {
                        return y.byId[x(this).attr(i)].isEmpty();
                    }
                    return o.filter(c).length === o.length && a.length && (o.remove(), t.jQ.remove(), n.remove(), this.finalizeTree()), a.filter(c).length === a.length && o.length && (a.remove(), t.jQ.remove(), this.finalizeTree()), l || ((r = Math.min(r, this.jQ.find("tr").length - 1)), (s = Math.min(s, this.jQ.find("tr").eq(r).find("td").length - 1)), (e = y.byId[this.jQ.find("tr").eq(r).find("td").eq(s).attr(i)])), e;
                }),
                (t.addRow = function (t) {
                    if (!(this.jQ.find("tr").length >= this.maximum.rows)) {
                        for (var e, s, r = t.find("td").length, o = x("<tr></tr>"), a = 0; a < r; a++) ((e = n()).parent = this), (e.jQ = x('<td class="mq-empty">').attr(i, e.id)), o.append(e.jQ), (s = s || e);
                        return o.insertAfter(t), s;
                    }
                }),
                (t.addColumn = function (t) {
                    if (!(t.closest("tr").find("td").length >= this.maximum.columns)) {
                        var e,
                            s = t.index(),
                            t = t.closest("tr").index(),
                            r = this,
                            o = [];
                        return (
                            this.jQ.find("tr").each(function () {
                                ((e = n()).parent = r), (e.jQ = x('<td class="mq-empty">').attr(i, e.id)), e.jQ.insertAfter(x(this).find("td").eq(s)), o.push(e);
                            }),
                            o[t]
                        );
                    }
                }),
                (t.insertColumn = function (t) {
                    (newBlock = this.addColumn(t.jQ)) && ((this.cursor = this.cursor || this.parent.cursor), this.finalizeTree(), this.bubble("redraw").cursor.insAtRightEnd(newBlock));
                }),
                (t.insertRow = function (t) {
                    (newBlock = this.addRow(t.jQ.closest("tr"))) && ((this.cursor = this.cursor || this.parent.cursor), this.finalizeTree(), this.bubble("redraw").cursor.insAtRightEnd(newBlock), this.bubble("edited"));
                }),
                (t.backspace = function (t, e, n, i) {
                    t.isEmpty() && ((t = this.deleteCell(t)) ? n.insAtRightEnd(t) : (i(), this.finalizeTree()), this.bubble("edited"));
                });
        }));
    (C.pmatrix = m(tw, function (t, e) {
        (t.ctrlSeq = "\\pmatrix"), (t.parentheses = { left: "(", right: ")" });
    })),
        (C.bmatrix = m(tw, function (t, e) {
            (t.ctrlSeq = "\\bmatrix"), (t.parentheses = { left: "[", right: "]" });
        })),
        (C.Bmatrix = m(tw, function (t, e) {
            (t.ctrlSeq = "\\Bmatrix"), (t.parentheses = { left: "{", right: "}" });
        })),
        (C.vmatrix = m(tw, function (t, e) {
            (t.ctrlSeq = "\\vmatrix"), (t.parentheses = { left: "|", right: "|" });
        })),
        (C.Vmatrix = m(tw, function (t, e) {
            (t.ctrlSeq = "\\Vmatrix"), (t.parentheses = { left: "‖", right: "‖" });
        })),
        (tx = m(tn, function (t, e) {
            (t.init = function (t, e) {
                (e = '<span class="mq-large-operator mq-non-leaf">' + e + '<span style="display: inline-flex; flex-direction: column; margin-left:-5px; top:-2px; margin-right: -7px; position:absolute;"><span style="display: inline-flex; margin-left:6px"><small>&1</small></span><span style="display: inline-flex; height: 1.8em;"></span><span style=" display: inline-flex; margin-left:-6px"><small>&0</small></span></span></span>'), ti.prototype.init.call(this, t, e);
            }),
                (t.latex = function () {
                    function t(t) {
                        return 1 === t.length ? t : "{" + (t || "") + "}";
                    }
                    return this.ctrlSeq + "_" + t(this.ends[v].latex()) + "^" + t(this.ends[b].latex());
                }),
                (t.parser = function () {
                    for (var t = W.string, e = W.optWhitespace, n = W.succeed, i = J.block, s = this, r = (s.blocks = [to(), to()]), o = 0; o < r.length; o += 1) r[o].adopt(s, s.ends[b], 0);
                    return e
                        .then(t("_").or(t("^")))
                        .then(function (t) {
                            var e = r["_" === t ? 0 : 1];
                            return i.then(function (t) {
                                return t.children().adopt(e, e.ends[b], 0), n(s);
                            });
                        })
                        .many()
                        .result(s);
                }),
                (t.finalizeTree = function () {
                    (this.downInto = this.ends[v]), (this.upInto = this.ends[b]), (this.ends[v].upOutOf = this.ends[b]), (this.ends[b].downOutOf = this.ends[v]);
                });
        })),
        (te = m(tn, function (t, e) {
            (t.init = function (t, e) {
                ti.prototype.init.call(this, t, "<big>&0</big>");
            }),
                (t.latex = function () {
                    var t;
                    return this.ctrlSeq + (1 === (t = this.ends[v].latex()).length ? t : t || "	");
                }),
                (t.parser = function () {
                    for (var t = W.string, e = W.optWhitespace, n = W.succeed, i = J.block, s = this, r = (s.blocks = [to(), to()]), o = 0; o < r.length; o += 1) r[o].adopt(s, s.ends[b], 0);
                    return e
                        .then(t("_").or(t("^")))
                        .then(function (t) {
                            var e = r["_" === t ? 0 : 1];
                            return i.then(function (t) {
                                return t.children().adopt(e, e.ends[b], 0), n(s);
                            });
                        })
                        .many()
                        .result(s);
                }),
                (t.finalizeTree = function () {
                    (this.downInto = this.ends[v]), (this.upInto = this.ends[b]), (this.ends[v].upOutOf = this.ends[b]), (this.ends[b].downOutOf = this.ends[v]);
                });
        })),
        m(tn, function (t, e) {
            (t.init = function (t, e) {
                ti.prototype.init.call(this, t, '<span class="mq-non-leaf" style="0.2em; margin-right:0.2em;"><span class="integral-fix"><span class="integral-fix"><small>&1</small></span></span><svg style="height:1em; width:auto;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 500"><rect x="6" y="0" width="15" height="500"/></svg><span class="integral-fix"><span class="integral-fix" style = ""><small>&0</small></span></span></span>');
            }),
                (t.latex = function () {
                    function t(t) {
                        return 1 === t.length ? t : "{" + (t || "") + "}";
                    }
                    return "\\rvert_" + t(this.ends[v].latex()) + "^" + t(this.ends[b].latex());
                }),
                (t.parser = function () {
                    for (var t = W.string, e = W.optWhitespace, n = W.succeed, i = J.block, s = this, r = (s.blocks = [to(), to()]), o = 0; o < r.length; o += 1) r[o].adopt(s, s.ends[b], 0);
                    return e
                        .then(t("_").or(t("^")))
                        .then(function (t) {
                            var e = r["_" === t ? 0 : 1];
                            return i.then(function (t) {
                                return t.children().adopt(e, e.ends[b], 0), n(s);
                            });
                        })
                        .many()
                        .result(s);
                }),
                (t.finalizeTree = function () {
                    (this.downInto = this.ends[v]), (this.upInto = this.ends[b]), (this.ends[v].upOutOf = this.ends[b]), (this.ends[b].downOutOf = this.ends[v]);
                });
        }),
        (tw = m(tn, function (t, e) {
            (t.init = function (t, e) {
                (e = '<span class="mq-large-operator mq-non-leaf"><span style = "margin-bottom: 0px; margin-right:0px !important; margin-bottom: -5px;">' + e + '</span><div class="mq-from" style = "margin-top: -6px !important;"><small>&0</small></div></span>'), ti.prototype.init.call(this, t, e);
            }),
                (t.latex = function () {
                    var t;
                    return this.ctrlSeq + "_" + (1 === (t = this.ends[v].latex()).length ? t : "{" + (t || " ") + "}");
                }),
                (t.parser = function () {
                    for (var t = W.string, e = W.optWhitespace, n = W.succeed, i = J.block, s = this, r = (s.blocks = [to(), to()]), o = 0; o < r.length; o += 1) r[o].adopt(s, s.ends[b], 0);
                    return e
                        .then(t("_").or(t("^")))
                        .then(function (t) {
                            var e = r["_" === t ? 0 : 1];
                            return i.then(function (t) {
                                return t.children().adopt(e, e.ends[b], 0), n(s);
                            });
                        })
                        .many()
                        .result(s);
                }),
                (t.finalizeTree = function () {
                    (this.downInto = this.ends[v]), (this.upInto = this.ends[b]), (this.ends[v].upOutOf = this.ends[b]), (this.ends[b].downOutOf = this.ends[v]);
                });
        })),
        (C[""] = C.lim = C.limit = u(tw, "\\lim ", "lim")),
        (C[""] = C.biggr = C.biggr = u(te, "\\biggr ", "biggr")),
        (C[""] = C.oint = C.integral = u(tx, "\\oint ", '<svg viewBox="150.298 2.401 199.404 495.199" width="auto" height="3em"> <defs> <mask id="cutout"> <rect width="1366" height="663" fill="white" x="149.872" y="-0.577"></rect> <circle cx="258.385" cy="245.297" r="50" fill="black"></circle> </mask> </defs> <ellipse style="stroke: rgba(0, 0, 0, 0.19); stroke-width: 0.2px;" cx="338.406" cy="23.068" rx="11.161" ry="11.161"></ellipse> <path style="stroke-width: 0.2px; stroke: rgba(0, 0, 0, 0);" d="M 349.637 22.492 C 349.637 22.492 350.045 23.208 348.811 17.043 C 347.577 10.877 339.427 5.888 335.294 4.264 C 331.162 2.64 322.638 0.018 313.148 6.971 C 303.659 13.925 294.087 38.377 294.236 38.347 C 293.635 38.166 283.703 69.978 269.725 129.149 C 255.748 188.321 242.07 255.731 242.291 255.731 C 242.291 255.731 243.841 247.109 237.008 283.295 C 230.175 319.48 228.404 331.628 217.523 392.36 C 206.642 453.091 194.687 491.277 177.752 493.132 C 160.818 494.987 152.05 473.915 152.05 473.915 L 150.939 473.318 C 150.939 473.318 147.186 487.652 164.421 495.161 C 181.656 502.67 193.858 490.639 197.014 488.506 C 200.17 486.373 215.116 470.09 228.073 419.772 C 241.03 369.454 248.237 337.297 248.237 337.297 C 248.237 337.297 257.655 301.322 268.814 240.035 C 279.973 178.747 288.742 127.196 298.494 77.917 C 308.246 28.637 317.606 12.826 319.274 11.49 C 320.943 10.155 321.61 7.154 327.059 7.042 C 332.508 6.93 339.514 12.269 339.514 12.269 L 349.637 22.492 Z"></path> <ellipse style="stroke: rgba(0, 0, 0, 0);" cx="161.593" cy="477.067" rx="11.295" ry="11.295"></ellipse> <circle cx="258.385" cy="245.297" r="56.564" style="mask: url(#cutout);"></circle> </svg>')),
        (C[""] = C.int = C.integral = u(tx, "\\int ", '<svg style="height: 3em; width:auto;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205 500"> <ellipse style="stroke: rgba(0, 0, 0, 0.19); stroke-width: 0.2px;" cx="189.794" cy="23.362" rx="11.161" ry="11.161"/> <path style="stroke-width: 0.2px; stroke: rgba(0, 0, 0, 0);" d="M 201.025 22.786 C 201.025 22.786 201.433 23.502 200.199 17.337 C 198.965 11.171 190.815 6.182 186.682 4.558 C 182.55 2.934 174.026 0.312 164.536 7.265 C 155.047 14.219 145.475 38.671 145.624 38.641 C 145.023 38.46 135.091 70.272 121.113 129.443 C 107.136 188.615 93.458 256.025 93.679 256.025 C 93.679 256.025 95.229 247.403 88.396 283.589 C 81.563 319.774 79.792 331.922 68.911 392.654 C 58.03 453.385 46.075 491.571 29.14 493.426 C 12.206 495.281 3.438 474.209 3.438 474.209 L 2.327 473.612 C 2.327 473.612 -1.426 487.946 15.809 495.455 C 33.044 502.964 45.246 490.933 48.402 488.8 C 51.558 486.667 66.504 470.384 79.461 420.066 C 92.418 369.748 99.625 337.591 99.625 337.591 C 99.625 337.591 109.043 301.616 120.202 240.329 C 131.361 179.041 140.13 127.49 149.882 78.211 C 159.634 28.931 168.994 13.12 170.662 11.784 C 172.331 10.449 172.998 7.448 178.447 7.336 C 183.896 7.224 190.902 12.563 190.902 12.563 L 201.025 22.786 Z"/> <ellipse style="stroke: rgba(0, 0, 0, 0);" cx="12.981" cy="477.361" rx="11.295" ry="11.295"/> </svg>')),
        (C["∑"] = C.sum = C.summation = u(tC, "\\sum ", '<svg viewBox="1.002 0.505 118.375 120.422" width="118.375" height="120.422"> <path  d="M 15.734 114.783 L 87.838 114.783 C 107.703 114.374 118.558 95.122 118.558 95.122 C 118.558 95.122 109.342 120.313 109.342 120.927 L 4.713 120.927 L 50.359 66.45 L 1.002 0.505 L 109.814 0.505 L 119.377 23.442 C 119.377 23.442 112.004 3.577 67.153 4.396 L 18.542 4.396 C 18.542 4.396 60.19 60.921 60.395 60.921 C 60.6 60.921 15.543 114.783 15.543 114.783"> </path> </svg>')),
        (C["∏"] = C.prod = C.product = u(tC, "\\prod ", "&prod;")),
        (C.coprod = C.coproduct = u(tC, "\\coprod ", "&#8720;"));
    var tx =
            (C.frac =
            C.dfrac =
            C.cfrac =
            C.fraction =
                m(tn, function (t, e) {
                    (t.ctrlSeq = "\\frac"),
                        (t.htmlTemplate = '<span class="mq-fraction mq-non-leaf"><span class="mq-numerator">&0</span><span class="mq-denominator">&1</span><span style="display:inline-block;width:0">&#8203;</span></span>'),
                        (t.textTemplate = ["(", ")/(", ")"]),
                        (t.finalizeTree = function () {
                            (this.upInto = this.ends[b].upOutOf = this.ends[v]), (this.downInto = this.ends[v].downOutOf = this.ends[b]);
                        });
                })),
        t5 =
            (C.over =
            j["/"] =
                m(tx, function (t, e) {
                    t.createLeftOf = function (t) {
                        if (!this.replacedFragment) {
                            for (var n = t[v]; n && !(n instanceof tr || n instanceof (C.text || o) || n instanceof tC || "\\ " === n.ctrlSeq || /^[,;:]$/.test(n.ctrlSeq)); ) n = n[v];
                            n instanceof tC && n[b] instanceof t7 && (n = n[b])[b] instanceof t7 && n[b].ctrlSeq != n.ctrlSeq && (n = n[b]), n !== t[v] && (this.replaces(k(n[b] || t.parent.ends[v], t[v])), (t[v] = n));
                        }
                        e.createLeftOf.call(this, t);
                    };
                })),
        tx =
            (C.sqrt =
            C["√"] =
                m(tn, function (t, e) {
                    (t.ctrlSeq = "\\sqrt"),
                        (t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-scaled mq-sqrt-prefix">&radic;</span><span class="mq-non-leaf mq-sqrt-stem">&0</span></span>'),
                        (t.textTemplate = ["sqrt(", ")"]),
                        (t.parser = function () {
                            return J.optBlock
                                .then(function (t) {
                                    return J.block.map(function (e) {
                                        var n = t3();
                                        return (n.blocks = [t, e]), t.adopt(n, 0, 0), e.adopt(n, t, 0), n;
                                    });
                                })
                                .or(e.parser.call(this));
                        }),
                        (t.reflow = function () {
                            var t = this.ends[b].jQ;
                            t6(t.prev(), 1, t.innerHeight() / +t.css("fontSize").slice(0, -2) - 0.1);
                        });
                })),
        t3 =
            ((C.vec = m(tn, function (t, e) {
                (t.ctrlSeq = "\\vec"), (t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-vector-prefix">&rarr;</span><span class="mq-vector-stem">&0</span></span>'), (t.textTemplate = ["vec(", ")"]);
            })),
            (C.nthroot = m(tx, function (t, e) {
                (t.htmlTemplate = '<sup class="mq-nthroot mq-non-leaf">&0</sup><span class="mq-scaled"><span class="mq-sqrt-prefix mq-scaled">&radic;</span><span class="mq-sqrt-stem mq-non-leaf">&1</span></span>'),
                    (t.textTemplate = ["sqrt[", "](", ")"]),
                    (t.latex = function () {
                        return "\\sqrt[" + this.ends[v].latex() + "]{" + this.ends[b].latex() + "}";
                    });
            })));
    function tj(t, e) {
        (t.jQadd = function () {
            e.jQadd.apply(this, arguments), (this.delimjQs = this.jQ.children(":first").add(this.jQ.children(":last"))), (this.contentjQ = this.jQ.children(":eq(1)"));
        }),
            (t.reflow = function () {
                var t = this.contentjQ.outerHeight() / parseFloat(this.contentjQ.css("fontSize"));
                t6(this.delimjQs, s(1 + 0.2 * (t - 1), 1.2), 1.2 * t);
            });
    }
    C.hat = m(tx, function (t, e) {
        (t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-vector-prefix"><svg viewBox="0 0.5 300 100" style="width="auto"; height="0.2em"; line-height: ;> <path style="stroke: rgba(0, 0, 0, 0);" d="M 0 135 L 145 0.6 L 300 127.516 L 145 30 L 0 135 Z"></path> </svg></span><span class="mq-vector-stem" style="margin-top:-2px">&0</span></span>'),
            (t.textTemplate = ["hat(", ")"]),
            (t.latex = function () {
                return "\\hat{" + this.ends[b].latex() + "}";
            });
    });
    var tQ = m(m(tn, tj), function (e, n) {
            (e.init = function (e, i, s, r, o) {
                n.init.call(this, "\\left" + r, t, [i, s]), (this.side = e), (this.sides = {}), (this.sides[v] = { ch: i, ctrlSeq: r }), (this.sides[b] = { ch: s, ctrlSeq: o });
            }),
                (e.numBlocks = function () {
                    return 1;
                }),
                (e.html = function () {
                    return (this.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-scaled mq-paren' + (this.side === b ? " mq-ghost" : "") + '">' + this.sides[v].ch + '</span><span class="mq-non-leaf">&0</span><span class="mq-scaled mq-paren' + (this.side === v ? " mq-ghost" : "") + '">' + this.sides[b].ch + "</span></span>"), n.html.call(this);
                }),
                (e.latex = function () {
                    return "\\left" + this.sides[v].ctrlSeq + this.ends[v].latex() + "\\right" + this.sides[b].ctrlSeq;
                }),
                (e.oppBrack = function (t, e, n) {
                    return e instanceof tQ && e.side && e.side !== -n && ("|" === this.sides[this.side].ch || e.side === -this.side) && (!t.restrictMismatchedBrackets || t4[this.sides[this.side].ch] === e.sides[e.side].ch || { "(": "]", "[": ")" }[this.sides[v].ch] === e.sides[b].ch) && e;
                }),
                (e.closeOpposing = function (t) {
                    (t.side = 0),
                        (t.sides[this.side] = this.sides[this.side]),
                        t.delimjQs
                            .eq(this.side === v ? 0 : 1)
                            .removeClass("mq-ghost")
                            .html(this.sides[this.side].ch);
                }),
                (e.createLeftOf = function (t) {
                    var e, i;
                    this.replacedFragment || ((e = t.options), (e = this.oppBrack(e, t[v], v) || this.oppBrack(e, t[b], b) || this.oppBrack(e, t.parent.parent))), e ? ((i = this.side = -e.side), this.closeOpposing(e), e === t.parent.parent && t[i] && (k(t[i], t.parent.ends[i], -i).disown().withDirAdopt(-i, e.parent, e, e[i]).jQ.insDirOf(i, e.jQ), e.bubble("reflow"))) : ((i = (e = this).side), e.replacedFragment ? (e.side = 0) : t[-i] && (e.replaces(k(t[-i], t.parent.ends[-i], i)), (t[-i] = 0)), n.createLeftOf.call(e, t)), i === v ? t.insAtLeftEnd(e.ends[v]) : t.insRightOf(e);
                }),
                (e.placeCursor = o),
                (e.unwrap = function () {
                    this.ends[v].children().disown().adopt(this.parent, this, this[b]).jQ.insertAfter(this.jQ), this.remove();
                }),
                (e.deleteSide = function (t, e, n) {
                    var i = this.parent,
                        s = this[t],
                        r = i.ends[t];
                    if (t === this.side) return this.unwrap(), void (s ? n.insDirOf(-t, s) : n.insAtDirEnd(t, i));
                    var o = n.options,
                        a = !this.side;
                    if (((this.side = -t), this.oppBrack(o, this.ends[v].ends[this.side], t))) {
                        this.closeOpposing(this.ends[v].ends[this.side]);
                        var l = this.ends[v].ends[t];
                        this.unwrap(), l.siblingCreated && l.siblingCreated(n.options, t), s ? n.insDirOf(-t, s) : n.insAtDirEnd(t, i);
                    } else {
                        if (this.oppBrack(o, this.parent.parent, t)) this.parent.parent.closeOpposing(this), this.parent.parent.unwrap();
                        else {
                            if (e && a) return this.unwrap(), void (s ? n.insDirOf(-t, s) : n.insAtDirEnd(t, i));
                            (this.sides[t] = { ch: t4[this.sides[this.side].ch], ctrlSeq: t4[this.sides[this.side].ctrlSeq] }),
                                this.delimjQs
                                    .removeClass("mq-ghost")
                                    .eq(t === v ? 0 : 1)
                                    .addClass("mq-ghost")
                                    .html(this.sides[t].ch);
                        }
                        s ? ((l = this.ends[v].ends[t]), k(s, r, -t).disown().withDirAdopt(-t, this.ends[v], l, 0).jQ.insAtDirEnd(t, this.ends[v].jQ.removeClass("mq-empty")), l.siblingCreated && l.siblingCreated(n.options, t), n.insDirOf(-t, s)) : e ? n.insDirOf(t, this) : n.insAtDirEnd(t, this.ends[v]);
                    }
                }),
                (e.deleteTowards = function (t, e) {
                    this.deleteSide(-t, !1, e);
                }),
                (e.finalizeTree = function () {
                    (this.ends[v].deleteOutOf = function (t, e) {
                        this.parent.deleteSide(t, !0, e);
                    }),
                        (this.finalizeTree = this.intentionalBlur =
                            function () {
                                this.delimjQs.eq(this.side === v ? 1 : 0).removeClass("mq-ghost"), (this.side = 0);
                            });
                }),
                (e.siblingCreated = function (t, e) {
                    e === -this.side && this.finalizeTree();
                });
        }),
        t4 = { "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{", "\\{": "\\}", "\\}": "\\{", "&lang;": "&rang;", "&rang;": "&lang;", "\\langle ": "\\rangle ", "\\rangle ": "\\langle ", "|": "|" };
    function tT(t, e) {
        var e = e || t,
            n = t4[t],
            i = t4[e];
        (j[t] = u(tQ, v, t, n, e, i)), (j[n] = u(tQ, b, t, n, e, i));
    }
    tT("("),
        tT("["),
        tT("{", "\\{"),
        (C.langle = u(tQ, v, "&lang;", "&rang;", "\\langle ", "\\rangle ")),
        (C.rangle = u(tQ, b, "&lang;", "&rang;", "\\langle ", "\\rangle ")),
        (j["|"] = u(tQ, v, "|", "|", "|", "|")),
        (C.left = m(tn, function (t) {
            t.parser = function () {
                var t = W.regex,
                    e = W.string,
                    n = (W.succeed, W.optWhitespace);
                return n.then(t(/^(?:[([|]|\\\{)/)).then(function (i) {
                    var s = "\\" === i.charAt(0) ? i.slice(1) : i;
                    return J.then(function (r) {
                        return e("\\right")
                            .skip(n)
                            .then(t(/^(?:[\])|]|\\\})/))
                            .map(function (t) {
                                var e = "\\" === t.charAt(0) ? t.slice(1) : t,
                                    t = tQ(0, s, e, i, t);
                                return (t.blocks = [r]), r.adopt(t, 0, 0), t;
                            });
                    });
                });
            };
        })),
        (C.right = m(tn, function (t) {
            t.parser = function () {
                return W.fail("unmatched \\right");
            };
        })),
        (tx =
            C.binom =
            C.binomial =
                m(m(tn, tj), function (t, e) {
                    (t.ctrlSeq = "\\binom"), (t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-paren mq-scaled">(</span><span class="mq-non-leaf"><span class="mq-array mq-non-leaf"><span>&0</span><span>&1</span></span></span><span class="mq-paren mq-scaled">)</span></span>'), (t.textTemplate = ["choose(", ",", ")"]);
                })),
        (C.choose = m(tx, function (t) {
            t.createLeftOf = t5.prototype.createLeftOf;
        })),
        (C.editable = C.MathQuillMathField =
            m(tn, function (t, e) {
                (t.ctrlSeq = "\\MathQuillMathField"),
                    (t.htmlTemplate = '<span class="mq-editable-field"><span class="mq-root-block">&0</span></span>'),
                    (t.parser = function () {
                        var t = this,
                            n = W.string,
                            i = W.regex,
                            s = W.succeed;
                        return n("[")
                            .then(i(/^[a-z][a-z0-9]*/i))
                            .skip(n("]"))
                            .map(function (e) {
                                t.name = e;
                            })
                            .or(s())
                            .then(e.parser.call(t));
                    }),
                    (t.finalizeTree = function () {
                        var t = S(this.ends[v], this.jQ, L());
                        (t.KIND_OF_MQ = "MathField"), (t.editable = !0), t.createTextarea(), t.editablesTextareaEvents(), t.cursor.insAtRightEnd(t.root), P(t.root);
                    }),
                    (t.registerInnerField = function (t, e) {
                        t.push((t[this.name] = e(this.ends[v].controller)));
                    }),
                    (t.latex = function () {
                        return this.ends[v].latex();
                    }),
                    (t.text = function () {
                        return this.ends[v].text();
                    });
            }));
    var t8,
        tS = (C.embed = m(ti, function (t, e) {
            (t.setOptions = function (t) {
                function e() {
                    return "";
                }
                return (this.text = t.text || e), (this.htmlTemplate = t.htmlString || ""), (this.latex = t.latex || e), this;
            }),
                (t.parser = function () {
                    var t = this;
                    return (
                        (string = W.string),
                        (regex = W.regex),
                        (succeed = W.succeed),
                        string("{")
                            .then(regex(/^[a-z][a-z0-9]*/i))
                            .skip(string("}"))
                            .then(function (e) {
                                return string("[")
                                    .then(regex(/^[-\w\s]*/))
                                    .skip(string("]"))
                                    .or(succeed())
                                    .map(function (n) {
                                        return t.setOptions(I[e](n));
                                    });
                            })
                    );
                });
        })),
        tD = F(1);
    for (t8 in tD)
        !(function (t, e) {
            "function" == typeof e
                ? ((z[t] = function () {
                      return R(), e.apply(this, arguments);
                  }).prototype = e.prototype)
                : (z[t] = e);
        })(t8, tD[t8]);
})();
