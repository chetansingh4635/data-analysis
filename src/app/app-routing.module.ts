import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashSegmentComponent } from './cash-segment/cash-segment.component';
import { DerivativesSegmentComponent } from './derivatives-segment/derivatives-segment.component';
import { FuturesSegmentComponent } from './futures-segment/futures-segment.component';
import { OptionsSegmentComponent } from './options-segment/options-segment.component';
const routes: Routes = [
  {
    path: '',
    redirectTo : '/cash',
    pathMatch: 'full'
  },
  {
    path: 'cash',
    component: CashSegmentComponent
  },
  {
    path: 'futures/:symbol',
    component: FuturesSegmentComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'options/:symbol',
    component: OptionsSegmentComponent,
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
