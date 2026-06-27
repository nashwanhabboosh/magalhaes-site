// MobileNav.js
//
// Tap-driven mobile navigation: a hamburger toggle plus a full-screen
// overlay menu, shown only below the tablet breakpoint (see MobileNav.css).
//
// This exists because the desktop nav (Header.js + Dropdown.js) reveals
// its dropdown menus on CSS `:hover`, which never fires on a touchscreen.
// Before this component, a visitor on a phone or tablet could reach
// top-level pages (tapping "SERVICES" navigates to /services/) but could
// not reach anything nested one level deeper -- individual doctor pages,
// individual service pages, or eye-disease sub-pages -- because those only
// existed inside a hover-only dropdown with no tap equivalent.
//
// MobileNav re-renders the same nav structure as an accordion: tapping a
// top-level item with children expands/collapses its list in place
// (React state, not :hover), and the one item that nests a second level
// ("Eye Diseases") expands the same way, one level deeper.
//
// It also carries the phone number, "Order Contacts" link, and Pay Invoice
// button that normally live in the desktop top-bar (Header.js's
// .top-bar-actions): that bar is hidden below the tablet breakpoint (see
// the @media rule in MobileNav.css) because it visually collided with the
// fixed-position hamburger toggle, so those actions move here instead of
// just disappearing on mobile.
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PayInvoiceButton from './PayInvoiceButton';
import './MobileNav.css';

const MobileNav = ({ navItems, dropdownItems, onSimpleNavClick, onDropdownItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null); // top-level item currently expanded, e.g. 'SERVICES'
  const [expandedSubItem, setExpandedSubItem] = useState(null); // nested item currently expanded, e.g. 'Eye Diseases'
  const toggleButtonRef = useRef(null);

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedItem(null);
    setExpandedSubItem(null);
  };

  // Close on Escape, same pattern as LocationPickerModal
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Lock background scroll while open, same pattern as LocationPickerModal
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleToggleItem = (item) => {
    setExpandedItem((prev) => (prev === item ? null : item));
    setExpandedSubItem(null); // collapse any open nested item when switching top-level items
  };

  const handleToggleSubItem = (label) => {
    setExpandedSubItem((prev) => (prev === label ? null : label));
  };

  const handleSimpleClick = (item) => {
    closeMenu();
    onSimpleNavClick(item);
  };

  const handleDropdownClick = (category, itemLabel) => {
    closeMenu();
    onDropdownItemClick(category, itemLabel);
  };

  const renderDropdownItem = (category, item) => {
    const hasChildren = item.children && item.children.length > 0;
    const itemLabel = typeof item === 'string' ? item : item.label;

    if (!hasChildren) {
      return (
        <li key={itemLabel} className="mobile-nav-subitem">
          <button
            className="mobile-nav-sublink"
            onClick={() => handleDropdownClick(category, itemLabel)}
          >
            {itemLabel}
          </button>
        </li>
      );
    }

    const isExpanded = expandedSubItem === itemLabel;
    return (
      <li key={itemLabel} className="mobile-nav-subitem has-nested">
        <button
          className={`mobile-nav-sublink nested-toggle ${isExpanded ? 'expanded' : ''}`}
          onClick={() => handleToggleSubItem(itemLabel)}
          aria-expanded={isExpanded}
        >
          {itemLabel}
          <span className="mobile-nav-chevron" aria-hidden="true">⌄</span>
        </button>
        {isExpanded && (
          <ul className="mobile-nav-nested-list">
            {item.children.map((child) => {
              const childLabel = typeof child === 'string' ? child : child.label;
              return (
                <li key={childLabel} className="mobile-nav-subitem">
                  <button
                    className="mobile-nav-sublink"
                    onClick={() => handleDropdownClick(category, childLabel)}
                  >
                    {childLabel}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      <button
        ref={toggleButtonRef}
        className="mobile-nav-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <span className="mobile-nav-bar" />
        <span className="mobile-nav-bar" />
        <span className="mobile-nav-bar" />
      </button>

      {isOpen &&
        createPortal(
          <div className="mobile-nav-overlay" role="dialog" aria-modal="true" aria-label="Site menu">
            <div className="mobile-nav-header">
              <img src="/logo_transparent.png" alt="Eye Health Vision Centers" className="mobile-nav-logo" />
              <button className="mobile-nav-close" onClick={closeMenu} aria-label="Close menu">
                ✕
              </button>
            </div>

            <ul className="mobile-nav-list">
              {navItems.map((item) => {
                const items = dropdownItems[item];
                if (!items) {
                  return (
                    <li key={item} className="mobile-nav-item">
                      <button className="mobile-nav-link" onClick={() => handleSimpleClick(item)}>
                        {item}
                      </button>
                    </li>
                  );
                }

                const isExpanded = expandedItem === item;
                return (
                  <li key={item} className="mobile-nav-item">
                    <button
                      className={`mobile-nav-link toggle ${isExpanded ? 'expanded' : ''}`}
                      onClick={() => handleToggleItem(item)}
                      aria-expanded={isExpanded}
                    >
                      {item}
                      <span className="mobile-nav-chevron" aria-hidden="true">⌄</span>
                    </button>
                    {isExpanded && (
                      <ul className="mobile-nav-sublist">
                        {items.map((subItem) => renderDropdownItem(item, subItem))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mobile-nav-footer">
              <a href="tel:508-717-0425" className="mobile-nav-phone" onClick={closeMenu}>
                📞 508-717-0425
              </a>
              <div className="mobile-nav-footer-links">
                <a
                  href="https://portal.drcontactlens.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav-footer-link"
                  onClick={closeMenu}
                >
                  Order Contacts
                </a>
                <div className="mobile-nav-footer-link-wrap">
                  <PayInvoiceButton className="mobile-nav-footer-link" />
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default MobileNav;
