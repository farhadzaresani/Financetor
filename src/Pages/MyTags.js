import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Loading from "../Components/Loading/Loading";
import CreateTag from "../Components/Expenses/Tags/CreateTag";
import EditTag from "../Components/Expenses/Tags/EditTag";
import { Edit, Add } from "iconsax-react";

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
      const curentId = data.getMyTags.findIndex((item) => item._id === thisId);
      setNewData({
        name: data.getMyTags[curentId].name,
        color: data.getMyTags[curentId].color,
      });
    }
  }, [onEdit]);

  if (error) return <div>error</div>;
  if (loading) return <Loading />;
  console.log(newData);

  return (
    <div>
      {create && (
        <CreateTag
          setCreate={setCreate}
          setTagData={setTagData}
          createTag={createTag}
          tagData={tagData}
        />
      )}

      {onEdit && (
        <EditTag
          setOnEdit={setOnEdit}
          newData={newData}
          setNewData={setNewData}
          editTag={editTag}
        />
      )}
      <div className="min-h-screen text-sefid w-[80vw] pb-3 pt-20 m-auto ">
        <div className="flex   justify-between">
          {/* <button className="btn mb-10 " onClick={() => setCreate(true)}>
            Create+
          </button> */}
          <div
            onClick={() => setCreate(true)}
            className="flex justify-center items-center hover:scale-110 transition-all duration-300"
          >
            <h1 className="uppercase  text-3xl font-[fantasy] text-sabz">
              Create
            </h1>
            <Add
              className="cursor-pointer "
              size="40"
              color="#2E8B57"
              variant="Bulk"
            />
          </div>
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

                <Edit
                  className="cursor-pointer"
                  onClick={() => openEditModal(item._id)}
                  size="32"
                  color="#FF8A65"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
