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

interface CoffeeStatDaily {
  date: string;
  coffeesMade: number;
}

interface CoffeeStatWeekly {
  week: string;
  coffeesMade: number;
}

interface DataItem {
  name: string;
  coffees: number;
}

//TODO Must search for scalability philosophy, here the more data we have, the more it is harder to read
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
