import { useLayoutEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BotIcon, HomeIcon, SettingsIcon } from 'lucide-react';
import './styles.css';
import { AppShell } from '@senlerio/ui/app-shell';
import {
  Avatar,
  Button,
  Calendar,
  Card,
  Chip,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Input,
  ImagePreview,
  SearchableSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TextField,
  Toaster,
  toast,
} from '@senlerio/ui';

const navigation = [
  {
    id: 'main',
    items: [
      { id: 'home', label: 'Home', href: '/', icon: HomeIcon, exact: true },
      { id: 'agents', label: 'Agents', href: '/agents', icon: BotIcon, badge: '3' },
      { id: 'settings', label: 'Settings', href: '/settings', icon: SettingsIcon },
    ],
  },
];

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const closeLabel = language === 'ru' ? 'Закрыть' : undefined;
  const imageAlt = language === 'ru' ? 'Предпросмотр изображения' : undefined;
  const switchLanguage = () => setLanguage(language === 'en' ? 'ru' : 'en');
  const sampleImage = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#1976d2" /></svg>');

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.lang = language;
  }, [theme, language]);

  return (
    <TooltipProvider>
      <AppShell
        brand={<span className="text-sm font-semibold">Senler</span>}
        navigation={navigation}
        currentPath="/agents"
        headerTitle="Agents"
        headerBreadcrumbs={[
          { id: 'home', label: 'Home', href: '/' },
          { id: 'agents', label: 'Agents' },
        ]}
        renderLink={({ href, className, children, item: _item, breadcrumb: _breadcrumb, ...props }) => (
          <a href={href} className={className} {...props}>
            {children}
          </a>
        )}
      >
        <Card data-testid="palette-card" className="p-4">
          <p>Consumer palette</p>
          <p data-testid="error-text" className="text-destructive">Error message</p>
          <Button onClick={() => setTheme('light')}>Light theme</Button>
          <Button onClick={() => setTheme('dark')}>Dark theme</Button>
          <Button onClick={switchLanguage}>Switch language</Button>
        </Card>
        <DialogRoot>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent closeLabel={closeLabel}>
            <DialogTitle>Smoke dialog</DialogTitle>
            <DialogDescription>Dialog accessibility check</DialogDescription>
            <Input aria-label="Name" placeholder="Name" />
            <Button onClick={switchLanguage}>Switch language</Button>
          </DialogContent>
        </DialogRoot>
        <Sheet>
          <SheetTrigger asChild><Button>Open sheet</Button></SheetTrigger>
          <SheetContent closeLabel={closeLabel}>
            <SheetTitle>Smoke sheet</SheetTitle>
            <SheetDescription>Sheet accessibility check</SheetDescription>
            <Button onClick={switchLanguage}>Switch language</Button>
          </SheetContent>
        </Sheet>
        <ImagePreview src={sampleImage} alt={imageAlt} variant="icon" />
        <ImagePreview data-testid="decorative-preview" src={sampleImage} alt="" variant="icon" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Tip</Button>
          </TooltipTrigger>
          <TooltipContent>Works</TooltipContent>
        </Tooltip>
        <Select defaultValue="one">
          <SelectTrigger>
            <SelectValue placeholder="Pick" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="one">One</SelectItem>
          </SelectContent>
        </Select>
        <SearchableSelect
          inputId="smoke-searchable-select"
          label="Searchable"
          options={[
            { label: 'One', value: 'one' },
            { label: 'Two', value: 'two' },
          ]}
        />
        <TextField placeholder="Search" endAdornment={<Button size="icon_sm" variant="ghost">Go</Button>} />
        <Chip label="Ready" color="success" size="small" />
        <Button variant="secondary" onClick={() => toast.success('Smoke toast', { duration: Infinity })}>
          Toast
        </Button>
        <Avatar alt="Senler" />
        <Calendar mode="single" />
        <Toaster closeButton theme={theme} toastOptions={{ closeButtonAriaLabel: language === 'ru' ? 'Закрыть уведомление' : 'Close notification' }} />
      </AppShell>
    </TooltipProvider>
  );
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(<App />);
}
