import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
const RootLayout = () => {
    const navigation = useNavigation();
    console.log(navigation.state);
    return (
        <>
          <NavBar />
            <main>
                 {navigation.state === "loading" && <p>Loading...</p>}
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
export default RootLayout;