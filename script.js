document.addEventListener('DOMContentLoaded', () => {

  // 1. INTERACTIVE RADIAL SPOTLIGHT EFFECT
  const spotlight = document.getElementById('spotlight');
  
  if (spotlight) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.setProperty('--x', `${e.clientX}px`);
      spotlight.style.setProperty('--y', `${e.clientY}px`);
    });
  }

  // 2. MOBILE MENU DRAWER TOGGLE
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 3. SCROLLSPY (HIGHLIGHT ACTIVE NAVBAR LINK ON SCROLL)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const scrollSpy = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);

  // 4. CONTACT FORM SIMULATION
  /*const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      alert(`Terima kasih, ${name}! Pesan Anda berhasil dikirim. Saya akan menghubungi Anda melalui email (${email}) secepatnya.`);

      contactForm.reset();
    });
  }*/
 // ==========================================================================
// HANDLING CONTACT FORM (AJAX FORMSPREE + ANIMASI SUKSES)
// ==========================================================================
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
const submitBtn = document.getElementById('submitBtn');
const resetFormBtn = document.getElementById('resetFormBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Mencegah pindah halaman/reload ke Formspree

    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('i');

    // Ubah status tombol menjadi Loading
    submitBtn.disabled = true;
    btnText.textContent = 'Mengirim...';
    btnIcon.className = 'fa-solid fa-spinner fa-spin';

    const formData = new FormData(contactForm);

    try {
      // Kirim data via FETCH API secara asynchronous
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Jika berhasil terkirim: sembunyikan form, tampilkan animasi sukses
        contactForm.style.display = 'none';
        contactSuccess.style.display = 'flex';
        contactForm.reset();
      } else {
        alert('Gagal mengirim pesan. Silakan periksa ID Formspree Anda.');
      }
    } catch (error) {
      alert('Terjadi kesalahan jaringan. Silakan periksa koneksi internet Anda.');
    } finally {
      // Kembalikan tampilan tombol ke posisi awal
      submitBtn.disabled = false;
      btnText.textContent = 'Kirim Pesan';
      btnIcon.className = 'fa-solid fa-paper-plane';
    }
  });
}

// Fitur Tombol "Kirim Pesan Lain"
if (resetFormBtn) {
  resetFormBtn.addEventListener('click', function () {
    contactSuccess.style.display = 'none';
    contactForm.style.display = 'block';
  });
}
});