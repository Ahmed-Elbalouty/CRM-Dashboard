function CardOfNumbers({ length, image, data }) {
  return (
    <div className="rounded-xl shadow-lg bg-white my-3 px-3 py-5 flex justify-between items-center">
      <div className="flex flex-col">
        <h3 className="text-[#7E92A2] text-[18px] font-semibold">{data}</h3>
        <span className="text-[48px]">{length}</span>
      </div>
      <img src={image} alt="Customer" className="w-[80px] h-[80px]" />
    </div>
  );
}

export default CardOfNumbers;
