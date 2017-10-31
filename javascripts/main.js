const grid_size = 40;

function align() {
    const body = document.getElementsByTagName('body')[0];
    const grid = document.getElementsByClassName('grid')[0];

    const full_width = +window.getComputedStyle(body).width.replace('px', '');
    const grid_width = +window.getComputedStyle(grid).width.replace('px', '');

    const theoretical_margin = (40 + full_width - grid_width) / 2;

    const ratio = theoretical_margin / grid_size;
    const full_columns = Math.floor(ratio);
    const delta = ratio - full_columns > 0.5 ? 20 : -20;

    var margin = full_columns * grid_size + delta;

    if(margin + grid_width > full_width) {
        margin = 20;
    }

    grid.style.marginLeft = Math.max(20, margin) + 'px';
}

function fix_height() {
    cards = document.querySelectorAll('.card');
    Array.prototype.forEach.call(cards, function(el) {
        const style = window.getComputedStyle(el);

        const top = +style.marginTop.replace('px', '');
        const height = +style.height.replace('px', '');

        const full_height = top + height;

        const missing_height = grid_size - (full_height % grid_size);

        el.style.marginBottom = (missing_height > 39 ? 0 : missing_height) + 'px';
    });
}

align();

setTimeout(fix_height, 550);


var timeout = false;
window.addEventListener('resize', function() {
    clearTimeout(timeout);
    timeout = setTimeout(align, 250);
});

var cards = document.getElementsByClassName('card--business');
Array.prototype.forEach.call(cards, function(card) {
    card.addEventListener('click', function() {
        var link = card.getElementsByClassName('card--link')[0];
        link.click();
    });
});
