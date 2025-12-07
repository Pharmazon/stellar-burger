import React, {useEffect} from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';
import {BrowserRouter} from 'react-router-dom';
import {fetchIngredients} from "./services/slice/burger-ingredients-slice";
import {useAppDispatch} from "./services/store";
import AppHeader from "./components/app-header/app-header/app-header";
import AppContent from "./components/app-content/app-content";

const App = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);
    
    return (
        <DndProvider backend={HTML5Backend}>
            <BrowserRouter>
                <AppHeader/>
                <AppContent/>
            </BrowserRouter>
        </DndProvider>
    );
}

export default App;
