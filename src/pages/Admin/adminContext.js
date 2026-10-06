// adminContext.js
//
// Shared state for the blog admin screens. Kept in its own file so the
// screens and the shell (Admin.js) can both import it.
import { createContext, useContext } from 'react';

export const AdminContext = createContext({ reportSignedOut: () => {} });

// Screens call reportSignedOut() when the API says the sign-in has
// expired; the shell then shows how to sign in again.
export const useAdmin = () => useContext(AdminContext);
