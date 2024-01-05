import './app.css';
import { useAuth } from '../../container/auth';
import Auth from '../../container/auth';
import ReduxStoreProvider from '../../helper/store';
import { useEffect } from "react";

function Layout() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

const Wrapper = () => {
    // First check for login with login module. (We can have a utility)
    const { isUserLoggedInToBrowserSession } = useAuth();
    const isUserAllowedToEnter = isUserLoggedInToBrowserSession();
    useEffect(() => {
     console.log("mounted");
     return () => console.log("unmounted");
    }, []);
    if(!isUserAllowedToEnter) {
        return (
            <Auth />
        )
    }
    //
};

const AppWithReduxStore = () => {
    useEffect(() => {
        console.log("main mounted");
        return () => console.log("main unmounted");
    }, []);
    return (
        <ReduxStoreProvider>
            <Wrapper />
        </ReduxStoreProvider>
    );
};

export default AppWithReduxStore;
