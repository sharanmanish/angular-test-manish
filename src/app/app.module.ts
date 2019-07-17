import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ActionComponent, AddTskDialog } from './action/action.component';
import { MainComponent } from './main/main.component';
import { TreeComponent, TreeDialog, EditTaskDialog } from './tree/tree.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeBackendService } from "./fake-backend.service";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ActionComponent,
    MainComponent,
    TreeComponent,
    TreeDialog,
    EditComponent,
    EditTaskDialog,
    AddTskDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomMaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeBackendService)
  ],
  entryComponents: [TreeDialog, EditComponent, EditTaskDialog, AddTskDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
