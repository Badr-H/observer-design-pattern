var FootballLeague = /** @class */ (function () {
    function FootballLeague() {
        this.listOfClubs = [];
        this.observers = [];
        this.observers = [];
    }
    FootballLeague.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    FootballLeague.prototype.removeObserver = function (observer) {
        var index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    };
    FootballLeague.prototype.notifyObservers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this.listOfClubs);
        }
    };
    FootballLeague.prototype.addClub = function (club) {
        this.listOfClubs.push(club);
    };
    FootballLeague.prototype.playGame = function (club1, club2) {
        //simulate a game and update the ranking based on game result 
        var result = Math.random() > 0.5 ? 1 : -1; // 1 represents club1 wins, -1 represents club2 wins
        // Update the ranks based on the result
        if (result === 1) {
            club1.setPoints(club1.getClubInfo().points + 3);
            club2.setPoints(club2.getClubInfo().points - 0);
        }
        else {
            club1.setPoints(club1.getClubInfo().points - 0);
            club2.setPoints(club2.getClubInfo().points + 3);
        }
        this.updateRanking();
    };
    FootballLeague.prototype.updateRanking = function () {
        // Sort the list of clubs based on points in descending order
        this.listOfClubs.sort(function (a, b) { return b.getClubInfo().points - a.getClubInfo().points; });
        // Update the ranks
        this.listOfClubs.forEach(function (club, index) {
            club.setRank(index + 1);
        });
        this.notifyObservers();
    };
    return FootballLeague;
}());
var LeagueTable = /** @class */ (function () {
    function LeagueTable(subject) {
        this.subject = subject;
        this.rankings = [];
        this.subject.addObserver(this);
    }
    LeagueTable.prototype.update = function (rankings) {
        this.rankings = rankings;
        // this.display()
    };
    LeagueTable.prototype.display = function () {
        console.log("League Table:");
        console.table(this.rankings);
    };
    return LeagueTable;
}());
var FootballClub = /** @class */ (function () {
    function FootballClub(name, rank, points) {
        this.name = name;
        this.rank = rank;
        this.points = points;
    }
    FootballClub.prototype.setRank = function (rank) {
        this.rank = rank;
    };
    FootballClub.prototype.setPoints = function (points) {
        this.points = points;
    };
    FootballClub.prototype.getClubInfo = function () {
        return { name: this.name, rank: this.rank, points: this.points };
    };
    return FootballClub;
}());
var saudiLeague = new FootballLeague();
var table = new LeagueTable(saudiLeague);
var alhilal = new FootballClub('Al-Hilal', 0, 0);
var alnassr = new FootballClub('Al-Nassr', 0, 0);
var alittihad = new FootballClub('Al-Ittihad', 0, 0);
var alahli = new FootballClub('Al-Ahli', 0, 0);
var alshabab = new FootballClub('Al-Shabab', 0, 0);
var alhazem = new FootballClub('Al-Hazem', 0, 0);
saudiLeague.addClub(alhilal);
saudiLeague.addClub(alnassr);
saudiLeague.addClub(alittihad);
saudiLeague.addClub(alahli);
saudiLeague.addClub(alshabab);
saudiLeague.addClub(alhazem);
for (var i = 0; i <= 90; i++) {
    saudiLeague.playGame(alnassr, alhilal);
    saudiLeague.playGame(alittihad, alahli);
    saudiLeague.playGame(alshabab, alhazem);
}
table.display();
