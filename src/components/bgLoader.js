const bgLoader = document.getElementById('bgLoader');

/**
 * Show or hide background loader
 * @param show_loader bool
 */
export const toggleBgLoader = show_loader => bgLoader.style.display = show_loader ? 'block' : 'none';