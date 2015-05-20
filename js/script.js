
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
    var address=streetVal+","+cityVal;
    var urlVal="https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+address;//the +'' in the key is not necessary
    //var imageVal=.getAjax(urlVal){
    //    key: "AIzaSyCyHY2v3Zf07pPIwa3eTJxgf1TWZSfUyC8";
    //}
    $body.append('<img class="bgimg" src="' +urlVal+ '">');//why is "' +   +'" required?
    return false;
};

$('#form-container').submit(loadData);
