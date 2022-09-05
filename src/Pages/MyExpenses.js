import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import CreateEx from "../Components/Expenses/CreateEx";
import Loading from "../Components/Loading/Loading";
import DeleteEx from "../Components/Expenses/DeleteEx";

const CREATE_EXPENSES = gql`
  mutation Create_expense($data: ExpenseInfo!) {
    create_expense(data: $data) {
      status
      msg
    }
  }
`;
const GET_EXPENSES = gql`
  query GetMyExpenses {
    getMyExpenses {
      _id
      amount
      tags {
        name
      }
      date
      address {
        FormattedAddress
      }
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
  const { loading, error, data, refetch } = useQuery(GET_EXPENSES);
  const [expen] = useMutation(CREATE_EXPENSES);
  const [remove] = useMutation(DELETE_EXPENSES);
  const [create, setCreate] = useState(false);
  const [thisId, setThisId] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [address, setAddress] = useState({
    formattedAddress: "",
    municipalityZone: 8,
    neighbourhood: "sd",
    place: "asd",
  });
  const [expenData, setExpenData] = useState({
    address: {
      FormattedAddress: address.formattedAddress,
      MunicipalityZone: address.municipalityZone,
      Neighbourhood: address.neighbourhood,
      Place: address.place,
    },
    amount: "",
    date: "",
    geo: {
      lat: 355501,
      lon: 51515,
    },
    tags: "",
  });

  const createExpenses = async () => {
    try {
      const {
        data: {
          create_expense: { msg, status },
        },
      } = await expen({
        variables: { data: expenData },
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
          expenData={expenData}
          setExpenData={setExpenData}
          address={address}
          setAddress={setAddress}
          createExpenses={createExpenses}
        />
      ) : null}

      <div className="text-sefid w-[80vw] pb-36 pt-20 m-auto min-h-screen ">
        <div className="flex  w-[55%] justify-between">
          <button className="btn mb-10" onClick={() => setCreate(true)}>
            Create +
          </button>
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
                <button
                  className="bg-red p-1 rounded-sm"
                  onClick={() => removeItem(item._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
