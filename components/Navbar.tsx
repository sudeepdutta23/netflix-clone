import { useCallback, useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import { BsBell, BsChevronDown, BsChevronUp, BsSearch } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountsMenu from "./AccountsMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const toggleMobileMenu = useCallback(()=>{
        setShowMobileMenu((current)=> !current);
    },[])
    const toggleAccountMenu = useCallback(()=>{
        setAccountMenu((current)=> !current);
    },[])

    useEffect(()=>{
        const handleSCroll = () =>{
            if(window.scrollY >= TOP_OFFSET){
                setShowBackground(true)
            }else{
                setShowBackground(false)
            }
        }

        window.addEventListener('scroll', handleSCroll);

        return () =>{
            window.removeEventListener('scroll', handleSCroll);
        }

    },[])

  return (
    <nav className="w-full fixed z-40">
        <div className={`
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
            ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
        `}>
            <img className="h-4 lg:h7" src="/images/logo.png" alt="Logo" />
            <div
                className="
                    flex-row
                    ml-8
                    gap-7
                    hidden
                    lg:flex
                "
            >
                <NavbarItem label="Home" />
                <NavbarItem label="Series" />
                <NavbarItem label="Films" />
                <NavbarItem label="New & Popular" />
                <NavbarItem label="My List" />
                <NavbarItem label="Browse by languages" />
            </div>
            <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                <p className="text-white text-sm">Browse</p>
                <BsChevronDown className={`text-white transition ${showMobileMenu? 'rotate-180' : 'rotate-0' }`} /> 
                <MobileMenu visible={showMobileMenu} />
            </div>
            <div className="flex flex-row ml-auto gap-7 items-center">
                <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                    <BsSearch />
                </div>
                <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                    <BsBell/>
                </div>
                <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                    <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                        <img src="/images/default-blue.png" alt="" />
                    </div>
                   <BsChevronDown className={`text-white transition ${showAccountMenu? 'rotate-180' : 'rotate-0' }`} />
                    <AccountsMenu visible={showAccountMenu} />
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;
