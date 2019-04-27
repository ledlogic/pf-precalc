var pf = {
	data: [
		"Khazat +22/+17/+12 (1d10+13) x3"
	],
	
	results: [],
	
	init: function() {
		for (i in pf.data) {
			pf.results[i] = pf.parse(i, pf.data[i]);
		}
	},
	
	die : function(qty, die, mod) {
		var ret = mod;
		for (var i = 0; i < qty; i++) {
			ret += pf.dieN(die);
		}
		return ret;
	},

	dieN : function(die) {
		return Math.floor(Math.random() * die) + 1
	},
	
	parse: function(i, s) {
		var pts = s.split(" ");
		var th = pts[1].split("/");
		var d = pts[2].substring(1, pts[2].length -1);
		var m = pts[3];

		var ret = [];
		for (var t=0; t<th.length; t++) {
			var r = pf.die(1, 20, 0);
			console.log([t,th[t], r]);
			
			var ds = d.split("+");
			console.log(["ds", ds]);

			var qty = parseInt(ds[0].split("d")[0],10);
			var die = parseInt(ds[0].split("d")[1],10);
			var mod = parseInt(ds[1]);
			
			console.log(["qtm",qty,die,mod]);
			var damage = pf.die(qty, die, mod);
			
			var res = {
				roll: r,
				res: r+parseInt(th[t]),
				dam: damage
			}
			
			console.log(res);
			
			ret.push(res);
		}
		return ret;
	},
	
	render: function() {
		var h = [];
		h.push("<table class=\"pf-results-table\">");
		h.push("<tr><th>input</th><th>attack</th><th>damage</th></tr>");
		for (i in pf.results) {
			h.push("<tr>");
			var attack = "";
			for (var j in pf.results[i]) {
				attack += "roll: " + pf.results[i][j].roll + ",";
				attack += "result: " + pf.results[i][j].res + "<br/>";
			}			
			var damage = "";
			for (var j in pf.results[i]) {
				damage += pf.results[i][j].dam + "<br/>";
			}			
			h.push("<td>" + pf.data[i] + "</td><td>" + attack + "</td><td>" + damage + "</td>");
			h.push("</tr>");
		}
		h.push("</table>");
		$("#pf-results").html(h.join(""));
	}
};

$(function() {
	pf.init();
	pf.render();
});