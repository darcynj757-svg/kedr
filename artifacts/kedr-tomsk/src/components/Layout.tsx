
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Phone } from "lucide-react";

const CONTACT_PHONE = "+79138534439";
const WHATSAPP_PHONE = "79138534439";
const TELEGRAM_USERNAME = "Pavelss75";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />

      {/* Floating contact buttons */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Max messenger */}
        <a
          href={`https://vk.me/${CONTACT_PHONE}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в Max"
          className="group flex items-center gap-0 hover:gap-3 overflow-hidden w-12 hover:w-36 h-12 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-1.5"
          style={{ background: "linear-gradient(135deg, #5B6CF5 0%, #7B3FE4 100%)", opacity: 0.75 }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
        >
          <span className="shrink-0 w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
            <img src="/max-icon.png" alt="Max" className="w-9 h-9 object-cover" />
          </span>
          <span className="text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1">
            Max
          </span>
        </a>

        {/* Telegram */}
        <a
          href={`https://t.me/${TELEGRAM_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в Telegram"
          className="group flex items-center gap-0 hover:gap-3 overflow-hidden w-12 hover:w-36 h-12 bg-[#229ED9] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-3"
        >
          <span className="shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
            </svg>
          </span>
          <span className="text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1">
            Telegram
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=Здравствуйте!%20Хочу%20узнать%20о%20строительстве%20дома.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          className="group flex items-center gap-0 hover:gap-3 overflow-hidden w-12 hover:w-36 h-12 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-3"
        >
          <span className="shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </span>
          <span className="text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1">
            WhatsApp
          </span>
        </a>

        {/* Phone */}
        <a
          href={`tel:${CONTACT_PHONE}`}
          aria-label="Позвонить"
          className="group flex items-center gap-0 hover:gap-3 overflow-hidden w-12 hover:w-36 h-12 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-3"
        >
          <span className="shrink-0">
            <Phone size={20} />
          </span>
          <span className="text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1">
            Позвонить
          </span>
        </a>
      </div>
    </div>
  );
}
