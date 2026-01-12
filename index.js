// ===== MOBILE MENU FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('mobile-open');
        navMenu.classList.toggle('open'); // Keep compatibility with existing class
        document.body.classList.toggle('menu-open');
        hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-open');
            navMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle window resize - close menu if resizing to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 900) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-open');
                navMenu.classList.remove('open');
                document.body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            }
        }, 250);
    });
}

// ===== DROPDOWN FUNCTIONALITY =====
// Mobile behavior: tapping the arrow toggles submenu; tapping the label navigates to section
document.querySelectorAll('.projects-link, .whitepapers-link, .apps-link').forEach(link => {
    const dropdown = link.querySelector('.dropdown-menu');
    const arrow = link.querySelector('.dropdown-arrow');

    // Toggle submenu when tapping the arrow on mobile
    if (arrow && dropdown) {
        arrow.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                e.stopPropagation();

                // Close other open dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('show');
                    }
                });

                // Toggle current dropdown
                dropdown.classList.toggle('show');
                link.classList.toggle('active');
            }
        });
    }

    // Navigate to section when tapping the parent label on mobile
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            // Ignore clicks on the arrow (handled above)
            if (e.target && e.target.closest('.dropdown-arrow')) return;

            // Map parent items to section IDs
            let targetHash = null;
            if (link.classList.contains('projects-link')) targetHash = '#projects';
            if (link.classList.contains('whitepapers-link')) targetHash = '#whitepapers';
            if (link.classList.contains('apps-link')) targetHash = '#apps';

            if (targetHash) {
                e.preventDefault();
                // Close mobile menu
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('mobile-open');
                    navMenu.classList.remove('open');
                    document.body.classList.remove('menu-open');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
                // Close all dropdowns and deactivate parents
                document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('show'));
                document.querySelectorAll('.projects-link, .whitepapers-link, .apps-link').forEach(l => l.classList.remove('active'));

                // Navigate
                window.location.hash = targetHash;
            }
        }
    });
});

// Close dropdowns when clicking a dropdown link (mobile and desktop)
document.querySelectorAll('.dropdown-menu a').forEach(dropdownLink => {
    dropdownLink.addEventListener('click', function(e) {
        // Remove active class from all dropdown links
        document.querySelectorAll('.dropdown-menu a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        if (window.innerWidth <= 900) {
            // Close the mobile menu
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
            
            // Remove active class from parent links
            document.querySelectorAll('.projects-link, .whitepapers-link, .apps-link').forEach(link => {
                link.classList.remove('active');
            });
        }
    });
    
    // Add mouse down event for immediate visual feedback
    dropdownLink.addEventListener('mousedown', function() {
        document.querySelectorAll('.dropdown-menu a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Close regular nav links on mobile
document.querySelectorAll('.nav-link').forEach(link => {
    // Skip links that have dropdowns
    if (!link.querySelector('.dropdown-menu')) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 900 && hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-open');
                navMenu.classList.remove('open');
                document.body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// ===== MODAL FUNCTIONALITY =====
const exploreEcosystemBtn = document.getElementById('exploreEcosystemBtn');
const viewWhitepapersBtn = document.getElementById('viewWhitepapersBtn');
const ecosystemModal = document.getElementById('ecosystemModal');
const whitepapersModal = document.getElementById('whitepapersModal');
const closeEcosystemModal = document.getElementById('closeEcosystemModal');
const closeWhitepapersModal = document.getElementById('closeWhitepapersModal');

// Open Ecosystem Modal
if (exploreEcosystemBtn && ecosystemModal) {
    exploreEcosystemBtn.addEventListener('click', () => {
        ecosystemModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
}

// Open Whitepapers Modal
if (viewWhitepapersBtn && whitepapersModal) {
    viewWhitepapersBtn.addEventListener('click', () => {
        whitepapersModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
}

// Close Ecosystem Modal
if (closeEcosystemModal && ecosystemModal) {
    closeEcosystemModal.addEventListener('click', () => {
        ecosystemModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
}

// Close Whitepapers Modal
if (closeWhitepapersModal && whitepapersModal) {
    closeWhitepapersModal.addEventListener('click', () => {
        whitepapersModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
}

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (ecosystemModal && event.target === ecosystemModal) {
        ecosystemModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (whitepapersModal && event.target === whitepapersModal) {
        whitepapersModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (ecosystemModal) {
            ecosystemModal.style.display = 'none';
        }
        if (whitepapersModal) {
            whitepapersModal.style.display = 'none';
        }
        const comingSoonModal = document.getElementById('comingSoonModal');
        if (comingSoonModal) {
            comingSoonModal.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
    }
});

// ===== COMING SOON MODAL FUNCTIONALITY =====
const comingSoonModal = document.getElementById('comingSoonModal');
const closeComingSoonModal = document.getElementById('closeComingSoonModal');
const communityLinks = document.querySelectorAll('.community-link');

// Open Coming Soon Modal when Community links are clicked
communityLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (comingSoonModal) {
            comingSoonModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

// Close Coming Soon Modal
if (closeComingSoonModal && comingSoonModal) {
    closeComingSoonModal.addEventListener('click', () => {
        comingSoonModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
}

// Close Coming Soon Modal when clicking outside
window.addEventListener('click', (event) => {
    if (comingSoonModal && event.target === comingSoonModal) {
        comingSoonModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
