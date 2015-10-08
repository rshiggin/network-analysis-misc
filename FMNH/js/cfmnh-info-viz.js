/**
 * @author zeroshiiro
 * @version 0.5
 *
 *
 * Currently no interactivity has been added.
 * Interactivity will be added in phase 2
 */

( function(document, window, $, undefined) {

		//will need to get these from the data set directly at somepoint.
		var dateRange = ["2008-01", "2008-02", "2008-03", "2008-04", "2008-06", "2008-07", "2008-08", "2008-09", "2008-10", "2008-11", "2008-12", "2009-01", "2009-02", "2009-03", "2009-04", "2009-06", "2009-07", "2009-08", "2009-09", "2009-10", "2009-11", "2009-12", "2010-01", "2010-02", "2010-03", "2010-04", "2010-06", "2010-07", "2010-08", "2010-09", "2010-10", "2010-11", "2010-12", "2011-01", "2011-02", "2011-03", "2011-04", "2011-06", "2011-07", "2011-08", "2011-09", "2011-10", "2011-11", "2011-12", "2012-01", "2012-02", "2012-03", "2012-04", "2012-06", "2012-07", "2012-08", "2012-09", "2012-10", "2012-11", "2012-12", "2013-01", "2013-02", "2013-03", "2013-04", "2013-06", "2013-07", "2013-08", "2013-09", "2013-10", "2013-11", "2013-12", "2014-01", "2014-02", "2014-03", "2014-04", "2014-06", "2014-07", "2014-08", "2014-09", "2014-10", "2014-11", "2014-12"];
		//department and sub-department names
		// var departmentRange = ["Anthropology", "Botany", "Zoology_Invertebrates", "Zoology_Amphibians and Reptiles", "Zoology_Mammals", "Zoology_Insects", "Zoology_Fishes", "Zoology_Birds", "Geology_Paleobotany", "Geology_Fossil Invertebrates"]
		//only main department names
		var deptRange = ["Anthropology", "Botany", "Zoology", "Geology"];

		function radius(d) {
			return d.cumulative;
		}

		function y(d) {
			return d.frequency;
		}

		function x(d) {
			//send entire departname with sub-department name
			// return d.department;
			//send only main department name
			return d.department.split("_")[0];
		}

		function key(d) {
			return d.catalogIRN;
		}

		//dimensions of svg drawing area
		var margin = {
			top : 19.5,
			right : 19.5,
			bottom : 19.5,
			left : 19.5
		},
		// Set the width element according to window width
		width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		//account for margins in the height and width
		width = 0.75 * width - margin.right - margin.left, height = 0.75* height - margin.top - margin.bottom;

		// cant add domains since the data hasn't been imported
		// x axis scales
		var xScale = d3.scale.ordinal().rangeRoundBands([margin.left, width], 0.01),
		//y axis scale
		yScale = d3.scale.linear().domain([0, 100]).range([height, margin.top]),
		//radius axis scale
		rScale = d3.scale.sqrt().range([5, 40]);

		// x Axis data
		var xAxis = d3.svg.axis().orient("bottom").scale(xScale),
		// y Axis data
		yAxis = d3.svg.axis().scale(yScale).orient("left");

		var svg = d3.select('body').append('svg').attr({
			'width' : width + margin.right + margin.left,
			'height' : height + margin.top + margin.bottom
		});

		var label = svg.append("text").attr({
			"class" : "date label",
			"text-anchor" : "end",
			"y" : height - 18,
			"x" : width,
		}).text(dateRange[0]);

		// Add the x-axis.
		svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

		// Add the y-axis.
		svg.append("g").attr("class", "y axis").call(yAxis);

		// Add an x-axis label.
		// svg.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", width).attr("y", height - 6).text("Department");

		// Add a y-axis label.
		svg.append("text").attr("class", "y label").attr("text-anchor", "end").attr("y", 6).attr("dy", ".75em").attr("transform", "rotate(-90)").text("Frequency of changes");

		d3.json("js/json/cfmnh.json", function(error, specimens) {
			if (error) {
				console.log(error);
			}

			//set domains for scales dynamically since upper bounds are unknown
			//right now set using magic numbers till it can be calulated on the fly
			rScale.domain([0, 1134]);
			xScale.domain(specimens.map(function(d) {
				return x(d);
			}));

			//create a bisector to interpret data for dates that have no data available
			var bisect = d3.bisector(function(d) {
				return d[0];
			});

			//create background bars to separate department space
			var bar = svg.append("g").attr("class", "deptBars").selectAll(".deptBars rect").data(deptRange).enter().append("rect").attr({
				"class" : function(d) {
					return d;
				},
				"x" : function(d) {
					return xScale(d);
				},
				"y" : 0,
				"width" : xScale.rangeBand(),
				"height" : height
			});

			//write the names for each department
			var name = svg.append("g").attr("class", "deptNames").selectAll(".deptNames text").data(deptRange).enter().append("text").attr({
				"class" : function(d) {
					return d.toLowerCase();
				},
				"x" : function(d) {
					return xScale(d) + xScale.rangeBand() / 2;
				},
				"y" : 30,
				"text-anchor" : "middle"
			}).text(function(d) {
				// var dept = d.split("_");
				// return dept[0];
				return d;
			});

			// write the names for respective subdepartments if available
			var name = svg.append("g").attr("class", "subDeptNames").selectAll(".subDeptNames text").data(deptRange).enter().append("text").attr({
				"class" : function(d) {
					return d;
				},
				"x" : function(d) {
					return xScale(d) + xScale.rangeBand() / 2;
				},
				"y" : 60,
				"text-anchor" : "middle"
			}).text(function(d) {
				var dept = d.split("_");
				return dept[1] != undefined ? dept[1] : "";
			});

			//Initialize all specimens to 2008-01
			var dot = svg.append("g").attr("class", "specimens").selectAll(".specimen").data(interpret("2008-01")).enter().append("circle").attr({
				"class" : function(d) {
					return "specimen " + x(d).split("_")[0];
				},
				'cx' : function(d, i) {
					//account for radius space of 20px - 25px on either side to prevent bubbles from overrunning the department bars?
					return xScale(x(d)) + Math.floor(Math.random() * (xScale.rangeBand() - 40)) + 20;
				}
			}).style({
				"stroke" : "white"
			}).call(position).sort(order);

			// Add a title. can be expanded in the future to add mouse over actions
			dot.append("title").text(function(d) {
				return key(d);
			});

			// Start a transition that interpolates the data based on dates.
			svg.transition().duration(50000).ease("sine").tween('yearMonth', tweenYearMonth);
			//.each("end", enableInteraction);

			function position(dot) {
				dot.transition().duration(200).ease("linear").attr({
					'cy' : function(d) {
						return yScale(y(d));
					},
					'r' : function(d) {
						return rScale(radius(d));
					},
				});
			}

			//position the specimens such that the circle with smallest radius is on top
			function order(a, b) {
				return radius(b) - radius(a);
			}

			function tweenYearMonth(date) {
				var iplate = d3.interpolateNumber(0, dateRange.length - 1);
				return function(t) {
					displayDate(iplate(t));
					// displayDate(t);
				}
			}

			//display for specific year
			function displayDate(date) {
				// console.log(date);
				dot.data(interpret(dateRange[Math.round(date)])).call(position).sort(order);
				label.text(dateRange[Math.round(date)]);
			}

			//Interprets the value for a given month-year pair
			function interpret(date) {
				return specimens.map(function(d) {
					return {
						department : d.department,
						catalogIRN : d.catalogIRN,
						frequency : interpretFrequencyValue(d.frequency, date),
						cumulative : interpretValue(d.cumulative, date)
					};
				});
			};

			//interpret cumulative value
			function interpretValue(values, date) {
				var r = bisect.right(values, date, 0, values.length - 1);

				// * r === 0 and date<values[r][0] return 0
				// * r === 0 and date === values [r][0] return values[r][1]
				// * r > 0 and date === values[r][0] return values[r][1]
				// * r > 0 and date < values [r][0] return values[r-1][1]
				// * r > and date > values [r][0] return values [r-1][1]
				if (r === 0) {
					if (date < values[r][0]) {
						return 0;
					} else {
						return values[r][1];
					}
				} else {
					if (date !== values[r][0]) {
						return values[r-1][1];
					} else {
						return values[r][1];
					}
				}

			}

			//find frequencey value if it exists
			function interpretFrequencyValue(values, date) {

				var retVal;
				values.forEach(function(d) {
					if (date === d[0]) {
						// console.log(d[1]);
						retVal = d[1];
					}
				}, date);

				if (retVal) {
					return retVal;
				} else {
					return 0;
				}
			}

		});

	}(document, window, $))