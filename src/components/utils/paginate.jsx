import _ from "lodash";

export function paginate(items, currentpage, pagesize) {
	const startIndex = (currentpage - 1) * pagesize;
	return (items = _(items).slice(startIndex).take(pagesize).value());
}
