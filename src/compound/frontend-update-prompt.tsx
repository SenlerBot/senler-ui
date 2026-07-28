import { ArrowRight, RefreshCw, Sparkles } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../atoms/alert-dialog';

export interface FrontendUpdatePromptLabels {
  title: string;
  description: string;
  currentVersion: string;
  latestVersion: string;
  remindLater: string;
  refresh: string;
}

interface FrontendUpdatePromptProps {
  open: boolean;
  currentVersion: string;
  latestVersion: string | null;
  labels: FrontendUpdatePromptLabels;
  onRemindLater: () => void;
  onRefresh: () => void;
}

export function FrontendUpdatePrompt({
  open,
  currentVersion,
  latestVersion,
  labels,
  onRemindLater,
  onRefresh,
}: FrontendUpdatePromptProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onRemindLater();
        }
      }}
    >
      <AlertDialogContent className='overflow-hidden p-0 sm:max-w-md'>
        <div className='bg-gradient-to-br from-primary/15 via-background to-background px-6 pt-6'>
          <div className='mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20'>
            <Sparkles className='size-6' aria-hidden='true' />
          </div>
          <AlertDialogHeader className='text-left'>
            <AlertDialogTitle className='text-xl'>{labels.title}</AlertDialogTitle>
            <AlertDialogDescription className='text-sm leading-6'>
              {labels.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className='my-5 flex items-center gap-3 rounded-xl border border-border/70 bg-background/80 p-3 shadow-sm backdrop-blur'>
            <div className='min-w-0 flex-1'>
              <div className='text-[11px] font-medium uppercase tracking-wide text-muted-foreground'>
                {labels.currentVersion}
              </div>
              <div className='truncate font-mono text-xs text-foreground'>{currentVersion}</div>
            </div>
            <ArrowRight className='size-4 shrink-0 text-primary' aria-hidden='true' />
            <div className='min-w-0 flex-1 text-right'>
              <div className='text-[11px] font-medium uppercase tracking-wide text-muted-foreground'>
                {labels.latestVersion}
              </div>
              <div className='truncate font-mono text-xs text-foreground'>
                {latestVersion ?? '—'}
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter className='border-t border-border bg-muted/30 px-6 py-4 sm:justify-between'>
          <AlertDialogCancel onClick={onRemindLater}>{labels.remindLater}</AlertDialogCancel>
          <AlertDialogAction onClick={onRefresh} className='gap-2'>
            <RefreshCw className='size-4' aria-hidden='true' />
            {labels.refresh}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
