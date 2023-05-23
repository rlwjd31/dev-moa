function Tags({ tagName, className }) {
  return (
    <div
      className={`px-[15px] py-[6px] rounded-full border-solid border mr-[16px] ${className}`}
    >
      {tagName}
    </div>
  );
}

export default Tags;
