// @flow strict
'use client'
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(v => !v);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    // ✅ position context + z to keep menu above content
    <nav className="bg-transparent relative z-[100]">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-3xl font-bold"
            onClick={closeMenu}
          >
            OYEM WILSON
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          type="button"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Menu */}
        <ul
          id="navbar-menu"
          className={`
            absolute top-full left-0 right-0 w-full bg-black/95 backdrop-blur-sm
            flex flex-col items-start text-sm border-t border-gray-800
            transition-[max-height,opacity,visibility] duration-300 ease-in-out
            z-[120]
            ${isMenuOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"}
            md:relative md:top-auto md:left-auto md:right-auto md:w-auto md:bg-transparent
            md:backdrop-blur-none md:border-0 md:flex-row md:space-x-1
            md:max-h-none md:opacity-100 md:visible md:overflow-visible
          `}
        >
          {[
            { href: "/#about", label: "ABOUT" },
            { href: "/#experience", label: "EXPERIENCE" },
            { href: "/#skills", label: "SKILLS" },
            { href: "/#education", label: "EDUCATION" },
            { href: "/#projects", label: "PROJECTS" },
          ].map((item) => (
            <li key={item.label} className="w-full md:w-auto">
              <Link
                className="block px-4 py-3 md:py-2 no-underline outline-none hover:no-underline w-full"
                href={item.href}
                onClick={closeMenu}
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
