import React from "react";

export default function Edit({
  setNewName,
  setImage,
  editProfile,
  myData,
  userImage,
  setEditModal,
  newName,
}) {
  return (
    <div className="absolute  bg-meshki bg-opacity-70 z-10 flex w-full h-full">
      <div className="bg-tosi bg-gradient-to-t  from-meshki shadow-xl rounded-lg m-auto p-5 flex gap-10 justify-center items-center flex-col">
        <div className=" w-full">
          <button
            className="bg-orange w-6 rounded-full"
            onClick={() => setEditModal(false)}
          >
            X
          </button>
        </div>
        <div className="space-y-5">
          <img
            className="w-36 rounded-full h-36
            object-cover"
            src={
              myData.img === null
                ? userImage
                : `http://localhost:80/${myData.img}`
            }
          />
          <input
            className=""
            onChange={(e) => setImage(e.target.files[0])}
            name="img"
            accept="image/*"
            type="file"
          />
        </div>
        <div className="flex flex-col  w-full ">
          <label className="text-sefid">Enter New Name</label>
          <input
            value={newName}
            className="p-2 rounded-md w-2/3 "
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <button onClick={() => editProfile()} className="btn">
          Submit
        </button>
      </div>
    </div>
  );
}
