import ReChart from "./ReChart";
import Sidebar from "./components/sidebarProjections/Sidebar";
import { baseLineConditions } from "./data/mockData";
import { simulateYears } from "./helpers/simulatonHelper";
import { userInformation } from "./data/mockData";
import { getAge } from "./helpers/projections";
import { MEANDEATHAGE } from "./constants/chartConstants";
import { useState } from "react";

function App() {
  const age = getAge(userInformation.dob);
  const yearlyProjectionData = simulateYears(
    baseLineConditions,
    MEANDEATHAGE - age
  );
  console.log("result", yearlyProjectionData);
  const [yearSelected, setYearSelected] = useState<number>(
    yearlyProjectionData[0].year
  );

  return (
    <>
      <div className="main-container w-screen min-h-screen bg-gray-200 overscroll-none p-4 flex flex-col gap-2">
        <div className="projections-details  w-full flex flex-1 border border-yellow-200 gap-2">
          <div className="bg-white rounded-xl w-[80%] p-2  ">
            <ReChart
              yearlyProjectionData={yearlyProjectionData}
              setYearSelected={setYearSelected}
              yearSelected={yearSelected}
            />
          </div>
          <div className="sidebar flex-1">
            <Sidebar
              yearlyProjectionData={yearlyProjectionData}
              yearSelected={yearSelected}
              setYearSelected={setYearSelected}
            />
          </div>
        </div>
        <div className="input-container flex bg-blue-400 h-32 rounded-xl ">
          This
        </div>
      </div>
    </>
  );
}

export default App;
