import { X } from "react-bootstrap-icons";

const log = () => console.log("No method bound for closing sidenav");
const sideNav = ({ children, onClose = log }) => {
	return (
		<div
			className="d-flex w-100 h-100 position-fixed d-xs-flex d-lg-none"
			style={{ zIndex: 2000 }}
		>
			<div className="d-flex flex-column bg-dark">
				<div className="d-flex flex-fill text-light">
					<span className="d-flex flex-fill fs-2 p-2">
						Categories
					</span>
					<X
						fontSize={48}
						onClick={onClose}
						color="white"
						role="button"
						className="pe-2 pt-2"
					/>
				</div>
				<div className="d-flex flex-column bg-dark left-0 w-100">
					{children}
				</div>
			</div>
			<div
				className="d-flex flex-fill bg-dark opacity-75"
				onClick={onClose}
			/>
		</div>
	);
};

export default sideNav;
