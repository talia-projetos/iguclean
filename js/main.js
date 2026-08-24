/* ============================
   IGUCLEAN — JavaScript principal
   ============================ */

// ── WhatsApp: número da empresa (altere aqui)
const WA_NUMBER = '5545999999999'; // TODO: substitua pelo número real com DDI+DDD

// ── Instagram
const INSTA_URL = 'https://www.instagram.com/iguclean/';

// ── Inicializa links com os dados corretos
(function initLinks() {
  const waHref = `https://wa.me/${WA_NUMBER}`;
  document.querySelectorAll('[id="wa-float"], [id="footer-wa"]').forEach(el => {
    el.href = waHref;
  });
  document.querySelectorAll('[id="footer-insta"]').forEach(el => {
    el.href = INSTA_URL;
    el.textContent = '@iguclean';
  });
  document.querySelector('.insta-btn').href = INSTA_URL;
  document.querySelector('.insta-btn').innerHTML = '<i class="fab fa-instagram"></i> @iguclean';
})();

// ── Navbar: menu mobile
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Navbar: scroll shrink
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mapa: Leaflet centrado em Foz do Iguaçu
window.addEventListener('load', function () {
  const FOZ_CENTER = [-25.5478, -54.5882];

  const map = L.map('map', {
    center: FOZ_CENTER,
    zoom: 12,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  const icon = L.divIcon({
    className: '',
    html: `<div style="
      width:40px;height:40px;
      background:#00B3B6;
      border:3px solid #fff;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 3px 12px rgba(0,0,0,.35);
    "></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  L.marker(FOZ_CENTER, { icon })
    .addTo(map)
    .bindPopup('<strong>Iguclean</strong><br>Foz do Iguaçu – PR')
    .openPopup();

  L.circle(FOZ_CENTER, {
    radius: 14000,
    color: '#00B3B6',
    fillColor: '#00B3B6',
    fillOpacity: 0.12,
    weight: 2,
  }).addTo(map);

  setTimeout(() => map.invalidateSize(), 200);
});

// ── Formulário de agendamento → WhatsApp
document.getElementById('agendamentoForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome     = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const servico  = document.getElementById('servico').value;
  const data     = document.getElementById('data').value;
  const endereco = document.getElementById('endereco').value.trim();
  const obs      = document.getElementById('obs').value.trim();

  if (!nome || !telefone || !servico || !endereco) {
    alert('Por favor, preencha todos os campos obrigatórios (*).');
    return;
  }

  const dataFmt = data
    ? new Date(data + 'T12:00').toLocaleDateString('pt-BR')
    : 'A combinar';

  const msg = [
    `Olá! Gostaria de agendar um serviço com a *Iguclean*.`,
    ``,
    `*Nome:* ${nome}`,
    `*Contato:* ${telefone}`,
    `*Serviço:* ${servico}`,
    `*Data preferida:* ${dataFmt}`,
    `*Endereço:* ${endereco}`,
    obs ? `*Obs.:* ${obs}` : '',
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
});
