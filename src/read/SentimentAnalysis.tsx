import BasicTable from "../components/BasicTable";

export default function SentimentAnalysis() {
  const token = localStorage.getItem('access_token');
  return (
    <>
      <p>Sentiment Analysis</p>
      <BasicTable url="http://localhost:3113/api/v1/SentimentAnalysis/" token={token} editurl="http://localhost:5173/update/SentimentAnalysis/"/>
    </>
  )
}