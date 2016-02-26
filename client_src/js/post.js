$(document).ready(function() {

	var posts = Data.getRelatedPosts();
	var comments = Data.getPostComments();

	var templateRelatedPosts = Handlebars.compile( $("#related-posts-template").html() );
	var templateComments = Handlebars.compile( $("#comments-template").html() );

	Handlebars.registerPartial("related-post", $("#related-post-partial").html());
	Handlebars.registerPartial("comment", $("#comment-partial").html());

	var dataPosts = {
		posts: posts,
	};
	var dataComments = {
		comments: comments,
	}

	$('.related-posts .posts').html(templateRelatedPosts(dataPosts));
	$('.comments .row').html(templateComments(dataComments));

});