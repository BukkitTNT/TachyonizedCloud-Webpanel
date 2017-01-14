/**
 * form.js v1.0.2
 * https://ingrim4.me/
 *
 * Copyright 2016, Ingrim4
 *
 * created by Ingrim4
 */
(function() {

	/* #########################################
	   ######           select             #####
	   ######################################### */
	[].slice.call(document.querySelectorAll('select')).forEach(function(element) {
		var options = element.querySelectorAll('option'),
			current = options[0].value;
			div = document.createElement('div');

		[].slice.call(options).forEach(function(option) {
			if(option.getAttribute('selected') != null) {
				current = option.value;
			}
		});

		var inner = '<input type="hidden" value="' + current + '" name="' + element.getAttribute('name') + '"/>';
		inner += '<dl data-name="' + element.getAttribute('id') + '"><dt>' + current + '</dt><dd><ul>';
		[].slice.call(options).forEach(function(option) {
			inner += '<li data="' + option.value + '" tabindex="-1">' + option.innerHTML + '</li>';
		});
		inner += '</ul></dd></dl>';

		div.innerHTML = inner;
		element.parentNode.appendChild(div.childNodes[1]);
		element.parentNode.replaceChild(div.childNodes[0], element);
	});


	/* #########################################
	   #####     input[type="number"]      #####
	   ######################################### */
    [].slice.call(document.querySelectorAll('input[type="text"].number')).forEach(function(element) {
        var keyIn = function(event) {
            setValue(this, parseInt(this.value.replace(/[^\d-]/g, ''), 10))
        },
		setValue = function(element, value) {
			if(element.getAttribute('min')) {
				var min = parseInt(element.getAttribute('min'), 10);
				value = value < min ? min : value;
			}
			if(element.getAttribute('max')) {
				var max = parseInt(element.getAttribute('max'), 10);
				value = value > max ? max : value;
			}
			if(isNaN(value))
				value = 0;
			element.value = value;
			element.dispatchEvent(new Event('modification'));
		};
        element.addEventListener('keyup', keyIn);
        element.addEventListener('paste', keyIn);
        element.addEventListener('click', function(event) {
            var posX = event.pageX - this.getBoundingClientRect().left,
                posY = event.pageY - this.getBoundingClientRect().top;
            if (posX >= (this.offsetWidth - 17) && posX <= (this.offsetWidth - 4)) {
                event.stopImmediatePropagation();
                if (posY <= (this.offsetHeight / 2)) {
                    setValue(this, (parseInt(this.value, 10) + 1));
                } else {
                    setValue(this, (parseInt(this.value, 10) - 1));
                }
            }
        });
        element.addEventListener('mousemove', function(event) {
            var posX = event.pageX - this.getBoundingClientRect().left,
                posY = event.pageY - this.getBoundingClientRect().top;
            if (posX >= (this.offsetWidth - 17) && posX <= (this.offsetWidth - 4)) {
                this.style = 'cursor: pointer;';
            } else {
                this.style = 'cursor: auto;';
            }
        });
    });

	/* #########################################
	   #####      input[type="file"]       #####
	   ######################################### */
	[].slice.call(document.querySelectorAll('input[type="file"]')).forEach(function(element) {
	    var label = element.nextElementSibling,
	        labelVal = label.innerHTML;

	    element.addEventListener('change', function(event) {
	        var fileName = '';
	        if (this.files && this.files.length > 1)
	            fileName = this.files.length + ' files selected';
	        else
	            fileName = event.target.value.split('\\').pop();

	        if (fileName)
	            label.querySelector('span').innerHTML = fileName;
	        else
	            label.innerHTML = labelVal;
	    });
	});
})(window);
