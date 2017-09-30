

$(window).on('load', function() {


//first hide everything we don't want showing
var hide_sections = function() {
    $("#generalDetails").hide()   
    $("#generalSettingOtherDetail").hide()
    $("#miscDetails").hide()

    $("#characterDetails").hide()

    $("#submitButton").hide()
}
hide_sections();


//wait for a type to be selected then show the correct areas of the form
$("#resourceType").on('change', function(){

    //re-hide all sections
    hide_sections();

    //make sure the general details are visible after the first type selection
    $("#generalDetails").show()
    $("#miscDetails").show()
    $("#submitButton").show()

    //get type value then show the correct details section related to it
    var resource_type = $("#resourceType").val()

    switch (resource_type.toLowerCase()) {
        case "character":
        case "quest":
        case "location":
        case "item":
            $("#"+resource_type.toLowerCase()+"Details").show()
            break;

        default:
            console.error("Error: "+resource_type+" is not a valid type.")      
    }
})

//Show the other field if select picks other
$("#generalSetting").on('change', function(){
    //by default hide the other input
    $("#generalSettingOtherDetail").hide()

    //loop through array (since this is a multi select
    var selection_array = $("#generalSetting").val();
    for ( var index in selection_array ) {
        var selection = selection_array[index].toLowerCase();

        if ( selection == "other") {
            $("#generalSettingOtherDetail").show()
            $("#generalSettingOtherDetail").atter
        }
    }
})



});
