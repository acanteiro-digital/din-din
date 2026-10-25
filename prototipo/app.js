(function () {
  'use strict';

  /* ---------- dados fixos ---------- */
  // O dia de "hoje" é fixo para os dados de exemplo continuarem coerentes em qualquer data.
  var TODAY = '2026-10-25';
  var MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  var MS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  var DOW = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  var OUT = ['Moradia', 'Mercado', 'Delivery', 'Transporte e carro', 'Farmácia e saúde', 'Educação', 'Assinaturas', 'Telefonia', 'Lazer', 'Roupas e beleza', 'Dívidas e parcelas', 'Impostos e taxas', 'Família', 'Outros'];
  var IN = ['Salário', 'Renda da casa', 'Extra', 'Reembolso', 'Outros'];
  var PAY = ['Cartão de crédito', 'Cartão de débito', 'PIX', 'Dinheiro', 'Boleto', 'Débito automático', 'Transferência'];
  var PAY_IN = ['PIX', 'Transferência', 'Dinheiro', 'Outro'];
  var CREDIT = 'Cartão de crédito';
  var ME = 'Anderson';

  // limites de exemplo do orçamento, em centavos
  var LIMITS = [['Moradia', 220000], ['Mercado', 110000], ['Dívidas e parcelas', 102000], ['Transporte e carro', 60000], ['Delivery', 30000], ['Educação', 47500], ['Assinaturas', 20000], ['Outros', 60000]];

  var FIXOS = [
    { name: 'iFood Club', day: 5, cents: 1790, cat: 'Assinaturas', pay: CREDIT, note: '' },
    { name: 'Spotify', day: 8, cents: 2390, cat: 'Assinaturas', pay: CREDIT, note: 'em análise para cortar' },
    { name: 'Condomínio', day: 10, cents: 67740, cat: 'Moradia', pay: 'Boleto', note: '' },
    { name: 'Luz', day: 15, cents: 32400, cat: 'Moradia', pay: 'Débito automático', note: '' },
    { name: 'HBO Max', day: 18, cents: 3490, cat: 'Assinaturas', pay: CREDIT, note: 'em análise para cortar' },
    { name: 'Telefone e internet', day: 22, cents: 11990, cat: 'Outros', pay: CREDIT, note: '' }
  ];
  var PARCELAS = [
    { name: 'Curso online', cents: 20400, n: 4, of: 10, ends: 'abril de 2027' },
    { name: 'Manutenção do carro', cents: 23000, n: 2, of: 6, ends: 'fevereiro de 2027' },
    { name: 'Fatura parcelada', cents: 31800, n: 7, of: 12, ends: 'março de 2027' }
  ];
  var FOTO = { desc: 'Padaria Pão Quente', cents: 3870, date: TODAY, cats: ['Mercado', 'Delivery', 'Outros'], pays: [CREDIT, 'PIX'] };

  var ICON = {
    back: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"></path></svg>',
    home: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7"></path><path d="M6 10v10h12V10"></path></svg>',
    goal: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="3.5"></circle></svg>',
    repeat: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h13l-3-3"></path><path d="M20 16H7l3 3"></path></svg>',
    camera: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"></path><circle cx="12" cy="13" r="3.5"></circle></svg>',
    lock: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path></svg>'
  };

  /* ---------- estado ---------- */
  function seedEntries() {
    var list = [];
    function add(date, tipo, cents, cat, pay, who, desc) { list.push({ id: 's' + (list.length + 1), seq: list.length + 1, date: date, tipo: tipo, cents: cents, cat: cat, pay: pay, who: who, desc: desc }); }
    add('2026-10-05', 'receita', 570000, 'Salário', 'Transferência', 'Anderson', 'Salário');
    add('2026-10-05', 'receita', 385000, 'Renda da casa', 'Transferência', 'Paula', '');
    // Anderson
    add('2026-10-05', 'despesa', 112260, 'Moradia', 'Boleto', 'Anderson', 'Aluguel');
    add('2026-10-09', 'despesa', 23000, 'Transporte e carro', CREDIT, 'Anderson', 'Manutenção do carro');
    add('2026-10-10', 'despesa', 42400, 'Dívidas e parcelas', 'PIX', 'Anderson', 'Acordo do condomínio');
    add('2026-10-12', 'despesa', 31800, 'Dívidas e parcelas', 'PIX', 'Anderson', 'Fatura parcelada');
    add('2026-10-12', 'despesa', 27800, 'Dívidas e parcelas', CREDIT, 'Anderson', 'Parcelamento da fatura');
    add('2026-10-12', 'despesa', 20400, 'Educação', CREDIT, 'Anderson', 'Curso online');
    add('2026-10-14', 'despesa', 28000, 'Transporte e carro', CREDIT, 'Anderson', 'Combustível');
    add('2026-10-15', 'despesa', 32400, 'Moradia', 'Débito automático', 'Anderson', 'Luz');
    add('2026-10-20', 'despesa', 18000, 'Transporte e carro', 'Boleto', 'Anderson', 'IPVA parcela');
    add('2026-10-23', 'despesa', 67740, 'Moradia', 'Boleto', 'Anderson', 'Condomínio');
    add('2026-10-24', 'despesa', 8200, 'Delivery', CREDIT, 'Anderson', 'iFood');
    // Paula
    add('2026-10-02', 'despesa', 4000, 'Outros', 'Débito automático', 'Paula', 'Tarifa bancária');
    add('2026-10-07', 'despesa', 52000, 'Mercado', CREDIT, 'Paula', 'Compras do mês');
    add('2026-10-08', 'despesa', 7670, 'Assinaturas', CREDIT, 'Paula', 'Assinaturas diversas');
    add('2026-10-15', 'despesa', 1600, 'Moradia', 'Débito automático', 'Paula', 'Gás');
    add('2026-10-16', 'despesa', 15300, 'Delivery', CREDIT, 'Paula', 'Pizza');
    add('2026-10-17', 'despesa', 17000, 'Mercado', 'Dinheiro', 'Paula', 'Feira e padaria');
    add('2026-10-18', 'despesa', 27440, 'Mercado', CREDIT, 'Paula', 'Açougue');
    add('2026-10-19', 'despesa', 9650, 'Delivery', CREDIT, 'Paula', 'iFood');
    add('2026-10-21', 'despesa', 26510, 'Outros', CREDIT, 'Paula', 'Farmácia');
    add('2026-10-22', 'despesa', 11990, 'Outros', CREDIT, 'Paula', 'Telefone e internet');
    add('2026-10-25', 'despesa', 18640, 'Mercado', CREDIT, 'Paula', 'Mercado do Bairro');
    // Pedro
    add('2026-10-06', 'despesa', 9200, 'Assinaturas', CREDIT, 'Pedro', 'SportClub');
    add('2026-10-11', 'despesa', 27100, 'Educação', CREDIT, 'Pedro', 'Livros');
    add('2026-10-22', 'despesa', 8100, 'Delivery', CREDIT, 'Pedro', 'Lanche');
    return list;
  }
  function seedPeople() {
    return [
      { name: 'Anderson', email: 'anderson@exemplo.com', role: 'admin', owner: true },
      { name: 'Paula', email: 'paula@exemplo.com', role: 'admin', owner: false },
      { name: 'Pedro', email: 'pedro@exemplo.com', role: 'membro', owner: false }
    ];
  }
  function freshState() {
    var entries = seedEntries();
    return {
      route: 'entrar', month: '2026-10', tab: 'cat', showAll: false,
      entries: entries, seq: entries.length, people: seedPeople(),
      delId: null, rmEmail: null,
      foto: { cat: 'Mercado', pay: CREDIT },
      novo: { tipo: 'despesa', cat: '', pay: CREDIT }, novoForm: { amount: '', desc: '', date: TODAY },
      prefill: null, lastPay: CREDIT
    };
  }
  var state = freshState();

  /* ---------- utilidades ---------- */
  var BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  function money(c) { return BRL.format(c / 100); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(s) { return document.querySelector(s); }
  function monthName(key) { return MONTHS[Number(key.split('-')[1]) - 1]; }
  function monthLabel(key) { var n = monthName(key); return n.charAt(0).toUpperCase() + n.slice(1) + ' de ' + key.split('-')[0]; }
  function shiftMonth(key, d) {
    var p = key.split('-').map(Number);
    var dt = new Date(p[0], p[1] - 1 + d, 1);
    return dt.getFullYear() + '-' + pad(dt.getMonth() + 1);
  }
  function dayLabel(s) {
    var p = s.split('-').map(Number);
    var t = TODAY.split('-').map(Number);
    var y = new Date(t[0], t[1] - 1, t[2] - 1);
    var yKey = y.getFullYear() + '-' + pad(y.getMonth() + 1) + '-' + pad(y.getDate());
    if (s === TODAY) return 'Hoje';
    if (s === yKey) return 'Ontem';
    return DOW[new Date(p[0], p[1] - 1, p[2]).getDay()] + ', ' + p[2] + ' ' + MS[p[1] - 1];
  }
  function parseAmount(s) {
    s = String(s).replace(/[^\d.,]/g, '');
    if (!s) return 0;
    var lc = s.lastIndexOf(','), ld = s.lastIndexOf('.'), n;
    if (lc > -1) n = s.replace(/\./g, '').replace(',', '.');
    else if (ld > -1) {
      var dec = s.length - ld - 1;
      n = ((dec === 1 || dec === 2) && s.indexOf('.') === ld) ? s : s.replace(/\./g, '');
    } else n = s;
    var v = parseFloat(n);
    return isFinite(v) ? Math.round(v * 100) : 0;
  }
  function monthEntries() { return state.entries.filter(function (e) { return e.date.indexOf(state.month) === 0; }); }
  function sum(list, tipo) { return list.filter(function (e) { return e.tipo === tipo; }).reduce(function (a, e) { return a + e.cents; }, 0); }
  function group(list, fn) {
    var m = {}, order = [];
    list.forEach(function (e) { var k = fn(e); if (!(k in m)) { m[k] = 0; order.push(k); } m[k] += e.cents; });
    return order.map(function (k) { return [k, m[k]]; }).sort(function (a, b) { return b[1] - a[1]; });
  }
  function addEntry(e) {
    state.seq += 1;
    state.entries.push({ id: 'n' + state.seq, seq: state.seq, date: e.date, tipo: e.tipo, cents: e.cents, cat: e.cat, pay: e.pay, who: ME, desc: e.desc || '' });
  }
  var toastTimer = null;
  function toast(t) {
    var el = $('#toast');
    el.textContent = t; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 2800);
  }
  function pill(kind, text) { return '<span class="pill ' + kind + '">' + esc(text) + '</span>'; }

  /* ---------- telas ---------- */
  function viewEntrar() {
    return '<div class="page center">' +
      '<div class="stack" style="gap:20px"><div class="logo" aria-hidden="true">D</div><h1 class="hero">DinDin</h1><p class="lead">Despesas e receitas da casa, num lugar só.</p></div>' +
      '<div class="grow"></div>' +
      '<div class="stack" style="gap:14px"><p class="lead base">Entre com a conta Google que o administrador liberou.</p>' +
      '<a class="btn" href="#/inicio">Entrar com Google</a>' +
      '<a class="ghostlink" href="#/sem-acesso">Só no protótipo: simular um e-mail sem acesso</a>' +
      '<button type="button" class="ghostlink" data-act="reset">Reiniciar os dados de exemplo</button></div></div>';
  }

  function viewSemAcesso() {
    return '<div class="page center">' +
      '<div class="stack" style="gap:16px"><div class="logo lock">' + ICON.lock + '</div><h1 class="hero sm">Acesso não liberado</h1>' +
      '<p class="lead base">O e-mail <b>visita@gmail.com</b> ainda não está na lista. Peça ao administrador para liberar esse e-mail em “Pessoas e acessos” e entre de novo.</p></div>' +
      '<div class="grow"></div><a class="btn sec" href="#/entrar">Entrar com outra conta</a></div>';
  }

  function viewInicio() {
    var all = monthEntries();
    var out = sum(all, 'despesa'), inn = sum(all, 'receita'), saldo = inn - out;
    var mname = monthName(state.month);
    var html = '<div class="page">' +
      '<div class="top"><div class="brand">DinDin</div><a class="avatar" href="#/pessoas" aria-label="Conta e pessoas">A</a></div>' +
      '<div class="monthbar"><button type="button" data-act="prev" aria-label="Mês anterior">‹</button><span>' + esc(monthLabel(state.month)) + '</span><button type="button" data-act="next" aria-label="Próximo mês">›</button></div>';

    var meter;
    if (inn > 0) {
      var pct = Math.round(out / inn * 100);
      meter = '<div class="meter" role="img" aria-label="' + pct + '% do que entrou já saiu"><span style="width:' + Math.min(100, pct) + '%"></span></div>' +
        '<p class="hint">' + (pct > 100 ? 'Saiu mais do que entrou (' + pct + '%)' : pct + '% do que entrou já saiu') + '</p>';
    } else {
      meter = '<p class="hint">Lance as receitas do mês para ver quanto já saiu.</p>';
    }
    html += '<section class="card"><p class="eyebrow">Gastos em ' + esc(mname) + '</p><p class="big num">' + money(out) + '</p>' + meter +
      '<dl class="kv"><div><dt>Entrou</dt><dd class="in num">' + money(inn) + '</dd></div>' +
      '<div><dt>Saldo</dt><dd class="num ' + (saldo < 0 ? 'out' : 'in') + '">' + (saldo < 0 ? '−' : '') + money(Math.abs(saldo)) + '</dd></div></dl></section>';

    if (!all.length) {
      html += '<section class="card"><h2>Nenhum lançamento em ' + esc(mname) + '</h2>' +
        '<p class="muted" style="margin:6px 0 14px;max-width:46ch">Lance cada gasto assim que acontecer: valor, categoria, forma de pagamento e uma descrição curta. Aqui aparece para onde o dinheiro foi.</p>' +
        '<a class="btn small" href="#/novo">Lançar o primeiro</a></section></div>';
      return html;
    }

    var outs = all.filter(function (e) { return e.tipo === 'despesa'; });
    if (outs.length) {
      var key = { cat: function (e) { return e.cat; }, pay: function (e) { return e.pay; }, who: function (e) { return e.who; } }[state.tab];
      var rows = group(outs, key);
      var shown = state.tab === 'cat' ? rows.slice(0, 5) : rows;
      var max = rows[0][1];
      var li = shown.map(function (r, i) {
        var hot = i === 0 && state.tab !== 'who';
        return '<div class="bkrow"><div class="bkline"><span class="bkname">' + esc(r[0]) + '</span><span class="bkpct num">' + Math.round(r[1] / out * 100) + '%</span><span class="bkval num">' + money(r[1]) + '</span></div>' +
          '<div class="track"><span class="' + (hot ? 'hot' : '') + '" style="width:' + Math.max(2, Math.round(r[1] / max * 100)) + '%"></span></div></div>';
      }).join('');
      var rest = state.tab === 'cat' ? rows.slice(5) : [];
      var more = rest.length ? '<div class="hint" style="margin:0">Mais ' + rest.length + (rest.length === 1 ? ' categoria: ' : ' categorias: ') + esc(rest.map(function (r) { return r[0]; }).join(', ')) + '</div>' : '';
      function tab(v, label) { return '<button type="button" data-act="tab" data-v="' + v + '" aria-pressed="' + (state.tab === v) + '">' + label + '</button>'; }
      html += '<section class="card stack"><h2>Para onde foi</h2><div class="tabs" role="group" aria-label="Agrupar por">' + tab('cat', 'Categoria') + tab('pay', 'Pagamento') + tab('who', 'Pessoa') + '</div><div>' + li + '</div>' + more + '</section>';
    }

    var list = all.slice().sort(function (a, b) { return a.date !== b.date ? (a.date < b.date ? 1 : -1) : b.seq - a.seq; });
    var visible = state.showAll ? list : list.slice(0, 6);
    var body = '', last = '';
    visible.forEach(function (e) {
      if (e.date !== last) {
        var dOut = sum(list.filter(function (x) { return x.date === e.date; }), 'despesa');
        body += '<div class="day"><span>' + esc(dayLabel(e.date)) + '</span><span class="num">' + (dOut ? money(dOut) : '') + '</span></div>';
        last = e.date;
      }
      var title = e.desc ? e.desc : e.cat;
      var sub = (e.desc ? e.cat + ' · ' : '') + e.pay + ' · ' + e.who;
      var act = state.delId === e.id
        ? '<div class="confirm"><button type="button" class="yes" data-act="delyes" data-id="' + e.id + '">Excluir</button><button type="button" data-act="delno">Não</button></div>'
        : '<button type="button" class="iconbtn" data-act="del" data-id="' + e.id + '" aria-label="Excluir lançamento">×</button>';
      body += '<div class="row"><div class="rmain"><div class="rtitle">' + esc(title) + '</div><div class="rsub">' + esc(sub) + '</div></div>' +
        '<div class="ramt num ' + (e.tipo === 'receita' ? 'in' : '') + '">' + (e.tipo === 'receita' ? '+ ' : '') + money(e.cents) + '</div>' + act + '</div>';
    });
    var toggle = list.length > 6 ? '<button type="button" class="linkbtn" data-act="showall">' + (state.showAll ? 'Mostrar menos' : 'Mostrar todos os ' + list.length) + '</button>' : '';
    html += '<section class="card"><div class="sechead"><h2>Lançamentos</h2><span class="hint" style="margin:0">' + list.length + (list.length === 1 ? ' item' : ' itens') + '</span></div>' + body + toggle + '</section></div>';
    return html;
  }

  function viewNovo() {
    var f = state.novoForm;
    return '<form class="page tight sheetpage" id="formNovo" novalidate>' +
      '<div class="top"><div class="seg" role="group" aria-label="Tipo">' +
      '<button type="button" data-act="tipo" data-v="despesa" aria-pressed="' + (state.novo.tipo === 'despesa') + '">Despesa</button>' +
      '<button type="button" data-act="tipo" data-v="receita" aria-pressed="' + (state.novo.tipo === 'receita') + '">Receita</button></div>' +
      '<a class="close" href="#/inicio" aria-label="Fechar">×</a></div>' +
      '<a class="photolink" href="#/foto"><span class="ic">' + ICON.camera + '</span><span class="tx"><b>Ler foto da nota</b><small>Preenche valor, data e categoria</small></span><span class="badge">Versão 2</span></a>' +
      '<div class="field"><label for="valor">Valor</label><div class="amountwrap"><span>R$</span><input id="valor" type="text" inputmode="decimal" autocomplete="off" placeholder="0,00" value="' + esc(f.amount) + '"></div></div>' +
      '<div class="field"><div class="lbl">Categoria</div><div class="chips" id="cats" role="radiogroup" aria-label="Categoria"></div></div>' +
      '<div class="field"><div class="lbl" id="payLabel">Pagamento</div><div class="chips" id="pays" role="radiogroup" aria-label="Pagamento"></div></div>' +
      '<div class="field"><label for="desc">Descrição</label><input class="text" id="desc" type="text" maxlength="120" autocomplete="off" placeholder="Ex.: mercado da semana" value="' + esc(f.desc) + '"></div>' +
      '<div class="field"><label for="data">Data</label><input class="text" id="data" type="date" value="' + esc(f.date) + '"></div>' +
      '<p class="err" id="errNovo" role="alert" hidden></p><div class="grow"></div>' +
      '<button type="submit" class="btn" id="btnSalvar">Lançar gasto</button></form>';
  }
  function chip(name, val, checked) {
    return '<label class="chip"><input type="radio" name="' + name + '" value="' + esc(val) + '"' + (checked ? ' checked' : '') + '><span>' + esc(val) + '</span></label>';
  }
  function syncNovo() {
    var t = state.novo.tipo;
    var cats = t === 'despesa' ? OUT : IN;
    var pays = t === 'despesa' ? PAY : PAY_IN;
    if (cats.indexOf(state.novo.cat) < 0) state.novo.cat = '';
    if (pays.indexOf(state.novo.pay) < 0) state.novo.pay = pays.indexOf(state.lastPay) > -1 ? state.lastPay : pays[0];
    document.querySelectorAll('.seg button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.v === t)); });
    $('#cats').innerHTML = cats.map(function (c) { return chip('cat', c, c === state.novo.cat); }).join('');
    $('#pays').innerHTML = pays.map(function (p) { return chip('pay', p, p === state.novo.pay); }).join('');
    $('#payLabel').textContent = t === 'despesa' ? 'Pagamento' : 'Recebido por';
    $('#btnSalvar').textContent = t === 'despesa' ? 'Lançar gasto' : 'Lançar receita';
  }
  function initNovo() {
    var p = state.prefill;
    state.novo = { tipo: 'despesa', cat: p ? p.cat : '', pay: p ? p.pay : state.lastPay };
    state.novoForm = { amount: p ? p.amount : '', desc: p ? p.desc : '', date: p ? p.date : TODAY };
    state.prefill = null;
  }

  function viewFoto() {
    var f = state.foto;
    var cats = FOTO.cats.map(function (c) { return '<button type="button" class="chipbtn" data-act="foto-cat" data-v="' + esc(c) + '" aria-pressed="' + (f.cat === c) + '">' + esc(c) + '</button>'; }).join('');
    var pays = FOTO.pays.map(function (p) { return '<button type="button" class="chipbtn" data-act="foto-pay" data-v="' + esc(p) + '" aria-pressed="' + (f.pay === p) + '">' + esc(p) + '</button>'; }).join('');
    return '<div class="page tight">' +
      '<div class="titlebar"><a class="back" href="#/novo" aria-label="Voltar">' + ICON.back + '</a><h1 class="h1">Ler foto da nota</h1><span class="badge">Versão 2</span></div>' +
      '<div class="photo" role="img" aria-label="Foto da nota fiscal, imagem de exemplo"><div class="receipt"><i class="t"></i><i></i><i style="width:90%"></i><i style="width:95%"></i><i style="width:80%"></i><i style="width:85%"></i><i class="s"></i></div><small>Imagem de exemplo</small></div>' +
      '<section class="card stack" style="gap:14px"><p class="eyebrow">Dados lidos da foto</p>' +
      '<div class="fieldgrid"><div><div class="fl">Valor</div><div class="big num" style="font-size:26px">' + money(FOTO.cents) + '</div></div><div><div class="fl">Data</div><div class="fv num" style="padding-top:6px">25/10/2026</div></div></div>' +
      '<div><div class="fl">Estabelecimento</div><div class="fv">' + esc(FOTO.desc) + '</div></div>' +
      '<div><div class="sechead" style="margin-bottom:6px"><span class="fl" style="margin:0">Categoria sugerida</span><span class="fl" style="margin:0">Toque para trocar</span></div><div class="chips">' + cats + '</div></div>' +
      '<div><div class="fl" style="margin-bottom:6px">Pagamento</div><div class="chips">' + pays + '</div></div></section>' +
      '<p class="hint" style="margin:0">Confira os dados antes de lançar. Nada é salvo até você tocar em Lançar gasto.</p><div class="grow"></div>' +
      '<div class="stack"><button type="button" class="btn" data-act="foto-add">Lançar gasto</button><button type="button" class="btn sec" data-act="foto-fix">Corrigir antes de lançar</button></div></div>';
  }

  function viewPessoas() {
    var rows = state.people.map(function (p) {
      var ini = esc(p.name.charAt(0).toUpperCase());
      if (p.owner) {
        return '<div class="person"><div class="pline"><div class="pic">' + ini + '</div><div style="flex:1;min-width:0"><div class="pname">' + esc(p.name) + ' <span class="muted" style="font-weight:400">(você)</span></div><div class="pmail">' + esc(p.email) + '</div></div>' + pill('', 'Dono') + '</div></div>';
      }
      var remove = state.rmEmail === p.email
        ? '<div class="confirm"><button type="button" class="yes" data-act="rmyes" data-email="' + esc(p.email) + '">Remover</button><button type="button" data-act="rmno">Não</button></div>'
        : '<button type="button" data-act="rm" data-email="' + esc(p.email) + '">Remover acesso</button>';
      return '<div class="person"><div class="pline"><div class="pic">' + ini + '</div><div style="flex:1;min-width:0"><div class="pname">' + esc(p.name) + '</div><div class="pmail">' + esc(p.email) + '</div></div></div>' +
        '<div class="pctl"><select class="select" data-role="' + esc(p.email) + '" aria-label="Perfil de ' + esc(p.name) + '"><option value="admin"' + (p.role === 'admin' ? ' selected' : '') + '>Administrador</option><option value="membro"' + (p.role !== 'admin' ? ' selected' : '') + '>Membro</option></select>' + remove + '</div></div>';
    }).join('');
    return '<div class="page tight">' +
      '<div class="titlebar"><a class="back" href="#/inicio" aria-label="Voltar">' + ICON.back + '</a><h1 class="h1">Pessoas e acessos</h1></div>' +
      '<p class="muted" style="margin:0">Só os e-mails desta lista entram no DinDin. Use o e-mail exato da conta Google da pessoa.</p>' +
      '<section class="card" style="padding:4px 16px">' + rows + '</section>' +
      '<section class="card"><h2 style="margin-bottom:12px">Liberar novo e-mail</h2><form id="formPessoa" class="stack" style="gap:12px" novalidate>' +
      '<div class="field"><label for="novoEmail">E-mail Google</label><input class="text" id="novoEmail" type="email" inputmode="email" autocomplete="off" placeholder="nome@gmail.com"></div>' +
      '<div class="field"><label for="novoPerfil">Perfil</label><select class="select" id="novoPerfil"><option value="membro">Membro</option><option value="admin">Administrador</option></select></div>' +
      '<p class="err" id="errPessoa" role="alert" hidden></p><button type="submit" class="btn">Liberar acesso</button></form></section>' +
      '<div class="grow"></div><a class="btn sec" href="#/entrar">Sair</a></div>';
  }

  function viewOrcamento() {
    var all = monthEntries();
    var outs = all.filter(function (e) { return e.tipo === 'despesa'; });
    var spentBy = {};
    outs.forEach(function (e) { spentBy[e.cat] = (spentBy[e.cat] || 0) + e.cents; });
    var out = sum(all, 'despesa');
    var planned = LIMITS.reduce(function (a, l) { return a + l[1]; }, 0);
    var remain = planned - out;
    var limitedSum = 0;
    var rows = LIMITS.map(function (l, i) {
      var sp = spentBy[l[0]] || 0;
      limitedSum += sp;
      return { cat: l[0], lim: l[1], sp: sp, ratio: sp / l[1], i: i };
    }).sort(function (a, b) { return b.ratio - a.ratio || a.i - b.i; });
    var over = rows.filter(function (r) { return r.sp > r.lim; }).length;
    var slack = rows.filter(function (r) { return r.sp < r.lim; }).length;
    var line1 = over === 0 ? 'Nenhuma categoria passou do limite.' : over + (over === 1 ? ' categoria passou do limite.' : ' categorias passaram do limite.');
    var line2 = slack === 0 ? '' : (over ? (slack === 1 ? ' Outra ainda tem folga.' : ' Outras ' + slack + ' ainda têm folga.') : (slack === 1 ? ' 1 tem folga.' : ' ' + slack + ' têm folga.'));
    var list = rows.map(function (r) {
      var kind, label, bar, detail;
      var pct = Math.round(r.ratio * 100);
      if (r.sp > r.lim) { kind = 'bad'; label = 'Acima do limite'; bar = 'hot'; detail = money(r.sp) + ' de ' + money(r.lim) + ' · ' + money(r.sp - r.lim) + ' acima'; }
      else if (r.sp === r.lim) { kind = 'ok'; label = 'No limite'; bar = 'firm'; detail = money(r.sp) + ' de ' + money(r.lim) + ' · valor planejado'; }
      else if (pct >= 90) { kind = 'warn'; label = 'Perto do limite'; bar = 'warn'; detail = money(r.sp) + ' de ' + money(r.lim) + ' · restam ' + money(r.lim - r.sp); }
      else { kind = 'ok'; label = 'Dentro'; bar = 'firm'; detail = money(r.sp) + ' de ' + money(r.lim) + ' · restam ' + money(r.lim - r.sp); }
      return '<div class="bgrow"><div class="line"><span class="name">' + esc(r.cat) + '</span>' + pill(kind, label) + '</div>' +
        '<div class="track"><span class="' + bar + '" style="width:' + Math.min(100, pct) + '%"></span></div><div class="det num">' + detail + '</div></div>';
    }).join('');
    var other = out - limitedSum;
    if (other > 0) {
      list += '<div class="bgrow"><div class="line"><span class="name">Outras categorias</span>' + pill('', 'Sem limite') + '</div><div class="det num">' + money(other) + ' gastos sem limite definido</div></div>';
    }
    return '<div class="page">' +
      '<div class="top"><h1 class="h1">Orçamento de ' + esc(monthName(state.month)) + '</h1><span class="badge">Versão 2</span></div>' +
      '<section class="card"><p class="eyebrow">' + (remain >= 0 ? 'Sobra no plano do mês' : 'Passou do plano do mês') + '</p>' +
      '<p class="big mid num ' + (remain >= 0 ? 'in' : 'out') + '">' + money(Math.abs(remain)) + '</p>' +
      '<dl class="kv"><div><dt>Planejado</dt><dd class="num">' + money(planned) + '</dd></div><div><dt>Gasto</dt><dd class="num">' + money(out) + '</dd></div></dl>' +
      '<p class="hint" style="margin-top:12px">' + line1 + line2 + '</p></section>' +
      '<section class="card flush"><h2 style="margin-bottom:4px">Por categoria</h2>' + list + '</section></div>';
  }

  function fixoLancado(f) { return state.entries.some(function (e) { return e.date.indexOf(state.month) === 0 && e.desc === f.name; }); }
  function viewFixos() {
    var pending = FIXOS.filter(function (f) { return !fixoLancado(f); });
    var head = pending.length ? pending.length + ' de ' + FIXOS.length + ' ainda não foram lançados neste mês.' : 'Todos os fixos deste mês já foram lançados.';
    var btn = pending.length ? '<button type="button" class="btn small" data-act="fixos-add" style="margin-bottom:4px">' + (pending.length === 1 ? 'Lançar o que falta' : 'Lançar os ' + pending.length + ' que faltam') + '</button>' : '';
    var fixos = FIXOS.map(function (f) {
      var ok = fixoLancado(f);
      return '<div class="fxrow"><div style="flex:1;min-width:0"><div class="name" style="font-weight:600;overflow-wrap:anywhere">' + esc(f.name) + '</div>' +
        '<div class="rsub">Todo dia ' + f.day + ' · ' + money(f.cents) + ' · ' + esc(f.cat) + (f.note ? ' · ' + esc(f.note) : '') + '</div></div>' +
        pill(ok ? 'ok' : 'warn', ok ? 'Lançado' : 'Falta lançar') + '</div>';
    }).join('');
    var total = PARCELAS.reduce(function (a, p) { return a + p.cents; }, 0);
    var parcelas = PARCELAS.map(function (p) {
      return '<div class="bgrow"><div class="line"><span class="name">' + esc(p.name) + '</span><span class="num" style="font-weight:600">' + money(p.cents) + '</span></div>' +
        '<div class="track"><span class="firm" style="width:' + Math.round(p.n / p.of * 100) + '%"></span></div><div class="det">Parcela ' + p.n + ' de ' + p.of + ' · termina em ' + p.ends + '</div></div>';
    }).join('');
    return '<div class="page">' +
      '<div class="top"><h1 class="h1">Fixos e parcelas</h1><span class="badge">Versão 2</span></div>' +
      '<section class="card flush"><h2>Fixos de ' + esc(monthName(state.month)) + '</h2><p class="hint" style="margin:4px 0 12px">' + head + '</p>' + btn + fixos + '</section>' +
      '<section class="card flush"><h2>Parcelas em andamento</h2><p class="hint num" style="margin:4px 0 8px">' + money(total) + ' por mês. A última termina em abril de 2027.</p>' + parcelas + '</section></div>';
  }

  var ROUTES = { 'entrar': viewEntrar, 'sem-acesso': viewSemAcesso, 'inicio': viewInicio, 'novo': viewNovo, 'foto': viewFoto, 'pessoas': viewPessoas, 'orcamento': viewOrcamento, 'fixos': viewFixos };
  var TABS = [['inicio', 'Início', 'home'], ['orcamento', 'Orçamento', 'goal'], ['fixos', 'Fixos', 'repeat']];

  /* ---------- tela e rotas ---------- */
  function render(toTop) {
    var r = state.route;
    var screen = $('#screen');
    screen.innerHTML = ROUTES[r]();
    var withNav = r === 'inicio' || r === 'orcamento' || r === 'fixos';
    var nav = $('#nav');
    nav.hidden = !withNav;
    if (withNav) {
      nav.innerHTML = TABS.map(function (t) {
        return '<a href="#/' + t[0] + '"' + (t[0] === r ? ' aria-current="page"' : '') + '>' + ICON[t[2]] + t[1] + '</a>';
      }).join('');
    }
    $('#fab').hidden = r !== 'inicio';
    if (r === 'novo') syncNovo();
    if (toTop) screen.scrollTop = 0;
  }
  function currentRoute() {
    var r = (location.hash || '').replace(/^#\/?/, '');
    return ROUTES[r] ? r : 'entrar';
  }
  function onRoute() {
    state.route = currentRoute();
    state.delId = null;
    state.rmEmail = null;
    if (state.route === 'novo') initNovo();
    render(true);
  }
  function goto(r) { if (currentRoute() === r) { onRoute(); } else { location.hash = '#/' + r; } }

  /* ---------- ações ---------- */
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('[data-act]');
    if (!t) return;
    var act = t.dataset.act, v = t.dataset.v;
    if (act === 'prev' || act === 'next') { state.month = shiftMonth(state.month, act === 'prev' ? -1 : 1); state.showAll = false; state.delId = null; render(false); }
    else if (act === 'tab') { state.tab = v; render(false); }
    else if (act === 'showall') { state.showAll = !state.showAll; render(false); }
    else if (act === 'del') { state.delId = t.dataset.id; render(false); }
    else if (act === 'delno') { state.delId = null; render(false); }
    else if (act === 'delyes') {
      state.entries = state.entries.filter(function (e) { return e.id !== t.dataset.id; });
      state.delId = null; render(false); toast('Lançamento excluído');
    }
    else if (act === 'tipo') { state.novo.tipo = v; syncNovo(); }
    else if (act === 'foto-cat') { state.foto.cat = v; render(false); }
    else if (act === 'foto-pay') { state.foto.pay = v; render(false); }
    else if (act === 'foto-add') {
      addEntry({ date: FOTO.date, tipo: 'despesa', cents: FOTO.cents, cat: state.foto.cat, pay: state.foto.pay, desc: FOTO.desc });
      state.month = FOTO.date.slice(0, 7);
      toast('Gasto lançado: ' + money(FOTO.cents) + ' em ' + state.foto.cat);
      goto('inicio');
    }
    else if (act === 'foto-fix') {
      state.prefill = { amount: String(FOTO.cents / 100).replace('.', ','), desc: FOTO.desc, date: FOTO.date, cat: state.foto.cat, pay: state.foto.pay };
      goto('novo');
    }
    else if (act === 'fixos-add') {
      var pend = FIXOS.filter(function (f) { return !fixoLancado(f); });
      pend.forEach(function (f) { addEntry({ date: state.month + '-' + pad(f.day), tipo: 'despesa', cents: f.cents, cat: f.cat, pay: f.pay, desc: f.name }); });
      render(false);
      toast(pend.length === 1 ? '1 fixo lançado' : pend.length + ' fixos lançados');
    }
    else if (act === 'rm') { state.rmEmail = t.dataset.email; render(false); }
    else if (act === 'rmno') { state.rmEmail = null; render(false); }
    else if (act === 'rmyes') {
      state.people = state.people.filter(function (p) { return p.email !== t.dataset.email; });
      state.rmEmail = null; render(false); toast('Acesso removido');
    }
    else if (act === 'reset') { state = freshState(); state.route = currentRoute(); toast('Dados de exemplo restaurados'); render(false); }
  });

  document.addEventListener('change', function (ev) {
    var el = ev.target;
    if (el.matches && el.matches('input[name=cat]')) state.novo.cat = el.value;
    else if (el.matches && el.matches('input[name=pay]')) state.novo.pay = el.value;
    else if (el.matches && el.matches('select[data-role]')) {
      state.people.forEach(function (p) { if (p.email === el.dataset.role) p.role = el.value; });
      toast('Perfil atualizado');
    }
  });

  document.addEventListener('submit', function (ev) {
    var form = ev.target;
    ev.preventDefault();
    if (form.id === 'formNovo') {
      var err = $('#errNovo');
      var cents = parseAmount($('#valor').value);
      var date = $('#data').value || TODAY;
      var desc = $('#desc').value.trim().slice(0, 120);
      var msg = '';
      if (!cents) msg = 'Informe o valor.';
      else if (cents >= 1000000000) msg = 'Valor alto demais. Confira os números.';
      else if (!state.novo.cat) msg = 'Escolha a categoria.';
      else if (!state.novo.pay) msg = 'Escolha a forma de pagamento.';
      if (msg) { err.textContent = msg; err.hidden = false; return; }
      var tipo = state.novo.tipo;
      addEntry({ date: date, tipo: tipo, cents: cents, cat: state.novo.cat, pay: state.novo.pay, desc: desc });
      state.lastPay = state.novo.pay;
      state.month = date.slice(0, 7);
      state.showAll = false;
      toast((tipo === 'despesa' ? 'Gasto lançado: ' : 'Receita lançada: ') + money(cents) + ' em ' + state.novo.cat);
      goto('inicio');
    }
    else if (form.id === 'formPessoa') {
      var e2 = $('#errPessoa');
      var email = $('#novoEmail').value.trim().toLowerCase();
      var role = $('#novoPerfil').value;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { e2.textContent = 'Digite um e-mail válido.'; e2.hidden = false; return; }
      if (state.people.some(function (p) { return p.email === email; })) { e2.textContent = 'Esse e-mail já está na lista.'; e2.hidden = false; return; }
      var local = email.split('@')[0].replace(/[._-]+/g, ' ');
      var name = local.charAt(0).toUpperCase() + local.slice(1);
      state.people.push({ name: name, email: email, role: role, owner: false });
      render(false);
      toast('Acesso liberado para ' + email);
    }
  });

  window.addEventListener('hashchange', onRoute);
  onRoute();
})();
