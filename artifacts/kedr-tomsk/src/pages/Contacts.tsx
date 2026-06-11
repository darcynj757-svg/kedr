import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Phone, Envelope, Clock, User } from "@phosphor-icons/react";
import { FaVk, FaTelegram, FaYoutube } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHero from "@/components/PageHero";

const contactFormSchema = z.object({
  name: z.string().min(2, "Введите ваше имя"),
  phone: z.string().min(10, "Телефон должен содержать минимум 10 цифр"),
  subject: z.string({ required_error: "Выберите тему обращения" }),
  message: z.string().optional(),
});

const contactItems = [
  {
    Icon: MapPin,
    label: "Адрес",
    value: "634024, г. Томск, ул. Профсоюзная, 2/67 стр. 3",
  },
  {
    Icon: Phone,
    label: "Офис",
    value: "+7 (3822) 33-44-39",
    href: "tel:+73822334439",
  },
  {
    Icon: User,
    label: "Директор",
    value: "Серебряков Павел Михайлович",
    sub: "+7 (952) 88-00-973",
    subHref: "tel:+79528800973",
  },
  {
    Icon: Envelope,
    label: "Email",
    value: "mail@kedr-tomsk.ru",
    href: "mailto:mail@kedr-tomsk.ru",
  },
  {
    Icon: Clock,
    label: "Режим работы",
    value: "Пн–Пт: 9:00–18:00",
    sub: "Сб–Вс: по предварительной договорённости",
  },
];

export default function Contacts() {
  const { toast } = useToast();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    toast({
      title: "Заявка успешно отправлена!",
      description: "Наш менеджер свяжется с вами в ближайшее время.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <PageHero
        title="Контакты"
        subtitle="Приезжайте в гости, звоните или пишите — всегда рады помочь!"
        breadcrumb="Контакты"
        tag="Контакты"
        image="/images/gallery/gallery-4.jpg"
      />

      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left: contact info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-accent" />
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Контактная информация</span>
              </div>

              <div className="space-y-0 divide-y divide-border">
                {contactItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-5 py-6">
                    <div className="w-10 h-10 bg-primary/5 flex items-center justify-center shrink-0">
                      <item.Icon size={20} weight="duotone" className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="font-medium text-foreground hover:text-accent transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-medium text-foreground">{item.value}</div>
                      )}
                      {item.sub && (
                        item.subHref ? (
                          <a href={item.subHref} className="text-sm text-muted-foreground hover:text-accent transition-colors block mt-0.5">
                            {item.sub}
                          </a>
                        ) : (
                          <div className="text-sm text-muted-foreground mt-0.5">{item.sub}</div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <div className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground mb-4">Мы в социальных сетях</div>
                <div className="flex gap-3">
                  {[
                    { Icon: FaVk, href: "#", label: "ВКонтакте" },
                    { Icon: FaTelegram, href: "#", label: "Telegram" },
                    { Icon: FaYoutube, href: "#", label: "YouTube" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors"
                    >
                      <social.Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-accent" />
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Написать нам</span>
              </div>

              <div className="bg-white border border-border p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="contact-form">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.12em] font-semibold text-muted-foreground">Ваше имя *</FormLabel>
                          <FormControl>
                            <input
                              placeholder="Иван Иванов"
                              {...field}
                              className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.12em] font-semibold text-muted-foreground">Телефон *</FormLabel>
                          <FormControl>
                            <input
                              placeholder="+7 (999) 000-00-00"
                              {...field}
                              className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.12em] font-semibold text-muted-foreground">Тема обращения *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-border rounded-none h-12 text-sm focus:ring-0 focus:border-primary">
                                <SelectValue placeholder="Выберите тему" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="consultation">Консультация по проекту</SelectItem>
                              <SelectItem value="calculation">Расчёт стоимости</SelectItem>
                              <SelectItem value="excursion">Экскурсия на производство</SelectItem>
                              <SelectItem value="timber">Покупка профилированного бруса</SelectItem>
                              <SelectItem value="other">Другое</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.12em] font-semibold text-muted-foreground">Сообщение</FormLabel>
                          <FormControl>
                            <textarea
                              placeholder="Опишите ваши пожелания или задайте вопрос..."
                              className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-background resize-none h-28"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-4 text-sm transition-all duration-300"
                    >
                      Отправить заявку
                    </button>
                    <p className="text-xs text-center text-muted-foreground">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
                    </p>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <div className="w-full h-80 bg-[#0d1f12] relative overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/gallery/gallery-4.jpg')" }}
        />
        <div className="relative z-10 bg-white p-6 flex items-center gap-4 shadow-2xl border-l-4 border-accent">
          <div className="w-10 h-10 bg-accent flex items-center justify-center shrink-0">
            <MapPin size={20} weight="bold" className="text-white" />
          </div>
          <div>
            <div className="font-bold text-foreground">ООО «Кедр-Томск»</div>
            <div className="text-sm text-muted-foreground">634024, г. Томск, ул. Профсоюзная, 2/67 стр. 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}
