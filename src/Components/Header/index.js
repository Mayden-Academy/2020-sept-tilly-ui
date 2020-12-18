import React from 'react';
import {Link} from "react-router-dom";
import './header.css';

class Header extends React.Component {
    render() {
        return (
            <header>
                <img
                    src="images/tilly1.png"
                    alt="tilly logo"
                />
                <nav>
                    <Link
                        to="/">
                        timeline
                    </Link>
                    <Link
                        to={"/" + this.props.username}>
                        profile
                    </Link>
                </nav>
                <div
                    id="navTwo">

                    <div
                        onClick={this.props.onLogOut}>
                        log out
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;