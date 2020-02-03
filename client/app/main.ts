/**
 * Created by Krishan Pal on 01-02-2020.
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BaseModule } from './base.module';

platformBrowserDynamic().bootstrapModule(BaseModule).catch(err => console.log(err));
