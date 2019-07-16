import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ActionComponent } from './action/action.component';
import { MainComponent } from './main/main.component';
import { TreeComponent, TreeDialog } from './tree/tree.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ActionComponent,
    MainComponent,
    TreeComponent,
    TreeDialog,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  entryComponents: [TreeDialog, EditComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
