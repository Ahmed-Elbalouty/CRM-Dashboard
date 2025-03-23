import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../redux/customersSlice";
import { fetchDeals, clearDeals } from "../redux/dealsSlice";
import Sidebar from "../components/Sidebar";
import DealData from "../components/DealData";
import CustomersData from "../components/CustomersData";
import CardOfNumbers from "../components/cardOfNumbers";
import Logo from "../../public/images/Logo.png";
import Avatar from "../../public/images/Avatar.png";
import Customer from "../../public/images/customer.png";
import Deal from "../../public/images/deal.png";
import { FiPlus, FiUser, FiBriefcase, FiLogOut } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  const deals = useSelector((state) => state.deals.deals);

  const getNextAppointment = () => {
    if (deals.length === 0) return null;

    const upcomingDeals = deals.filter((deal) => new Date(deal.date) > new Date());
    if (upcomingDeals.length === 0) return null;

    // Sorting by the nearest date
    const sortedDeals = upcomingDeals.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
    return sortedDeals[0];
  };

  const nextAppointment = getNextAppointment();

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchDeals());
  }, [dispatch]);

  const handleClearDeals = () => {
    dispatch(clearDeals());
  };

  return (
    <>
      {/* Navigation */}
      <div className="nav flex justify-between items-center pe-4 md:pe-8 py-4 bg-[#F6FAFDE5]">
        <div className="logo flex items-center gap-2">
          <div className="w-[90px] flex justify-center">
            <img src={Logo} alt="Logo" className="w-[46px] h-[46px]" />
          </div>
          <span className="font-bold text-xl lg:text-2xl" style={{ color: "#092C4C" }}>Dashboard</span>
        </div>
        <div className="flex gap-4 items-center relative">
          {/* Add New Button */}
          <div className="relative dropdown-container">
            <button
              className="bg-[#514EF3] cursor-pointer text-sm md:text-[16px] rounded-full text-white py-2 px-3 flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
                setAvatarDropdownOpen(false);
              }}
            >
              Add New <FiPlus className="text-white" />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 text-gray-600 font-light border-b border-gray-300">
                  Add New <span className="cursor-pointer" onClick={() => setDropdownOpen(false)}><IoMdClose className="text-[20px]" /></span>
                </div>
                <button className="flex items-center justify-between cursor-pointer w-full px-4 py-2 hover:bg-gray-100 text-gray-700" onClick={() => navigate("/add-deal")}>
                  <FiBriefcase className="text-gray-500 mr-2" /> Deal <FaLongArrowAltRight className="text-gray-500 ml-auto" />
                </button>
                <hr className="border-gray-300" />
                <button className="flex items-center justify-between cursor-pointer w-full px-4 py-2 hover:bg-gray-100 text-gray-700" onClick={() => navigate("/add-customer")}>
                  <FiUser className="text-gray-500 mr-2" /> Customer <FaLongArrowAltRight className="text-gray-500 ml-auto" />
                </button>
              </div>
            )}
          </div>

          {/* Avatar with Dropdown */}
          <div className="relative dropdown-container">
            <img
              src={Avatar}
              alt="User Avatar"
              className="w-[38px] md:w-[46px] h-[38px] md:h-[46px] rounded-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setAvatarDropdownOpen(!avatarDropdownOpen);
                setDropdownOpen(false);
              }}
            />
            {avatarDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <button className="flex items-center w-full cursor-pointer px-4 py-2 text-red-600 hover:bg-gray-100" onClick={() => {
                  localStorage.removeItem("authToken");
                  navigate("/login");
                }}>
                  <FiLogOut className="mr-2" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main className="w-full flex">
        <Sidebar />
        {/* Grid Layout */}
        <div className="w-full py-4 px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-4 text-[#092C4C] items-start justify-center">
          {/* left side cards */}
          <div className="lg:col-span-1">
            <div className="text-white p-3 bg-[#514EF3] rounded-xl">
              <div className="flex items-center justify-between">
                <p className="text-[18px] font-bold">Next Appointment</p>
                <span className="w-[10px] h-[10px] rounded-full bg-white"></span>
              </div>
              {nextAppointment ? (
                <div>
                  <div className="flex gap-2 items-center py-3">
                    <img src={Avatar} alt="Avatar" className="rounded-full w-[44px]" />
                    <div className="flex flex-col gap-2 text-[14px]">
                      <p className="font-bold">{nextAppointment.address}</p>
                      <span className="text-sm text-[#D6E1E6]">{nextAppointment.address}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-[14px] py-3">
                    <p className="text-[#D6E1E6]">Appointment Date</p>
                    <span className="font-bold">{new Date(nextAppointment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-4 items-center py-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-[#D6E1E6]">Room Area</p>
                      <span className="font-bold">{nextAppointment.area} M<sup>2</sup></span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[#D6E1E6]">People</p>
                      <span className="font-bold">{nextAppointment.people}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                      <p className="text-[#D6E1E6]">Price</p>
                      <span className="font-bold">{nextAppointment.price}</span>
                    </div>
                    <button className="rounded-full py-3 px-5 cursor-pointer bg-white text-black text-[14px]">See Detail</button>
                  </div>
                </div>
              ) : (
                <p>No upcoming appointments</p>
              )}
            </div>

            <CardOfNumbers length={customers.length} image={Customer} data="Customers" />
            <CardOfNumbers length={deals.length} image={Deal} data="Deals" />
          </div>

          {/* middle side cards */}
          <div className="lg:col-span-2 py-3 px-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-[18px] font-bold">Recent Deals</h2>
              <button className="text-[14px] text-[#514EF3] cursor-pointer">View All</button>
            </div>
            <div className="content">
              {deals.length === 0 ? <p>No Deals</p> : deals.map((deal) => <DealData key={deal.id} deal={deal} />)}
              <button
                onClick={handleClearDeals}
                className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 block cursor-pointer ml-auto"
              >
                Clear All Deals
              </button>
            </div>
          </div>

          {/* right side cards */}
          <div className="lg:col-span-1 p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-[18px] font-bold">Customers</h2>
              <button className="text-[14px] text-[#514EF3] cursor-pointer">View All</button>
            </div>
            {customers.length === 0 ? <p>No Customers</p> : customers.map((customer) => {
              const uniqueKey = customer.id + (customer.name || '');
              return <CustomersData key={uniqueKey} customer={customer} />;
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
