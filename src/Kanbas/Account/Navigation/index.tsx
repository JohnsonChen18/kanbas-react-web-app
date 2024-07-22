import { Link, useLocation, useParams } from "react-router-dom";
import {useSelector} from "react-redux";
export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Sign in", "Sign up"];
    const { pathname } = useLocation();
    return (
        <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link to={`/Kanbas/Account/${link.replace(/\s+/g, '')}`} className={`wd-link border border-0 list-group-item
           ${ pathname.includes(link) ? "active text-black bg-white" : "text-danger" }`}> {link} </Link>
            ))}
        </div>
    );
}
