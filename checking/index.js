const ValidationResult = {
    valid: null,
    error: null,
    accessToken: null,
    debug: null
};

class KeyValidator {
    constructor(apiUrl) {
        this._apiUrl = apiUrl;
    }
    
    async validateKey(key, hwid) {
        try {
            const response = await fetch(this._apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key, hwid })
            });
            const data = await response.json();
            return {
                valid: response.ok && data.valid,
                error: data.error,
                accessToken: data.accessToken,
                debug: data.debug
            }
        } catch (error) {
            console.error('Error validating key:', error);
            return {
                valid: false,
                error: 'Network or server error occured',
                accessToken: 'no',
                debug: data.debug
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const validator = new KeyValidator("https://keysystemapi.dervipmanager.workers.dev/validate");
    const pendingKey = sessionStorage.getItem('pendingKey');
    if (!pendingKey) {
        window.location.href = '/';
        return
    }
    
    (async () => {
        const result = await validator.validateKey(pendingKey);
        setTimeout(() => {
            if (result.valid) {
                localStorage.setItem('validatedKey', pendingKey);
                localStorage.setItem('accessToken', result.accessToken);
                window.location.href = '/allowed';
            } else {
                sessionStorage.setItem('validationError', result.error || 'Invalid key');
                window.location.href = '/denied';
            }
    
            sessionStorage.removeItem('pendingKey');
        }, 3000);
    })();
})