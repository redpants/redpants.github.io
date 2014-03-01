String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

data =  
[
   {"name":"Akash Badshah" , "caption":"Let the games begin"                         , "image":"february0.jpg"       , "time":"2014-02-28 09:52:00"} , 
   {"name":"Austin Freel"  , "caption":"Josh"                                        , "image":"february1.jpg"       , "time":"2014-02-28 10:37:00"} , 
   {"name":"Josh Haimson"  , "caption":"Sniped yfEarlyLead yffDeerInTheHeadlights"   , "image":"february2.jpg"       , "time":"2014-02-28 10:38:00"} , 
   {"name":"Josh Haimson"  , "caption":"Sniped yfEarlyLead yffDeerInTheHeadlights"   , "image":"february3.jpg"       , "time":"2014-02-28 10:39:00"} , 
   {"name":"Austin Freel"  , "caption":"Me"                                          , "image":"february4.jpg"       , "time":"2014-02-28 10:45:00"} , 
   {"name":"Josh Haimson"  , "caption":"Got Em coach"                                , "image":"february5.jpg"       , "time":"2014-02-28 10:59:00"} , 
   {"name":"Victor Pontis" , "caption":"redpants in the physics bathroom"            , "image":"february6.jpg"       , "time":"2014-02-28 11:11:00"} ,
   {"name":"Josh Haimson"  , "caption":"And the hunt continues"                      , "image":"febraury7.jpg"       , "time":"2014-02-28 11:31:00"} ,
   {"name":"Josh Haimson"  , "caption":"Two more"                                    , "image":"febraury8.jpg"       , "time":"2014-02-28 12:00:00"} ,
   {"name":"Josh Haimson"  , "caption":"Two more"                                    , "image":"febraury9.jpg"       , "time":"2014-02-28 12:01:00"} ,
   {"name":"Andrew Dorne"  , "caption":"A challenger appears"                        , "image":"february10.jpg"      , "time":"2014-02-28 12:37:00"} ,
   {"name":"Josh Haimson"  , "caption":"Do sweatpants count?"                        , "image":"february11.jpg"      , "time":"2014-02-28 14:10:00"} ,
   {"name":"Anna Leonard"  , "caption":"My formal entry"                             , "image":"february12.jpg"      , "time":"2014-02-28 14:28:00"} ,
   {"name":"Anna Leonard"  , "caption":"3 (but really 2) points on the way to class" , "image":"february13.jpg"      , "time":"2014-02-28 14:32:00"} ,
   {"name":"Anna Leonard"  , "caption":"3 (but really 2) points on the way to class" , "image":"february14.jpg"      , "time":"2014-02-28 14:33:00"} ,
   {"name":"Josh Haimson"  , "caption":"Grl u got dem paaaaaaaannnnnntzz"            , "image":"february15.jpg"      , "time":"2014-02-28 14:45:00"} ,
   {"name":"Anna Leonard"  , "caption":"Got another"                                 , "image":"february16.jpg"      , "time":"2014-02-28 14:59:00"} ,
   {"name":"Josh Haimson"  , "caption":"Through the saferide window"                 , "image":"february17.jpg"      , "time":"2014-02-28 15:21:00"} ,
   {"name":"Anna Leonard"  , "caption":"Redpants Sighting at the airport"            , "image":"february18.jpg"      , "time":"2014-02-28 16:14:00"} ,
   {"name":"Austin Freel"  , "caption":"Guy on Right"                                , "image":"february19.jpg"      , "time":"2014-02-28 16:20:00"} ,
   {"name":"Austin Freel"  , "caption":"Sniped Long Range #Zoom"                     , "image":"february20.jpg"      , "time":"2014-02-28 16:10:00"} 
];

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
