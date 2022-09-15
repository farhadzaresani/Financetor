import React from "react";
import { CloseCircle } from "iconsax-react";
export default function CreateTag({
  setCreate,
  setTagData,
  createTag,
  tagData,
}) {
  return (
    <div className="flex justify-center ">
      <div className=" bg-meshki/50 absolute  flex  w-full h-full z-10"></div>
      <div className="bg-tosi bg-gradient-to-t absolute z-20  from-meshki shadow-xl  flex flex-col mt-20  rounded-lg gap-10 p-5 m-auto">
        <CloseCircle
          size="32"
          color="#FF8A65"
          variant="Bulk"
          className=" cursor-pointer absolute"
          onClick={() => setCreate(false)}
        />
        <div className="m-auto">
          <h1 className="uppercase font-bold text-sefid">Create Tag</h1>
        </div>
        <div className="flex flex-col">
          <label className="text-sefid">Enter name:</label>
          <input
            className="p-1 rounded-md outline-none"
            value={tagData.name}
            onChange={(e) => setTagData({ ...tagData, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sefid">Enter color:</label>
          <input
            type="color"
            className="p-1 w-full rounded-md outline-none"
            value={tagData.color}
            onChange={(e) => setTagData({ ...tagData, color: e.target.value })}
          />
        </div>
        <button className="btn" onClick={() => createTag()}>
          Submit
        </button>
      </div>
    </div>
  );
}
