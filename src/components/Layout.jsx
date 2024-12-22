
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebaseAppConfig from "../util/firebase-config";
import {getAuth, onAuthStateChanged} from "firebase/auth"; 

const auth = getAuth(firebaseAppConfig)
const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const [session,setSession] = useState(null)
  const navigate = useNavigate();
  
  useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
          if(user)
          {
              setSession(user)
          }
          else {
              setSession(false)
          }
      })
  },[])

  const menus = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Category", href: "/category" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const mobileLink = (href) => {
    navigate(href);
    setOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 bg-white py-4 shadow-lg z-50">
        <div className="w-10/12 mx-auto flex items-center justify-between">
          <img src="/images/logo.jpg" className="w-[120px]" alt="Logo" />

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-blue-600"
            onClick={() => setOpen(!open)}
          >
            <i className="ri-menu-3-fill text-3xl"></i>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6">
            {menus.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className="py-2 px-4 text-gray-700 hover:bg-blue-600 hover:text-white rounded transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
           
            {
                !session &&
                <>
                    <li>
                      <Link
                          to="/login"
                          className="py-2 px-4 text-gray-700 hover:bg-blue-600 hover:text-white rounded transition"
                      >
                      Login
                      </Link>
                    </li>
                    <li>
                      <Link
                      to="/signup"
                      className="py-2 px-6 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
                      >
                      Signup
                      </Link>
                    </li>
                </>
            }

            {
                 session &&
                 <>
                   
                   <div className="relative">
              <img
                src="/images/avt.avif"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
                onClick={() => setAccountMenu(!accountMenu)}
              />
              {accountMenu && (
                <div className="absolute right-0 mt-2 w-[150px] bg-white shadow-lg rounded-lg p-4">
                  
                   <div className="flex flex-col gap-3  ">
                    {/* yaha user jo login hoga hoha uska name de sakte hai session.displayName */}
                      <Link to="/profile" className="w-full p-1 hover:bg-gray-200">
                          <i className="ri-user-line text-lg font-bold mr-2 " ></i>
                          My Profile
                          
                      </Link>

                      <Link to="/cart" className="w-full p-1 hover:bg-gray-200">
                          <i className="ri-shopping-cart-line text-lg font-bold mr-2" ></i>
                          Cart
                          
                      </Link>
                   </div>
            
                  <div className="mt-4 border-t pt-4">
                
                       <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition" onClick={()=>auth.signOut()}>
                            <i className="ri-logout-circle-r-line"></i>
                            Logout
                        </button>
              
                  </div>
                </div>
              )}
            </div>
                
                 </>
            }
             
          </ul>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-50 transition-transform transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: 250 }}
      >
        <div className="p-6 space-y-4">
          <button
            className="text-right text-gray-300 text-2xl"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          {menus.map((item, index) => (
            <button
              key={index}
              onClick={() => mobileLink(item.href)}
              className="block text-left py-2 px-4 hover:bg-gray-700 rounded transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Website Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">
              Website Links
            </h3>
            <ul className="space-y-2">
              {menus.map((item, index) => (
                <li key={index}>
                  <Link to={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/login" className="hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white">
                  Signup
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Facebook
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Youtube
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Twitter
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Linkedin
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand Details */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">
              Brand Details
            </h3>
            <p className="mb-4">
              New Slock Gramenet is a brand focused on smart, eco-friendly
              products. It aims to bring quality and sustainability to everyday
              life.
            </p>
            <img
              src="/images/Logomain.jpg"
              alt="Brand Logo"
              className="w-[100px]"
            />
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Contact Us</h3>
            <form className="space-y-4">
              <input
                required
                name="fullname"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                placeholder="Your Name"
              />
              <input
                required
                type="email"
                name="email"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                placeholder="Your Email"
              />
              <textarea
                required
                name="message"
                rows="4"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                placeholder="Your Message"
              ></textarea>
              <button className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Submit
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
