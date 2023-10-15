import React, { useEffect, useState } from 'react';
import './App.css';

function Card({title,text,target,linkTitle,href,rel,onClick,linkClassName})
{
  return (
    <div className="card">

        <div className="card__title">{title}</div>

        <div className="card__text">{text}</div>
        <a className={`default-link card__link ${linkClassName}`} target={target} rel={rel} href={href} onClick={onClick}>
           {linkTitle}
        </a>
    </div>
  );
}

export default function Page () {
  const [cards, setCards] = useState([]);
  const [error,setError] = useState();

  //get cases function
  async function getCardDetails(){
    const response = await fetch('https://my-json-server.typicode.com/savayer/demo/posts');
    if (!response.error) {
        response.json().then((json)=>{
           let newData = [];
           json.forEach((item) => {
             let ndata = {};
             ndata.id = item.id;
             ndata.title = item.title;
             ndata.link_title = item.link_title;
             ndata.link = item.link;
             ndata.text = item.body && item.body.en ? item.body.en.substr(0, 50) + '...' : '';
             newData.push(ndata);
           }); 
           setCards(newData);
        });      
    } else {
      setError(response.error);
      console.log(response);
    }
  };

  useEffect(() => {
    getCardDetails();
  }, []);

  function analyticsTrackClick(url) {
    // sending clicked link url to analytics
    console.log(url);
  }

  return (
    <div className = "wrapper">
    {cards && cards.map(function (item) {
      return (
        <Card title={item.title.en} linkTitle={item.link_title} href={item.link} text={item.text} linkClassName={item.id === 1 ? 'card__link--red' : ''} target={item.id === 1 ? '_blank' : ''} onClick={analyticsTrackClick(item.link)} />
      );
    })}
    </div>
  );
}




