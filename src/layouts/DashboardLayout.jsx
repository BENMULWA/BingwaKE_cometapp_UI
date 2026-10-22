import { lazy, Suspense, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import BottomNav from "../layouts/BottomNav";
import DownloadBanner from "../components/DownloadBanner";
import Sidebar from "../layouts/Sidebar";
import HomePage from "../pages/HomePage";
import { getStoredUser } from "../utils/authStorage";

const AppDownloadPopup = lazy(() => import("../components/AppDownloadPopup"));
const FloatingActions = lazy(() => import("../components/FloatingActions"));
const ChatPanel = lazy(() => import("../features/chat/ChatPanel"));

function DashboardLayout() {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatCollapsed, setChatCollapsed] = useState(false);
  const chatWidth = chatCollapsed ? 320 : 380;
  const isSomethingOpen = showSidebar || isAppModalOpen || showChat;

  const closeAll = () => {
    setShowSidebar(false);
    setIsAppModalOpen(false);
    setShowChat(false);
  };

  const user = getStoredUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const openSupportChat = () => setShowChat(true);
    window.addEventListener("open-support-chat", openSupportChat);
    return () => window.removeEventListener("open-support-chat", openSupportChat);
  }, []);

  useEffect(() => {
    let frameOne = 0;
    let frameTwo = 0;

    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(() => {
        window.hideBootSplash?.();
      });
    });

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
    };
  }, []);

  // Show the app prompt once per visitor, after they have had a look around
  useEffect(() => {
    if (!isMobile) return undefined;
    if (localStorage.getItem("seenAppPopup")) return undefined;

    const timer = window.setTimeout(() => {
      setIsAppModalOpen(true);
      localStorage.setItem("seenAppPopup", "true");
    }, 25000);

    return () => window.clearTimeout(timer);
  }, [isMobile]);

  // Lock body scroll when overlays are open
  useEffect(() => {
    if (!isMobile) return;
    document.body.style.overflow = isSomethingOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, isSomethingOpen]);

  const cleanToken = user?.token?.replace("Bearer ", "");
  const isAuthOverlayRoute = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset",
    "/verify",
  ].includes(location.pathname);
  const isGameRoute =
    location.pathname === "/aviator" ||
    location.pathname.startsWith("/virtual/");
  const isHome = location.pathname === "/";

  return (
    <div
      className="flex h-screen flex-col bg-background text-textColor no-scrollbar transition-all duration-300"
      style={{ marginRight: showChat && !isMobile ? `${chatWidth}px` : "0px" }}
    >
      <DownloadBanner />
      <Navbar onMenuClick={() => setShowSidebar(true)} />

      <div
        className={`relative z-[1] flex flex-1 overflow-hidden no-scrollbar ${
          isGameRoute ? "p-0 md:px-2 md:pt-2" : isHome ? "p-0" : "px-0 pt-4 md:px-2"
        }`}
      >
        <Sidebar
          collapsed={false}
          isMobile={true}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <main
          className={`flex-1 overflow-y-auto appscroll no-scrollbar ${
            isGameRoute ? "overflow-hidden" : "pb-14 md:pb-0"
          }`}
        >
          <div
            className={`mx-auto w-full ${
              isGameRoute ? "max-w-none p-0" : isHome ? "max-w-none" : "max-w-[3000px] lg:px-4 2xl:px-8"
            }`}
          >
            {isAuthOverlayRoute && <HomePage />}
            <Outlet />
          </div>
        </main>
      </div>

      {isMobile && !isGameRoute && (
        <BottomNav
          onMenuClick={() => setShowSidebar(true)}
          onChatClick={() => setShowChat((prev) => !prev)}
          closeAll={closeAll}
          isSomethingOpen={isSomethingOpen}
        />
      )}

      {isAppModalOpen && (
        <Suspense fallback={null}>
          <AppDownloadPopup isOpen={isAppModalOpen} onClose={() => setIsAppModalOpen(false)} />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <FloatingActions onOpenChat={() => setShowChat(true)} />
      </Suspense>

      {showChat && (
        <Suspense fallback={null}>
          <ChatPanel
            token={cleanToken}
            open={showChat}
            onClose={() => setShowChat(false)}
            collapsed={chatCollapsed}
            onToggleCollapse={() => setChatCollapsed((prev) => !prev)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default DashboardLayout;
