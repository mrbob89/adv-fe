$(document).ready(function() {

	var posts = Data.getPosts();

	var templateJsonPosts = Handlebars.compile( $("#posts-json-template").html() );
    var templateTable = Handlebars.compile($("#table-json-template").html());

    Handlebars.registerPartial("description", $("#description-post-partial").html());

	Handlebars.registerHelper( "json", function (allPosts){
		return JSON.stringify(allPosts, null, ' ');
	});

    Handlebars.registerHelper("stripes", function(array, even, odd, options) {
		var buffer = "";
		for (var i = 0, j = array.length; i < j; i++) {
			var item = array[i];

			item.stripeClass = (i % 2 == 0 ? even : odd);

			buffer += options.fn(item);
		}

		return buffer;
    });

	var dataPosts = {
		posts: posts
    };

    $('.post-json').html(templateJsonPosts(dataPosts));
    $('.posts-table').html(templateTable(dataPosts));

});