$(function(){
	$('#show-options').click(function() {
		$('#options').slideToggle();
		$(this).toggleClass('open');
		return false;
	});
});