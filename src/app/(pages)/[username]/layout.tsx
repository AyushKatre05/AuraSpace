import React from "react";
import PortfolioNavbar from "@/components/portfolio/PortfolioNavbar";
import Footer from "@/components/Footer";


const Layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="scroll-smooth" >
      
      <PortfolioNavbar/>
      {
        children
      }
      <Footer/>
    </div>
  );
};

export default Layout;
