$(window).ready(function() {

	var items = [];
	$('.status-bar__link').each(function(index, item){
		var item = $(item),
			itemId = item.attr('href').slice(1);
		items.push({item: item, id: itemId, state: false, checked: false});
	});

	$('.status-bar__link').click(function(e){
		e.preventDefault();
		var currentId = $(this).attr('href'),
			currentItem = $(currentId).offset().top - 50;
		$(currentId).removeClass('qa-list__item_state_hide');
		$('html, body').animate({scrollTop: currentItem}, 600, function() {
			$(currentId + ' .answer__textarea').focus();
		});
	});
});