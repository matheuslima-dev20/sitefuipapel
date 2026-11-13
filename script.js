// ===== CONFIGURAÇÃO (editar aqui) =====
const CONFIG = {
  whatsapp: "",            // PENDENTE: número com DDI+DDD, ex.: 5511999999999
  gaId: "",                // PENDENTE: Google Analytics (G-XXXXXXXXXX)
  mensagemBase: "Olá! Conheci a Fuipapel pelo site e gostaria de solicitar um orçamento para um produto personalizado."
};
// Fotos reais: preencha com o caminho da imagem (ex.: "img/caixas.jpg")
const FOTOS = { /* "hero-principal": "img/hero.jpg", "galeria-1": "img/g1.jpg" */ };

const CATS = [
  ["Caixas personalizadas","Caixas artesanais para presentes, lembrancinhas e datas especiais.","ph"],
  ["Embalagens","Embalagens pensadas para valorizar o que vai dentro.","ph b"],
  ["Papelaria personalizada","Papelaria afetiva feita sob medida para cada ocasião.","ph c"],
  ["Cartões e materiais impressos","Cartões e impressos com acabamento cuidadoso.","ph d"],
  ["Etiquetas e tags","Detalhes que identificam e encantam em cada pacote.","ph b"],
  ["Produtos sob encomenda","Tem uma ideia diferente? Vamos conversar sobre ela.","ph"]
];
const wa = (txt) => {
  const msg = txt || CONFIG.mensagemBase;
  return "https://wa.me/" + (CONFIG.whatsapp || "") + "?text=" + encodeURIComponent(msg);
};
const grid = document.getElementById("cats");
CATS.forEach(([t,d,c],i) => {
  const el = document.createElement("article");
  el.className = "cat rv";
  el.innerHTML = '<div class="'+c+'" data-photo="cat-'+i+'"><span>Foto · pendente</span></div><div class="body"><span class="tag">Sob consulta</span><h3>'+t+'</h3><p>'+d+'</p><a class="lnk" data-cat="'+t+'" href="#">Solicitar orçamento</a></div>';
  grid.appendChild(el);
});
document.querySelectorAll("[data-cat]").forEach(a => {
  a.href = wa("Olá! Conheci a Fuipapel pelo site e gostaria de solicitar um orçamento de: " + a.dataset.cat + ".");
  a.target = "_blank"; a.rel = "noopener";
});
document.querySelectorAll("[data-wa]").forEach(a => { a.href = wa(); a.target = "_blank"; a.rel = "noopener"; });
document.querySelectorAll("[data-photo]").forEach(el => {
  const src = FOTOS[el.dataset.photo];
  if (src) { el.innerHTML = '<img loading="lazy" alt="Trabalho da Fuipapel" src="'+src+'">'; }
});
if (CONFIG.gaId) {
  const s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + CONFIG.gaId; document.head.appendChild(s);
  window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)} gtag("js", new Date()); gtag("config", CONFIG.gaId);
}
document.getElementById("yr").textContent = new Date().getFullYear();
// header + menu
const hd = document.getElementById("top"), nav = document.getElementById("nav"), bg = document.getElementById("burger");
addEventListener("scroll", () => hd.classList.toggle("sc", scrollY > 30), {passive:true});
const setMenu = (o) => { nav.classList.toggle("open", o); bg.setAttribute("aria-expanded", o); bg.setAttribute("aria-label", o ? "Fechar menu" : "Abrir menu"); document.body.style.overflow = o ? "hidden" : ""; };
bg.onclick = () => setMenu(!nav.classList.contains("open"));
nav.querySelectorAll("a").forEach(a => a.onclick = () => setMenu(false));
addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
// reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.12});
document.querySelectorAll(".rv").forEach(el => io.observe(el));
