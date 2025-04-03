import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
 * @param {object} pages value of import.meta.glob(). See https://vitejs.dev/guide/features.html#glob-import
 *
 * @return {Routes} `<Routes/>` from React Router, with a `<Route/>` for each file in `pages`
 */
export default function Router() {
	const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", { eager: true });
	const routes = Object.entries(pages)
		.filter((entry = []) => entry[1]?.default)
		.map(function (entry = []) {
			let path = entry[0]
				.replace("./pages", "")
				.replace(/\.(t|j)sx?$/, "")
				.replace(/\/index$/i, "/")
				.replace(/\b[A-Z]/, (firstLetter = "") => firstLetter.toLowerCase())
				.replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match = "", param = "") => `:${param}`);

			if (path.endsWith("/") && path !== "/") {
				path = path.substring(0, path.length - 1);
			}

			return { path, Component: entry[1].default };
		});
	const NotFound = routes.find(({ path = "" }) => path === "/not-found").Component;

	return (
		<BrowserRouter>
			<Link to="/" rel="home" />
			<Link to="/page-name">Page Name</Link>
			<Routes>
				{routes.map(function ({ path = "", Component = () => {} }) {
					return <Route key={path} path={path} element={<Component />} />;
				})}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
