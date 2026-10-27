window.tailwind = window.tailwind || {};
window.tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        heading: ['Plus Jakarta Sans', 'sans-serif'],
                    },
                    colors: {
                        vitalis: {
                            50: '#F0FDFA',
                            100: '#CCFBF1',
                            200: '#99F6E4',
                            500: '#14B8A6',
                            600: '#0D9488',
                            700: '#0F766E',
                            800: '#115E59',
                            900: '#134E4A',
                            dark: '#0F172A',
                        }
                    }
                }
            }
        }

// OTC Products Dataset
        const products = [
            {
                id: 1,
                name: "Panadol Extra Paracetamol 500mg (24s)",
                category: "pain",
                price: 45.00,
                rating: 4.9,
                badge: "Best Seller",
                image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
                desc: "Fast relief for headaches, toothaches, fever and muscular pain."
            },
            {
                id: 2,
                name: "Vitamin C 1000mg Effervescent (20s)",
                category: "vitamins",
                price: 85.00,
                rating: 4.8,
                badge: "Immunity Boost",
                image: "https://images.unsplash.com/photo-1550572017-edf7b3bdf58c?auto=format&fit=crop&q=80&w=400",
                desc: "High potency daily immune support with zinc and bioflavonoids."
            },
            {
                id: 3,
                name: "Omeprazole 20mg Acid Relief (14s)",
                category: "chronic",
                price: 110.00,
                rating: 4.7,
                badge: "Digestive Health",
                image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400",
                desc: "24-hour protection from heartburn and acid reflux symptoms."
            },
            {
                id: 4,
                name: " antiseptic Wound Cleanser & Spray 100ml",
                category: "skincare",
                price: 65.00,
                rating: 4.9,
                badge: "First Aid Essential",
                image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400",
                desc: "Painless antiseptic spray for minor cuts, scrapes, and skin burns."
            },
            {
                id: 5,
                name: "Multivitamin Daily Formula for Adults",
                category: "vitamins",
                price: 145.00,
                rating: 4.8,
                badge: "Essential",
                image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=400",
                desc: "Complete daily blend of 23 vitamins and minerals for energy & vitality."
            },
            {
                id: 6,
                name: "Blood Pressure Monitor (Upper Arm)",
                category: "chronic",
                price: 520.00,
                rating: 5.0,
                badge: "Medical Grade",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400",
                desc: "Accurate digital automatic monitor with memory storage for 2 users."
            },
            {
                id: 7,
                name: "Hydrating Dermatological Cream 250g",
                category: "skincare",
                price: 125.00,
                rating: 4.9,
                badge: "Sensitive Skin",
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400",
                desc: "Fragrance-free deep hydration for dry, eczema-prone skin."
            },
            {
                id: 8,
                name: "Ibuprofen 400mg Anti-Inflammatory (20s)",
                category: "pain",
                price: 52.00,
                rating: 4.7,
                badge: "In Stock",
                image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
                desc: "Relieves joint stiffness, backache, and inflammatory pain."
            }
        ];

        // Global Cart State
        const savedCart = localStorage.getItem('vitalis-cart');
        let cart = [];
        if (savedCart) {
            try {
                cart = JSON.parse(savedCart);
            } catch (error) {
                console.error('Could not restore the saved shopping basket.', error);
            }
        }

        // Render Product Catalog Cards
        function renderCatalog(items) {
            const grid = document.getElementById('product-grid');
            if (!grid) return;
            grid.innerHTML = items.map(p => `
                <div class="bg-white rounded-3xl p-4 border border-slate-200 card-hover flex flex-col justify-between group">
                    <div>
                        <!-- Product Image Box -->
                        <div class="relative h-36 overflow-hidden rounded-2xl bg-slate-100 mb-3 sm:mb-4 sm:h-44">
                            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <span class="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-vitalis-600 text-white font-mono font-bold text-[10px] uppercase">${p.badge}</span>
                        </div>

                        <!-- Info -->
                        <div class="flex items-center space-x-1 text-amber-400 text-[10px] mb-1 font-mono">
                            <span aria-hidden="true" class="lucide-icon" data-lucide="star"></span> <span>${p.rating} / 5.0</span>
                        </div>
                        <h4 class="mb-1 line-clamp-2 min-h-10 text-sm font-bold leading-snug text-slate-900">${p.name}</h4>
                        <p class="mb-4 line-clamp-2 text-xs font-normal leading-relaxed text-slate-500">${p.desc}</p>
                    </div>

                    <!-- Price & Add Action -->
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                            <span class="text-[10px] text-slate-400 block font-mono">Price</span>
                            <span class="text-base font-extrabold text-slate-900 font-heading">BWP ${p.price.toFixed(2)}</span>
                        </div>
                        <button data-action="add-to-cart" data-product-id="${p.id}" class="px-3.5 py-2.5 rounded-xl bg-vitalis-600 hover:bg-vitalis-700 text-white font-bold text-xs transition-colors flex items-center space-x-1 shadow-md shadow-vitalis-600/20">
                            <span aria-hidden="true" class="lucide-icon" data-lucide="shopping-cart"></span>
                            <span>Add</span>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Category Filter
        function filterCatalog(cat) {
            document.querySelectorAll('.cat-tab').forEach(btn => {
                const isActive = btn.dataset.cat === cat;
                btn.classList.toggle('is-active', isActive);
                btn.setAttribute('aria-pressed', String(isActive));
            });

            if(cat === 'all') {
                renderCatalog(products);
            } else {
                renderCatalog(products.filter(p => p.category === cat));
            }
        }

        // Search Bar Handler
        function handleSearch(e) {
            const query = e.target.value.toLowerCase();
            const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
            renderCatalog(filtered);
        }

        // Cart Logic
        function toggleCartDrawer() {
            document.getElementById('cart-drawer').classList.toggle('hidden');
        }

        function addToCart(id) {
            const item = products.find(p => p.id === id);
            if(!item) return;

            const existing = cart.find(i => i.id === id);
            if(existing) {
                existing.qty++;
            } else {
                cart.push({ ...item, qty: 1 });
            }

            updateCartUI();
            showToast(`Added ${item.name} to your basket.`);
        }

        function updateCartQty(id, delta) {
            const item = cart.find(i => i.id === id);
            if(item) {
                item.qty += delta;
                if(item.qty <= 0) {
                    cart = cart.filter(i => i.id !== id);
                }
            }
            updateCartUI();
        }

        function removeCartItem(id) {
            cart = cart.filter(item => item.id !== id);
            updateCartUI();
            showToast('Item removed from your basket.');
        }

        function updateCartUI() {
            const badge = document.getElementById('cart-badge');
            const list = document.getElementById('cart-items-list');
            const subtotalEl = document.getElementById('cart-subtotal');
            const totalEl = document.getElementById('cart-total');

            const totalItems = cart.reduce((acc, i) => acc + i.qty, 0);
            const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
            const delivery = subtotal > 300 || subtotal === 0 ? 0 : 35.00;
            const total = subtotal + delivery;

            localStorage.setItem('vitalis-cart', JSON.stringify(cart));
            badge.textContent = totalItems;
            subtotalEl.textContent = `BWP ${subtotal.toFixed(2)}`;
            document.getElementById('delivery-fee').textContent = delivery === 0 ? "FREE" : `BWP ${delivery.toFixed(2)}`;
            totalEl.textContent = `BWP ${total.toFixed(2)}`;

            if(cart.length === 0) {
                list.innerHTML = `
                    <div class="text-center py-12 text-slate-400">
                        <span aria-hidden="true" class="lucide-icon text-4xl mb-3 opacity-30" data-lucide="shopping-basket"></span>
                        <p class="text-xs">Your basket is currently empty.</p>
                    </div>
                `;
                return;
            }

            list.innerHTML = cart.map(item => `
                <div class="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div class="flex min-w-0 flex-1 items-center space-x-3">
                        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-xl">
                        <div class="min-w-0">
                            <h5 class="text-xs font-bold text-slate-900 line-clamp-1">${item.name}</h5>
                            <span class="text-[11px] font-mono font-bold text-vitalis-700">BWP ${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="flex shrink-0 items-center space-x-2 font-mono">
                        <button data-action="update-cart-qty" data-product-id="${item.id}" data-delta="-1" class="w-6 h-6 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center text-xs font-bold">-</button>
                        <span class="text-xs text-slate-900 font-bold px-1">${item.qty}</span>
                        <button data-action="update-cart-qty" data-product-id="${item.id}" data-delta="1" class="w-6 h-6 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center text-xs font-bold">+</button>
                    </div>
                    <button data-action="remove-cart-item" data-product-id="${item.id}" aria-label="Remove ${item.name} from basket" title="Remove item" class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
                        <span aria-hidden="true" class="lucide-icon" data-lucide="trash-2"></span>
                    </button>
                </div>
            `).join('');
        }

        function checkoutViaWhatsApp() {
            if(cart.length === 0) {
                showToast("Please add items to your basket before checking out.");
                return;
            }

            let text = "Hello Vitalis Pharmacy, I would like to place an OTC order:\n\n";
            cart.forEach(i => {
                text += `• ${i.name} (x${i.qty}) - BWP ${(i.price * i.qty).toFixed(2)}\n`;
            });
            const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
            text += `\nTotal: BWP ${subtotal.toFixed(2)}`;

            const encoded = encodeURIComponent(text);
            window.open(`https://wa.me/26771884900?text=${encoded}`, '_blank');
        }

        // File Upload Drag and Drop Handler
        function updateFilePreview(input) {
            const file = input.files && input.files[0];
            const nameDisplay = document.getElementById('file-name-display');
            const text = document.getElementById('file-name-text');
            if (!file) {
                nameDisplay.classList.add('hidden');
                text.textContent = '';
                return false;
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            const extensionIsAllowed = /\.(jpe?g|png|pdf)$/i.test(file.name);
            if ((!allowedTypes.includes(file.type) && !extensionIsAllowed) || file.size > 10 * 1024 * 1024) {
                input.value = '';
                nameDisplay.classList.add('hidden');
                text.textContent = '';
                showToast(file.size > 10 * 1024 * 1024
                    ? 'Please choose a prescription file smaller than 10 MB.'
                    : 'Choose a JPG, PNG, or PDF prescription file.');
                return false;
            }

            text.textContent = file.name;
            nameDisplay.classList.remove('hidden');
            document.getElementById('rx-submit-status').classList.add('hidden');
            return true;
        }

        function handleRxSubmit(e) {
            e.preventDefault();
            const status = document.getElementById('rx-submit-status');
            if (!document.getElementById('rx-file-input').files.length) {
                status.textContent = 'Choose a prescription file before continuing.';
                status.classList.remove('hidden');
                return;
            }
            status.textContent = 'Your details have not been sent. This website is not connected to pharmacy processing yet. Please call +267 391 8840 to submit your prescription for review.';
            status.classList.remove('hidden');
            status.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function setupPrescriptionDropZone() {
            const rxDropZone = document.getElementById('drop-zone');
            if (!rxDropZone) return;

            rxDropZone.addEventListener('dragover', event => {
                event.preventDefault();
                rxDropZone.classList.add('border-vitalis-600', 'bg-vitalis-100');
            });

            rxDropZone.addEventListener('dragleave', event => {
                if (!rxDropZone.contains(event.relatedTarget)) {
                    rxDropZone.classList.remove('border-vitalis-600', 'bg-vitalis-100');
                }
            });

            rxDropZone.addEventListener('drop', event => {
                event.preventDefault();
                rxDropZone.classList.remove('border-vitalis-600', 'bg-vitalis-100');
                const files = event.dataTransfer.files;
                if (!files.length) return;

                const fileInput = document.getElementById('rx-file-input');
                fileInput.files = files;
                updateFilePreview(fileInput);
            });
        }

        // Health Tools: BMI Calculator
        function calculateBMI() {
            const w = parseFloat(document.getElementById('bmi-weight').value);
            const h = parseFloat(document.getElementById('bmi-height').value) / 100;

            if(!w || !h || h <= 0) {
                showToast("Please enter valid weight and height values.");
                return;
            }

            const bmi = (w / (h * h)).toFixed(1);
            const scoreEl = document.getElementById('bmi-score');
            const statusEl = document.getElementById('bmi-status');
            const resultBox = document.getElementById('bmi-result');

            scoreEl.textContent = bmi;
            resultBox.classList.remove('hidden');

            if(bmi < 18.5) {
                statusEl.textContent = "Underweight Range";
                statusEl.className = "inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800";
            } else if(bmi < 25) {
                statusEl.textContent = "Healthy Weight Range";
                statusEl.className = "inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800";
            } else if(bmi < 30) {
                statusEl.textContent = "Overweight Range";
                statusEl.className = "inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800";
            } else {
                statusEl.textContent = "Obesity Range";
                statusEl.className = "inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800";
            }
        }

        // Health Tools: Hydration Estimator
        function calculateHydration() {
            const w = parseFloat(document.getElementById('water-weight').value);
            const act = parseFloat(document.getElementById('water-activity').value);

            if(!w || w <= 0) {
                showToast("Please enter a valid weight in kilograms.");
                return;
            }

            const liters = ((w * 0.035) * act).toFixed(1);
            const glasses = Math.round(liters * 4);

            document.getElementById('hydration-target').textContent = `${liters} Liters`;
            document.getElementById('hydration-glasses').textContent = glasses;
            document.getElementById('hydration-result').classList.remove('hidden');
        }

        // Modal Controls
        function openConsultationModal() {
            document.getElementById('consultation-modal').classList.remove('hidden');
        }
        function closeConsultationModal() {
            document.getElementById('consultation-modal').classList.add('hidden');
        }
        function toggleMobileNav() {
            const nav = document.getElementById('mobile-nav');
            const isExpanded = nav.classList.toggle('hidden') === false;
            document.querySelector('[data-action="toggle-mobile-nav"]').setAttribute('aria-expanded', String(isExpanded));
        }

        // Global Toast Notification
        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-msg').textContent = msg;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3500);
        }

        // On Load
        document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('hero-search-input');
            const query = new URLSearchParams(window.location.search).get('q');
            if (searchInput && query) searchInput.value = query;

            if (document.getElementById('product-grid')) {
                renderCatalog(products);
                if (searchInput && query) handleSearch({ target: searchInput });
            }
            setupPrescriptionDropZone();
            updateCartUI();
        });

document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target.closest('[data-action]') : null;
    if (!target) return;

    switch (target.dataset.action) {
        case 'open-consultation': openConsultationModal(); break;
        case 'toggle-cart': toggleCartDrawer(); break;
        case 'toggle-mobile-nav': toggleMobileNav(); break;
        case 'mobile-consultation': toggleMobileNav(); openConsultationModal(); break;
        case 'search-shop': {
            event.preventDefault();
            const searchInput = document.getElementById('hero-search-input');
            const query = searchInput ? `?q=${encodeURIComponent(searchInput.value)}` : '';
            window.location.href = `${target.href}${query}`;
            break;
        }
        case 'select-rx-file':
            if (event.target === document.getElementById('rx-file-input')) break;
            document.getElementById('rx-file-input').click();
            break;
        case 'filter-catalog': filterCatalog(target.dataset.cat); break;
        case 'calculate-bmi': calculateBMI(); break;
        case 'calculate-hydration': calculateHydration(); break;
        case 'checkout-whatsapp': checkoutViaWhatsApp(); break;
        case 'close-consultation': closeConsultationModal(); break;
        case 'add-to-cart': addToCart(Number(target.dataset.productId)); break;
        case 'update-cart-qty': updateCartQty(Number(target.dataset.productId), Number(target.dataset.delta)); break;
        case 'remove-cart-item': removeCartItem(Number(target.dataset.productId)); break;
    }
});

document.addEventListener('input', event => {
    if (event.target.id === 'hero-search-input' && document.getElementById('product-grid')) handleSearch(event);
});

document.addEventListener('change', event => {
    if (event.target.id === 'rx-file-input') updateFilePreview(event.target);
});

document.addEventListener('keydown', event => {
    if (event.target.id === 'hero-search-input' && event.key === 'Enter') {
        event.preventDefault();
        window.location.href = `shop.html?q=${encodeURIComponent(event.target.value)}`;
        return;
    }

    const target = event.target instanceof Element ? event.target.closest('[data-action="select-rx-file"]') : null;
    if (target && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        target.click();
    }
});

document.addEventListener('submit', event => {
    const form = event.target;
    switch (form.dataset.form) {
        case 'rx': handleRxSubmit(event); break;
        case 'contact':
            event.preventDefault();
            showToast('Message Sent! Our pharmacist will reply via SMS/WhatsApp.');
            form.reset();
            break;
        case 'consultation':
            event.preventDefault();
            showToast('Consultation Booked! We sent confirmation to your phone.');
            closeConsultationModal();
            break;
    }
});
