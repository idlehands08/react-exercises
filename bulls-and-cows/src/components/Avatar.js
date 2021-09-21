import "./Avatar.css";

function Avatar({ imgFile, className }) {
  return (
    <div className={className}>
      <img src={imgFile} alt="" />
    </div>
  );
}

export default Avatar;
