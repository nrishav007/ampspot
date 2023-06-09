const DragAndDrop = ({ setProfileImage }) => {
  const dragOver = (e) => e.preventDefault();
  const dragEnter = (e) => e.preventDefault();
  const dragLeave = (e) => e.preventDefault();
  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setProfileImage(files[0]);
  };

  const handleUploadImage = (e) => {
    setProfileImage(e.target.files[0]);
  };

  return (
    <form method="POST" encType="multipart/form-data">
      <label htmlFor="imageUpload" className="cursor-pointer">
        <div className="xl:w-auto w-full  m-0 flex justify-center mt-4">
          <div
            className="border-dotted w-[max-content] mx-auto xl:mb-0 mb-4 
                   border-gray-light border-2 px-[22px] py-[15px]"
          >
            <figure className="w-full flex justify-center mb-[11px]">
              <img
                className="w-[1rem] h-[1rem] "
                src="./assets/icons/photo.png"
                alt="upload profile"
              />
            </figure>
            <div
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileDrop}
            >
              <div className="flex flex-col justify-center items-center text-black-darkest ">
                <strong className="mb-[8px] w-[max-content] tracking-wide font-gill">
                  Drag & Drop Photo
                </strong>
                <span className="text-red-light font-roboto ">
                  Browse on device
                </span>
                <input
                  type="file"
                  name="imageUpload"
                  className="hidden"
                  id="imageUpload"
                  onChange={(e) => handleUploadImage(e)}
                  accept=".jpg, .jpeg, .png"
                />
              </div>
            </div>
          </div>
        </div>
      </label>
    </form>
  );
};
export default DragAndDrop;
