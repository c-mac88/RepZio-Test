// some of the images have a border that needs to be clipped
const getClass = (item) => item.ItemID === "F141" || item.ItemID === "F31" ? ' class="clip"' : ' ';

// handle items with no description
const getItemDescription = (item) =>
    item.Description === "" ? "Unfortunately there is no description available for this item. We think the picture is worth a thousand words!" : item.Description;

$(document).ready(function () {

    // read data from JSON file
    $.getJSON("data.json", function (data) {
        var manufacturerId = data.ManufacturerID;

        function populateDetails(itemId) {
            // get the selected item based on ID passed in
            var item = data.items.find(item => item.ItemID.replace(" ", "") === itemId);

            $("#item-details")  .append(
            '<div class="item-details-image">' +
                '<img src=' + item.PhotoName + '?w=400&h400' + getClass(item) + '/>' +
            '</div>' +
            '<div class="item-details-long">' +
                '<p id="less-details-button" >show less</p>' +
                '<h4>Item ID: ' + item.ItemID + '<h4>' +
                '<h1>$' + item.BasePrice + '</h1>' +
                '<h2>' + item.ItemName + '</h2>' +
                '<h3>Dimensions: ' + item.Dimensions + '</h3>' +
                '<p>' + getItemDescription(item) + '</p>' +
            '</div>');
            
            $("#footer").attr("class", "detail-view");
        }

        // append title and logo
        $("#title").append(data.CompanyName);
        $("#logo").append('<img src="https://images.repzio.com/productimages/' + manufacturerId + '/logo' + manufacturerId + '_lg.jpg" />');

        // populate the product thumbnails and details
        $(data.items).each(function (index, item) {
            $("#item-container").append(
                '<div class="item"' + 'id="' + item.ItemID.replace(" ", "") + '">' +
                    '<img src=' + item.PhotoName + '?w=300&h=300' + getClass(item) + '/>' +
                    '<div class="item-details-short">' +
                        '<h3>' + item.ItemName + '</h3>' +
                        '<p id="more-details-button" >show more</p>' +
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
            populateDetails($(this).attr("id"));
            $(".item").hide();

        });

        // handle closing product details
        $("#item-details").click(function() {
            $("#item-details").html("");
            $(".item").show();
            $("#footer").attr("class", "");
        });
    });
});
