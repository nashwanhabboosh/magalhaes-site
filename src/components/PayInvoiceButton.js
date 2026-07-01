// PayInvoiceButton.js
import { useEffect, useRef } from 'react';

// Renders the Converge "Buy Button" widget.
//
// IMPORTANT: the Converge script does NOT create its own button.
// It looks for an existing <button> as a sibling within its own
// parentNode, and wires up that button's onclick handler.
//
// React owns the <div>/<button> via normal JSX. The <script> is
// injected manually, exactly once (guarded by scriptAppendedRef),
// as a sibling inside the same wrapper div.
export default function PayInvoiceButton({ className }) {
  const wrapperRef = useRef(null);
  const scriptAppendedRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Append the Converge script exactly once (guarded), even though the
    // effect itself may run more than once (e.g. StrictMode double-invoke).
    if (!scriptAppendedRef.current) {
      const script = document.createElement('script');
      script.src =
        'https://www.convergepay.com/hosted-payments/buy_button_script/555664314a70654653744b47504148706235506a6d514141415a7159586a372b';
      script.async = true;

      wrapper.appendChild(script);
      scriptAppendedRef.current = true;
    }

    // The Converge script wires the button to build a <form> on the fly and
    // call form.submit(), which navigates the current window. To open the
    // payment page in a new tab instead, intercept the click in the capture
    // phase (before the button's own onclick) and force the next form
    // submission to target "_blank". The patch restores itself immediately
    // after that one submit, so nothing else is affected.
    const openInNewTab = () => {
      const originalSubmit = HTMLFormElement.prototype.submit;
      HTMLFormElement.prototype.submit = function () {
        this.target = '_blank';
        HTMLFormElement.prototype.submit = originalSubmit;
        return originalSubmit.apply(this, arguments);
      };
    };
    wrapper.addEventListener('click', openInNewTab, true);

    return () => {
      wrapper.removeEventListener('click', openInNewTab, true);
    };
  }, []);

  // Note: the wrapper div is purely structural (it's what the Converge
  // script attaches to as its parentNode) and should NOT carry the
  // "action-link" class itself - only the <button> should, otherwise
  // both elements get their own ::after underline pseudo-element,
  // producing two visible lines on hover instead of one.
  return (
    <div ref={wrapperRef} style={{ display: 'inline-block' }}>
      <button className={className}>
        PAY INVOICE
      </button>
    </div>
  );
}