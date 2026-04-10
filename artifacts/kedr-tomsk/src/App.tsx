import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Services from "@/pages/Services";
import Stages from "@/pages/Stages";
import About from "@/pages/About";
import Production from "@/pages/Production";
import Contacts from "@/pages/Contacts";
import Calculator from "@/pages/Calculator";
import Comparison from "@/pages/Comparison";
import Faq from "@/pages/Faq";
import Geography from "@/pages/Geography";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import Gallery from "@/pages/Gallery";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:slug" component={ProjectDetail} />
        <Route path="/services" component={Services} />
        <Route path="/stages" component={Stages} />
        <Route path="/about" component={About} />
        <Route path="/production" component={Production} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/comparison" component={Comparison} />
        <Route path="/faq" component={Faq} />
        <Route path="/geography" component={Geography} />
        <Route path="/articles" component={Articles} />
        <Route path="/articles/:slug" component={ArticleDetail} />
        <Route path="/gallery" component={Gallery} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
