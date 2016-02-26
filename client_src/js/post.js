$(document).ready(function() {

	var posts = Data.getRelatedPosts();
	var comments = Data.getPostComments();

	var templateRelPosts = Handlebars.compile( $("#related-posts-template").html() );
	var templateComments = Handlebars.compile( $("#all-comments-template").html() );

	Handlebars.registerPartial("relPost", $("#related-post-partial").html());
	Handlebars.registerPartial("oneComment", $("#one-comment-partial").html());

	var dataPosts = {
		posts: posts,
    };
    var dataComments = {
    	comments: function () {
			return comments;
		}
    }

    $('.related-posts .posts').html(templateRelPosts(dataPosts));
    $('.comments .row').html(templateComments(dataComments));

});