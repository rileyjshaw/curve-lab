function Header() {
	return (
		<header className="border-b border-cobalt-200 border-dashed font-light text-sm uppercase">
			<div className="constrain-x flex justify-between py-0.5">
				<a href=".">
					<h1>Curve lab</h1>
				</a>
				<a
					rel="noopener noreferrer"
					target="_blank"
					href="https://www.notion.so/watershedclimate/Logo-first-impressions-07feb09304434fe1b589040da5bd3875"
				>
					About
				</a>
			</div>
		</header>
	);
}

export default Header;
