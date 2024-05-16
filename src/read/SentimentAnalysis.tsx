import BasicTable from "../components/BasicTable";

export default function SentimentAnalysis() {
    return (
      <>
      <p>Sentiment Analysis</p>
      <BasicTable url="http://localhost:3113/api/v1/SentimentAnalysis/"/>
      </>
    )
  }
  