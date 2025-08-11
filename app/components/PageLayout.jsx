"use client";

import NavBar from "./NavBar";

export default function PageLayout({ children, showNavbar = true }) {
    return (
        <>
            {showNavbar && <NavBar />}
            {children}
        </>
    );
}
