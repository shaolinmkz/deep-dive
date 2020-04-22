import React, { createContext, useContext } from 'react';
import rootReducer from '../reducers';

const AppContext = createContext();

export const useAppStore = () => useContext(AppContext);

const AppContextTheme = ({ children }) => <AppContext.Provider value={rootReducer()}>{children}</AppContext.Provider>;

export default AppContextTheme;