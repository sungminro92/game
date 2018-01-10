/*
TO - DO
* win / lose screen - play again, quit
* update score
* hang mon 철장?
* d
*/


// Array of word possibilities in the game
const easyWordBank = ['PIKACHU','IVY','CHARMANDER','BULBASAUR','SQUIRTLE','BUTTERFREE','PIDGEY','PSYDUCK','CLEFAIRY','DIGLETT'];
const hardWordBank = ['CLOYSTER','ALAKAZAM','KANGASKHAN','RHYDON','GYRADOS','TYPHLOSION','WEEZING','EXEGGUTOR','WIGGLYTUFF','MACHAMP'];


function requestPromise(route) {
    const errorMessage = 'We were unable to process your request at this time.  Please try again later.';
    return new Promise((resolve, reject) => {
            $.ajax({
            url: route,
            type: "GET",
            async: true,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorMessage);
            },
            success: function (data, textStatus, jqXHR) {
                if (!data) {
                    alert(errorMessage);
                }
                return resolve(data);
            }
        });
    }).catch();
}
