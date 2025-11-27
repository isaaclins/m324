import React, { useState } from "react";
import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import Header from "./Header";
//import Spinner from "./Spinner";

export default function App() {
  const [month, setMonth] = useState("");

  const trips = [
    {
      id: 1,
      title: "BT01",
      description: "San Francisco World Trade Center on new Server/IOT/Client002",
      startTrip: [2021, 2, 13, 0, 0],
      endTrip: [2021, 2, 15, 16, 56],
      meetings: [
        {
          id: 1,
          title: "One Conference",
          description: "Key Note on One Conference",
        },
        {
          id: 2,
          title: "Zero Conference",
          description: "Workshop Zero on One Conference",
        },
      ],
    },
    {
      id: 2,
      title: "BT02",
      description: "Santa Clara Halley on new Server/IOT/Client",
      startTrip: [2021, 6, 23, 9, 0],
      endTrip: [2021, 6, 27, 16, 56],
      meetings: [
        {
          id: 3,
          title: "One Conference",
          description: "HandsOn on One Conference",
        },
        {
          id: 4,
          title: "One Conference",
          description: "Key Note on One Conference",
        },
      ],
    },
    {
      id: 3,
      title: "BT03",
      description: "San Cose City Halley on Docker/IOT/Client",
      startTrip: [2021, 12, 13, 9, 0],
      endTrip: [2021, 12, 15, 16, 56],
      meetings: [
        {
          id: 5,
          title: "One Conference",
          description: "Key Note on One Conference",
        },
      ],
    },
  ];

  const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June"];

  function renderTrip(t) {
    return (
      <div className="product" key={t.id}>
        <figure>
          <div>
            <img src={"images/items/" + t.id + ".jpg"} alt="name " />
          </div>
          <figcaption>
            <a href="#. . . ">{t.title}</a>
            <div>
              <span>
                {t.startTrip[2] + "-" + t.startTrip[1] + "-" + t.startTrip[0]}
              </span>
            </div>
            <p>{t.description}</p>
            <div>
              <button type="button" disabled>
                Add to Triplist
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
  // if month selected then filter the trips from month === month
  const filteredTrips = month
    ? trips.filter((t) => t.startTrip[1] === parseInt(month))
    : trips;

  // if error then throw the errror

  // shorthand for react fragment
  return (
    <>
      <div>
        <Header />
        <main>
          <h1>Welcome to biztrips 2023</h1>
          <section id="filters">
            <label htmlFor="month">Filter by Month:</label>
            <select
              id="month"
              value={month} // controlled component
              onChange={(e) => {
                //debugger;
                setMonth(e.target.value);
              }}
            >
              <option value="">All Months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">Mai</option>
              <option value="6">June</option>
            </select>
            {month && (
              <h2>
                Found {filteredTrips.length}
                {filteredTrips.length > 1 ? " trips" : " trip"} for the month of
                {" " + months[month]}
              </h2>
            )}
          </section>
          <section id="products">{filteredTrips.map(renderTrip)}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
