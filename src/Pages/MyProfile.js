import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Cookies from "universal-cookie";
import userImage from "../Assets/Images/userImage.png";
import Edit from "../Components/EditProfile/Edit";
import Loading from "../Components/Loading/Loading";

const MY_DATA = gql`
  query Me {
    me {
      _id
      name
      username
      img
      myTags {
        name
      }
    }
  }
`;
const EDIT_PROFILE = gql`
  mutation EditMe($name: String!, $img: Upload) {
    editMe(name: $name, img: $img) {
      status
      msg
    }
  }
`;

export default function MyProfile() {
  const cookie = new Cookies();
  const { loading, error, data, refetch } = useQuery(MY_DATA);
  const [edit] = useMutation(EDIT_PROFILE);
  const [editModal, setEditModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [image, setImage] = useState(null);
  // const FormData = new FormData();

  const editProfile = async () => {
    try {
      const {
        data: {
          editMe: { msg, status },
        },
      } = await edit({
        variables: { name: newName, img: image },
      });
      console.log(msg);
      console.log(status);
      if (msg === "ok!") return refetch(), setEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return <div>error</div>;
  if (loading) return <Loading />;

  const myData = data.me;
  const tag = data.me.myTags;
  console.log(myData.img);
  return (
    <>
      {editModal ? (
        <Edit
          setNewName={setNewName}
          setImage={setImage}
          editProfile={editProfile}
          myData={myData}
          userImage={userImage}
          setEditModal={setEditModal}
        />
      ) : null}
      <div className="w-[80%] min-h-screen mx-auto flex gap-10 flex-col p-2">
        <h1 className="text-sefid  uppercase mx-auto">{myData.username}</h1>
        <div className="space-y-10">
          <div className=" ">
            <img
              className="w-36 h-36 rounded-full object-cover"
              src={
                myData.img === null
                  ? userImage
                  : `http://localhost:80/${myData.img}`
              }
            />
            <button
              onClick={() => setEditModal(true)}
              className="opacity-50 text-sefid ml-6 "
            >
              edit profile
            </button>
          </div>
          <div className="flex px-10 text-sefid">
            <h1>{myData.name}</h1>
          </div>
        </div>
        <div className="py-10">
          <h1 className="text-sefid uppercase opacity-40 font-bold py-5 ">
            Tags
          </h1>
          <div className="flex gap-5 px-10 overflow-auto">
            {tag.map((tg, i) => {
              return (
                <h1
                  className="bg-tosi text-sefid flex justify-center items-center rounded-lg p-2"
                  key={i}
                >
                  {tg.name}
                </h1>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
