/**
 * tab.js v1.0.0
 * http://www.codrops.com - http://tympanus.net/codrops/2016/01/06/inspiration-for-line-menu-styles/
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 *
 * edited by Ingrim4
 */
(function() {
	[].slice.call(document.querySelectorAll('.tab--menu')).forEach(function(menu) {
		var menuItems = menu.querySelectorAll('.tab--menu--link'),
			setCurrent 	= function(ev) {
				ev.preventDefault();
				var item = ev.target.parentNode,
				   chart = document.querySelector('#' + this.getAttribute( 'data-chart' ));

				if(item.classList.contains('tab--menu--current'))
					return false;

				document.querySelector('.chart--container--active').classList.remove('chart--container--active');
				chart.classList.add('chart--container--active');

				menu.querySelector('.tab--menu--current').classList.remove('tab--menu--current');
				item.classList.add('tab--menu--current');
			};

		[].slice.call(menuItems).forEach(function(el) {
			el.addEventListener('click', setCurrent);
		});
	});
})(window);
