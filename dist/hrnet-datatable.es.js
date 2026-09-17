import { useState as e } from "react";
//#region \0rolldown/runtime.js
var t = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), n = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
//#endregion
//#region src/hooks/useDataTable.js
function r(t, n) {
	let [r, i] = e(""), [a, o] = e(null), [s, c] = e("asc"), l = (e) => {
		a === e ? c((e) => e === "asc" ? "desc" : "asc") : (o(e), c("asc"));
	}, u = t.filter((e) => n.some((t) => String(e[t.key] ?? "").toLowerCase().includes(r.toLowerCase())));
	return {
		search: r,
		setSearch: i,
		sorted: a ? [...u].sort((e, t) => {
			let n = String(e[a] ?? "").toLowerCase(), r = String(t[a] ?? "").toLowerCase();
			return n < r ? s === "asc" ? -1 : 1 : n > r ? s === "asc" ? 1 : -1 : 0;
		}) : u,
		sortKey: a,
		sortDirection: s,
		handleSort: l
	};
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
var i = /* @__PURE__ */ t(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), a = /* @__PURE__ */ t(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === A ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case w: return "Suspense";
				case T: return "SuspenseList";
				case O: return "Activity";
				case k: return "ViewTransition";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case E: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case D:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function r(e) {
			return "" + e;
		}
		function i(e) {
			try {
				r(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var n = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return n.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), r(e);
			}
		}
		function a(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === D) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function o() {
			var e = j.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (M.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				F || (F = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return I[e] || (I[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function d(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: u
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
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
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, r, a, s, u) {
			var f = n.children;
			if (f !== void 0) {
				if (a) {
					if (N(f)) {
						for (a = 0; a < f.length; a++) p(f[a]);
						Object.freeze && Object.freeze(f);
					} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
				} else p(f);
			}
			if (M.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", z[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), z[f + a] = !0);
			}
			if (f = null, r !== void 0 && (i(r), f = "" + r), c(n) && (i(n.key), f = "" + n.key), "key" in n) for (var h in r = {}, n) h !== "key" && (r[h] = n[h]);
			else r = n;
			return f && l(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, r, o(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === D && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = n("react"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), k = Symbol.for("react.view_transition"), A = Symbol.for("react.client.reference"), j = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, M = Object.prototype.hasOwnProperty, N = Array.isArray, P = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var F, I = {}, L = h.react_stack_bottom_frame.bind(h, s)(), R = P(a(s)), z = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > j.recentlyCreatedOwnerStacks++;
			if (r) {
				var i = Error.stackTraceLimit;
				Error.stackTraceLimit = 10;
				var o = Error("react-stack-top-frame");
				Error.stackTraceLimit = i;
			} else o = L;
			return f(e, t, n, !1, o, r ? P(a(e)) : R);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > j.recentlyCreatedOwnerStacks++;
			if (r) {
				var i = Error.stackTraceLimit;
				Error.stackTraceLimit = 10;
				var o = Error("react-stack-top-frame");
				Error.stackTraceLimit = i;
			} else o = L;
			return f(e, t, n, !0, o, r ? P(a(e)) : R);
		};
	})();
})), o = (/* @__PURE__ */ t(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? i() : a();
})))();
function s({ data: e = [], columns: t = [] }) {
	let { search: n, setSearch: i, sorted: a, sortKey: s, sortDirection: c, handleSort: l } = r(e, t), u = (e) => s === e ? c === "asc" ? /* @__PURE__ */ (0, o.jsx)("i", { class: "fa-solid fa-arrow-down-a-z" }) : /* @__PURE__ */ (0, o.jsx)("i", { class: "fa-solid fa-arrow-down-z-a" }) : /* @__PURE__ */ (0, o.jsx)("i", { class: "fa-solid fa-arrow-down-a-z" });
	return /* @__PURE__ */ (0, o.jsxs)("div", {
		className: "global-container",
		children: [/* @__PURE__ */ (0, o.jsx)("div", {
			className: "search-container",
			children: /* @__PURE__ */ (0, o.jsx)("input", {
				type: "text",
				placeholder: "Search...",
				value: n,
				onChange: (e) => i(e.target.value)
			})
		}), /* @__PURE__ */ (0, o.jsxs)("table", { children: [/* @__PURE__ */ (0, o.jsx)("thead", { children: /* @__PURE__ */ (0, o.jsx)("tr", { children: t.map((e) => /* @__PURE__ */ (0, o.jsxs)("th", {
			onClick: () => l(e.key),
			className: "sortable-th",
			children: [e.label, /* @__PURE__ */ (0, o.jsx)("span", {
				className: "sort-arrow",
				children: u(e.key)
			})]
		}, e.key)) }) }), /* @__PURE__ */ (0, o.jsx)("tbody", { children: a.map((e, n) => /* @__PURE__ */ (0, o.jsx)("tr", { children: t.map((t) => /* @__PURE__ */ (0, o.jsx)("td", { children: e[t.key] }, t.key)) }, n)) })] })]
	});
}
//#endregion
export { s as DataTable };
