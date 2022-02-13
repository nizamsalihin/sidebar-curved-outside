let sidebar = document.querySelector('.sidebar')
let sbMenuTitles = document.querySelectorAll('.sidebar__menu-title')
let sbSubmenuTitles = document.querySelectorAll('.sidebar__submenu-title')
const sidebarPointer = document.querySelector('.sidebar__pointer');
let toggle = document.querySelector('.toggle')

sidebar.addEventListener('mouseover', () => {
    toggle.classList.add('active');
    sidebar.classList.add('active')
})

// TODO NOT SURE THIS NEEDED OR NOT
window.addEventListener('load', () => {
    let topPixel = getTopPixel(0);
    expandSublisttHeigth(0);
    sidebarPointer.style.top = `${topPixel}px`;
});


toggle.addEventListener('click', () => {
    toggle.classList.toggle('active')
    sidebar.classList.toggle('active')
})

sbMenuTitles.forEach((menuTitle,menuTitleIndex) => {
    menuTitle.addEventListener('click', () => {
        clearMenuActiveClass();
        let sbMenu = menuTitle.closest('.sidebar__menu');
        let firstSubMenu = sbMenu.getElementsByClassName('sidebar__submenu');
        if (!sbMenu.classList.contains('active') ) {
            if (firstSubMenu.length !== 0 ) {
                firstSubMenu[0].classList.add('active');    
            }
            sbMenu.classList.add('active')

            let sumSubMenuToCurrentMenuIndex = getSumSubmenuToCurrentMenuIndex(menuTitleIndex);
            console.log("sum submenu",sumSubMenuToCurrentMenuIndex);

            let topPixel = getTopPixel(sumSubMenuToCurrentMenuIndex);
            console.log("pixel ", topPixel);
            sidebarPointer.style.top = `${topPixel}px`;

            
            expandSublisttHeigth(menuTitleIndex);
            
        } else {
            sbMenu.classList.add('active')
        }
    })
  
});



sbSubmenuTitles.forEach((submenuTitle,submenuIndex) => {
    submenuTitle.addEventListener('click', () => { 
        clearActiveClass();

        let menuParent = submenuTitle.closest('.sidebar__menu');
        menuParent.classList.add('active');
        submenuTitle.closest('.sidebar__submenu').classList.add('active');
        
        topPixel = getTopPixel(submenuIndex)
        sidebarPointer.style.top = `${topPixel}px`;
    });
}); 
const expandSublisttHeigth = (menuIndex) => {
    let listlengthSubmenuCurrentMenu = [];
    let sbMenus = document.querySelectorAll('.sidebar__menu');
    sbMenus.forEach(menu => {
        listlengthSubmenuCurrentMenu.push(menu.getElementsByClassName('sidebar__submenu').length);
    });
    document.querySelectorAll(".sidebar__menu .sidebar__list-sub").forEach(sub => { sub.style.maxHeight = '0px' });

    document.querySelector(".sidebar__menu.active .sidebar__list-sub").style.maxHeight = `${listlengthSubmenuCurrentMenu[menuIndex]*42.5}px`;
}
const getTopPixel = (sumSubmenu) => {
    let noCurrentMenuActive = getNoCurrentMenuActive();
    let noSubmenuByCurrentMenu = getNoSubmenuActiveByCurrentMenuIndex(sumSubmenu, noCurrentMenuActive);
    console.log('no submenu should active',noSubmenuByCurrentMenu);
    if (getSumSubMenuInCurrentMenuIndex(noCurrentMenuActive - 1) === 0) {
        sidebarPointer.style.width = '90%';
        return 78 + 27 - 42 + noCurrentMenuActive * 60 - 8.75;
    }
        sidebarPointer.style.width = '68%';
    return 78 + 27 - 42 +  (noCurrentMenuActive * 60) +  (noSubmenuByCurrentMenu * 42.5);
};
const getNoSubmenuActiveByCurrentMenuIndex = (sumSubMenu, noMenuActive) => {

    

    let noUrutSubmenu = sumSubMenu +1;
    let lengthSubmenuBeforeCurrentMenu = getSumSubmenuToCurrentMenuIndex(noMenuActive - 1);

    
    return noUrutSubmenu - lengthSubmenuBeforeCurrentMenu;
}
const getNoCurrentMenuActive = () => {
    let length;
    const updateMenus = document.querySelectorAll('.sidebar__menu');
    updateMenus.forEach((menu, index) => {
        if (menu.classList.contains('active')) { length = index + 1; };
    });
    return length;
}

const getSumSubMenuInCurrentMenuIndex = (menuIndex) => {
    let listlengthSubmenuCurrentMenu = [];
    let sbMenus = document.querySelectorAll('.sidebar__menu');
    sbMenus.forEach(menu => {
        listlengthSubmenuCurrentMenu.push(menu.getElementsByClassName('sidebar__submenu').length);
    });
    return listlengthSubmenuCurrentMenu[menuIndex];
}

const getSumSubmenuToCurrentMenuIndex = (currentMenuIndex) => {
    let listlengthSubmenuCurrentMenu = [];
    let sbMenus = document.querySelectorAll('.sidebar__menu');
    let length = 0;
    sbMenus.forEach(menu => {
        listlengthSubmenuCurrentMenu.push(menu.getElementsByClassName('sidebar__submenu').length);
    });
    // console.log('list sum submenu of every menu', listlengthSubmenuCurrentMenu);
    
    for (let i = 0; i < currentMenuIndex; i++) {
        length += listlengthSubmenuCurrentMenu[i];
    }
    // console.log('sum submenu to current menu',length);

    return length;
}

const clearActiveClass = () => {
    clearMenuActiveClass();
    sbSubmenuTitles.forEach((submenu, index) => {
        submenu.closest('.sidebar__submenu').classList.remove('active')
    });
};

const clearMenuActiveClass = () => {
    sbMenuTitles.forEach(menuTitle => {
        menuTitle.closest('.sidebar__menu').classList.remove('active');
    });
};