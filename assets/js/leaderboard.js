// test -- remove when done
$(document).ready(function() {
  populateLeaderboard([['test2', 4],]);
});

/*
 * Populate leaderboard table
 * @param leaderboardData: list of data points in descending order in format
 *                         [[name, amount of sightings], [name2, etc.], ...]
 */
function populateLeaderboard(leaderboardData) {
    var t = $("#leaderboard-table tbody")[0];
    for(var i=0;i<leaderboardData.length;i++) {
        var rank = i+1;
        var name = leaderboardData[i][0];
        var amount = leaderboardData[i][1];
        t.innerHTML += "<tr><td>" + rank + "</td><td>" + name + "</td><td>" + amount + "</td></tr>";
    }
}
