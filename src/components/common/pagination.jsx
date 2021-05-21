import _ from "lodash";

const Pagination = (props) => {
	const { totalcount, pagesize, currentpage, onPagechange } = props;
	const pageCount = Math.ceil(totalcount / pagesize);
	if (pageCount === 1) return null;
	const pages = _.range(1, pageCount + 1);
	console.log(currentpage);
	return (
		<nav>
			<ul className="pagination">
				{pages.map((page) => (
					<li
						key={page}
						className={page === currentpage ? "page-item active" : "page -item"}
					>
						<a onClick={() => onPagechange(page)} className="page-link">
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
