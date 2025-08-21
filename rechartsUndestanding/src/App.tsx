import ReChart from "./ReChart";
import { baseLineConditions } from "./data/mockData";
import { simulateYears } from "./helpers/simulatonHelper";

function App() {
  const result = simulateYears(baseLineConditions, 1);
  console.log("result", result);
  return (
    <>
      <div className="main-container w-screen min-h-screen bg-gray-200 overscroll-none p-4 flex flex-col gap-2">
        <div className="projections-details  w-full flex flex-1 border border-yellow-200 gap-2">
          <div className="bg-white rounded-xl w-[80%] p-2  border border-red-500">
            <ReChart
              yearlyProjectionData={simulateYears(baseLineConditions, 65)}
            />
          </div>
          <div className="sidebar flex-1 border border-red-500"></div>
        </div>
        <div className="input-container flex bg-blue-400 h-32 rounded-xl ">
          This
        </div>
      </div>
    </>
  );
}

export default App;
