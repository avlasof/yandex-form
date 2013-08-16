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

	$('.qa-item-hide').click(function(){
		$('.qa-list__item').toggleClass('qa-list__item_state_hide');
		if ($(this).hasClass('qa-item-show')) {
			$(this).removeClass('qa-item-show');
			$(this).text('Свернуть');
		} else {
			$(this).addClass('qa-item-show');
			$(this).text('Развернуть');
		}
	});

	if (localStorage) {
		var showData = function (key, item) {
			var id = $('#' + key + '').parents('.qa-list__item').attr('id').slice(3) - 1,
				that = items[id];
			if(key.length > 4) {
				$('#' + key + '').attr('checked', 'checked')
					.parents('.qa-list__item').addClass('qa-list__item_state_done');
				that.item.addClass('status-bar__link_state_done');
				that.checked = true;
			} else {
				$('#' + key + '').val(item)
					.parents('.qa-list__item').addClass('qa-list__item_state_done');
				that.item.addClass('status-bar__link_state_done');
				that.state = true;
			}
		};
		for (var i = 0; i < localStorage.length; i++){
			var key = localStorage.key(i),
				item = localStorage.getItem(localStorage.key(i));
			if (key.slice(0, 2) === 'q_' && item !== '') {
				showData(key, item);
			}
		}

		$('.answer__textarea').keyup(function(){
			localStorage[$(this).attr('id')] = $(this).val();
		});
		$('.answer__checkbox').change(function(){
			if ($(this).is(':checked')) {
				localStorage[$(this).attr('id')] = $(this).val();
			} else {
				localStorage[$(this).attr('id')] = '';
			}
		});
	}

	var form = $('.form') 
	form.submit(function(){
		$.ajax({
			type: form.attr('method'),
			url: form.attr('action'),
			data: form.serialize(),
			success: function (data) {
				if (localStorage) {
					localStorage.clear();
				}
				$('.form-submit__message')
					.text('Форма отправлена')
					.addClass('success')
					.removeClass('error');
			},
			error: function() {
				$('.form-submit__message').text('Произошла ошибка, попробуйте еще раз').addClass('error');
			}
		});
		return false;
	});
});