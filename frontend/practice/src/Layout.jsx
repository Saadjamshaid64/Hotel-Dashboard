















import {Outlet} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar.jsx";
function Layout()
{
return (
    <>
    <Sidebar/>
    <Outlet/>
    </>
)
}


export default Layout;