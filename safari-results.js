String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

$(document).ready(function() {
  var month = document.URL.split('#')[1];
  if(month == undefined){
    month = "february";
  }
  var base_url = window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/'));
  var month_url = base_url + "/results/" + month + "/";
  $.ajax({
    url: month_url + "results.json",
    dataType: 'json',
    success: function(data){
      addData(data);
    },
    error: function(jqXHR, responseText, errorThrown){
      console.log(errorThrown);
    }
  });
  
  addData = function(data) {
    var counts = _.countBy(data, 'name')
    counts = _.pairs(counts)
    counts = _.sortBy(counts, function(pair){
      return -pair[1];
    }); 
    populateLeaderboard(counts);
    var total = data.length;
    var participants = counts.length;
    events = _.map(data, function(item){
      var date = new Object();
      date.startDate = new Date(item.time);
      date.headline = item.caption;
      date.text = "A fine catch by " + item.name;
      date.asset = new Object();
      date.asset.media = base_url + "/results/" + month + "/images/" + item.image; 
      return date;
    });
    json = 
    {
      "timeline":
      {
        "headline":counts[0][0] + " wins!",
        "type":"default",
        "text":"A total of " + total + " sightings and " +  participants + " players!",
        "asset": {
            "media": base_url + "/logo.png",
            "caption": counts[0][0].split(" ")[0] + " will be taking home the red underpants!"
        },
        "date" : events
       }
     }
    createStoryJS({
      type:   'timeline',
      width:  '800',
      height: '600',
      source: json,
      embed_id: 'my-timeline',
      start_zoom_adjust: 1,
      font: "SansitaOne-Kameron"
    });
  };  
  //addData(data);
});
