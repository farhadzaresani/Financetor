import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Geo from "./Geo";
import Tags from "./Tags";
import { CloseCircle } from "iconsax-react";

export default function CreateEx({
  setCreate,
  expenData,
  setExpenData,
  createExpenses,
  setTagData,
  tagData,
  mapRef,
}) {
  const [openTagList, setOpenTagList] = useState(false);

  const isSelect = (i) => {
    const clone = [...tagData];
    clone[i].isSelect = !clone[i].isSelect;
    setTagData(clone);
  };

  return (
    <div className="flex justify-center  ">
      <div
        onClick={() => setCreate(false)}
        className=" bg-meshki/50 absolute  w-full h-full z-10"
      ></div>
      <div className="bg-tosi max-w-[100%] bg-gradient-to-t absolute z-20 mt-20    from-meshki shadow-xl  flex flex-col rounded-lg gap-10 p-5 ">
        <div className="m-auto">
          <h2 className="font-bold uppercase text-sefid "> Create Expenses</h2>
        </div>

        <CloseCircle
          size="32"
          color="#FF8A65"
          variant="Bulk"
          className=" cursor-pointer absolute"
          onClick={() => setCreate(false)}
        />

        <div className=" md:flex gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sefid">Formatted Address:</label>
            <input
              className="p-1 rounded-md outline-none"
              onChange={(e) => {
                const clone = JSON.parse(JSON.stringify(expenData));
                clone.address.FormattedAddress = e.target.value;
                setExpenData(clone);
              }}
            />
            <label className="text-sefid">Municipality Zone:</label>
            <input
              type="number"
              className="p-1 rounded-md outline-none"
              onChange={(e) => {
                const clone = JSON.parse(JSON.stringify(expenData));
                clone.address.MunicipalityZone = parseFloat(e.target.value);
                setExpenData(clone);
              }}
            />
            <label className="text-sefid">Neighbourhood:</label>
            <input
              className="p-1 rounded-md outline-none"
              onChange={(e) => {
                const clone = JSON.parse(JSON.stringify(expenData));
                clone.address.Neighbourhood = e.target.value;
                setExpenData(clone);
              }}
            />
            <label className="text-sefid">Place:</label>
            <input
              className="p-1 rounded-md outline-none"
              onChange={(e) => {
                const clone = JSON.parse(JSON.stringify(expenData));
                clone.address.Place = e.target.value;
                setExpenData(clone);
              }}
            />
            <Tags
              openTagList={openTagList}
              tagData={tagData}
              isSelect={isSelect}
              setOpenTagList={setOpenTagList}
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
            <Geo
              expenData={expenData}
              setExpenData={setExpenData}
              mapRef={mapRef}
            />
          </div>
        </div>
        <div className="flex ">
          <button
            disabled={!expenData}
            className={`disabled:opacity-50  btn  `}
            onClick={() => createExpenses()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
