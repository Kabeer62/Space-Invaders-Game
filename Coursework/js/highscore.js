let playersArray = []; 

// Function to update the leaderboard table
function updateLeaderboard() {
    playersArray = []; // Reset the array before updating

    let howManyAccounts = localStorage.length;
    for (let i = 0; i < howManyAccounts; i++) {
        let accountEmail = localStorage.key(i);
        let item = JSON.parse(localStorage.getItem(accountEmail));

        // Check if the item is valid and has an email field
        if (item && item.email) {
            
        // Check for duplicate emails before adding to playersArray
        let isDuplicate = playersArray.some(player => player.email === item.email);
        if (!isDuplicate) {
            playersArray.push(item);
        }
        }
    }
    playersArray.sort((a, b) => b.score - a.score);
    for (let i = 1; i <= playersArray.length; i++) {
        var row = document.getElementById('no'+i);
        row.innerHTML = '<td>'+i+'</td>'+'<td>'+playersArray[i-1].username+'</td>'+'<td>'+playersArray[i - 1].score+'</td>'
    }

    // Now playersArray contains unique players based on their email
    console.log(playersArray);
    // Further code to update leaderboard with playersArray data
}