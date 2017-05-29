/*
* Models
* */

// define Player object
function Player(firstName, lastName, position, number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.number = number;

    this.starting = false;
}

function addPlayer(firstName, lastName, position, number) {
    // validate: if number is already taken, cancel this and show error
    if (isNumberAlreadyTaken(number)) {
        alert('Number is already taken!');
        // EARLY return, if there are errors, don't bother doing the rest
        return;
    }
    // create new player object
    var newPlayer = new Player(firstName, lastName, position, number);

    // add to availablePlayers
    availablePlayers.push(newPlayer);

    // render table again
    renderTable();
    resetForm();
}

function isNumberAlreadyTaken(number) {
    var isTaken = false;

    availablePlayers.forEach(function (currentPlayerObject) {
        if (currentPlayerObject.number === number) {
            isTaken = true;
        }
    });

    return isTaken;
}

var pedja = new Player('Pedja', 'Stojakovic', 'wing', 28);
var lebron = new Player('Lebron', 'James', 'wing', 23);
var divac = new Player('Vlade', 'Divac', 'center', 2);
var shaq = new Player('Shaq', 'Oneil', 'center', 88);

var availablePlayers = [];

function initializePlayers() {
    availablePlayers.push(pedja, lebron, divac, shaq)
}

initializePlayers();

function renderPlayerRow(playerObject) {
    return '<tr>' +
                '<td>' + playerObject.firstName+ '</td>' +
                '<td>' + playerObject.lastName + '</td>' +
                '<td>' + playerObject.position+ '</td>' +
                '<td>' + playerObject.number+ '</td>' +
                '<td>' + playerObject.starting + '</td>' +
            '</tr>';
}

function generateTableHtml() {
    var playersHtml = '';
    availablePlayers.forEach(function (player) {
        playersHtml += renderPlayerRow(player);
    });
    return playersHtml;
}

var table = $('#playersTable');
table.html(generateTableHtml());

function renderTable() {
    table.html(generateTableHtml());
}

var addPlayerForm = $('#addPlayerForm');
addPlayerForm.submit(function (event) {
    var firstName = $(this).find('[name="firstName"]').val();
    var lastName = $(this).find('[name="lastName"]').val();
    var position = $(this).find('[name="position"]').val();
    var numberString = $(this).find('[name="number"]').val();
    var number = parseInt(numberString, 10);

    addPlayer(firstName, lastName, position, number);
    event.preventDefault();
});

function resetForm() {
    addPlayerForm.trigger('reset');
}
