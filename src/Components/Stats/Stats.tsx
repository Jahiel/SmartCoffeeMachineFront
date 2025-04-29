import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Label,
} from "recharts";
import axios from "axios";

///Interface for Daily stats
interface CoffeeStatDaily {
  ///Date
  date: string;
  ///Number of coffee made this day
  coffeesMade: number;
}

///Interface for weekly stats
interface CoffeeStatWeekly {
  ///Week number
  week: string;
  ///Coffee made this week
  coffeesMade: number;
}

///Interface made for charts components
interface DataItem {
  ///Name of the bar in the chart
  name: string;
  ///Coffee made on this bar (weekly or daily)
  coffees: number;
}

/*
I know it was asked daily and hourly but I went for Daily and Weekly without looking, sorry :), will still work if we set the route on hourly and weekly (minor changes)
Evolution : Scalability is asked in requirements, I haven't got enougth time to set a proper scalability in this component,
A good way of handle the scalability is to set arrow on each charts and get the stats with the page (or date value maybe?) number we want
Example : load the 1 page from the api and on each click on the arrow load a second, third... 
*/
export default function CoffeeStats() {
  const [dailyData, setDailyData] = useState<CoffeeStatDaily[]>([]);
  const [weeklyData, setWeeklyData] = useState<CoffeeStatWeekly[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dailyResponse = await axios.get(
          "https://localhost:44323/api/v1/CoffeeMachine/coffees/daily"
        );
        setDailyData(dailyResponse.data);

        const weeklyResponse = await axios.get(
          "https://localhost:44323/api/v1/CoffeeMachine/coffees/weekly"
        );
        setWeeklyData(weeklyResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error when loading data:", error);
      }
    };

    fetchData();
  }, []);

  ///Wait for api to answer, if no answer is get we stay in loading mode
  if (loading) {
    return <div>Loading...</div>;
  }

  const dataChartDaily: DataItem[] = [];
  dailyData.forEach((dailyDataItem) => {
    dataChartDaily.push({
      name: new Date(dailyDataItem.date).toLocaleDateString(),
      coffees: dailyDataItem.coffeesMade,
    });
  });

  if (dataChartDaily.length < 7) {
    const lastDate = new Date(dailyData[dailyData.length - 1].date);
    const neededDays = 7 - dataChartDaily.length;
    for (let index = 1; index <= neededDays; index++) {
      const nextDate = new Date(lastDate);
      nextDate.setDate(lastDate.getDate() + index);
      dataChartDaily.push({
        name: nextDate.toLocaleDateString(),
        coffees: 0,
      });
    }
  }

  const dataChartWeekly: DataItem[] = [];
  weeklyData.forEach((weeklyDataItem) => {
    dataChartWeekly.push({
      name: weeklyDataItem.week,
      coffees: weeklyDataItem.coffeesMade,
    });
  });

  if (dataChartWeekly.length < 7) {
    const lastDate = weeklyData[weeklyData.length - 1].week;
    const neededWeeks = 7 - dataChartWeekly.length;
    for (let index = 1; index <= neededWeeks; index++) {
      dataChartWeekly.push({
        name: lastDate + index,
        coffees: 0,
      });
    }
  }

  return (
    <>
      <h2>Daily Stats</h2>
      <ResponsiveContainer width="50%" height="100%">
        <BarChart data={dataChartDaily}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="coffees" fill="#8884d8" />
          <Label value="Daily Stats of coffees made" position="bottom" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Weekly Stats</h2>
      <ResponsiveContainer width="50%" height="100%">
        <BarChart data={dataChartWeekly}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="coffees" fill="#8884d8" />
          <Label value="Weekly Stats of coffees made" position="bottom" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
