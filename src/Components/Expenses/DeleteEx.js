import React from "react";

export default function DeleteEx({ deleteExpenses, setDeleteModal }) {
  return (
    <div>
      <div className=" bg-meshki/50 absolute  flex w-full h-full z-10">
        <div className="bg-tosi flex flex-col rounded-lg gap-10 p-5 m-auto">
          <button
            className="bg-orange w-6 rounded-full"
            onClick={() => setDeleteModal(false)}
          >
            X
          </button>
          <h1>Are you sure want to delete this expenses?</h1>
          <div className="flex ">
            <button className="btn w-20" onClick={() => deleteExpenses()}>
              Yes
            </button>
            <button className="btn w-20" onClick={() => setDeleteModal(false)}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
