/**
 * 
 */

var darwin = darwin || {};

darwin.commitVisualiser = (function() {
	return {
		draw : function(dates, values, xAxis, title) {
			var data = new google.visualization.DataTable();

			data.addColumn('string', xAxis)
			data.addColumn('number', 'Commits')

			for (var i = 0; i < dates.length; i++) {
				data.addRow([
						dates[i][0] + "-" + dates[i][1] + "-" + dates[i][2],
						values[i] ])
			}

			var options = {
				title : title,
				hAxis : {
					slantedText : true,
					slantedTextAngle : 45
				},
				chartArea : {
					left : 100,
					width : '95%'
				},
				legend : {
					position : 'top'
				},
				height : 550,
				width : 1450,
				animation : {
					duration : 800,
					easing : 'out',
					startup : true,
				}
			};

			// Create and draw the visualization.
			new google.visualization.LineChart(document
					.getElementById('commitChart')).draw(data, options);
		}
	};
})();
