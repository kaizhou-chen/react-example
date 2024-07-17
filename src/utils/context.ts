import React from 'react'

let defaultValue: any;
export const MyContext = React.createContext(defaultValue);
export const MyProvider = MyContext.Provider;