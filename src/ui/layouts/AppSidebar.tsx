'use client';

// import { useTranslations } from 'next-intl';
import { ChevronDownIcon, HorizontaLDots } from '@/assets/icons';
import { Role, roleAccess } from '@/constants/Role';
import { NavItem, navItems, othersItems } from '@/data/Menus';
import { useSidebarStore } from '@/lib/zustand/SidebarStore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const AppSidebar: React.FC = () => {
  const { data: loginData } = useSession();

  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleMobileSidebar } =
    useSidebarStore();

  const splitPathname = usePathname();
  const pathname = `/${splitPathname.split('/').at(2)}`;

  // const t = useTranslations();

  const filterNavByRole = (items: NavItem[], userRole: Role): NavItem[] => {
    const allowedPaths = roleAccess[userRole] || [];

    return items
      .map(item => {
        const hasAccessMain = item.path ? allowedPaths.includes(item.path) : false;

        const filteredSub = item.subItems
          ? item.subItems.filter(sub => allowedPaths.includes(sub.path))
          : [];

        const shouldShow =
          hasAccessMain || filteredSub.length > 0 || (!item.path && !item.subItems);

        if (!shouldShow) return null;

        return {
          ...item,
          subItems: filteredSub.length ? filteredSub : item.subItems,
        };
      })
      .filter(Boolean) as NavItem[];
  };

  const filteredMain = filterNavByRole(navItems, loginData?.user.role as Role);
  const filteredOthers = filterNavByRole(othersItems, loginData?.user.role as Role);

  const renderMenuItems = (navItems: NavItem[], menuType: 'main' | 'others') => (
    <ul className="flex flex-col gap-4">
      {/* {t('menu.calendar')} */}
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'menu-item-active' : 'menu-item-inactive'} cursor-pointer ${!isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'}`}
            >
              <span
                className={` ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={'menu-item-text'}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'rotate-180 text-brand-500' : ''}`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                onClick={toggleMobileSidebar}
                className={`menu-item group ${isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'}`}
              >
                <span
                  className={`${isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={'menu-item-text'}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={el => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : '0px',
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map(subItem => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      onClick={toggleMobileSidebar}
                      className={`menu-dropdown-item ${isActive(subItem.path) ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main' | 'others';
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ['main', 'others'].forEach(menuType => {
      const items = menuType === 'main' ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach(subItem => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as 'main' | 'others',
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight(prevHeights => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
    setOpenSubmenu(prevOpenSubmenu => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null;
      }
      return {
        type: menuType,
        index,
      };
    });
  };

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileOpen]);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-[9] border-r border-gray-200 
        ${isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {!loginData && (
              <>
                {[1, 2].map(item => (
                  <div key={`item-${item}`}>
                    <h2
                      className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}
                    >
                      <span className="block animate-pulse bg-gray-200 dark:bg-gray-200/2 w-24 h-6 rounded" />
                    </h2>
                    <ul className="flex flex-col gap-4">
                      {[1, 2, 3].map(subItem => (
                        <li key={`sub-item-${subItem}`}>
                          <span className="block animate-pulse bg-gray-200 dark:bg-gray-200/2 w-full h-6 rounded" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
            {loginData && (
              <>
                <div>
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}
                  >
                    {isExpanded || isHovered || isMobileOpen ? 'Menu' : <HorizontaLDots />}
                  </h2>
                  {renderMenuItems(filteredMain, 'main')}
                </div>

                {filteredOthers.length > 0 && (
                  <div className="">
                    <h2
                      className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}
                    >
                      {isExpanded || isHovered || isMobileOpen ? 'Others' : <HorizontaLDots />}
                    </h2>
                    {renderMenuItems(filteredOthers, 'others')}
                  </div>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
