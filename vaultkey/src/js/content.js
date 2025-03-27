// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "fillPassword") {
    // Find the active password field
    let passwordFields = Array.from(document.querySelectorAll('input[type="password"]'));
    
    // If no password field is found, try to find password-like fields
    if (passwordFields.length === 0) {
      passwordFields = Array.from(document.querySelectorAll('input')).filter(input => {
        const inputId = input.id.toLowerCase();
        const inputName = input.name.toLowerCase();
        const inputClass = input.className.toLowerCase();
        return (
          inputId.includes('pass') || 
          inputName.includes('pass') || 
          inputClass.includes('pass') ||
          inputId.includes('pwd') || 
          inputName.includes('pwd') || 
          inputClass.includes('pwd')
        );
      });
    }
    
    // Focus the first password field and fill it
    if (passwordFields.length > 0) {
      const field = passwordFields[0];
      field.focus();
      field.value = request.password;
      
      // Dispatch input event to trigger form validation
      const event = new Event('input', { bubbles: true });
      field.dispatchEvent(event);
      
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false });
    }
    
    return true; // Keep the messaging channel open for asynchronous response
  }
});
