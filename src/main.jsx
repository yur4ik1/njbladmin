import ReactDOM from 'react-dom/client'
import {createRouter, RouterProvider} from "@tanstack/react-router";

import {routeTree} from './routeTree.gen'
import AuthContextProvider, {useAuth} from "./utils/auth.jsx";

const router = createRouter({routeTree})

export function App() {
    const auth = useAuth();
    
    return (
        <AuthContextProvider>
            <RouterProvider router={router} context={{auth}}/>
        </AuthContextProvider>
    )
}

const rootElement = document.getElementById('root')

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(<App />)
}
