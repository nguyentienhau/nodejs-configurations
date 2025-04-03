import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AppContainer, ErrorBoundary } from "@/commons";

function getRoutes({ pages, lazyPages }) {
	return [...Object.keys(pages), ...Object.keys(lazyPages)]
		.map(function (key) {
			const result = { isLazyPage: false, path: "", component: null };
			let path = key
				.replace("./pages", "")
				.replace(/\.(t|j)sx?$/, "")
				/**
				 * Replace group with ()
				 */
				.replace(/\(+[^()]+\)+\//g, "")
				/**
				 * Replace /index with /
				 */
				.replace(/\/index$/i, "/")
				/**
				 * Only lowercase the first letter. This allows the developer to use camelCase
				 * dynamic paths while ensuring their standard routes are normalized to lowercase.
				 */
				.replace(/\b[A-Z]/, (firstLetter) => firstLetter.toLowerCase())
				/**
				 * Convert /[handle].js and /[...handle].js to /:handle.js
				 */
				.replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);

			if (path.endsWith("/") && path !== "/") {
				path = path.substring(0, path.length - 1);
			}

			if (!pages[key]?.default && !lazyPages[key]) {
				// eslint-disable-next-line no-console
				console.warn(`${key} doesn't export a default React component`);
			}
			if (pages[key]?.default) {
				result.path = path;
				result.component = pages[key].default;
			} else if (lazyPages[key]) {
				// Remove lazy suffix
				result.path = path.replace(/\.lazy$/i, "").replace(/\/index$/i, "/");
				result.isLazyPage = true;
				result.component = lazyPages[key];
			}

			return result;
		})
		.filter((route) => route.component);
}

const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx|*.lazy.[jt]sx)*.([jt]sx)", { eager: true });
const lazyPages = import.meta.glob("./pages/**/*.lazy.([jt]sx)");
const routes = getRoutes({ pages, lazyPages });
const routeComponents = routes.map(function ({ path, component: Component, isLazyPage, ...other }) {
	if (isLazyPage) {
		return <Route key={path} path={path} lazy={async () => ({ Component: (await Component()).default })} errorElement={<ErrorBoundary />} />;
	} else if (typeof Component === "function") {
		return <Route key={path} path={path} element={<Component />} {...other} errorElement={<ErrorBoundary />} />;
	}
});
const NotFound = routes.find(({ path }) => path === "/not-found").component;
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<AppContainer />}>
			{routeComponents}
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

/**
 * File-based routing.
 * @desc File-based routing that uses React Router under the hood.
 * To create a new route create a new .jsx file in `/pages` with a default export.
 *
 * Some examples:
 * * `/pages/index.jsx` matches `/`
 * * `/pages/blog/[id].jsx` matches `/blog/123`
 * * `/pages/[...catchAll].jsx` matches any URL not explicitly matched
 *
 * @param {object} pages value of import.meta.globEager(). See https://vitejs.dev/guide/features.html#glob-import
 *
 * @return {Routes} `<Routes/>` from React Router, with a `<Route/>` for each file in `pages`
 */
export default function Router({ children }) {
	return <RouterProvider router={router}>{children}</RouterProvider>;
}
