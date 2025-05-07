import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Label,
  YAxis,
  TooltipProps,
} from "recharts";
import axios from "axios";

///Interface for Daily stats
interface CoffeStatPerDayOfWeek {
  ///Day of the week number
  dayOfWeekNumber: number;
  firstCupTime: string;
  lastCupTime: string;
  ///Number of coffee made this day
  coffeesMade: number;
}

///Interface for weekly stats
interface CoffeeStatPerHour {
  ///Week number
  hour: number;
  ///Coffee made this week
  coffeesMade: number;
}

///Interface made for charts components
interface DataItem {
  ///Name of the bar in the chart
  name: string;
  ///Coffee made on this bar (weekly or daily)
  coffees: number;
  firstCupTime?: string;
  lastCupTime?: string;
}
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as DataItem;

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          color: "black",
        }}
      >
        <p className="label">{`${label} : ${data.coffees} coffee(s)`}</p>
        {data.firstCupTime && <p>First cup: {formatTime(data.firstCupTime)}</p>}
        {data.lastCupTime && <p>Last cup: {formatTime(data.lastCupTime)}</p>}
      </div>
    );
  }

  return null;
};

function formatTime(time: string): string {
  return time.substring(0, 5);
}
/*
I know it was asked daily and hourly but I went for Daily and Weekly without looking, sorry :), will still work if we set the route on hourly and weekly (minor changes)
Evolution : Scalability is asked in requirements, I haven't got enougth time to set a proper scalability in this component,
A good way of handle the scalability is to set arrow on each charts and get the stats with the page (or date value maybe?) number we want
Example : load the 1 page from the api and on each click on the arrow load a second, third... 
*/
export default function CoffeeStats() {
  const [dayOfWeekData, setDayOfWeekData] = useState<CoffeStatPerDayOfWeek[]>(
    []
  );
  const [hourlyData, setHourlyData] = useState<CoffeeStatPerHour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dayResponse, hourResponse] = await Promise.all([
          axios.get(
            "https://localhost:44323/api/v1/CoffeeMachine/coffees/daily"
          ),
          axios.get(
            "https://localhost:44323/api/v1/CoffeeMachine/coffees/hourly"
          ),
        ]);

        setDayOfWeekData(dayResponse.data);
        setHourlyData(hourResponse.data);
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

  const dataChartDayOfWeek: DataItem[] = dayNames.map((name) => ({
    name,
    coffees: 0,
  }));

  dayOfWeekData.forEach((item) => {
    const dayName = dayNames[item.dayOfWeekNumber % 7];
    const index = dataChartDayOfWeek.findIndex((d) => d.name === dayName);
    if (index !== -1) {
      dataChartDayOfWeek[index].coffees = item.coffeesMade;
      dataChartDayOfWeek[index].firstCupTime = item.firstCupTime;
      dataChartDayOfWeek[index].lastCupTime = item.lastCupTime;
    }
  });

  const dataChartHourly: DataItem[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const entry = hourlyData.find((item) => item.hour === hour);
    dataChartHourly.push({
      name: `${hour}:00`,
      coffees: entry ? entry.coffeesMade : 0,
    });
  }

  return (
    <>
      <h2>Coffee Stats Per Day of Week</h2>
      <ResponsiveContainer width="50%" height={300}>
        <BarChart data={dataChartDayOfWeek}>
          <XAxis dataKey="name" />
          <YAxis></YAxis>
          <Tooltip content={<CustomTooltip></CustomTooltip>} />
          <Bar dataKey="coffees" fill="#8884d8" />
          <Label value="Coffees per Day of Week" position="bottom" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Coffee Stats Per Hour</h2>
      <ResponsiveContainer width="50%" height={300}>
        <BarChart data={dataChartHourly}>
          <XAxis
            dataKey="name"
            domain={["auto", "auto"]}
            tick={{ fontSize: 12 }}
          />
          <YAxis></YAxis>
          <Bar dataKey="coffees" fill="#82ca9d" />
          <Tooltip></Tooltip>
          <Label value="Coffees per Hour" position="bottom" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
