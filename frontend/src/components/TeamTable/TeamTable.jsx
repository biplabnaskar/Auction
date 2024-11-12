import React, { useEffect, useState } from "react";
import "./TeamTable.css";
import axios from "axios";
import { toast } from "react-toastify";

const colors = ["#80ffe5", "#ff6699", "#ffff00", "#9966ff", "#b3ff66"];

const TeamTable = () => {
  const url = "https://auction-backend-72z9.onrender.com"; // Base URL for your API
  const [teamsData, setTeamsData] = useState([]);

  // Fetch the list of players and group them by team
  const fetchTeamsData = async () => {
    try {
      const response = await axios.get(`${url}/api/player/list`);
      if (response.data.success) {
        // Group players by team
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
    <div className="teamtables">
      {teamsData.length > 0 ? (
        teamsData.map((team, teamIndex) => (
          <div
            key={teamIndex}
            className="teamtable"
            style={{ backgroundColor: colors[teamIndex % colors.length] }}
          >
            <h2>{team.teamName}</h2>

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
                  <td colSpan="4">Total Points</td>
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
                      {7000 -
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
  );
};

export default TeamTable;
