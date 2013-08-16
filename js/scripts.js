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

	$('.answer__textarea').focusin(function(){
		var id = $(this).parents('.qa-list__item').attr('id').slice(3) - 1,
			currentSection = $(this).parents('.qa-list__item');
		currentSection.addClass('qa-list__item_state_current');
	});

	$('.answer__textarea').focusout(function(){
		var id = $(this).parents('.qa-list__item').attr('id').slice(3) - 1,
			that = items[id],
			currentSection = $('#' + that.id + ''),
			stateText = $(this).val();
		currentSection.removeClass('qa-list__item_state_current');
		
		if (!(that.checked)) {
			if (stateText) {
				that.state = true;
				currentSection.addClass('qa-list__item_state_done');
				that.item.addClass('status-bar__link_state_done')
					.removeClass('status-bar__link_state_undone');
			} else {
				if (that.state) {
					that.state = false;
					currentSection.removeClass('qa-list__item_state_done');
					that.item.removeClass('status-bar__link_state_done')
						.addClass('status-bar__link_state_undone');
				}
			}
		}
	});

	$('.answer__checkbox').click(function(){			
		var id = $(this).parents('.qa-list__item').attr('id').slice(3) - 1;
			that = items[id];
			checked = $('.answer__checkbox').is(':checked');
			currentSection = $('#' + that.id + '');

		if (checked) {
			that.checked = true;
			currentSection.addClass('qa-list__item_state_done');
			that.item.addClass('status-bar__link_state_done')
				.removeClass('status-bar__link_state_undone');
		} else {
			if (!(that.state)) {
				that.checked = false;
				currentSection.removeClass('qa-list__item_state_done');
				that.item.removeClass('status-bar__link_state_done')
					.addClass('status-bar__link_state_undone');
			} else {
				that.checked = false;
			}
		}
	});
});