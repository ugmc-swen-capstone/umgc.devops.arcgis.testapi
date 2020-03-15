import { TestBed, async } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressLocatorService } from './address-locator.service';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
    beforeEach(async(() => {
        const addressService = jasmine.createSpyObj('AddressLocatorService', [
            'getAddressSuggestion',
            'initializeEsriLibs',
        ]);

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatDialogModule,
                ReactiveFormsModule,
                MatCardModule,
                MatDialogModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
                MatInputModule,
                MatFormFieldModule,
                NoopAnimationsModule,
            ],
            declarations: [AppComponent],
            providers: [
                { provide: AddressLocatorService, useValue: addressService },
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should have as title "cdcop-app-project"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('cdcop-app-project');
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.content span').textContent).toContain(
            'cdcop-app-project'
        );
    });
});
