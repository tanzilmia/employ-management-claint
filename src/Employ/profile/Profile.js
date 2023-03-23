import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../contextApi/Authcontext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import Loadding from "../../component/Loadding";
const Profile = () => {
  const { user, Loading } = useContext(myContext);
  const [myDatas, setmyDatas] = useState([]);

  const [filtterArray, setfiltterArray] = useState([]);

  const [search, setsearch] = useState(false);
  const [totalCast, settotalCast] = useState(0);
  const [startdate, setstartdate] = useState(0);
  const date = moment().format("DD MM YY");

  useEffect(() => {
    axios
      .get(
        `https://employ-server.vercel.app/user/my-history?email=${user?.email}`
      )
      .then((res) => {
        if (res.data.message === "success") {
          setmyDatas(res.data.data);
        }
      })

      .catch((e) => console.log(e));
  }, [user?.email]);

  const handleFilter = (e) => {
    e.preventDefault();
    const startDate = e.target.startDate.value;
    setstartdate(startDate);
    const endDate = date;
    const filteredDate = myDatas.filter((obj) => {
      const dateParts = obj.date.split(" ");
      const objDate = new Date(
        `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
      );
      const startParts = startDate.split(" ");
      const start = new Date(
        `20${startParts[2]}-${startParts[1]}-${startParts[0]}`
      );
      const endParts = endDate.split(" ");
      const end = new Date(`20${endParts[2]}-${endParts[1]}-${endParts[0]}`);
      return objDate >= start && objDate <= end;
    });
    setsearch(true);
    setfiltterArray(filteredDate);
    const castSum = filteredDate.reduce((acc, obj) => acc + obj.costAmount, 0);
    settotalCast(castSum);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("table-to-pdf");
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${user?.name}-table.pdf`);
    });
  };

  if (Loading) {
    return <Loadding/>
  }
  return (
    <div>
      <h2 className="text-xl text-center mr-2 my-4">Hi , {user?.name} </h2>
      <div>
        <div>
          <div className="w-10/15 md:w-3/12 lg:w-3/12 mx-auto mt-5">
            <form onSubmit={handleFilter}>
              <input className="px-6 py-2"
                type="text"
                name="startDate"
                placeholder="Filter Like 05 04 23"
              />
              <input
                type="submit"
                className="bg-[#392abe] cursor-pointer text-[#fff] px-6 py-2"
                value="Filtter"
              />
            </form>
          </div>
          {search && (
            <div className="text-center">
              <h1 className="text-center text-2xl font-semibold">
                {" "}
                {` ${startdate} to ${date}`}{" "}
              </h1>
              <h1 className="text-center text-2xl font-semibold">
                {" "}
                {`Total Cast : ${totalCast} tk `}{" "}
              </h1>
              <button
                className="text-center text-2xl mt-5 bg-[#8fde85] px-4  font-semibold"
                onClick={handleDownloadPDF}
              >
                Download PDF
              </button>
            </div>
          )}
          <div className="flex justify-center w-8/12 mx-auto">
            {myDatas.length && search === false ? (
              <table className="table-auto w-full my-5 text-center text-sm">
                <thead class="bg-gray-200">
                  <tr className="sticky top-0 bg-gray-200">
                    <th className="px-4 py-2">Serial</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">reason</th>
                    <th className="px-4 py-2">costAmount</th>
                  </tr>
                </thead>
                <tbody>
                  {myDatas.map((data, index) => (
                    <tr key={data._id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2"> {index + 1} </td>
                      <td className="border px-4 py-2"> {data.date} </td>
                      <td className="border px-4 py-2"> {data.name} </td>
                      <td className="border px-4 py-2"> {data.reason} </td>
                      <td className="border px-4 py-2"> {data.costAmount} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                {filtterArray && (
                  <table
                    id="table-to-pdf"
                    className="table-auto w-full my-5 text-center text-sm"
                  >
                    <thead class="bg-gray-200">
                      <tr className="sticky top-0 bg-gray-200">
                        <th className="px-4 py-2">Serial</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">reason</th>
                        <th className="px-4 py-2">costAmount</th>
                        <th className="px-4 py-2">totalCast</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtterArray.map((data, index) => (
                        <tr key={data._id} className="hover:bg-gray-100">
                          <td className="border px-4 py-2"> {index + 1} </td>
                          <td className="border px-4 py-2"> {data.date} </td>
                          <td className="border px-4 py-2"> {data.name} </td>
                          <td className="border px-4 py-2"> {data.reason} </td>
                          <td className="border px-4 py-2">
                            {" "}
                            {data.costAmount}{" "}
                          </td>
                          <td className="border px-4 py-2"> {data.cast} </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="hover:bg-gray-100">
                        <td colSpan="4" className="border px-4 py-2"></td>
                        <th className="border px-4 py-2">total Cast :</th>
                        <td className="border px-4 py-2">{totalCast}</td>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// {
//   myDatas.length > 0 ?
//   <table className="table-auto w-full text-center text-sm">
//   <thead class="bg-gray-200">
//     <tr className="sticky top-0 bg-gray-200">
//       <th className="px-4 py-2">Serial</th>
//       <th className="px-4 py-2">Date</th>
//       <th className="px-4 py-2">reason</th>
//       <th className="px-4 py-2">costAmount</th>

//     </tr>
//   </thead>
//   <tbody>
//    {
//       myDatas.map((data,index) =>  <tr key={data._id} className="hover:bg-gray-100">
//       <td className="border px-4 py-2"> {index + 1} </td>
//       <td className="border px-4 py-2"> {data.date} </td>
//       <td className="border px-4 py-2"> {data.reason} </td>
//       <td className="border px-4 py-2"> {data.costAmount} </td>
//     </tr>)
//    }

//   </tbody>
// </table>
//   :
//  <div>
//   <h2>No History Abailable</h2>
//  </div>

// }
