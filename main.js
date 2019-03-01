// function to handle clicking a specific product

// some of the images have a border that needs to be clipped
function getClass(item) {
    return item.ItemID === "F141" || item.ItemID === "F31" ? ' class="clip"' : ' ';
}

$(document).ready(function(){
    $.getJSON("data.json", function(result){
        console.group(result.items);
        $(result.items).each(function(index, item) {
            $("#item-container").append(
                '<div class="item"' + 'id="' + item.ItemID.replace(" ", "") + '">' +
                    '<img src=' + item.PhotoName + '?w=300&h=300' + getClass(item) +  '/>' +
                    '<div class="item-details-short"><h2>' + item.ItemName + '</h2></div>' +
                '</div>');
        });


        // attach sales rep info
        var info = result.SalesRep;
        $("#contact-info-details").append(
            '<span>Contact ' + info.FirstName + ' ' + info.LastName + ' for more information &#183</span> ' +
            '<span> ' + info.FirstName + ' ' + info.LastName + ' &#183</span>' +
            '<span> ' + info.City + ', ' + info.State + ' '  + info.PostalCode + ' &#183</span>' +
            '<span> ' + info.EmailAddress + ' &#183</span>' +
            '<span> ' + info.Phone + '</span>');


        // handle when the items get hoverd over
        $(".item").hover(function() {
            var selectedId = $(this).attr('id');
            $(this).attr("class", "item selected");
            $("#" + selectedId + " div").show();
        }, function() {
            var selectedId = $(this).attr('id');
            $(this).attr("class", "item");
            $("#" + selectedId + " div").hide();
        });


        // handle when the items get clicked
        $(".item").click(function() {
            console.log('clicked');
        });

        
        //handle sticky contact info
        $(function(){
            // Check the initial Poistion of the Sticky Header
            var stickyHeaderTop = $('#contact-info').offset().top;
    
            $(window).scroll(function(){
                    if( $(window).scrollTop() > stickyHeaderTop ) {
                            $('#contact-info').attr("class", "sticky");
                    } else {
                            $('#contact-info').attr("class", "");
                    }
            });
      });
    });
});
