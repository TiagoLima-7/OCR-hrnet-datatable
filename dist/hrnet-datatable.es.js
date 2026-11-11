import ne, { useState as q, useMemo as Q } from "react";
var J = { exports: {} }, F = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var K;
function ae() {
  if (K) return F;
  K = 1;
  var m = Symbol.for("react.transitional.element"), d = Symbol.for("react.fragment");
  function _(g, i, s) {
    var h = null;
    if (s !== void 0 && (h = "" + s), i.key !== void 0 && (h = "" + i.key), "key" in i) {
      s = {};
      for (var b in i)
        b !== "key" && (s[b] = i[b]);
    } else s = i;
    return i = s.ref, {
      $$typeof: m,
      type: g,
      key: h,
      ref: i !== void 0 ? i : null,
      props: s
    };
  }
  return F.Fragment = d, F.jsx = _, F.jsxs = _, F;
}
var z = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ee;
function se() {
  return ee || (ee = 1, process.env.NODE_ENV !== "production" && (function() {
    function m(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === W ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case O:
          return "Fragment";
        case r:
          return "Profiler";
        case S:
          return "StrictMode";
        case p:
          return "Suspense";
        case v:
          return "SuspenseList";
        case G:
          return "Activity";
        case D:
          return "ViewTransition";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case I:
            return "Portal";
          case E:
            return e.displayName || "Context";
          case o:
            return (e._context.displayName || "Context") + ".Consumer";
          case T:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case N:
            return t = e.displayName || null, t !== null ? t : m(e.type) || "Memo";
          case f:
            t = e._payload, e = e._init;
            try {
              return m(e(t));
            } catch {
            }
        }
      return null;
    }
    function d(e) {
      return "" + e;
    }
    function _(e) {
      try {
        d(e);
        var t = !1;
      } catch {
        t = !0;
      }
      if (t) {
        t = console;
        var a = t.error, l = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a.call(
          t,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          l
        ), d(e);
      }
    }
    function g(e) {
      if (e === O) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === f)
        return "<...>";
      try {
        var t = m(e);
        return t ? "<" + t + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function i() {
      var e = y.A;
      return e === null ? null : e.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function h(e) {
      if (P.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function b(e, t) {
      function a() {
        U || (U = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          t
        ));
      }
      a.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: a,
        configurable: !0
      });
    }
    function u() {
      var e = m(this.type);
      return V[e] || (V[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function A(e, t, a, l, w, j) {
      var c = a.ref;
      return e = {
        $$typeof: R,
        type: e,
        key: t,
        props: a,
        _owner: l
      }, (c !== void 0 ? c : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: u
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: w
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: j
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function C(e, t, a, l, w, j) {
      var c = t.children;
      if (c !== void 0)
        if (l)
          if (L(c)) {
            for (l = 0; l < c.length; l++)
              $(c[l]);
            Object.freeze && Object.freeze(c);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else $(c);
      if (P.call(t, "key")) {
        c = m(e);
        var Y = Object.keys(t).filter(function(te) {
          return te !== "key";
        });
        l = 0 < Y.length ? "{key: someKey, " + Y.join(": ..., ") + ": ...}" : "{key: someKey}", Z[c + l] || (Y = 0 < Y.length ? "{" + Y.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          l,
          c,
          Y,
          c
        ), Z[c + l] = !0);
      }
      if (c = null, a !== void 0 && (_(a), c = "" + a), h(t) && (_(t.key), c = "" + t.key), "key" in t) {
        a = {};
        for (var X in t)
          X !== "key" && (a[X] = t[X]);
      } else a = t;
      return c && b(
        a,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), A(
        e,
        c,
        a,
        i(),
        w,
        j
      );
    }
    function $(e) {
      x(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e !== null && e.$$typeof === f && (e._payload.status === "fulfilled" ? x(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
    }
    function x(e) {
      return typeof e == "object" && e !== null && e.$$typeof === R;
    }
    var k = ne, R = Symbol.for("react.transitional.element"), I = Symbol.for("react.portal"), O = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), E = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), N = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), G = Symbol.for("react.activity"), D = Symbol.for("react.view_transition"), W = Symbol.for("react.client.reference"), y = k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = Object.prototype.hasOwnProperty, L = Array.isArray, M = console.createTask ? console.createTask : function() {
      return null;
    };
    k = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var U, V = {}, B = k.react_stack_bottom_frame.bind(
      k,
      s
    )(), H = M(g(s)), Z = {};
    z.Fragment = O, z.jsx = function(e, t, a) {
      var l = 1e4 > y.recentlyCreatedOwnerStacks++;
      if (l) {
        var w = Error.stackTraceLimit;
        Error.stackTraceLimit = 10;
        var j = Error("react-stack-top-frame");
        Error.stackTraceLimit = w;
      } else j = B;
      return C(
        e,
        t,
        a,
        !1,
        j,
        l ? M(g(e)) : H
      );
    }, z.jsxs = function(e, t, a) {
      var l = 1e4 > y.recentlyCreatedOwnerStacks++;
      if (l) {
        var w = Error.stackTraceLimit;
        Error.stackTraceLimit = 10;
        var j = Error("react-stack-top-frame");
        Error.stackTraceLimit = w;
      } else j = B;
      return C(
        e,
        t,
        a,
        !0,
        j,
        l ? M(g(e)) : H
      );
    };
  })()), z;
}
var re;
function oe() {
  return re || (re = 1, process.env.NODE_ENV === "production" ? J.exports = ae() : J.exports = se()), J.exports;
}
var n = oe();
function ie(m, d) {
  const [_, g] = q(""), [i, s] = q([]), [h, b] = q(1), [u, A] = q(10);
  function C(p) {
    g(p), b(1);
  }
  function $(p) {
    s((v) => {
      const N = v.find((f) => f.key === p);
      return N ? N.direction === "asc" ? v.map(
        (f) => f.key === p ? { ...f, direction: "desc" } : f
      ) : v.filter((f) => f.key !== p) : [...v, { key: p, direction: "asc" }];
    }), b(1);
  }
  function x() {
    s([]), b(1);
  }
  function k(p) {
    A(p), b(1);
  }
  const R = Q(() => {
    if (!_.trim()) return m;
    const p = _.toLowerCase();
    return m.filter(
      (v) => d.some(
        (N) => String(v[N.key] ?? "").toLowerCase().includes(p)
      )
    );
  }, [m, _, d]), I = Q(() => {
    if (i.length === 0) return R;
    const p = Object.fromEntries(
      d.map((v) => [v.key, v.type ?? "string"])
    );
    return [...R].sort((v, N) => {
      for (const { key: f, direction: G } of i) {
        const D = v[f] ?? "", W = N[f] ?? "";
        let y;
        if (p[f] === "date") {
          const P = (L) => {
            const [M, U, V] = String(L).split("/");
            return new Date(Number(V), Number(M) - 1, Number(U)).getTime();
          };
          y = P(D) - P(W);
        } else {
          const P = String(D).toLowerCase(), L = String(W).toLowerCase();
          y = P < L ? -1 : P > L ? 1 : 0;
        }
        if (y !== 0) return G === "asc" ? y : -y;
      }
      return 0;
    });
  }, [R, i, d]), O = m.length, S = I.length, r = Math.max(1, Math.ceil(S / u)), o = S === 0 ? 0 : (h - 1) * u + 1, E = Math.min(h * u, S);
  return {
    sorted: I.slice(
      (h - 1) * u,
      h * u
    ),
    totalEntries: O,
    totalFiltered: S,
    totalPages: r,
    startEntry: o,
    endEntry: E,
    search: _,
    setSearch: C,
    sorts: i,
    handleSort: $,
    clearSorts: x,
    currentPage: h,
    setCurrentPage: b,
    pageSize: u,
    handlePageSize: k
  };
}
function ce({ data: m = [], columns: d = [] }) {
  const {
    search: _,
    setSearch: g,
    sorted: i,
    sorts: s,
    handleSort: h,
    clearSorts: b,
    currentPage: u,
    setCurrentPage: A,
    pageSize: C,
    handlePageSize: $,
    totalPages: x,
    totalFiltered: k,
    totalEntries: R,
    startEntry: I,
    endEntry: O
  } = ie(m, d), S = () => {
    if (x <= 7)
      return Array.from({ length: x }, (o, E) => E + 1);
    const r = [1];
    u > 3 && r.push("...");
    for (let o = Math.max(2, u - 1); o <= Math.min(x - 1, u + 1); o++)
      r.push(o);
    return u < x - 2 && r.push("..."), r.push(x), r;
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "global-container", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "datatable-controls", children: [
      /* @__PURE__ */ n.jsxs("div", { className: "page-size-control", children: [
        /* @__PURE__ */ n.jsx("label", { htmlFor: "page-size", children: "Show" }),
        " ",
        /* @__PURE__ */ n.jsx(
          "select",
          {
            "data-testid": "select-page-size",
            id: "page-size",
            value: C,
            onChange: (r) => $(r.target.value),
            children: [10, 25, 50, 100].map((r) => /* @__PURE__ */ n.jsx("option", { value: r, children: r }, r))
          }
        ),
        " ",
        "entries"
      ] }),
      s.length > 0 && /* @__PURE__ */ n.jsx("button", { className: "clear-sorts-btn", onClick: b, children: "✕ Clear sorts" }),
      /* @__PURE__ */ n.jsx("div", { className: "search-container", children: /* @__PURE__ */ n.jsx(
        "input",
        {
          "data-testid": "input-search",
          type: "text",
          id: "input-search",
          placeholder: "Search...",
          value: _,
          onChange: (r) => g(r.target.value)
        }
      ) })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "sort-controls", children: [
      /* @__PURE__ */ n.jsx("span", { className: "sort-controls-label", children: "Sort by:" }),
      d.map((r) => {
        const o = s.find((T) => T.key === r.key), E = s.findIndex((T) => T.key === r.key) + 1;
        return /* @__PURE__ */ n.jsxs(
          "button",
          {
            className: `sort-chip${o ? " sort-chip--active" : ""}`,
            onClick: () => h(r.key),
            children: [
              r.label,
              o ? o.direction === "asc" ? " ↑" : " ↓" : "",
              o && s.length > 1 && /* @__PURE__ */ n.jsx("sup", { children: E })
            ]
          },
          r.key
        );
      })
    ] }),
    /* @__PURE__ */ n.jsxs("table", { children: [
      /* @__PURE__ */ n.jsx("thead", { children: /* @__PURE__ */ n.jsx("tr", { children: d.map((r) => {
        const o = s.find((T) => T.key === r.key), E = s.findIndex((T) => T.key === r.key) + 1;
        return /* @__PURE__ */ n.jsxs(
          "th",
          {
            className: `sortable-th${o ? " active-sort" : ""}`,
            onClick: () => h(r.key),
            children: [
              r.label,
              /* @__PURE__ */ n.jsx("span", { className: "sort-arrow", children: o ? /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
                o.direction === "asc" ? " ↑" : " ↓",
                s.length > 1 && /* @__PURE__ */ n.jsx("sup", { children: E })
              ] }) : " ↕" })
            ]
          },
          r.key
        );
      }) }) }),
      /* @__PURE__ */ n.jsx("tbody", { children: i.length === 0 ? /* @__PURE__ */ n.jsx("tr", { children: /* @__PURE__ */ n.jsx("td", { colSpan: d.length, style: { textAlign: "center" }, children: "No entries found" }) }) : i.map((r, o) => /* @__PURE__ */ n.jsx("tr", { children: d.map((E) => /* @__PURE__ */ n.jsx("td", { "data-label": E.label, children: r[E.key] }, E.key)) }, o)) })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "datatable-footer", children: [
      /* @__PURE__ */ n.jsx("div", { className: "datatable-info", children: k === 0 ? "No entries found" : `Showing ${I} to ${O} of ${k} entries${k !== R ? ` (filtered from ${R} total entries)` : ""}` }),
      /* @__PURE__ */ n.jsxs("div", { className: "datatable-pagination", children: [
        /* @__PURE__ */ n.jsx(
          "button",
          {
            "data-testid": "btn-previous",
            onClick: () => A((r) => Math.max(1, r - 1)),
            disabled: u === 1,
            children: "Previous"
          }
        ),
        S().map(
          (r, o) => r === "..." ? /* @__PURE__ */ n.jsx("span", { className: "pagination-ellipsis", children: "…" }, `ellipsis-${o}`) : /* @__PURE__ */ n.jsx(
            "button",
            {
              onClick: () => A(r),
              className: u === r ? "active-page" : "",
              children: r
            },
            r
          )
        ),
        /* @__PURE__ */ n.jsx(
          "button",
          {
            "data-testid": "btn-next",
            onClick: () => A((r) => Math.min(x, r + 1)),
            disabled: u === x,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
export {
  ce as DataTable
};
