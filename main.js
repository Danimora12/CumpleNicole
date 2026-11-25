/* =========================================================
   CONFIGURACIÓN — cambia solo este bloque
   ========================================================= */
const CONFIG = {
  nombre: "Nicole",
  edad: 9,

  // Fecha y horas (hora de Costa Rica, UTC-6)
  fecha: "2026-12-06", // AAAA-MM-DD
  horaInicio: "14:00", // ⚠️ CAMBIAR: hora real de inicio (24 h)
  horaFin: "19:00", // ⚠️ CAMBIAR: hora de recoger (24 h)

  // WhatsApp: código de país + número, sin espacios ni "+". Ej: '50688887777'
  whatsapp: "+50687294806",

  // Ubicación
  lat: 9.870138, // Plus Code V3CC+3C2 (ubicación exacta de la casa)
  lng: -83.928984,
  mapaEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d413.17066907754395!2d-83.9294013613817!3d9.87015700677782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0dfde2e751f05%3A0xcfa97132519e059b!2sV3CC%2B3C2%2C%20Provincia%20de%20Cartago%2C%20Cartago!5e0!3m2!1ses-419!2scr!4v1795574581515!5m2!1ses-419!2scr",

  // Música (MP3 corto, idealmente < 1 MB)
  cancion: "audio/cancion.mp3",

  // Fotos del carrusel (5). Si un archivo no existe, se muestra un espacio rosado.
  fotos: [
    { src: "img/bebe.webp", texto: "bebé Nicole" },
    { src: "img/6anos.webp", texto: "mis 7" },
    { src: "img/princesa.webp", texto: "mis 8" },
    { src: "img/scouts.webp", texto: "Amo los Scouts!" },
    { src: "img/baile.webp", texto: "mi lugar feliz" },
    { src: "img/Sabik.webp", texto: "¡me encanta bailar!" },
  ],

  // Misiones secretas (tarjetas). {fin} se reemplaza por la hora de recoger.
  misiones: [
    {
      titulo: "Código de vestimenta",
      desc: "Ven en pijama o ropa cómoda. ¡Pantuflas permitidas!",
    },
    {
      titulo: "Trae a tu mamá o a tu papá",
      desc: "Uno de ellos esta invitado, escoge con sabiduría.",
    },
    {
      titulo: "Duracion de la misión",
      desc: "La misión empieza a las 2pm y termina a las 7pm, así que no llegues tarde.",
    },
    {
      titulo: "Contraseña secreta",
      desc: 'Al llegar, di: "¡Feliz cumple, Nicole!"',
    },
  ],
};

/* =========================================================
   UTILIDADES
   ========================================================= */
const $ = (sel) => document.querySelector(sel);
const reduceMov = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const DIAS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

// Fecha del evento en hora de Costa Rica
const inicio = new Date(`${CONFIG.fecha}T${CONFIG.horaInicio}:00-06:00`);
const fin = new Date(`${CONFIG.fecha}T${CONFIG.horaFin}:00-06:00`);

const [anio, mes, dia] = CONFIG.fecha.split("-").map(Number);
const diaSemana = DIAS[new Date(anio, mes - 1, dia).getDay()];
const fechaLarga = `${diaSemana} ${dia} de ${MESES[mes - 1]}`;

function hora12(hhmm) {
  let [h, m] = hhmm.split(":").map(Number);
  const sufijo = h >= 12 ? "p.m." : "a.m.";
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, "0")} ${sufijo}`;
}

/* =========================================================
   TEXTOS DINÁMICOS
   ========================================================= */
$("#txtNombre").textContent = CONFIG.nombre;
$("#txtEdad").textContent = CONFIG.edad;
document
  .querySelectorAll(".js-nombre")
  .forEach((el) => (el.textContent = CONFIG.nombre));
$("#sello span").textContent = CONFIG.nombre.charAt(0).toUpperCase();
$("#txtDiaNum").textContent = String(dia).padStart(2, "0");
$("#txtMes").textContent = MESES[mes - 1];
$("#txtDiaSemana").textContent = diaSemana;
$("#txtHora").textContent = hora12(CONFIG.horaInicio);
$("#txtHoraFin").textContent = hora12(CONFIG.horaFin);
$("#paseFecha").textContent = `${fechaLarga} · ${hora12(CONFIG.horaInicio)}`;
$("#mapa").src = CONFIG.mapaEmbed;
$("#btnWaze").href =
  `https://waze.com/ul?ll=${CONFIG.lat},${CONFIG.lng}&navigate=yes`;
$("#btnMaps").href =
  `https://www.google.com/maps/dir/?api=1&destination=${CONFIG.lat},${CONFIG.lng}`;

/* =========================================================
   EFECTOS: confeti y corazones
   ========================================================= */
const capa = $("#efectos");
const COLORES = [
  "#C2303A",
  "#F2A7BB",
  "#F7D774",
  "#1E1B18",
  "#D8B88A",
  "#FFFDF8",
];

function confeti(cantidad = 70) {
  if (reduceMov) return;
  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement("span");
    p.className = "confeti";
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = COLORES[i % COLORES.length];
    p.style.setProperty("--x", Math.random() * 120 - 60 + "px");
    p.style.setProperty("--r", Math.random() * 720 + 180 + "deg");
    p.style.animationDuration = Math.random() * 1.5 + 2 + "s";
    p.style.animationDelay = Math.random() * 0.4 + "s";
    capa.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  }
}

function lluviaCorazones(cantidad = 28) {
  if (reduceMov) return;
  const tonos = ["#C2303A", "#F2A7BB", "#E496A9", "#8E1F27"];
  for (let i = 0; i < cantidad; i++) {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const t = Math.random() * 18 + 18;
    c.setAttribute("viewBox", "0 0 24 24");
    c.setAttribute("width", t);
    c.setAttribute("height", t);
    c.classList.add("corazon");
    c.innerHTML = `<path fill="${tonos[i % tonos.length]}" d="M12 21s-7.5-4.6-9.6-9.2C.8 8.3 3 4 7 4c2.2 0 3.6 1.2 5 3 1.4-1.8 2.8-3 5-3 4 0 6.2 4.3 4.6 7.8C19.5 16.4 12 21 12 21z"/>`;
    c.style.left = Math.random() * 100 + "vw";
    c.style.setProperty("--x", Math.random() * 80 - 40 + "px");
    c.style.setProperty("--r", Math.random() * 60 - 30 + "deg");
    c.style.animationDuration = Math.random() * 2 + 2.5 + "s";
    c.style.animationDelay = Math.random() * 0.8 + "s";
    capa.appendChild(c);
    c.addEventListener("animationend", () => c.remove());
  }
}

/* =========================================================
   MÚSICA
   ========================================================= */
const audio = $("#musica");
const btnMusica = $("#musicaBtn");
audio.src = CONFIG.cancion;
audio.volume = 0.6;

function actualizarBtnMusica(sonando) {
  btnMusica.classList.toggle("sonando", sonando);
  btnMusica.setAttribute("aria-pressed", String(sonando));
  btnMusica.setAttribute(
    "aria-label",
    sonando ? "Pausar música" : "Reproducir música",
  );
}

function reproducir() {
  audio
    .play()
    .then(() => actualizarBtnMusica(true))
    .catch(() => actualizarBtnMusica(false));
}

btnMusica.addEventListener("click", () => {
  if (audio.paused) reproducir();
  else {
    audio.pause();
    actualizarBtnMusica(false);
  }
});

// Pausa si la persona cambia de app o pestaña
document.addEventListener("visibilitychange", () => {
  if (document.hidden && !audio.paused) {
    audio.pause();
    actualizarBtnMusica(false);
  }
});

audio.addEventListener("error", () => {
  btnMusica.hidden = true;
});

/* =========================================================
   SOBRE
   ========================================================= */
const sobre = $("#sobre");
const pantallaSobre = $("#sobrePantalla");
let abierto = false;

function abrirSobre() {
  if (abierto) return;
  abierto = true;
  reproducir(); // el toque permite iniciar el audio
  sobre.classList.add("abierto");
  setTimeout(
    () => {
      pantallaSobre.classList.add("oculta");
      document.body.classList.remove("bloqueado");
      btnMusica.hidden = false;
      confeti();
    },
    reduceMov ? 0 : 1300,
  );
}

$("#sello").addEventListener("click", abrirSobre);
pantallaSobre.addEventListener("click", abrirSobre); // cualquier toque en la pantalla abre

/* =========================================================
   CARRUSEL
   ========================================================= */
const pista = $("#pista");
const puntos = $("#puntos");

CONFIG.fotos.forEach((foto, i) => {
  const fig = document.createElement("figure");
  fig.className = "polaroid";
  fig.style.margin = "0";

  const marco = document.createElement("div");
  marco.className = "polaroid__foto";
  const img = new Image();
  img.alt = foto.texto
    ? `${CONFIG.nombre}: ${foto.texto}`
    : `Foto ${i + 1} de ${CONFIG.nombre}`;
  img.decoding = "async";
  // La imagen va al DOM desde el inicio: una imagen "lazy" fuera del documento
  // nunca se descarga (por eso antes solo cargaba la primera).
  img.onerror = () => {
    img.remove();
    marco.textContent = `Foto ${i + 1}`; // si falta el archivo, queda el espacio de color
  };
  img.src = foto.src;
  marco.appendChild(img);

  const cap = document.createElement("figcaption");
  cap.className = "polaroid__texto";
  cap.textContent = foto.texto || "";

  fig.append(marco, cap);
  pista.appendChild(fig);

  const punto = document.createElement("button");
  punto.type = "button";
  punto.setAttribute("aria-label", `Ver foto ${i + 1}`);
  punto.addEventListener("click", () => irA(i));
  puntos.appendChild(punto);
});

const slides = [...pista.children];
const botonesPunto = [...puntos.children];
let actual = 0;

function irA(i) {
  const s = slides[i];
  pista.scrollTo({
    left: s.offsetLeft - (pista.clientWidth - s.clientWidth) / 2,
    behavior: reduceMov ? "auto" : "smooth",
  });
}

const contador = $("#contador");
function marcarPunto(i) {
  actual = i;
  contador.textContent = `${i + 1} / ${slides.length}`;
  botonesPunto.forEach((b, j) =>
    b.setAttribute("aria-current", String(j === i)),
  );
}

// Detecta la foto centrada
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) marcarPunto(slides.indexOf(e.target));
    });
  },
  { root: pista, threshold: 0.6 },
);
slides.forEach((s) => observador.observe(s));
marcarPunto(0);

// Avance automático; se detiene cuando la persona toca el carrusel
let auto = null;
function iniciarAuto() {
  if (reduceMov) return;
  detenerAuto();
  auto = setInterval(() => irA((actual + 1) % slides.length), 4000);
}
function detenerAuto() {
  clearInterval(auto);
}
pista.addEventListener("touchstart", detenerAuto, { passive: true });
pista.addEventListener("pointerdown", detenerAuto);
pista.addEventListener("touchend", () => setTimeout(iniciarAuto, 6000), {
  passive: true,
});
iniciarAuto();

/* =========================================================
   CUENTA REGRESIVA
   ========================================================= */
const cuenta = $("#cuenta");
const c = { d: $("#cDias"), h: $("#cHoras"), m: $("#cMin"), s: $("#cSeg") };
const dos = (n) => String(n).padStart(2, "0");

function tic() {
  const resta = inicio - Date.now();
  if (resta <= 0) {
    cuenta.classList.add("llego");
    cuenta.textContent =
      Date.now() < fin ? "¡La fiesta es hoy!" : "¡Gracias por venir!";
    clearInterval(reloj);
    return;
  }
  c.d.textContent = dos(Math.floor(resta / 864e5));
  c.h.textContent = dos(Math.floor((resta / 36e5) % 24));
  c.m.textContent = dos(Math.floor((resta / 6e4) % 60));
  c.s.textContent = dos(Math.floor((resta / 1e3) % 60));
}
const reloj = setInterval(tic, 1000);
tic();

/* =========================================================
   AGREGAR AL CALENDARIO
   iPhone/Mac → archivo .ics  ·  Android/otros → Google Calendar
   ========================================================= */
const utc = (d) =>
  d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
const tituloEvento = `Tarde de chicas · Cumple de ${CONFIG.nombre}`;
const detalleEvento = `¡${CONFIG.nombre} cumple ${CONFIG.edad}! Ven en pijama o ropa cómoda.`;
const lugarEvento = `https://www.google.com/maps?q=${CONFIG.lat},${CONFIG.lng}`;

$("#btnCalendario").addEventListener("click", () => {
  const esApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);

  if (esApple) {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Invitacion//ES",
      "BEGIN:VEVENT",
      `UID:cumple-${CONFIG.nombre.toLowerCase()}-${CONFIG.fecha}@invitacion`,
      `DTSTAMP:${utc(new Date())}`,
      `DTSTART:${utc(inicio)}`,
      `DTEND:${utc(fin)}`,
      `SUMMARY:${tituloEvento}`,
      `DESCRIPTION:${detalleEvento}`,
      `LOCATION:${lugarEvento}`,
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${tituloEvento}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(
      new Blob([ics], { type: "text/calendar;charset=utf-8" }),
    );
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `cumple-${CONFIG.nombre}.ics`,
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  } else {
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: tituloEvento,
      dates: `${utc(inicio)}/${utc(fin)}`,
      details: detalleEvento,
      location: lugarEvento,
    });
    window.open(
      `https://calendar.google.com/calendar/render?${p}`,
      "_blank",
      "noopener",
    );
  }
});

/* =========================================================
   MISIONES SECRETAS
   ========================================================= */
CONFIG.misiones.forEach((m, i) => {
  const desc = m.desc.replace("{fin}", hora12(CONFIG.horaFin));
  const b = document.createElement("button");
  b.type = "button";
  b.className = "mision";
  b.setAttribute("aria-pressed", "false");
  b.setAttribute("aria-label", `Misión ${i + 1}: toca para descubrir`);
  b.innerHTML = `
    <div class="mision__interior">
      <div class="mision__cara mision__frente"><span class="mision__sello mono">Confidencial</span><span class="mision__num mano">Misión ${String(i + 1).padStart(2, "0")}</span><span class="mision__toca mono">toca para abrir</span></div>
      <div class="mision__cara mision__atras"><p class="mision__titulo"></p><p class="mision__desc"></p></div>
    </div>`;
  b.querySelector(".mision__titulo").textContent = m.titulo;
  b.querySelector(".mision__desc").textContent = desc;
  b.addEventListener("click", () => {
    const volteada = b.classList.toggle("volteada");
    b.setAttribute("aria-pressed", String(volteada));
    b.setAttribute(
      "aria-label",
      volteada
        ? `Misión ${i + 1}: ${m.titulo}. ${desc}`
        : `Misión ${i + 1}: toca para descubrir`,
    );
  });
  $("#misiones").appendChild(b);
});

/* =========================================================
   SORPRESA ESCONDIDA: tocar 3 veces el nombre
   ========================================================= */
const nombreBtn = $("#nombreSecreto");
let toques = 0;
let timerToques = null;

nombreBtn.addEventListener("click", () => {
  toques++;
  nombreBtn.classList.remove("brinca");
  void nombreBtn.offsetWidth; // reinicia la animación
  nombreBtn.classList.add("brinca");
  clearTimeout(timerToques);
  timerToques = setTimeout(() => (toques = 0), 1200);
  if (toques >= 3) {
    toques = 0;
    lluviaCorazones();
  }
});

/* =========================================================
   CONFIRMAR + PASE VIP + WHATSAPP
   ========================================================= */
const form = $("#formulario");
const inputNombre = $("#invitada");
const errorNombre = $("#errorNombre");
const errorWhats = $("#errorWhats");

inputNombre.addEventListener("input", () => {
  errorNombre.hidden = true;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const invitada = inputNombre.value.trim();
  const mensaje = $("#mensaje").value.trim();

  if (!invitada) {
    errorNombre.hidden = false;
    inputNombre.focus();
    return;
  }

  // Pase VIP
  $("#paseNombre").textContent = invitada;
  // Número de serie "único" a partir del nombre (siempre el mismo para el mismo nombre)
  const serie =
    [...invitada.toLowerCase()].reduce(
      (h, ch) => (h * 31 + ch.charCodeAt(0)) % 997,
      7,
    ) + 1;
  $("#paseSerie").textContent = `Nº ${String(serie).padStart(3, "0")}`;
  const pase = $("#pase");
  pase.hidden = false;
  confeti(90);

  // Mensaje de WhatsApp
  let texto = `¡Hola! Confirmo que ${invitada} vamos a la Tarde de chicas de ${CONFIG.nombre} \n ${fechaLarga}, ${hora12(CONFIG.horaInicio)}`;
  if (mensaje) texto += `\n\n Mensaje para ${CONFIG.nombre}:\n"${mensaje}"`;

  if (!CONFIG.whatsapp) {
    errorWhats.hidden = false;
  } else {
    errorWhats.hidden = true;
    window.open(
      `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener",
    );
  }

  setTimeout(
    () =>
      pase.scrollIntoView({
        behavior: reduceMov ? "auto" : "smooth",
        block: "center",
      }),
    150,
  );
});
