// ===== PAGE NAVIGATION FUNCTIONALITY =====
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Scroll to top of page smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ===== MOBILE MENU FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

function closeMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('mobile-open');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
    }
    
    // Close all dropdowns
    document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
        dropdown.classList.remove('show');
    });
    document.querySelectorAll('.projects-link, .whitepapers-link, .apps-link').forEach(link => {
        link.classList.remove('active');
    });
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.contains('mobile-open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            hamburger.classList.add('active');
            navMenu.classList.add('mobile-open');
            navMenu.classList.add('open');
            document.body.classList.add('menu-open');
            hamburger.setAttribute('aria-expanded', 'true');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('mobile-open')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 900) {
                closeMobileMenu();
            }
        }, 250);
    });
}

// ===== NAVIGATION LINK FUNCTIONALITY =====
// Handle regular nav links (Home)
document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pageId = this.getAttribute('data-page');
        
        if (pageId) {
            showPage(pageId);
            closeMobileMenu();
        }
    });
});

// ===== DROPDOWN FUNCTIONALITY =====
document.querySelectorAll('.projects-link, .whitepapers-link, .apps-link').forEach(parentLink => {
    const dropdown = parentLink.querySelector('.dropdown-menu');
    const arrow = parentLink.querySelector('.dropdown-arrow');

    // Desktop: hover behavior
    if (window.innerWidth > 900) {
        parentLink.addEventListener('mouseenter', function() {
            if (dropdown) {
                dropdown.classList.add('show');
                parentLink.classList.add('active');
            }
        });
        
        parentLink.addEventListener('mouseleave', function() {
            if (dropdown) {
                dropdown.classList.remove('show');
                parentLink.classList.remove('active');
            }
        });
    }

    // Mobile: click behavior
    if (arrow && dropdown) {
        arrow.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                e.stopPropagation();

                // Close other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('show');
                    }
                });
                
                document.querySelectorAll('.projects-link, .whitepapers-link, .apps-link').forEach(link => {
                    if (link !== parentLink) {
                        link.classList.remove('active');
                    }
                });

                // Toggle current dropdown
                const isOpen = dropdown.classList.contains('show');
                if (isOpen) {
                    dropdown.classList.remove('show');
                    parentLink.classList.remove('active');
                } else {
                    dropdown.classList.add('show');
                    parentLink.classList.add('active');
                }
            }
        });
    }

    // Parent link click (mobile) - navigate to section
    parentLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            // Don't navigate if clicking the arrow
            if (e.target && e.target.closest('.dropdown-arrow')) {
                return;
            }

            e.preventDefault();
            
            // Determine which page to show
            let pageId = null;
            if (parentLink.classList.contains('projects-link')) {
                pageId = 'projects';
            } else if (parentLink.classList.contains('whitepapers-link')) {
                pageId = 'whitepapers';
            } else if (parentLink.classList.contains('apps-link')) {
                pageId = 'apps';
            }

            if (pageId) {
                showPage(pageId);
                closeMobileMenu();
            }
        }
    });
});

// Handle dropdown menu links
document.querySelectorAll('.dropdown-menu a').forEach(dropdownLink => {
    dropdownLink.addEventListener('click', function(e) {
        // If it's an external link (href starts with http), let it work normally
        const href = this.getAttribute('href');
        if (href && (href.startsWith('http') || href.startsWith('//'))) {
            closeMobileMenu();
            return; // Let the link work normally
        }
        
        // Remove active from all dropdown links
        document.querySelectorAll('.dropdown-menu a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active to clicked link
        this.classList.add('active');
        
        // Close mobile menu
        closeMobileMenu();
    });
});

// ===== MODAL FUNCTIONALITY =====
const exploreEcosystemBtn = document.getElementById('exploreEcosystemBtn');
const viewWhitepapersBtn = document.getElementById('viewWhitepapersBtn');
const ecosystemModal = document.getElementById('ecosystemModal');
const whitepapersModal = document.getElementById('whitepapersModal');
const comingSoonModal = document.getElementById('comingSoonModal');
const closeEcosystemModal = document.getElementById('closeEcosystemModal');
const closeWhitepapersModal = document.getElementById('closeWhitepapersModal');
const closeComingSoonModal = document.getElementById('closeComingSoonModal');

function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Ecosystem Modal
if (exploreEcosystemBtn) {
    exploreEcosystemBtn.addEventListener('click', () => openModal(ecosystemModal));
}
if (closeEcosystemModal) {
    closeEcosystemModal.addEventListener('click', () => closeModal(ecosystemModal));
}

// Whitepapers Modal
if (viewWhitepapersBtn) {
    viewWhitepapersBtn.addEventListener('click', () => openModal(whitepapersModal));
}
if (closeWhitepapersModal) {
    closeWhitepapersModal.addEventListener('click', () => closeModal(whitepapersModal));
}

// Coming Soon Modal
if (closeComingSoonModal) {
    closeComingSoonModal.addEventListener('click', () => closeModal(comingSoonModal));
}

// Community links
document.querySelectorAll('.community-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(comingSoonModal);
    });
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === ecosystemModal) closeModal(ecosystemModal);
    if (event.target === whitepapersModal) closeModal(whitepapersModal);
    if (event.target === comingSoonModal) closeModal(comingSoonModal);
});

// Close modals with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal(ecosystemModal);
        closeModal(whitepapersModal);
        closeModal(comingSoonModal);
    }
});

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Show home page by default
    showPage('home');
});
