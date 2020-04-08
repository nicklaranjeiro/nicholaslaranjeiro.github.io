$(document).ready(function (){
    $("#myform").submit(function (){
        
        $("#results").empty();
        var search = $("#books").val()

        $.get("https://www.googleapis.com/books/v1/volumes?q=" + search, function(response){
            console.log(response);
            for(var i = 0; i < response["items"].length; i++){
                var img = response["items"][i].volumeInfo.imageLinks.smallThumbnail;
                var bookLink = response["items"][i].volumeInfo.previewLink;
                var title = response["items"][i].volumeInfo.title;
                var date = response["items"][i].volumeInfo.publishedDate;
                var author = response["items"][i].volumeInfo.authors;
                var category = response["items"][i].volumeInfo.categories;

                if(author == undefined || img == undefined || title == undefined || date == undefined || category == undefined || bookLink == undefined){
                    i++;
                    img = response["items"][i].volumeInfo.imageLinks.smallThumbnail;
                    bookLink = response["items"][i].volumeInfo.previewLink;
                    title = response["items"][i].volumeInfo.title;
                    date = response["items"][i].volumeInfo.publishedDate;
                    author = response["items"][i].volumeInfo.authors;
                    category = response["items"][i].volumeInfo.categories;
                }

                $("#results").append("<div class='books' align='center'>" +
                "<a href = " + bookLink + " target='_blank'><img src=" + img + "/></a>" +
                "<p>" + title + " (" + date.substring(0, 4) + ")" +
                "<p>" + author + "</p>" +
                "<p> Category: " + category + "</p><hr/></div>");
            }
        })

        return false;
    });

    $("#myformRandom").submit(function (){
        $("#results").empty();
        var search = $("#category").val()

        $.get("https://www.googleapis.com/books/v1/volumes?q=subject:" + search, function(response){
            var random = Math.floor((Math.random() * 9));

            var img = response["items"][random].volumeInfo.imageLinks.smallThumbnail;
            var bookLink = response["items"][random].volumeInfo.previewLink;
            var title = response["items"][random].volumeInfo.title;
            var date = response["items"][random].volumeInfo.publishedDate;
            var author = response["items"][random].volumeInfo.authors;
            var category = response["items"][random].volumeInfo.categories;

            $("#results").append("<div class='books' align='center'>" +
            "<a href = " + bookLink + " target='_blank'><img src=" + img + "/></a>" +
            "<p>" + title + " (" + date.substring(0, 4) + ")" +
            "<p>" + author + "</p>" +
            "<p> Category: " + category + "</p><hr/></div>");

        })

        return false;
    });

    

})