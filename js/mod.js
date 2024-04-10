let namea = "The STARLIVHT Tree"
// lmao i had to change this because Δ in the mod id broke the game

let modInfo = {
	name: "The STΔRLIVHT Tree",
	id: "erulure - "+namea,
	author: "erulure",
	pointsName: "seconds played",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1",
	name: "release thing idk",
}

let changelog = `<h1>changelog:</h1><br>
	<h3>version formatting</h3><br>
	vA.B where A is the update number (only counts content updates) and B is the number of patches (bug fix updates) that have happened this update<br>
	anyway heres the changelog<br><br>
        <h3>v1.1</h3><br>
	- fixed the bug where buy all may still reduce points if the upgrade is owned<br>
	<h3>v1.0 - release thing idk</h3><br>
	- made the game<br>
	- endgame: 1000 coinz. 6 ignition points is theoretically possible with offline time, but 1000 coinz is officially endgame
`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	return gain
}

function getPointGain(x) {
	let gain = d(1)
	// additive effects
	if(hasUpgrade('c', 28)) gain = gain.add(d(1).div(3))
	if(hasUpgrade('d', 28)) gain = gain.add(d(1).div(3))
	if(hasUpgrade('h', 28)) gain = gain.add(d(1).div(3))
	
	// the
	if(hasUpgrade('s', 28)) gain = gain.pow(2)

	// wow this makes it easy for universal effects
	if(hasUpgrade('c', 15)) gain = gain.mul(upgradeEffect('c', 15))

	if(hasMilestone('i', 1)) gain = gain.mul(3)
	if(x=='c') {
		if(hasUpgrade('c', 11)) gain = gain.mul(3)
		if(hasUpgrade('c', 17)) gain = gain.mul(4.4)
		if(hasUpgrade('c', 18)) gain = gain.mul(upgradeEffect('c', 18))
		if(hasUpgrade('c', 22)) gain = gain.mul(16)
		if(hasUpgrade('c', 23)) gain = gain.mul(upgradeEffect('c', 23))

		gain = gain.mul(layerEffect('c'))
		if(hasUpgrade('i', 13)) gain = gain.mul(upgradeEffect('i', 13))
		if(hasUpgrade(x, 25)) gain = gain.mul(4.44)
		if(hasUpgrade(x,31))gain=gain.mul(upgradeEffect(x,31))
		if(hasUpgrade(x, 34)) gain = gain.pow(1.09)
		if(hasUpgrade(x, 35)) gain = gain.mul(121)

		if(player.realm == "dark") gain = gain.pow(0.3)
		if(player.realm == "lost") gain = gain.log(10)
	}
	if(x=='d'){
		if(hasUpgrade('d', 11)) gain = gain.mul(3)
		if(hasUpgrade('d', 17)) gain = gain.mul(4.4)
		if(hasUpgrade('d', 18)) gain = gain.mul(upgradeEffect('d', 18))
		if(hasUpgrade('d', 22)) gain = gain.mul(16)
		if(hasUpgrade('d', 23)) gain = gain.mul(upgradeEffect('d', 23))

		gain = gain.mul(layerEffect('d'))
		if(hasUpgrade('i', 13)) gain = gain.mul(upgradeEffect('i', 13))
		if(hasUpgrade(x, 25)) gain = gain.mul(4.44)
		if(hasUpgrade(x,31))gain=gain.mul(upgradeEffect(x,31))
		if(hasUpgrade(x, 34)) gain = gain.pow(1.09)
		if(hasUpgrade(x, 35)) gain = gain.mul(121)

		if(player.realm == "dark") gain = gain.pow(0.3)
		if(player.realm == "lost") gain = gain.log(10)
	}
	if(x=='h'){
		if(hasUpgrade('h', 11)) gain = gain.mul(3)
		if(hasUpgrade('h', 17)) gain = gain.mul(4.4)
		if(hasUpgrade('h', 18)) gain = gain.mul(upgradeEffect('h', 18))
		if(hasUpgrade('h', 22)) gain = gain.mul(16)
		if(hasUpgrade('h', 23)) gain = gain.mul(upgradeEffect('h', 23))

		gain = gain.mul(layerEffect('h'))
		if(hasUpgrade('i', 13)) gain = gain.mul(upgradeEffect('i', 13))
		if(hasUpgrade(x, 25)) gain = gain.mul(4.44)
		if(hasUpgrade(x,31))gain=gain.mul(upgradeEffect(x,31))
		if(hasUpgrade(x, 34)) gain = gain.pow(1.09)
		if(hasUpgrade(x, 35)) gain = gain.mul(121)

		if(player.realm == "dark") gain = gain.pow(0.3)
		if(player.realm == "lost") gain = gain.log(10)
	}
	if(x=='s'){
		if(hasUpgrade('s', 11)) gain = gain.mul(3)
		if(hasUpgrade('s', 17)) gain = gain.mul(4.4)
		if(hasUpgrade('s', 18)) gain = gain.mul(upgradeEffect('s', 18))
		if(hasUpgrade('s', 22)) gain = gain.mul(16)
		if(hasUpgrade('s', 23)) gain = gain.mul(upgradeEffect('s', 23))

		gain = gain.mul(layerEffect('s'))
		if(hasUpgrade('i', 13)) gain = gain.mul(upgradeEffect('i', 13))
		if(hasUpgrade(x, 25)) gain = gain.mul(4.44)
		if(hasUpgrade(x,31))gain=gain.mul(upgradeEffect(x,31))
		if(hasUpgrade(x, 34)) gain = gain.pow(1.09)
		if(hasUpgrade(x, 35)) gain = gain.mul(121)

		if(player.realm == "dark") gain = gain.pow(0.3)
		if(player.realm == "lost") gain = gain.log(10)
	}

	if(player.realm == "lost" && hasUpgrade('i', 101)) gain = gain.pow(2.5)
	return gain.max(0)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	cpoints: d(0),
	dpoints: d(0),
	hpoints: d(0),
	spoints: d(0),
	jpoints: d(0),
	realm: "normal",
}}

// Display extra things at the top of the page
var displayThings = [
	function() {return `you have `+layerText(format(player.cpoints), 'c')+` clover frags, `+layerText(format(player.dpoints), 'd')+` dia frags,`},
	function() {return layerText(format(player.hpoints), 'h')+` heart frags, and `+layerText(format(player.spoints), 's')+` spade frags`},
	function() {return `<span style='color:gray'; font-size='16px !important'>(+${format(getPointGain('c'))}/s, +${format(getPointGain('d'))}/s, +${format(getPointGain('h'))}/s and +${format(getPointGain('s'))}/s)</span>`},
	function() {
		return "<span style='color:gray'; font-size='16px !important'>you are in the "+player.realm+" realm."+(player.realm == "normal" ? "" : " frag sum = "+format(fragSum()))+"</span>"
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.i.coinz.gte(1000)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(10) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

// Shortcut for new Decimal(x) because im lazy
function d(x) {
	return new Decimal(x)
}

// Makes text large with a glow effect
function layerText(text, layer) {
	return `<h2 style='color: ${tmp[layer].color};text-shadow: 0 0 10px ${tmp[layer].color};'>${text}</h2>`
}

// handles point gain
function handlePointGain(diff){
	player.cpoints = player.cpoints.add(getPointGain('c').mul(diff))
	player.dpoints = player.dpoints.add(getPointGain('d').mul(diff))
	player.hpoints = player.hpoints.add(getPointGain('h').mul(diff))
	player.spoints = player.spoints.add(getPointGain('s').mul(diff))
}

function tn(x){
	return x.pow(2).add(x).div(2)
}

function inversetn(x){
	return x.mul(8).add(1).sqrt().div(2).sub(0.5)
	// god why does it have to be sqrt(8x+1)/2+0.5
}

function layerEffect(layer){
	return tmp[layer].effect
}

function clickableEffect(layer, id){
	return tmp[layer].clickables[id].effect
}

function handleRealmEnters(coolstuff){
	player.realm = coolstuff
	doReset('i', true)
	layers.i.onPrestige()
}

function handleRealmExit(coolstuff){
	player.realm = "normal"
	doReset('i', true)
	layers.i.onPrestige()
}

function fragSum() {
	return player.cpoints.add(player.dpoints.add(player.hpoints.add(player.spoints)))
}

function passiveGenCap() {
	let x = d(1000)
	x = x.mul(d(player.i.upgrades.length).pow_base(10))
	if(hasMilestone('i', 3)) x = x.mul(clickableEffect('i', 12)[0])
	if(hasMilestone('i', 4)) x = x.mul(1000)
	return x
}

function passiveGenAmt() {
	let x = d(0.2)

	return x
}

// i'm too lazy to do it manually
function arrayGen(rows, cols, startid, feature){
	let arr = []
	for(let i=1;i<=rows;i++){
		for(let j=1;j<=cols;j++){
			let idmod = i*10+j-11
			let realid = startid+idmod
			arr.push([feature, realid])
		}
	}
	return arr
}

function generateMilestones(startid, endid) {
	let arr = []
	for(let i=startid; i<=endid;i++){
		arr.push(["milestone", i])
	}
	return arr
}
