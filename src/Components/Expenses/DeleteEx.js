import React from "react";

export default function DeleteEx({ deleteExpenses, setDeleteModal }) {
  return (
    <div>
      <div className=" bg-meshki/50 absolute  flex w-full h-full z-10">
        <div className="bg-tosi bg-gradient-to-t  from-meshki shadow-xl  flex flex-col rounded-lg gap-10 p-5 m-auto">
          <button
            className="bg-orange w-6 rounded-full"
            onClick={() => setDeleteModal(false)}
          >
            X
          </button>
          <h1 className="text-sefid font-bold">
            Are you sure want to delete this expenses?
          </h1>
          <div className="flex gap-5 ">
            <button className="btn w-20" onClick={() => deleteExpenses()}>
              Yes
            </button>
            <button
              className="text-sefid rounded uppercase font-bold border-2 border-dashed w-20"
              onClick={() => setDeleteModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
