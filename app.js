import { getTokState } from './time.js';
const $ = id => document.getElementById(id);
const excuses = [
  'Nee. Ook niet als je heel hard op deze knop drukt.',
  'Je hebt net gekeken. De kip heeft ook een planning.',
  'Een Teams-meeting duurt langer. Hou vol.',
  'Arthur voelt de druk. Geef die man even.',
  'Nee. Loop anders heel langzaam naar de kantine.',
  'Computer zegt nee. Maag zegt tok.',
  'We hebben de klok gevraagd sneller te gaan. Die wil eerst overleg.',
  'Nog even wachten. Dit is karaktervorming.',
];
const subtitles = ['Je hebt geen honger. Je hebt gewoon zin in vrijdag.', 'De enige meeting waarvoor iedereen op tijd is.', 'Je broodtrommel wist dat deze dag zou komen.', 'Productiviteit: 12%. Denken aan tok: 100%.'];
let previousMode;
let clicks = 0;
let lastBurst = 0;
function celebrate() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || Date.now() - lastBurst < 2500) return;
  lastBurst = Date.now();
  for (let i = 0; i < 45; i++) {
    const piece = document.createElement('i');
    piece.className = 'confetto';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = ['#fff5e4', '#29251f', '#ffc457'][i % 3];
    piece.style.animationDelay = `${Math.random() * .7}s`;
    $('confetti').append(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}
function render() {
  const state = getTokState();
  for (const [id, value] of Object.entries({ days: state.days, hours: state.hours, minutes: state.minutes, seconds: state.remainder })) $(id).textContent = String(value).padStart(2, '0');
  const mode = state.party ? 'party' : state.friday ? 'friday' : 'waiting';
  const progress = state.party ? 100 : Math.min(100, Math.max(0, (1 - state.seconds / 604800) * 100));
  $('progress').style.width = `${progress}%`;
  document.querySelector('[role="progressbar"]').setAttribute('aria-valuenow', String(Math.round(progress)));
  if (mode === previousMode) return;
  previousMode = mode;
  document.body.classList.toggle('party', state.party);
  $('answer').innerHTML = `${state.party ? 'JAAA' : state.friday ? 'BIJNA' : 'NEE'}<span>.</span>`;
  $('verdict').textContent = state.party ? 'Tijd voor tok!' : 'Nog even wachten.';
  $('subtext').textContent = state.party ? 'Laptop dicht. Saus open. Eet smakelijk, collega.' : state.friday ? 'Arthur is nu aan het bestellen.' : subtitles[Math.floor(Math.random() * subtitles.length)];
  $('arthur').textContent = state.party ? 'Het is 16:30 geweest. Schuif maar aan!' : state.friday ? 'Nog even wachten. Arthur is nu aan het bestellen.' : 'Arthur regelt het. Jij hoeft alleen te wachten.';
  $('countdown-title').textContent = state.party ? 'HET WACHTEN IS VOORBIJ' : '◷  NOG ZOVEEL GEDULD NODIG';
  $('target-label').textContent = state.party ? 'NU · TOKTIJD' : 'VRIJDAG · 16:30';
  $('progress-caption').textContent = state.party ? 'Deadline gehaald. Eindelijk eentje die smaakt.' : 'Elke seconde is er eentje dichter bij tok.';
  $('check').innerHTML = state.party ? 'TOK! TOK! <span aria-hidden="true">↗</span>' : 'En nu dan? <span aria-hidden="true">↗</span>';
  $('reply').textContent = '';
  document.title = state.party ? 'JAAA! Tijd voor tok!' : 'Is het al tijd voor tok? Nog even wachten.';
  if (state.party) celebrate();
}
$('check').addEventListener('click', () => {
  render();
  if (getTokState().party) { $('reply').textContent = 'JAAA. Deze knop is nu officieel een tokknop.'; celebrate(); }
  else {
    $('reply').textContent = excuses[clicks++ % excuses.length];
    if (clicks >= 3) $('check').innerHTML = 'Nog stééds niet? <span aria-hidden="true">↗</span>';
    if (clicks >= 6) $('reply').textContent += ` Al ${clicks} keer gekeken. Je functioneringsgesprek wordt interessant.`;
  }
});
render();
setInterval(render, 1000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) render(); });

const noButton = document.querySelector('[data-vote="no"]');
const noArea = document.querySelector('.poll-no-area');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let escapes = 0;
let objections = 0;
let lastEscape = 0;
const refusals = [
  ['Bezwaar afgewezen', 'Je tegenstem is afgewezen door de ondernemingskip. 100% voor. Volgende vraag.'],
  ['Nee is even op', 'Fout 404: geen trek niet gevonden. Je stem is doorgestuurd naar de sausafdeling.'],
  ['Oké dan. Bestellen!', 'De knop heeft zelf trek gekregen. Zelfs Nee is nu voor. Arthur, je weet genoeg.'],
];
function moveNoButton() {
  if (reducedMotion.matches) return;
  const width = noArea.clientWidth - noButton.offsetWidth;
  const height = noArea.clientHeight - noButton.offsetHeight;
  escapes++;
  noButton.style.left = `${escapes % 2 ? Math.max(0, width) : 0}px`;
  noButton.style.top = `${escapes % 2 ? Math.max(0, height) : 0}px`;
}
noButton.addEventListener('pointerenter', event => {
  // Mouse users get three escapes. Touch and keyboard users get the same jokes on activation.
  if (event.pointerType !== 'mouse' || escapes >= 3 || objections > 0 || reducedMotion.matches || Date.now() - lastEscape < 500) return;
  lastEscape = Date.now();
  moveNoButton();
  $('poll-message').textContent = ['Ho ho. Die knop heeft andere plannen.', 'Nee is even naar de kantine.', 'Vooruit, probeer maar. De kip heeft toch vetorecht.'][escapes - 1];
});
noButton.addEventListener('click', event => {
  objections++;
  $('poll-results').hidden = false;
  const [label, message] = refusals[Math.min(objections - 1, refusals.length - 1)];
  $('no-label').textContent = label;
  $('poll-message').textContent = objections > 3 ? 'Kijk, daar zijn we het dan toch over eens. 100% bestellen. Democratie smaakt naar kip.' : message;
  if (event.detail > 0) moveNoButton();
  celebrate();
});
document.querySelector('[data-vote="yes"]').addEventListener('click', () => {
  $('poll-results').hidden = false;
  $('poll-message').textContent = 'Unaniem besloten: 100% voor, 0% tegen. Arthur, bestellen maar!';
  celebrate();
});
// Changing orientation or enabling reduced motion must never leave the button outside its lane.
function resetNoPosition() { noButton.style.left = '0px'; noButton.style.top = '0px'; }
window.addEventListener('resize', resetNoPosition);
reducedMotion.addEventListener('change', resetNoPosition);

const chickenAdvice = ['Tok. Dat is kip voor: Arthur, bestellen.', 'Ik ben geen consultant, maar ik adviseer kip.', 'Mijn agenda? Vrijdag 16:30. Verder niets.', 'Niet aan mijn nuggets komen.', 'Je praat tegen een kip op een website. Gaat het verder goed?'];
let chickenTaps = 0;
$('ask-chicken').addEventListener('click', () => {
  $('chicken-reply').textContent = chickenAdvice[chickenTaps++ % chickenAdvice.length];
});
