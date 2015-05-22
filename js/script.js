function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetVal=$("#street").val();
    var cityVal=$("#city").val();
    console.log(cityVal);//this works
    var address=streetVal+","+cityVal;
    var urlVal='https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address;//the +'' in the course answer is not necessary

    $body.append('<img class="bgimg" src="' +urlVal+ '">');//why is "' +   +'" required?
    //return false; //without this line the image flashes and then goes away. But with this the nyt does not run.Why?

    var nyKey='e831cd846809f7725229b8ce66e3436f:15:71398341';
    var nyAPI='http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityVal+'&sort=newest&api-key='+nyKey;
    console.log(nyAPI);
    $.getJSON(nyAPI, function(data){
        console.log(data);
        $nytHeaderElem.text('NY Times articles about '+cityVal+':');//need ()
        var articles=data.response.docs;//not "var articles"!
        for (var i=0; i<3; i++) {
            var article=articles[i];
            $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'</li>');
        } //for
    }).error(function(e){
            console.log("here at error section");
            $nytHeaderElem.text('There is problem finding NYTimes articles, my bad!');
        });
//wikipedia AJAX request goes here
    var wikiUrl='http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityVal + '&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text('request to wikipedia failed');}, 8000);

    $.ajax(wikiUrl,{
        dataType: 'jsonp',
        success: function(response){
            var articles=response[1];
            console.log(articles);
            for (var i=0; i<5; i++) {
                var article=articles[i];
                var wik='http://en.wikipedia.org/wiki/'+article;
                $wikiElem.append('<li><a href="'+wik+'">'+article+'</a></li>');
            }//for
            clearTimeout(wikiRequestTimeout);
        }//success
    });//wikiAPI


    return false;
};//loadData
//loadData();
$('#form-container').submit(loadData);