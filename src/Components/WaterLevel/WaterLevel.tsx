import LiquidFillGauge from "react-liquid-gauge";
import { interpolateRgb } from "d3-interpolate";
import { color } from "d3-color";
import { useEffect, useState } from "react";
import { blue } from "@mui/material/colors";

interface WaterLevelProps {
  value: number;
}

export default function WaterLevel(props: WaterLevelProps) {
  const startColor = blue[400]; // cornflowerblue
  const endColor = blue[400];
  const [value, setValue] = useState(100);
  const radius = 200;
  const interpolate = interpolateRgb(startColor, endColor);
  const fillColor = interpolate(value / 100);
  const gradientStops = [
    {
      key: "0%",
      stopColor: color(fillColor)?.darker(0.5).toString(),
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "100%",
      stopColor: color(fillColor)?.brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];

  useEffect(() => {
    switch (props.value) {
      case 4:
        setValue(99);
        break;
      case 3:
        setValue(75);
        break;
      case 2:
        setValue(50);
        break;
      case 1:
        setValue(25);
        break;
      case 0:
        setValue(0);
        break;
      default:
        setValue(0);
        break;
    }
  }, [props.value]);
  return (
    <div>
      <LiquidFillGauge
        style={{ margin: "0 auto" }}
        width={radius * 2}
        height={radius * 2}
        value={value}
        percent="%"
        textSize={1}
        textOffsetX={0}
        textOffsetY={0}
        textRenderer={(props: {
          value: number;
          height: number;
          width: number;
          textSize: number;
          percent: string;
        }) => {
          const value = Math.round(props.value);
          const radius = Math.min(props.height / 2, props.width / 2);
          const textPixels = (props.textSize * radius) / 2;
          const valueStyle = {
            fontSize: textPixels,
          };
          const percentStyle = {
            fontSize: textPixels * 0.6,
          };

          return (
            <tspan>
              <tspan className="value" style={valueStyle}>
                {value}
              </tspan>
              <tspan style={percentStyle}>{props.percent}</tspan>
            </tspan>
          );
        }}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={1}
        gradient
        gradientStops={gradientStops}
        circleStyle={{
          fill: fillColor,
        }}
        waveStyle={{
          fill: fillColor,
        }}
        textStyle={{
          fill: color("#444")?.toString(),
          fontFamily: "Arial",
        }}
        waveTextStyle={{
          fill: color("#fff")?.toString(),
          fontFamily: "Arial",
        }}
      />
    </div>
  );
}
