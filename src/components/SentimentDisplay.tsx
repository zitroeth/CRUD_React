import * as React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Icon from '@mui/material/Icon';

interface Props {
  label: string | null;
  score: number;
}

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" fontSize="inherit"/>,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" fontSize="inherit"/>,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" fontSize="inherit"/>,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" fontSize="inherit"/>,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" fontSize="inherit"/>,
    label: "Very Satisfied",
  },
};

export default function SentimentDisplay({ label, score }: Props) {
  let iconNum: number = 3;
  if (label == "Positive") {
    switch (true) {
      case score > 0.4 && score < 0.6:
        iconNum = 3;
        break;
      case score >= 0.6 && score < 0.85:
        iconNum = 4;
        break;
      case score >= 0.85 && score <= 1:
        iconNum = 5;
        break;
    }
  } else if (label == "Negative") {
    switch (true) {
      case score > 0.4 && score < 0.6:
        iconNum = 3;
        break;
      case score >= 0.6 && score < 0.85:
        iconNum = 2;
        break;
      case score >= 0.85 && score <= 1:
        iconNum = 1;
        break;
    }
  }
    return <Icon fontSize="large">{customIcons[iconNum].icon}</Icon>;
}
