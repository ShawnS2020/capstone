import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />
		<NavMenu>
		<NavLink to='' activeStyle>
			Home
		</NavLink>
		<NavLink to='' activeStyle>
			Finder
		</NavLink>
		<NavLink to=' ' activeStyle>
			Disscussion
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
