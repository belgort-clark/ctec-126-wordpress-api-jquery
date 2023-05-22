// wp.js
// This JavaScript uses jQuery

$(document).ready(function(){
	$('#doit').attr('disabled',false);
});

$('#doit').on('click',function(){
	var site = $('#site').val();
	$('#doit').attr('disabled',true);
	var avatar = $('input[name="avatar"]:checked').val();
	var date = $('input[name="date"]:checked').val();
	var getTags = $('input[name="tags"]:checked').val();
	var container = $('#container');
	
	container.css({"display":"none"});
	container.empty();
	
	var image = $('#apple');

	image.css({"display":"block"});

	var url = 'http://public-api.wordpress.com/rest/v1.1/sites/' + site + '/posts';
	console.log(url);

	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'JSON'
	})
	.done(function(data) {
		console.log(data);
		container.css({"display":"block"});
		image.css({"display":"none"});
		
		var output = '';
		
		for(var i=0 ; i < data.posts.length ; i++) {
			output += '<h1>' + data.posts[i].title + '</h1>';
			output += '<h2>' + data.posts[i].author.name + '</h2>';
			if(avatar == 'yes') {
				output += '<img src="' + data.posts[i].author.avatar_URL + '"/>';
			}

			if(date == 'yes'){
				
				var formattedDate = new Date(data.posts[i].date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: '2-digit',
					hour: "2-digit",
					minute: "2-digit",
					hour12: false  
				});
				output += '<p>' + formattedDate + '</p>';
			}

			if(getTags == 'yes'){
				output += '<h3>Tags</h3><ul>';
				for (tag in data.posts[i].tags){
					output += '<li>' + tag + '</li>';	
				}
				output += '</ul>';						
			}					

			output += data.posts[i].content;

		}

		$('#container').html(output);
		$('#doit').attr('disabled',false);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
});
