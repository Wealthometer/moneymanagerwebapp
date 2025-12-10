import { useContext } from "react";
import Menubar from "./Menubar";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar"

const Dashboard = ({children, activeMenu}) => {

    const {user} = useContext(AppContext)

    return (
        <div>
            <Menubar activeMenu={activeMenu} />

            {
                user && (
                    <div className="flex">
                        <div className="max-[1080px]:hidden">
                            {/* Sidebar Component */}
                            <Sidebar activeMenu={activeMenu} />
                        </div>

                        <div className="grow mx-5">
                            {children}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Dashboard;