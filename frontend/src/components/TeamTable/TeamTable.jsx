import React, { useEffect, useState } from "react";
import "./TeamTable.css";
import axios from "axios";
import { toast } from "react-toastify";
import teamLogo from "../../assets/team-logo.png";

// Importing team and player images
import thalapng from "../../assets/thala.png";
import TNR from "../../assets/TNR.jpeg";
import Gladiator from "../../assets/gladiator.png";
import elebelle from "../../assets/Elebellepic2.png";
import bubul7 from "../../assets/Bubulmin.png";
import Babuda from "../../assets/Babuda.jpeg";
import Aritra from "../../assets/Aritra.jpeg";
import Bubulda from "../../assets/BubulDa.jpeg";
import Arnabda from "../../assets/ArnabDa.jpeg";
import Biplab from "../../assets/Biplab.jpg";

// Define team logos and colors
const teamLogos = {
  "Thala Warriors": thalapng,
  "Tanupukur Knight Riders": TNR,
  "Ele Belle": elebelle,
  "Gladiator's": Gladiator,
  "Bubul 7": bubul7,
};

const teamColors = {
  "Thala Warriors": "#ffc107",
  "Tanupukur Knight Riders": "#9c45c7",
  "Ele Belle": "#0073e6",
  "Gladiator's": "#3db9ca",
  "Bubul 7": "#FFFF00",
};

// Define marquee players
const marqueePlayers = {
  "Thala Warriors": {
    name: "Biplab Naskar",
    category: "Marquee",
    image: Biplab,
    points: 100,
  },
  "Tanupukur Knight Riders": {
    name: "Mriganka Mouli Mukherjee",
    category: "Marquee",
    image: Babuda,
    points: 100,
  },
  "Ele Belle": {
    name: "Avishek Karmakar",
    category: "Marquee",
    image: Bubulda,
    points: 100,
  },
  "Gladiator's": {
    name: "Aritra Gupta",
    category: "Marquee",
    image: Aritra,
    points: 100,
  },
  "Bubul 7": {
    name: "Arnab Mitra",
    category: "Marquee",
    image: Arnabda,
    points: 100,
  },
};

const TeamTable = () => {
  const url = "https://auction-backend-72z9.onrender.com"; // Backend URL
  const [teamsData, setTeamsData] = useState([]);

  const fetchTeamsData = async () => {
    try {
      const response = await axios.get(`${url}/api/player/list`);
      if (response.data.success) {
        const teams = response.data.data.reduce((acc, player) => {
          const teamName = player.team;

          // Initialize team if not present
          if (!acc[teamName]) {
            acc[teamName] = {
              teamName,
              players: [
                {
                  ...marqueePlayers[teamName],
                  image: marqueePlayers[teamName].image, // Ensure marquee player image is assigned
                },
              ],
            };
          }

          // Add players from API response
          acc[teamName].players.push({
            ...player,
            image: player.image?.startsWith("http")
              ? player.image
              : `${url}/images/${player.image}`, // Ensure player image loads correctly
          });

          return acc;
        }, {});

        setTeamsData(Object.values(teams));
      } else {
        toast.error("Error fetching team data");
      }
    } catch (error) {
      toast.error("Error fetching team data");
    }
  };

  useEffect(() => {
    fetchTeamsData();
  }, []);

  return (
    <div className="teamtable-container">
      {/* League Header */}
      <div className="logo-container">
        <img src={teamLogo} alt="Tournament Logo" className="tournament-logo" />
        <h1 className="league-title">Tanupukur Big Bash League</h1>
      </div>

      {/* Teams Data Table */}
      <div className="teamtables">
        {teamsData.length > 0 ? (
          teamsData.map((team, teamIndex) => (
            <div
              key={teamIndex}
              className="teamtable"
              style={{
                backgroundColor: teamColors[team.teamName] || "#cccccc",
              }}
            >
              {/* Team Header */}
              <div className="team-header">
                <img
                  src={teamLogos[team.teamName] || teamLogo}
                  alt={`${team.teamName} Logo`}
                  className="team-logo-img"
                />
                <h2 className="team-title">{team.teamName}</h2>
              </div>

              {/* Players Table */}
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Player's Image</th>
                    <th>Player's Name</th>
                    <th>Category</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {team.players.map((player, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={player.image}
                          alt={player.name}
                          onError={(e) => (e.target.src = teamLogo)} // Fallback image
                          className="player-image"
                        />
                      </td>
                      <td>{player.name}</td>
                      <td>{player.category}</td>
                      <td>{player.points}</td>
                    </tr>
                  ))}
                  {/* Total Used Points */}
                  <tr>
                    <td colSpan="4">Total Used Points</td>
                    <td>
                      {team.players.reduce(
                        (acc, player) => acc + player.points,
                        0
                      )}
                    </td>
                  </tr>
                  {/* Remaining Points */}
                  <tr>
                    <td colSpan="4">
                      <b>Remaining Points</b>
                    </td>
                    <td>
                      <b>
                        {5000 -
                          team.players.reduce(
                            (acc, player) => acc + player.points,
                            0
                          )}
                      </b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>Loading teams data...</p>
        )}
      </div>
    </div>
  );
};

export default TeamTable;
