import React, { useEffect, useState } from "react";
import "./TeamTable.css";
import axios from "axios";
import { toast } from "react-toastify";
import teamLogo from "../../assets/team-logo.png"; // Adjust path as needed
import thalapng from "../../assets/thala.png";
import TNR from "../../assets/TNR.jpeg";
import Gladiator from "../../assets/gladiator.png";
import elebelle from "../../assets/elebelle.png";
import bubul7 from "../../assets/bubul7.jpeg";

// Add team logos along with their colors
const teamLogos = {
  "Thala Warriors": thalapng, // Replace with actual path
  "Tanupukur Knight Riders": TNR, // Replace with actual path
  "Ele Belle": elebelle, // Replace with actual path
  "Gladiator's": Gladiator, // Replace with actual path
  "Bubul 7": bubul7, // Replace with actual path
};

const teamColors = {
  "Thala Warriors": "#ffc107",
  "Tanupukur Knight Riders": "#9c45c7",
  "Ele Belle": "#0073e6",
  "Gladiator's": "#ad2424",
  "Bubul 7": "#FFFF00",
};

const TeamTable = () => {
  const url = "https://auction-backend-72z9.onrender.com";
  const [teamsData, setTeamsData] = useState([]);

  const fetchTeamsData = async () => {
    try {
      const response = await axios.get(`${url}/api/player/list`);
      if (response.data.success) {
        const teams = response.data.data.reduce((acc, player) => {
          const teamName = player.team;
          if (!acc[teamName]) {
            acc[teamName] = { teamName, players: [] };
          }
          acc[teamName].players.push(player);
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
      {/* Large Logo */}
      <div className="logo-container">
        <img src={teamLogo} alt="Tournament Logo" className="tournament-logo" />
        <h1 className="league-title">Tanupukur Big Bash League</h1>
      </div>

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
              <div className="team-header">
                {/* Display the team logo */}
                <img
                  src={teamLogos[team.teamName] || teamLogo} // Default logo if not found
                  alt={`${team.teamName} Logo`}
                  className="team-logo-img"
                />
                <h2 className="team-title">{team.teamName}</h2>
              </div>

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
                    <tr key={player._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={`${url}/images/${player.image}`}
                          alt={player.name}
                        />
                      </td>
                      <td>{player.name}</td>
                      <td>{player.category}</td>
                      <td>{player.points}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="4">Total Used Points</td>
                    <td>
                      {team.players.reduce(
                        (acc, player) => acc + player.points,
                        0
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <b> Remaining Points</b>
                    </td>
                    <td>
                      <b>
                        {4900 -
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
