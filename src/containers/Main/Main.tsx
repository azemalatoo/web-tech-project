import React from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import QuotesPage from "../Quotes/QuotesPage";
import AddPage from "../Add/AddPage";
import EditPage from "../Edit/EditPage";

const Main = () => {
    return (
        <div className="main-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', borderRadius: '12px' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
                <NavLink
                    to="/"
                    className="nav-link"
                    style={({ isActive }) => ({
                        marginBottom: '10px',
                        padding: '12px 24px',
                        backgroundColor: isActive ? '#5a1ac6' : '#6200ea',
                        color: '#fff',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        transition: 'background 0.3s, transform 0.3s',
                        transform: isActive ? 'scale(1.05)' : 'none'
                    })}
                >
                    Quotes
                </NavLink>
                <NavLink
                    to="/new-quote"
                    className="nav-link"
                    style={({ isActive }) => ({
                        padding: '12px 24px',
                        backgroundColor: isActive ? '#5a1ac6' : '#6200ea',
                        color: '#fff',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        transition: 'background 0.3s, transform 0.3s',
                        transform: isActive ? 'scale(1.05)' : 'none'
                    })}
                >
                    Submit new quote
                </NavLink>
            </nav>

            <Routes>
                <Route path="/" element={(<QuotesPage />)} />
                <Route path="/new-quote" element={(<AddPage />)} />
                <Route path="/edit-quote/:id" element={(<EditPage />)} />
            </Routes>
        </div>
    );
};

export default Main;
