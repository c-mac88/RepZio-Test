// some of the images have a border that needs to be clipped
function getClass(item) {
    return item.ItemID === "F141" || item.ItemID === "F31" ? ' class="clip"' : ' ';
}

// handle items with no description
function getItemDescription(item) {
    return item.Description === "" ? "Unfortunately there is no description available for this item. We think the picture is worth a thousand words!" : item.Description
}

// declare lobal variable used later for selecting an item
let currentlySelectedId;

$(document).ready(function () {
    $.getJSON("data.json", function (data) {
        var manufacturerId = data.ManufacturerID;

        // append title and logo
        $("#title").append(data.CompanyName);
        $("#logo").append('<img src="https://images.repzio.com/productimages/' + manufacturerId + '/logo' + manufacturerId + '_lg.jpg" />');

        // populate the product thumbnails
        $(data.items).each(function (index, item) {
            $("#item-container").append(
                '<div class="item"' + 'id="' + item.ItemID.replace(" ", "") + '">' +
                    '<div><img src=' + item.PhotoName + '?w=500&h=500' + getClass(item) + '/></div>' +
                    '<div class="item-details-short">' +
                        '<h2>' + item.ItemName + '</h2>' +
                    '</div>' +
                '</div>');

            // set up the detailed view, hidden until user selects item
            $("#item-detail-container").append(
                '<div style="display: none;" class="detail-item"' + 'id="detail-' + item.ItemID.replace(" ", "") + '">' +
                    '<div class="item-details-image">' +
                        '<p>Item ID: ' + item.ItemID + '<p>' +
                        '<img src=' + item.PhotoName + '?w=500&h=500' + getClass(item) + '/>' +
                    '</div>' +
                    '<div class="item-details-long">' +
                        '<h1>$' + item.BasePrice + '</h1>' +
                        '<h2>' + item.ItemName + '</h2>' +
                        '<h3>Dimensions: ' + item.Dimensions + '</h3>' +
                        '<p>' + getItemDescription(item) + '</p>' +
                    '</div>' +
                '</div>');
        });


        // attach sales rep info
        var info = data.SalesRep;
        $("#contact-info-details").append(
            '<span>Contact ' + info.FirstName + ' ' + info.LastName + ' to place an order &#183</span> ' +
            '<span> ' + info.City + ', ' + info.State + ' ' + info.PostalCode + ' &#183</span>' +
            '<span> <a href="mailto:' + info.EmailAddress + '">' + info.EmailAddress + '</a> &#183</span>' +
            '<span> <a href="tel:' + info.Phone + '">' + info.Phone + '</a></span>');


        // // handle when the items get hovered over
        // $(".item").hover(function () {
        //     var selectedId = $(this).attr('id');
        //     $(this).attr("class", "item selected");
        //     $("#" + selectedId + " div").show();
        // }, function () {
        //     var selectedId = $(this).attr('id');
        //     $(this).attr("class", "item");
        //     $("#" + selectedId + " div").hide();
        // });


        // handle when item gets clicked
        $(".item").click(function() {
            currentlySelectedId = $(this).attr('id');
            $(".item").hide();
            $("#header").hide();
            $("#detail-" + currentlySelectedId).show();
            $("#back-button").show();
        });

        // handle back button
        $("#back-button").click(function() {
            $("#detail-" + currentlySelectedId).hide();
            $("#back-button").hide();
            $("#header").show();
            $(".item").show();
        })

        $(function () {
            // Check the initial Poistion of the Sticky Header
            var stickyHeaderTop = $('#contact-info').offset().top;

            $(window).scroll(function () {
                if ($(window).scrollTop() > stickyHeaderTop) {
                    $('#contact-info').attr("class", "sticky");
                } else {
                    $('#contact-info').attr("class", "");
                }
            });
        });
    });
});
