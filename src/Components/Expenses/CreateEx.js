import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Geo from "./Geo";

export default function CreateEx({
  setCreate,
  expenData,
  setExpenData,
  createExpenses,
  setTagData,
  tagData,
}) {
  const [openTagList, setOpenTagList] = useState(false);

  const isSelect = (i) => {
    const clone = [...tagData];
    clone[i].isSelect = !clone[i].isSelect;
    setTagData(clone);
  };

  return (
    <div className="flex justify-center ">
      <div
        onClick={() => setCreate(false)}
        className=" bg-meshki/50 absolute  flex gap-5 w-full h-full z-10"
      ></div>
      <div className="bg-tosi bg-gradient-to-t absolute z-20 mt-20   from-meshki shadow-xl  flex flex-col rounded-lg gap-10 p-5 ">
        <button
          className="bg-orange w-6 rounded-full"
          onClick={() => setCreate(false)}
        >
          X
        </button>
        <div className="flex gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sefid">Formatted Address:</label>
            <input
              className="p-1 rounded-md outline-none"
              onChange={(e) =>
                (expenData.address.FormattedAddress = e.target.value)
              }
            />
            <label className="text-sefid">Municipality Zone:</label>
            <input
              type="number"
              className="p-1 rounded-md outline-none"
              onChange={(e) =>
                (expenData.address.MunicipalityZone = parseFloat(
                  e.target.value
                ))
              }
            />
            <label className="text-sefid">Neighbourhood:</label>
            <input
              className="p-1 rounded-md outline-none"
              onChange={(e) =>
                (expenData.address.Neighbourhood = e.target.value)
              }
            />
            <label className="text-sefid">Place:</label>
            <input
              className="p-1 rounded-md outline-none"
              onChange={(e) => (expenData.address.Place = e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sefid">amount:</label>
            <input
              type="number"
              step="0.01"
              className="p-1 rounded-md outline-none"
              //   value={expenData.amount}
              onChange={(e) =>
                setExpenData({
                  ...expenData,
                  amount: parseFloat(e.target.value),
                })
              }
            />
            <label className="text-sefid">date:</label>
            <input
              type="date"
              className="p-1 rounded-md outline-none"
              //   value={expenData.date}
              onChange={(e) =>
                setExpenData({
                  ...expenData,
                  date: e.target.value,
                })
              }
            />
            <div className="flex mt-5 gap-1">
              <label
                onClick={() => {
                  setOpenTagList(!openTagList);
                }}
                className="text-sefid"
              >
                Tag:
              </label>
              <ul
                className={`${
                  openTagList ? "" : "hidden"
                }  rounded-lg absolute transition-all  ml-10 `}
              >
                {/* <option>Select One...</option> */}
                <div className="bg-sefid p-2 w-36  rounded-lg ">
                  {tagData.map((item, i) => {
                    // console.log(item.isSelect);

                    return (
                      <li
                        onClick={() => isSelect(i)}
                        className={`${
                          item.isSelect === true ? "bg-abitire" : ""
                        } border-b-[1px] cursor-pointer border-meshki border-opacity-40`}
                        key={i}
                        value={item._id}
                      >
                        {item.name}
                      </li>
                    );
                  })}
                </div>
              </ul>
            </div>
            {/* <Geo expenData={expenData} setExpenData={setExpenData} /> */}
          </div>
        </div>
        <button
          disabled={!expenData}
          className={`disabled:opacity-50  btn w-20`}
          onClick={() => createExpenses()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
