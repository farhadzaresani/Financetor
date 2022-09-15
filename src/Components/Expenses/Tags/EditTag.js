import React from "react";
import { CloseCircle } from "iconsax-react";
export default function EditTag({ setOnEdit, newData, setNewData, editTag }) {
  return (
    <div>
      <div className=" bg-meshki/50 rounded-lg absolute flex w-full h-full z-10">
        <div className="bg-tosi bg-gradient-to-t  from-meshki shadow-xl  flex flex-col rounded-lg gap-10 p-5 m-auto">
          <CloseCircle
            size="32"
            color="#FF8A65"
            variant="Bulk"
            className=" cursor-pointer absolute"
            onClick={() => setOnEdit(false)}
          />

          <h1 className="m-auto uppercase text-sefid font-bold">Edit Tag</h1>

          <div className="flex flex-col">
            <label className="text-sefid">Enter new name:</label>
            <input
              className="p-1 rounded-md outline-none"
              value={newData.name}
              onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            />
          </div>
          <div className="flex gap-3">
            <label className="text-sefid">Enter new color:</label>
            <input
              type="color"
              className="p-1  rounded-md outline-none"
              value={newData.color}
              onChange={(e) =>
                setNewData({ ...newData, color: e.target.value })
              }
            />
          </div>
          <button className="btn" onClick={() => editTag()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
