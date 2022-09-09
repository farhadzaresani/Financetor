import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Loading from "../Components/Loading/Loading";

const CREATE_TAG = gql`
  mutation Create_tag($data: tagInfo!) {
    create_tag(data: $data) {
      status
      msg
    }
  }
`;

const GET_TAGS = gql`
  query GetMyTags {
    getMyTags {
      _id
      name
      color
    }
  }
`;

const EDIT_TAG = gql`
  mutation Edit_tag($id: ID!, $data: tagInfo!) {
    edit_tag(_id: $id, data: $data) {
      status
      msg
    }
  }
`;

export default function MyTags() {
  const [tagData, setTagData] = useState({ name: "", color: "" });
  const [newData, setNewData] = useState({ name: "", color: "" });
  const [thisId, setThisId] = useState();
  const [create, setCreate] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [tag] = useMutation(CREATE_TAG);
  const [edit] = useMutation(EDIT_TAG);
  const { loading, error, data, refetch } = useQuery(GET_TAGS);

  const createTag = async () => {
    try {
      const {
        data: {
          create_tag: { msg, status },
        },
      } = await tag({
        variables: { data: tagData },
      });
      console.log(msg);
      console.log(status);
      if (msg === "ok") {
        refetch();
      }
      setCreate(false);
    } catch (error) {}
  };

  const editTag = async () => {
    try {
      const {
        data: {
          edit_tag: { msg, status },
        },
      } = await edit({
        variables: { id: thisId, data: newData },
      });
      console.log(msg);
      console.log(status);
      if (msg === "ok") {
        refetch();
      }
      setOnEdit(false);
    } catch (error) {}
  };

  const openEditModal = (id) => {
    setOnEdit(true);
    setThisId(id);
    console.log(thisId);
  };
  useEffect(() => {
    if (thisId) {
      const curentId = data.getMyTags.findIndex((item) => item._id == thisId);
      setNewData({
        name: data.getMyTags[curentId].name,
        color: data.getMyTags[curentId].color,
      });
    }
  }, [onEdit]);

  if (error) return <div>error</div>;
  if (loading) return <Loading />;
  // console.log(newData);
  // console.log(data.getMyTags[1]._id);

  return (
    <div>
      {create ? (
        <div className=" bg-meshki/50 absolute  flex w-full h-full z-10">
          <div className="bg-tosi bg-gradient-to-t  from-meshki shadow-xl  flex flex-col rounded-lg gap-10 p-5 m-auto">
            <button
              className="bg-orange w-6 rounded-full"
              onClick={() => setCreate(false)}
            >
              X
            </button>
            <div className="flex flex-col">
              <label className="text-sefid">Enter name:</label>
              <input
                className="p-1 rounded-md outline-none"
                value={tagData.name}
                onChange={(e) =>
                  setTagData({ ...tagData, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sefid">Enter color:</label>
              <input
                type="color"
                className="p-1 w-full rounded-md outline-none"
                value={tagData.color}
                onChange={(e) =>
                  setTagData({ ...tagData, color: e.target.value })
                }
              />
            </div>
            <button className="btn w-20" onClick={() => createTag()}>
              Submit
            </button>
          </div>
        </div>
      ) : null}

      {onEdit ? (
        <div className=" bg-meshki/50 rounded-lg absolute flex w-full h-full z-10">
          <div className="bg-tosi bg-gradient-to-t  from-meshki shadow-xl  flex flex-col rounded-lg gap-10 p-5 m-auto">
            <button
              className="bg-orange w-6 rounded-full"
              onClick={() => setOnEdit(false)}
            >
              X
            </button>

            <div className="flex flex-col">
              <label className="text-sefid">Enter new name:</label>
              <input
                className="p-1 rounded-md outline-none"
                value={newData.name}
                onChange={(e) =>
                  setNewData({ ...newData, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sefid">Enter new color:</label>
              <input
                type="color"
                className="p-1 w-full rounded-md outline-none"
                value={newData.color}
                onChange={(e) =>
                  setNewData({ ...newData, color: e.target.value })
                }
              />
            </div>
            <button className="btn w-20" onClick={() => editTag()}>
              Submit
            </button>
          </div>
        </div>
      ) : null}
      <div className="min-h-screen text-sefid w-[80vw] pb-3 pt-20 m-auto ">
        <div className="flex  w-[55%] justify-between">
          <button className="btn mb-10" onClick={() => setCreate(true)}>
            Create +
          </button>
          <h1 className="text-4xl font-[fantasy] "> TAGS</h1>
        </div>
        <div className="flex flex-col gap-5">
          {data.getMyTags.map((item, i) => {
            return (
              <div
                className="bg-tosi rounded-md flex justify-between items-center p-2"
                key={i}
              >
                <div className="">
                  <h1 className="flex gap-2">
                    <p className="opacity-40">Name:</p>
                    {item.name}
                  </h1>
                  <h1 className="flex gap-2">
                    <p className="opacity-40">Color:</p>
                    {item.color}
                  </h1>
                </div>
                <button
                  className="bg-orange p-1 rounded-sm"
                  onClick={() => openEditModal(item._id)}
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
