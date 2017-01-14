Table = function(table) {
  if(typeof Table.list === 'undefined')
    Table.list = [];
  this.table = table;
  this.tbody = this.table.querySelector('tbody');
  this.editRow = this.tbody.querySelectorAll('tr');
  this.editRow = this.editRow[this.editRow.length - 1];

  var instance = this;
  this.removeElementListener = function(element) {
      element.addEventListener('click', function(event) {
        var row = element.parentNode.parentNode, count = row.childElementCount - 1, values = [];
        [].slice.call(row.querySelectorAll('td')).forEach(function(value, index) {
          if(index < count)
            values[index] = value.innerHTML;
        });
        instance.table.dispatchEvent(new CustomEvent('remove', {
          detail: {
            values: values
          }
        }));
      });
    };
  [].slice.call(this.tbody.querySelectorAll('i.fa-remove')).forEach(this.removeElementListener);
  this.table.querySelector('i.fa-check').addEventListener('click', function(event) {
    var inputs = instance.editRow.querySelectorAll('input'), values = [], action = true;
    for(var i = 0; i < inputs.length; i++) {
      var element = inputs[i];
      if(typeof element.value === 'undefined') {
        action = false;
        break;
      }
      values[i] = element.value;
    }

    if(action)
      instance.table.dispatchEvent(new CustomEvent('add', {
        detail: {
          values: values
        }
      }));
  });
  Table.list.push(this);
};
Table.get = function(element) {
  for(var i = 0; i < Table.list.length; i++) {
    var table = Table.list[i];
    if(table.table === element)
      return table;
  }
  return null;
};
Table.prototype = {
  add: function(values) {
    var newRow = document.createElement("tr");
    [].slice.call(values).forEach(function(value) {
      if (typeof value === 'undefined')
        value = 'not valid value';

      var newCell = document.createElement('td');
      newCell.appendChild(document.createTextNode(value));
      newRow.appendChild(newCell);
    });

    var lastCell = document.createElement('td');
    lastCell.innerHTML = '<i class="fa fa-remove"></i>';
    newRow.appendChild(lastCell);

    this.removeElementListener(newRow.querySelector('i.fa-remove'));
    this.tbody.insertBefore(newRow, this.editRow);
  },
  remove: function(values) {
    var rows = this.tbody.querySelectorAll('tr'), target;
    if(rows[1].querySelectorAll('td').length != (values.length + 1))
      return;
    for(var i = 1; i < (rows.length - 1); i++) {
      var row = rows[i], cols = row.querySelectorAll('td'), action = true;
      if(cols.length != values.length + 1)
        continue;
      for(var j = 0; j < (cols.length - 1); j++)
        if(cols[j].innerHTML != values[j]) {
          action = false;
          break;
        }
      if(action) {
        target = row;
        break;
      }
    }
    if(typeof target === 'undefined')
      return;
    this.tbody.removeChild(target);
  }
};

// INIT
[].slice.call(document.querySelectorAll('table')).forEach(function(table) {
  new Table(table);
});
