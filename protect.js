/* ========================================
   AVANYA RESORT — Website Protection Layer
   Anti-copy, Anti-inspect, Anti-debug
   ======================================== */
   ;(function(){
    'use strict';
  
    // ── 1. Disable Right-Click Context Menu ──
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    }, false);
  
    // ── 2. Block Developer Tool Shortcuts (Windows + Mac) ──
    document.addEventListener('keydown', function(e) {
      // F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
  
      var ctrl = e.ctrlKey || e.metaKey;
      var shift = e.shiftKey;
      var alt = e.altKey;
      var key = e.key ? e.key.toLowerCase() : '';
      var code = e.keyCode || e.which;
  
      // Ctrl/Cmd + Shift + I (Inspect)
      if (ctrl && shift && (key === 'i' || code === 73)) {
        e.preventDefault(); return false;
      }
      // Ctrl/Cmd + Shift + J (Console)
      if (ctrl && shift && (key === 'j' || code === 74)) {
        e.preventDefault(); return false;
      }
      // Ctrl/Cmd + Shift + C (Element picker)
      if (ctrl && shift && (key === 'c' || code === 67)) {
        e.preventDefault(); return false;
      }
      // Ctrl/Cmd + U (View Source)
      if (ctrl && !shift && !alt && (key === 'u' || code === 85)) {
        e.preventDefault(); return false;
      }
      // Cmd + Option + I (Mac Inspect)
      if (e.metaKey && alt && (key === 'i' || code === 73)) {
        e.preventDefault(); return false;
      }
      // Cmd + Option + J (Mac Console)
      if (e.metaKey && alt && (key === 'j' || code === 74)) {
        e.preventDefault(); return false;
      }
      // Cmd + Option + C (Mac Elements)
      if (e.metaKey && alt && (key === 'c' || code === 67)) {
        e.preventDefault(); return false;
      }
      // Ctrl/Cmd + S (Save)
      if (ctrl && !shift && !alt && (key === 's' || code === 83)) {
        e.preventDefault(); return false;
      }
      // Ctrl/Cmd + C (Copy) — block text copy
      if (ctrl && !shift && !alt && (key === 'c' || code === 67)) {
        if (window.getSelection && window.getSelection().toString().length > 0) {
          e.preventDefault(); return false;
        }
      }
      // Ctrl/Cmd + A (Select All)
      if (ctrl && !shift && !alt && (key === 'a' || code === 65)) {
        e.preventDefault(); return false;
      }
      // Ctrl/Cmd + P (Print)
      if (ctrl && !shift && !alt && (key === 'p' || code === 80)) {
        e.preventDefault(); return false;
      }
    }, true);
  
    // ── 3. Prevent Content Copying ──
    document.addEventListener('copy', function(e) {
      e.preventDefault();
      return false;
    }, false);
  
    document.addEventListener('cut', function(e) {
      e.preventDefault();
      return false;
    }, false);
  
    document.addEventListener('selectstart', function(e) {
      // Allow selection in form inputs only
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return true;
      }
      e.preventDefault();
      return false;
    }, false);
  
    // ── 4. Prevent Image Drag & Drop ──
    document.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    }, false);
  
    document.addEventListener('drop', function(e) {
      e.preventDefault();
      return false;
    }, false);
  
    // ── 5. Mobile: Block Long-Press Copy ──
    var touchTimer = null;
    document.addEventListener('touchstart', function(e) {
      // Only prevent long-press on non-interactive elements
      if (e.target && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
          e.target.tagName === 'INPUT' || e.target.closest('.cta__btn') ||
          e.target.closest('.nav__link') || e.target.closest('.nav__mobile-link') ||
          e.target.closest('.nav__hamburger') || e.target.closest('.footer__contact-link') ||
          e.target.closest('.footer__link'))) {
        return;
      }
      touchTimer = setTimeout(function() {
        // Prevent context menu on long press
      }, 500);
    }, { passive: true });
  
    document.addEventListener('touchend', function() {
      if (touchTimer) {
        clearTimeout(touchTimer);
        touchTimer = null;
      }
    }, { passive: true });
  
    // ── 6. DevTools Detection ──
    var devtoolsOpen = false;
    var warningOverlay = null;
  
    function createWarningOverlay() {
      if (warningOverlay) return warningOverlay;
      warningOverlay = document.createElement('div');
      warningOverlay.id = 'shield-overlay';
      warningOverlay.style.cssText =
        'position:fixed;inset:0;z-index:999999;' +
        'background:rgba(10,10,10,0.97);' +
        'display:none;align-items:center;justify-content:center;' +
        'flex-direction:column;gap:16px;';
      warningOverlay.innerHTML =
        '<div style="text-align:center;font-family:\'Inter\',sans-serif;">' +
          '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' +
            '<line x1="12" y1="8" x2="12" y2="12"/>' +
            '<line x1="12" y1="16" x2="12.01" y2="16"/>' +
          '</svg>' +
          '<h2 style="color:#c9a96e;font-size:1.4rem;margin-top:16px;letter-spacing:3px;text-transform:uppercase;">Access Restricted</h2>' +
          '<p style="color:#8a8478;font-size:.88rem;max-width:360px;line-height:1.6;">Developer tools have been detected. Please close them to continue viewing the website.</p>' +
        '</div>';
      document.body.appendChild(warningOverlay);
      return warningOverlay;
    }
  
    // Method A: Window outer/inner size difference detection
    function checkDevToolsBySize() {
      var widthDiff = window.outerWidth - window.innerWidth;
      var heightDiff = window.outerHeight - window.innerHeight;
      var threshold = 160;
      return widthDiff > threshold || heightDiff > threshold;
    }
  
    // Method B: Performance-based detection (console.log timing)
    function checkDevToolsByTiming() {
      var start = performance.now();
      // DevTools slows down regex inspection
      var test = /./;
      test.toString = function() {
        devtoolsOpen = true;
      };
      // This triggers toString only when DevTools console is open
      console.log('%c', test);
      return devtoolsOpen;
    }
  
    // Method C: Debugger detection using Image trick
    function checkDevToolsByDebugger() {
      var detected = false;
      var img = new Image();
      Object.defineProperty(img, 'id', {
        get: function() {
          detected = true;
        }
      });
      // console.log triggers getter only when DevTools is open
      console.log(img);
      return detected;
    }
  
    function handleDevToolsState(isOpen) {
      var overlay = createWarningOverlay();
      if (isOpen) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      } else {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
  
    // Periodic DevTools check (lightweight, won't lag)
    setInterval(function() {
      var detected = checkDevToolsBySize();
      handleDevToolsState(detected);
    }, 1500);
  
    // ── 7. Anti-Debugging Traps ──
    // Subtle debugger statements that interrupt inspection
    // Only active when user is stepping through code
    (function antiDebug() {
      function trap() {
        (function() {
          return false;
        })
        ['constructor']('debugger')
        ['call']();
      }
      setInterval(trap, 4000);
    })();
  
    // ── 8. Console Clearing & Warning ──
    // Clear console to remove any insights
    if (typeof console.clear === 'function') {
      console.clear();
    }
  
    // Console warning message
    console.log(
      '%c⚠️ WARNING',
      'color:#c9a96e;font-size:28px;font-weight:bold;text-shadow:1px 1px 2px rgba(0,0,0,.5);'
    );
    console.log(
      '%cThis website is protected. Unauthorized copying or inspection is not permitted.',
      'color:#8a8478;font-size:14px;'
    );
    console.log(
      '%c© 2026 Avanya Resorts & Retreat, Tiruvannamalai',
      'color:#666;font-size:11px;'
    );
  
    // ── 9. Disable Page Source Viewing ──
    // Intercept Ctrl+U / Cmd+U (already in keydown handler)
    // Additional: break out of frames
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  
    // ── 10. Disable Print ──
    window.addEventListener('beforeprint', function(e) {
      document.body.style.display = 'none';
    });
    window.addEventListener('afterprint', function(e) {
      document.body.style.display = '';
    });
  
  })();
  