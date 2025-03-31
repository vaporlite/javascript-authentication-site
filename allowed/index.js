const accessToken = localStorage.getItem('accessToken');
const codeDisplayElement = document.getElementById('code-display');
const copyBtn = document.getElementById('copy-btn')

if (codeDisplayElement && copyBtn) {
    codeDisplayElement.textContent = accessToken || 'XXXXX';
    localStorage.removeItem('accessToken');
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeDisplayElement.textContent).then(() => {
            copyBtn.textContent = 'Copied';
            setTimeout(() => {
                copyBtn.textContent = 'Copy'
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    })
}