// some of the images have a border that needs to be clipped
function getClass(item) {
    return item.ItemID === "F141" || item.ItemID === "F31" ? ' class="clip"' : ' ';
}

// handle items with no description
function getItemDescription(item) {
    return item.Description === "" ? "Unfortunately there is no description available for this item. We think the picture is worth a thousand words!" : item.Description
}

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
                    '<img src=' + item.PhotoName + '?w=300&h=300' + getClass(item) + '/>' +
                    '<div class="item-details-short">' +
                        '<h3>' + item.ItemName + '</h3>' +
                    '</div>' +
                '</div>' + 
                '<div style="display: none;" class="item-details"' + 'id="detail-' + item.ItemID.replace(" ", "") + '">' +
                    '<div class="item-details-image">' +
                        '<img src=' + item.PhotoName + '?w=450&h=450' + getClass(item) + '/>' +
                    '</div>' +
                    '<div class="item-details-long">' +
                        '<p>Item ID: ' + item.ItemID + '<p>' +
                        '<h1>$' + item.BasePrice + '</h1>' +
                        '<h2>' + item.ItemName + '</h2>' +
                        '<h3>Dimensions: ' + item.Dimensions + '</h3>' +
                        '<p>' + getItemDescription(item) + '</p>' +
                    '</div>' +
                '</div>' +
            '</div>');
        });


        // attach sales rep info
        var info = data.SalesRep;
        $("#contact-info-details").append(
            '<h2>Contact ' + info.FirstName + ' ' + info.LastName + ' to place an order</h2> ' +
            '<h2><span> <a href="mailto:' + info.EmailAddress + '">' + info.EmailAddress + '</a> &#183</span>' +
            '<span> <a href="tel:' + info.Phone + '">' + info.Phone + '</a></span></h2>' +
            '<span><h3> ' + info.City + ', ' + info.State + ' ' + info.PostalCode + ' </h3></span>');


        // handle when item gets clicked
        $(".item").click(function() {
            var currentlySelectedId = $(this).attr('id');
            $("#detail-" + currentlySelectedId).show();
            $(this).hide();
            $('#products').animate({
                scrollTop: $("#detail-" + currentlySelectedId).offset().top - $('#products').offset().top + $('#products').scrollTop()
            }, 1000);
        });

        $(".item-details").click(function() {
            var selectedId = $(this).attr('id');
            var originalId = selectedId.substring(7, selectedId.length);
            $("#" + originalId).show();
            $(this).hide();
        });
    });
});
