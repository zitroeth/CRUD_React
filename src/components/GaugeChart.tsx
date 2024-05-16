import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

interface Props {
    label: string | null;
    score: number;
}


const settings = {
  width: 100,
  height: 100,
};

export default function ArcDesign( {label, score}: Props) {
    let color = "#ffffff";
    if(score > 0.4 && score < 0.6){
        color = "warning";
    }else if (label == "Positive"){
        color = "success";
    }else if (label == "Negative"){
        color = "error";
    }

    return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      value={score*100}
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 20,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: theme.palette[color].light,
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
  );
}