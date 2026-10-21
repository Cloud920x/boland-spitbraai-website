(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('nav-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    }));
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const dateInput = document.getElementById('eventDate');
  if (dateInput) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localToday;
    const requestedEvent = new URLSearchParams(window.location.search).get('event');
    const eventType = document.getElementById('eventType');
    if (requestedEvent && eventType) {
      const match = Array.from(eventType.options).find(option => option.text.toLowerCase() === requestedEvent.toLowerCase());
      if (match) eventType.value = match.value;
    }
  }

  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', event => {
      event.preventDefault();
      const status = document.getElementById('formStatus');
      if (!quoteForm.reportValidity()) return;
      const data = new FormData(quoteForm);
      const preview = {
        name: data.get('fullName'),
        event: data.get('eventType'),
        date: data.get('eventDate'),
        guests: data.get('guestCount'),
        venue: data.get('venue')
      };
      status.textContent = 'Demo preview only — no enquiry was sent. Your details are not stored. Event: ' + preview.event + ', date: ' + preview.date + ', guests: ' + preview.guests + ', venue: ' + preview.venue + '. Connect an approved form service before accepting real enquiries.';
      status.classList.add('is-visible');
    });
  }
})();