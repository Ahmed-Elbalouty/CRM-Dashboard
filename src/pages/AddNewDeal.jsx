import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDeal } from "../redux/dealsSlice"; // Import the addDeal action
import { useNavigate } from "react-router-dom"; // For navigation after save

function AddNewDeal() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    area: "",
    people: "",
    date: "",
    instructions: "",
    roomAccess: "",
    price: "",
  });

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the action to save the deal to Firebase
    dispatch(addDeal(formData))
      .then(() => {
        // After the deal is added, navigate to the home page
        navigate("/");
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error adding deal:", error);
      });

    // Clear the form after submission
    setFormData({
      address: "",
      city: "",
      state: "",
      zipCode: "",
      area: "",
      people: "",
      date: "",
      instructions: "",
      roomAccess: "",
      price: "",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-2xl w-full max-w-md">
        <h2 className="text-[18px] font-bold mb-4">Add New Deal</h2>

        {/* Form Fields */}
        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#092C4C]" htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="bg-[#F6FAFD] p-2 w-full rounded-md"
            placeholder="Enter address"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#092C4C]" htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="bg-[#F6FAFD] p-2 w-full rounded-md"
            placeholder="Enter city"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#092C4C]" htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="bg-[#F6FAFD] p-2 w-full rounded-md"
            placeholder="Enter state"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#092C4C]" htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="bg-[#F6FAFD] p-2 w-full rounded-md"
            placeholder="Enter zip code"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#092C4C]" htmlFor="area">Room Area</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            className="bg-[#F6FAFD] p-2 w-full rounded-md"
            placeholder="Enter room area"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#092C4C]" htmlFor="people">Number of People</label>
          <input
            type="text"
            name="people"
            value={formData.people}
            onChange={handleInputChange}
            className="bg-[#F6FAFD] p-2 w-full rounded-md"
            placeholder="Enter number of people"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#092C4C]" htmlFor="date">Appointment Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="bg-[#F6FAFD] p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#092C4C]" htmlFor="instructions">Special Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            className="bg-[#F6FAFD] p-2 w-full rounded-md"
            placeholder="Enter any special instructions"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#092C4C]" htmlFor="roomAccess">Room Access</label>
          <input
            type="text"
            name="roomAccess"
            value={formData.roomAccess}
            onChange={handleInputChange}
            className="bg-[#F6FAFD] p-2 w-full rounded-md"
            placeholder="Enter room access details"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#092C4C]" htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="bg-[#F6FAFD] p-2 w-full rounded-md"
            placeholder="Enter price"
          />
        </div>

        <button
          type="submit"
          className="bg-[#514EF3] text-white px-4 py-3 rounded-full w-full cursor-pointer"
        >
          Save Deal
        </button>
      </form>
    </div>
  );
}

export default AddNewDeal;
