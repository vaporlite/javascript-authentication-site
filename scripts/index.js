document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('key-form');
    if (form) {
        const keyInput = document.getElementById('key-input');

        form.addEventListener('submit', async (event) => {
          event.preventDefault();
          const key = keyInput.value.trim();
          
          if (!key) {
            alert('no key entered');
            return;
          }

          sessionStorage.setItem('pendingKey', key);
          window.location.href = '/checking';
        });

        const savedKey = localStorage.getItem('validatedKey');
        if (savedKey) {
            keyInput.value = savedKey;
        }
    }
})