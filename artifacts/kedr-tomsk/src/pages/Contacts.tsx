import { useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Factory, Phone, Mail, Clock } from "lucide-react";
import { FaVk, FaTelegram, FaYoutube } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const contactFormSchema = z.object({
  name: z.string().min(2, "Введите ваше имя"),
  phone: z.string().min(10, "Телефон должен содержать минимум 10 цифр"),
  subject: z.string({ required_error: "Выберите тему обращения" }),
  message: z.string().optional(),
});

export default function Contacts() {
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    toast({
      title: "Заявка успешно отправлена!",
      description: "Наш менеджер свяжется с вами в ближайшее время.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background fade-in-section visible" data-testid="contacts-page">
      {/* Hero */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link> / Контакты
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Контакты</h1>
          <p className="text-xl text-muted-foreground">Приезжайте в гости, звоните или пишите — всегда рады помочь!</p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left: Info */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-8">Контактная информация</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" />
                </div>
                <div>
                  <div className="font-bold text-primary mb-1">Офис продаж</div>
                  <div className="text-muted-foreground">г. Томск, ул. Профсоюзная, 2/67 стр.3</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0">
                  <Factory className="text-primary" />
                </div>
                <div>
                  <div className="font-bold text-primary mb-1">Производство</div>
                  <div className="text-muted-foreground">промзона Томска, ул. Нахимова, 12</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-primary" />
                </div>
                <div>
                  <div className="font-bold text-primary mb-1">Телефон</div>
                  <a href="tel:+73822000000" className="text-lg font-bold hover:text-accent transition-colors">+7 (3822) 000-000</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <div className="font-bold text-primary mb-1">Email</div>
                  <a href="mailto:info@kedr-tomsk.ru" className="text-muted-foreground hover:text-accent transition-colors">info@kedr-tomsk.ru</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="text-primary" />
                </div>
                <div>
                  <div className="font-bold text-primary mb-1">Режим работы</div>
                  <div className="text-muted-foreground">Пн-Пт: 9:00–19:00<br/>Сб: 10:00–17:00<br/>Вс: выходной</div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-bold text-primary mb-4">Мы в социальных сетях:</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors">
                  <FaVk size={24} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors">
                  <FaTelegram size={24} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors">
                  <FaYoutube size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-6">Написать нам</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ваше имя *</FormLabel>
                        <FormControl>
                          <Input placeholder="Иван Иванов" {...field} />
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
                        <FormLabel>Телефон *</FormLabel>
                        <FormControl>
                          <Input placeholder="+7 (999) 000-00-00" {...field} />
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
                        <FormLabel>Тема обращения *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тему" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="consultation">Консультация по проекту</SelectItem>
                            <SelectItem value="calculation">Расчёт стоимости</SelectItem>
                            <SelectItem value="excursion">Экскурсия на производство</SelectItem>
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
                        <FormLabel>Сообщение</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Опишите ваши пожелания или задайте вопрос..." 
                            className="resize-none h-32" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 h-12 text-lg">Отправить заявку</Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="w-full h-96 bg-primary relative overflow-hidden flex items-center justify-center border-t border-border">
        {/* We use a stylized placeholder since we don't have a real map iframe */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/mapbg/1920/1080')] bg-cover bg-center"></div>
        <div className="relative z-10 bg-white p-6 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce hover:animate-none cursor-pointer">
          <div className="w-12 h-12 bg-accent rounded-full text-white flex items-center justify-center shrink-0">
            <MapPin size={24} />
          </div>
          <div>
            <div className="font-bold text-primary">Кедр-Томск</div>
            <div className="text-sm text-muted-foreground">г. Томск, ул. Профсоюзная, 2/67 стр.3</div>
          </div>
        </div>
      </div>
    </div>
  );
}
