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

function renderTable() {
    var playersHtml = '';
    availablePlayers.forEach(function (player) {
        playersHtml += renderPlayerRow(player);
    });
    return playersHtml;
}

var table = $('#playersTable');
table.html(renderTable());