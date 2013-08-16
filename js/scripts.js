$(window).ready(function() {

	var items = [];
	$('.status-bar__link').each(function(index, item){
		var item = $(item),
			itemId = item.attr('href').slice(1);
		items.push({item: item, id: itemId, state: false, checked: false});
	});
});