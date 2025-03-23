import Avatar from "../../public/images/Avatar.png";

function DealData({ deal }) {
  return (
    <div className="customer flex items-center gap-3 py-4 hover:bg-gray-100 px-2 rounded-md">
      <img src={Avatar} alt="Avatar" className="rounded-full w-[44px]" />
      <div className="flex flex-col flex-grow-1">
        <div className="flex justify-between items-center font-bold">
          <span>{deal.address}</span>
          <span>${deal.price}</span>
        </div>
        <div className="flex justify-between items-center text-[#7E92A2] text-[14px]">
          <span>{deal.address}, {deal.state}</span>
          <span>{deal.date}</span>
        </div>
      </div>
    </div>
  );
}

export default DealData;
