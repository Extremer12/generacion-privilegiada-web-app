document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');
    const infoModal = document.getElementById('infoModal');
    const joinModal = document.getElementById('joinModal');
    const rolesModal = document.getElementById('rolesModal');
    const avisosModal = document.getElementById('avisosModal');

    // Base de datos simulada de canciones
    const songDatabase = [
        {
            id: 1,
            title: "Tu Amor No Se Rinde",
            category: "Adoración",
            author: "Generación Privilegiada",
            chords: "Em - C - G - D",
            lyrics: `Verso 1:
Tu amor no se rinde
No se cansa de esperar
Tu gracia me encuentra
Donde quiera que esté`
        },
        {
            id: 2,
            title: "Gloria En Las Alturas",
            category: "Alabanza",
            author: "Generación Privilegiada",
            chords: "G - Em - C - D",
            lyrics: `Verso 1:
Gloria en las alturas
Al único Rey
Los cielos declaran
Tu majestad`
        },
        {
            id: 3,
            title: "Guerreros De Light",
            category: "Warfare",
            author: "Generación Privilegiada",
            chords: "Am - F - C - G",
            lyrics: `Verso 1:
Somos guerreros de luz
Marchando en victoria
Tu poder nos guía
En esta batalla`
        }
    ];

    // Agregar después de la base de datos de canciones
    const cancionero = {
        title: '',
        sections: [],
        selectedSongs: []
    };

    const etapasReunion = [
        { id: 'inicio', nombre: 'Inicio', color: 'var(--color-green)' },
        { id: 'ofrenda', nombre: 'Ofrenda', color: 'var(--color-gold)' },
        { id: 'adoracion', nombre: 'Adoración', color: 'var(--color-purple)' },
        { id: 'ministracion', nombre: 'Ministración', color: 'var(--color-green)' },
        { id: 'cierre', nombre: 'Cierre', color: 'var(--color-gold)' }
    ];

    // Función para mostrar canciones
    function displaySongs(songs = songDatabase) {
        const songsList = document.querySelector('.songs-list');
        songsList.innerHTML = '';

        songs.forEach(song => {
            const songElement = document.createElement('div');
            songElement.className = 'song-card';
            songElement.innerHTML = `
                <div class="song-header">
                    <h3 class="song-title">${song.title}</h3>
                    <button class="favorite-btn" data-song-id="${song.id}">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
                <div class="song-info">
                    <span class="song-category">
                        <i class="fas fa-tag"></i> ${song.category}
                    </span>
                    <span class="song-author">
                        <i class="fas fa-user"></i> ${song.author}
                    </span>
                </div>
                <div class="song-actions">
                    <button class="action-btn view-btn" data-song-id="${song.id}">
                        <i class="fas fa-eye"></i> Ver Detalles
                    </button>
                </div>
            `;
            songElement.querySelector('.view-btn').addEventListener('click', function() {
                const songId = this.getAttribute('data-song-id');
                showSongDetails(songId);
            });
            songsList.appendChild(songElement);
        });
    }

    // Hacemos displaySongs accesible globalmente
    window.displaySongs = displaySongs;

    // Modifica la función showSongDetails:
    function showSongDetails(songId) {
        const song = songDatabase.find(s => s.id == songId);
        if (!song) return;

        const main = document.querySelector('main');
        main.innerHTML = `
            <div class="song-details">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i> Volver
                </button>
                <div class="song-details-header">
                    <h2>${song.title}</h2>
                    <p class="song-metadata">${song.category} | ${song.author}</p>
                </div>
                <div class="song-content">
                    <div class="chords">${song.chords}</div>
                    <div class="lyrics">${song.lyrics.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="song-resources">
                    <h3>Recursos</h3>
                    <div class="audio-player">
                        <button class="play-btn">▶ Play</button>
                        <div class="progress-bar">
                            <div class="progress"></div>
                        </div>
                        <span class="time">0:00</span>
                    </div>
                    <button class="resource-btn">Audio Original</button>
                    <button class="resource-btn">Versión Acústica</button>
                    <button class="resource-btn">Tutorial</button>
                    <button class="download-pdf-btn">
                        <i class="fas fa-file-pdf"></i> Descargar PDF
                    </button>
                </div>
            </div>
        `;

        // Mejorar el manejo del botón volver
        document.querySelector('.back-btn').addEventListener('click', function() {
            const main = document.querySelector('main');
            main.innerHTML = `
                <div class="search-container">
                    <input type="text" class="search-input" placeholder="Buscar canciones...">
                    <div class="categories">
                        <button class="category-btn active">Todos</button>
                        <button class="category-btn">Adoración</button>
                        <button class="category-btn">Alabanza</button>
                        <button class="category-btn">Warfare</button>
                        <button class="category-btn">Intimidad</button>
                        <button class="category-btn">Declaración</button>
                    </div>
                </div>
                <div class="songs-list"></div>
            `;

            // Restaurar eventos
            const searchInput = document.querySelector('.search-input');
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const filteredSongs = songDatabase.filter(song => 
                    song.title.toLowerCase().includes(searchTerm) ||
                    song.author.toLowerCase().includes(searchTerm)
                );
                displaySongs(filteredSongs);
            });

            document.querySelectorAll('.category-btn').forEach(button => {
                button.addEventListener('click', function() {
                    // Remover clase active de todos los botones
                    document.querySelectorAll('.category-btn').forEach(btn => 
                        btn.classList.remove('active')
                    );
                    // Agregar clase active al botón clickeado
                    this.classList.add('active');
                    
                    const category = this.textContent;
                    const filteredSongs = category === 'Todos' 
                        ? songDatabase 
                        : songDatabase.filter(song => song.category === category);
                    displaySongs(filteredSongs);
                });
            });

            // Mostrar todas las canciones
            displaySongs();
        });
    }

    // Inicializar canciones
    displaySongs();

    // Toggle menú
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        this.classList.add('hidden');
    });

    // Cerrar menú
    closeMenu.addEventListener('click', function() {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('hidden');
    });

    // Función para abrir modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            sidebar.classList.remove('active');
            menuToggle.classList.remove('hidden');
        }
    }

    // Función para cerrar modal
    function closeModal(modal) {
        modal.classList.remove('active');
    }

    // Eventos para abrir modales
    document.getElementById('showInfoModal')?.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('infoModal');
    });

    document.getElementById('showRolesModal')?.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('rolesModal');
    });

    document.getElementById('showAvisosModal')?.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('avisosModal');
    });

    document.getElementById('showJoinModal')?.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('joinModal');
    });

    // Agregar después de los otros event listeners
    document.getElementById('showLoginModal')?.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('loginModal');
    });

    document.getElementById('showProfileModal')?.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('profileModal');
    });

    // Agregar manejo de tabs en el login modal
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.tab;
            
            // Activar tab
            document.querySelectorAll('.auth-tab').forEach(t => 
                t.classList.remove('active')
            );
            this.classList.add('active');
            
            // Mostrar formulario correspondiente
            document.querySelectorAll('.auth-form').forEach(form => 
                form.classList.remove('active')
            );
            document.getElementById(`${target}Form`).classList.add('active');
        });
    });

    // Simular estado de autenticación
    let isAuthenticated = false;

    // Función para actualizar UI basado en auth
    function updateAuthUI() {
        const authButtons = document.getElementById('authButtons');
        const profileButton = document.getElementById('profileButton');
        const logoutButton = document.querySelector('.logout-btn');

        if (isAuthenticated) {
            authButtons.style.display = 'none';
            profileButton.style.display = 'block';
            logoutButton.style.display = 'block';
        } else {
            authButtons.style.display = 'block';
            profileButton.style.display = 'none';
            logoutButton.style.display = 'none';
        }
    }

    // Simular login
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        isAuthenticated = true;
        updateAuthUI();
        closeModal(document.getElementById('loginModal'));
    });

    // Simular logout
    document.querySelector('.logout-btn')?.addEventListener('click', function() {
        isAuthenticated = false;
        updateAuthUI();
        sidebar.classList.remove('active');
    });

    // Inicializar estado de UI
    updateAuthUI();

    // Cerrar modales con la X
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Cerrar modales al hacer clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Evitar que el clic dentro del modal cierre el modal
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Búsqueda de canciones
    document.querySelector('.search-input').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredSongs = songDatabase.filter(song => 
            song.title.toLowerCase().includes(searchTerm) ||
            song.author.toLowerCase().includes(searchTerm)
        );
        displaySongs(filteredSongs);
    });

    // Filtrado por categorías
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.textContent;
            const filteredSongs = category === 'Todos' 
                ? songDatabase 
                : songDatabase.filter(song => song.category === category);
            displaySongs(filteredSongs);
        });
    });

    // Botón volver arriba
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Agregar botón "Ver todos" en filtros
    const categoriesContainer = document.querySelector('.categories');
    if (categoriesContainer) {
        const resetBtn = document.createElement('button');
        resetBtn.className = 'category-btn reset-btn';
        resetBtn.innerHTML = '<i class="fas fa-undo"></i> Ver todos';
        categoriesContainer.appendChild(resetBtn);

        resetBtn.addEventListener('click', function() {
            displaySongs();
            document.querySelectorAll('.category-btn').forEach(btn => 
                btn.classList.remove('active')
            );
            this.classList.add('active');
        });
    }

    // Agregar el evento para mostrar el panel
    document.getElementById('showCoordinatorPanel').addEventListener('click', function(e) {
        e.preventDefault();
        showCoordinatorPanel();
        sidebar.classList.remove('active');
        menuToggle.classList.remove('hidden');
    });

    // Función para mostrar el panel de coordinador
    function showCoordinatorPanel() {
        const main = document.querySelector('main');
        main.innerHTML = `
            <div class="coordinator-panel">
                <div class="panel-header">
                    <h2><i class="fas fa-crown"></i> Armar Repertorio</h2>
                    <button class="back-btn">
                        <i class="fas fa-arrow-left"></i> Volver
                    </button>
                </div>

                <div class="repertorio-creator">
                    <div class="creator-header">
                        <input type="text" 
                               class="repertorio-title" 
                               placeholder="Título del Repertorio"
                               value="Reunión ${new Date().toLocaleDateString()}">
                        <button class="save-btn">
                            <i class="fas fa-save"></i> Guardar
                        </button>
                    </div>

                    <div class="etapas-container">
                        ${etapasReunion.map(etapa => `
                            <div class="etapa-section" data-etapa="${etapa.id}">
                                <div class="etapa-header" style="border-left: 4px solid ${etapa.color}">
                                    <h3>${etapa.nombre}</h3>
                                    <button class="add-song-btn" data-etapa="${etapa.id}">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div class="etapa-songs" id="songs-${etapa.id}">
                                    <p class="empty-message">Sin canciones seleccionadas</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="panel-actions">
                        <button class="share-btn">
                            <i class="fas fa-share-alt"></i> Compartir
                        </button>
                        <button class="download-pdf-btn">
                            <i class="fas fa-file-pdf"></i> Descargar PDF
                        </button>
                    </div>
                </div>
            </div>
        `;

        initCoordinatorEvents();
    }

    function initCoordinatorEvents() {
        const addSongBtns = document.querySelectorAll('.add-song-btn');

        addSongBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const etapaId = this.dataset.etapa;
                showSongSelector(etapaId);
            });
        });

        // Corregir el botón volver
        document.querySelector('.back-btn').addEventListener('click', () => {
            const main = document.querySelector('main');
            main.innerHTML = `
                <section class="search-section">
                    <input type="text" placeholder="Buscar canciones..." class="search-input">
                    <div class="categories">
                        <button class="category-btn">Alabanza</button>
                        <button class="category-btn">Adoración</button>
                        <button class="category-btn">Warfare</button>
                        <button class="category-btn">Intimidad</button>
                        <button class="category-btn">Declaración</button>
                    </div>
                </section>
                <section class="songs-list">
                </section>
            `;

            // Reiniciar eventos
            initSearchEvents();
            displaySongs();
        });
    }

    // Función auxiliar para reiniciar eventos de búsqueda
    function initSearchEvents() {
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredSongs = songDatabase.filter(song => 
                song.title.toLowerCase().includes(searchTerm) ||
                song.author.toLowerCase().includes(searchTerm)
            );
            displaySongs(filteredSongs);
        });

        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', function() {
                const category = this.textContent;
                const filteredSongs = category === 'Todos' 
                    ? songDatabase 
                    : songDatabase.filter(song => song.category === category);
                displaySongs(filteredSongs);
            });
        });
    }

    function showSongSelector(etapaId) {
        const modal = document.createElement('div');
        modal.className = 'modal song-selector-modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Seleccionar Canciones</h3>
                    <button class="close-modal"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="selector-search">
                        <input type="text" 
                               class="search-input" 
                               placeholder="Buscar por título o autor...">
                        <div class="selector-categories">
                            <button class="category-filter active" data-category="todos">Todos</button>
                            <button class="category-filter" data-category="Adoración">Adoración</button>
                            <button class="category-filter" data-category="Alabanza">Alabanza</button>
                            <button class="category-filter" data-category="Warfare">Warfare</button>
                        </div>
                    </div>
                    <div class="songs-grid">
                        ${songDatabase.map(song => `
                            <div class="song-item" data-song-id="${song.id}">
                                <div class="song-info">
                                    <h4>${song.title}</h4>
                                    <p>${song.category}</p>
                                </div>
                                <button class="select-song-btn">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Búsqueda en tiempo real
        const searchInput = modal.querySelector('.search-input');
        searchInput.addEventListener('input', function() {
            filterSongsInSelector(modal, this.value);
        });

        // Filtrado por categorías
        modal.querySelectorAll('.category-filter').forEach(btn => {
            btn.addEventListener('click', function() {
                modal.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterSongsInSelector(modal, searchInput.value, this.dataset.category);
            });
        });

        // Eventos del selector
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => modal.remove());

        modal.querySelectorAll('.select-song-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const songId = this.closest('.song-item').dataset.songId;
                const song = songDatabase.find(s => s.id == songId);
                addSongToEtapa(etapaId, song);
                this.disabled = true;
                this.innerHTML = '<i class="fas fa-check"></i>';
            });
        });
    }

    function filterSongsInSelector(modal, searchTerm = '', category = 'todos') {
        const songItems = modal.querySelectorAll('.song-item');
        const searchLower = searchTerm.toLowerCase();

        songItems.forEach(item => {
            const songId = item.dataset.songId;
            const song = songDatabase.find(s => s.id == songId);
            const matchesSearch = song.title.toLowerCase().includes(searchLower) || 
                                song.author.toLowerCase().includes(searchLower);
            const matchesCategory = category === 'todos' || song.category === category;

            if (matchesSearch && matchesCategory) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function addSongToEtapa(etapaId, song) {
        const etapaSongs = document.querySelector(`#songs-${etapaId}`);
        const emptyMessage = etapaSongs.querySelector('.empty-message');
        if (emptyMessage) emptyMessage.remove();

        const songElement = document.createElement('div');
        songElement.className = 'etapa-song-item';
        songElement.innerHTML = `
            <span class="song-title">${song.title}</span>
            <button class="remove-song-btn">
                <i class="fas fa-times"></i>
            </button>
        `;

        songElement.querySelector('.remove-song-btn').addEventListener('click', function() {
            songElement.remove();
            if (etapaSongs.children.length === 0) {
                etapaSongs.innerHTML = '<p class="empty-message">Sin canciones seleccionadas</p>';
            }
        });

        etapaSongs.appendChild(songElement);
    }

    // Manejo de roles
    const roleCards = document.querySelectorAll('.role-card');
    let selectedRole = localStorage.getItem('userRole') || null;

    // Actualizar UI con rol guardado
    function updateRoleUI() {
        if (selectedRole) {
            document.querySelector('.profile-role span').textContent = selectedRole;
            roleCards.forEach(card => {
                if (card.dataset.role === selectedRole.toLowerCase()) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }
    }

    // Eventos para selección de rol
    roleCards.forEach(card => {
        card.addEventListener('click', function() {
            const role = this.dataset.role;
            selectedRole = role.charAt(0).toUpperCase() + role.slice(1);
            localStorage.setItem('userRole', selectedRole);
            
            // Actualizar UI
            roleCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Actualizar perfil
            document.querySelector('.profile-role span').textContent = selectedRole;
            
            // Cerrar modal después de seleccionar
            setTimeout(() => {
                document.getElementById('rolesModal').classList.remove('active');
            }, 500);
        });
    });

    // Inicializar UI de roles
    updateRoleUI();

    // Actualizar el perfil en el menú toggle
    function updateProfileInMenu() {
        const userRole = localStorage.getItem('userRole');
        const profileSection = document.querySelector('.user-profile');
        
        if (userRole) {
            profileSection.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <div class="user-info">
                    <span class="user-name">Usuario</span>
                    <span class="user-role">${userRole}</span>
                </div>
            `;
        }
    }

    // Agregar estilos para el perfil en el menú
    const styles = `
        .user-info {
            display: flex;
            flex-direction: column;
            margin-left: 0.5rem;
        }
        
        .user-name {
            color: var(--color-text);
            font-weight: bold;
        }
        
        .user-role {
            color: var(--color-gold);
            font-size: 0.8rem;
        }
    `;

    // Insertar estilos
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Llamar a la función cuando se seleccione un rol
    updateProfileInMenu();

    // Agregar después de DOMContentLoaded
    function initProfileHandlers() {
        const avatarInput = document.getElementById('avatarInput');
        const avatarPreview = document.getElementById('avatarPreview');
        const changeAvatarBtn = document.querySelector('.change-avatar-btn');
        const profileForm = document.getElementById('profileForm');

        // Handler para cambiar avatar
        changeAvatarBtn.addEventListener('click', () => avatarInput.click());

        avatarInput.addEventListener('change', function(e) {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    avatarPreview.src = e.target.result;
                    localStorage.setItem('userAvatar', e.target.result);
                    // Actualizar avatar en el sidebar
                    document.querySelector('.avatar-container img').src = e.target.result;
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });

        // Handler para el formulario
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userData = {
                name: document.getElementById('profileName').value,
                role: document.getElementById('profileRole').value,
                bio: document.getElementById('profileBio').value
            };

            localStorage.setItem('userData', JSON.stringify(userData));
            updateProfileUI(userData);
            closeModal(document.getElementById('profileModal'));
        });

        // Cargar datos guardados
        loadSavedProfileData();
    }

    function loadSavedProfileData() {
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        const savedAvatar = localStorage.getItem('userAvatar');

        if (savedAvatar) {
            document.getElementById('avatarPreview').src = savedAvatar;
            document.querySelector('.avatar-container img').src = savedAvatar;
        }

        if (userData.name) document.getElementById('profileName').value = userData.name;
        if (userData.role) document.getElementById('profileRole').value = userData.role;
        if (userData.bio) document.getElementById('profileBio').value = userData.bio;

        updateProfileUI(userData);
    }

    function updateProfileUI(userData) {
        const profilePreview = document.getElementById('profilePreview');
        const userInfo = profilePreview.querySelector('.user-info');
        
        userInfo.querySelector('.user-name').textContent = userData.name || 'Usuario';
        userInfo.querySelector('.user-role').textContent = userData.role || 'Sin rol asignado';
    }

    // Llamar a initProfileHandlers después de que el DOM esté cargado
    initProfileHandlers();
});