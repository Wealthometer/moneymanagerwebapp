import { useContext } from "react";
import Menubar from "./Menubar";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {

    const {user} = useContext(AppContext)

    return (
        <div>
            <Menubar  />

            {
                user && (
                    <div className="flex">
                        <div className="max-[1080px]:hidden">
                            {/* Sidebar Component */}
                            <div className="text-md text-purple-800">Sidebar</div>
                        </div>

                        <div className="grow mx-5">
                            Right
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Dashboard;