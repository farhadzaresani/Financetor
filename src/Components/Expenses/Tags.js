import React from "react";

export default function Tags({
  openTagList,
  tagData,
  isSelect,
  setOpenTagList,
}) {
  return (
    <div>
      <div className="flex mt-8 ml-2 gap-1 ">
        <label
          onClick={() => {
            setOpenTagList(!openTagList);
          }}
          className={` cursor-pointer text-xl text-sefid transition-all duration-300 `}
        >
          Tag:
        </label>

        <ul
          className={`
                
                 rounded-lg absolute transition-all  ml-12 `}
        >
          <div
            className={`bg-sefid p-2 
             rounded-lg absolute  transition-all duration-300 `}
          >
            <div
              className={` ${
                openTagList ? " z-20 " : "h-4 "
              } transition-all duration-700 max-h-32 overflow-y-scroll`}
            >
              {tagData.map((item, i) => {
                return (
                  <li
                    onClick={() => isSelect(i)}
                    className={`${
                      item.isSelect === true ? "bg-abitire" : ""
                    } border-b-[1px] rounded-sm p-1 cursor-pointer border-meshki border-opacity-40`}
                    key={i}
                    value={item._id}
                  >
                    {item.name}
                  </li>
                );
              })}
            </div>
          </div>
          <div
            onClick={() => {
              setOpenTagList(!openTagList);
            }}
            className={`${
              openTagList ? "" : "z-10 relative"
            } bg-sefid  rounded-md p-1 w-36 cursor-pointer`}
          >
            <p className="">Select...</p>
          </div>
        </ul>
      </div>
    </div>
  );
}
