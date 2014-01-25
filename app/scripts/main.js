    

    function chart() {
        var margin = {top: 20, right: 20, bottom: 30, left: 80},
            years = 20,
            width = 245,
            height = 186,
            selector = 'body',
            data_set = null;

        function min_max_accessor(a) {
            return a.year;
        }

        function my() {

            //Ajust width/height
            width = width - margin.left - margin.right;
            height = height - margin.top - margin.bottom;

            //X and Y Scale
            var x = d3.scale.linear().domain([0, data_set.length])
                                     .range([0, width]);
            var y = d3.scale.linear().domain([d3.min(data_set, min_max_accessor)],
                                             [d3.max(data_set, min_max_accessor)])
                                     .range([height, 0]);
                    
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");
                //.tickFormat(function(d, i) {
                //    return d
                //});
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");
                //.tickFormat(function(d, i) {
                //    return '$' + d/1000 + "k"
                //});
            var area = d3.svg.area()
                .x(function(d) { return x(d.date); })
                .y0(function(d) {
                    return y(0);
                })
                .y1(function(d) { return y(d.cost); });

            var line = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.cost); });
            var svg = d3.select(selector).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            var yAxis = svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .attr("id", "y_axis");

            //svg.append("path")
            //    .datum(data_set)
            //    .attr("d", area)
            //    .style("stroke", "#000");
            //svg.selectAll("path")
            //    .data(data_set)
            //    .enter()
            //    .append("path")
            //        .attr("d", area)
            //        .style("stroke", "#000");

            svg.selectAll("path")
                .data(data_set)
                .enter()
                .append("path")
                    .attr("class", "line")
                    .attr("d", line)
                    .style("stroke", "#000");
            

            svg.append("text")
                .attr("x", x(20))
                .attr("y", y(0) + 20)
                .attr("text-anchor", "end")
                .text("20yrs");
        }
        my.data_set = function(value) { 
            if(!arguments.length) return data_set;
            data_set = value;
            return my;
        };
        my.width = function(value) {
            if(!arguments.length) return width;
            width = value;
            return my;
        };
        my.height = function(value) {
            if (!arguments.length) return height;
            height = value;
            return my;
        };
        my.selector = function(value) {
            if(!arguments.length) return selector;
            selector = value;
            return my;
        };

        return my;
    }

    var month2num={
        "Jan": 0,
        "Feb": 1,
        "Mar": 2,
        "Apr": 3,
        "May": 4,
        "Jun": 5,
        "Jul": 6,
        "Aug": 7,
        "Sep": 8,
        "Oct": 9,
        "Nov": 10,
        "Dec": 11},
        data = null;

    function parseCSVdata(d) {
        var year = new Date(+d.date.slice(4), month2num[d.date.slice(0,3)]),
            price = +d.cost
        return {
            'year': year,
            'price': price
        };
    }

    function parseCSVcallback(error, rows) {
        console.log(rows);
        var chart1 = chart().data_set(rows).selector('#chart1');
        chart1();        
    }

    d3.csv("../us_natural_gas_prices.csv", parseCSVdata, parseCSVcallback);


