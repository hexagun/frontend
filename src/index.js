// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Provider } from 'react-redux'

import store from './store'

import Game from './components/Game';
import LoginUI from './components/LoginUI';

import { AuthProvider, useAuth } from "./components/AuthContext";

console.log('Initial state: ', store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
    console.log('State after dispatch: ', store.getState())
  )


// Wrapper that redirects based on auth
function AuthRouter() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If authenticated, go to dashboard; otherwise, to login
  return isAuthenticated ? (
    <Game />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginUI />} />
                    <Route path="*" element={<AuthRouter />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </Provider>
);

unsubscribe()