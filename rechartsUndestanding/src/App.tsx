import ReChart from "./ReChart";
import { addYearsToDate, yearDifferenceFraction } from "./helpers/projections";

function App() {
  const today = new Date();
  return (
    <>
      <div className="main-container w-screen min-h-screen bg-gray-200 overscroll-none p-4 flex">
        <div className="">
          <ReChart />
        </div>
        <label>retirementage</label>
        <input type="number" name="retirement-age" id="retirement-age" />

        <div>{addYearsToDate(today, 2).toDateString()}</div>
      </div>
    </>
  );
}

export default App;
