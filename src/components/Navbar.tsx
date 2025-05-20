
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  
  
  return (
    <nav className="absolute bg-white top-10 left-5 right-5 z-50 p-4 md:p-6">
      <div className="container mx-auto ">
        {/* <div className="text-black font-bold text-2xl">TenTwenty Farms</div> */}
        
        {isMobile ? (
          <div className='flex justify-between flex-row-reverse' > 
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="text-black p-2"
            >
              <Menu size={24} />
            </button>
            
            {menuOpen && (
              <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 w-64 animate-fade-in">
                <div className="flex flex-col gap-4">
                  <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
                  <a href="#news" className="hover:text-gray-300 transition-colors">News</a>
                  <a href="#services" className="hover:text-gray-300 transition-colors">Services</a>
                  <a href="#our-team" className="hover:text-gray-300 transition-colors">Our Team</a>
                  <a href="#make-enquiry" className="hover:text-gray-300 transition-colors">Make Enquiry</a>
                  {/* <div className="mt-2">
                    <a href="#contact" className="inline-flex items-center border border-black px-4 py-2 rounded">
                      Contact us <span className="ml-2">→</span>
                    </a>
                  </div> */}
                </div>
              </div>
            )}

            <div>
              <a href="#contact" className="inline-flex items-center border border-black px-4 py-2 text-black">
                Contact us <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-8">
            <div className="flex gap-8 text-black">
              <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
              <a href="#news" className="hover:text-gray-300 transition-colors">News</a>
              <a href="#services" className="hover:text-gray-300 transition-colors">Services</a>
              <a href="#our-team" className="hover:text-gray-300 transition-colors">Our Team</a>
              <a href="#make-enquiry" className="hover:text-gray-300 transition-colors">Make Enquiry</a>
            </div>
            <div>
              <a href="#contact" className="inline-flex items-center border border-black px-4 py-2 text-black hover:bg-stone-200">
                Contact us <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
