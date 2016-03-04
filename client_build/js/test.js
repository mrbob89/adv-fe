$(document).ready(function() {

    var posts = Data.getPosts();

    var templateJsonPosts = Handlebars.compile( $("#posts-json-template").html() );
    var templateTable = Handlebars.compile($("#table-json-template").html());

    Handlebars.registerPartial("description", $("#description-post-partial").html());

    Handlebars.registerHelper( "json", function (obj){
        return '<pre>' + JSON.stringify(obj," ", 4) + '</pre>';
    });

    Handlebars.registerHelper("stripes", function(array, options) {
        var count = 0;
        var buffer = array.map(function(item) {
            item.stripeClass = (count % 2 == 0 ? "even" : "odd");
            count++;
            return options.fn(item); 
        });
        return buffer.join('\n');
    });

    var dataPosts = {
        posts: posts
    };

    $('.post-json').html(templateJsonPosts(dataPosts));
    $('.posts-table').html(templateTable(dataPosts));
});