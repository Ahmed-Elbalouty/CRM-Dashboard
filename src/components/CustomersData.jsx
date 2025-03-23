import { BiEditAlt } from "react-icons/bi";
import Avatar from "../../public/images/Avatar.png";

function CustomersData({ customer }) {
  return (
    <div key={customer.id} className="flex justify-between items-center py-4 hover:bg-gray-100 px-2 rounded-md">
      <div className="flex gap-2 items-center">
        <img src={Avatar} alt="Avatar" className="rounded-full w-[44px] h-[44px]" />
        <div className="flex flex-col gap-2">
          <p className="font-bold">{customer.firstName} {customer.lastName}</p>
          <span className="text-[#7E92A2] text-[14px]">{customer.email}</span>
        </div>
      </div>
      <BiEditAlt className="text-[25px]" />
    </div>
  );
}

export default CustomersData;
