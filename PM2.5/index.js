(function gloabal_distribution(){
    if(myBrowser()==="Safari"||myBrowser()==="IE"){
        setTimeout(function(){
        	// alert("您的浏览器不支持WebGL技术,部分效果不体验不佳,请换用firefox或者chrome,");
        	//准备截张图片
        },2000)
        return;
    }
    var globe = DAT.Globe(document.getElementById('global_Container'), {
        colorFn: function(label) {
            return new THREE.Color([
                0xd9d9d9, 0xb6b4b5, 0x9966cc, 0x15adff, 0x3e66a3,
                0x216288, 0xff7e7e, 0xff1f13, 0xc0120b, 0x5a1301, 0xffcc02,
                0xedb113, 0x9fce66, 0x0c9a39,
                0xfe9872, 0x7f3f98, 0xf26522, 0x2bb673, 0xd7df23,
                0xe6b23a, 0x7ed3f7
            ][label]);
        }
    });

    var xhr = new XMLHttpRequest();
    xhr.open('GET', './data/global.json', true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                globe.addData(data, {
                    format: 'legend'
                });
                globe.createPoints();
                globe.animate();
            }
        }
    };
    xhr.send(null);
})();

(function d3_render(){
	function d3Map(){
		function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
			return "<h4>"+n+"</h4><table>"+
				"<tr><td>Low</td><td>"+(d.low)+"</td></tr>"+
				"<tr><td>Average</td><td>"+(d.avg)+"</td></tr>"+
				"<tr><td>High</td><td>"+(d.high)+"</td></tr>"+
				"</table>";
		}
		var sampleData ={};	/* Sample data */	
		['JXI', 'LIA', 'TIB', 'NMG', 'SHH', 'CHQ', 'XIN', 'SHD', 'HEN', 'GUD', 'GUI', 'BEJ', 'MAC', 'TAJ', 'HLJ', 'HEB', 'ZHJ', 'ANH', 'GXI', 'HAI', 'JIL', 'SHX', 'HUN', 'YUN', 'FUJ', 'HUB', 'SHA', 'HKG', 'QIH', 'GAN', 'JSU', 'SCH', 'NXA', 'TAI']
			.forEach(function(d){ 
				var low=Math.round(100*Math.random()), 
					mid=Math.round(100*Math.random()), 
					high=Math.round(100*Math.random());
				sampleData[d]={low:d3.min([low,mid,high]), high:d3.max([low,mid,high]), 
						avg:Math.round((low+mid+high)/3), color:d3.interpolate("#007eff", "#333333")(low/100)}; 
			});
		d3.json("./data/chinaMap.json",function(data){
			var uStatePaths=data;
		    var svg = d3.select("#d3MapWrap") 
		            .append("svg") 
		            .attr("id","d3MapSVG")
		            .attr("width",600) 
		            .attr("height",470)
		            .attr("text-align","left");
	        var uStates = {};
	 	    uStates.draw = function(id, data, toolTip) {
				function mouseOver(d) {
					d3.select("#tooltip_d3map").transition().duration(200).style("opacity", .9);

					d3.select("#tooltip_d3map").html(toolTip(d.n, data[d.id]))
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY - 28) + "px");
				}

				function mouseOut() {
					d3.select("#tooltip_d3map").transition().duration(500).style("opacity", 0);
				}

				function click(d){
					var id=d.id;
					var _path=d3.select("path#"+id);
					_path.style("fill",function(d){
						if(_path.attr("active")==="true"){
							_path.attr("active","false")
							return data[d.id].color;
						}else{
							_path.attr("active","true")
							return "yellow"
						}
					});
				}

				d3.select(id).selectAll(".state")
					.data(uStatePaths).enter().append("path").attr("class", "state").attr("id",function(d){
						return d.id;
					}).attr("d", function(d) {
						return d.d;
					})
					.style("fill", function(d) {
						return data[d.id].color;
					}).style("cursor","pointer")
					.on("mouseover", mouseOver).on("mouseout", mouseOut)
					.on("click",click);

			}
			/* draw states on id #d3MapSVG */	
			uStates.draw("#d3MapSVG", sampleData, tooltipHtml);
		})
	}
	
	d3Map();
})();