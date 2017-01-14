/*! select.js v1.2 | BSD3 License | code.ingtim4.me/ */
(document.closeSelect = function() {
	if(!document.openSelect)
		return;
	var input = document.openSelect.querySelector('input');
	document.openSelect.classList.remove("open"), setTimeout(function() {
		[].slice.call(document.openSelect.querySelectorAll('li')).forEach(function(item) {
			item.classList.remove("hidden")
		}), input && (input.value = ""), delete document.openSelect
	}, 300)
}),
document.addEventListener("click", function() {
    [].slice.call(document.querySelectorAll("dl.open")).forEach(function(select) {
        select.querySelector("input") != document.activeElement && document.closeSelect();
    })
}),
document.addEventListener("keydown", function(event) {
	if(document.openSelect && event.code == 'ArrowUp' || event.code == 'ArrowDown' || event.code == 'Enter' || event.code == 'Escape') {
		var focus = document.openSelect.querySelector('li:not(.hidden):focus');
		event.code == "Enter" && focus && focus.click() || event.code == "Escape" && document.closeSelect();
		if(event.code == 'ArrowUp' || event.code == 'ArrowDown') {
			var items = [].slice.call(document.openSelect.querySelectorAll('li:not(.hidden)')),
				focusIndex = items.indexOf(focus);
			focusIndex = focusIndex == -1 ? items.length - 1 : focusIndex;
			focusIndex += event.code == 'ArrowUp' ? -1 : event.code == 'ArrowDown' ? 1 : 0;
			focusIndex = focusIndex > items.length - 1 ? 0 : focusIndex < 0 ? items.length -1 : focusIndex;
			items[focusIndex].focus();
		}

		event.stopPropagation();
		event.preventDefault();
		return false;
	}
}, true), [].slice.call(document.querySelectorAll("dt")).forEach(function(title) {
	var select = title.parentElement,
		input = select.querySelector("input");
    title.addEventListener("click", function(event) {
		event.stopPropagation();
		document.openSelect && document.openSelect != select && document.openSelect.classList.remove("open");
		select.classList.contains("open") ?	document.closeSelect() : (select.classList.add("open"), document.openSelect = select, input && setTimeout(function() {
			input.focus()
		}, 50))
    })
}), [].slice.call(document.querySelectorAll("dd input")).forEach(function(input) {
    var items = input.parentNode.querySelectorAll("li");
    input.addEventListener("input", function(c) {
        var rxp = RegExp((input.value.trim() + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&"));
        items.forEach(function(item) {
            JSON.parse(item.getAttribute("data-alias")).filter(function(alias) {
                return rxp.test(alias)
            }).length > 0 || rxp.test(item.innerHTML) ? item.classList.remove("hidden") : item.classList.add("hidden")
		})
    })
}), [].slice.call(document.querySelectorAll("dd ul")).forEach(function(list) {
    var items = list.querySelectorAll("li");
    [].slice.call(items).forEach(function(item) {
        item.addEventListener("click", function() {
            var select = item.parentNode.parentNode.parentNode,
                hiddenInput = document.querySelector('input[name="' + select.getAttribute("data-name") + '"]'),
                data = item.getAttribute("data");
            hiddenInput.value != data && (select.querySelector("dt").innerHTML = item.innerHTML), hiddenInput.value = data, document.closeSelect();
        })
    })
});