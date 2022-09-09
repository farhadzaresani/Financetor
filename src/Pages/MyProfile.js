import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Cookies from "universal-cookie";
import userImage from "../Assets/Images/userImage.png";
import Edit from "../Components/EditProfile/Edit";
import Loading from "../Components/Loading/Loading";
import TagsChart from "../Components/ProfilePage/TagsChart";
import ExpensesChart from "../Components/ProfilePage/ExpensesChart";

const MY_DATA = gql`
  query Me {
    me {
      _id
      name
      username
      img
      myTags {
        _id
        name
        color
      }
      myExpenses {
        _id
        amount
        tags {
          _id
          name
          color
        }
        date
        address {
          MunicipalityZone
          Neighbourhood
          FormattedAddress
          Place
        }
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
      refetch();
      if (msg === "ok!")
        return window.location.assign(
          `http://localhost:3000/Dashboard/MyProfile`
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading) return setNewName(myData.name);
  }, [data]);

  if (error) return <div>error</div>;
  if (loading) return <Loading />;
  console.log(data);
  const myData = data.me;
  const tag = data.me.myTags;
  const expenses = data.me.myExpenses;

  return (
    <>
      {editModal ? (
        <Edit
          newName={newName}
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
              className="border-2 border-abi w-36 h-36 rounded-full object-cover"
              src={
                myData.img === null
                  ? userImage
                  : `http://localhost:80/${myData.img}`
              }
            />
            <button
              onClick={() => setEditModal(true)}
              className="opacity-50 text-sefid ml-6 hover:opacity-100 transition-all "
            >
              Edit Profile
            </button>
          </div>
          <div className="flex px-10 text-sefid">
            <h1>{myData.name}</h1>
          </div>
        </div>
        <div className="py-10 flex">
          <TagsChart tag={tag} />

          <ExpensesChart expenses={expenses} />
        </div>
      </div>
    </>
  );
}
