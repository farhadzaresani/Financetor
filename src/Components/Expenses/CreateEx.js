import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Geo from "./Geo";

const GET_TAG = gql`
  query GetMyTags {
    getMyTags {
      name
      _id
    }
  }
`;

export default function CreateEx({
  setCreate,
  expenData,
  setExpenData,
  createExpenses,
  address,
  setAddress,
}) {
  const { loading, error, data } = useQuery(GET_TAG);

  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;
  //   console.log(data.getMyTags);
  const tagData = data.getMyTags;
  const addressData = expenData.address;
  // console.log(expenData.address.formattedAddress);
  return (
    <div className=" bg-meshki/50 absolute  flex gap-5 w-full h-full z-10">
      <div className="bg-tosi flex flex-col rounded-lg gap-10 p-5 m-auto">
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
              // value={address.formattedAddress}
              onChange={(e) =>
                setAddress({
                  ...expenData.address,
                  FormattedAddress: e.target.value,
                })
              }
            />
            <label className="text-sefid">Municipality Zone:</label>
            <input
              type="number"
              className="p-1 rounded-md outline-none"
              // value={expenData.address.municipalityZone}
              onChange={(e) =>
                setAddress({
                  ...expenData.address,
                  MunicipalityZone: e.target.value,
                })
              }
            />
            <label className="text-sefid">Neighbourhood:</label>
            <input
              className="p-1 rounded-md outline-none"
              //   value={expenData.address.neighbourhood}
              onChange={(e) =>
                setAddress({
                  ...expenData.address,
                  Neighbourhood: e.target.value,
                })
              }
            />
            <label className="text-sefid">Place:</label>
            <input
              className="p-1 rounded-md outline-none"
              //   value={expenData.address.neighbourhood}
              onChange={(e) =>
                setAddress({
                  ...expenData.address,
                  Place: e.target.value,
                })
              }
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
            <div className="flex flex-col gap-1">
              <label className="text-sefid">Tag:</label>
              <select
                className="p-2 w-56 rounded-lg"
                onChange={(e) =>
                  setExpenData({
                    ...expenData,
                    tags: e.target.value,
                  })
                }
              >
                <option>Select One...</option>
                {tagData.map((item, i) => {
                  return (
                    <option key={i} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <Geo expenData={expenData} setExpenData={setExpenData} />
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
