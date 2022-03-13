



import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuModalComponent } from './au-modal.component';
import { AuModalOpenOnClickDirective } from './au-modal-open-on-click.directive';
import {AuModalService} from "./modal.service";



@NgModule({
  declarations: [AuModalComponent, AuModalOpenOnClickDirective],
  imports: [
    CommonModule
  ],
  exports: [AuModalComponent, AuModalOpenOnClickDirective] 
  // module includes the component
  // the component or directive should be in the declarations and exports at the same time
  // otherwise, they would not work.
})
export class AuModalModule {



    static forRoot():  ModuleWithProviders{
        return {
            ngModule: AuModalModule,
            providers: [AuModalService]
        }
    }





}



