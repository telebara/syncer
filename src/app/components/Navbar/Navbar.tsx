import React from "react";

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#181818",
        padding: "20px 32px",
        borderRadius: "0 0 24px 24px",
        boxShadow: "0 2px 16px #0004",
        marginBottom: "32px",
      }}
    >{children}</nav>
  );
};

export default Navbar;
