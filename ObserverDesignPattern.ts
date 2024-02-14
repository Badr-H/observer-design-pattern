interface Observer {
	update: (rankings: any) => void
}

interface Subject {
	addObserver: (observer: Observer) => void
	removeObserver: (observer: Observer) => void
	notifyObservers: () => void
}

class FootballLeague implements Subject {
	private listOfClubs: any[] = []
	private observers: Observer[] = []

	constructor() { this.observers = [] }

	addObserver(observer: Observer) {
		this.observers.push(observer)
	}
	removeObserver(observer: Observer) {
		const index = this.observers.indexOf(observer)
		if (index > -1) {
			this.observers.splice(index, 1)
		}
	}
	notifyObservers() {
		for (const observer of this.observers)
			observer.update(this.listOfClubs)
	}

	public addClub(club: FootballClub) {
		this.listOfClubs.push(club)
	}
	public playGame(club1: FootballClub, club2: FootballClub) {
		//simulate a game and update the ranking based on game result 
		const result = Math.random() > 0.5 ? 1 : -1; // 1 represents club1 wins, -1 represents club2 wins

		// Update the ranks based on the result
		if (result === 1) {
			club1.setPoints(club1.getClubInfo().points + 3);
			club2.setPoints(club2.getClubInfo().points - 0);
		} else {
			club1.setPoints(club1.getClubInfo().points - 0);
			club2.setPoints(club2.getClubInfo().points + 3);
		}

		this.updateRanking()
	}
	public updateRanking() {
		// Sort the list of clubs based on points in descending order
		this.listOfClubs.sort((a, b) => b.getClubInfo().points - a.getClubInfo().points);

		// Update the ranks
		this.listOfClubs.forEach((club, index) => {
			club.setRank(index + 1);
		});

		this.notifyObservers()
	}
}

class LeagueTable implements Observer {
	private rankings: { name: string; points: number, rank: number }[] = [];

	constructor(private subject: Subject) {
		this.subject.addObserver(this)
	}
	update(rankings: any) {
		this.rankings = rankings
		// this.display()

	}
	display() {
		console.log("League Table:");
		console.table(this.rankings);
	}
}

class FootballClub {
	private name: string
	private rank: number
	private points: number

	constructor(name: string, rank: number, points: number) {
		this.name = name
		this.rank = rank
		this.points = points
	}
	setRank(rank: number) {
		this.rank = rank
	}

	setPoints(points: number) {
		this.points = points
	}

	getClubInfo(): { name: string, rank: number, points: number } {
		return { name: this.name, rank: this.rank, points: this.points }
	}




}

const saudiLeague = new FootballLeague()
const table = new LeagueTable(saudiLeague)

const alhilal = new FootballClub('Al-Hilal', 0, 0)
const alnassr = new FootballClub('Al-Nassr', 0, 0)
const alittihad = new FootballClub('Al-Ittihad', 0, 0)
const alahli = new FootballClub('Al-Ahli', 0, 0)
const alshabab = new FootballClub('Al-Shabab', 0, 0)
const alhazem = new FootballClub('Al-Hazem', 0, 0)

saudiLeague.addClub(alhilal)
saudiLeague.addClub(alnassr)
saudiLeague.addClub(alittihad)
saudiLeague.addClub(alahli)
saudiLeague.addClub(alshabab)
saudiLeague.addClub(alhazem)

for (var i = 0; i <= 90; i++) {
	saudiLeague.playGame(alnassr, alhilal)
	saudiLeague.playGame(alittihad, alahli)
	saudiLeague.playGame(alshabab, alhazem)
}
table.display()
