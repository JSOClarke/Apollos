import ReChart from "./ReChart";
import { addYearsToDate, yearDifferenceFraction } from "./helpers/projections";
import { baseLineConditions } from "./data/mockData";
import { yearByYear } from "./helpers/yearByYearProjection";
import { simulateYears } from "./helpers/simulatonHelper";

function App() {
  const result = simulateYears(baseLineConditions, 1);
  console.log("result", result);
  return (
    <>
      <div className="main-container w-screen min-h-screen bg-gray-200 overscroll-none p-4 flex">
        <div className="">
          <ReChart chartData={simulateYears(baseLineConditions, 35)} />
        </div>
        <div className="forumla tech"></div>
      </div>
    </>
  );
}

export default App;
