document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const passwordField = document.getElementById('passwordField');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');
  const lengthSlider = document.getElementById('lengthSlider');
  const lengthValue = document.getElementById('lengthValue');
  const generateBtn = document.getElementById('generateBtn');
  const copyPassword = document.getElementById('copyPassword');
  const clearBtn = document.getElementById('clearBtn');
  const toggleVisibility = document.getElementById('toggleVisibility');
  const passwordHistoryList = document.getElementById('passwordHistoryList');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('.material-icons');
  const toast = document.getElementById('toast');
  
  // Theme management
  let isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  function updateTheme() {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.textContent = 'dark_mode';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.textContent = 'light_mode';
    }
    localStorage.setItem('darkMode', isDarkMode);
  }
  
  themeToggleBtn.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    updateTheme();
  });
  
  // Initialize theme
  updateTheme();
  
  // Support button - redirect to Ko-fi page
  const supportBtn = document.getElementById('supportBtn');
  supportBtn.addEventListener('click', function() {
    window.open('https://ko-fi.com/vaultkey', '_blank');
    showToast('Opening support page. Thank you!');
  });
  
  // Character type toggles
  const charToggleElements = {
    uppercase: document.getElementById('toggleUpper'),
    lowercase: document.getElementById('toggleLower'),
    numbers: document.getElementById('toggleNumber'),
    symbols: document.getElementById('toggleSymbol'),
    whitespace: document.getElementById('toggleWhitespace'),
    emojis: document.getElementById('toggleEmoji'),
    ascii: document.getElementById('toggleAscii')
  };
  
  // Character sets for password generation
  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
    whitespace: ' \t\n',
    emojis: '😀😁😂🤣😃😄😅😆😉😊😋😎😍😘',
    ascii: '°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'
  };
  
  // Initialize password history from local storage
  let passwordHistory = [];
  try {
    const savedHistory = localStorage.getItem('passwordHistory');
    if (savedHistory) {
      passwordHistory = JSON.parse(savedHistory);
    }
  } catch (error) {
    console.error('Failed to load password history:', error);
    // Start with empty history if there's an error
    passwordHistory = [];
  }
  
  // Initialize visibility state
  let passwordVisible = false;
  
  // Event Handlers
  
  // Update length display when slider is moved
  lengthSlider.addEventListener('input', function() {
    lengthValue.textContent = this.value;
  });
  
  // Initialize toggle buttons
  // Set up click handlers for all character type toggles
  Object.entries(charToggleElements).forEach(([type, element]) => {
    element.addEventListener('click', function() {
      // Toggle the selected state
      this.classList.toggle('selected');
      this.setAttribute('aria-checked', this.classList.contains('selected'));
    });
  });
  
  // Generate password based on selected options
  generateBtn.addEventListener('click', function() {
    const length = parseInt(lengthSlider.value);
    const options = {
      uppercase: charToggleElements.uppercase.classList.contains('selected'),
      lowercase: charToggleElements.lowercase.classList.contains('selected'),
      numbers: charToggleElements.numbers.classList.contains('selected'),
      symbols: charToggleElements.symbols.classList.contains('selected'),
      whitespace: charToggleElements.whitespace.classList.contains('selected'),
      emojis: charToggleElements.emojis.classList.contains('selected'),
      ascii: charToggleElements.ascii.classList.contains('selected')
    };
    
    // Validate that at least one character type is selected
    if (!Object.values(options).some(value => value)) {
      showToast('Select at least one character type', 'error');
      return;
    }
    
    const password = generatePassword(length, options);
    passwordField.value = password;
    checkPasswordStrength(password);
    
    // Add to password history
    addToHistory(password);
  });
  
  // Toggle password visibility
  toggleVisibility.addEventListener('click', function() {
    const icon = this.querySelector('.material-icons');
    
    if (passwordVisible) {
      passwordField.type = 'password';
      icon.textContent = 'visibility';
    } else {
      passwordField.type = 'text';
      icon.textContent = 'visibility_off';
    }
    
    passwordVisible = !passwordVisible;
  });
  
  // Copy password to clipboard
  copyPassword.addEventListener('click', function() {
    if (!passwordField.value) {
      showToast('No password to copy', 'error');
      return;
    }
    
    navigator.clipboard.writeText(passwordField.value)
      .then(() => {
        showToast('Password copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy password: ', err);
        showToast('Failed to copy password', 'error');
      });
  });
  
  // Clear form
  clearBtn.addEventListener('click', function() {
    passwordField.value = '';
    checkPasswordStrength('');
  });
  
  // Check password strength as user types
  passwordField.addEventListener('input', function() {
    checkPasswordStrength(this.value);
  });
  
  // Password autofill feature has been removed
  
  // Helper Functions
  
  // Generate random password
  function generatePassword(length, options) {
    // Ensure secure randomness with crypto API
    function secureRandom(max) {
      const randomBuffer = new Uint32Array(1);
      window.crypto.getRandomValues(randomBuffer);
      return randomBuffer[0] % max;
    }
    
    // Get random character from a string securely
    function getRandomChar(str) {
      return str.charAt(secureRandom(str.length));
    }
    
    let chars = '';
    let password = '';
    
    // Build the character set based on selected options
    if (options.uppercase) chars += charSets.uppercase;
    if (options.lowercase) chars += charSets.lowercase;
    if (options.numbers) chars += charSets.numbers;
    if (options.symbols) chars += charSets.symbols;
    if (options.whitespace) chars += charSets.whitespace;
    if (options.emojis) chars += charSets.emojis;
    if (options.ascii) chars += charSets.ascii;
    
    // Ensure at least one character from each selected type
    if (options.uppercase) password += getRandomChar(charSets.uppercase);
    if (options.lowercase) password += getRandomChar(charSets.lowercase);
    if (options.numbers) password += getRandomChar(charSets.numbers);
    if (options.symbols) password += getRandomChar(charSets.symbols);
    if (options.whitespace) password += getRandomChar(charSets.whitespace);
    if (options.emojis) password += getRandomChar(charSets.emojis);
    if (options.ascii) password += getRandomChar(charSets.ascii);
    
    // Fill remaining length with random characters
    while (password.length < length) {
      password += getRandomChar(chars);
    }
    
    // Shuffle the password characters (Fisher-Yates algorithm)
    const array = password.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = secureRandom(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    
    // Return shuffled password, trimmed to requested length
    return array.join('').slice(0, length);
  }
  
  // Check password strength and update UI
  function checkPasswordStrength(password) {
    // Check which character types are used
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasWhitespace = /\s/.test(password);
    const hasEmoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(password);
    const hasAscii = /[^\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) && !hasEmoji;
    
    // Reset active states before updating
    Object.values(charToggleElements).forEach(element => {
      element.classList.remove('active');
    });
    
    // Update character type indicators
    if (password) { // Only update for non-empty passwords
      if (hasUpper) charToggleElements.uppercase.classList.add('active');
      if (hasLower) charToggleElements.lowercase.classList.add('active');
      if (hasNumber) charToggleElements.numbers.classList.add('active');
      if (hasSymbol) charToggleElements.symbols.classList.add('active');
      if (hasWhitespace) charToggleElements.whitespace.classList.add('active');
      if (hasEmoji) charToggleElements.emojis.classList.add('active');
      if (hasAscii) charToggleElements.ascii.classList.add('active');
    }
    
    // Calculate strength
    const length = password.length;
    const charTypesCount = [hasUpper, hasLower, hasNumber, hasSymbol, hasWhitespace, hasEmoji, hasAscii].filter(Boolean).length;
    
    let strength = '';
    let percentage = 0;
    
    if (length === 0) {
      strength = '';
      percentage = 0;
    } else if (length < 8 || charTypesCount < 2) {
      strength = 'weak';
      percentage = 33;
    } else if (length < 10 || charTypesCount < 3) {
      strength = 'moderate';
      percentage = 66;
    } else {
      strength = 'strong';
      percentage = 100;
    }
    
    // Update UI
    updateStrengthIndicator(strength, percentage);
  }
  
  // The character type indicator functionality has been moved directly into the checkPasswordStrength function
  
  // Update strength indicator
  function updateStrengthIndicator(strength, percentage) {
    // Update progress bar
    strengthBar.style.width = `${percentage}%`;
    
    // Reset classes
    strengthBar.classList.remove('bg-weak', 'bg-moderate', 'bg-strong');
    strengthText.classList.remove('text-weak', 'text-moderate', 'text-strong');
    
    if (!strength) {
      strengthText.textContent = 'None';
      return;
    }
    
    // Add appropriate classes based on strength
    strengthBar.classList.add(`bg-${strength}`);
    strengthText.classList.add(`text-${strength}`);
    
    // Update text
    strengthText.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
  }
  
  // Show toast message
  function showToast(message, type = 'success') {
    const toastMessage = document.getElementById('toastMessage');
    const icon = toast.querySelector('.material-icons');
    
    toastMessage.textContent = message;
    
    if (type === 'error') {
      icon.textContent = 'error';
      icon.classList.remove('text-strong');
      icon.classList.add('text-weak');
    } else {
      icon.textContent = 'check_circle';
      icon.classList.remove('text-weak');
      icon.classList.add('text-strong');
    }
    
    toast.classList.add('visible');
    
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3000);
  }
  
  // Initialize UI state (password starts as hidden)
  passwordField.type = 'password';
  
  // Initialize the strength meter for an empty password
  checkPasswordStrength('');
  
  // Password History Functions
  
  // Add password to history
  function addToHistory(password) {
    // Check if password already exists in history
    if (!password || passwordHistory.includes(password)) {
      return;
    }
    
    // Add to beginning of array (most recent first)
    passwordHistory.unshift(password);
    
    // Limit history size to 10 passwords
    if (passwordHistory.length > 10) {
      passwordHistory.pop();
    }
    
    // Save to local storage
    saveHistory();
    
    // Update UI
    renderPasswordHistory();
  }
  
  // Save password history to local storage
  function saveHistory() {
    try {
      localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
    } catch (error) {
      console.error('Failed to save password history:', error);
    }
  }
  
  // Remove password from history
  function removeFromHistory(index) {
    passwordHistory.splice(index, 1);
    saveHistory();
    renderPasswordHistory();
  }
  
  // Clear all passwords from history
  function clearHistory() {
    passwordHistory = [];
    saveHistory();
    renderPasswordHistory();
  }
  
  // Render password history in the UI
  function renderPasswordHistory() {
    passwordHistoryList.innerHTML = '';
    
    if (passwordHistory.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'empty-history';
      emptyMessage.textContent = 'No passwords in history yet';
      passwordHistoryList.appendChild(emptyMessage);
      return;
    }
    
    // Create a list item for each password
    passwordHistory.forEach((password, index) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      
      // Create password display (shown as dots for security)
      const passwordText = document.createElement('div');
      passwordText.className = 'history-password';
      passwordText.textContent = password;
      
      // Create action buttons
      const actions = document.createElement('div');
      actions.className = 'history-actions';
      
      // Use button
      const useBtn = document.createElement('button');
      useBtn.className = 'btn-icon';
      useBtn.setAttribute('aria-label', 'Use password');
      useBtn.innerHTML = '<span class="material-icons icon-small">login</span>';
      useBtn.addEventListener('click', () => {
        passwordField.value = password;
        checkPasswordStrength(password);
        showToast('Password loaded');
      });
      
      // Copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'btn-icon';
      copyBtn.setAttribute('aria-label', 'Copy password');
      copyBtn.innerHTML = '<span class="material-icons icon-small">content_copy</span>';
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(password)
          .then(() => {
            showToast('Password copied to clipboard!');
          })
          .catch(err => {
            console.error('Failed to copy password: ', err);
            showToast('Failed to copy password', 'error');
          });
      });
      
      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'btn-icon';
      removeBtn.setAttribute('aria-label', 'Remove from history');
      removeBtn.innerHTML = '<span class="material-icons icon-small">delete</span>';
      removeBtn.addEventListener('click', () => {
        removeFromHistory(index);
        showToast('Password removed from history');
      });
      
      // Add buttons to actions
      actions.appendChild(useBtn);
      actions.appendChild(copyBtn);
      actions.appendChild(removeBtn);
      
      // Add all elements to history item
      historyItem.appendChild(passwordText);
      historyItem.appendChild(actions);
      
      // Add item to list
      passwordHistoryList.appendChild(historyItem);
    });
  }
  
  // Event Listeners for History
  
  // Clear all history
  clearHistoryBtn.addEventListener('click', () => {
    clearHistory();
    showToast('Password history cleared');
  });
  
  // Initialize the password history UI
  renderPasswordHistory();
});
