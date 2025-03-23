import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "../redux/customersSlice";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddNewCustomer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCustomer((prev) => ({ ...prev, avatar: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let avatarURL = "";
      if (customer.avatar) {
        const avatarRef = ref(storage, `avatars/${customer.avatar.name}`);
        await uploadBytes(avatarRef, customer.avatar);
        avatarURL = await getDownloadURL(avatarRef);
      }

      const newCustomer = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        zipCode: customer.zipCode,
        avatar: avatarURL,
      };

      const docRef = await addDoc(collection(db, "customers"), newCustomer);
      dispatch(addCustomer({ id: docRef.id, ...newCustomer }));

      setCustomer({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        avatar: "",
      });

      // Navigate to the homepage after save
      navigate("/");

    } catch (error) {
      console.error("Error adding customer: ", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-2xl w-full max-w-2xl">
        <h2 className="text-[18px] font-bold mb-4 text-center">Add New Customer</h2>

        {/* Avatar */}
        {/* <div className="flex flex-col gap-2 py-4">
          <label htmlFor="avatar" className="font-bold">Avatar</label>
          <input type="file" id="avatar" name="avatar" onChange={handleFileChange} className="bg-[#F6FAFD] p-2 rounded-md" />
        </div> */}

        {/* Customer Info */}
        <div className="flex flex-col sm:flex-row gap-4 py-4">
          <div className="flex flex-col gap-2 flex-grow-1">
            <label className="font-bold">First Name</label>
            <input type="text" name="firstName" placeholder="First Name" value={customer.firstName} onChange={handleChange} className="bg-[#F6FAFD] p-2 rounded-md" required />
          </div>
          <div className="flex flex-col gap-2 flex-grow-1">
            <label className="font-bold">Last Name</label>
            <input type="text" name="lastName" placeholder="Last Name" value={customer.lastName} onChange={handleChange} className="bg-[#F6FAFD] p-2 rounded-md" required />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="flex flex-col sm:flex-row gap-4 py-4">
          <div className="flex flex-col gap-2 flex-grow-1">
            <label className="font-bold">Email</label>
            <input type="email" name="email" placeholder="Email" value={customer.email} onChange={handleChange} className="bg-[#F6FAFD] p-2 rounded-md" required />
          </div>
          <div className="flex flex-col gap-2 flex-grow-1">
            <label className="font-bold">Phone</label>
            <input type="tel" name="phone" value={customer.phone} placeholder="Phone" onChange={handleChange} className="bg-[#F6FAFD] p-2 rounded-md" required />
          </div>
        </div>

        {/* Address Info */}
        <div className="flex flex-col gap-2 py-4">
          <label className="font-bold">Address</label>
          <input type="text" name="address" value={customer.address} onChange={handleChange} placeholder="Address" className="bg-[#F6FAFD] p-2 rounded-md" required />
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" name="city" value={customer.city} onChange={handleChange} className="bg-[#F6FAFD] p-2 rounded-md flex-grow-1" placeholder="City" required />
            <input type="text" name="state" value={customer.state} onChange={handleChange} className="bg-[#F6FAFD] p-2 rounded-md flex-grow-1" placeholder="State" required />
          </div>
          <input type="text" name="zipCode" value={customer.zipCode} onChange={handleChange} className="bg-[#F6FAFD] p-2 rounded-md" placeholder="Zip Code" required />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-[#514EF3] text-white px-4 py-3 rounded-full cursor-pointer mx-auto block">
          Save Customer
        </button>
      </form>
    </div>
  );
}

export default AddNewCustomer;
