import { useState, useEffect } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";
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

  useEffect(() => {
    axios
      .get("https://localhost:44323/api/v1/CoffeeMachine/coffees/daily")
      .then((response) => {
        setDailyData(response.data);
      })
      .catch((error) => {
        console.error("Error when loading daily data:", error);
      });

    axios
      .get("https://localhost:44323/api/v1/CoffeeMachine/coffees/weekly")
      .then((response) => {
        setWeeklyData(response.data);
      })
      .catch((error) => {
        console.error("Error when loading weekly data:", error);
      });
  }, []);

  ///Daily
  const dataChartDaily: DataItem[] = [];
  dailyData.forEach((dailyDataItem) => {
    dataChartDaily.push({
      name: new Date(dailyDataItem.date).toLocaleDateString(),
      coffees: dailyDataItem.coffeesMade,
    });
  });

  if (dataChartDaily.length < 7) {
    if (
      dataChartDaily[dataChartDaily.length - 1] &&
      Object.prototype.hasOwnProperty.call(
        dataChartDaily[dataChartDaily.length - 1],
        "name"
      )
    ) {
      const lastDate = new Date(dailyData[dailyData.length - 1].date);
      const neededDays = 7 - dataChartDaily.length;
      console.log(neededDays);
      for (let index = 1; index <= neededDays; index++) {
        console.log("on ajoute + : " + index);
        const nextDate = new Date(lastDate);
        nextDate.setDate(lastDate.getDate() + index);
        dataChartDaily.push({
          name: nextDate.toLocaleDateString(),
          coffees: 0,
        });
      }
    }
  }

  ///Weekly
  const dataChartWeekly: DataItem[] = [];
  weeklyData.forEach((weeklyDataItem) => {
    dataChartWeekly.push({
      name: weeklyDataItem.week,
      coffees: weeklyDataItem.coffeesMade,
    });
  });

  if (dataChartWeekly.length < 7) {
    if (
      dataChartWeekly[dataChartWeekly.length - 1] &&
      Object.prototype.hasOwnProperty.call(
        dataChartWeekly[dataChartWeekly.length - 1],
        "name"
      )
    ) {
      const lastDate = weeklyData[weeklyData.length - 1].week;
      const neededWeeks = 7 - dataChartWeekly.length;
      console.log(neededWeeks);
      for (let index = 1; index <= neededWeeks; index++) {
        console.log("on ajoute + : " + index);
        dataChartWeekly.push({
          name: lastDate + index,
          coffees: 0,
        });
      }
    }
  }
  return (
    <>
      <ResponsiveContainer width="50%" height="100%">
        <BarChart width={150} height={40} data={dataChartDaily}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="coffees" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="50%" height="100%">
        <BarChart width={150} height={40} data={dataChartWeekly}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="coffees" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
