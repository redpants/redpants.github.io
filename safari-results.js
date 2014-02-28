json = 
{
    "timeline":
    {
        "headline":"The Main Timeline Headline Goes here",
        "type":"default",
        "text":"<p>Intro body text goes here, some HTML is ok</p>",
        "asset": {
            "media":"http://yourdomain_or_socialmedialink_goes_here.jpg",
            "credit":"Credit Name Goes Here",
            "caption":"Caption text goes here"
        },
        "date": [
            {
                "startDate":"2011,12,10",
                "endDate":"2011,12,11",
                "headline":"Headline Goes Here",
                "text":"<p>Body text goes here, some HTML is OK</p>",
                "tag":"This is Optional",
                "classname":"optionaluniqueclassnamecanbeaddedhere",
                "asset": {
                    "media":"http://twitter.com/ArjunaSoriano/status/164181156147900416",
                    "thumbnail":"optional-32x32px.jpg",
                    "credit":"Credit Name Goes Here",
                    "caption":"Caption text goes here"
                }
            }
        ],
        "era": [
            {
                "startDate":"2011,12,10",
                "endDate":"2011,12,11",
                "headline":"Headline Goes Here",
                "text":"<p>Body text goes here, some HTML is OK</p>",
                "tag":"This is Optional"
            }

        ]
    }
};


$(document).ready(function() {
  var month = document.URL.split('#')[1];
  if(month == undefined){
    month = "february";
  }
  var month_url = window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/')) + "/results/" + month + "/";
  $.ajax({
    url: month_url + "results.json",
    success: function(data){
      console.log(data);
    }
  });
  
  createStoryJS({
    type:   'timeline',
    width:  '800',
    height: '600',
    source: json,
    embed_id: 'my-timeline'
  });
});
