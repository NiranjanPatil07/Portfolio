import { Github, Home, Instagram, Linkedin, Twitter } from "lucide-react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { TypewriterEffectSmooth } from "../../components/typewriter-effect";
import { motion, useInView } from "framer-motion";
// const NAV_ITEMS = ["about", "experience", "projects"];
const SOCIAL_ITEMS = [
  { to: "https://github.com/NiranjanPatil07", icon: <Github />, label: "Home" },
  { to: "https://twitter.com/heyniranjanp", icon: <Twitter />, label: "Search" },
  { to: "https://www.linkedin.com/in/heyniranjanpatil/", icon: <Linkedin />, label: "Playlist" },
  { to: "https://www.linkedin.com/in/heyniranjanpatil/", icon: <Instagram />, label: "Playlist" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.2,
    },
  },
};
const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
};

const Header = ({ section }) => {
  const [activeLink, setActiveLink] = useState("about");
  const navigationRef = useRef(null);
  const isInView = useInView(navigationRef, { once: true });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionInView = section.find(({ ref }) => {
        const { offsetTop, offsetHeight } = ref.current;
        return scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop - 100 + offsetHeight;
      });
      if (sectionInView) {
        setActiveLink(sectionInView.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [section]);

  const scrollToSection = (id) => {
    const SELECTED_SECTION = section.find((section) => section.id === id);
    if (SELECTED_SECTION && SELECTED_SECTION.ref.current) {
      SELECTED_SECTION.ref.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
    }
  };

  const words = [
    {
      text: "Niranjan",
      className: "text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl",
    },
    {
      text: "Patil",
      className: "text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl",
    },
  ];
  return (
    <header className='lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 select-none'>
      <div>
        {/* <h1 className='text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl'>Niranjan Patil</h1> */}
        <TypewriterEffectSmooth words={words} />
        <motion.h2
          className='mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl'
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
            duration: 0.5,
          }}
        >
          Frontend Developer
        </motion.h2>
        <motion.p
          className='mt-4 max-w-xs leading-normal text-slate-400'
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
            duration: 0.5,
          }}
        >
          An experienced web developer skilled in React JS and React Native
        </motion.p>
        <nav className='nav hidden lg:block' aria-label='In-page jump links'>
          <motion.ul className='mt-16 w-max' variants={container} initial='hidden' animate={"show"}>
            {section?.map(({ id, label }) => (
              <motion.li variants={item} key={id}>
                <p
                  onClick={() => scrollToSection(id)}
                  className={`group flex items-center py-3 ${activeLink === id ? "active" : ""}`}
                  key={id}
                  href={`#${id}`}
                >
                  <span className='nav-indicator mr-4 h-px w-8 bg-slate-500 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none'></span>
                  <span className='nav-text text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200 group-focus-visible:text-slate-200'>
                    {label}
                  </span>
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
      <motion.ul className='flex space-x-6 mt-8' variants={container} initial='hidden' animate={"show"}>
        {SOCIAL_ITEMS?.map(({ to, icon }) => (
          <motion.li key={icon} variants={item} onClick={() => window.open(to)}>
            {React.cloneElement(icon, {
              strokeWidth: 1.5,
              className: "text-slate-500 hover:text-teal-300 cursor-pointer",
            })}
          </motion.li>
        ))}
      </motion.ul>
    </header>
  );
};

export default Header;
