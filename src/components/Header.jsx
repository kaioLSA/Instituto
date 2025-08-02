import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState, useEffect } from "react";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Smooth scroll function
  const smoothScrollTo = (targetId, offset = 80) => {
    const id = targetId.replace('#', '');
    const targetElement = document.getElementById(id);
    
    if (!targetElement) {
      console.warn(`Element with ID ${id} not found`);
      return;
    }

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;

    const easeInOutQuad = (t, b, c, d) => {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => item.url.replace('#', ''));
      let current = "";
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      });

      setActiveSection(current ? `#${current}` : "");
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = (e, item) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (openNavigation) {
      enablePageScroll();
      setOpenNavigation(false);
    }
    
    // Smooth scroll to target
    smoothScrollTo(item.url);
    setActiveSection(item.url);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a 
          className="block xl:mr-8" 
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("#hero");
            setActiveSection("#hero");
          }}
        >
          <img src={brainwave} alt="Brainwave" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={(e) => handleClick(e, item)}
                className={`block relative items-center justify-center font-code text-2xl uppercase transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === activeSection
                    ? "text-color-1 z-2 lg:text-n-1"
                    : "text-n-1 lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
                {item.url === activeSection && (
                  <span className="absolute bottom-4 left-1/2 w-6 h-0.5 bg-color-1 transform -translate-x-1/2 lg:bottom-2"></span>
                )}
              </a>
            ))}
          </div>
        </nav>

        <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>

      
    </div>
  );
};

export default Header;