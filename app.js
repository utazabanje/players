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

function renderPlayerRow(playerObject, index) {
    return '<tr class="playerRow" data-index="'+ index +'">' +
                '<td>' + playerObject.firstName+ '</td>' +
                '<td>' + playerObject.lastName + '</td>' +
                '<td>' + playerObject.position+ '</td>' +
                '<td>' + playerObject.number+ '</td>' +
                '<td>' + playerObject.starting + '</td>' +
                '<td>' +
                    '<button class="btn btn-xs btn-danger player-delete">' +
                        '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +
                    '</button>' +
                    ' <button class="btn btn-xs btn-warning player-star">' +
                        '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>' +
                    '</button>' +
                '</td>' +
            '</tr>';
}

function generateTableHtml() {
    var playersHtml = '';
    availablePlayers.forEach(function (player, index) {
        playersHtml += renderPlayerRow(player, index);
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

function deletePlayer(index) {
    availablePlayers.splice(index, 1);
    renderTable();
}

/*
* tbody#playersTable se NIKAD ne brise iz DOMa
* zato moramo na njemu da definisemo event handler
* a ne na samom .player-delete jer se oni unistavaju i
* ne vezu se lepo handleri kada se ponovo kreiraju u domu
* */
$('#playersTable').on('click', '.player-delete', function () {
    var row = $(this).closest('tr');
    var index = row.data('index');
    deletePlayer(index);
});

function resetForm() {
    addPlayerForm.trigger('reset');
}
