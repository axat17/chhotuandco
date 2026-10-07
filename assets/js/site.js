/* Chhotu & Co. — site behaviour. Settings live in config.js. */
(function () {
  var C = window.CHHOTU || {};
  var ROOT = document.body.getAttribute('data-root') || '';
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var money = function (p) { return '$' + Number(p).toFixed(2); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  function waLink(msg) {
    var n = String(C.whatsappNumber || '').replace(/\D/g, '');
    if (n) return 'https://wa.me/' + n + (msg ? '?text=' + encodeURIComponent(msg) : '');
    if (C.instagram) return 'https://ig.me/m/' + C.instagram;
    return '#reserve';
  }
  var igLink = C.instagram ? 'https://www.instagram.com/' + C.instagram + '/' : '';
  var igDM = C.instagram ? 'https://ig.me/m/' + C.instagram : '';

  /* ---- generic wiring ---- */
  function wireLinks(scope) {
    $$('[data-link]', scope).forEach(function (a) {
      var kind = a.getAttribute('data-link'), href = '';
      if (kind === 'whatsapp') href = waLink(a.getAttribute('data-msg') || 'Hello Chhotu & Co., I’d like to reserve a piece from the Diwali Edit.');
      if (kind === 'instagram') href = igLink;
      if (kind === 'instagram-dm') href = igDM;
      if (kind === 'etsy') href = C.etsyUrl || '';
      if (kind === 'amazon') href = C.amazonUrl || '';
      if (kind === 'email') href = C.email ? 'mailto:' + C.email : '';
      if (!href) { a.hidden = true; return; }
      a.href = href;
      if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    });
  }
  $$('[data-cfg]').forEach(function (el) {
    var v = C[el.getAttribute('data-cfg')];
    if (v) el.textContent = v;
  });
  $$('[data-if]').forEach(function (el) {
    if (!C[el.getAttribute('data-if')]) el.hidden = true;
  });
  $$('[data-instagram-handle]').forEach(function (el) { if (C.instagram) el.textContent = '@' + C.instagram; });
  var banner = $('#banner-text');
  if (banner) banner.textContent = C.orderByDate
    ? 'The Diwali Edit · Reserve by ' + C.orderByDate + ' for delivery before 8 November'
    : 'The Diwali Edit · Reserve early for delivery before 8 November';
  var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---- photo slot ---- */
  function photo(p, n, extraClass) {
    var hx = (p.color || '#000000').replace('#', ''); var lum = (parseInt(hx.substr(0, 2), 16) * 0.299 + parseInt(hx.substr(2, 2), 16) * 0.587 + parseInt(hx.substr(4, 2), 16) * 0.114) / 255;
    var light = lum > 0.5;
    var d = document.createElement('div');
    d.className = 'photo' + (light ? ' light' : '') + (extraClass ? ' ' + extraClass : '');
    d.style.setProperty('--ph', p.color);
    var img = new Image();
    img.alt = p.name + ' — ' + p.short;
    img.loading = 'lazy';
    img.addEventListener('error', function () { img.remove(); });
    img.src = ROOT + 'assets/img/products/' + p.slug + '-' + n + '.jpg';
    d.appendChild(img);
    return d;
  }

  /* ---- product cards ---- */
  function card(p) {
    var a = document.createElement('a');
    a.className = 'card';
    a.href = ROOT + 'products/' + p.slug + '.html';
    var f = document.createElement('div'); f.className = 'frame'; f.appendChild(photo(p, 1));
    a.appendChild(f);
    var m = document.createElement('div'); m.className = 'meta';
    m.innerHTML = '<span class="tier">' + esc(p.gender) + ' · ' + esc(p.tier) + '</span>' +
      '<span class="name">' + esc(p.name) + '</span>' +
      '<span class="short">' + esc(p.short) + '</span>' +
      '<span class="price">' + money(p.price) + '</span>';
    a.appendChild(m);
    return a;
  }
  $$('[data-products]').forEach(function (grid) {
    var except = grid.getAttribute('data-except');
    (C.products || []).forEach(function (p) { if (p.slug !== except) grid.appendChild(card(p)); });
  });

  /* ---- size table ---- */
  $$('[data-size-table]').forEach(function (tb) {
    tb.innerHTML = (C.sizes || []).map(function (s) {
      return '<tr><td>' + esc(s.long) + '</td><td>' + esc(s.weight) + '</td><td>' + esc(s.height) + '</td></tr>';
    }).join('');
  });

  /* ---- reviews ---- */
  var rv = $('#reviews');
  if (rv) {
    var t = C.testimonials || [];
    if (!t.length) rv.hidden = true;
    else $('#reviews-list').innerHTML = t.map(function (r) {
      return '<blockquote>“' + esc(r.quote) + '”<cite>' + esc(r.name) + (r.city ? ' · ' + esc(r.city) : '') + '</cite></blockquote>';
    }).join('');
  }

  /* ---- FAQ ---- */
  var faq = $('#faq-list');
  if (faq) {
    var items = [
      ['How do I pay?', 'Etsy and Amazon orders check out on those sites as usual. For WhatsApp and Instagram reservations, we confirm your size personally and then send ' + (C.paymentNote || 'payment details') + '.'],
      ['Will it arrive before Diwali?', (C.orderByDate ? 'Reserve by ' + C.orderByDate + ' and it' : 'Reserve early and it') + ' will arrive before 8 November. We ship' + (C.shipsFrom ? ' from ' + C.shipsFrom : '') + ' as soon as your size is confirmed.'],
      ['Which size should I choose?', 'Go by weight rather than age — see the size guide. Between sizes, choose the larger. Or send us your baby’s weight on WhatsApp and we’ll advise.'],
      ['Is the zari scratchy?', 'Never against the skin. Every embellished panel is lined in soft cotton.'],
      C.exchangePolicy ? ['What if it doesn’t fit?', C.exchangePolicy] : null,
      C.localPickupCity ? ['Can I pick up locally?', 'Yes, in ' + C.localPickupCity + '. Just mention it in your WhatsApp message.'] : null,
      ['How should I care for it?', 'Each piece comes with its own care card. Keep it in the box it arrived in, ready for the next little one in the family.']
    ].filter(Boolean);
    faq.innerHTML = items.map(function (q) {
      return '<details><summary>' + esc(q[0]) + '</summary><p>' + esc(q[1]) + '</p></details>';
    }).join('');
  }

  /* ---- product page ---- */
  var slug = document.body.getAttribute('data-product');
  var P = slug && (C.products || []).filter(function (p) { return p.slug === slug; })[0];
  if (P) {
    $('#pdp-main').appendChild(photo(P, 1));
    [2, 3, 4].forEach(function (n) { $('#pdp-thumbs').appendChild(photo(P, n)); });
    $('#pdp-tier').textContent = 'The Diwali Edit · ' + P.gender + ' · ' + P.tier;
    $('#pdp-name').textContent = P.name;
    $('#crumb-name').textContent = P.name;
    var cg = $('#crumb-gender'); cg.textContent = P.gender; cg.href = ROOT + 'index.html#edit';
    $('#pdp-tagline').textContent = P.tagline;
    $('#pdp-price').textContent = money(P.price);
    $('#pdp-desc').textContent = P.description;
    $('#pdp-details').innerHTML = (P.details || []).map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('');
    var fab = [P.fabric, P.care].filter(Boolean).join(' ');
    var made = C.craftRegion ? 'Hand-finished in ' + C.craftRegion + ', India.' : 'Hand-finished in India.';
    $('#pdp-fabric').textContent = (fab ? fab + ' ' : '') + made;
    $('#pdp-delivery').textContent = (C.orderByDate ? 'Reserve by ' + C.orderByDate + ' for delivery before Diwali. ' : '') +
      'Presented in our noir Heirloom Box.' + (C.exchangePolicy ? ' ' + C.exchangePolicy : '');

    var sizes = C.sizes || [];
    var current = (sizes[2] || sizes[0] || {}).id;
    var grid = $('#size-grid');
    sizes.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'size-btn'; b.textContent = s.label;
      b.setAttribute('data-size', s.id);
      if ((P.stock || {})[s.id] === 0) b.classList.add('out');
      b.addEventListener('click', function () { current = s.id; update(); });
      grid.appendChild(b);
    });
    function update() {
      var s = sizes.filter(function (x) { return x.id === current; })[0];
      if (!s) return;
      $$('.size-btn', grid).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-size') === current ? 'true' : 'false'); });
      $('#size-hint').textContent = 'fits ' + s.weight;
      var left = (P.stock || {})[s.id];
      var msg = 'Hello Chhotu & Co., I’d like to reserve ' + P.name + ' in ' + s.label + ' (' + money(P.price) + ').';
      var btn = $('#reserve-btn');
      if (left === 0) {
        $('#stock-note').textContent = s.label + ' is fully reserved this season.';
        btn.lastChild.textContent = 'Join the waitlist on WhatsApp';
        msg = 'Hello Chhotu & Co., please add me to the waitlist for ' + P.name + ' in ' + s.label + '.';
      } else {
        $('#stock-note').textContent = left ? 'Only ' + left + ' made in ' + s.label + ' this season.' : '';
        btn.lastChild.textContent = 'Reserve ' + s.label + ' on WhatsApp';
      }
      btn.href = waLink(msg);
      $('#wa-preview').textContent = String(C.whatsappNumber || '') ? 'Opens WhatsApp with: “' + msg + '”' : 'Opens a message to us on Instagram.';
    }
    update();
    document.title = P.name + ' — ' + P.tagline + ' | Chhotu & Co.';
  }

  wireLinks(document);
})();
