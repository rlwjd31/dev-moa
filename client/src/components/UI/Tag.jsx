import Button from './Button';

function Tag({ tagName, className, onClick }) {
  const TagStyle = `cursor-pointer px-4 py-[0.375rem] rounded-full border-solid border mr-4 border-black3 ${className}`;
  return (
    <Button onClick={() => onClick(tagName)} className={TagStyle}>
      {tagName}
    </Button>
  );
}

export default Tag;
