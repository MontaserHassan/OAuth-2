import { Link } from "react-router-dom";


const Navbar = ({ user }) => {
    const logout = () => {
        window.open("http://localhost:4500/auth/logout", "_self");
    };

    // console.log('navbar: ' + JSON.stringify(user));

    return (
        <div className="navbar">

            <span className="logo">
                <Link className="link" to="/"> OAuth-2.0 App </Link>
            </span>

            {user ? (
                <ul className="list">

                    <li className="listItem"> <img src={user.photo} alt="" className="avatar" /> </li>
                    <li className="listItem">{user.username}</li>
                    <li className="listItem" onClick={logout}> Logout </li>

                </ul>
            ) : (
                <Link className="link" to="login"> Login</Link>
            )}

        </div>
    );
};


export default Navbar;