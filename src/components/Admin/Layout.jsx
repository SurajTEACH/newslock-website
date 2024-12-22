
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const [size, setSize] = useState(280); // Desktop sidebar width
  const [mobileSize, setMobileSize] = useState(0); // Mobile sidebar width
  const [accountMenu, setAccountMenu] = useState(false);
  const location = useLocation();

  const menus = [
    {
      label: "Dashboard",
      icon: <i className="ri-dashboard-3-line"></i>,
      link: "/admin/dashboard",
    },
    {
      label: "Products",
      icon: <i className="ri-shopping-cart-line"></i>,
      link: "/admin/products",
    },
    {
      label: "Customers",
      icon: <i className="ri-user-3-line"></i>,
      link: "/admin/customers",
    },
    {
      label: "Orders",
      icon: <i className="ri-shape-line"></i>,
      link: "/admin/orders",
    },
    {
      label: "Payments",
      icon: <i className="ri-money-dollar-circle-line"></i>,
      link: "/admin/payments",
    },
    {
      label: "Settings",
      icon: <i className="ri-settings-3-line"></i>,
      link: "/admin/settings",
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="md:block hidden">
        <aside
          className="bg-gradient-to-br from-indigo-600 to-purple-500 fixed top-0 left-0 h-full shadow-xl flex flex-col"
          style={{
            width: size,
            overflow: size === 0 ? "hidden" : "visible", 
            transition: "width 0.3s",
          }}
        >
          {/* Logo Section */}
          <div className="flex items-center justify-center p-4 border-b border-gray-200">
            <img
              src="/images/Logomain.jpg"
              alt="Logo"
              className="h-10 w-auto transition-transform"
              style={{
                transform: size === 280 ? "scale(1)" : "scale(0.8)",
                transition: "transform 0.3s",
              }}
            />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col mt-4 gap-2">
            {menus.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center gap-3 px-4 py-3  text-gray-50 text-lg font-medium rounded-lg transition ${
                  location.pathname === item.link
                    ? "bg-rose-600 shadow-md"
                    : "hover:bg-rose-600 hover:shadow-md"
                }`}
              >
                {item.icon}
                {size === 280 && <span>{item.label}</span>}
              </Link>
            ))}
            <button className="flex items-center gap-3 px-4 py-3 mt-auto text-gray-50 text-lg font-medium rounded-lg hover:bg-rose-600 transition">
              <i className="ri-logout-circle-r-line"></i>
              {size === 280 && <span>Logout</span>}
            </button>
          </div>
        </aside>
        <section
          className="bg-gray-100 h-screen"
          style={{
            marginLeft: size,
            transition: "margin-left 0.3s",
          }}
        >
          <nav className="bg-white p-4 shadow-md flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <button
                className="p-2 bg-gray-50 hover:bg-indigo-600 hover:text-white rounded-lg shadow transition"
                onClick={() => setSize(size === 280 ? 0 : 280)}
              >
                <i className="ri-menu-2-line text-xl"></i>
              </button>
              <h1 className="text-lg font-semibold text-gray-800">NewSlock</h1>
            </div>
            <div className="relative">
              <img
                src="/images/avt.avif"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
                onClick={() => setAccountMenu(!accountMenu)}
              />
              {accountMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                  <h2 className="font-semibold text-gray-800">Er Saurav</h2>
                  <p className="text-gray-500 text-sm">example@gmail.com</p>
                  <div className="mt-4 border-t pt-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition">
                      <i className="ri-logout-circle-r-line"></i>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
          <div className="p-6">{children}</div>
        </section>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden block">
        <aside
          className="bg-gradient-to-br from-indigo-600 to-purple-500 fixed top-0 left-0 h-full shadow-lg z-50 flex flex-col"
          style={{
            width: mobileSize,
            overflow: mobileSize === 0 ? "hidden" : "visible",
            transition: "width 0.3s",
          }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 bg-gray-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full shadow-lg transition"
            onClick={() => setMobileSize(0)}
          >
            <i className="ri-close-line text-xl"></i>
          </button>

          {/* Logo Section */}
          <div className="flex items-center justify-center p-4 border-b border-gray-200">
            <img src="/images/Logomain.jpg" alt="Logo" className="h-10 w-auto" />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col mt-4 gap-2">
            {menus.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center gap-3 px-4 py-3 text-gray-50 text-lg font-medium rounded-lg transition ${
                  location.pathname === item.link
                    ? "bg-rose-600 shadow-md"
                    : "hover:bg-rose-600 hover:shadow-md"
                }`}
              >
                {item.icon}
                {mobileSize === 280 && <span>{item.label}</span>}
              </Link>
            ))}
            <button className="flex items-center gap-3 px-4 py-3 mt-auto text-gray-50 text-lg font-medium rounded-lg hover:bg-rose-600 transition">
              <i className="ri-logout-circle-r-line"></i>
              {mobileSize === 280 && <span>Logout</span>}
            </button>
          </div>
        </aside>
        <section className="bg-gray-100 h-screen">
          <nav className="bg-white p-4 shadow-md flex items-center justify-between sticky top-0 z-10">
            <button
              className="p-2 bg-gray-50 hover:bg-indigo-600 hover:text-white rounded-lg shadow transition"
              onClick={() => setMobileSize(280)}
            >
              <i className="ri-menu-2-line text-xl"></i>
            </button>
            
            <div className="relative">
              <img
                src="/images/avt.avif"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
                onClick={() => setAccountMenu(!accountMenu)}
              />
              {accountMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                  <h2 className="font-semibold text-gray-800">Er Saurav</h2>
                  <p className="text-gray-500 text-sm">example@gmail.com</p>
                  <div className="mt-4 border-t pt-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition">
                      <i className="ri-logout-circle-r-line"></i>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
          <div className="p-6">{children}</div>
        </section>
      </div>
    </>
  );
};

export default Layout;
