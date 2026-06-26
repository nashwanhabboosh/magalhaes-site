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
    if (!wrapper || scriptAppendedRef.current) return;

    const script = document.createElement('script');
    script.src =
      'https://www.convergepay.com/hosted-payments/buy_button_script/555664314a70654653744b47504148706235506a6d514141415a7159586a372b';
    script.async = true;

    wrapper.appendChild(script);
    scriptAppendedRef.current = true;
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