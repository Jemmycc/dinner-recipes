
$(document).ready(function () {

    function runSearch(recipeSearch) {
        var recipeData = [];
        var recipes = [];
        var MAX_RECIPES = 20;
        var cardNum = ["#card-one", "#card-two", "#card-three", "#card-four", "#card-five", "#card-six"];

        //API for food2fork.com
        var foodURLBase = "https://www.food2fork.com/api/search?key=70681d58b1a383e9f04015562d23961c&q=" + recipeSearch + "&sort=r";

        $.ajax({
            url: foodURLBase,
            method: "GET"
        }).then(function (data) {

            // console.log(data);

            recipeData.splice(0, 1, JSON.parse(data));
            recipes = recipeData[0].recipes;

            console.log(recipeData);

            if (recipes.length === 0) {
                $("span").text("There is no recipe for " + recipeSearch + "search.");
                return;
            }

            // for (var i = 0; i < cardNum.length; i++) {
            //     // $(cardNum[i] + " .card-header").text(recipes[i].title);
            //     // $(cardNum[i] + " img").attr("src", recipes[i].image_url);
            //     // $(cardNum[i] + " .card-publisher").text("Published by " + recipes[i].publisher);
            //     // $(cardNum[i] + " .card-rating").text("Rating is " + parseInt(recipes[i].social_rank) + "%");
            //     // $(cardNum[i] + " .card-link").text(recipes[i].source_url);
            //     // $(cardNum[i] + " .card-link").attr("href", recipes[i].source_url);


            // }

            for (var i = 0; i < recipes.length || i < MAX_RECIPES; i++) {

                var card = $("<div>")
                    .addClass("card")
                    .attr({ "style": "18rem" });

                var image = $("<img>")
                    .addClass("card-img")
                    .attr("src", recipes[i].image_url);

                card.append(image);

                var cardBody = $("<div>")
                    .addClass("card-body");

                var title = $("<h5>")
                    .addClass("card-title").text(recipes[i].title);
                card.append(title);

                var publisher = $("<p>")
                    .addClass("card-publisher").text("Published by " + recipes[i].publisher)
                card.append(publisher);

                var ranking = $("<p>")
                    .addClass("card-rating").text("Rating is " + parseInt(recipes[i].social_rank) + "%")
                card.append(ranking);

                var url = $("<a>")
                    .addClass("card-link").text(recipes[i].source_url)
                    .addClass("card-link").attr("href", recipes[i].source_url);
                card.append(url);

                $(".content-holder").append(card);


            }
        })
    }



    $("#search-btn").on("click", function () {
        var recipeSearch = $("#inputsm").val().trim();
        runSearch(recipeSearch);

        $(".content-holder").addClass("scroll-box")
        $(".content-holder").addClass("scrolling-wrapper")

        $(".recipe-suggestions").text("Recipe Suggestions")
        document.getElementById('recipe-header').style.display = 'none';


    })
})
