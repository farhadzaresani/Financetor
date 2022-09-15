import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import CreateEx from "../Components/Expenses/CreateEx";
import Loading from "../Components/Loading/Loading";
import DeleteEx from "../Components/Expenses/DeleteEx";
import { Trash, Add } from "iconsax-react";

const CREATE_EXPENSES = gql`
  mutation Create_expense($data: ExpenseInfo!) {
    create_expense(data: $data) {
      status
      msg
    }
  }
`;
const GET_EXPENSES = gql`
  query {
    getMyExpenses {
      _id
      amount
      tags {
        _id
        name
        color
      }
      geo {
        lat
        lon
      }
      date
      address {
        MunicipalityZone
        Neighbourhood
        FormattedAddress
        Place
      }
    }

    getMyTags {
      name
      _id
      color
    }
  }
`;

const DELETE_EXPENSES = gql`
  mutation Delete_expense($id: ID!) {
    delete_expense(_id: $id) {
      status
      msg
    }
  }
`;

export default function MyExpenses() {
  const mapRef = useRef(null);
  const { loading, error, data, refetch } = useQuery(GET_EXPENSES);
  const [tagData, setTagData] = useState();
  const [expen] = useMutation(CREATE_EXPENSES);
  const [remove] = useMutation(DELETE_EXPENSES);
  const [create, setCreate] = useState(false);
  const [thisId, setThisId] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [expenData, setExpenData] = useState({
    address: {
      FormattedAddress: "",
      MunicipalityZone: "",
      Neighbourhood: "",
      Place: "",
    },
    amount: "",
    date: "",
    geo: {
      lat: 0,
      lon: 0,
    },
    tags: "",
  });
  console.log(expenData);

  console.log(mapRef);

  const createExpenses = async () => {
    try {
      const {
        data: {
          create_expense: { msg, status },
        },
      } = await expen({
        variables: {
          data: {
            ...expenData,
            geo: {
              ...expenData.geo,
              lat: parseFloat(mapRef.current.getCenter().lat),
              lon: parseFloat(mapRef.current.getCenter().lng),
            },
          },
        },
      });
      console.log(msg);
      console.log(status);
      if (msg === "ok") return setCreate(false), refetch();
    } catch (error) {}
  };
  const deleteExpenses = async () => {
    try {
      const {
        data: {
          delete_expense: { msg, status },
        },
      } = await remove({
        variables: { id: thisId },
      });
      console.log(msg);
      console.log(status);
      if (msg === "ok") return setDeleteModal(false), refetch();
    } catch (error) {}
  };
  const removeItem = (id) => {
    setThisId(id);
    setDeleteModal(true);
  };

  useEffect(() => {
    if (data) {
      const newTag = data.getMyTags.map((item) => {
        item = { ...item, isSelect: false };
        return item;
      });
      setTagData(newTag);
    }
  }, [data]);
  useEffect(() => {
    if (tagData) {
      const toSendTag = tagData
        .filter((tag) => tag.isSelect === true)
        .map((item) => {
          return item._id;
        });
      expenData.tags = toSendTag;
    }
  }, [tagData]);
  if (error) return <div>error</div>;
  if (loading) return <Loading />;
  console.log(data);
  return (
    <div>
      {deleteModal ? (
        <DeleteEx
          setDeleteModal={setDeleteModal}
          deleteExpenses={deleteExpenses}
        />
      ) : null}
      {create ? (
        <CreateEx
          setCreate={setCreate}
          setExpenData={setExpenData}
          expenData={expenData}
          createExpenses={createExpenses}
          setTagData={setTagData}
          tagData={tagData}
          mapRef={mapRef}
        />
      ) : null}

      <div className="text-sefid w-[80vw] pb-36 pt-20 m-auto min-h-[150vh]  lg:min-h-screen ">
        <div className="flex   justify-between">
          {/* <button className="btn mb-10" onClick={() => setCreate(true)}>
            Create +
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
          <h1 className="text-4xl font-[fantasy] "> EXPENSES</h1>
        </div>
        <div className="flex flex-col gap-5">
          {data.getMyExpenses.map((item, i) => {
            return (
              <div
                className="bg-tosi rounded-md flex justify-between items-center p-2"
                key={i}
              >
                <div className="">
                  <h1 className="flex gap-2">
                    <p className="opacity-40">Amount:</p>
                    {item.amount}
                  </h1>
                  <h1 className="flex gap-2 text-sm opacity-40">{item.date}</h1>
                </div>

                <Trash
                  className="  opacity-70 cursor-pointer rounded-sm"
                  onClick={() => removeItem(item._id)}
                  size="32"
                  color="red"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
