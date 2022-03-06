import React from "react";
import { Link } from "react-router-dom";

function TrackList({ data, keyData }) {
  
  const getTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = ("0" + Math.floor(time % 60)).slice(-2);
    return minutes + ":" + seconds;
  };

  return (
    <section className="table-responsive">
      <table className="table mt-5 table-hover">
        <thead>
          <tr>
            <th scope="col">TITRE</th>
            <th scope="col">DUREE</th>
            <th scope="col">RANK</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={keyData}>
                <td>
                  <Link to={`/track/${item.id}`}>{item.title}</Link>{" "}
                </td>
                <td>{getTime(item.duration)}</td>
                <td>{item.rank}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default TrackList;
