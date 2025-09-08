import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

fetch('assets/env.json', { cache: 'no-store' })
  .then((r) => (r.ok ? r.json() : {}))
  .then((env) => {
    (window as any).__runtime_env__ = env || {};
  })
  .catch(() => {})
  .finally(() => {
    bootstrapApplication(App, appConfig).catch((err) => console.error(err));
  });
